import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  MapPin,
  IndianRupee,
  FileText,
  GraduationCap,
  Code2,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import RecruiterSideBar from "../auth/RecruiterSideBar";

const API_URL = "http://localhost:5000";

function EditJob() {
  const navigate = useNavigate();
  const { user_id, job_id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    c_name: "",
    c_location: "",
    c_type: "Full Time",
    experience: "Fresher",
    salary: "",
    category: "",
    skills: "",
    job_des: "",
    requir: "",
    active: "active",
  });

  // =====================================================
  // FETCH JOB
  // =====================================================

  const fetchJob = async () => {
    if (!user_id || !job_id) {
      setError("User ID or Job ID is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      /*
        Change this endpoint if your backend GET route
        uses a different URL.
      */
      const response = await axios.get(
        `${API_URL}/recruiter/job/get-job/${user_id}/${job_id}`
      );

      const job =
        response.data?.job ||
        response.data?.data ||
        response.data;

      if (!job || typeof job !== "object") {
        throw new Error("Job data not found.");
      }

      setFormData({
        title: job.title || "",
        c_name: job.c_name || "",
        c_location: job.c_location || "",
        c_type: job.c_type || "Full Time",
        experience: job.experience || "Fresher",
        salary: job.salary || "",
        category: job.category || "",
        skills: job.skills || "",
        job_des: job.job_des || "",
        requir: job.requir || "",
        active: job.active || "active",
      });
    } catch (err) {
      console.error("Fetch job error:", err);

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Unable to load job details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [user_id, job_id]);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // UPDATE JOB
  // =====================================================

  const handleSubmit = async () => {
    try {
        const response = await axios.put(
            `http://localhost:5000/recruiter/job/update-job/${user_id}/${job_id}`,
            {
                title: formData.title,
                c_name: formData.c_name,
                c_location: formData.c_location,
                c_type: formData.c_type,
                experience: formData.experience,
                salary: formData.salary,
                category: formData.category,
                skills: formData.skills,
                job_des: formData.job_des,
                requir: formData.requir,
                active: formData.active
            }
        );
        setTimeout(() => {
            navigate('/recruiter/manage-jobs');
        }, 1000);

    } catch (error) {
        console.error(
            "Update job error:",
            error.response?.data || error
        );
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <RecruiterSideBar />

        <main className="ml-64 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mx-auto" />

            <p className="mt-4 text-slate-600 font-medium">
              Loading job details...
            </p>
          </div>
        </main>
      </div>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-50">
      <RecruiterSideBar />

      <main className="ml-64 min-h-screen">
        <div className="max-w-6xl mx-auto p-6 lg:p-8">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-emerald-600" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Edit Job
                </h1>

                <p className="text-sm text-slate-500 mt-1">
                  Update your job posting details
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/recruiter/manage-jobs")}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Jobs
            </button>
          </div>

          {/* SUCCESS */}
          {success && (
            <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700">
              <CheckCircle2 className="w-5 h-5 shrink-0" />

              <p className="font-medium text-sm">
                {success}
              </p>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              <AlertCircle className="w-5 h-5 shrink-0" />

              <p className="font-medium text-sm">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* =================================================
                BASIC INFORMATION
            ================================================= */}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-6">

              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="w-5 h-5 text-emerald-600" />

                <h2 className="text-lg font-bold text-slate-900">
                  Basic Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* JOB TITLE */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Job Title
                  </label>

                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Full Stack Developer"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* COMPANY */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Company Name
                  </label>

                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                    <input
                      type="text"
                      name="c_name"
                      value={formData.c_name}
                      onChange={handleChange}
                      required
                      placeholder="Company name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* LOCATION */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Location
                  </label>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                    <input
                      type="text"
                      name="c_location"
                      value={formData.c_location}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Chandigarh"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* JOB TYPE */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Job Type
                  </label>

                  <select
                    name="c_type"
                    value={formData.c_type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                {/* EXPERIENCE */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Experience
                  </label>

                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Fresher">Fresher</option>
                    <option value="0-1 Years">0-1 Years</option>
                    <option value="1-3 Years">1-3 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="5+">5+</option>
                  </select>
                </div>

                {/* SALARY */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Salary
                  </label>

                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      placeholder="e.g. 5-8 LPA"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* CATEGORY */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">
                      Select Category
                    </option>

                    <option value="Frontend Development">
                      Frontend Development
                    </option>

                    <option value="Backend Development">
                      Backend Development
                    </option>

                    <option value="Full Stack Development">
                      Full Stack Development
                    </option>

                    <option value="Data Science">
                      Data Science
                    </option>

                    <option value="AI / ML">
                      AI / ML
                    </option>

                    <option value="UI / UX">
                      UI / UX
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

              </div>
            </div>

            {/* =================================================
                SKILLS
            ================================================= */}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-6">

              <div className="flex items-center gap-2 mb-6">
                <Code2 className="w-5 h-5 text-emerald-600" />

                <h2 className="text-lg font-bold text-slate-900">
                  Skills
                </h2>
              </div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Required Skills
              </label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MySQL, JavaScript"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <p className="text-xs text-slate-400 mt-2">
                Separate skills using commas.
              </p>
            </div>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-6">

              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-emerald-600" />

                <h2 className="text-lg font-bold text-slate-900">
                  Job Description
                </h2>
              </div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description
              </label>

              <textarea
                name="job_des"
                value={formData.job_des}
                onChange={handleChange}
                rows="7"
                placeholder="Describe the role, responsibilities and day-to-day work..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
              />
            </div>

            {/* =================================================
                REQUIREMENTS
            ================================================= */}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-6">

              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-5 h-5 text-emerald-600" />

                <h2 className="text-lg font-bold text-slate-900">
                  Requirements
                </h2>
              </div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Job Requirements
              </label>

              <textarea
                name="requir"
                value={formData.requir}
                onChange={handleChange}
                rows="7"
                placeholder="Enter qualifications, education and other requirements..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
              />
            </div>

            {/* =================================================
                STATUS
            ================================================= */}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-6">

              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />

                <h2 className="text-lg font-bold text-slate-900">
                  Job Status
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* ACTIVE */}
                <label
                  className={`cursor-pointer rounded-xl border-2 p-4 transition ${
                    formData.active === "active"
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="active"
                    value="active"
                    checked={formData.active === "active"}
                    onChange={handleChange}
                    className="sr-only"
                  />

                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />

                    <div>
                      <p className="font-semibold text-slate-900">
                        Active
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        Candidates can apply for this job.
                      </p>
                    </div>
                  </div>
                </label>

                {/* CLOSED */}
                <label
                  className={`cursor-pointer rounded-xl border-2 p-4 transition ${
                    formData.active === "close"
                      ? "border-red-500 bg-red-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="active"
                    value="close"
                    checked={formData.active === "close"}
                    onChange={handleChange}
                    className="sr-only"
                  />

                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />

                    <div>
                      <p className="font-semibold text-slate-900">
                        Closed
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        Candidates cannot apply for this job.
                      </p>
                    </div>
                  </div>
                </label>

              </div>
            </div>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pb-8">

              <button
                type="button"
                onClick={() =>
                  navigate("/recruiter/manage-jobs")
                }
                disabled={saving}
                className="px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60 shadow-sm"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Update Job
                  </>
                )}
              </button>

            </div>

          </form>
        </div>
      </main>
    </div>
  );
}

export default EditJob;