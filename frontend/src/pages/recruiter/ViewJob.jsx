import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  MapPin,
  IndianRupee,
  Clock3,
  GraduationCap,
  Code2,
  FileText,
  CheckCircle2,
  Loader2,
  CalendarDays,
} from "lucide-react";
import RecruiterSideBar from "../auth/RecruiterSideBar";

const API_URL = "http://localhost:5000";

const ViewJob = () => {
  const { user_id, job_id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==============================
  // FETCH JOB
  // ==============================
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        if (!user_id || !job_id) {
          setError("User ID or Job ID is missing.");
          setLoading(false);
          return;
        }

        console.log("Fetching Job:", {
          user_id,
          job_id,
        });

        const response = await axios.get(
          `${API_URL}/recruiter/job/view-job/${user_id}/${job_id}`
        );

        console.log("VIEW JOB RESPONSE:", response.data);

        if (response.data?.success) {
          setJob(response.data.job);
        } else {
          setError(
            response.data?.message || "Job not found."
          );
        }
      } catch (error) {
        console.error("VIEW JOB ERROR:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load job details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [user_id, job_id]);

  // ==============================
  // FORMAT DATE
  // ==============================
  const formatDate = (date) => {
    if (!date) {
      return "Not available";
    }

    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) {
      return "Not available";
    }

    return formattedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==============================
  // LOADING
  // ==============================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 lg:ml-64 flex items-center justify-center">
        <div className="flex items-center gap-3 text-emerald-600">
          <Loader2 className="w-6 h-6 animate-spin" />

          <span className="font-medium">
            Loading job details...
          </span>
        </div>
      </div>
    );
  }

  // ==============================
  // ERROR
  // ==============================
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 lg:ml-64 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-md w-full text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
            <FileText className="w-7 h-7 text-red-500" />
          </div>

          <h2 className="text-xl font-bold text-slate-800">
            Job Not Found
          </h2>

          <p className="text-slate-500 mt-2">
            {error}
          </p>

          <button
            onClick={() =>
              navigate("/recruiter/manage-jobs")
            }
            className="mt-6 px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
          >
            Back to Manage Jobs
          </button>
        </div>
      </div>
    );
  }

  // ==============================
  // NO JOB
  // ==============================
  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 lg:ml-64 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500">
            No job details available.
          </p>

          <button
            onClick={() =>
              navigate("/recruiter/manage-jobs")
            }
            className="mt-4 px-5 py-2.5 rounded-lg bg-emerald-600 text-white"
          >
            Back to Manage Jobs
          </button>
        </div>
      </div>
    );
  }

  // ==============================
  // MAIN PAGE
  // ==============================
  return (
    <div className="min-h-screen bg-slate-50 lg:ml-64">
      <RecruiterSideBar></RecruiterSideBar>
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">

          {/* Back Button */}
          <button
            onClick={() =>
              navigate("/recruiter/manage-jobs")
            }
            className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition mb-5"
          >
            <ArrowLeft className="w-5 h-5" />

            <span>
              Back to Manage Jobs
            </span>
          </button>

          {/* Job Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

            <div className="flex gap-4">

              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <Briefcase className="w-8 h-8 text-emerald-600" />
              </div>

              {/* Job Title */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {job.title || "Untitled Job"}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mt-2 text-slate-500">

                  {/* Company */}
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />

                    {job.c_name || "Company"}
                  </span>

                  {/* Location */}
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />

                    {job.c_location ||
                      "Location not specified"}
                  </span>
                </div>
              </div>
            </div>

            {/* Status */}
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold self-start ${
                job.active === "active"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {job.active === "active"
                ? "Active"
                : "Closed"}
            </span>
          </div>
        </div>
      </div>

      {/* ==========================
          MAIN
      =========================== */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ==========================
            JOB SUMMARY
        =========================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <InfoCard
            icon={<Briefcase />}
            label="Job Type"
            value={
              job.c_type || "Not specified"
            }
          />

          <InfoCard
            icon={<GraduationCap />}
            label="Experience"
            value={
              job.experience || "Not specified"
            }
          />

          <InfoCard
            icon={<IndianRupee />}
            label="Salary"
            value={
              job.salary || "Not specified"
            }
          />

          <InfoCard
            icon={<Code2 />}
            label="Category"
            value={
              job.category || "Not specified"
            }
          />
        </div>

        {/* ==========================
            CONTENT GRID
        =========================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ========================
              LEFT CONTENT
          ========================= */}
          <div className="lg:col-span-2 space-y-6">

            {/* Job Description */}
            <Section
              icon={<FileText />}
              title="Job Description"
            >
              <p className="text-slate-600 leading-7 whitespace-pre-line">
                {job.job_des ||
                  "No job description provided."}
              </p>
            </Section>

            {/* Requirements */}
            <Section
              icon={<CheckCircle2 />}
              title="Requirements"
            >
              <p className="text-slate-600 leading-7 whitespace-pre-line">
                {job.requir ||
                  "No requirements provided."}
              </p>
            </Section>

            {/* Skills */}
            <Section
              icon={<Code2 />}
              title="Required Skills"
            >
              {job.skills ? (
                <div className="flex flex-wrap gap-2">
                  {String(job.skills)
                    .split(",")
                    .map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-medium"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                </div>
              ) : (
                <p className="text-slate-500">
                  No skills specified.
                </p>
              )}
            </Section>
          </div>

          {/* ========================
              RIGHT SIDEBAR
          ========================= */}
          <div className="space-y-6">

            {/* Job Information */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

              <h2 className="text-lg font-bold text-slate-900 mb-5">
                Job Information
              </h2>

              <div className="space-y-5">

                <Detail
                  icon={<Briefcase />}
                  label="Job ID"
                  value={
                    job.job_id || job.id || "N/A"
                  }
                />

                <Detail
                  icon={<Building2 />}
                  label="Company"
                  value={
                    job.c_name || "Not specified"
                  }
                />

                <Detail
                  icon={<MapPin />}
                  label="Location"
                  value={
                    job.c_location ||
                    "Not specified"
                  }
                />

                <Detail
                  icon={<Clock3 />}
                  label="Employment Type"
                  value={
                    job.c_type || "Not specified"
                  }
                />

                <Detail
                  icon={<CalendarDays />}
                  label="Posted"
                  value={formatDate(job.created_at)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Actions
              </h2>

              <div className="space-y-3">

                {/* Edit */}
                <button
                  onClick={() =>
                    navigate(
                      `/recruiter/job/update-job/${user_id}/${job_id}`
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
                >
                  Edit Job
                </button>

                {/* Back */}
                <button
                  onClick={() =>
                    navigate(
                      "/recruiter/manage-jobs"
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition"
                >
                  Back to Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/* ==================================
   INFO CARD
================================== */

const InfoCard = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          {React.cloneElement(icon, {
            className: "w-5 h-5",
          })}
        </div>

        <div className="min-w-0">
          <p className="text-xs text-slate-500">
            {label}
          </p>

          <p className="font-semibold text-slate-800 truncate">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ==================================
   SECTION
================================== */

const Section = ({
  icon,
  title,
  children,
}) => {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

      <div className="flex items-center gap-3 mb-5">

        <div className="text-emerald-600">
          {React.cloneElement(icon, {
            className: "w-5 h-5",
          })}
        </div>

        <h2 className="text-xl font-bold text-slate-900">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
};

/* ==================================
   DETAIL
================================== */

const Detail = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-start gap-3">

      <div className="text-slate-400 mt-0.5">
        {React.cloneElement(icon, {
          className: "w-5 h-5",
        })}
      </div>

      <div className="min-w-0">

        <p className="text-xs text-slate-500">
          {label}
        </p>

        <p className="text-sm font-semibold text-slate-800 break-words">
          {value}
        </p>
      </div>
    </div>
  );
};

export default ViewJob;