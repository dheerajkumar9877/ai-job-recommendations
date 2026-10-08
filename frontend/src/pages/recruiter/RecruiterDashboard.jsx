import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BriefcaseBusiness,
  Users,
  CalendarDays,
  User,
  Plus,
  ArrowRight,
  MapPin,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import RecruiterSideBar from "../auth/RecruiterSideBar";

const API_URL = "http://localhost:5000";

function RecruiterDashboard() {
  const navigate = useNavigate();

  // =========================================================
  // USER
  // =========================================================

  const getStoredUser = () => {
    try {
      return JSON.parse(
        localStorage.getItem("user") || "{}"
      );
    } catch {
      return {};
    }
  };

  const getUserId = () => {
    const storedUser = getStoredUser();

    return Number(
      storedUser?.id ??
        storedUser?.user_id ??
        storedUser?.userId
    );
  };

  const [user, setUser] = useState(
    getStoredUser()
  );

  // =========================================================
  // PROFILE
  // =========================================================

  const [profile, setProfile] = useState({
    name: "",
    designation: "",
    companyName: "",
    location: "",
    profile_img: "",
  });

  const [loading, setLoading] = useState(true);

  // =========================================================
  // DASHBOARD DATA
  // =========================================================

  const [stats, setStats] = useState({
    jobs: 0,
    applicants: 0,
    interviews: 0,
  });

  // =========================================================
  // FETCH PROFILE FROM DATABASE
  // =========================================================

  const fetchProfile = async () => {
    try {
      const userId = getUserId();

      if (!userId || Number.isNaN(userId)) {
        return;
      }

      const response = await axios.get(
        `${API_URL}/recruiter/profile/${userId}`
      );

      const data = response.data?.profile;

      if (!data) {
        return;
      }

      const latestProfile = {
        name: data.name || user.name || "Recruiter",
        designation: data.des || "Recruiter",
        companyName: data.c_name || "",
        location: data.location || "",
        profile_img:
          data.profile_img ||
          user.profile_img ||
          "",
      };

      setProfile(latestProfile);

      // Keep ONLY name and image in localStorage
      const updatedUser = {
        ...user,
        name: latestProfile.name,
        profile_img: latestProfile.profile_img,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);
    } catch (error) {
      console.error(
        "Failed to fetch recruiter profile:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchProfile();
  }, []);

  // =========================================================
  // LISTEN FOR PROFILE UPDATE
  // =========================================================

  useEffect(() => {
    const handleProfileUpdated = (event) => {
      const storedUser = getStoredUser();

      const updatedName =
        event.detail?.name ||
        storedUser.name ||
        "Recruiter";

      const updatedImage =
        event.detail?.profile_img ||
        storedUser.profile_img ||
        "";

      setUser({
        ...storedUser,
        name: updatedName,
        profile_img: updatedImage,
      });

      setProfile((prev) => ({
        ...prev,
        name: updatedName,
        profile_img: updatedImage,
      }));
    };

    window.addEventListener(
      "profileUpdated",
      handleProfileUpdated
    );

    return () => {
      window.removeEventListener(
        "profileUpdated",
        handleProfileUpdated
      );
    };
  }, []);

  // =========================================================
  // DISPLAY VALUES
  // =========================================================

  const displayName =
    profile.name ||
    user.name ||
    "Recruiter";

  const profileImage =
    profile.profile_img ||
    user.profile_img ||
    "";

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <RecruiterSideBar />

        <main className="min-h-screen lg:ml-64">
          <div className="flex min-h-screen items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-emerald-600" />
          </div>
        </main>
      </div>
    );
  }

  // =========================================================
  // DASHBOARD
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-50">
      <RecruiterSideBar />

      <main className="min-h-screen lg:ml-64">

        {/* HEADER */}
        <header className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6 lg:px-8">

          <div className="mx-auto flex max-w-7xl items-center justify-between">

            <div>
              <p className="text-sm font-medium text-emerald-600">
                Recruiter Dashboard
              </p>

              <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                Welcome, {displayName}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage your jobs, applicants and interviews.
              </p>
            </div>

            {/* PROFILE */}
            <div className="hidden items-center gap-3 sm:flex">

              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {displayName}
                </p>

                <p className="text-xs text-gray-500">
                  {profile.designation ||
                    "Recruiter"}
                </p>
              </div>

              <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-emerald-100 bg-emerald-50">

                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={displayName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-emerald-600">
                    <User size={23} />
                  </div>
                )}

              </div>
            </div>

          </div>
        </header>

        {/* CONTENT */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          {/* PROFILE CARD */}
          <section className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="h-28 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600" />

            <div className="px-5 pb-6 sm:px-7">

              <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end">

                <div className="h-20 w-20 overflow-hidden rounded-2xl border-4 border-white bg-emerald-50 shadow-lg">

                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={displayName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-emerald-600">
                      <User size={35} />
                    </div>
                  )}

                </div>

                <div className="flex-1">

                  <h2 className="text-xl font-bold text-gray-900">
                    {displayName}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {profile.designation ||
                      "Recruiter"}
                  </p>

                  {profile.companyName && (
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                      <Building2 size={14} />
                      {profile.companyName}
                    </div>
                  )}

                  {profile.location && (
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={14} />
                      {profile.location}
                    </div>
                  )}

                </div>

                <button
                  onClick={() =>
                    navigate("/recruiter/profile")
                  }
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Edit Profile
                </button>

              </div>
            </div>
          </section>

          {/* STAT CARDS */}
          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {/* JOBS */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Jobs
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    {stats.jobs}
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <BriefcaseBusiness size={23} />
                </div>

              </div>

              <button
                onClick={() =>
                  navigate("/recruiter/manage-jobs")
                }
                className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Manage jobs
                <ArrowRight size={16} />
              </button>

            </div>

            {/* APPLICANTS */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Applicants
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    {stats.applicants}
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Users size={23} />
                </div>

              </div>

              <button
                onClick={() =>
                  navigate("/recruiter/applicants")
                }
                className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View applicants
                <ArrowRight size={16} />
              </button>

            </div>

            {/* INTERVIEWS */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Interviews
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    {stats.interviews}
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <CalendarDays size={23} />
                </div>

              </div>

              <button
                onClick={() =>
                  navigate("/recruiter/interviews")
                }
                className="mt-5 flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700"
              >
                View interviews
                <ArrowRight size={16} />
              </button>

            </div>

          </section>

          {/* QUICK ACTIONS */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-900">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Quickly manage your recruitment activities.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              <button
                onClick={() =>
                  navigate("/recruiter/create-job")
                }
                className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 text-left transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <Plus size={22} />
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    Post a Job
                  </p>

                  <p className="text-xs text-gray-500">
                    Create a new job vacancy
                  </p>
                </div>
              </button>

              <button
                onClick={() =>
                  navigate("/recruiter/applicants")
                }
                className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Users size={22} />
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    View Applicants
                  </p>

                  <p className="text-xs text-gray-500">
                    Review candidate applications
                  </p>
                </div>
              </button>

              <button
                onClick={() =>
                  navigate("/recruiter/profile")
                }
                className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 text-left transition hover:border-purple-300 hover:bg-purple-50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <Building2 size={22} />
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    Company Profile
                  </p>

                  <p className="text-xs text-gray-500">
                    Update your company information
                  </p>
                </div>
              </button>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default RecruiterDashboard;