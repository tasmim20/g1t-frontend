"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import logo from "../../../../public/assets/green1taxi1.png";
import Image from "next/image";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { AiFillProfile } from "react-icons/ai";

// Mock pages for testing purposes
const pages = [
  "Pricing", // Pricing details for rides
  "Booking", // Page for riders to book a taxi
  "FAQ", // Frequently Asked Questions
  "Terms", // Terms of service
  "Privacy", // Privacy policy
];

function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle
  const [userProfileOpen, setUserProfileOpen] = useState(false); // State for user profile dropdown

  // Simulate user data (Replace this with your real user authentication logic)
  const user = {
    name: "John Doe",
    role: "student", // Simulate the user role (student, driver, rider, etc.)
  };

  const isActive = (page: string) => {
    if (page === "Home") {
      return pathname === "/";
    }
    return pathname === `/${page.toLowerCase()}`;
  };

  const getDashboardLink = () => {
    switch (user.role) {
      case "admin":
        return "/dashboard/admin";
      case "driver":
        return "/dashboard/driver";
      case "rider":
        return "/dashboard/rider";
      default:
        return "/dashboard";
    }
  };

  // Toggle mobile menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Toggle user profile dropdown
  const toggleUserProfile = () => setUserProfileOpen(!userProfileOpen);

  return (
    <div className="flex-grow">
      {/* Main Navbar */}
      <nav className="bg-[#e6fdeb] py-2 px-10 border-b border-gray-200 relative z-20">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            {/* Logo */}
            <Image src={logo} alt="Logo" width={70} />
            <p className="text-2xl font-bold text-green-800">green1taxi</p>
          </div>

          {/* Mobile Menu Button (3-bar icon) */}
          <div className="flex ml-auto md:hidden">
            <button onClick={toggleMenu} className="text-green-900">
              {menuOpen ? (
                // Cross icon to close the menu
                <FaTimes className="h-6 w-6" />
              ) : (
                // 3-bar icon to open the menu
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex ml-auto space-x-6">
            {pages.map((page) => (
              <a
                href={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                className={`text-md font-semibold ${
                  isActive(page)
                    ? "text-black border-b-2 border-black"
                    : "text-black"
                }`}
                key={page}
              >
                {page}
              </a>
            ))}
            {/* {user ? (
              <>
                <a href={getDashboardLink()} className="text-lg font-medium">
                  Dashboard
                </a>
                <a href="/logout" className="text-lg font-medium">
                  Logout
                </a>
              </>
            ) : (
              <>
                <a href="/login" className="text-lg font-medium">
                  Login
                </a>
                <a href="/signup" className="text-lg font-medium">
                  Sign Up
                </a>
              </>
            )} */}
          </div>

          {/* Conditional Profile Icon for Desktop and Mobile */}
          {user && (
            <div className="relative flex items-center ml-4">
              <button onClick={toggleUserProfile} className="flex items-center">
                <FaUserCircle className="w-8 h-8" />
              </button>

              {userProfileOpen && (
                <div className="absolute right-0 mt-2 top-12 bg-white shadow-lg rounded-lg w-48 py-2 text-black">
                  <div className="px-4 py-2 font-bold">{user.name}</div>
                  <div className="px-4 py-2">{user.role}</div>
                  <div className="px-4 py-2">
                    <a href="/manage-account" className="block">
                      Manage account
                    </a>
                  </div>
                  <div className="px-4 py-2">
                    <a href="/promotions" className="block">
                      Promotions
                    </a>
                  </div>
                  <div className="px-4 py-2 border-t">
                    <a href="/logout" className="block text-red-600">
                      Sign out
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu (Conditional rendering for small screens) */}
      <div
        className={`md:hidden bg-white text-black shadow-md py-10 px-4 absolute top-0 left-0 right-0 transform transition-all duration-700 ease-in-out z-10 ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[-100%]"
        }`}
      >
        {/* Logo and Close icon */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Image src={logo} alt="Logo" width={30} />
          </div>

          {/* Close icon */}
          <div className="flex">
            <button onClick={toggleMenu} className="text-green-900">
              <FaTimes className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Menu Links and User-specific options */}
        <div className="space-y-4">
          {pages.map((page) => (
            <a
              href={page === "Home" ? "/" : `/${page.toLowerCase()}`}
              className={`block text-md font-semibold ${
                isActive(page) ? "text-black" : "text-gray-500"
              }`}
              key={page}
            >
              {page}
            </a>
          ))}

          {/* {user ? (
            <>
              <a
                href={getDashboardLink()}
                className={`block text-lg font-medium ${
                  isActive("dashboard") ? "text-black" : "text-gray-500"
                }`}
              >
                Dashboard
              </a>
              <a
                href="/logout"
                className={`block text-lg font-medium ${
                  isActive("logout") ? "text-black" : "text-gray-500"
                }`}
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <a
                href="/login"
                className={`block text-lg font-medium ${
                  isActive("login") ? "text-black" : "text-gray-500"
                }`}
              >
                Login
              </a>
              <a
                href="/signup"
                className={`block text-lg font-medium ${
                  isActive("signup") ? "text-black" : "text-gray-500"
                }`}
              >
                Sign Up
              </a>
            </>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
