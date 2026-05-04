# ☀️ SunCart – Summer Essentials Store

A modern summer eCommerce platform where users can explore and purchase seasonal products like sunglasses, summer outfits, skincare, beach accessories, and more.

## 🌐 Live URL

[https://summer-shopping-cart.vercel.app](https://summer-shopping-cart.vercel.app)

## 📌 Project Purpose

SunCart is a summer-themed eCommerce web application built as part of a web development assignment. Users can browse summer products, view detailed product information, manage their cart and wishlist, and place orders after authentication.

## ✨ Key Features

- 🌅 **Hero Slider** — Animated banner showcasing summer deals and offers
- 🔥 **Popular Products** — Displays top 3 products with sparkle animations
- 🔒 **Protected Routes** — Product details page requires login to access
- 🔐 **Authentication** — Email/password and Google OAuth via BetterAuth
- 👤 **My Profile** — Shows logged-in user's name, photo, and email
- ✏️ **Update Profile** — Users can update their name and profile photo
- 🛒 **Add to Cart** — Add products to cart, saved to MongoDB
- ❤️ **Wishlist** — Save favourite products, persisted in MongoDB
- 📦 **Place Orders** — Place orders visible in profile, saved to MongoDB
- 🌞 **Summer Care Tips** — Helpful skincare and hydration tips section
- 🏆 **Top Brands** — Showcases top summer product brands
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- 🎨 **Animate.css** — Smooth animations throughout the app

## 🛠️ Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Styling** — Tailwind CSS v4 + DaisyUI
- **Authentication** — BetterAuth
- **Database** — MongoDB (via MongoDB Atlas)
- **Animations** — Animate.css
- **Notifications** — React Hot Toast
- **Deployment** — Vercel

## 📦 NPM Packages Used

| Package                | Purpose                               |
| ---------------------- | ------------------------------------- |
| `better-auth`          | Authentication (email + Google OAuth) |
| `mongodb`              | Database connection                   |
| `animate.css`          | CSS animations                        |
| `react-hot-toast`      | Toast notifications                   |
| `daisyui`              | UI component library                  |
| `tailwindcss`          | Utility-first CSS framework           |
| `@tailwindcss/postcss` | Tailwind PostCSS plugin               |

## 🚀 Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com/Nishat-Annan-Mim/summer-shopping-cart..git
cd suncart
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env.local` file in root
