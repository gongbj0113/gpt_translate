import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/app" element={<App />} />
                    <Route path="*" element={<Navigate to="/app" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
