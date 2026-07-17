# Tower Defense

A browser-based tower defense game built with React, TypeScript, and Vite.

Still early: the app shell and board scaffolding are in place, along with an isometric Kenney asset pack for towers and landscape.

## Stack

- **React 19** + **TypeScript**
- **Vite** for dev server and builds
- **pnpm** as the package manager
- **oxlint** for linting
- [Kenney Tower Defense](https://kenney.nl) isometric sprites (CC0)

## Getting started

Requires [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Scripts

| Command         | Description                         |
| --------------- | ----------------------------------- |
| `pnpm dev`      | Start the Vite dev server           |
| `pnpm build`    | Typecheck and build for production  |
| `pnpm preview`  | Preview the production build locally|
| `pnpm lint`     | Run oxlint                          |

## Project layout

```
src/
  App.tsx                 # Root UI
  main.tsx                # React entry point
  index.css               # Global styles
  components/
    Board.tsx             # Game board (WIP)
  assets/
    kenney_tower-defense/ # Spritesheets and tile art
```

## Assets

Sprites are from [Kenney](https://www.kenney.nl) under [CC0](https://creativecommons.org/publicdomain/zero/1.0/). See `src/assets/kenney_tower-defense/License.txt` for the full license text.
