# DeadNET

**When the world goes offline, knowledge stays alive.**

## First release

**Version:** 1.0.0

This is the first source release of DeadNET. It provides the preparedness application foundation and global country-boundary overview. Detailed regional street maps and street-level imagery are optional future data-pack integrations; they are not included in this release.


DeadNET is an offline-first human preparedness and knowledge-preservation application. It is designed to keep its core reference library, household tools and personal records available locally after installation and content setup.

> DeadNET is a preparedness reference, not a guarantee of survival, a substitute for practical training, professional medical care or official emergency instructions.

## Current implementation

- Responsive dashboard for mobile and desktop
- Installable PWA shell and service-worker caching
- Bundled survival reference library
- Local keyword-retrieval assistant (NOVA)
- Emergency action checklist
- Water, food and battery planning calculators
- Local inventory and field notes
- JSON backup export/import
- Interactive offline global country-boundary map (Natural Earth 1:110m)
- Optional regional PMTiles street-map pack loader (OpenMapTiles-compatible vector schema)
- Local regional place-name index and optional locally stored street-level panorama markers/viewer
- Local country search, regional place search, zoom-to-country, click identification and scale bar
- Capacitor configuration for Android and iOS packaging

## Global offline map

The World Map now includes a small-scale global country-boundary dataset through the `world-atlas` package (Natural Earth 1:110m lineage). It supports local country search, zoom-to-country, click identification, pan and zoom, and a metric scale bar. The map geometry is bundled into the app build; it does not request online tiles or geocoding.

The global overview is bundled. The application now has a loader for optional regional PMTiles street packs, local place indexes and licensed street-level imagery packs. **No regional street archive or panorama photographs are bundled yet**; install the relevant packs before expecting detailed streets or street imagery offline. This is not turn-by-turn navigation. Read [MAP-DATA.md](MAP-DATA.md) for the exact pack structure, licensing and offline verification steps.

## Requirements

- Node.js 20 or newer
- npm
- Git
- For Android packaging: Android Studio and Android SDK
- For iOS packaging: macOS with Xcode (Apple platform requirement)
- Disk space for the app, build dependencies and selected offline map/content packs

## Run on Kali Linux

```bash
git clone https://github.com/sangram-net/DeadNET.git
cd DeadNET
npm install
npm run dev
```

Open the local Vite address shown in the terminal.

Build production files:

```bash
npm run build
npm run preview
```

The production build is written to `dist/`.

## Test offline mode

1. Build the app with `npm run build`.
2. Serve `dist/` locally or install the PWA while connected.
3. Open the application once so the service worker can cache its core shell.
4. Disconnect networking / enable airplane mode.
5. Reopen the installed app and test the library, calculators, notes and inventory.
6. Import the map pack before going offline and verify the map with network access disabled.

A first visit cannot magically cache content that has never been installed or imported. Prepare the device before an emergency.

## Android

```bash
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

Build and sign the APK from Android Studio. Test on physical devices in airplane mode.

## iOS

iOS packaging requires macOS and Xcode:

```bash
npm run build
npx cap add ios
npx cap sync ios
npx cap open ios
```

Use Apple's supported signing and distribution process. iOS installation and background/storage behavior have platform restrictions; test on actual target devices.

## Desktop

The PWA can be installed from a supported desktop browser. A Tauri desktop wrapper can be added for native installers after the web build is stable.

## Offline data and privacy

- The app does not require a DeadNET account or backend.
- Inventory, notes and checklist state are stored in browser local storage in this starter.
- Browser storage can be cleared by the operating system or browser. Export backups and keep printed copies.
- Do not store passwords, highly sensitive identity data or information that would endanger someone if the device were accessed.
- The service worker caches same-origin app resources. It does not cache third-party web content.

## Safety and source quality

Survival and medical content must be reviewed by qualified domain experts before being treated as authoritative. Keep sources, review dates, jurisdiction and confidence levels with future content packs. Do not use improvised medical, chemical, electrical, structural or weapons instructions.

## Roadmap

1. Expand and medically review the survival knowledge library.
2. Add local search index and source metadata.
3. Integrate and validate global PMTiles data pack.
4. Add regional offline place search and routing packs.
5. Add optional on-device LLM support with model provenance and safety checks.
6. Add SQLite-backed storage and encrypted export options.
7. Add automated offline, accessibility, recovery and device compatibility tests.

## License

Choose and add a project license before public distribution. Keep third-party map data attribution and license obligations with every map pack.
