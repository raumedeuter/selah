import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getMessaging } from 'firebase-admin/messaging'
import { getFirestore } from 'firebase-admin/firestore'

// Initialize Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

const db = getFirestore()

// Same verse of the day logic as the frontend
const themes = ['joy', 'peace', 'anxiety', 'grief', 'loneliness', 'strength', 'hope', 'forgiveness', 'wisdom', 'love']

const seedVerses = {
  joy: [
    { reference: 'Psalm 16:11', text: 'You make known to me the path of life; you will fill me with joy in your presence, with eternal pleasures at your right hand.', version: 'NIV' },
    { reference: 'Nehemiah 8:10', text: 'Do not grieve, for the joy of the Lord is your strength.', version: 'NIV' },
    { reference: 'Psalm 30:5', text: 'Weeping may stay for the night, but rejoicing comes in the morning.', version: 'NIV' },
    { reference: 'John 15:11', text: 'I have told you this so that my joy may be in you and that your joy may be complete.', version: 'NIV' },
    { reference: 'Romans 15:13', text: 'May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.', version: 'NIV' },
    { reference: 'Psalm 126:3', text: 'The Lord has done great things for us, and we are filled with joy.', version: 'NIV' },
    { reference: 'Zephaniah 3:17', text: 'The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.', version: 'NIV' },
  ],
  peace: [
    { reference: 'John 14:27', text: 'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.', version: 'NIV' },
    { reference: 'Philippians 4:7', text: 'And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.', version: 'NIV' },
    { reference: 'Isaiah 26:3', text: 'You will keep in perfect peace those whose minds are steadfast, because they trust in you.', version: 'NIV' },
    { reference: 'Psalm 23:1-2', text: 'The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.', version: 'NIV' },
    { reference: 'Colossians 3:15', text: 'Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful.', version: 'NIV' },
    { reference: '2 Thessalonians 3:16', text: 'Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you.', version: 'NIV' },
    { reference: 'Numbers 6:24-26', text: 'The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace.', version: 'NIV' },
  ],
  anxiety: [
    { reference: 'Philippians 4:6-7', text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.', version: 'NIV' },
    { reference: '1 Peter 5:7', text: 'Cast all your anxiety on him because he cares for you.', version: 'NIV' },
    { reference: 'Isaiah 41:10', text: 'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you.', version: 'NIV' },
    { reference: 'Matthew 6:34', text: 'Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.', version: 'NIV' },
    { reference: '2 Timothy 1:7', text: 'For God has not given us a spirit of fear, but of power and of love and of a sound mind.', version: 'NKJV' },
    { reference: 'Psalm 94:19', text: 'When anxiety was great within me, your consolation brought me joy.', version: 'NIV' },
    { reference: 'Matthew 11:28-29', text: 'Come to me, all you who are weary and burdened, and I will give you rest.', version: 'NIV' },
  ],
  grief: [
    { reference: 'Psalm 34:18', text: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.', version: 'NIV' },
    { reference: 'Revelation 21:4', text: 'He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain.', version: 'NIV' },
    { reference: 'Matthew 5:4', text: 'Blessed are those who mourn, for they will be comforted.', version: 'NIV' },
    { reference: '2 Corinthians 1:3-4', text: 'Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort.', version: 'NIV' },
    { reference: 'Psalm 30:5', text: 'Weeping may stay for the night, but rejoicing comes in the morning.', version: 'NIV' },
    { reference: 'John 11:35', text: 'Jesus wept.', version: 'NIV' },
    { reference: 'Romans 8:38-39', text: 'Neither death nor life, neither angels nor demons, neither the present nor the future, will be able to separate us from the love of God.', version: 'NIV' },
  ],
  loneliness: [
    { reference: 'Deuteronomy 31:8', text: 'The Lord himself goes before you and will be with you; he will never leave you nor forsake you.', version: 'NIV' },
    { reference: 'Psalm 139:7-8', text: 'Where can I go from your Spirit? Where can I flee from your presence? If I go up to the heavens, you are there.', version: 'NIV' },
    { reference: 'Isaiah 43:1', text: 'Do not fear, for I have redeemed you; I have summoned you by name; you are mine.', version: 'NIV' },
    { reference: 'Matthew 28:20', text: 'And surely I am with you always, to the very end of the age.', version: 'NIV' },
    { reference: 'Psalm 68:6', text: 'God sets the lonely in families, he leads out the prisoners with singing.', version: 'NIV' },
    { reference: 'Hebrews 13:5', text: 'Never will I leave you; never will I forsake you.', version: 'NIV' },
    { reference: 'Romans 8:38-39', text: 'Nothing in all creation will be able to separate us from the love of God that is in Christ Jesus our Lord.', version: 'NIV' },
  ],
  strength: [
    { reference: 'Philippians 4:13', text: 'I can do all this through him who gives me strength.', version: 'NIV' },
    { reference: 'Isaiah 40:31', text: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles.', version: 'NIV' },
    { reference: 'Joshua 1:9', text: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.', version: 'NIV' },
    { reference: '2 Corinthians 12:9', text: 'My grace is sufficient for you, for my power is made perfect in weakness.', version: 'NIV' },
    { reference: 'Psalm 46:1', text: 'God is our refuge and strength, an ever-present help in trouble.', version: 'NIV' },
    { reference: 'Ephesians 6:10', text: 'Finally, be strong in the Lord and in his mighty power.', version: 'NIV' },
    { reference: 'Nehemiah 8:10', text: 'Do not grieve, for the joy of the Lord is your strength.', version: 'NIV' },
  ],
  hope: [
    { reference: 'Jeremiah 29:11', text: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."', version: 'NIV' },
    { reference: 'Romans 8:28', text: 'And we know that in all things God works for the good of those who love him.', version: 'NIV' },
    { reference: 'Lamentations 3:22-23', text: 'Because of the Lord\'s great love we are not consumed, for his compassions never fail. They are new every morning.', version: 'NIV' },
    { reference: 'Romans 15:13', text: 'May the God of hope fill you with all joy and peace as you trust in him.', version: 'NIV' },
    { reference: 'Psalm 62:5', text: 'Yes, my soul, find rest in God; my hope comes from him.', version: 'NIV' },
    { reference: 'Hebrews 11:1', text: 'Now faith is confidence in what we hope for and assurance about what we do not see.', version: 'NIV' },
    { reference: 'Isaiah 40:29', text: 'He gives strength to the weary and increases the power of the weak.', version: 'NIV' },
  ],
  forgiveness: [
    { reference: '1 John 1:9', text: 'If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.', version: 'NIV' },
    { reference: 'Psalm 103:12', text: 'As far as the east is from the west, so far has he removed our transgressions from us.', version: 'NIV' },
    { reference: 'Isaiah 43:25', text: 'I, even I, am he who blots out your transgressions, for my own sake, and remembers your sins no more.', version: 'NIV' },
    { reference: 'Romans 8:1', text: 'Therefore, there is now no condemnation for those who are in Christ Jesus.', version: 'NIV' },
    { reference: 'Micah 7:18-19', text: 'Who is a God like you, who pardons sin and forgives the transgression of the remnant of his inheritance?', version: 'NIV' },
    { reference: 'Luke 15:20', text: 'But while he was still a long way off, his father saw him and was filled with compassion for him; he ran to his son.', version: 'NIV' },
    { reference: 'Ephesians 1:7', text: 'In him we have redemption through his blood, the forgiveness of sins, in accordance with the riches of God\'s grace.', version: 'NIV' },
  ],
  wisdom: [
    { reference: 'James 1:5', text: 'If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.', version: 'NIV' },
    { reference: 'Proverbs 3:5-6', text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him.', version: 'NIV' },
    { reference: 'Proverbs 9:10', text: 'The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.', version: 'NIV' },
    { reference: 'Psalm 119:105', text: 'Your word is a lamp for my feet, a light on my path.', version: 'NIV' },
    { reference: 'Colossians 2:2-3', text: 'Christ, in whom are hidden all the treasures of wisdom and knowledge.', version: 'NIV' },
    { reference: 'Ecclesiastes 7:12', text: 'Wisdom is a shelter as money is a shelter, but the advantage of knowledge is this: Wisdom preserves those who have it.', version: 'NIV' },
    { reference: 'Isaiah 30:21', text: 'Whether you turn to the right or to the left, your ears will hear a voice behind you, saying, "This is the way; walk in it."', version: 'NIV' },
  ],
  love: [
    { reference: '1 Corinthians 13:4-7', text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud.', version: 'NIV' },
    { reference: 'John 3:16', text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.', version: 'NIV' },
    { reference: 'Romans 8:38-39', text: 'Neither death nor life will be able to separate us from the love of God that is in Christ Jesus our Lord.', version: 'NIV' },
    { reference: '1 John 4:8', text: 'Whoever does not love does not know God, because God is love.', version: 'NIV' },
    { reference: 'Zephaniah 3:17', text: 'The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you.', version: 'NIV' },
    { reference: '1 John 4:18', text: 'There is no fear in love. But perfect love drives out fear.', version: 'NIV' },
    { reference: 'Song of Solomon 8:7', text: 'Many waters cannot quench love; rivers cannot sweep it away.', version: 'NIV' },
  ],
}

function getVerseOfTheDay() {
  const all = []
  themes.forEach(theme => {
    const verses = seedVerses[theme] || []
    all.push(...verses)
  })
  const now = new Date()
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000)
  return all[dayOfYear % all.length]
}

export default async function handler(req, res) {
  // Verify cron secret to prevent unauthorized calls
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const messaging = getMessaging() 


  try {
    const verse = getVerseOfTheDay()

    // Get all FCM tokens from Firestore
    const tokensSnapshot = await db.collection('fcm_tokens').get()
    const tokens = tokensSnapshot.docs.map(doc => doc.data().token)

    if (tokens.length === 0) {
      return res.status(200).json({ message: 'No subscribers yet' })
    }

    // Send notification to all tokens
    const message = {
      notification: {
        title: '✝ Selah — Daily Verse',
        body: `"${verse.text}" — ${verse.reference}`,
      },
      tokens,
    }

    const response = await messaging.sendEachForMulticast(message)
    console.log(`Sent to ${response.successCount} devices`)

    // Clean up failed tokens
    const failedTokens = []
    response.responses.forEach((resp, idx) => {
      if (!resp.success) failedTokens.push(tokens[idx])
    })

    if (failedTokens.length > 0) {
      const batch = db.batch()
      failedTokens.forEach(token => {
        batch.delete(db.collection('fcm_tokens').doc(token))
      })
      await batch.commit()
    }

    return res.status(200).json({
      success: true,
      sent: response.successCount,
      failed: response.failureCount,
    })
  } catch (error) {
    console.error('Error sending notifications:', error)
    return res.status(500).json({ error: error.message })
  }
}