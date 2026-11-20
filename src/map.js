import maplibregl from "maplibre-gl";
import { Protocol } from "pmtiles";
import { feature } from "topojson-client";
import worldTopology from "world-atlas/countries-110m.json";
import "maplibre-gl/dist/maplibre-gl.css";

// PMTiles is registered locally. Regional archives are served by DeadNET itself;
// no third-party tile server is required at runtime.
const pmtilesProtocol = new Protocol();
try { maplibregl.addProtocol("pmtiles", pmtilesProtocol.tile); } catch (error) {
  if (!String(error?.message || error).toLowerCase().includes("already")) throw error;
}

const countries = feature(worldTopology, worldTopology.objects.countries);
const countryName = f => f?.properties?.name || f?.properties?.NAME || "Unknown area";
const WORLD = { center: [0, 20], zoom: 0.85 };
const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

function walkCoordinates(value, bounds) {
  if (!Array.isArray(value)) return;
  if (typeof value[0] === "number" && typeof value[1] === "number") { bounds.extend([value[0], value[1]]); return; }
  for (const child of value) walkCoordinates(child, bounds);
}

function worldStyle() {
  return {
    version: 8,
    sources: { countries: { type: "geojson", data: countries, generateId: true } },
    layers: [
      { id: "ocean", type: "background", paint: { "background-color": "#0b171b" } },
      { id: "country-fill", type: "fill", source: "countries", paint: {
        "fill-color": ["case", ["boolean", ["feature-state", "hover"], false], "#426d52", "#1b3026"],
        "fill-opacity": 0.96
      } },
      { id: "country-borders", type: "line", source: "countries", paint: {
        "line-color": "#72977d", "line-width": ["interpolate", ["linear"], ["zoom"], 0, 0.35, 4, 1]
      } }
    ]
  };
}

