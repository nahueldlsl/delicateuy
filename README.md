# 🍰 Delicate by Viky — Pastelería Artesanal

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-61DAFB?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

A premium e-commerce storefront for **Delicate by Viky**, a specialized pastry brand based in Punta del Este, Uruguay. This application offers a seamless browsing experience with high-end animations and an integrated WhatsApp checkout flow.

---

## ✨ Key Features

-   **🛍️ Premium Catalog**: High-resolution product showcase with smooth transitions and hover effects.
-   **📱 WhatsApp Integration**: Automated order flow that redirects customers directly to WhatsApp with their pre-filled order summary.
-   **⚡ High Performance**: Built with Next.js 14 for lightning-fast server-side rendering and SEO optimization.
-   **🎨 Design System**: Custom-built design system ensuring brand consistency across all components.
-   **🔍 Dynamic SEO**: Fully optimized for local search in Uruguay with JSON-LD structured data and dynamic metadata.
-   **🌑 Modern Aesthetics**: Sleek, responsive design with a focus on visual excellence and premium user experience.

---

## 🛠️ Tech Stack

-   **Frontend**: Next.js 14 (App Router), Vanilla CSS, Framer Motion.
-   **Database**: Prisma ORM with PostgreSQL.
-   **State Management**: Zustand (Cart Store).
-   **Animations**: Framer Motion for micro-interactions and entry animations.
-   **Communication**: Direct WhatsApp API integration for order processing.

---

## 🚀 Getting Started

### Prerequisites

-   Node.js 18.x or higher
-   npm / yarn / pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nahueldlsl/delicateuy.git
   ```

2. Navigate to the app directory:
   ```bash
   cd delicateuy/app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the `app` directory with your database connection:
   ```env
   DATABASE_URL="your_postgresql_connection_string"
   ```

5. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📸 Visual Identity

The project follows a strict brand guideline defined in the `Delicate by Vicky — Design System` folder, focusing on elegant typography, soft color palettes, and high-quality imagery.

---

## 📄 License

This project is private and intended only for **Delicate by Viky**.

---

Developed with ❤️ by Nahuel De Los Santos.
