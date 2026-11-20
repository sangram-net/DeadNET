# ☢️ DeadNET

### When the world goes offline, knowledge stays alive.

<p align="center">
  <strong>An Offline-First Digital Survival & Emergency Preparedness Platform</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/STATUS-IN_DEVELOPMENT-orange?style=for-the-badge" alt="Development Status" />
  <img src="https://img.shields.io/badge/PLATFORM-OFFLINE--FIRST-00C853?style=for-the-badge" alt="Offline First" />
  <img src="https://img.shields.io/badge/LICENSE-MIT-blue?style=for-the-badge" alt="MIT License" />
</p>

<p align="center">
  <em>Prepare for the unexpected. Preserve the knowledge. Survive the unknown.</em>
</p>

---

## 🧭 What is DeadNET?

**DeadNET** is an open-source, offline-first survival knowledge platform designed to help people prepare for emergencies and survive situations where internet connectivity and modern infrastructure may become unavailable.

Imagine a world where:

- The internet suddenly disappears.
- Natural disasters disrupt communication.
- Electricity and essential services become unavailable.
- Nuclear emergencies threaten populated areas.
- Civilization faces an extended infrastructure collapse.

When online resources become inaccessible, DeadNET aims to keep essential survival knowledge available directly on your device.

From emergency first aid and water purification to navigation, disaster preparedness, and resource management, DeadNET brings essential information together in one locally accessible platform.

**No accounts. No cloud dependency. No internet required after installation and downloading the necessary resources.**

---

## 🎯 Core Objectives

- Build a self-contained digital survival knowledge library.
- Provide essential information without internet connectivity.
- Help people prepare for natural and human-made disasters.
- Provide practical emergency checklists and planning tools.
- Support offline access across desktop and mobile devices.
- Protect user privacy through local-first data storage.
- Create an open-source survival resource anyone can improve.

---

## ⚡ Features & Modules

### 01. Survival Handbook

Essential knowledge for surviving extended emergencies.

- Finding and treating drinking water.
- Food storage and preservation.
- Emergency shelter preparation.
- Fire safety and warmth.
- Basic outdoor survival.
- Navigation fundamentals.
- Essential survival equipment.

### 02. Medical & First Aid

A locally accessible emergency medical reference.

- Basic first-aid guidance.
- Bleeding and wound management.
- Burn response.
- CPR and emergency response references.
- Hygiene and infection prevention.
- Emergency medical inventory.
- Recognizing medical emergencies.

### 03. Natural Disaster Preparedness

Preparation and response information for major natural disasters.

- Earthquake preparedness.
- Tsunami evacuation.
- Flood and cyclone preparedness.
- Wildfire safety.
- Extreme weather emergencies.
- Emergency evacuation planning.
- Post-disaster safety.

### 04. Nuclear Emergency Preparedness

Educational resources for understanding and responding to nuclear emergencies.

- Understanding radiation and radioactive fallout.
- Identifying appropriate protective shelter.
- Time, distance and shielding principles.
- Fallout exposure reduction.
- Basic decontamination guidance.
- Emergency supply planning.
- Nuclear emergency preparedness checklists.

### 05. Communication & Navigation

Essential communication and navigation knowledge when conventional networks fail.

- Radio communication fundamentals.
- Emergency signaling.
- Compass navigation.
- Offline maps.
- Power and battery management.
- Emergency contact information.
- Communication planning.

### 06. Resource Management

Track and organize essential supplies.

- Food inventory.
- Water inventory.
- Medical supply tracking.
- Battery and power inventory.
- Emergency equipment checklist.
- Local emergency notes.
- Resource planning.

### 07. Apocalypse Simulation

A fictional survival simulation environment.

- Zombie apocalypse scenarios.
- Resource management challenges.
- Shelter management.
- Survival decision-making.
- Emergency scenario exercises.
- Long-term survival challenges.

*Apocalypse Mode is designed for entertainment and educational simulation, not as a real-world emergency protocol.*

---

## 🖥️ Operating Modes

| Mode | Description |
|---|---|
| 🟢 NORMAL MODE | Preparation, learning and readiness |
| 🟠 CRISIS MODE | Real-world emergency guidance |
| 🔴 APOCALYPSE MODE | Fictional survival simulation |

---

## 📴 Offline-First Architecture

DeadNET is designed to remain functional without an active internet connection once installed and initialized.

The application will use:

| Technology | Function |
|---|---|
| Service Workers | Cache application resources |
| IndexedDB | Store local application data |
| Local JSON Database | Store survival knowledge |
| Progressive Web App | Enable installation |
| Local Assets | Avoid external runtime dependencies |
| Offline Search | Search downloaded information |

### Offline Capabilities

- Access previously downloaded survival guides.
- Search the local knowledge database.
- Manage emergency checklists.
- Maintain local inventory records.
- Access bundled application resources.
- Use downloaded offline maps.

