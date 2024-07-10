import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import TapeInfoPage from './pages/TapeInfoPage';

const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="tape/:id" element={<TapeInfoPage />}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}
        