import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();
const messaging = getMessaging();

const nightQuotes = [
  { quote: 'Joy is a net of love by which you can catch souls.', saint: 'St. Teresa of Calcutta' },
  { quote: 'Never be in a hurry; do everything quietly and in a calm spirit.', saint: 'St. Francis de Sales' },
  { quote: 'Pray, hope, and don\'t worry. Worry is useless. God is merciful and will hear your prayer.', saint: 'St. Padre Pio' },
  { quote: 'You have made us for yourself, O Lord, and our heart is restless until it rests in you.', saint: 'St. Augustine of Hippo' },
  { quote: 'Everything is grace.', saint: 'St. Thérèse of Lisieux' },
  { quote: 'We are all called to be saints, and there is nothing strange about it.', saint: 'St. Josemaria Escriva' },
  { quote: 'Do not abandon yourselves to despair. We are the Easter people and hallelujah is our song.', saint: 'St. John Paul II' },
  { quote: 'The measure of love is to love without measure.', saint: 'St. Augustine of Hippo' },
]

function getNightQuote() {
  const now = new Date()
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000)
  return nightQuotes[dayOfYear % nightQuotes.length]
}

export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const item = getNightQuote()

    const tokensSnapshot = await db.collection('fcm_tokens').get()
    const tokens = tokensSnapshot.docs.map(doc => doc.data().token)

    if (tokens.length === 0) {
      return res.status(200).json({ message: 'No subscribers yet' })
    }

    const message = {
      notification: {
        title: '🌙 Night Reflection — Selah',
        body: `"${item.quote}" — ${item.saint}`,
      },
      tokens,
    }

    const response = await messaging.sendEachForMulticast(message)
    console.log(`Sent to ${response.successCount} devices`)

    if (response.failureCount > 0) {
      const batch = db.batch()
      response.responses.forEach((resp, index) => {
        if (!resp.success) {
          batch.delete(tokensSnapshot.docs[index].ref)
        }
      })
      await batch.commit()
    }

    return res.status(200).json({
      success: true,
      sent: response.successCount,
      failed: response.failureCount,
    })
  } catch (error) {
    console.error('Error sending night reflection:', error)
    return res.status(500).json({ error: error.message })
  }
}