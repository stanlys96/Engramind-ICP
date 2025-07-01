import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
