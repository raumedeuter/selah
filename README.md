
# Selah

Selah is a mobile-first, installable web app for Catholic reflection and encouragement. It presents Scripture passages and saint quotes organized by emotional and spiritual themes such as joy, peace, anxiety, grief, loneliness, strength, hope, forgiveness, wisdom, and love. The app enables users to browse faith-based content, save favourites, share passages, and receive scheduled daily faith notifications.

This project is designed for Catholics and Christian users seeking a quick, mood-based companion for prayer, reflection, and encouragement.

## Live Demo

[URL Link](https://theselah.vercel.app)

## Features

- Daily Verse-of-the-Day logic based on the current date
- Theme-based browsing across 10 faith categories:
  - Joy & Gratitude
  - Peace & Rest
  - Anxiety & Fear
  - Grief & Sorrow
  - Loneliness
  - Strength & Courage
  - Hope
  - Forgiveness & Guilt
  - Wisdom
  - Love
- Scripture passages drawn from a curated dataset of Bible verses
- Saint quotes grouped by theme and paired with saint metadata
- Favourites saved in browser localStorage
- Save/remove interactions for both verses and saint quotes
- Share content through:
  - Clipboard copy
  - WhatsApp
  - Native Web Share API when supported
- Dark/light theme support based on system preference
- Animated spiritual UI elements including:
  - star field
  - light rays
  - floating symbols
  - moving cross-bearer illustration
  - risen Christ illustration
- Install prompt/banner to add the app to the home screen
- PWA support using service worker registration and manifest configuration
- Background Firebase Cloud Messaging setup for scheduled notifications
- Firebase token registration and Firestore storage for push notification subscribers
- Vercel cron-backed daily backend notifications:
  - morning verse
  - hour of mercy
  - night reflection
- Router-based navigation with Home, Theme, and Favourites pages
- Performance profile detection for device capability adaptation
- Mobile-friendly layout with glassmorphism-styled cards and blurred overlays

## Tech Stack

- React 19
- Vite 8
- JavaScript (ES modules)
- React Router DOM
- Tailwind CSS 4
- @tailwindcss/vite
- Framer Motion
- Lucide React
- Firebase JS SDK
- Firebase Admin SDK
- workbox-window
- vite-plugin-pwa
- ESLint
- @eslint/js
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- globals
- node-fetch
- Vercel cron jobs / serverless API routes
- HTML + CSS
- LocalStorage for client-side persistence

## Project Structure

```text
selah/
├── .env
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vercel.json
├── vite.config.js
├── api/
│   ├── hour-of-mercy.js
│   │   - Sends an hourly mercy-themed notification via Firebase Cloud Messaging
│   ├── morning-verse.js
│   │   - Sends a daily morning scripture notification
│   └── night-reflection.js
│       - Sends a nightly saint reflection notification
├── public/
│   ├── firebase-messaging-sw.js
│   │   - Firebase background notification service worker
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── icons/
│   │   - App icons, manifest assets, and screenshots
│   ├── icons.svg
│   └── music/
│       - Audio/music assets directory
├── src/
│   ├── App.jsx
│   │   - Main router configuration for app navigation
│   ├── main.jsx
│   │   - App bootstrap and service worker registration
│   ├── assets/
│   │   - Decorative background and image assets
│   │   ├── crossbearer-removebg.png
│   │   ├── crossbearer.png
│   │   ├── crossbearer2-removebg.png
│   │   ├── crossbearer2.png
│   │   ├── hero.png
│   │   ├── risen-removebg.png
│   │   ├── risen.png
│   │   ├── votd-bg-dark.jpg
│   │   ├── votd-bg-dark.webp
│   │   ├── votd-bg.jpg
│   │   └── votd-bg.webp
│   ├── components/
│   │   ├── features/
│   │   │   └── VerseOfTheDay.jsx
│   │   │       - Standalone verse-of-the-day card component
│   │   ├── layout/
│   │   │   └── AppShell.jsx
│   │   │       - Shared shell for themed pages
│   │   └── ui/
│   │       ├── CrossBearer.jsx
│   │       │   - Animated cross-bearer scene
│   │       ├── FloatingSymbols.jsx
│   │       │   - Drifting spiritual icon animation
│   │       ├── InstallBanner.jsx
│   │       │   - App installation prompt banner
│   │       ├── InstallModal.jsx
│   │       │   - Installation instructions modal
│   │       ├── LightRays.jsx
│   │       │   - Ambient glow/rays background effect
│   │       ├── RisenChrist.jsx
│   │       │   - Animated risen Christ illustration
│   │       ├── StarField.jsx
│   │       │   - Animated star background canvas
│   │       └── ThemeDrawer.jsx
│   │           - Theme selector drawer
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   │   - Light/dark mode context provider
│   │   └── useTheme.js
│   │       - Hook to access theme context
│   ├── data/
│   │   ├── saints.js
│   │   │   - Saint quote dataset by theme
│   │   ├── themeColors.js
│   │   │   - Per-theme color palette definitions
│   │   ├── themes.js
│   │   │   - Theme metadata and labels
│   │   └── verses.js
│   │       - Scripture dataset by theme
│   ├── hooks/
│   │   ├── useFavourites.js
│   │   │   - Favourite management hook using localStorage
│   │   └── useGlassSheen.js
│   │       - Mouse/device-orientation sheen effect hook
│   ├── pages/
│   │   ├── Favourites.jsx
│   │   │   - Saved verses and quotes view
│   │   ├── Home.jsx
│   │   │   - Main app experience and content browsing
│   │   └── ThemePage.jsx
│   │       - Single-theme content page
│   ├── services/
│   │   └── firebase.js
│   │       - Firebase initialization and notification permission logic
│   ├── styles/
│   │   └── globals.css
│   │       - Global CSS reset and Tailwind import
│   └── utils/
│       └── performance.js
│           - Detects low-end vs premium device profile
└── dist/
    - Production build output generated by Vite
```

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- Git (optional, for cloning the repository)

### Installation

1. Clone the repository
2. Navigate to the project folder
3. Install dependencies:

```bash
npm install
```

### Environment variables

Create an environment file with the following variable names:

```text
VITE_BIBLE_API_KEY
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
CRON_SECRET
```

### Run locally

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal, typically:

```text
http://localhost:5173
```

## Scripts

The project includes the following npm scripts from package.json:

- `npm run dev`
  - Starts the Vite development server for local development
- `npm run build`
  - Builds the production bundle with Vite
- `npm run lint`
  - Runs ESLint across the project
- `npm run preview`
  - Serves the production build locally for preview

## Deployment

This project is configured for deployment on Vercel.

Evidence from the repository:

- vercel.json defines Vercel cron jobs for scheduled backend logic
- The app includes serverless API handlers under api
- vite.config.js configures PWA behavior with service worker, manifest, and caching
- The project is built using Vite, and the build output is generated into dist

The cron configuration in vercel.json is:

- `/api/morning-verse` — scheduled at `38 6 * * *`
- `/api/hour-of-mercy` — scheduled at `39 13 * * *`
- `/api/night-reflection` — scheduled at `26 19 * * *`

This indicates the app is intended to run as a Vercel-hosted frontend with scheduled serverless jobs for push notifications.

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run the relevant linting checks
5. Open a pull request with a clear description of the change

Please keep changes focused and aligned with the app’s Catholic reflection and daily encouragement theme.

## License & Usage

This project is open source and available for viewing and learning purposes.
If you'd like to use, adapt, or build upon this work, you're welcome to do so
**with proper attribution**.

Please do not claim this work as your own. I put significant time, thought and
faith into building Selah, and all I ask is that you give credit by linking
back to [theselah.vercel.app](https://theselah.vercel.app) or my
[GitHub profile](https://github.com/raumedeuter).

TL;DR — Yes, you can use this code. Just give me credit. Thanks! 🙏

## Author

Michael E. Ben-Ikheloah (https://michaelben-ikheloah.vercel.app)

