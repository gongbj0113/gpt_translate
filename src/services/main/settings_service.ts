interface Settings {
    defaultTargetLanguage: string;
    languages: string[];
}

interface ISettingsService {
    setSettings(settings: Settings): void;
    getSettings(): Settings;
}

const defaultSettings: Settings = {
    defaultTargetLanguage: 'ENGLISH',
    languages: [
        'ENGLISH',
        'SPANISH',
        'CHINESE',
        'JAPANESE',
        'KOREAN',
        'FRENCH',
        'GERMAN',
        'ITALIAN',
        'PORTUGUESE',
        'RUSSIAN',
    ],
};

class SettingsService implements ISettingsService {
    private static instance: SettingsService;

    private constructor() {}

    static getInstance(): SettingsService {
        if (!SettingsService.instance) {
            SettingsService.instance = new SettingsService();
        }

        return SettingsService.instance;
    }

    private settings: Settings | null = null;

    setSettings(settings: Settings) {
        this.settings = settings;
        localStorage.setItem('settings', JSON.stringify(settings));
    }

    setDefaultSettings() {
        this.setSettings(defaultSettings);
    }

    getSettings(): Settings {
        if (this.settings) {
            return this.settings;
        }

        const settings = localStorage.getItem('settings');
        if (settings) {
            this.settings = JSON.parse(settings);
            return this.settings!;
        }

        this.setDefaultSettings();
        return defaultSettings;
    }
}

export default SettingsService;
