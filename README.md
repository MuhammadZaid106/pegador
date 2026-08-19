<div align="center">

# PEGADOR®

**Premium Streetwear — Next.js Storefront**

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![pnpm](https://img.shields.io/badge/pnpm-11-F69220?style=flat-square&logo=pnpm)](https://pnpm.io)

</div>

---

## Overview

**PEGADOR®** is a modern, high-performance e-commerce storefront for the German streetwear brand Pegador. Built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**, it delivers a premium, animated shopping experience — from a full-screen hero section to a sticky discount offer with an interactive sign-up modal.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 **Mega Navigation** | Animated mega menu with per-category columns and image cards, with constrained height + Y-axis scroll |
| 🖼️ **Hero Section** | Full-bleed background image that reveals naturally on scroll with overlay text & CTA |
| 👕 **Collection Section** | Dual-card grid (Men / Women) with top-left button overlays and hover effects |
| 🧥 **Hodie Section** | Edge-to-edge 4-image grid layout (2×2) with bottom-left collection buttons |
| 🎁 **Sticky Discount Bar** | Fixed bottom-left "Get 10% off" button visible across all sections |
| 🪟 **Discount Modal** | Full two-column popup — image side + sign-up form — auto-shown once per visitor via `localStorage` |
| 📢 **Announcement Bar** | Auto-scrolling top banner for promotions |
| ⚡ **Optimized Images** | All images use `next/image` for automatic WebP optimization and lazy loading |
| 🎨 **Smooth Animations** | Page transitions powered by `motion/react` (Framer Motion) |

---

## 🗂️ Project Structure

```
pegador/
├── public/                  # Static assets (images: img1–img11, logo SVG)
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with fonts
│   │   ├── page.tsx         # Home page — composes all sections
│   │   └── globals.css      # Global styles + custom scrollbar
│   └── component/
│       ├── Header.tsx            # Sticky/transparent header with nav & icons
│       ├── AnouncementBar.tsx    # Auto-scrolling promo banner
│       ├── HeroSection.tsx       # Full-screen hero with background image
│       ├── CollectionSection.tsx # Men's & Women's image card grid
│       ├── HodieSection.tsx      # 4-image Hoodies/Tees section (2×2 grid)
│       ├── StickyOffer.tsx       # Fixed "Get 10% off" button
│       ├── DiscountModal.tsx     # Sign-up popup with 10% discount offer
│       └── header/
│           ├── MegaMenu.tsx      # Animated dropdown mega menu
│           └── menuData.ts       # Nav links & mega menu data
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 20`
- **pnpm** `>= 11` — this project uses pnpm workspaces

```bash
npm install -g pnpm
```

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/pegador.git
cd pegador

# Install dependencies
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Lint

```bash
pnpm lint
```

### Production Build

```bash
pnpm build
pnpm start
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.3 | App framework & routing |
| [React](https://react.dev) | 19 | UI library |
| [TypeScript](https://www.typescriptlang.org) | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Utility-first styling |
| [motion/react](https://motion.dev) | 13 | Animations & transitions |
| [lucide-react](https://lucide.dev) | 1.31 | Icon library |
| [pnpm](https://pnpm.io) | 11 | Fast, disk-efficient package manager |

---

## 🎨 Design Decisions

- **Transparent → White Header**: The header transitions from transparent (over the hero image) to a white background on scroll or on mega menu hover.
- **Mega Menu Scroll**: The mega menu is capped at `60vh` height with `overflow-y-auto` so long category lists remain accessible without pushing page content.
- **Natural Image Heights**: Hero and collection images use `w-full h-auto` so they scale proportionally to the viewport width without letterboxing.
- **First-Visit Modal**: The discount modal auto-opens once per visitor using `localStorage`, then only opens manually via the sticky button on subsequent visits.

---

## 📦 Deployment

The easiest way to deploy is via **Vercel** — the platform built for Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

For other providers, run `pnpm build` to generate the production output in `.next/`, then serve it with `pnpm start` or a Node.js process manager.

---

## 📄 License

This project is for educational / portfolio purposes. The PEGADOR® brand, logo, and imagery are property of Pegador GmbH.

---

<div align="center">

Built with ❤️ using **Next.js** · **React** · **Tailwind CSS**

</div>
