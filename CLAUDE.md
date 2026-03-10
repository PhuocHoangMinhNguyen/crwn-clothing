# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Dev server at localhost:3000
npm run build    # Production build
npm test         # Run tests (Jest/React Testing Library)
npm test -- --testPathPattern=App  # Run a single test file
```

## Architecture

This is a React 17 e-commerce app (Create React App) for a clothing store. Key technologies: Redux + redux-persist, Firebase (Auth + Firestore), React Router v5, SCSS, Reselect, Stripe.

### Redux State

Four slices in `src/redux/`, each following the pattern: `*.actions.js`, `*.reducer.js`, `*.selectors.js`, `*.types.js`:

- **user** — current authenticated user (not persisted)
- **cart** — cart items, hidden state (persisted to localStorage via redux-persist)
- **directory** — homepage category sections (static data)
- **shop** — product collections data (static data in `shop.data.js`)

Only `cart` is whitelisted in `redux-persist` config (`src/redux/root-reducer.js`).

### Routing

React Router v5 with these routes:
- `/` → HomePage (directory/category grid)
- `/shop` → ShopPage → CollectionsOverview
- `/shop/:collectionId` → CollectionPage (uses `collectionId` param to select from shop state)
- `/checkout` → CheckoutPage
- `/signin` → SignInAndSignUpPage (redirects to `/` if already authenticated)

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
