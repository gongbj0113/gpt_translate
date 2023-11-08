import { createContext, useContext } from 'react';
import CardListStore from '../stores/main/card_list_store';

export const CardListContext = createContext<CardListStore>(
    {} as CardListStore,
);

export const CardListProvider = CardListContext.Provider;

export const CardListConsumer = CardListContext.Consumer;

export const useCardList = () => {
    const store = useContext(CardListContext);

    if (!store) {
        throw new Error('useCardList must be used within a CardListProvider.');
    }

    return store;
};
