import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NewPage from "../pages/NewPage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/new" element={<NewPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes