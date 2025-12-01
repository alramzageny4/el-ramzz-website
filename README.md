# AI Event Website - Aivent Theme

A futuristic AI-event style website inspired by the "Aivent" theme, featuring neon purple aesthetics, neural network animations, and cinematic effects.

## Features

- 🎨 **Aivent-inspired Design**: Neon purple, deep indigo, and blue-violet gradients
- 🧠 **3D Neural Network**: Interactive Three.js neural network background
- ✨ **Cinematic Effects**: GSAP animations, particle effects, and holographic glows
- 📱 **Responsive Design**: Fully responsive across all devices
- 🎯 **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS, Three.js, GSAP

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Animations**: GSAP (GreenSock Animation Platform)
- **UI Effects**: Framer Motion

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── Navbar.tsx       # Navigation bar
│   ├── Hero.tsx         # Hero section with 3D effects
│   ├── WhyAttend.tsx    # Why attend section
│   ├── Speakers.tsx     # Speakers section
│   ├── Schedule.tsx     # Event schedule
│   ├── FAQ.tsx          # FAQ section
│   └── Footer.tsx       # Footer
└── public/              # Static assets
```

## Color Palette

- **Neon Purple**: `#A855F7`
- **Deep Indigo**: `#4C1D95`
- **Blue-Violet**: `#6366F1`
- **Lavender**: `#C084FC`
- **Dark Navy**: `#0F172A`

## Build for Production

```bash
npm run build
npm start
```

## License

MIT

