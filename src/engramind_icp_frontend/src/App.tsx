import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages";
import "./index.css";
import ShowcasePage from "./pages/showcase";
import ShowcaseCreatePage from "./pages/showcase/pages/create";
import DashboardPage from "./pages/dashboard";
import ShowcaseHowItWorks from "./pages/showcase/pages/how-it-works";
import ShowcaseFaq from "./pages/showcase/pages/faq";
import RoleplayDetail from "./pages/showcase/pages/roleplay";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/showcase" element={<ShowcasePage />} />
        <Route path="/showcase/create" element={<ShowcaseCreatePage />} />
        <Route path="/showcase/how-it-works" element={<ShowcaseHowItWorks />} />
        <Route path="/showcase/faq" element={<ShowcaseFaq />} />
        <Route path="/showcase/roleplay/:id" element={<RoleplayDetail />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
