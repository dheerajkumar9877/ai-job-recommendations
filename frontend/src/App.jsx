import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />

        {/* Candidate */}
        <Route
          path="/candidate/dashboard"
          element={<CandidateDashboard />}
        />

        {/* Recruiter */}
        <Route
          path="/recruiter/dashboard"
          element={<RecruiterDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;