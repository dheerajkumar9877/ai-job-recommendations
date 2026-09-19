import React, { useState } from "react";
import SideBar from "../auth/SideBar";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const savedProfile = JSON.parse(
    localStorage.getItem("recruiterProfile") || "{}"
  );

  const [form, setForm] = useState({
    name: savedProfile.name || user.name || "",
    email: savedProfile.email || user.email || "",
    phone: savedProfile.phone || "",
    location: savedProfile.location || "",
    designation: savedProfile.designation || "",
    companyName: savedProfile.companyName || "",
    companyWebsite: savedProfile.companyWebsite || "",
    industry: savedProfile.industry || "",
    companySize: savedProfile.companySize || "",
    companyDescription: savedProfile.companyDescription || "",
    profilePic: savedProfile.profilePic || "",
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

  // ================= PROFILE IMAGE =================
  const handleProfilePic = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        profilePic: reader.result,
      }));

      setSaved(false);
    };

    reader.readAsDataURL(file);
  };

  // ================= SAVE PROFILE =================
  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "recruiterProfile",
      JSON.stringify(form)
    );

    // Update basic user information
    const updatedUser = {
      ...user,
      name: form.name,
      email: form.email,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setSaved(true);

    setTimeout(() => {
      navigate("/recruiter/dashboard");
    }, 1000);
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
              RECRUITER PROFILE
            </p>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              My Profile
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage your personal and company information.
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
                <div className="flex flex-col items-center gap-3">

                  <label className="cursor-pointer">

                    <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow-sm">

                      {form.profilePic ? (
                        <img
                          src={form.profilePic}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        (form.name || "R")
                          .charAt(0)
                          .toUpperCase()
                      )}

                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePic}
                    />

                  </label>

                  <p className="text-sm text-blue-600">
                    Click to change photo
                  </p>

                </div>

                {/* Recruiter Basic Info */}
                <div className="text-center sm:text-left">

                  <h2 className="text-2xl font-bold text-slate-900">
                    {form.name || "Recruiter Name"}
                  </h2>

                  <p className="text-blue-600 font-medium mt-1">
                    {form.designation ||
                      "Add your designation"}
                  </p>

                  <p className="text-sm text-slate-500 mt-2">
                    {form.companyName ||
                      "Add your company"}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
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
                Basic information candidates can use to contact you.
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

            {/* ================= RECRUITER INFORMATION ================= */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 mb-6">

              <h2 className="text-xl font-bold text-slate-900">
                Recruiter Information
              </h2>

              <p className="text-sm text-slate-500 mt-1 mb-6">
                Tell candidates about your role as a recruiter.
              </p>

              {/* Designation */}
              <div className="mb-5">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Designation
                </label>

                <input
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  placeholder="e.g. HR Manager, Talent Acquisition Specialist"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </section>

            {/* ================= COMPANY INFORMATION ================= */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 mb-6">

              <h2 className="text-xl font-bold text-slate-900">
                Company Information
              </h2>

              <p className="text-sm text-slate-500 mt-1 mb-6">
                Add information about the company you represent.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Company Name */}
                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Company Name
                  </label>

                  <input
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="Company name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* Website */}
                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Company Website
                  </label>

                  <input
                    name="companyWebsite"
                    value={form.companyWebsite}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* Industry */}
                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Industry
                  </label>

                  <input
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    placeholder="e.g. Information Technology"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* Company Size */}
                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Company Size
                  </label>

                  <select
                    name="companySize"
                    value={form.companySize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >

                    <option value="">
                      Select company size
                    </option>

                    <option value="1-10 employees">
                      1 - 10 employees
                    </option>

                    <option value="11-50 employees">
                      11 - 50 employees
                    </option>

                    <option value="51-200 employees">
                      51 - 200 employees
                    </option>

                    <option value="201-500 employees">
                      201 - 500 employees
                    </option>

                    <option value="501-1000 employees">
                      501 - 1000 employees
                    </option>

                    <option value="1000+ employees">
                      1000+ employees
                    </option>

                  </select>

                </div>

              </div>

            </section>

            {/* ================= COMPANY DESCRIPTION ================= */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 mb-6">

              <h2 className="text-xl font-bold text-slate-900">
                Company Description
              </h2>

              <p className="text-sm text-slate-500 mt-1 mb-6">
                Give candidates a brief overview of your company.
              </p>

              <textarea
                name="companyDescription"
                value={form.companyDescription}
                onChange={handleChange}
                rows="5"
                placeholder="Write a short description about your company..."
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