**Important:** DeadNET must be installed and its required resources downloaded before internet connectivity is lost. Offline maps must also be downloaded beforehand. GitHub Pages is a distribution platform, not an offline hosting solution.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Interface and styling |
| JavaScript | Application functionality |
| Service Worker | Offline caching |
| IndexedDB | Local database |
| JSON | Knowledge database |
| PWA | Installable application |
| Leaflet | Map interface |
| OpenStreetMap Data | Offline map resources |

---

## 📁 Project Structure

```text
DeadNET/
│
├── index.html
├── manifest.json
├── service-worker.js
│
├── assets/
│   ├── icons/
│   ├── images/
│   └── fonts/
│
├── css/
│   ├── main.css
│   ├── dashboard.css
│   └── handbook.css
│
├── js/
│   ├── app.js
│   ├── search.js
│   ├── storage.js
│   ├── checklist.js
│   └── emergency.js
│
├── database/
│   ├── first-aid.json
│   ├── water.json
│   ├── food.json
│   └── disasters.json
│
├── survival-guides/
│   ├── natural-disasters/
│   ├── nuclear-emergency/
│   ├── medical/
│   ├── navigation/
│   ├── communication/
│   └── apocalypse-fiction/
│
├── maps/
│
├── downloads/
│
├── README.md
├── LICENSE
└── CONTRIBUTING.md
```

---

## 🚀 Getting Started

### Prerequisites

- Git
- A modern web browser
- Python 3 (for local development)

### 1. Clone the Repository

```bash
git clone https://github.com/sangram-net/DeadNET.git
```

### 2. Enter the Project Directory

```bash
cd DeadNET
```

### 3. Start the Local Development Server

```bash
python3 -m http.server 8080
```

### 4. Open DeadNET

Visit:

```text
http://localhost:8080
```

For service worker testing, use localhost or HTTPS.

---

## 🌐 Deployment

DeadNET can be hosted through GitHub Pages.

1. Open the DeadNET repository.
2. Navigate to **Settings**.
3. Select **Pages**.
4. Choose the deployment branch.
5. Save the configuration.
6. Wait for GitHub Pages to publish the application.

For genuine offline functionality, install and initialize the application while connected to the internet.

---

## 🔐 Privacy & Security

DeadNET follows a local-first privacy philosophy.

- No mandatory user accounts.
- No mandatory cloud-based personal data storage.
- No unnecessary tracking.
- No mandatory external APIs during offline operation.
- Locally stored user notes and inventories.
- No external runtime dependencies for core offline functionality.

Users should protect their devices with encryption, strong passwords and secure backups.

---

## ⚠️ Safety Disclaimer

DeadNET is an educational emergency preparedness project.

It does not replace professional medical assistance, official disaster-management instructions, or emergency services.

In real emergencies:

- Follow instructions from local authorities.
- Prioritize evacuation when officially advised.
- Never approach tsunami-affected coastlines.
- During nuclear fallout emergencies, seek appropriate shelter immediately and follow official radiation safety guidance.
- Use verified medical references and seek qualified medical assistance whenever possible.

**DeadNET is not a substitute for professional emergency response.**

Zombie apocalypse content is fictional.

---

## 🗺️ Development Roadmap

### Phase 1 — Foundation
- [x] Project concept established.
- [x] Repository created.
- [x] Project documentation.
- [ ] Initial dashboard interface.
- [ ] Responsive application layout.

### Phase 2 — Survival Knowledge
- [ ] Survival handbook.
- [ ] First-aid knowledge base.
- [ ] Water and food management.
- [ ] Natural disaster library.
- [ ] Nuclear emergency handbook.
- [ ] Communication and navigation guides.

### Phase 3 — Offline Infrastructure
- [ ] Local JSON database.
- [ ] IndexedDB integration.
- [ ] Service Worker implementation.
- [ ] Offline search functionality.
- [ ] PWA installation support.
- [ ] Offline resource management.

### Phase 4 — Advanced Features
- [ ] Offline map integration.
- [ ] Emergency checklist system.
- [ ] Resource inventory manager.
- [ ] Personal emergency journal.
- [ ] Apocalypse simulation mode.
- [ ] Android compatibility testing.

### Phase 5 — Release
- [ ] Complete offline testing.
- [ ] Security and privacy review.
- [ ] Documentation completion.
- [ ] First stable release.

---

## 🤝 Contributing

DeadNET is an open-source project. Contributions, suggestions and improvements are welcome.

You can contribute by:

- Writing survival guides.
- Improving emergency documentation.
- Fixing bugs.
- Improving accessibility.
- Developing offline functionality.
- Testing the application.
- Improving the interface.
- Adding verified educational resources.

Please ensure that real-world safety information comes from reliable and authoritative sources.

---

## 📜 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Sangram Ganguly**

<p>
  <a href="https://github.com/sangram-net">GitHub</a> ·
  <a href="https://sangram.space">Website</a>
</p>

---

<p align="center">
  <strong>☢️ DEADNET</strong>
  <br/>
  <em>Prepare for the unexpected. Preserve the knowledge. Survive the unknown.</em>
  <br/><br/>
  <strong>WHEN THE NETWORK DIES, DEADNET SURVIVES.</strong>
</p>
