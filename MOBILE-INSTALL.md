# Install DeadNET on Android and iPhone

DeadNET 1.0.1 is an installable Progressive Web App (PWA). It can be added to the home screen on Android and iOS without an app-store account. The site must first be hosted over HTTPS; `localhost` is only for local development. Open the app once while connected and allow its core files to cache before relying on offline use.

## Android

1. Publish the built `dist/` directory to an HTTPS host (for example, GitHub Pages or your own HTTPS domain).
2. Open the HTTPS DeadNET address in Chrome.
3. Open the browser menu and choose **Install app** or **Add to Home screen**.
4. Launch DeadNET from the new home-screen icon.
5. While still connected, open the Survival Library and any required local data packs; then test in Airplane mode.

## iPhone / iPad

1. Publish the built `dist/` directory to an HTTPS host.
2. Open the HTTPS DeadNET address in **Safari**.
3. Tap **Share** → **Add to Home Screen**.
4. Enable **Open as Web App** if shown, then tap **Add**.
5. Launch from the home screen and test in Airplane mode after the first successful load.

## Build files

```bash
npm install
npm run build
```

The output is in `dist/`. This release does **not** include a signed Android APK, an iOS IPA, or App Store / Play Store publication. Those are separate native distribution steps. Android APK generation requires Android Studio/SDK; iOS app signing and distribution require macOS, Xcode, an Apple Developer account and provisioning. The PWA home-screen install above is the practical cross-platform install path for this release.

## Offline limitation

The app shell and bundled references can be cached locally. Detailed street-map packs, street-level photographs and routing data are not included by default and must be installed separately before going offline.
