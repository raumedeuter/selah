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

const mercyVerses = [
  { reference: '1 John 1:9', text: 'If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.', version: 'NIV' },
  { reference: 'Psalm 103:12', text: 'As far as the east is from the west, so far has he removed our transgressions from us.', version: 'NIV' },
  { reference: 'Romans 8:1', text: 'Therefore, there is now no condemnation for those who are in Christ Jesus.', version: 'NIV' },
  { reference: 'Luke 15:20', text: 'But while he was still a long way off, his father saw him and was filled with compassion for him; he ran to his son, threw his arms around him and kissed him.', version: 'NIV' },
  { reference: 'Micah 7:18', text: 'Who is a God like you, who pardons sin and forgives the transgression of the remnant of his inheritance?', version: 'NIV' },
  { reference: 'Isaiah 43:25', text: 'I, even I, am he who blots out your transgressions, for my own sake, and remembers your sins no more.', version: 'NIV' },
  { reference: 'Ephesians 1:7', text: 'In him we have redemption through his blood, the forgiveness of sins, in accordance with the riches of God\'s grace.', version: 'NIV' },
]

function getMercyVerse() {
  const now = new Date()
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000)
  return mercyVerses[dayOfYear % mercyVerses.length]
}

export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const verse = getMercyVerse()

    const tokensSnapshot = await db.collection('fcm_tokens').get()
    const tokens = tokensSnapshot.docs.map(doc => doc.data().token)

    if (tokens.length === 0) {
      return res.status(200).json({ message: 'No subscribers yet' })
    }

    const message = {
      notification: {
        title: '🕯 Hour of Mercy — 3PM',
        body: `"${verse.text}" — ${verse.reference}`,
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
    console.error('Error sending hour of mercy notification:', error)
    return res.status(500).json({ error: error.message })
  }
}