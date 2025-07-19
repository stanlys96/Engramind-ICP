import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages";
import "./index.css";
import ShowcasePage from "./pages/showcase";
import ShowcaseCreatePage from "./pages/showcase/pages/create";
import DashboardPage from "./pages/dashboard";
import ShowcaseHowItWorks from "./pages/showcase/pages/how-it-works";
import ShowcaseFaq from "./pages/showcase/pages/faq";
import RoleplayDetail from "./pages/showcase/pages/roleplay";
import RubricsPage from "./pages/showcase/pages/rubrics";
import GlossaryPage from "./pages/showcase/pages/glossary";
import FileManagementPage from "./pages/showcase/pages/file-management";
import PersonaPage from "./pages/showcase/pages/persona";

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
        <Route path="/showcase/rubrics" element={<RubricsPage />} />
        <Route path="/showcase/glossary" element={<GlossaryPage />} />
        <Route path="/showcase/persona" element={<PersonaPage />} />
        <Route
          path="/showcase/file-management"
          element={<FileManagementPage />}
        />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
