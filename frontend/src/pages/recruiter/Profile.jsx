import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building2,
  Globe,
  FileText,
  Camera,
  Save,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import SideBar from "../auth/SideBar";

const API_URL = "http://localhost:5000";

function Profile() {
  const navigate = useNavigate();
  // =========================================================
  // USER
  // =========================================================
  const [user, setUser] = useState(null);

  // =========================================================
  // PROFILE
  // =========================================================
  const [profileExists, setProfileExists] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    designation: "",
    companyName: "",
    companyWebsite: "",
    industry: "",
    companySize: "",
    companyDescription: "",
    profilePic: "",
  });

  // =========================================================
  // STATES
  // =========================================================
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [generalError, setGeneralError] = useState("");

  // =========================================================
  // GET LOGGED-IN USER + LOAD PROFILE
  // =========================================================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = JSON.parse(
          localStorage.getItem("user") || "{}"
        );

        // Support all possible ID names
        const userId = Number(
          storedUser?.id ??
          storedUser?.user_id ??
          storedUser?.userId
        );

        // -----------------------------------------------------
        // USER ID NOT FOUND
        // -----------------------------------------------------
        if (!userId || Number.isNaN(userId)) {
          setGeneralError(
            "User ID not found. Please logout and login again."
          );
          setPageLoading(false);
          return;
        }

        // Save user in React state
        setUser({
          ...storedUser,
          id: userId,
        });

        // -----------------------------------------------------
        // GET PROFILE FROM DATABASE
        // -----------------------------------------------------
        const response = await axios.get(
          `${API_URL}/recruiter/profile/${userId}`
        );

        const profile = response.data?.profile;

        if (profile) {
          setProfileExists(true);

          setForm({
            name: profile.name || "",
            email: profile.email || "",
            phone: profile.phone || "",
            location: profile.location || "",
            designation: profile.des || "",
            companyName: profile.c_name || "",
            companyWebsite: profile.c_website || "",
            industry: profile.industry || "",
            companySize: profile.companySize || "",
            companyDescription: profile.c_des || "",
            profilePic: profile.profile_img || "",
          });
        } else {
          // Profile doesn't exist yet.
          // Use only login information for initial values.
          setProfileExists(false);

          setForm((prev) => ({
            ...prev,
            name: storedUser.name || "",
            email: storedUser.email || "",
          }));
        }
      } catch (error) {
        console.error(
          "Failed to load recruiter profile:",
          error
        );

        // Profile doesn't exist yet
        if (error.response?.status === 404) {
          const storedUser = JSON.parse(
            localStorage.getItem("user") || "{}"
          );

          setProfileExists(false);

          setForm((prev) => ({
            ...prev,
            name: storedUser.name || "",
            email: storedUser.email || "",
          }));

          return;
        }

        setGeneralError(
          error.response?.data?.message ||
            "Unable to load profile."
        );
      } finally {
        setPageLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // =========================================================
  // INPUT CHANGE
  // =========================================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccessMessage("");
    setGeneralError("");
  };

  // =========================================================
  // IMAGE UPLOAD
  // =========================================================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        profilePic: "Please select a valid image.",
      }));
      return;
    }

    // Maximum 1.5 MB
    if (file.size > 1.5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        profilePic:
          "Image size must be less than 1.5 MB.",
      }));
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        profilePic: reader.result,
      }));

      setErrors((prev) => ({
        ...prev,
        profilePic: "",
      }));

      setSuccessMessage("");
    };

    reader.readAsDataURL(file);
  };

  // =========================================================
  // VALIDATION
  // =========================================================
  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (form.name.trim().length < 2) {
      newErrors.name =
        "Name must contain at least 2 characters.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim()
      )
    ) {
      newErrors.email =
        "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      newErrors.phone =
        "Phone number is required.";
    } else if (
      !/^[0-9+\-\s()]{7,20}$/.test(
        form.phone.trim()
      )
    ) {
      newErrors.phone =
        "Enter a valid phone number.";
    }

    if (!form.location.trim()) {
      newErrors.location =
        "Location is required.";
    }

    if (!form.designation.trim()) {
      newErrors.designation =
        "Designation is required.";
    }

    if (!form.companyName.trim()) {
      newErrors.companyName =
        "Company name is required.";
    }

    if (
      form.companyWebsite.trim() &&
      !/^https?:\/\/.+/i.test(
        form.companyWebsite.trim()
      )
    ) {
      newErrors.companyWebsite =
        "Website must start with http:// or https://";
    }

    if (!form.companyDescription.trim()) {
      newErrors.companyDescription =
        "Company description is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================================================
  // BACKEND ERROR MAPPING
  // =========================================================
  const mapBackendErrors = (data) => {
    const mappedErrors = {};

    const fieldMap = {
      user_id: "general",
      name: "name",
      email: "email",
      phone: "phone",
      location: "location",
      des: "designation",
      c_name: "companyName",
      c_website: "companyWebsite",
      c_des: "companyDescription",
      profile_img: "profilePic",
      industry: "industry",
      companySize: "companySize",
    };

    if (Array.isArray(data?.errors)) {
      data.errors.forEach((error) => {
        if (typeof error === "string") {
          mappedErrors.general = error;
          return;
        }

        const backendField = error.field;

        const frontendField =
          fieldMap[backendField] ||
          backendField ||
          "general";

        mappedErrors[frontendField] =
          error.message || "Invalid value.";
      });
    }

    if (Array.isArray(data?.issues)) {
      data.issues.forEach((issue) => {
        const backendField = issue.path?.[0];

        const frontendField =
          fieldMap[backendField] ||
          backendField ||
          "general";

        mappedErrors[frontendField] =
          issue.message || "Invalid value.";
      });
    }

    return mappedErrors;
  };

  // =========================================================
  // SAVE / UPDATE PROFILE
  // =========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setGeneralError("");
    setErrors({});

    // Validate form
    if (!validateForm()) {
      return;
    }

    // -------------------------------------------------------
    // ALWAYS GET USER ID FROM LOCAL STORAGE
    // -------------------------------------------------------
    const storedUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    const userId = Number(
      storedUser?.id ??
      storedUser?.user_id ??
      storedUser?.userId
    );

    // -------------------------------------------------------
    // USER ID CHECK
    // -------------------------------------------------------
    if (!userId || Number.isNaN(userId)) {
      setGeneralError(
        "User ID not found. Please logout and login again."
      );
      return;
    }

    // -------------------------------------------------------
    // REQUEST DATA
    // -------------------------------------------------------
    const requestData = {
      user_id: userId,

      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      location: form.location.trim(),

      des: form.designation.trim(),

      c_name: form.companyName.trim(),

      c_website: form.companyWebsite.trim(),

      c_des: form.companyDescription.trim(),

      profile_img: form.profilePic || null,

      // Send these only if your backend/database supports them
      industry: form.industry.trim(),
      companySize: form.companySize,
    };

    setLoading(true);

    try {
      const response = await axios.put(
        `${API_URL}/recruiter/update`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },

          maxContentLength:
            3 * 1024 * 1024,

          maxBodyLength:
            3 * 1024 * 1024,
        }
      );

      setProfileExists(true);
      setSuccessMessage(
        response.data?.message ||
          "Profile saved successfully"
      );

      setErrors({});
      setGeneralError("");

      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);

      setTimeout(() => {
        navigate("/recruiter/dashboard");
      }, 1500);

    } catch (error) {
      console.error(
        "PROFILE SAVE ERROR:",
        error
      );

      if (error.response) {
        console.error(
          "BACKEND RESPONSE:",
          error.response.data
        );

        const backendErrors =
          mapBackendErrors(
            error.response.data
          );

        if (
          Object.keys(backendErrors).length > 0
        ) {
          setErrors(backendErrors);
        }

        setGeneralError(
          error.response.data?.message ||
            "Unable to save profile."
        );
      } else if (error.request) {
        setGeneralError(
          "Cannot connect to backend. Make sure the server is running on port 5000."
        );
      } else {
        setGeneralError(
          error.message ||
            "Something went wrong."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FIELD ERROR
  // =========================================================
  const FieldError = ({ name }) => {
    if (!errors[name]) {
      return <div className="min-h-[20px]" />;
    }

    return (
      <div className="min-h-[20px]">
        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
          <AlertCircle size={13} />
          {errors[name]}
        </p>
      </div>
    );
  };

  // =========================================================
  // INPUT CLASS
  // =========================================================
  const inputClass = (field) =>
    `w-full rounded-xl border px-4 py-3 pl-11 text-sm outline-none transition ${
      errors[field]
        ? "border-red-400 bg-red-50 focus:border-red-500"
        : "border-gray-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
    }`;

  // =========================================================
  // PAGE LOADING
  // =========================================================
  if (pageLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2
          size={32}
          className="animate-spin text-emerald-600"
        />
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================
  return (
    <div className="min-h-screen bg-gray-50">
      <SideBar />

      <main className="lg:ml-64 min-h-screen">

        {/* HEADER */}
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Company Profile
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage your recruiter and company information
              </p>
            </div>

            <div className="hidden items-center gap-3 sm:flex">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">
                  {form.name || "Recruiter"}
                </p>

                <p className="text-xs text-gray-500">
                  {form.designation || "Recruiter"}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-emerald-100 text-emerald-700">
                {form.profilePic ? (
                  <img
                    src={form.profilePic}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User size={20} />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          {/* GENERAL ERROR */}
          {generalError && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0"
              />

              <div>
                <p className="font-semibold">
                  Unable to save profile
                </p>

                <p className="mt-1 text-sm">
                  {generalError}
                </p>
              </div>
            </div>
          )}

          {/* PROFILE HERO */}
          <section className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="h-28 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 sm:h-36" />

            <div className="px-5 pb-6 sm:px-8">

              <div className="-mt-12 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end">

                {/* PROFILE IMAGE */}
                <div className="relative w-fit">
                  <div className="h-24 w-24 overflow-hidden rounded-2xl border-4 border-white bg-emerald-50 shadow-lg sm:h-32 sm:w-32">

                    {form.profilePic ? (
                      <img
                        src={form.profilePic}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-emerald-600">
                        <User size={48} />
                      </div>
                    )}

                  </div>

                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white shadow-md transition hover:bg-emerald-700"
                  >
                    <Camera size={17} />

                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* PROFILE TITLE */}
                <div className="flex-1 pb-1">
                  <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    {form.name || "Your Name"}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {form.designation ||
                      "Your Designation"}
                  </p>

                  {form.companyName && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                      <Building2 size={15} />
                      {form.companyName}
                    </div>
                  )}
                </div>
              </div>

              {errors.profilePic && (
                <p className="mt-3 flex items-center gap-1 text-sm text-red-500">
                  <AlertCircle size={14} />
                  {errors.profilePic}
                </p>
              )}

              <p className="mt-3 text-xs text-gray-400">
                Recommended: JPG, JPEG or PNG. Maximum 1.5MB.
              </p>
            </div>
          </section>

          <form onSubmit={handleSubmit}>

            {/* PERSONAL INFORMATION */}
            <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">

              <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <User size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Personal Information
                  </h2>

                  <p className="text-sm text-gray-500">
                    Your basic recruiter information
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {/* NAME */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-3.5 text-gray-400"
                    />

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className={inputClass("name")}
                    />
                  </div>

                  <FieldError name="name" />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-3.5 text-gray-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      autoComplete="email"
                      className={inputClass("email")}
                    />
                  </div>

                  <FieldError name="email" />
                </div>

                {/* PHONE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-3.5 text-gray-400"
                    />

                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      autoComplete="tel"
                      className={inputClass("phone")}
                    />
                  </div>

                  <FieldError name="phone" />
                </div>

                {/* LOCATION */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Location
                  </label>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-3.5 text-gray-400"
                    />

                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="City, State"
                      autoComplete="address-level2"
                      className={inputClass("location")}
                    />
                  </div>

                  <FieldError name="location" />
                </div>

              </div>
            </section>

            {/* RECRUITER INFORMATION */}
            <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">

              <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Briefcase size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Recruiter Information
                  </h2>

                  <p className="text-sm text-gray-500">
                    Tell candidates about your role
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {/* DESIGNATION */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Designation
                  </label>

                  <div className="relative">
                    <Briefcase
                      size={18}
                      className="absolute left-4 top-3.5 text-gray-400"
                    />

                    <input
                      type="text"
                      name="designation"
                      value={form.designation}
                      onChange={handleChange}
                      placeholder="HR Manager"
                      className={inputClass("designation")}
                    />
                  </div>

                  <FieldError name="designation" />
                </div>

                {/* INDUSTRY */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Industry
                  </label>

                  <div className="relative">
                    <Building2
                      size={18}
                      className="absolute left-4 top-3.5 text-gray-400"
                    />

                    <input
                      type="text"
                      name="industry"
                      value={form.industry}
                      onChange={handleChange}
                      placeholder="Information Technology"
                      className={inputClass("industry")}
                    />
                  </div>

                  <FieldError name="industry" />
                </div>

              </div>
            </section>

            {/* COMPANY INFORMATION */}
            <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">

              <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Building2 size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Company Information
                  </h2>

                  <p className="text-sm text-gray-500">
                    Information about your company
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {/* COMPANY NAME */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Company Name
                  </label>

                  <div className="relative">
                    <Building2
                      size={18}
                      className="absolute left-4 top-3.5 text-gray-400"
                    />

                    <input
                      type="text"
                      name="companyName"
                      value={form.companyName}
                      onChange={handleChange}
                      placeholder="ABC Technologies"
                      className={inputClass("companyName")}
                    />
                  </div>

                  <FieldError name="companyName" />
                </div>

                {/* WEBSITE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Company Website
                  </label>

                  <div className="relative">
                    <Globe
                      size={18}
                      className="absolute left-4 top-3.5 text-gray-400"
                    />

                    <input
                      type="url"
                      name="companyWebsite"
                      value={form.companyWebsite}
                      onChange={handleChange}
                      placeholder="https://example.com"
                      autoComplete="url"
                      className={inputClass("companyWebsite")}
                    />
                  </div>

                  <FieldError name="companyWebsite" />
                </div>

                {/* COMPANY SIZE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Company Size
                  </label>

                  <div className="relative">
                    <Building2
                      size={18}
                      className="absolute left-4 top-3.5 text-gray-400"
                    />

                    <select
                      name="companySize"
                      value={form.companySize}
                      onChange={handleChange}
                      className={`${inputClass(
                        "companySize"
                      )} appearance-none`}
                    >
                      <option value="">
                        Select company size
                      </option>

                      <option value="1-10">
                        1-10 employees
                      </option>

                      <option value="11-50">
                        11-50 employees
                      </option>

                      <option value="51-200">
                        51-200 employees
                      </option>

                      <option value="201-500">
                        201-500 employees
                      </option>

                      <option value="501-1000">
                        501-1000 employees
                      </option>

                      <option value="1000+">
                        1000+ employees
                      </option>
                    </select>
                  </div>

                  <FieldError name="companySize" />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Company Description
                </label>

                <div className="relative">
                  <FileText
                    size={18}
                    className="absolute left-4 top-4 text-gray-400"
                  />

                  <textarea
                    name="companyDescription"
                    value={form.companyDescription}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell candidates about your company..."
                    className={`${inputClass(
                      "companyDescription"
                    )} resize-none pl-11`}
                  />
                </div>

                <FieldError name="companyDescription" />
              </div>
            </section>

            {/* SAVE BAR */}
            <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="font-semibold text-gray-800">
                    {profileExists
                      ? "Update your profile"
                      : "Complete your profile"}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Make sure all your information is correct before saving.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                  {successMessage && (
                    <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">
                      <CheckCircle size={18} />
                      {successMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex min-w-[170px] items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        {profileExists
                          ? "Update Profile"
                          : "Save Profile"}
                      </>
                    )}
                  </button>

                </div>
              </div>
            </section>

          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;