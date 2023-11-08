import { makeAutoObservable } from 'mobx';
import TranslationCardStore, {
    TranslationCardState,
} from '../translation_card/translation_card_store';
import CardListService from '../../services/main/card_list_service';

class CardListStore {
    translationCardStoreList: TranslationCardStore[] = [];
    currentIndex = 0;

    constructor() {
        makeAutoObservable(this);
    }

    loadCardList() {
        const cardList = CardListService.getInstance().getCards();
        console.log(cardList);
        this.translationCardStoreList = cardList.map((card) =>
            TranslationCardStore.fromCard(card),
        );
        this.newCard();
    }

    scrollDown() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }
    }

    scrollUp() {
        if (this.currentIndex < this.translationCardStoreList.length - 1) {
            this.currentIndex++;
        }
    }

    newCard() {
        if (this.translationCardStoreList.length === 0) {
            const translationCardStore = new TranslationCardStore();
            translationCardStore.id = 0;
            this.translationCardStoreList.push(translationCardStore);
            this.currentIndex = 0;
            return;
        }

        if (
            this.translationCardStoreList[
                this.translationCardStoreList.length - 1
            ].state === TranslationCardState.Input
        ) {
            return;
        }

        const translationCardStore = new TranslationCardStore();
        translationCardStore.id =
            this.translationCardStoreList[
                this.translationCardStoreList.length - 1
            ].id + 1;
        this.translationCardStoreList.push(translationCardStore);
        this.currentIndex = this.translationCardStoreList.length - 1;
    }
}

export default CardListStore;
