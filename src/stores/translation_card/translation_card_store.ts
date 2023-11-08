import { makeAutoObservable, runInAction } from 'mobx';
import TranslateService from '../../services/translate/translate_service';
import CardListService, { Card } from '../../services/main/card_list_service';

export enum TranslationCardState {
    Input,
    Loading,
    Success,
    Error,
}

class TranslationCardStore {
    id: number = 0;
    state: TranslationCardState = TranslationCardState.Input;
    inputText: string = '';
    outputText: string = '';
    error: string = '';
    targetLanguage: string = 'ENGLISH';

    constructor() {
        makeAutoObservable(this);
    }

    static fromCard(card: Card) {
        const translationCardStore = new TranslationCardStore();
        translationCardStore.id = card.id;
        translationCardStore.inputText = card.inputText;
        translationCardStore.outputText = card.outputText;
        translationCardStore.targetLanguage = card.targetLanguage;
        translationCardStore.state = TranslationCardState.Success;
        return translationCardStore;
    }

    setInputText(inputText: string) {
        this.inputText = inputText;
    }

    setOutputText(outputText: string) {
        this.outputText = outputText;
    }

    setError(error: string) {
        this.error = error;
    }

    setTargetLanguage(targetLanguage: string) {
        this.targetLanguage = targetLanguage;
    }

    translate() {
        if (
            this.state !== TranslationCardState.Input ||
            this.inputText.trim().length === 0
        ) {
            return;
        }
        this.state = TranslationCardState.Loading;

        const translateService = new TranslateService();

        translateService
            .translate(this.inputText, this.targetLanguage)
            .then((outputText) => {
                if (outputText) {
                    this.setOutputText(outputText);
                    runInAction(() => {
                        this.state = TranslationCardState.Success;
                    });
                    CardListService.getInstance().addCard(this.getCard());
                } else {
                    this.setError('Error translating text');
                    runInAction(() => {
                        this.state = TranslationCardState.Error;
                    });
                }
            });
    }

    getCard(): Card {
        return {
            id: this.id,
            inputText: this.inputText,
            outputText: this.outputText,
            targetLanguage: this.targetLanguage,
        };
    }
}

export default TranslationCardStore;
