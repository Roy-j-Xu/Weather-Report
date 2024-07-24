import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ServiceProvider } from "../providers/service.provider";
import Home from "./pages/home/home";
import User from "./pages/user/user";

function App() {
    return (
        <ServiceProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<User />} />
            </Routes>
        </BrowserRouter>
        </ServiceProvider>
    );
}

export default App