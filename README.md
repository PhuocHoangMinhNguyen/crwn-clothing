# Crown Clothing

A full-featured e-commerce clothing store built with React, Redux, and Firebase.

**Live site:** https://crwn-db-5ae19.web.app/

## Features

- Browse clothing collections by category
- Add/remove items from a shopping cart (persisted across sessions)
- User authentication via Google OAuth or email/password (Firebase Auth)
- Checkout with Stripe payments
- Responsive UI with SCSS

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19, SCSS |
| State | Redux 5, redux-persist, Reselect |
| Routing | React Router v7 (library mode) |
| Backend | Firebase Auth + Firestore |
| Payments | Stripe (react-stripe-checkout) |
| Build | Create React App, Workbox (PWA) |

## Getting Started

**Prerequisites:** Node.js, pnpm

```bash
# Install dependencies
pnpm install

# Start dev server (http://localhost:3000)
pnpm start

# Run tests
pnpm test

# Production build
pnpm run build
```

## Project Structure

```
src/
├── App.js                  # Root component, auth listener, routes
├── components/             # Reusable UI components
│   ├── cart-dropdown/
│   ├── cart-icon/
│   ├── cart-item/
│   ├── checkout-item/
│   ├── collection-item/
│   ├── collection-preview/
│   ├── collections-overview/
│   ├── custom-button/
│   ├── directory/
│   ├── form-input/
│   ├── header/
│   ├── menu-item/
│   ├── sign-in/
│   ├── sign-up/
│   └── stripe-button/
├── pages/                  # Route-level page components
│   ├── checkout/
│   ├── collection/
│   ├── homepage/
│   ├── shop/
│   └── sign-in-and-sign-up/
├── redux/                  # Redux slices (actions/reducer/selectors/types)
│   ├── cart/
│   ├── directory/
│   ├── shop/
│   └── user/
└── firebase/
    └── firebase.utils.js   # Firebase config and helpers
```

## Routes

| Path | Page |
|---|---|
| `/` | Homepage — category grid |
| `/shop` | All collections overview |
| `/shop/:collectionId` | Single collection (hats, jackets, etc.) |
| `/checkout` | Cart checkout |
| `/signin` | Sign in / Sign up |

## Firebase Setup

Create a Firebase project and add your config to `src/firebase/firebase.utils.js`. Enable:
- **Authentication** — Google provider and Email/Password
- **Firestore** — for user profile documents

## Redux State

Only the `cart` slice is persisted to localStorage via `redux-persist`. The `user` slice resets on page reload (re-authenticated via Firebase Auth listener on mount).
