import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Backend API will be connected here
      console.log("Job Data:", form);

      // Temporary
      alert("Job created successfully!");

      navigate("/recruiter/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= HEADER ================= */}
      <header className="bg-white border-b border-slate-200 px-6 md:px-10 py-5">
        <div className="flex items-center gap-4">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-lg border border-slate-300
            flex items-center justify-center
            text-slate-600 hover:bg-slate-100 transition"
          >
            ←
          </button>

          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-blue-600">
              RECRUITER
            </p>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Post a Job
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Create a new job opportunity and find the right candidate.
            </p>
          </div>

        </div>
      </header>


      {/* ================= MAIN ================= */}
      <main className="max-w-5xl mx-auto p-6 md:p-10">

        <form onSubmit={handleSubmit}>

          {/* ================= BASIC INFORMATION ================= */}
          <section className="bg-white rounded-2xl border border-slate-200
            shadow-sm mb-6">

            <div className="px-6 md:px-8 py-5 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">
                Basic Information
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Enter the basic details of the job.
              </p>
            </div>


            <div className="p-6 md:p-8 space-y-6">

              {/* Job Title */}
              <div>
                <label className="block text-sm font-semibold
                  text-slate-700 mb-2">
                  Job Title
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Frontend React Developer"
                  required
                  className="w-full px-4 py-3 rounded-lg
                  border border-slate-300
                  text-slate-900 outline-none
                  placeholder:text-slate-400
                  focus:border-blue-500
                  focus:ring-2 focus:ring-blue-100"
                />
              </div>


              {/* Company + Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-semibold
                    text-slate-700 mb-2">
                    Company Name
                  </label>

                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                    required
                    className="w-full px-4 py-3 rounded-lg
                    border border-slate-300
                    text-slate-900 outline-none
                    placeholder:text-slate-400
                    focus:border-blue-500
                    focus:ring-2 focus:ring-blue-100"
                  />
                </div>


                <div>
                  <label className="block text-sm font-semibold
                    text-slate-700 mb-2">
                    Location
                  </label>

                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Delhi, India"
                    required
                    className="w-full px-4 py-3 rounded-lg
                    border border-slate-300
                    text-slate-900 outline-none
                    placeholder:text-slate-400
                    focus:border-blue-500
                    focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>


              {/* Job Type + Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-semibold
                    text-slate-700 mb-2">
                    Job Type
                  </label>

                  <select
                    name="jobType"
                    value={form.jobType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg
                    border border-slate-300
                    text-slate-700 outline-none
                    focus:border-blue-500
                    focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select job type</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>


                <div>
                  <label className="block text-sm font-semibold
                    text-slate-700 mb-2">
                    Experience
                  </label>

                  <select
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg
                    border border-slate-300
                    text-slate-700 outline-none
                    focus:border-blue-500
                    focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1 Years">0-1 Years</option>
                    <option value="1-3 Years">1-3 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>
                </div>

              </div>


              {/* Salary + Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-semibold
                    text-slate-700 mb-2">
                    Salary
                  </label>

                  <input
                    name="salary"
                    value={form.salary}
                    onChange={handleChange}
                    placeholder="e.g. ₹6 - ₹10 LPA"
                    className="w-full px-4 py-3 rounded-lg
                    border border-slate-300
                    text-slate-900 outline-none
                    placeholder:text-slate-400
                    focus:border-blue-500
                    focus:ring-2 focus:ring-blue-100"
                  />
                </div>


                <div>
                  <label className="block text-sm font-semibold
                    text-slate-700 mb-2">
                    Category
                  </label>

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg
                    border border-slate-300
                    text-slate-700 outline-none
                    focus:border-blue-500
                    focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select category</option>
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

          </section>


          {/* ================= SKILLS ================= */}
          <section className="bg-white rounded-2xl border border-slate-200
            shadow-sm mb-6">

            <div className="px-6 md:px-8 py-5 border-b border-slate-200">

              <h2 className="text-lg font-bold text-slate-900">
                Skills Required
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Add the skills candidates should have.
              </p>

            </div>


            <div className="p-6 md:p-8">

              <input
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="React.js, JavaScript, Node.js, MySQL"
                required
                className="w-full px-4 py-3 rounded-lg
                border border-slate-300
                text-slate-900 outline-none
                placeholder:text-slate-400
                focus:border-blue-500
                focus:ring-2 focus:ring-blue-100"
              />

              <p className="text-xs text-slate-400 mt-2">
                Separate multiple skills using commas.
              </p>

            </div>

          </section>


          {/* ================= JOB DESCRIPTION ================= */}
          <section className="bg-white rounded-2xl border border-slate-200
            shadow-sm mb-6">

            <div className="px-6 md:px-8 py-5 border-b border-slate-200">

              <h2 className="text-lg font-bold text-slate-900">
                Job Description
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Describe the position and what the candidate will do.
              </p>

            </div>


            <div className="p-6 md:p-8">

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="7"
                placeholder="Describe the job responsibilities..."
                required
                className="w-full px-4 py-3 rounded-lg
                border border-slate-300
                text-slate-900 outline-none resize-none
                placeholder:text-slate-400
                focus:border-blue-500
                focus:ring-2 focus:ring-blue-100"
              />

            </div>

          </section>


          {/* ================= REQUIREMENTS ================= */}
          <section className="bg-white rounded-2xl border border-slate-200
            shadow-sm mb-6">

            <div className="px-6 md:px-8 py-5 border-b border-slate-200">

              <h2 className="text-lg font-bold text-slate-900">
                Requirements
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                List the qualifications and requirements for this position.
              </p>

            </div>


            <div className="p-6 md:p-8">

              <textarea
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                rows="6"
                placeholder="• Strong knowledge of React&#10;• Good JavaScript skills&#10;• Understanding of REST APIs"
                required
                className="w-full px-4 py-3 rounded-lg
                border border-slate-300
                text-slate-900 outline-none resize-none
                placeholder:text-slate-400
                focus:border-blue-500
                focus:ring-2 focus:ring-blue-100"
              />

            </div>

          </section>


          {/* ================= ACTIONS ================= */}
          <div className="flex flex-col sm:flex-row
            justify-end gap-3">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-lg
              border border-slate-300
              text-slate-700 font-semibold
              hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-7 py-3 rounded-lg
              bg-blue-600 text-white
              font-semibold
              hover:bg-blue-700 transition
              disabled:bg-blue-300
              disabled:cursor-not-allowed
              shadow-sm"
            >
              {loading ? "Creating..." : "Create Job"}
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default CreateJob;