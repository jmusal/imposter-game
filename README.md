# 🕵️ Imposter Game

A fun social deduction word game PWA built with React, TypeScript, and Tailwind CSS. Perfect for playing with friends using a single phone!

## How to Play

1. **Setup**: Pick the number of players (3-8), imposters (configurable), round duration, and word category
2. **Role Reveal**: Each player takes turns seeing their role:
   - **Crewmates** see the secret word and must give clues
   - **Imposters** see only the category hint and must blend in
3. **Clue Round**: Players take turns giving one-word clues (e.g., "raw" for Sushi, "tube" for Television)
4. **Voting**: Everyone votes on who they think is the imposter
5. **Results**: See who was voted out and the scores
6. **Repeat**: Play more rounds with automatic score tracking

## Features

✨ **Fully Responsive**: Works great on any screen size
🎮 **Mobile-First**: Optimized for passing a phone around
📱 **PWA**: Install on any device, works offline
🎨 **Polish UI**: Big text, clear buttons, smooth animations
📊 **Score Tracking**: Keep scores across multiple rounds
📚 **Large Word Bank**: 18 categorized word lists with 50+ words each
⚡ **No Backend**: Everything runs locally on your device

## Categories

- Food
- Animals
- Movies
- Sports
- Technology
- Countries
- Objects
- Nature
- Famous People
- Professions
- Emotions
- Colors
- Weather
- Transportation
- Holidays
- Music
- Superheroes
- Disney Characters

## Installation

### As a PWA (Recommended)

1. Visit the deployed app (or run locally, see below)
2. On mobile: tap the menu → "Install app" or "Add to Home Screen"
3. On desktop: click the install icon in the address bar

### As a Local Development Project

```bash
# Clone or navigate to the project
cd imposter-game

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:5173 in your browser
```

Then install as a PWA from the browser menu.

## Build for Production

```bash
npm run build
```

Output goes to `dist/` folder. Deploy to any static hosting (Vercel, Netlify, GitHub Pages, etc.).

## Project Structure

```
src/
├── components/          # React components
│   ├── SetupScreen.tsx
│   ├── RoleRevealScreen.tsx
│   ├── ClueRoundScreen.tsx
│   ├── VotingScreen.tsx
│   └── ResultsScreen.tsx
├── data/
│   └── wordBank.ts      # 18 word categories
├── types/
│   └── game.ts          # TypeScript types
├── utils/
│   └── gameLogic.ts     # Game state management
├── App.tsx
├── main.tsx
├── index.css
└── App.css
```

## Game Rules (Quick Reference)

- **Crewmate Win**: Vote out all imposters OR imposters quit
- **Imposter Win**: Don't get voted out OR reduce crewmates to imposter count
- **Clues**: One word only, no gestures, no acting out
- **Discussion**: Talk before voting to persuade others

## Tips for Playing

1. **Crewmates**: Give specific, context-rich clues (e.g., "raw" for Sushi, not just "food")
2. **Imposters**: Listen carefully to others' clues to figure out the word while staying inconspicuous
3. **Voting**: Watch who's asking questions or staying silent — imposters often struggle to keep up

## Technical Details

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4 + PostCSS
- **Build**: Vite
- **PWA**: vite-plugin-pwa with Workbox
- **State**: Simple React hooks (no Redux needed)

## Browser Support

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Offline Mode

The app works completely offline after the first load. Your word bank, game state, and scores are all stored locally.

## License

MIT

---

Have fun! 🎉
