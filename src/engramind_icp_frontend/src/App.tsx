import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages";
import "./index.css";
import ShowcasePage from "./pages/showcase";
import ShowcaseQuickCreatePage from "./pages/showcase/pages/quick-create";
import DashboardPage from "./pages/dashboard";
import ShowcaseHowItWorks from "./pages/showcase/pages/how-it-works";
import ShowcaseFaq from "./pages/showcase/pages/faq";
import RoleplayDetail from "./pages/showcase/pages/roleplay";
import RubricsPage from "./pages/showcase/pages/rubrics";
import GlossaryPage from "./pages/showcase/pages/glossary";
import FileManagementPage from "./pages/showcase/pages/file-management";
import PersonaPage from "./pages/showcase/pages/persona";
import ShowcaseAdvanceCreatePage from "./pages/showcase/pages/advance-create";
import { LoggedInRoute } from "./routes/LoggedInRoute";
import { ProtectedRoute } from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<LoggedInRoute />}>
          {/* Home Page */}
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          {/* Showcase Page */}
          <Route path="/showcase" element={<ShowcasePage />} />
          <Route
            path="/showcase/roleplay/quick-create"
            element={<ShowcaseQuickCreatePage />}
          />
          <Route
            path="/showcase/roleplay/advance-create"
            element={<ShowcaseAdvanceCreatePage />}
          />
          <Route
            path="/showcase/how-it-works"
            element={<ShowcaseHowItWorks />}
          />
          <Route path="/showcase/faq" element={<ShowcaseFaq />} />
          <Route path="/showcase/roleplay/:id" element={<RoleplayDetail />} />
          <Route path="/showcase/rubrics" element={<RubricsPage />} />
          <Route path="/showcase/glossary" element={<GlossaryPage />} />
          <Route path="/showcase/persona" element={<PersonaPage />} />
          <Route
            path="/showcase/file-management"
            element={<FileManagementPage />}
          />
          {/* Dashboard Page */}
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