export function registerMap(container, status, searchInput, detail, resetButton, regionSelect, panoramaPanel) {
  if (!container) return;
  status.textContent = `Loading bundled world boundaries (${countries.features.length} features)…`;
  let activeMode = "world";
  let activeManifest = null;
  let localPlaces = [];
  let panoramas = [];
  let panoramaIndex = 0;
  const markers = [];

  const map = new maplibregl.Map({
    container, center: WORLD.center, zoom: WORLD.zoom, minZoom: 0.65, maxZoom: 18,
    renderWorldCopies: false, attributionControl: false, style: worldStyle()
  });
  map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "top-right");
  map.addControl(new maplibregl.ScaleControl({ maxWidth: 120, unit: "metric" }), "bottom-left");
  map.addControl(new maplibregl.AttributionControl({ compact: true, customAttribution: "Natural Earth · OpenStreetMap data where regional packs are installed" }), "bottom-right");

  function clearMarkers() { markers.forEach(marker => marker.remove()); markers.length = 0; }
  function showPanorama(index) {
    if (!panoramas.length || !panoramaPanel) return;
    panoramaIndex = (index + panoramas.length) % panoramas.length;
    const item = panoramas[panoramaIndex];
    const image = panoramaPanel.querySelector("img");
    const title = panoramaPanel.querySelector("[data-pano-title]");
    const credit = panoramaPanel.querySelector("[data-pano-credit]");
    const counter = panoramaPanel.querySelector("[data-pano-counter]");
    image.src = new URL(item.image, activeManifest.imageryBaseUrl || activeManifest.baseUrl).href;
    image.alt = item.title || "Offline street-level panorama";
    image.dataset.panX = "50";
    image.style.objectPosition = "50% 50%";
    title.textContent = item.title || "Street-level image";
    credit.textContent = item.attribution || activeManifest.attribution || "Image attribution not supplied";
    counter.textContent = `${panoramaIndex + 1} / ${panoramas.length}`;
    panoramaPanel.hidden = false;
    map.flyTo({ center: [item.lon, item.lat], zoom: Math.max(map.getZoom(), 16), essential: true });
  }
  function addPanoramaMarkers() {
    clearMarkers();
    panoramas.forEach((item, index) => {
      if (!Number.isFinite(item.lat) || !Number.isFinite(item.lon) || !item.image) return;
      const node = document.createElement("button");
      node.type = "button"; node.className = "street-marker"; node.title = item.title || "Open street-level image";
      node.textContent = "360°";
      node.addEventListener("click", () => showPanorama(index));
      markers.push(new maplibregl.Marker({ element: node, anchor: "bottom" }).setLngLat([item.lon, item.lat]).addTo(map));
    });
  }
  function bindWorldInteractions() {
    if (!map.getLayer("country-fill")) return;
    let hoveredId = null;
    map.on("mousemove", "country-fill", event => {
      map.getCanvas().style.cursor = "pointer";
      const f = event.features?.[0];
      if (hoveredId !== null) map.setFeatureState({ source: "countries", id: hoveredId }, { hover: false });
      hoveredId = f?.id ?? null;
      if (hoveredId !== null) map.setFeatureState({ source: "countries", id: hoveredId }, { hover: true });
    });
    map.on("mouseleave", "country-fill", () => {
      map.getCanvas().style.cursor = "";
      if (hoveredId !== null) map.setFeatureState({ source: "countries", id: hoveredId }, { hover: false });
      hoveredId = null;
    });
    map.on("click", "country-fill", event => {
      const f = event.features?.[0]; if (!f) return;
      const name = countryName(f);
      detail.textContent = `${name} · Generalized Natural Earth country outline; not a legal boundary or navigation reference.`;
      new maplibregl.Popup({ closeButton: true, maxWidth: "260px" }).setLngLat(event.lngLat).setText(name).addTo(map);
    });
  }

  async function loadRegionIndex() {
    if (!regionSelect) return;
    try {
      const response = await fetch("/maps/regions/index.json", { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const index = await response.json();
      const regions = Array.isArray(index.regions) ? index.regions : [];
      regionSelect.innerHTML = `<option value="">Global overview</option>` + regions.map(r => `<option value="${esc(r.manifest)}">${esc(r.name)}</option>`).join("");
      if (!regions.length) status.textContent = `Global boundaries ready · ${countries.features.length} features · No regional street packs installed`;
    } catch {
      if (regionSelect) regionSelect.innerHTML = `<option value="">Global overview</option>`;
      status.textContent = `Global boundaries ready · ${countries.features.length} features · Regional pack index unavailable`;
    }
  }

  async function loadRegion(manifestPath) {
    if (!manifestPath) { returnToWorld(); return; }
    status.textContent = "Loading local regional map pack…";
    try {
      const response = await fetch(manifestPath);
      if (!response.ok) throw new Error(`Could not read ${manifestPath} (${response.status})`);
      const manifest = await response.json();
      if (!manifest.archive || !manifest.style || !Array.isArray(manifest.center) || manifest.center.length !== 2) {
        throw new Error("Regional manifest is missing archive, style or center fields.");
      }
      const baseUrl = new URL(".", new URL(manifestPath, location.href)).href;
      const archiveUrl = new URL(manifest.archive, baseUrl).href;
      const styleUrl = new URL(manifest.style, baseUrl);
      const styleResponse = await fetch(styleUrl);
      if (!styleResponse.ok) throw new Error(`Could not load local style (${styleResponse.status})`);
      const style = await styleResponse.json();
      for (const source of Object.values(style.sources || {})) {
        if (source.url === "pmtiles://__DEADNET_ARCHIVE__") source.url = `pmtiles://${archiveUrl}`;
      }
      if (style.glyphs && !/^https?:\/\//i.test(style.glyphs)) style.glyphs = new URL(style.glyphs, styleUrl).href;
      if (style.sprite && !/^https?:\/\//i.test(style.sprite)) style.sprite = new URL(style.sprite, styleUrl).href;
      activeManifest = { ...manifest, baseUrl, imageryBaseUrl: manifest.imageryIndex ? new URL(".", new URL(manifest.imageryIndex, baseUrl)).href : baseUrl };
      activeMode = "region";
      localPlaces = [];
      panoramas = [];
      clearMarkers();
      map.setStyle(style);
      map.once("style.load", async () => {
        map.flyTo({ center: manifest.center, zoom: manifest.zoom || 11, essential: true });
        const jobs = [];
        if (manifest.places) jobs.push(fetch(new URL(manifest.places, baseUrl)).then(r => r.ok ? r.json() : [] ).then(data => { localPlaces = Array.isArray(data) ? data : []; }));
        if (manifest.imageryIndex) jobs.push(fetch(new URL(manifest.imageryIndex, baseUrl)).then(r => r.ok ? r.json() : { panoramas: [] }).then(data => { panoramas = Array.isArray(data.panoramas) ? data.panoramas : []; addPanoramaMarkers(); }));
        await Promise.all(jobs);
        status.textContent = `${manifest.name || "Regional map"} loaded · ${panoramas.length} local street images · offline pack`;
        detail.textContent = "Regional street data is stored locally. Select a 360° marker to open an installed street-level image.";
      });
    } catch (error) {
      status.textContent = `Regional pack error: ${error.message}`;
      detail.textContent = "Check the regional pack manifest, style and PMTiles archive. The global overview remains available.";
    }
  }

  function returnToWorld() {
    activeMode = "world"; activeManifest = null; localPlaces = []; panoramas = []; clearMarkers();
    if (panoramaPanel) panoramaPanel.hidden = true;
    map.setStyle(worldStyle());
    map.once("style.load", () => {
      map.flyTo({ center: WORLD.center, zoom: WORLD.zoom, essential: true });
      bindWorldInteractions();
    });
    status.textContent = `Global boundaries ready · ${countries.features.length} features`;
    detail.textContent = "Showing one global overview. Install a regional pack for detailed offline streets and place search.";
  }

  function search(query) {
    const q = query.trim().toLocaleLowerCase(); if (!q) return;
    if (activeMode === "region") {
      const match = localPlaces.find(p => String(p.name || "").toLocaleLowerCase() === q)
        || localPlaces.find(p => String(p.name || "").toLocaleLowerCase().includes(q));
      if (match && Number.isFinite(match.lat) && Number.isFinite(match.lon)) {
        map.flyTo({ center: [match.lon, match.lat], zoom: match.zoom || 16, essential: true });
        detail.textContent = `${match.name} · ${match.category || "Place"} · from the installed local place index.`;
      } else detail.textContent = `No installed local place matched “${query}”. Try a country name or install a regional place index.`;
      return;
    }
    const found = countries.features.find(f => countryName(f).toLocaleLowerCase() === q)
      || countries.features.find(f => countryName(f).toLocaleLowerCase().startsWith(q))
      || countries.features.find(f => countryName(f).toLocaleLowerCase().includes(q));
    if (!found) { detail.textContent = `No country or area matched “${query}”.`; return; }
    const bounds = new maplibregl.LngLatBounds(); walkCoordinates(found.geometry.coordinates, bounds);
    if (!bounds.isEmpty()) map.fitBounds(bounds, { padding: 70, maxZoom: 4.8, duration: 700 });
    detail.textContent = `${countryName(found)} · Generalized country outline.`;
  }

  map.on("load", () => {
    bindWorldInteractions();
    detail.textContent = "Global overview ready. Install regional packs for offline street-level detail.";
    loadRegionIndex();
  });
  map.on("error", event => { if (event.error) status.textContent = `Map rendering error: ${event.error.message || "unknown error"}`; });
  searchInput?.addEventListener("keydown", event => { if (event.key === "Enter") search(searchInput.value); });
  searchInput?.addEventListener("change", () => search(searchInput.value));
  resetButton?.addEventListener("click", returnToWorld);
  regionSelect?.addEventListener("change", () => loadRegion(regionSelect.value));
  panoramaPanel?.querySelector("[data-pano-prev]")?.addEventListener("click", () => showPanorama(panoramaIndex - 1));
  panoramaPanel?.querySelector("[data-pano-next]")?.addEventListener("click", () => showPanorama(panoramaIndex + 1));
  panoramaPanel?.querySelector("[data-pano-close]")?.addEventListener("click", () => { panoramaPanel.hidden = true; });
  const panoImage = panoramaPanel?.querySelector("img");
  if (panoImage) {
    let dragging = false, startX = 0, startPosition = 50;
    panoImage.addEventListener("pointerdown", event => { dragging = true; startX = event.clientX; startPosition = Number(panoImage.dataset.panX || 50); panoImage.setPointerCapture(event.pointerId); });
    panoImage.addEventListener("pointermove", event => {
      if (!dragging) return;
      const next = Math.max(0, Math.min(100, startPosition - (event.clientX - startX) / Math.max(1, panoImage.clientWidth) * 100));
      panoImage.dataset.panX = String(next); panoImage.style.objectPosition = `${next}% 50%`;
    });
    panoImage.addEventListener("pointerup", () => { dragging = false; });
    panoImage.addEventListener("pointercancel", () => { dragging = false; });
  }
  return map;
}
