<h1 align="center">Kenzan Umezaki — Developer Portfolio</h1>

<p align="center">
  <strong>Fullstack & AI/ML Developer · 9+ Years of Experience</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js 16">
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge&logo=three.js" alt="Three.js">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS 4">
</p>

---

## About

Personal portfolio showcasing my work as a Fullstack & AI/ML Developer. Built with **Next.js 16**, **React 19**, **Three.js**, and **Tailwind CSS 4**, featuring an interactive 3D animated background, glassmorphism UI, and scroll-driven animations.

My career spans fintech, DeFi, and blockchain — from ML recommendation engines and LLM-powered analytics at **Plaid** and **Finatext** in Japan, to leading autonomous agent architectures and on-chain AI at **Spherium.Finance** in Singapore.

---

## Highlights

- **Interactive 3D Background** — Six animated blobs rendered with Three.js custom GLSL shaders (noise vertex displacement + Fresnel glow)
- **Glassmorphism UI** — Semi-transparent cards with backdrop blur throughout
- **Scroll-Driven Animations** — Experience cards stack, fan, and unfold as you scroll
- **3D Project Cards** — Perspective tilt effect on hover
- **Dark Theme** — Deep dark background (#06060e) with vibrant accent colors
- **Fully Responsive** — Optimized for all devices and screen sizes
- **Contact Form** — Integrated email and Telegram notifications

---

## Sections

| Section | Description |
| --- | --- |
| **Hero** | Animated code card with 3D blobs behind |
| **About Me** | Profile photo and professional summary |
| **Experience** | Scroll-driven stacking card animation with 5 roles |
| **Skills** | Marquee display of 20+ technologies |
| **Projects** | 3D tilt project cards with code-style layout |
| **Education** | University of Tokyo (M.Sc.) and Osaka University (B.Sc.) |
| **Testimonials** | Client feedback in glassmorphism cards |
| **Contact** | Form with email/Telegram integration |

---

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Next.js 16 | App Router, Server Components, SSR |
| React 19 | UI with hooks and concurrent features |
| Three.js | 3D animated background with custom GLSL shaders |
| Tailwind CSS 4 | Utility-first styling |
| SASS | CSS preprocessing |
| Lottie | Lightweight vector animations |
| Nodemailer | Contact form email delivery |
| Axios | HTTP client |

---

## Getting Started

### Prerequisites

- Node.js 18.17+
- npm / pnpm / yarn

### Install & Run

```bash
git clone https://github.com/bing188025/developer-portfolio.git
cd developer-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env` file:

```env
NEXT_PUBLIC_GTM=GTM-XXXXXXX
NEXT_PUBLIC_APP_URL=https://your-domain.com
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
GMAIL_PASSKEY=your_gmail_app_password
EMAIL_ADDRESS=your_email@gmail.com
```

---

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bing188025/developer-portfolio)

### Docker

```bash
docker-compose up --build
```

---

## License

MIT
