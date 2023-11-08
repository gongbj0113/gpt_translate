import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import AppStore, { AppScreenType } from './stores/main/app_store';
import { AppProvider } from './hooks/app_provider';
import { CardListProvider } from './hooks/card_list_provider';
import Loading from './pages/loading/Loading';
import Main from './pages/main/Main';

function AppContent() {
    const [appStore] = useState(() => new AppStore());

    const Inner = observer(() => {
        return (
            <CardListProvider value={appStore.cardListStore}>
                {appStore.appScreenType === AppScreenType.Loading && (
                    <Loading />
                )}
                {appStore.appScreenType === AppScreenType.Main && <Main />}
            </CardListProvider>
        );
    });

    return (
        <AppProvider value={appStore}>
            <Inner />
        </AppProvider>
    );
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/app" element={<AppContent />} />
                    <Route path="*" element={<Navigate to="/app" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
