import { createContext, useContext } from 'react';
import TranslationCardStore from '../stores/translation_card/translation_card_store';

export const translationCardContext = createContext<TranslationCardStore>(
    {} as TranslationCardStore,
);

export const TranslationCardProvider = translationCardContext.Provider;

export const TranslationCardConsumer = translationCardContext.Consumer;

export const useTranslationCard = () => {
    const store = useContext(translationCardContext);

    if (!store) {
        throw new Error(
            'useTranslationCard must be used within a TranslationCardProvider.',
        );
    }

    return store;
};
