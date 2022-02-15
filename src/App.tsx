import { MainLayout } from "./layout/MainLayout";
import { LoginPage } from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import { CharacterPage } from "./pages/CharacterPage";
import { LumberingPage } from "./pages/LumberingPage";
import { UserProvider } from "./context/userContext";
import { MiningPage } from "./pages/MiningPage";
import { FarmingPage } from "./pages/FarmingPage";

function App() {
    return (
        <UserProvider>
            <Routes>
                <Route path={"/"} element={<LoginPage />} />
                <Route
                    path={"/character"}
                    element={
                        <MainLayout>
                            <CharacterPage />
                        </MainLayout>
                    }
                />
                <Route
                    path={"/lumbering"}
                    element={
                        <MainLayout>
                            <LumberingPage />
                        </MainLayout>
                    }
                />
                <Route
                    path={"/mining"}
                    element={
                        <MainLayout>
                            <MiningPage />
                        </MainLayout>
                    }
                />
                <Route
                    path={"/farming"}
                    element={
                        <MainLayout>
                            <FarmingPage />
                        </MainLayout>
                    }
                />
            </Routes>
        </UserProvider>
    );
}

export default App;
