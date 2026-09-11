import React, { useState } from "react";

function CompanyProfile() {
  const [form, setForm] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    website: "",
    location: "",
    email: "",
    phone: "",
    description: "",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Later connect this to your backend API
    console.log("Company Profile:", form);

    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= HEADER ================= */}
      <header className="bg-white border-b border-slate-200 px-6 md:px-10 py-5">

        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-blue-600">
            RECRUITER
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mt-1">
            Company Profile
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage your company information and profile.
          </p>
        </div>

      </header>


      {/* ================= CONTENT ================= */}
      <main className="p-6 md:p-10 max-w-6xl mx-auto">

        {/* ================= PROFILE HEADER ================= */}
        <section className="bg-white rounded-2xl border border-slate-200
          shadow-sm p-6 md:p-8 mb-6">

          <div className="flex flex-col sm:flex-row
            items-center sm:items-start gap-5">

            {/* Company Logo */}
            <div
              className="w-24 h-24 rounded-2xl
              bg-blue-100 text-blue-600
              flex items-center justify-center
              text-4xl font-bold"
            >
              C
            </div>

            <div className="text-center sm:text-left">

              <h2 className="text-2xl font-bold text-slate-900">
                Your Company
              </h2>

              <p className="text-slate-500 mt-1">
                Add your company information below
              </p>

              <span
                className="inline-flex mt-3 px-3 py-1
                rounded-full bg-blue-50 text-blue-700
                text-xs font-semibold"
              >
                Recruiter Profile
              </span>

            </div>

          </div>

        </section>


        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit}>

          <section className="bg-white rounded-2xl
            border border-slate-200 shadow-sm">

            {/* Section Header */}
            <div className="px-6 md:px-8 py-5
              border-b border-slate-200">

              <h2 className="text-lg font-bold text-slate-900">
                Company Information
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Provide information about your company.
              </p>

            </div>


            <div className="p-6 md:p-8 space-y-6">

              {/* ================= ROW 1 ================= */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Company Name */}
                <div>

                  <label className="block text-sm font-semibold
                    text-slate-700 mb-2">
                    Company Name
                  </label>

                  <input
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    required
                    className="w-full px-4 py-3 rounded-lg
                    border border-slate-300
                    text-slate-900 outline-none
                    placeholder:text-slate-400
                    focus:border-blue-500
                    focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* Industry */}
                <div>

                  <label className="block text-sm font-semibold
                    text-slate-700 mb-2">
                    Industry
                  </label>

                  <select
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg
                    border border-slate-300
                    text-slate-700 outline-none
                    focus:border-blue-500
                    focus:ring-2 focus:ring-blue-100"
                  >

                    <option value="">
                      Select industry
                    </option>

                    <option>Information Technology</option>
                    <option>Software</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                    <option>Education</option>
                    <option>E-Commerce</option>
                    <option>Other</option>

                  </select>

                </div>

              </div>


              {/* ================= ROW 2 ================= */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Company Size */}
                <div>

                  <label className="block text-sm font-semibold
                    text-slate-700 mb-2">
                    Company Size
                  </label>

                  <select
                    name="companySize"
                    value={form.companySize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg
                    border border-slate-300
                    text-slate-700 outline-none
                    focus:border-blue-500
                    focus:ring-2 focus:ring-blue-100"
                  >

                    <option value="">
                      Select company size
                    </option>

                    <option>1-10 employees</option>
                    <option>11-50 employees</option>
                    <option>51-200 employees</option>
                    <option>201-500 employees</option>
                    <option>500+ employees</option>

                  </select>

                </div>


                {/* Website */}
                <div>

                  <label className="block text-sm font-semibold
                    text-slate-700 mb-2">
                    Website
                  </label>

                  <input
                    name="website"
                    type="url"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 rounded-lg
                    border border-slate-300
                    text-slate-900 outline-none
                    placeholder:text-slate-400
                    focus:border-blue-500
                    focus:ring-2 focus:ring-blue-100"
                  />

                </div>

              </div>


              {/* ================= ROW 3 ================= */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Location */}
                <div>

                  <label className="block text-sm font-semibold
                    text-slate-700 mb-2">
                    Location
                  </label>

                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                    className="w-full px-4 py-3 rounded-lg
                    border border-slate-300
                    text-slate-900 outline-none
                    placeholder:text-slate-400
                    focus:border-blue-500
                    focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* Email */}
                <div>

                  <label className="block text-sm font-semibold
                    text-slate-700 mb-2">
                    Company Email
                  </label>

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="company@example.com"
                    className="w-full px-4 py-3 rounded-lg
                    border border-slate-300
                    text-slate-900 outline-none
                    placeholder:text-slate-400
                    focus:border-blue-500
                    focus:ring-2 focus:ring-blue-100"
                  />

                </div>

              </div>


              {/* ================= PHONE ================= */}
              <div>

                <label className="block text-sm font-semibold
                  text-slate-700 mb-2">
                  Phone Number
                </label>

                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 rounded-lg
                  border border-slate-300
                  text-slate-900 outline-none
                  placeholder:text-slate-400
                  focus:border-blue-500
                  focus:ring-2 focus:ring-blue-100"
                />

              </div>


              {/* ================= DESCRIPTION ================= */}
              <div>

                <label className="block text-sm font-semibold
                  text-slate-700 mb-2">
                  About Company
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Tell candidates about your company..."
                  className="w-full px-4 py-3 rounded-lg
                  border border-slate-300
                  text-slate-900 outline-none resize-none
                  placeholder:text-slate-400
                  focus:border-blue-500
                  focus:ring-2 focus:ring-blue-100"
                />

                <p className="text-xs text-slate-400 mt-2">
                  A good company description helps candidates understand
                  your organization.
                </p>

              </div>

            </div>


            {/* ================= FOOTER ================= */}
            <div className="px-6 md:px-8 py-5
              border-t border-slate-200
              flex flex-col sm:flex-row
              items-center justify-between gap-4">

              {saved ? (
                <p className="text-sm font-medium text-green-600">
                  ✓ Company profile saved successfully
                </p>
              ) : (
                <p className="text-sm text-slate-500">
                  Keep your company information up to date.
                </p>
              )}

              <button
                type="submit"
                className="w-full sm:w-auto
                px-6 py-3 rounded-lg
                bg-blue-600 text-white
                font-semibold
                hover:bg-blue-700
                transition shadow-sm"
              >
                Save Profile
              </button>

            </div>

          </section>

        </form>

      </main>

    </div>
  );
}

export default CompanyProfile;