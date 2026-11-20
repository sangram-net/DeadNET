# ☢️ DeadNET

### When the world goes offline, knowledge stays alive.

\<p align="center">
&#x20; \<strong>An Offline-First Digital Survival & Emergency Preparedness Platform\</strong>
\</p>

\<p align="center">
&#x20; \<img src="[https://img.shields.io/badge/STATUS-IN%20DEVELOPMENT-orange?style=for-the-badge](https://img.shields.io/badge/STATUS-IN%20DEVELOPMENT-orange?style=for-the-badge)" />
&#x20; \<img src="[https://img.shields.io/badge/PLATFORM-OFFLINE--FIRST-00C853?style=for-the-badge](https://img.shields.io/badge/PLATFORM-OFFLINE--FIRST-00C853?style=for-the-badge)" />
&#x20; \<img src="[https://img.shields.io/badge/LICENSE-MIT-blue?style=for-the-badge](https://img.shields.io/badge/LICENSE-MIT-blue?style=for-the-badge)" />
\</p>

---

## 🧭 What is DeadNET?

**DeadNET** is an open-source, offline-first survival knowledge platform designed to help people prepare for emergencies and survive situations where internet connectivity and modern infrastructure may become unavailable.

Imagine a world where:

- The internet suddenly disappears.
- Natural disasters disrupt communication.
- Electricity and essential services become unavailable.
- Nuclear emergencies threaten populated areas.
- Civilization faces an extended infrastructure collapse.

DeadNET aims to keep essential survival knowledge accessible when online resources are no longer available.

From emergency first aid to water purification, navigation, disaster preparedness, and resource management, DeadNET brings essential information together in one locally accessible platform.

**No accounts. No cloud dependency. No internet required after installation and downloading the necessary resources.**

---

## 🎯 Core Objectives

- Build a self-contained survival knowledge library.
- Provide access to essential information without internet connectivity.
- Help users prepare for natural and human-made disasters.
- Provide practical emergency checklists and planning tools.
- Support offline access across desktop and mobile devices.
- Create an open-source survival resource anyone can improve.

---

## ⚡ Features

### 01. Survival Handbook

- Finding and treating drinking water.
- Food storage and preservation.
- Emergency shelter preparation.
- Fire safety and warmth.
- Basic outdoor survival.
- Navigation fundamentals.

### 02. Medical & First Aid

- Basic first-aid guidance.
- Bleeding and wound management.
- Burn response.
- CPR and emergency response references.
- Hygiene and infection prevention.
- Emergency medical inventory.

### 03. Disaster Preparedness

- Earthquake preparedness.
- Tsunami evacuation.
- Flood and cyclone preparedness.
- Wildfire safety.
- Extreme weather emergencies.
- Emergency evacuation planning.

### 04. Nuclear Emergency Preparedness

- Understanding radiation and radioactive fallout.
- Identifying appropriate shelter.
- Time, distance and shielding principles.
- Fallout exposure reduction.
- Decontamination fundamentals.
- Emergency supply planning.

### 05. Communication & Navigation

- Radio communication fundamentals.
- Emergency signaling.
- Compass navigation.
- Offline maps.
- Power and battery management.
- Emergency contact information.

### 06. Resource Management

- Food inventory.
- Water inventory.
- Medical supply tracking.
- Battery and fuel tracking.
- Personal survival checklist.
- Local emergency notes.

### 07. Apocalypse Simulation

A fictional survival simulation environment featuring:

- Zombie apocalypse scenarios.
- Resource management challenges.
- Shelter management.
- Survival decision-making.
- Emergency scenario exercises.

*Apocalypse Mode is designed for entertainment and educational simulation, not as a real-world emergency protocol.*

---

## 🖥️ Operating Modes

| Mode               | Purpose                       |
| ------------------ | ----------------------------- |
| 🟢 NORMAL MODE     | Preparation and readiness     |
| 🟠 CRISIS MODE     | Real-world emergency guidance |
| 🔴 APOCALYPSE MODE | Fictional survival simulation |

---

## 📴 Offline-First Architecture

DeadNET is designed to function without an active internet connection once installed and initialized.

Its offline architecture will use:

- **Service Workers:** Cache application resources.
- **IndexedDB:** Store local application data.
- **Local JSON Database:** Store survival knowledge.
- **Progressive Web App:** Enable installation.
- **Local Assets:** Avoid external runtime dependencies.
- **Offline Search:** Search downloaded survival information.

Important: Users must download the application, manuals, and required map data before losing connectivity. GitHub Pages is a distribution platform, not an offline hosting solution.

---

## 🛠️ Technology Stack

| Technology         | Purpose                   |
| ------------------ | ------------------------- |
| HTML5              | Application structure     |
| CSS3               | Interface and styling     |
| JavaScript         | Application functionality |
| Service Worker     | Offline caching           |
| IndexedDB          | Local database            |
| JSON               | Knowledge database        |
| PWA                | Installable application   |
| Leaflet            | Map interface             |
| OpenStreetMap data | Offline map resources     |

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

## 🚀 Installation

### Option 1: Clone the Repository

```bash
git clone https://github.com/sangram-net/DeadNET.git

cd DeadNET
```

### Option 2: Run a Local Development Server

Using Python:

```bash
python3 -m http.server 8080
```

Open your browser:

```text
http://localhost:8080
```

For testing service workers, use localhost or HTTPS.

### Option 3: GitHub Pages

1. Push the repository to GitHub.
2. Open repository Settings.
3. Navigate to Pages.
4. Select the deployment branch.
5. Save and wait for deployment.

---

## 🔐 Privacy & Security

DeadNET follows a local-first philosophy.

- No mandatory user accounts.
- No cloud-based personal data storage.
- No unnecessary tracking.
- No mandatory external APIs.
- Locally stored user notes and inventories.
- No dependence on third-party services during offline operation.

Users should still protect their devices with encryption, strong passwords, and secure backups.

---

## ⚠️ Important Safety Disclaimer

DeadNET is an educational emergency preparedness project.

It does not replace professional medical assistance, official disaster-management instructions, or emergency services.

In real emergencies:

- Follow instructions from local authorities.
- Prioritize evacuation when officially advised.
- Never approach tsunami-affected coastlines.
- During nuclear fallout emergencies, seek appropriate shelter immediately and follow official radiation safety guidance.
- Seek qualified medical assistance whenever possible.

The zombie apocalypse content is fictional.

---

## 🗺️ Development Roadmap

- [x] Project concept established.
- [x] Repository structure planned.
- [ ] Initial dashboard interface.
- [ ] Survival handbook.
- [ ] First-aid knowledge base.
- [ ] Disaster preparedness library.
- [ ] Nuclear emergency handbook.
- [ ] Offline search functionality.
- [ ] IndexedDB integration.
- [ ] Service Worker implementation.
- [ ] PWA installation support.
- [ ] Offline map integration.
- [ ] Resource inventory manager.
- [ ] Emergency checklist system.
- [ ] Apocalypse simulation mode.
- [ ] Android compatibility testing.
- [ ] Complete offline deployment.

---

## 🤝 Contributing

DeadNET is an open-source project, and contributions are welcome.

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

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Sangram Ganguly**

- GitHub: [@sangram-net](https://github.com/sangram-net)
- Website: [sangram.space](https://sangram.space)

---

\<p align="center">
&#x20; \<strong>DEADNET\</strong>
&#x20; \<br/>
&#x20; \<em>Prepare for the unexpected. Preserve the knowledge. Survive the unknown.\</em>
&#x20; \<br/>\<br/>
&#x20; ☢️ WHEN THE NETWORK DIES, DEADNET SURVIVES.
\</p>
