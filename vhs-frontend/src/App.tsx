import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from './pages/HomePage';
import TapeInfoPage from './pages/TapeInfoPage';
import TapeEditPage from './pages/TapeEditPage';
import TapeCreatePage from './pages/TapeCreatePage';

const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="tape/:id" element={<TapeInfoPage />}/>
                    <Route path="edit/:id" element={<TapeEditPage />}/>
                    <Route path="create" element={<TapeCreatePage />}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}
        