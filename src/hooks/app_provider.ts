import { createContext, useContext } from 'react';

import AppStore from '../stores/main/app_store';

export const AppContext = createContext<AppStore>({} as AppStore);

export const AppProvider = AppContext.Provider;

export const AppConsumer = AppContext.Consumer;

export const useApp = () => {
    const store = useContext(AppContext);

    if (!store) {
        throw new Error('useApp must be used within a PhoneVerifyProvider.');
    }

    return store;
};
