# ParkITB Repository Overview

This repository contains two related applications:

- **Mobile / Expo app**: located in the `app/` directory and powered by Expo Router.
- **Web dashboard**: located in the `web/` directory and powered by Vite + React.

## Why root-level config remains outside `app/`

The Expo project uses `app.json`, `package.json`, `tsconfig.json`, and other root files to configure the Expo app at the repository root. These files are not part of the `app/` source folder and need to remain at the repository root so Expo can start and build the project correctly.

While the `app/` directory contains the app's screens, routes, and UI, the root files define the project and build configuration.

## Project structure

- `app/` – Expo app source code and file-based routes
- `assets/` – shared assets used by the Expo app
- `web/` – separate React/Vite web dashboard project
- `package.json` – root Expo app scripts and dependencies
- `app.json` – Expo project configuration
- `tsconfig.json` – TypeScript configuration for Expo
- `web/package.json` – web app scripts and dependencies

## Running the Expo app

From the repository root:

```bash
npm install
npx expo start
```

Then choose one of the available targets:

- Android emulator or device
- iOS simulator or device
- Web browser via Expo Web

The Expo app uses `expo-router`, so the `app/` directory is the main entrypoint for navigation and screens.

## Running the web dashboard

From the `web` folder:

```bash
cd web
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Notes for developers

- The `app/` folder is the source code for the Expo app.
- The `web/` folder is a separate website/dashboard project.
- Do not move `app.json` or the root `package.json` into `app/`; Expo expects these files at the repository root.

If you want a cleaner workspace later, a true monorepo workspace layout is possible, but it requires additional configuration and is not necessary for the current setup.

## Learn more

- [Expo documentation](https://expo.dev)
- [Expo Router docs](https://docs.expo.dev/router/introduction/)
- [Vite documentation](https://vitejs.dev)
- [React documentation](https://react.dev)
