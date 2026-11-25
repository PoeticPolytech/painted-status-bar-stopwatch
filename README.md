# Painted Status Bar Clock and Stopwatch

A lightweight desktop Obsidian plugin that adds a customizable 12/24-hour clock, a pausable session stopwatch with Lucide icons, and an optional full status bar theme accent paint.

Forked and expanded from [marty331/status-bar-clock-obsidian](https://github.com/marty331/status-bar-clock-obsidian).

<img width="127" height="30" alt="Status bar clock and HH:MM:SS stopwatch" src="[https://github.com/user-attachments/assets/a4d82c9d-014f-49aa-9e46-612f094c3109](https://github.com/user-attachments/assets/a4d82c9d-014f-49aa-9e46-612f094c3109)" />

<img width="188" height="33" alt="Status bar 24-hour clock with seconds and stopwatch" src="[https://github.com/user-attachments/assets/0c5e930c-9b77-4d25-8c82-1372a8ba32cd](https://github.com/user-attachments/assets/0c5e930c-9b77-4d25-8c82-1372a8ba32cd)" />

<!-- Paste a screenshot of the MM:SS stopwatch format right here -->


## Features

- **12-Hour & 24-Hour Clock:** Toggle between standard `h:mm A` and 24-hour `HH:mm` formats.
- **Seconds Display:** Optionally show or hide ticking seconds on the status bar clock.
- **Session Stopwatch:** Start, pause, and reset a status bar stopwatch using native Lucide icons (`play`, `pause`, `rotate-ccw`) and drift-free timestamp math (`Date.now()`) to track writing, work, or study sessions.
- **Minutes-Only Stopwatch Format (`MM:SS`):** Switch live between standard `HH:MM:SS` and uncapped `MM:SS` (e.g., `90:00`) without losing or resetting elapsed session time.
- **Accent Status Bar Paint:** Toggle your active Obsidian theme's accent color (`--color-accent`) across the entire status bar without needing a separate CSS snippet.

<!-- Replace the outdated 4-toggle screenshot below with new 5-toggle settings screenshot -->



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