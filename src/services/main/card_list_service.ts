export interface Card {
    id: number;
    inputText: string;
    outputText: string;
    targetLanguage: string;
}

interface ICardListService {
    getCards(): Card[];
    addCard(card: Card): void;
    deleteCard(id: number): void;
}

class CardListService implements ICardListService {
    private static instance: CardListService;

    private constructor() {}

    static getInstance(): CardListService {
        if (!CardListService.instance) {
            CardListService.instance = new CardListService();
        }

        return CardListService.instance;
    }

    private cards: Card[] | null = [];

    getCards(): Card[] {
        if (this.cards) {
            return this.cards;
        }

        const cards = localStorage.getItem('cards');
        if (cards) {
            this.cards = JSON.parse(cards);
            return this.cards!;
        }

        this.cards = [];
        return this.cards;
    }

    addCard(card: Card) {
        if (!this.cards) {
            this.cards = [];
        }
        this.cards.push(card);
        localStorage.setItem('cards', JSON.stringify(this.cards));
    }

    deleteCard(id: number) {
        if (!this.cards) {
            return;
        }
        this.cards = this.cards.filter((card) => card.id !== id);
        localStorage.setItem('cards', JSON.stringify(this.cards));
    }
}

export default CardListService;
