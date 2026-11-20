import "./style.css";
import { topics } from "./data/library.js";
import { registerMap } from "./map.js";

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const page = $("#page");
const titles = {dashboard:"Overview",library:"Survival library",map:"World map",assistant:"NOVA assistant",emergency:"Emergency center",calculators:"Calculators",inventory:"Inventory",documents:"Field notes"};
let currentPage = "dashboard";

const getStore = (key, fallback=[]) => {
  try { return JSON.parse(localStorage.getItem(`deadnet:${key}`)) ?? fallback; }
  catch { return fallback; }
};
const setStore = (key, value) => localStorage.setItem(`deadnet:${key}`, JSON.stringify(value));
const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const card = (title, body, meta="") => `<article class="card">${meta ? `<div class="card-meta">${meta}</div>` : ""}<h3>${title}</h3>${body}</article>`;

function shell(title, kicker, body) {
  $("#page-heading").textContent = title;
  page.innerHTML = `<div class="section-head"><div><div class="eyebrow">${kicker}</div><h1>${title}</h1></div></div>${body}`;
}
function renderDashboard() {
  const inventory = getStore("inventory");
  const notes = getStore("notes");
  shell("Overview","FIELD STATUS / LOCAL DEVICE",`
    <div class="hero"><div class="hero-copy"><div class="eyebrow green">KNOWLEDGE SURVIVES DISCONNECTION</div><h2>Prepare before<br><em>the unexpected.</em></h2><p>Practical knowledge, local planning and geographic reference — available on this device.</p><button class="primary" data-go="emergency">Open emergency center <span>→</span></button></div><div class="hero-mark"><img src="/assets/deadnet-mark.svg" alt="DeadNET mark"></div></div>
    <div class="stat-grid">
      <div class="stat"><span>REFERENCE TOPICS</span><strong>${topics.length}</strong><small>Stored in this application</small></div>
      <div class="stat"><span>INVENTORY ITEMS</span><strong>${inventory.length}</strong><small>Saved locally</small></div>
      <div class="stat"><span>FIELD NOTES</span><strong>${notes.length}</strong><small>Saved locally</small></div>
      <div class="stat"><span>NETWORK MODE</span><strong class="green-text">LOCAL</strong><small>No account or cloud required</small></div>
    </div>
    <div class="content-grid"><div><div class="block-title">QUICK ACCESS</div><div class="quick-grid">
      <button class="quick" data-go="library"><b>▤</b><span>Survival library</span><small>Browse practical guides</small></button>
      <button class="quick" data-go="map"><b>◎</b><span>World map</span><small>Open local map data</small></button>
      <button class="quick" data-go="assistant"><b>✳</b><span>NOVA assistant</span><small>Search stored knowledge</small></button>
      <button class="quick" data-go="calculators"><b>⌗</b><span>Calculators</span><small>Plan household supplies</small></button>
    </div></div><div><div class="block-title">PRIORITY REMINDER</div>${card("Preparedness is layered",`<p>Keep water, food, medicines, lighting, a first-aid kit, paper maps and a household communication plan. Practice skills before an emergency.</p><p class="muted">DeadNET complements — it does not replace — local emergency services and hands-on training.</p>`,`FIELD NOTE`)}</div></div>
  `);
}
function renderLibrary() {
  shell("Survival library","OFFLINE KNOWLEDGE BASE",`
    <div class="toolbar"><input id="library-search" class="search" placeholder="Search water, shelter, first aid..." aria-label="Search library"><span class="muted">${topics.length} reference topics</span></div>
    <div id="topic-list" class="topic-grid">${topics.map(t=>`<button class="topic-card" data-topic="${t.id}"><div class="topic-top"><span>${esc(t.category)}</span><b>${esc(t.level)}</b></div><h3>${esc(t.title)}</h3><p>${esc(t.summary)}</p><span class="read-link">READ GUIDE →</span></button>`).join("")}</div>
    <div id="topic-detail"></div>
  `);
  $("#library-search").addEventListener("input", e => {
    const q=e.target.value.toLowerCase();
    $("#topic-list").innerHTML=topics.filter(t=>(t.title+" "+t.category+" "+t.summary+" "+t.body.join(" ")).toLowerCase().includes(q)).map(t=>`<button class="topic-card" data-topic="${t.id}"><div class="topic-top"><span>${esc(t.category)}</span><b>${esc(t.level)}</b></div><h3>${esc(t.title)}</h3><p>${esc(t.summary)}</p><span class="read-link">READ GUIDE →</span></button>`).join("") || `<p class="muted">No matching local references.</p>`;
  });
  $("#topic-list").addEventListener("click", e => {
    const btn=e.target.closest("[data-topic]"); if(!btn)return;
    const t=topics.find(x=>x.id===btn.dataset.topic);
    $("#topic-detail").innerHTML=`<article class="guide-detail"><button class="text-button" id="close-guide">← Back to topics</button><div class="eyebrow green">${esc(t.category)} / ${esc(t.level)}</div><h2>${esc(t.title)}</h2><p>${esc(t.summary)}</p><ol>${t.body.map(x=>`<li>${esc(x)}</li>`).join("")}</ol><p class="muted">Reference material: verify procedures against current official guidance and local conditions.</p></article>`;
    $("#close-guide").onclick=()=>$("#topic-detail").innerHTML="";
    $("#topic-detail").scrollIntoView({behavior:"smooth",block:"start"});
  });
}
function renderAssistant() {
  shell("NOVA assistant","NETWORKLESS OFFLINE VIRTUAL ASSISTANT",`
    <div class="assistant-layout"><div class="assistant-intro"><div class="nova-symbol">✳</div><div class="eyebrow green">LOCAL KNOWLEDGE MODE</div><h2>Ask what you need<br>to understand.</h2><p>NOVA searches the survival references stored inside DeadNET. It is a retrieval assistant, not a cloud AI model and not a substitute for professional advice.</p><div class="notice">NOVA currently answers from the bundled library only. It does not invent medical or technical procedures.</div></div>
    <div class="chat-panel"><div class="chat-head"><span class="status-dot"></span> NOVA / LOCAL SESSION <button id="clear-chat" class="text-button">CLEAR</button></div><div id="chat-log" class="chat-log"><div class="message nova"><b>NOVA</b><p>Hello. Ask about water, first aid, shelter, food, navigation, disasters or community preparedness.</p></div></div><form id="ask-form" class="ask-form"><input id="question" autocomplete="off" placeholder="Ask a survival question..." required><button class="primary">ASK ↗</button></form></div></div>
  `);
  const log=$("#chat-log");
  $("#clear-chat").onclick=()=>log.innerHTML="";
  $("#ask-form").onsubmit=e=>{
    e.preventDefault(); const q=$("#question").value.trim(); if(!q)return;
    log.insertAdjacentHTML("beforeend",`<div class="message user"><b>YOU</b><p>${esc(q)}</p></div>`);
    const words=q.toLowerCase().split(/[^a-z0-9]+/).filter(w=>w.length>2);
    const ranked=topics.map(t=>({t,score:words.reduce((n,w)=>n+((t.title+" "+t.category+" "+t.summary+" "+t.body.join(" ")).toLowerCase().includes(w)?1:0),0)})).sort((a,b)=>b.score-a.score).filter(x=>x.score>0).slice(0,2);
    const answer=ranked.length ? ranked.map(({t})=>`<h4>${esc(t.title)}</h4><p>${esc(t.summary)}</p><ul>${t.body.slice(0,4).map(x=>`<li>${esc(x)}</li>`).join("")}</ul><button class="text-button" data-open-topic="${t.id}">OPEN FULL GUIDE →</button>`).join("") : `<p>I couldn't find a reliable answer in the bundled references. Try a topic such as water safety, bleeding, burns, flood response, shelter or compass navigation. Do not rely on an unverified guess in an emergency.</p>`;
    log.insertAdjacentHTML("beforeend",`<div class="message nova"><b>NOVA / LOCAL LIBRARY</b>${answer}<small>Matched ${ranked.length} local reference(s). This is not generative AI.</small></div>`);
    $("#question").value=""; log.scrollTop=log.scrollHeight;
  };
  log.addEventListener("click",e=>{const b=e.target.closest("[data-open-topic]");if(b){renderLibrary();setTimeout(()=>{$(`[data-topic="${b.dataset.openTopic}"]`)?.click()},0)}});
}
function renderEmergency() {
  shell("Emergency center","QUICK RESPONSE / THINK BEFORE ACTING",`
    <div class="alert-banner"><b>IMMEDIATE DANGER?</b><span>Move away from the hazard, protect life and contact local emergency services if any channel is available. In India, emergency number 112 may be available.</span></div>
    <div class="emergency-grid">
      ${card("01 / SCENE SAFETY","<p>Check for fire, unstable structures, floodwater, power lines, chemicals and other hazards. Do not become another casualty.</p>","FIRST")}
      ${card("02 / PEOPLE","<p>Check responsiveness and breathing. Identify severe bleeding and other life-threatening problems. Provide only first aid within your training.</p>","ASSESS")}
      ${card("03 / SHELTER","<p>Move to a safer location. Avoid damaged buildings, flood paths, unstable slopes and indoor combustion devices.</p>","PROTECT")}
      ${card("04 / ESSENTIALS","<p>Secure safe water, essential medicines, food, warm/dry clothing, light, footwear and identity documents.</p>","STABILIZE")}
      ${card("05 / PLAN","<p>Account for household members. Set a meeting point, backup location and a written communication plan.</p>","COORDINATE")}
      ${card("06 / VERIFY","<p>Use trusted local information. Conditions change; do not assume routes, water sources or buildings remain safe.</p>","REASSESS")}
    </div>
    <div class="block-title">HOUSEHOLD ACTION CHECKLIST</div><div class="checklist" id="emergency-checks">
      ${["Check immediate hazards and move to safety","Account for everyone in the household","Check urgent injuries and essential medication","Identify safe drinking water","Prepare footwear, light and warm/dry clothing","Choose a meeting point and backup point","Record key information on paper","Check local official instructions when possible"].map((x,i)=>`<label><input type="checkbox" data-check="${i}"><span>${x}</span></label>`).join("")}
    </div>
  `);
  const saved=getStore("checks",[]);
  $$all("[data-check]").forEach(c=>c.checked=saved.includes(Number(c.dataset.check)));
  $("#emergency-checks").addEventListener("change",()=>setStore("checks",$$all("[data-check]:checked").map(x=>Number(x.dataset.check))));
}
function $$all(s){return [...document.querySelectorAll(s)]}
function renderCalculators() {
  shell("Calculators","HOUSEHOLD PLANNING / ESTIMATES",`
    <div class="calc-grid">
      <article class="card calculator"><div class="eyebrow green">WATER PLANNING</div><h2>Daily water estimate</h2><p>Use a planning estimate, not a substitute for local emergency guidance. Heat, illness, pregnancy, activity and sanitation needs can increase requirements.</p><label>People<input id="water-people" type="number" min="1" max="1000" value="4"></label><label>Days<input id="water-days" type="number" min="1" max="365" value="3"></label><label>Litres per person / day<input id="water-rate" type="number" min="1" max="20" step=".5" value="4"></label><div class="result" id="water-result">48 litres <small>estimated planning quantity</small></div></article>
      <article class="card calculator"><div class="eyebrow green">FOOD INVENTORY</div><h2>Supply duration</h2><p>Simple stock-duration estimate based on the daily household consumption you enter.</p><label>Available food (kcal)<input id="food-stock" type="number" min="0" value="24000"></label><label>Household daily requirement (kcal)<input id="food-rate" type="number" min="1" value="8000"></label><div class="result" id="food-result">3 days <small>estimated supply duration</small></div></article>
      <article class="card calculator"><div class="eyebrow green">POWER PLANNING</div><h2>Battery runtime</h2><p>Idealized estimate. Real runtime varies with inverter losses, battery condition, temperature and discharge limits.</p><label>Battery capacity (Wh)<input id="battery-cap" type="number" min="0" value="500"></label><label>Usable fraction (%)<input id="battery-use" type="number" min="1" max="100" value="80"></label><label>Load (W)<input id="battery-load" type="number" min=".1" value="25"></label><div class="result" id="battery-result">16 hours <small>idealized estimate</small></div></article>
    </div>
  `);
  const update=()=>{
    const n=id=>Math.max(0,Number($("#"+id).value)||0);
    $("#water-result").innerHTML=`${(n("water-people")*n("water-days")*n("water-rate")).toLocaleString()} litres <small>estimated planning quantity</small>`;
    $("#food-result").innerHTML=`${(n("food-stock")/Math.max(1,n("food-rate"))).toFixed(1)} days <small>estimated supply duration</small>`;
    $("#battery-result").innerHTML=`${(n("battery-cap")*n("battery-use")/100/Math.max(.1,n("battery-load"))).toFixed(1)} hours <small>idealized estimate</small>`;
  };
  $$all(".calculator input").forEach(i=>i.addEventListener("input",update)); update();
}
function renderInventory() {
  const items=getStore("inventory");
  shell("Inventory","LOCAL RESOURCE REGISTER",`
    <form id="inventory-form" class="inline-form"><input id="item-name" placeholder="Item name" required><input id="item-qty" placeholder="Quantity / notes" required><button class="primary">ADD ITEM +</button></form>
    <div class="inventory-list" id="inventory-list">${items.length?items.map((x,i)=>`<div class="inventory-row"><span>${esc(x.name)}</span><small>${esc(x.qty)}</small><button class="delete-button" data-delete="${i}" aria-label="Delete item">×</button></div>`).join(""):`<div class="empty-state">No supplies recorded. Add your household's essential items.</div>`}</div>
    <p class="muted">Inventory is stored in this browser/device only. Export a backup and keep a paper copy.</p>
  `);
  $("#inventory-form").onsubmit=e=>{e.preventDefault();const a=getStore("inventory");a.push({name:$("#item-name").value.trim(),qty:$("#item-qty").value.trim()});setStore("inventory",a);renderInventory()};
  $("#inventory-list").onclick=e=>{const b=e.target.closest("[data-delete]");if(!b)return;const a=getStore("inventory");a.splice(Number(b.dataset.delete),1);setStore("inventory",a);renderInventory()};
}
function renderDocuments() {
  const notes=getStore("notes");
  shell("Field notes","PRIVATE / STORED ON THIS DEVICE",`
    <form id="note-form" class="note-form"><input id="note-title" placeholder="Note title" required><textarea id="note-body" rows="5" placeholder="Write a location note, plan or observation..." required></textarea><button class="primary">SAVE NOTE</button></form>
    <div class="notes-list">${notes.map((n,i)=>`<article class="card note-card"><div class="card-meta">${new Date(n.date).toLocaleString()}</div><h3>${esc(n.title)}</h3><p>${esc(n.body)}</p><button class="text-button" data-note-delete="${i}">DELETE</button></article>`).join("") || `<div class="empty-state">No field notes yet.</div>`}</div>
    <div class="toolbar"><button id="export-data" class="secondary">EXPORT MY DATA (JSON)</button><label class="secondary import-label">IMPORT BACKUP<input type="file" id="import-data" accept="application/json" hidden></label></div>
  `);
  $("#note-form").onsubmit=e=>{e.preventDefault();const a=getStore("notes");a.unshift({title:$("#note-title").value.trim(),body:$("#note-body").value.trim(),date:new Date().toISOString()});setStore("notes",a);renderDocuments()};
  page.onclick=e=>{const b=e.target.closest("[data-note-delete]");if(b){const a=getStore("notes");a.splice(Number(b.dataset.noteDelete),1);setStore("notes",a);renderDocuments()}};
  $("#export-data").onclick=()=>{const data={inventory:getStore("inventory"),notes:getStore("notes"),checks:getStore("checks"),exportedAt:new Date().toISOString()};download("deadnet-backup.json",JSON.stringify(data,null,2),"application/json")};
  $("#import-data").onchange=async e=>{try{const d=JSON.parse(await e.target.files[0].text());for(const k of ["inventory","notes","checks"])if(Array.isArray(d[k]))setStore(k,d[k]);renderDocuments()}catch{alert("Backup file could not be read.")}};
}
function download(name,content,type){const a=document.createElement("a"),u=URL.createObjectURL(new Blob([content],{type}));a.href=u;a.download=name;a.click();URL.revokeObjectURL(u)}
function renderMap() {
  shell("World map","OFFLINE GEOGRAPHIC REFERENCE",`
    <div class="map-toolbar map-toolbar-gis">
      <div><b>GLOBAL MAP / OFFLINE ATLAS</b><small id="map-status">Loading bundled geographic data…</small></div>
      <div class="map-search map-search-gis">
        <select id="region-select" aria-label="Choose installed regional map"><option value="">Global overview</option></select>
        <input id="country-search" type="search" placeholder="Find a country or installed place…" aria-label="Find a country or installed place">
        <button id="map-reset" class="secondary" type="button">WORLD VIEW</button>
      </div>
    </div>
    <div id="map" class="map-canvas" role="application" aria-label="Interactive offline world and regional street map"></div>
    <section id="street-view-panel" class="street-view-panel" hidden aria-label="Offline street-level panorama viewer">
      <div class="street-view-head"><div><b data-pano-title>Street-level image</b><small data-pano-credit></small></div><div class="street-view-actions"><span data-pano-counter></span><button type="button" class="secondary" data-pano-prev>PREVIOUS</button><button type="button" class="secondary" data-pano-next>NEXT</button><button type="button" class="secondary" data-pano-close>CLOSE</button></div></div>
      <img alt="Offline street-level panorama" draggable="false">
      <p>Drag the image horizontally to look around. Images are available only when included in an installed regional imagery pack.</p>
    </section>
    <div id="map-detail" class="map-detail" aria-live="polite">Loading country reference data…</div>
    <div class="map-foot"><span>Global boundaries bundled · Regional street maps and imagery are optional local data packs</span><span>OpenStreetMap contributors / Natural Earth · See MAP-DATA.md</span></div>
  `);
  registerMap($("#map"), $("#map-status"), $("#country-search"), $("#map-detail"), $("#map-reset"), $("#region-select"), $("#street-view-panel"));
}
function navigate(name) {
  currentPage=name;
  $$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===name));
  $("#sidebar").classList.remove("open");
  ({dashboard:renderDashboard,library:renderLibrary,map:renderMap,assistant:renderAssistant,emergency:renderEmergency,calculators:renderCalculators,inventory:renderInventory,documents:renderDocuments}[name]||renderDashboard)();
}
$("#navigation").addEventListener("click",e=>{const b=e.target.closest("[data-page]");if(b)navigate(b.dataset.page)});
page.addEventListener("click",e=>{const b=e.target.closest("[data-go]");if(b)navigate(b.dataset.go)});
$("#menu-toggle").onclick=()=>$("#sidebar").classList.toggle("open");
window.addEventListener("online",()=>{$("#connection-label").textContent="LOCAL MODE · ONLINE DETECTED"});
window.addEventListener("offline",()=>{$("#connection-label").textContent="LOCAL MODE · OFFLINE"});
if("serviceWorker" in navigator && import.meta.env.PROD) navigator.serviceWorker.register("/sw.js").catch(()=>{});
navigate("dashboard");
