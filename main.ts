import { App, Plugin, PluginSettingTab, Setting, moment, setIcon } from 'obsidian';

const getMoment = moment as () => { format: (fmt: string) => string };

interface ClockStopwatchSettings {
	use24Hour: boolean;
	showSeconds: boolean;
	enableStopwatch: boolean;
	stopwatchMinutesOnly: boolean;
	paintStatusBar: boolean;
}

const DEFAULT_SETTINGS: ClockStopwatchSettings = {
	use24Hour: false,
	showSeconds: false,
	enableStopwatch: true,
	stopwatchMinutesOnly: false,
	paintStatusBar: true,
};

export default class StatusBarClockStopwatchPlugin extends Plugin {
	settings: ClockStopwatchSettings;

	private clockEl: HTMLElement | null = null;
	private stopwatchWrapperEl: HTMLElement | null = null;
	private stopwatchToggleEl: HTMLElement | null = null;
	private stopwatchIconEl: HTMLElement | null = null;
	private stopwatchTextEl: HTMLElement | null = null;
	private stopwatchResetEl: HTMLElement | null = null;

	private isRunning = false;
	private startTime = 0;
	private accumulatedMs = 0;

	async onload() {
		await this.loadSettings();

		this.applyStatusBarPaint();
		this.setupStatusBarItems();

		this.addSettingTab(new ClockStopwatchSettingTab(this.app, this));

		// Single 250ms tick keeps both clock and stopwatch crisp without heavy overhead
		this.registerInterval(
			window.setInterval(() => {
				this.updateClockDisplay();
				if (this.isRunning) {
					this.updateStopwatchDisplay();
				}
			}, 250)
		);
	}

	onunload() {
		document.body.removeClass('paint-status-bar-accent');
	}

	async loadSettings() {
		const loadedData = (await this.loadData()) as Partial<ClockStopwatchSettings> | null;
		this.settings = Object.assign({}, DEFAULT_SETTINGS, loadedData);
	}

	async saveSettings() {
		await this.saveData(this.settings);
		this.applyStatusBarPaint();
		this.updateClockDisplay();
		this.refreshStopwatchVisibility();
		this.updateStopwatchDisplay();
	}

	private applyStatusBarPaint() {
		if (this.settings.paintStatusBar) {
			document.body.addClass('paint-status-bar-accent');
		} else {
			document.body.removeClass('paint-status-bar-accent');
		}
	}

	private setupStatusBarItems() {
		// Stopwatch item
		this.stopwatchWrapperEl = this.addStatusBarItem();
		this.stopwatchWrapperEl.addClass('sb-stopwatch-container');

		this.stopwatchToggleEl = this.stopwatchWrapperEl.createSpan({
			cls: 'sb-stopwatch-btn',
			attr: { 'aria-label': 'Start or pause stopwatch' },
		});
		this.stopwatchIconEl = this.stopwatchToggleEl.createSpan({ cls: 'sb-stopwatch-icon' });
		this.stopwatchTextEl = this.stopwatchToggleEl.createSpan({ cls: 'sb-stopwatch-text' });
		this.stopwatchToggleEl.addEventListener('click', () => this.toggleStopwatch());

		this.stopwatchResetEl = this.stopwatchWrapperEl.createSpan({
			cls: 'sb-stopwatch-reset',
			attr: { 'aria-label': 'Reset stopwatch' },
		});
		setIcon(this.stopwatchResetEl, 'rotate-ccw');
		this.stopwatchResetEl.addEventListener('click', () => this.resetStopwatch());

		// Clock item
		this.clockEl = this.addStatusBarItem();
		this.clockEl.addClass('sb-clock-display');

		this.refreshStopwatchVisibility();
		this.updateStopwatchDisplay();
		this.updateClockDisplay();
	}

	private refreshStopwatchVisibility() {
		if (!this.stopwatchWrapperEl) return;
		if (this.settings.enableStopwatch) {
			this.stopwatchWrapperEl.show();
		} else {
			this.isRunning = false;
			this.stopwatchWrapperEl.hide();
		}
	}

