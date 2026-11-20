# DeadNET 1.0.0 — First Public Source Release

**Tagline:** When the world goes offline, knowledge stays alive.

DeadNET 1.0.0 is the first release of the offline-first preparedness application.

## Included

- Responsive preparedness dashboard
- Survival reference library
- NOVA local keyword-retrieval assistant
- Emergency checklist
- Water, food and battery planning calculators
- Local inventory and field notes
- JSON backup export/import
- Installable PWA foundation and service-worker caching
- Bundled global country-boundary overview map
- Regional PMTiles street-map pack integration framework
- Regional place-index and locally stored street-imagery integration framework
- Capacitor configuration for future Android and iOS packaging

## Known limitations

- The bundled map is a small-scale country-boundary overview, not a detailed street map.
- No regional street-map archive, place database or street-level photographs are bundled in this release.
- Offline street maps and street imagery require separately prepared, compatible and properly licensed regional data packs.
- Turn-by-turn offline routing is not included.
- NOVA is a local reference-retrieval assistant, not a generative AI model.
- The survival library is an initial reference collection and requires qualified review before being treated as authoritative.
- Android and iOS project packaging/signing must be completed separately. iOS builds require macOS and Xcode.
- Offline use requires the app and any desired data packs to be installed/imported before connectivity is lost.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Release principle

DeadNET is a preparedness reference and local knowledge tool. It does not replace emergency services, professional medical care, practical training or official instructions.
