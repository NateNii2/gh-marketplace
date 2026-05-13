import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  changePassword,
  deleteAccount,
} from "../api/accountApi";

export default function Account() {

  const {
    user,
    token,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleLogout = () => {

    logout();

    navigate("/login");
  };

  /* =========================
     CHANGE PASSWORD
  ========================= */

  const handlePasswordChange =
    async () => {

      try {

        const res =
          await changePassword(
            {
              currentPassword,
              newPassword,
            },
            token
          );

        setMessage(
          res.message ||
            "Password changed successfully"
        );

        setCurrentPassword("");

        setNewPassword("");

      } catch (err) {

        setMessage(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to change password"
        );
      }
    };

  /* =========================
     DELETE ACCOUNT
  ========================= */

  const handleDeleteAccount =
    async () => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to permanently delete your account?"
        );

      if (!confirmDelete) return;

      try {

        const res =
          await deleteAccount(token);

        alert(
          res.message ||
            "Account deleted"
        );

        logout();

        navigate("/");

      } catch (err) {

        setMessage(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to delete account"
        );
      }
    };

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="bg-white rounded-[32px] shadow-xl overflow-hidden">

          {/* TOP BANNER */}

          <div className="relative h-56 bg-black overflow-hidden">

            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop"
              alt="banner"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">

              <div className="w-24 h-24 rounded-full bg-yellow-400 text-black flex items-center justify-center text-4xl font-bold border-4 border-white shadow-xl">

                {user?.name?.charAt(0)?.toUpperCase() || "U"}

              </div>

              <h1 className="mt-5 text-4xl font-bold">

                {user?.name}

              </h1>

              <p className="text-gray-200 mt-2">

                Manage your account and profile details

              </p>

            </div>

          </div>

          {/* BODY */}

          <div className="p-6 md:p-10 grid md:grid-cols-3 gap-6">

            {/* PROFILE CARD */}

            <div className="md:col-span-2 bg-gray-50 rounded-3xl p-6 border border-gray-100">

              <div className="flex items-center justify-between mb-8">

                <h2 className="text-2xl font-bold text-gray-900">

                  Account Information

                </h2>

                <div className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">

                  Active

                </div>

              </div>

              <div className="space-y-6">

                {/* NAME */}

                <div className="bg-white rounded-2xl p-5 border border-gray-100">

                  <p className="text-sm text-gray-500">

                    Full Name

                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-gray-900">

                    {user?.name}

                  </h3>

                </div>

                {/* EMAIL */}

                <div className="bg-white rounded-2xl p-5 border border-gray-100">

                  <p className="text-sm text-gray-500">

                    Email Address

                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-gray-900 break-all">

                    {user?.email}

                  </h3>

                </div>

                {/* ROLE */}

                <div className="bg-white rounded-2xl p-5 border border-gray-100">

                  <p className="text-sm text-gray-500">

                    Account Role

                  </p>

                  <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 font-medium capitalize">

                    {user?.role === "admin"
                      ? "👑 Admin"
                      : "🛍️ User"}

                  </div>

                </div>

              </div>

            </div>

            {/* SIDE PANEL */}

            <div className="space-y-6">

              {/* SECURITY */}

              <div className="bg-black text-white rounded-3xl p-6 overflow-hidden relative">

                <div className="absolute top-0 right-0 text-7xl opacity-10">

                  🔒

                </div>

                <div className="relative z-10">

                  <h3 className="text-xl font-bold">

                    Secure Account

                  </h3>

                  <p className="mt-3 text-gray-300 text-sm leading-relaxed">

                    Your account is protected with authentication and verification security layers.

                  </p>

                </div>

              </div>

              {/* QUICK ACTIONS */}

              <div className="bg-white rounded-3xl p-6 border border-gray-100">

                <h3 className="text-lg font-bold text-gray-900">

                  Quick Actions

                </h3>

                <div className="mt-5 space-y-4">

                  {/* ORDERS */}

                  <button
                    onClick={() => navigate("/orders")}
                    className="w-full text-left px-5 py-4 rounded-2xl border hover:bg-gray-50 transition"
                  >

                    <p className="font-medium">

                      📦 My Orders

                    </p>

                    <p className="text-sm text-gray-500 mt-1">

                      View your order history

                    </p>

                  </button>

                  {/* CHANGE PASSWORD */}

                  <div className="bg-gray-50 rounded-2xl p-4 space-y-3">

                    <h3 className="font-semibold text-gray-900">

                      Change Password

                    </h3>

                    <input
                      type="password"
                      placeholder="Current Password"
                      className="input"
                      value={currentPassword}
                      onChange={(e) =>
                        setCurrentPassword(
                          e.target.value
                        )
                      }
                    />

                    <input
                      type="password"
                      placeholder="New Password"
                      className="input"
                      value={newPassword}
                      onChange={(e) =>
                        setNewPassword(
                          e.target.value
                        )
                      }
                    />

                    <button
                      onClick={
                        handlePasswordChange
                      }
                      className="w-full bg-black text-white py-3 rounded-2xl hover:opacity-90 transition font-medium"
                    >

                      Change Password

                    </button>

                  </div>

                  {/* MESSAGE */}

                  {message && (

                    <div className="bg-blue-50 border border-blue-100 text-blue-700 text-sm rounded-2xl p-4">

                      {message}

                    </div>

                  )}

                  {/* LOGOUT */}

                  <button
                    onClick={handleLogout}
                    className="w-full px-5 py-4 rounded-2xl bg-red-500 hover:bg-red-600 transition text-white font-semibold"
                  >

                    Logout

                  </button>

                  {/* DELETE ACCOUNT */}

                  <button
                    onClick={
                      handleDeleteAccount
                    }
                    className="w-full px-5 py-4 rounded-2xl bg-black hover:bg-gray-900 transition text-white font-semibold"
                  >

                    Delete Account

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}