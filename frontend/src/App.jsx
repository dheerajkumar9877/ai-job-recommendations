import { BrowserRouter, Routes, Route } from "react-router-dom";

// ================= AUTH =================
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// ================= CANDIDATE =================
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import Jobs from "./pages/candidate/Jobs";
import JobDetails from "./pages/candidate/JobDetails";
import Recommendations from "./pages/candidate/Recommendations";
import Applications from "./pages/candidate/Applications";
import SavedJobs from "./pages/candidate/SavedJobs";
import Interviews from "./pages/candidate/Interviews";
import Profile from "./pages/candidate/Profile";

// ================= RECRUITER =================
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import CreateJob from "./pages/recruiter/CreateJob";
import ManageJobs from "./pages/recruiter/ManageJobs";
import Applicants from "./pages/recruiter/Applicants";
import CandidateDetails from "./pages/recruiter/CandidateDetails";
import CompanyProfile from "./pages/recruiter/CompanyProfile";
import RecruiterInterviews from "./pages/recruiter/Interviews";
import RecruiterProfile from "./pages/recruiter/Profile";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
        <Route path="/candidate/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/candidate/recommendations" element={<Recommendations />} />
        <Route path="/candidate/applications" element={<Applications />} />
        <Route path="/candidate/saved-jobs" element={<SavedJobs />} />
        <Route path="/candidate/interviews" element={<Interviews />} />
        <Route path="/candidate/profile" element={<Profile />} />

        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/Profile" element={<RecruiterProfile />} />
        <Route path="/recruiter/create-job" element={<CreateJob />} />
        <Route path="/recruiter/manage-jobs" element={<ManageJobs />} />
        <Route path="/recruiter/applicants" element={<Applicants />} />
        <Route path="/recruiter/candidate/:id" element={<CandidateDetails />} />
        <Route path="/recruiter/interviews" element={<RecruiterInterviews />} />
        <Route path="/recruiter/company-profile" element={<CompanyProfile />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;