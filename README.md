# Painted Status Bar Clock and Stopwatch

A lightweight desktop Obsidian plugin that adds a customizable 12/24h status bar clock, optional session stopwatch, and optional status bar styling with accent color.

Forked and expanded from [marty331/status-bar-clock-obsidian](https://github.com/marty331/status-bar-clock-obsidian).

---
### **12-hour clock with seconds and HH:MM:SS stopwatch**
<img width="245" height="32" alt="Clock and HH:MM:SS stopwatch" src="https://github.com/user-attachments/assets/366632dd-3cbf-4bec-9b4a-b3dedcb1b094" />

---

### **24-hour clock with seconds and HH:MM:SS stopwatch**
<img width="231" height="33" alt="24-hour clock with seconds and HH:MM:SS stopwatch" src="https://github.com/user-attachments/assets/741e332d-5189-4e4e-b3bd-0833155e3875" />

---

### 24-hour clock and MM:SS stopwatch
<img width="182" height="32" alt="image" src="https://github.com/user-attachments/assets/0ef76ee1-7e54-472e-a79c-4f35bd98b98b" />




## Features

- **12-Hour & 24-Hour Clock:** Toggle between standard `h:mm A` and 24-hour `HH:mm` formats.
- **Seconds Display:** Optionally show or hide ticking seconds on the status bar clock.
- **Session Stopwatch:** Start, pause, and reset a status bar stopwatch using native Lucide icons (`play`, `pause`, `rotate-ccw`) and drift-free timestamp math (`Date.now()`) to track writing, work, or study sessions.
- **Minutes-Only Stopwatch Format (`MM:SS`):** Switch live between standard `HH:MM:SS` and uncapped `MM:SS` (e.g., `90:00`) without losing or resetting elapsed session time.
- **Accent Status Bar Paint:** Toggle your active Obsidian theme's accent color (`--color-accent`) across the entire status bar without needing a separate CSS snippet.

<img width="752" height="483" alt="image" src="https://github.com/user-attachments/assets/23ea5811-fccf-405f-9172-ce6afc092820" />




## Installation

### Option 1: Using BRAT (Recommended for Auto-Updates)

1. Install and enable the **BRAT** (Beta Reviewers Auto-update Tester) community plugin in Obsidian.
2. Open **Settings -> BRAT** and click **Add Beta plugin**.
3. Paste the repository URL:
   ```text
   https://github.com/PoeticPolytech/painted-status-bar-stopwatch
   ```
4. Click **Add Plugin**, then enable **Painted Status Bar Clock and Stopwatch** under **Settings -> Community plugins**.

### Option 2: Manual Installation

1. Go to the [Releases](https://github.com/PoeticPolytech/painted-status-bar-stopwatch/releases) page and download `manifest.json`, `main.js`, and `styles.css` from the latest release.
2. Open your Obsidian vault's `.obsidian/plugins/` directory and create a folder named `painted-status-bar-stopwatch`.
3. Place the three downloaded files inside that folder.
4. Reload plugins in Obsidian (**Settings -> Community plugins**) and toggle **Painted Status Bar Clock and Stopwatch** on.

## Building from Source

```bash
git clone https://github.com/PoeticPolytech/painted-status-bar-stopwatch.git
cd painted-status-bar-stopwatch
npm install
npm run build
```

## Credits

Originally created by [marty331](https://github.com/marty331/status-bar-clock-obsidian). Maintained and extended by [@PoeticPolytech](https://github.com/PoeticPolytech).
