# 🕵️ Imposter Game - Complete Project Overview

## 🎉 Project Status: COMPLETE ✅

Your PWA is ready to use! The dev server is running at **http://localhost:5173**

---

## 📁 Project Structure

```
imposter-game/
├── src/
│   ├── components/
│   │   ├── SetupScreen.tsx           ← Game settings (players, imposters, category)
│   │   ├── RoleRevealScreen.tsx      ← Each player sees their role (crewmate/imposter)
│   │   ├── ClueRoundScreen.tsx       ← 5-min timer, clue input, clue history
│   │   ├── VotingScreen.tsx          ← Vote for who's the imposter
│   │   └── ResultsScreen.tsx         ← Show word, scores, play again
│   ├── data/
│   │   └── wordBank.ts               ← 18 categories, 50+ words each
│   ├── types/
│   │   └── game.ts                   ← TypeScript type definitions
│   ├── utils/
│   │   └── gameLogic.ts              ← Game state management, scoring
│   ├── App.tsx                       ← Main app component, routing
│   ├── main.tsx                      ← Entry point
│   ├── index.css                     ← Tailwind imports
│   └── App.css                       ← Custom styles
├── public/                           ← Static assets
├── dist/                             ← Production build (ready to deploy)
├── package.json                      ← Dependencies & scripts
├── vite.config.ts                    ← Vite + PWA config
├── tailwind.config.js                ← Tailwind configuration
├── postcss.config.js                 ← PostCSS configuration
├── tsconfig.json                     ← TypeScript config
├── README.md                         ← Full documentation
├── QUICKSTART.md                     ← Simple setup guide
└── PROJECT_SUMMARY.md                ← This overview
```

---

## 🎮 Game Phases Explained

### 1️⃣ SetupScreen
```
Player Count: 3-8 (slider)
Imposters: 1-N (slider, max half the players)
Duration: 1-10 minutes
Category: Dropdown with 18 options
→ Start Game button
```

### 2️⃣ RoleRevealScreen
```
Each player sees:
CREWMATE: "The secret word is: SUSHI"
  or
IMPOSTER: "Category hint: FOOD"

Players take turns, phone resets between each person
Progress bar shows how many have revealed their roles
```

### 3️⃣ ClueRoundScreen
```
⏱️ TIMER (counting down in bold)
📝 CLUES HISTORY (scrollable list of all clues given)
🎯 INPUT FIELD (type one-word clues, press Enter or click Add)
🏁 END ROUND button (when time runs out, auto-advance)
```

### 4️⃣ VotingScreen
```
For each player:
  ☑️  VOTED checkbox (once they vote, locked in)
  OR
  [Player2] [Player3] [Player4] (vote buttons)

Shows progress: "3 / 5 voted"
"Reveal Results" button appears when everyone votes
```

### 5️⃣ ResultsScreen
```
🎉 CREWMATES WIN! or 😈 IMPOSTER WINS!
Secret word revealed
Voted-out player details
Score table
Next category picker
Play Again button
```

---

## 🎯 Key Features Breakdown

| Feature | Implementation | Location |
|---------|-----------------|----------|
| **Word Bank** | 18 categories, 900+ words | `src/data/wordBank.ts` |
| **Timer** | React useEffect, 1-second ticks | `src/components/ClueRoundScreen.tsx` |
| **Scoring** | Map<playerId, points>, persisted | `src/utils/gameLogic.ts` |
| **State Management** | React hooks + GameState type | `src/types/game.ts` |
| **Responsive Design** | Tailwind CSS + mobile-first | All `.tsx` files |
| **PWA** | vite-plugin-pwa + Workbox | `vite.config.ts` |
| **Offline Support** | Service worker caching | Automatic (Vite PWA) |

---

## 🚀 Commands Cheatsheet

```bash
# Development
cd /var/home/jmusal/imposter-game
npm run dev              # Start dev server (running now!)

# Production
npm run build            # Build for deployment
npm run preview          # Preview production build locally

# Code Quality (optional)
npm run lint             # Check code style
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Easiest)
```bash
npm run build
# Upload dist/ to Vercel (or connect GitHub)
```

### Option 2: Netlify
```bash
npm run build
# Drag-drop dist/ folder to Netlify
```

### Option 3: GitHub Pages
```bash
npm run build
# Push dist/ to gh-pages branch
```

### Option 4: Self-hosted
```bash
npm run build
# Upload dist/ to any web server (Apache, Nginx, etc.)
```

---

## 🎨 Customization Guide

### Add a New Word Category

Edit `src/data/wordBank.ts`:

```typescript
{
  name: "Video Games",  // ← Your category name
  words: [
    "Fortnite", "Minecraft", "Zelda", "Mario",
    // ... add 50+ words
  ]
},
```

### Change Colors

Edit `tailwind.config.js` or use Tailwind classes:
- Current theme: Purple (`from-purple-600`) to Blue (`to-blue-600`)
- Change in: `src/App.tsx` and component files

### Adjust Timer Defaults

Edit `src/components/SetupScreen.tsx`:
```typescript
const [roundDuration, setRoundDuration] = useState(300); // 300 = 5 minutes
```

### Change Player Limits

Edit `src/components/SetupScreen.tsx`:
```typescript
min="3" max="8"  // Change these numbers
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Dev server won't start | `npm install`, then `npm run dev` |
| Build errors | Delete `node_modules/`, run `npm install` again |
| PWA won't install | Use HTTPS (or localhost on dev) |
| Timer off | Check device system time |
| Scores not saving | They save in browser memory; close browser = reset |

---

## 📊 Technical Stack

```
React 18              - UI framework
TypeScript            - Type safety
Tailwind CSS v4       - Styling
Vite                  - Build tool
PWA (Workbox)         - Offline support
Service Worker        - App caching
```

**Bundle Size**: ~216 KB (69 KB gzipped)
**Supported Browsers**: All modern (Chrome 90+, Firefox 88+, Safari 14+)

---

## ✨ What Makes This Great for Your Use Case

✅ **No account needed** - Works offline after install
✅ **Pass-and-play** - Perfect for a phone at the table
✅ **Big, readable UI** - Easy to see from a distance
✅ **Mobile-first** - Designed for phones, not desktop
✅ **Instant feedback** - Timer, scores, clue history all visible
✅ **Quick rounds** - Configurable 1-10 minute games
✅ **No cheating** - Phone locks between role reveals

---

## 🎉 You're All Set!

The game is **ready to play right now**:

1. Open **http://localhost:5173** in your browser
2. Try a test game to see how it works
3. Install on your phone (browser menu → "Install app")
4. Pass it around and have fun! 🎮

---

**Questions?** Check README.md or QUICKSTART.md in the project folder.

**Ready to modify?** Start by checking the component files in `src/components/` — they're well-commented and easy to tweak.

**Ready to deploy?** Run `npm run build`, then upload `dist/` to any of the hosting options above.

Enjoy! 🕵️✨
