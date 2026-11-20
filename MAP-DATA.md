# DeadNET GIS data packs

## What the application now supports

- A bundled global Natural Earth country-boundary overview.
- Optional regional street-map packs served from the device's own files.
- PMTiles vector archives using an OpenMapTiles-compatible layer schema.
- A local place-name index for searching installed regional places.
- Optional local street-level panorama images with coordinates and attribution.
- No third-party tile server is required when a complete pack is installed.

**Important:** The source package contains the loader, schemas and examples, but it does not contain a detailed street dataset or street-level photographs. The empty `public/maps/regions/index.json` means no regional street pack is installed yet. The app must never label a region as offline-ready until its data files are actually present and tested.

## Add a regional street pack

Create a folder such as:

```text
public/maps/regions/kolkata/
  manifest.json
  style.json
  tiles.pmtiles
  places.json
  imagery/
    index.json
    *.jpg
  fonts/                 # optional local glyph PBFs required by the chosen style
```

1. Prepare a PMTiles vector archive using an OpenMapTiles-compatible schema. The archive should contain the source layers referenced by `style.json` (for example `water`, `landuse`, `building`, `transportation`, `transportation_name`, and `place`).
2. Copy `manifest.example.json` to the region folder as `manifest.json` and update its name, centre, zoom, archive, style and optional index paths.
3. Copy `style.example.json` to `style.json`. Keep the source URL exactly as `pmtiles://__DEADNET_ARCHIVE__`; DeadNET replaces that token with the local archive URL.
4. Add a `places.json` array using `places.example.json` as a schema example. Coordinates must be WGS84 longitude/latitude.
5. For street imagery, add only images you are legally allowed to store and redistribute offline. Copy `imagery-index.example.json` to `imagery/index.json`, update image paths, coordinates, titles and attribution. The sample entry is illustrative; it does not point to an included image.
6. Add the pack to `public/maps/regions/index.json`:

```json
{
  "version": 1,
  "regions": [
    { "name": "Kolkata and surroundings", "manifest": "/maps/regions/kolkata/manifest.json" }
  ]
}
```

7. Run `npm run build`, install/open the app once, then disconnect all networking and test region selection, pan/zoom, labels, place search and every imagery marker.

## Data sources and licensing

- OpenStreetMap data is available under the Open Database License (ODbL). Provide visible attribution to **© OpenStreetMap contributors**, include the required licence notice, and comply with ODbL share-alike obligations where applicable: https://www.openstreetmap.org/copyright
- Natural Earth country-boundary data is public domain: https://www.naturalearthdata.com/about/terms-of-use/
- PMTiles is an archive format, not a source of map data. The source dataset's licence still applies.
- Street-level photographs and 360° panoramas have their own copyright, privacy, database and redistribution terms. Do not scrape Google Street View or assume that imagery visible on a website can be bundled. Use imagery explicitly licensed for offline redistribution or imagery you own and have permission to use.

## Coverage and safety limitations

- There is no complete worldwide offline street dataset included in this repository.
- Street imagery is sparse and unevenly distributed; global offline 360° coverage cannot be promised.
- This implementation displays local panorama images as horizontally draggable wide images. It is not yet a full spherical/WebGL 360° renderer.
- Place search uses the local `places.json` index, not a full offline geocoder.
- No turn-by-turn routing or routing graph is included.
- Roads, bridges, buildings, borders, imagery and water sources can be outdated or damaged. Never treat the map as confirmation that a route or location is currently safe.
