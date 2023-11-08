import { makeAutoObservable } from 'mobx';
import CardListStore from './card_list_store';
import SettingsService from '../../services/main/settings_service';
import { TranslationCardState } from '../translation_card/translation_card_store';

export enum AppScreenType {
    Loading = 'Loading',
    Main = 'Main',
    Settings = 'Settings',
    Language = 'Language',
}

class AppStore {
    cardListStore: CardListStore = new CardListStore();
    appTargetLanguage: string = 'ENGLISH';

    appScreenType: AppScreenType = AppScreenType.Loading;

    constructor() {
        makeAutoObservable(this);
    }

    initialize() {
        this.cardListStore.loadCardList();
        this.appTargetLanguage =
            SettingsService.getInstance().getSettings().defaultTargetLanguage;
    }

    finishLoading() {
        this.appScreenType = AppScreenType.Main;
    }

    openSettings() {
        this.appScreenType = AppScreenType.Settings;
    }

    closeSettings() {
        this.appScreenType = AppScreenType.Main;
    }

    openLanguage() {
        this.appScreenType = AppScreenType.Language;
    }

    setTargetLanguage(targetLanguage: string) {
        this.appTargetLanguage = targetLanguage;
        this.cardListStore.translationCardStoreList.forEach(
            (translationCardStore) => {
                if (translationCardStore.state === TranslationCardState.Input) {
                    translationCardStore.setTargetLanguage(targetLanguage);
                }
            },
        );
    }
}

export default AppStore;
