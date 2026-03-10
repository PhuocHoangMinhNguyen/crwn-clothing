# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Production URL

https://crwn-db-5ae19.web.app/

## Commands

```bash
pnpm start        # Dev server at localhost:3000
pnpm run build    # Production build
pnpm test         # Run tests (Jest/React Testing Library)
pnpm test -- --testPathPattern=App  # Run a single test file
```

> **Note:** Use `pnpm` (not `npm`). A `pnpm-lock.yaml` is present and `npm install` will fail.

## Architecture

This is a React 19 e-commerce app (Create React App) for a clothing store. Key technologies: Redux + redux-persist, Firebase (Auth + Firestore), React Router v7, SCSS, Reselect, Stripe.

### Key Package Versions

- React: 19.x (uses `createRoot` from `react-dom/client`)
- React Router DOM: 7.x (library mode — `Routes/Route/Navigate/useNavigate/useParams`)
- Redux: 5.x (uses `legacy_createStore`)
- React Redux: 9.x
- Firebase: 12.x (compat API)
- Sass: 1.x (replaced node-sass)
- Reselect: 5.x

### Redux State

Four slices in `src/redux/`, each following the pattern: `*.actions.js`, `*.reducer.js`, `*.selectors.js`, `*.types.js`:

- **user** — current authenticated user (not persisted)
- **cart** — cart items, hidden state (persisted to localStorage via redux-persist)
- **directory** — homepage category sections (static data)
- **shop** — product collections data (static data in `shop.data.js`)

Only `cart` is whitelisted in `redux-persist` config (`src/redux/root-reducer.js`).

### Routing

React Router v7 (library mode) with these routes:
- `/` → HomePage (directory/category grid)
- `/shop` → ShopPage → CollectionsOverview
- `/shop/:collectionId` → CollectionPage (uses `useParams` hook)
- `/checkout` → CheckoutPage
- `/signin` → SignInAndSignUpPage (redirects to `/` if already authenticated)

Note: `/shop/*` is used in `App.js` to support nested routes in `shop.component.jsx`.

### Firebase

`src/firebase/firebase.utils.js` exports:
- `auth` — Firebase Auth instance
- `firestore` — Firestore instance
- `signInWithGoogle` — Google OAuth popup
- `createUserProfileDocument(userAuth)` — creates/fetches user doc in `users/{uid}`

Uses Firebase compat API (`firebase/compat/app`). Auth state is subscribed in `App.js` `componentDidMount` and dispatches `setCurrentUser` to Redux.

### File Naming Conventions

- Components: `kebab-case/component-name.component.jsx`
- Styles: `component-name.styles.scss` (co-located with component)
- Redux: `slice-name.actions.js`, `slice-name.reducer.js`, etc.

### Selectors

Memoized selectors use `reselect` via `createSelector`. Shop selectors in `src/redux/shop/shop.selectors.js` normalize the collections array into a map keyed by `urlParam` for efficient collection lookup by route param.

### Notable Implementation Details

- `store.js` uses `legacy_createStore` (Redux 5 compatibility)
- `index.js` uses `createRoot` (React 19)
- `collection.component.jsx` uses `useParams` + `useSelector` hooks (not `connect`/`match.params`)
- `menu-item.component.jsx` uses `useNavigate` hook (not `withRouter`)
- `cart-dropdown.component.jsx` uses `useNavigate` hook (not `withRouter`)
- Most other components still use Redux `connect()` HOC
