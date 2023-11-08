import { makeAutoObservable } from 'mobx';
import TranslationCardStore from '../translation_card/translation_card_store';
import CardListService from '../../services/main/card_list_service';

class CardListStore {
    translationCardStoreList: TranslationCardStore[] = [];
    currentIndex = 0;

    constructor() {
        makeAutoObservable(this);
    }

    loadCardList() {
        const cardList = CardListService.getInstance().getCards();

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
        const translationCardStore = new TranslationCardStore();
        this.translationCardStoreList.push(translationCardStore);
        this.currentIndex = this.translationCardStoreList.length - 1;
    }
}

export default CardListStore;
