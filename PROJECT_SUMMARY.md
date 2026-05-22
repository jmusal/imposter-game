# Imposter Game - Project Summary

## ✅ What's Built

A complete, production-ready **Progressive Web App (PWA)** for the Imposter word game. Your daughter and her friends can pass a phone around the table, and the app handles:

- 👥 Role assignment (who's the imposter?)
- 🕐 5-minute countdown timer for clue-giving
- 📝 Recording of all clues
- 🗳️  Voting phase
- 🏆 Score tracking across multiple rounds
- 📚 18 categorized word banks (Food, Movies, Sports, Animals, etc.)

## 📁 Project Location

```
/var/home/jmusal/imposter-game/
```

## 🚀 Quick Commands

```bash
cd /var/home/jmusal/imposter-game

# Start dev server (already running)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Access

- **Development**: http://localhost:5173
- **To test**: Open in browser, or install as PWA from menu

## 🏗️ Architecture

**Frontend Framework**: React 18 + TypeScript
**Styling**: Tailwind CSS v4
**Build Tool**: Vite
**PWA**: vite-plugin-pwa (Workbox service worker)
**State Management**: React hooks
**Storage**: LocalStorage (scores persist)

## 📱 Key Features

✅ **Fully Mobile Responsive** — Big tap targets, readable at a distance
✅ **Installable PWA** — Add to home screen on any device
✅ **Offline Capable** — Works without internet after first load
✅ **Score Tracking** — Persists across rounds
✅ **Polished UI** — Smooth animations, clear feedback
✅ **18 Word Categories** — 50+ words per category (large word bank)
✅ **Configurable Game Settings** — Players, imposters, duration, category
✅ **No Backend Needed** — Everything runs on the device

## 🎮 Game Flow

1. **Setup** → Pick # players, imposters, duration, category
2. **Role Reveal** → Pass phone to each player to see their role
3. **Clue Round** → Players give one-word clues (timer visible)
4. **Voting** → Everyone votes on who's the imposter
5. **Results** → Show word, who was voted out, scores
6. **Repeat** → Play more rounds with score tracking

## 📚 Word Bank

18 categories, each with 50+ words:
- Food, Animals, Movies, Sports, Technology
- Countries, Objects, Nature, Famous People, Professions
- Emotions, Colors, Weather, Transportation, Holidays
- Music, Superheroes, Disney Characters

## 🔧 Customization

Easy to extend:
- Add more word categories in `src/data/wordBank.ts`
- Tweak colors/styling in Tailwind CSS
- Adjust timer duration, player limits, voting rules in `src/utils/gameLogic.ts`

## 📦 Production Deployment

Build ready to deploy to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting

Command: `npm run build` → upload `dist/` folder

## 🎯 Next Steps

1. **Test the game**: Open http://localhost:5173 and play through a round
2. **Install on phone**: Use the browser menu to "Install app"
3. **Have fun**: Pass it around your daughter's friend group!

## 📖 Documentation Files

- **README.md** — Full technical documentation
- **QUICKSTART.md** — Simple setup guide for non-technical users
- **This file** — Project overview

---

**Status**: ✅ Ready to use! Dev server is running.

**Tech Stack**: React 18 • TypeScript • Tailwind CSS v4 • Vite • PWA

**Last Updated**: May 21, 2026