	private toggleStopwatch() {
		if (this.isRunning) {
			this.accumulatedMs += Date.now() - this.startTime;
			this.isRunning = false;
		} else {
			this.startTime = Date.now();
			this.isRunning = true;
		}
		this.updateStopwatchDisplay();
	}

	private resetStopwatch() {
		this.isRunning = false;
		this.startTime = 0;
		this.accumulatedMs = 0;
		this.updateStopwatchDisplay();
	}

	private formatDuration(totalMs: number): string {
		const totalSeconds = Math.floor(totalMs / 1000);
		const pad = (n: number): string => (n < 10 ? `0${n}` : String(n));

		if (this.settings.stopwatchMinutesOnly) {
			const totalMinutes = Math.floor(totalSeconds / 60);
			const seconds = totalSeconds % 60;
			return `${pad(totalMinutes)}:${pad(seconds)}`;
		}

		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
	}

	private updateStopwatchDisplay() {
		if (!this.stopwatchIconEl || !this.stopwatchTextEl) return;
		const elapsed = this.isRunning
		? this.accumulatedMs + (Date.now() - this.startTime)
		: this.accumulatedMs;

		setIcon(this.stopwatchIconEl, this.isRunning ? 'pause' : 'play');
		this.stopwatchTextEl.setText(this.formatDuration(elapsed));
	}

	private updateClockDisplay() {
		if (!this.clockEl) return;

		let formatStr: string;
		if (this.settings.use24Hour) {
			formatStr = this.settings.showSeconds ? 'HH:mm:ss' : 'HH:mm';
		} else {
			formatStr = this.settings.showSeconds ? 'h:mm:ss A' : 'h:mm A';
		}

		this.clockEl.setText(getMoment().format(formatStr));
	}
}

class ClockStopwatchSettingTab extends PluginSettingTab {
	plugin: StatusBarClockStopwatchPlugin;

	constructor(app: App, plugin: StatusBarClockStopwatchPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
		.setName('24-hour clock format')
		.setDesc('Use 24-hour military time (HH:mm) instead of 12-hour AM/PM.')
		.addToggle((toggle) =>
		toggle
		.setValue(this.plugin.settings.use24Hour)
		.onChange(async (value) => {
			this.plugin.settings.use24Hour = value;
			await this.plugin.saveSettings();
		})
		);

		new Setting(containerEl)
		.setName('Show seconds')
		.setDesc('Display seconds on the status bar clock.')
		.addToggle((toggle) =>
		toggle
		.setValue(this.plugin.settings.showSeconds)
		.onChange(async (value) => {
			this.plugin.settings.showSeconds = value;
			await this.plugin.saveSettings();
		})
		);

		new Setting(containerEl)
		.setName('Enable session stopwatch')
		.setDesc('Show a pausable stopwatch in the status bar for timing sessions.')
		.addToggle((toggle) =>
		toggle
		.setValue(this.plugin.settings.enableStopwatch)
		.onChange(async (value) => {
			this.plugin.settings.enableStopwatch = value;
			await this.plugin.saveSettings();
		})
		);

		new Setting(containerEl)
		.setName('Show stopwatch in minutes only')
		.setDesc('Format elapsed stopwatch time as MM:SS instead of HH:MM:SS.')
		.addToggle((toggle) =>
		toggle
		.setValue(this.plugin.settings.stopwatchMinutesOnly)
		.onChange(async (value) => {
			this.plugin.settings.stopwatchMinutesOnly = value;
			await this.plugin.saveSettings();
		})
		);

		new Setting(containerEl)
		.setName('Paint status bar with accent color')
		.setDesc('Apply your theme accent color across the entire status bar.')
		.addToggle((toggle) =>
		toggle
		.setValue(this.plugin.settings.paintStatusBar)
		.onChange(async (value) => {
			this.plugin.settings.paintStatusBar = value;
			await this.plugin.saveSettings();
		})
		);
	}
}
