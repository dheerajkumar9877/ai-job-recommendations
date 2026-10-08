import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Briefcase,
  Users,
  CheckCircle2,
  XCircle,
  MapPin,
  CalendarDays,
  IndianRupee,
  Loader2,
  AlertCircle,
  RefreshCw,
  Building2,
} from "lucide-react";
import RecruiterSideBar from "../auth/RecruiterSideBar";

const API_URL = "http://localhost:5000";

function ManageJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // GET USER
  // =====================================================

  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch (error) {
      console.error("Invalid user:", error);
      return {};
    }
  };

  const user = getUser();

  const userId = user?.id || user?.user_id;

  // =====================================================
  // GET JOB ID
  // =====================================================

  const getJobId = (job) => {
    return job?.job_id;
  };

  // =====================================================
  // GET STATUS
  // Database:
  // active = Active
  // close  = Closed
  // =====================================================

  const getJobStatus = (job) => {
    const status = String(job?.active || "")
      .trim()
      .toLowerCase();

    if (status === "active") {
      return "Active";
    }

    return "Closed";
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // FETCH JOBS
  // =====================================================

  const fetchJobs = async () => {
    if (!userId) {
      setError("Recruiter information not found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
          `${API_URL}/recruiter/job/allJob`,
          {
              params: {
                  user_id: userId
              }
          }
      );

      if (Array.isArray(response.data)) {
        setJobs(response.data);
      } else if (Array.isArray(response.data?.jobs)) {
        setJobs(response.data.jobs);
      } else if (Array.isArray(response.data?.data)) {
        setJobs(response.data.data);
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.error("Fetch jobs error:", err);

      setJobs([]);

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Unable to load jobs. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [userId]);

  // =====================================================
  // VIEW JOB
  // =====================================================

  const handleView = (job) => {
     const jobId = getJobId(job); if (!userId || !jobId) { 
      setError("User ID or Job ID is missing."); return; 
    } navigate(`/recruiter/job/view-job/${userId}/${jobId}`);
  }; 

  const handleEdit = (job) => {
     const jobId = getJobId(job); if (!userId || !jobId) {
       setError("User ID or Job ID is missing."); 
       return; 
      } 
      navigate(`/recruiter/job/update-job/${userId}/${jobId}`); 
  };

  // =====================================================
  // DELETE JOB
  // =====================================================

  const handleDelete = async (job) => {
    const jobId = getJobId(job);

    if (!jobId) {
      setError("Job ID is missing.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(jobId);
      setError("");
      setSuccess("");

      await axios.delete(
        `${API_URL}/recruiter/job/delete-job/${userId}/${jobId}`
      );

      setJobs((previousJobs) =>
        previousJobs.filter(
          (item) => getJobId(item) !== jobId
        )
      );

      setSuccess("Job deleted successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.error("Delete job error:", err);

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Unable to delete the job. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // FILTER
  // =====================================================

  const filteredJobs = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const status = getJobStatus(job);

      const matchesStatus =
        statusFilter === "All" ||
        status === statusFilter;

      const matchesSearch =
        !searchText ||
        String(job?.title || "")
          .toLowerCase()
          .includes(searchText) ||
        String(job?.c_name || "")
          .toLowerCase()
          .includes(searchText) ||
        String(job?.c_location || "")
          .toLowerCase()
          .includes(searchText) ||
        String(job?.category || "")
          .toLowerCase()
          .includes(searchText);

      return matchesStatus && matchesSearch;
    });
  }, [jobs, search, statusFilter]);

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalJobs = jobs.length;

  const activeJobs = jobs.filter(
    (job) => getJobStatus(job) === "Active"
  ).length;

  const closedJobs = jobs.filter(
    (job) => getJobStatus(job) === "Closed"
  ).length;

  const totalApplicants = jobs.reduce((total, job) => {
    return (
      total +
      Number(
        job?.applicants_count ??
          job?.application_count ??
          job?.applicants ??
          0
      )
    );
  }, 0);

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    if (status === "Active") {
      return "bg-green-50 text-green-700 border-green-200";
    }

    return "bg-red-50 text-red-700 border-red-200";
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* SIDEBAR */}
        <RecruiterSideBar />

        {/* CONTENT */}
        <main className="ml-64 min-h-screen">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mx-auto" />

              <p className="mt-4 text-slate-600 font-medium">
                Loading jobs...
              </p>
            </div>
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
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <RecruiterSideBar />

      {/* =================================================
          MAIN CONTENT

          ml-64 = sidebar width
      ================================================= */}

      <main className="ml-64 min-h-screen min-w-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-7">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-emerald-600" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Manage Jobs
                </h1>

                <p className="text-sm text-slate-500 mt-1">
                  Manage and monitor your posted jobs
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/recruiter/create-job")
              }
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Post New Job
            </button>

          </div>

          {/* =================================================
              SUCCESS
          ================================================= */}

          {success && (
            <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700">

              <CheckCircle2 className="w-5 h-5 shrink-0" />

              <p className="font-medium text-sm">
                {success}
              </p>

            </div>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">

              <div className="flex items-center gap-3">

                <AlertCircle className="w-5 h-5 shrink-0" />

                <p className="font-medium text-sm">
                  {error}
                </p>

              </div>

              <button
                type="button"
                onClick={fetchJobs}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-red-200 hover:bg-red-100 text-sm font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>

            </div>
          )}

          {/* =================================================
              STAT CARDS
          ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">

            {/* TOTAL */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    Total Jobs
                  </p>

                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {totalJobs}
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>

              </div>

            </div>

            {/* ACTIVE */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    Active Jobs
                  </p>

                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {activeJobs}
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>

              </div>

            </div>

            {/* CLOSED */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    Closed Jobs
                  </p>

                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {closedJobs}
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>

              </div>

            </div>

            {/* APPLICANTS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    Applicants
                  </p>

                  <p className="text-3xl font-bold text-purple-600 mt-2">
                    {totalApplicants}
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              SEARCH / FILTER
          ================================================= */}

          <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-sm">

            <div className="flex flex-col md:flex-row gap-3">

              {/* SEARCH */}
              <div className="relative flex-1">

                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search jobs, company, location..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

              </div>

              {/* STATUS */}
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="md:w-48 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Closed">
                  Closed
                </option>
              </select>

              {/* REFRESH */}
              <button
                type="button"
                onClick={fetchJobs}
                className="px-4 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center gap-2 font-medium"
              >
                <RefreshCw className="w-5 h-5" />

                <span className="hidden sm:inline">
                  Refresh
                </span>
              </button>

            </div>

          </div>

          {/* =================================================
              JOBS
          ================================================= */}

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            {/* =================================================
                DESKTOP TABLE
            ================================================= */}

            <div className="hidden lg:block overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-50 border-b border-slate-200">

                  <tr>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Job
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Location
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Type
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Salary
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Applicants
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Status
                    </th>

                    <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredJobs.length > 0 ? (

                    filteredJobs.map((job) => {

                      const jobId = getJobId(job);

                      const status = getJobStatus(job);

                      const applicants = Number(
                        job?.applicants_count ??
                          job?.application_count ??
                          job?.applicants ??
                          0
                      );

                      return (
                        <tr
                          key={jobId}
                          className="hover:bg-slate-50 transition"
                        >

                          {/* JOB */}
                          <td className="px-6 py-5">

                            <p className="font-semibold text-slate-900">
                              {job?.title ||
                                "Untitled Job"}
                            </p>

                            <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">

                              <Building2 className="w-4 h-4" />

                              <span>
                                {job?.c_name ||
                                  "Company"}
                              </span>

                            </div>

                            {job?.category && (
                              <span className="inline-block mt-2 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
                                {job.category}
                              </span>
                            )}

                          </td>

                          {/* LOCATION */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-2 text-sm text-slate-600">

                              <MapPin className="w-4 h-4 text-slate-400" />

                              {job?.c_location || "—"}

                            </div>

                          </td>

                          {/* TYPE */}
                          <td className="px-6 py-5">

                            <span className="text-sm text-slate-700">
                              {job?.c_type || "—"}
                            </span>

                          </td>

                          {/* SALARY */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-1 text-sm text-slate-700">

                              <IndianRupee className="w-4 h-4 text-slate-400" />

                              {job?.salary ||
                                "Not specified"}

                            </div>

                          </td>

                          {/* APPLICANTS */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-2">

                              <Users className="w-4 h-4 text-slate-400" />

                              <span className="text-sm font-medium text-slate-700">
                                {applicants}
                              </span>

                            </div>

                          </td>

                          {/* STATUS */}
                          <td className="px-6 py-5">

                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${getStatusStyle(
                                status
                              )}`}
                            >

                              {status === "Active" ? (
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              ) : (
                                <XCircle className="w-3.5 h-3.5" />
                              )}

                              {status}

                            </span>

                          </td>

                          {/* ACTIONS */}
                          <td className="px-6 py-5">

                            <div className="flex justify-end items-center gap-2">

                              <button
                                type="button"
                                onClick={() =>
                                  handleView(job)
                                }
                                title="View Job"
                                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleEdit(job)
                                }
                                title="Edit Job"
                                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition"
                              >
                                <Edit className="w-4 h-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(job)
                                }
                                disabled={
                                  deletingId === jobId
                                }
                                title="Delete Job"
                                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition disabled:opacity-50"
                              >

                                {deletingId ===
                                jobId ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}

                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    })

                  ) : (

                    <tr>

                      <td
                        colSpan="7"
                        className="px-6 py-16 text-center"
                      >

                        <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />

                        <h3 className="mt-4 text-lg font-semibold text-slate-800">
                          No jobs found
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {search ||
                          statusFilter !== "All"
                            ? "Try changing your search or status filter."
                            : "You have not posted any jobs yet."}
                        </p>

                        {!search &&
                          statusFilter ===
                            "All" && (
                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  "/recruiter/create-job"
                                )
                              }
                              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium"
                            >
                              <Plus className="w-4 h-4" />

                              Post Your First Job
                            </button>
                          )}

                      </td>

                    </tr>
                  )}

                </tbody>

              </table>

            </div>

            {/* =================================================
                MOBILE / TABLET CARDS
            ================================================= */}

            <div className="lg:hidden divide-y divide-slate-200">

              {filteredJobs.length > 0 ? (

                filteredJobs.map((job) => {

                  const jobId = getJobId(job);

                  const status = getJobStatus(job);

                  const applicants = Number(
                    job?.applicants_count ??
                      job?.application_count ??
                      job?.applicants ??
                      0
                  );

                  return (
                    <div
                      key={jobId}
                      className="p-5 hover:bg-slate-50 transition"
                    >

                      {/* TOP */}
                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">

                          <h3 className="font-semibold text-slate-900 truncate">
                            {job?.title ||
                              "Untitled Job"}
                          </h3>

                          <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">

                            <Building2 className="w-4 h-4 shrink-0" />

                            <span className="truncate">
                              {job?.c_name ||
                                "Company"}
                            </span>

                          </div>

                        </div>

                        <span
                          className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${getStatusStyle(
                            status
                          )}`}
                        >

                          {status === "Active" ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5" />
                          )}

                          {status}

                        </span>

                      </div>

                      {/* DETAILS */}
                      <div className="grid grid-cols-2 gap-3 mt-5">

                        <div className="flex items-center gap-2 text-sm text-slate-600">

                          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />

                          <span className="truncate">
                            {job?.c_location ||
                              "—"}
                          </span>

                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-600">

                          <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />

                          <span className="truncate">
                            {job?.c_type || "—"}
                          </span>

                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-600">

                          <IndianRupee className="w-4 h-4 text-slate-400 shrink-0" />

                          <span className="truncate">
                            {job?.salary ||
                              "Not specified"}
                          </span>

                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-600">

                          <Users className="w-4 h-4 text-slate-400 shrink-0" />

                          <span>
                            {applicants} applicants
                          </span>

                        </div>

                      </div>

                      {/* DATE */}
                      <div className="flex items-center gap-2 mt-4 text-xs text-slate-400">

                        <CalendarDays className="w-4 h-4" />

                        Posted{" "}
                        {formatDate(
                          job?.created_at ||
                            job?.createdAt ||
                            job?.date
                        )}

                      </div>

                      {/* ACTIONS */}
                      <div className="flex gap-2 mt-5">

                        <button
                          type="button"
                          onClick={() =>
                            handleView(job)
                          }
                          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 font-medium text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(job)
                          }
                          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 font-medium text-sm"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(job)
                          }
                          disabled={
                            deletingId === jobId
                          }
                          className="w-11 inline-flex items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 disabled:opacity-50"
                        >

                          {deletingId ===
                          jobId ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}

                        </button>

                      </div>

                    </div>
                  );
                })

              ) : (

                <div className="px-6 py-16 text-center">

                  <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />

                  <h3 className="mt-4 text-lg font-semibold text-slate-800">
                    No jobs found
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {search ||
                    statusFilter !== "All"
                      ? "Try changing your search or status filter."
                      : "You have not posted any jobs yet."}
                  </p>

                  {!search &&
                    statusFilter ===
                      "All" && (
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          "/recruiter/create-job"
                        )
                      }
                      className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      Post Your First Job
                    </button>
                  )}

                </div>
              )}

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default ManageJobs;