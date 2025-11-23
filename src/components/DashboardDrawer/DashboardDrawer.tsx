"use client";

import { useState } from "react";
import SideBar from "../SideBar/SideBar";
import { logoutUser } from "@/src/utils/actions/logout";
import { useAuthUser } from "@/src/redux/api/authApi/useAuthUser";

interface DashboardDrawerProps {
  children: React.ReactNode;
}

export default function DashboardDrawer({ children }: DashboardDrawerProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Access token from Redux memory
  const { user, isLoggedIn } = useAuthUser();
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for desktop */}
      <div className="hidden sm:flex sm:flex-col w-64 bg-white border-r">
        <SideBar />
      </div>

      {/* Sidebar for mobile */}
      {mobileOpen && (
        <div className="sm:hidden fixed inset-0 z-50 flex bg-black/50">
          <div className="bg-white w-64">
            <SideBar />
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex items-center justify-between  text-black h-16 px-4 shadow">
          <div className="flex items-center gap-4">
            <button
              className="sm:hidden text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {/* Hamburger icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {user ? (
              <div>
                <div className="text-black font-semibold">Assalamu Alaikum</div>
                <div className="text-black  text-sm">{user.email}</div>
              </div>
            ) : (
              <div className="text-black  font-semibold">Loading...</div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button className="text-white">
              {/* Notification Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C7.64 5.36 6 7.929 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
            </button>
            <div className="flex items-center gap-4">
              {isLoggedIn && (
                <button
                  className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
