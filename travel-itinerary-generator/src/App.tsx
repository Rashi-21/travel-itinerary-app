import { Navigate, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import CreatePackagePage from "./pages/CreatePackagePage";
import HomePage from "./pages/HomePage";
import PackagesPage from "./pages/PackagesPage";
import TourDetailPage from "./pages/TourDetailPage";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<CreatePackagePage />} path="/create-package" />
      <Route element={<PackagesPage />} path="/packages" />
      <Route element={<TourDetailPage mode="information" />} path="/tour/information" />
      <Route element={<TourDetailPage mode="plan" />} path="/tour/plan" />
      <Route element={<TourDetailPage mode="location" />} path="/tour/location" />
      <Route element={<TourDetailPage mode="gallery" />} path="/tour/gallery" />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  );
}

export default App;
