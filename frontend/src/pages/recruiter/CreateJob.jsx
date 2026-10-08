import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecruiterSideBar from "../auth/RecruiterSideBar";

import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  MapPin,
  Clock3,
  BadgeDollarSign,
  Layers3,
  Code2,
  FileText,
  ListChecks,
  Save,
  Loader2,
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const API_URL = "http://localhost:5000";

/* =========================================================
   INPUT FIELD
   IMPORTANT:
   Keep this OUTSIDE CreateJob()
========================================================= */

const InputField = ({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) => {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
        <Icon size={16} className="text-blue-600" />

        {label}

        {required && (
          <span className="text-red-500">*</span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="
          w-full
          px-4
          py-3
          rounded-xl
          border
          border-slate-200
          bg-slate-50
          text-slate-900
          placeholder:text-slate-400
          outline-none
          transition-all
          duration-200
          hover:border-slate-300
          focus:bg-white
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-500/10
        "
      />
    </div>
  );
};


/* =========================================================
   SELECT FIELD
   IMPORTANT:
   Keep this OUTSIDE CreateJob()
========================================================= */

const SelectField = ({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  options,
  required = false,
}) => {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
        <Icon size={16} className="text-blue-600" />

        {label}

        {required && (
          <span className="text-red-500">*</span>
        )}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="
          w-full
          px-4
          py-3
          rounded-xl
          border
          border-slate-200
          bg-slate-50
          text-slate-700
          outline-none
          transition-all
          duration-200
          hover:border-slate-300
          focus:bg-white
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-500/10
        "
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};


/* =========================================================
   TEXTAREA FIELD
   IMPORTANT:
   Keep this OUTSIDE CreateJob()
========================================================= */

const TextAreaField = ({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  rows,
  required = false,
}) => {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
        <Icon size={16} className="text-blue-600" />

        {label}

        {required && (
          <span className="text-red-500">*</span>
        )}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        required={required}
        className="
          w-full
          px-4
          py-3
          rounded-xl
          border
          border-slate-200
          bg-slate-50
          text-slate-900
          placeholder:text-slate-400
          outline-none
          resize-none
          transition-all
          duration-200
          hover:border-slate-300
          focus:bg-white
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-500/10
        "
      />
    </div>
  );
};


/* =========================================================
   CREATE JOB
========================================================= */

function CreateJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    experience: "",
    salary: "",
    category: "",
    skills: "",
    description: "",
    requirements: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /* =========================================================
     HANDLE CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (successMessage) {
      setSuccessMessage("");
    }

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  /* =========================================================
     HANDLE SUBMIT
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");
    setLoading(true);

    try {
      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      if (!user.id) {
        setErrorMessage(
          "User session not found. Please login again."
        );

        return;
      }

      const jobData = {
        user_id: Number(user.id),

        title: form.title.trim(),
        c_name: form.company.trim(),
        c_location: form.location.trim(),
        c_type: form.jobType,
        experience: form.experience,
        salary: form.salary.trim(),
        category: form.category,
        skills: form.skills.trim(),
        job_des: form.description.trim(),
        requir: form.requirements.trim(),

        active: "active",
      };

      const response = await axios.post(
        `${API_URL}/recruiter/job/create`,
        jobData
      );

      if (response.data.success) {
        setSuccessMessage(
          "Job successfully created!"
        );

        setForm({
          title: "",
          company: "",
          location: "",
          jobType: "",
          experience: "",
          salary: "",
          category: "",
          skills: "",
          description: "",
          requirements: "",
        });

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        setErrorMessage(
          response.data.message ||
            "Unable to create the job."
        );
      }
    } catch (error) {
      console.error(
        "Create job error:",
        error.response?.data ||
          error.message
      );

      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong while creating the job."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <RecruiterSideBar />

      <div className="md:ml-64 min-h-screen">

        {/* HEADER */}

        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
          <div className="px-5 sm:px-7 lg:px-10 py-5">

            <div className="flex items-center justify-between gap-4">

              <div className="flex items-center gap-4">

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="
                    w-10
                    h-10
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    flex
                    items-center
                    justify-center
                    text-slate-600
                    hover:bg-slate-50
                    hover:border-slate-300
                    transition
                  "
                >
                  <ArrowLeft size={19} />
                </button>

                <div>

                  <div className="flex items-center gap-2 mb-1">

                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                      Recruiter
                    </span>

                    <span className="w-1 h-1 rounded-full bg-slate-300" />

                    <span className="text-xs text-slate-400">
                      Job Management
                    </span>

                  </div>

                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Post a New Job
                  </h1>

                  <p className="hidden sm:block text-sm text-slate-500 mt-1">
                    Create a job opportunity and find the right candidate.
                  </p>

                </div>

              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 border border-blue-100">

                <Sparkles
                  size={16}
                  className="text-blue-600"
                />

                <span className="text-xs font-semibold text-blue-700">
                  New Opportunity
                </span>

              </div>

            </div>

          </div>
        </header>


        {/* MAIN */}

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-7 lg:py-10">

          {/* BANNER */}

          <div className="
            relative
            overflow-hidden
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            p-6
            sm:p-7
            mb-7
            shadow-lg
            shadow-blue-500/10
          ">

            <div className="relative">

              <div className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-full
                bg-white/15
                text-white
                text-xs
                font-semibold
                mb-3
              ">
                <BriefcaseBusiness size={14} />
                Create Job Posting
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Find your next great hire
              </h2>

              <p className="text-blue-100 text-sm mt-2">
                Add clear job information, skills and requirements
                to attract qualified candidates.
              </p>

            </div>

          </div>


          {/* SUCCESS MESSAGE */}

          {successMessage && (
            <div className="
              mb-6
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-emerald-200
              bg-emerald-50
              px-4
              py-3.5
              text-emerald-800
            ">

              <CheckCircle2
                size={20}
                className="text-emerald-600"
              />

              <div>
                <p className="font-semibold text-sm">
                  Job successfully created!
                </p>

                <p className="text-xs text-emerald-700">
                  Your job has been published successfully.
                </p>
              </div>

            </div>
          )}


          {/* ERROR */}

          {errorMessage && (
            <div className="
              mb-6
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3.5
              text-red-800
            ">

              <AlertCircle
                size={20}
                className="text-red-600"
              />

              <div>
                <p className="font-semibold text-sm">
                  Unable to publish job
                </p>

                <p className="text-xs text-red-700">
                  {errorMessage}
                </p>
              </div>

            </div>
          )}


          {/* FORM */}

          <form onSubmit={handleSubmit}>

            {/* BASIC INFORMATION */}

            <section className="
              bg-white
              rounded-2xl
              border
              border-slate-200
              shadow-sm
              overflow-hidden
              mb-6
            ">

              <div className="px-5 sm:px-7 py-5 border-b border-slate-100">

                <div className="flex items-center gap-3">

                  <div className="
                    w-10
                    h-10
                    rounded-xl
                    bg-blue-50
                    flex
                    items-center
                    justify-center
                  ">
                    <BriefcaseBusiness
                      size={19}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Basic Information
                    </h2>

                    <p className="text-sm text-slate-500">
                      Provide the essential details about this position.
                    </p>
                  </div>

                </div>

              </div>

              <div className="p-5 sm:p-7 space-y-6">

                <InputField
                  icon={BriefcaseBusiness}
                  label="Job Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Frontend React Developer"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <InputField
                    icon={Building2}
                    label="Company Name"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="e.g. ABC Technologies"
                    required
                  />

                  <InputField
                    icon={MapPin}
                    label="Location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Chandigarh, India"
                    required
                  />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <SelectField
                    icon={Clock3}
                    label="Job Type"
                    name="jobType"
                    value={form.jobType}
                    onChange={handleChange}
                    placeholder="Select job type"
                    required
                    options={[
                      "Full Time",
                      "Part Time",
                      "Internship",
                      "Contract",
                      "Remote",
                    ]}
                  />

                  <SelectField
                    icon={BriefcaseBusiness}
                    label="Experience"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="Select experience"
                    required
                    options={[
                      "Fresher",
                      "0-1 Years",
                      "1-3 Years",
                      "3-5 Years",
                      "5+ Years",
                    ]}
                  />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <InputField
                    icon={BadgeDollarSign}
                    label="Salary"
                    name="salary"
                    value={form.salary}
                    onChange={handleChange}
                    placeholder="e.g. ₹6 - ₹10 LPA"
                  />

                  <SelectField
                    icon={Layers3}
                    label="Category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Select category"
                    required
                    options={[
                      "Frontend Development",
                      "Backend Development",
                      "Full Stack Development",
                      "Data Science",
                      "AI-ML",
                      "UI-UX",
                      "Other",
                    ]}
                  />

                </div>

              </div>

            </section>


            {/* SKILLS */}

            <section className="
              bg-white
              rounded-2xl
              border
              border-slate-200
              shadow-sm
              overflow-hidden
              mb-6
            ">

              <div className="px-5 sm:px-7 py-5 border-b border-slate-100">

                <div className="flex items-center gap-3">

                  <div className="
                    w-10
                    h-10
                    rounded-xl
                    bg-violet-50
                    flex
                    items-center
                    justify-center
                  ">
                    <Code2
                      size={19}
                      className="text-violet-600"
                    />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Skills Required
                    </h2>

                    <p className="text-sm text-slate-500">
                      Add the technical and professional skills.
                    </p>
                  </div>

                </div>

              </div>

              <div className="p-5 sm:p-7">

                <InputField
                  icon={Code2}
                  label="Required Skills"
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="React.js, JavaScript, Node.js, MySQL"
                  required
                />

                <p className="text-xs text-slate-400 mt-3">
                  Separate multiple skills using commas.
                </p>

                {form.skills.trim() && (
                  <div className="mt-5">

                    <p className="text-xs font-semibold text-slate-500 mb-2">
                      Skills Preview
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {form.skills
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter(Boolean)
                        .map((skill, index) => (
                          <span
                            key={`${skill}-${index}`}
                            className="
                              px-3
                              py-1.5
                              rounded-lg
                              bg-blue-50
                              border
                              border-blue-100
                              text-blue-700
                              text-xs
                              font-semibold
                            "
                          >
                            {skill}
                          </span>
                        ))}

                    </div>

                  </div>
                )}

              </div>

            </section>


            {/* DESCRIPTION */}

            <section className="
              bg-white
              rounded-2xl
              border
              border-slate-200
              shadow-sm
              overflow-hidden
              mb-6
            ">

              <div className="px-5 sm:px-7 py-5 border-b border-slate-100">

                <div className="flex items-center gap-3">

                  <div className="
                    w-10
                    h-10
                    rounded-xl
                    bg-emerald-50
                    flex
                    items-center
                    justify-center
                  ">
                    <FileText
                      size={19}
                      className="text-emerald-600"
                    />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Job Description
                    </h2>

                    <p className="text-sm text-slate-500">
                      Explain the role and responsibilities.
                    </p>
                  </div>

                </div>

              </div>

              <div className="p-5 sm:p-7">

                <TextAreaField
                  icon={FileText}
                  label="Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={8}
                  placeholder="Describe the position, responsibilities, team and what the candidate will work on..."
                  required
                />

                <div className="flex justify-end mt-2">

                  <span className="text-xs text-slate-400">
                    {form.description.length} characters
                  </span>

                </div>

              </div>

            </section>


            {/* REQUIREMENTS */}

            <section className="
              bg-white
              rounded-2xl
              border
              border-slate-200
              shadow-sm
              overflow-hidden
              mb-6
            ">

              <div className="px-5 sm:px-7 py-5 border-b border-slate-100">

                <div className="flex items-center gap-3">

                  <div className="
                    w-10
                    h-10
                    rounded-xl
                    bg-amber-50
                    flex
                    items-center
                    justify-center
                  ">
                    <ListChecks
                      size={19}
                      className="text-amber-600"
                    />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Candidate Requirements
                    </h2>

                    <p className="text-sm text-slate-500">
                      List qualifications and requirements.
                    </p>
                  </div>

                </div>

              </div>

              <div className="p-5 sm:p-7">

                <TextAreaField
                  icon={ListChecks}
                  label="Requirements"
                  name="requirements"
                  value={form.requirements}
                  onChange={handleChange}
                  rows={8}
                  placeholder={`• Strong knowledge of React
• Good JavaScript skills
• Understanding of REST APIs
• Good communication skills`}
                  required
                />

                <div className="flex justify-end mt-2">

                  <span className="text-xs text-slate-400">
                    {form.requirements.length} characters
                  </span>

                </div>

              </div>

            </section>


            {/* ACTIONS */}

            <div className="
              bg-white
              border
              border-slate-200
              rounded-2xl
              shadow-sm
              p-4
              sm:p-5
            ">

              <div className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                justify-between
                gap-4
              ">

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Ready to publish?
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Review your job details before publishing.
                  </p>
                </div>

                <div className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  gap-3
                ">

                  {successMessage && (
                    <div className="
                      flex
                      items-center
                      gap-2
                      px-4
                      py-2.5
                      rounded-xl
                      bg-emerald-50
                      border
                      border-emerald-200
                      text-emerald-700
                      text-sm
                      font-semibold
                    ">
                      <CheckCircle2
                        size={18}
                        className="text-emerald-600"
                      />

                      <span>
                        Job successfully created!
                      </span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    disabled={loading}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      px-5
                      py-3
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-slate-700
                      font-semibold
                      text-sm
                      hover:bg-slate-50
                      transition
                    "
                  >
                    <X size={17} />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      px-6
                      py-3
                      rounded-xl
                      bg-blue-600
                      text-white
                      font-semibold
                      text-sm
                      hover:bg-blue-700
                      transition
                      disabled:bg-blue-300
                      disabled:cursor-not-allowed
                    "
                  >
                    {loading ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Publish Job
                      </>
                    )}
                  </button>

                </div>

              </div>

            </div>

          </form>

        </main>

      </div>

    </div>
  );
}

export default CreateJob;