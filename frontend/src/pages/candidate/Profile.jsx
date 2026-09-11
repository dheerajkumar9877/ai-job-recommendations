import React, { useState } from "react";
import SideBar from "../auth/SideBar";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const savedProfile = JSON.parse(
    localStorage.getItem("candidateProfile") || "{}"
  );

  const [form, setForm] = useState({
    name: savedProfile.name || user.name || "",
    email: savedProfile.email || user.email || "",
    phone: savedProfile.phone || "",
    location: savedProfile.location || "",
    headline: savedProfile.headline || "",
    bio: savedProfile.bio || "",
    skills: savedProfile.skills || "",
    experience: savedProfile.experience || "",
    education: savedProfile.education || "",
  });

  const [saved, setSaved] = useState(false);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  // ================= SAVE PROFILE =================
  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "candidateProfile",
      JSON.stringify(form)
    );

    // Also update basic user information
    const updatedUser = {
      ...user,
      name: form.name,
      email: form.email,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= SIDEBAR ================= */}
      <SideBar />

      {/* ================= PAGE CONTENT ================= */}
      <div className="md:ml-64 min-h-screen">

        {/* ================= HEADER ================= */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 md:px-10 py-5">

          <div className="max-w-5xl mx-auto">

            <p className="text-xs font-bold tracking-[0.2em] text-blue-600">
              CANDIDATE PROFILE
            </p>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              My Profile
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage your personal information, skills and experience.
            </p>

          </div>

        </header>

        {/* ================= MAIN ================= */}
        <main className="max-w-5xl mx-auto p-4 sm:p-6 md:p-10">

          <form onSubmit={handleSubmit}>

            {/* ================= PROFILE HEADER ================= */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 mb-6">

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold shrink-0 shadow-sm">
                  {(form.name || "C")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="text-center sm:text-left">

                  <h2 className="text-2xl font-bold text-slate-900">
                    {form.name || "Your Name"}
                  </h2>

                  <p className="text-blue-600 font-medium mt-1">
                    {form.headline ||
                      "Add your professional headline"}
                  </p>

                  <p className="text-sm text-slate-500 mt-2">
                    {form.email || "Add your email"}
                  </p>

                  {form.location && (
                    <p className="text-sm text-slate-500 mt-1">
                      📍 {form.location}
                    </p>
                  )}

                </div>

              </div>

            </section>

            {/* ================= PERSONAL INFORMATION ================= */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 mb-6">

              <h2 className="text-xl font-bold text-slate-900">
                Personal Information
              </h2>

              <p className="text-sm text-slate-500 mt-1 mb-6">
                Basic information recruiters can use to contact you.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email
                  </label>

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone
                  </label>

                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Location
                  </label>

                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="City, India"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>

            </section>

            {/* ================= PROFESSIONAL INFORMATION ================= */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 mb-6">

              <h2 className="text-xl font-bold text-slate-900">
                Professional Information
              </h2>

              <p className="text-sm text-slate-500 mt-1 mb-6">
                Tell recruiters about your professional background.
              </p>

              {/* Headline */}
              <div className="mb-5">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Professional Headline
                </label>

                <input
                  name="headline"
                  value={form.headline}
                  onChange={handleChange}
                  placeholder="e.g. Full Stack Developer"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Bio */}
              <div className="mb-5">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  About Me
                </label>

                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write a short description about yourself..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none resize-none text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Skills */}
              <div className="mb-5">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Skills
                </label>

                <input
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, Express, MySQL..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <p className="text-xs text-slate-400 mt-2">
                  Separate multiple skills with commas.
                </p>

              </div>

              {/* Experience */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Experience
                </label>

                <select
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >

                  <option value="">
                    Select experience
                  </option>

                  <option value="Fresher">
                    Fresher
                  </option>

                  <option value="0-1 years">
                    0 - 1 years
                  </option>

                  <option value="1-3 years">
                    1 - 3 years
                  </option>

                  <option value="3-5 years">
                    3 - 5 years
                  </option>

                  <option value="5+ years">
                    5+ years
                  </option>

                </select>

              </div>

            </section>

            {/* ================= EDUCATION ================= */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 mb-6">

              <h2 className="text-xl font-bold text-slate-900">
                Education
              </h2>

              <p className="text-sm text-slate-500 mt-1 mb-6">
                Add your highest qualification.
              </p>

              <textarea
                name="education"
                value={form.education}
                onChange={handleChange}
                rows="4"
                placeholder="e.g. B.Tech Computer Science - XYZ University - 2026"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none resize-none text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </section>

            {/* ================= SAVE ================= */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pb-10">

              {saved && (
                <p className="text-sm font-medium text-green-600">
                  ✓ Profile saved successfully
                </p>
              )}

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-sm"
              >
                Save Profile
              </button>

            </div>

          </form>

        </main>

      </div>

    </div>
  );
}

export default Profile;