"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import logo from "../../../../public/assets/green1taxi1.png";
import Image from "next/image";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useAuthUser } from "@/src/redux/api/authApi/useAuthUser"; // Use the custom hook

// Mock pages for testing purposes
const pages = [
  "Register", // Pricing details for rides
  "Login", // Page for riders to book a taxi
  "FAQ", // Frequently Asked Questions
  "Terms", // Terms of service
  "Privacy", // Privacy policy
];

function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle
  const [userProfileOpen, setUserProfileOpen] = useState(false); // State for user profile dropdown

  // Access user data and login status from Redux via the useAuthUser hook
  const { user, isLoggedIn } = useAuthUser();

  const isActive = (page: string) => {
    if (page === "Home") {
      return pathname === "/";
    }
    return pathname === `/${page.toLowerCase()}`;
  };

  // Function to get the dashboard link based on the user role
  const getDashboardLink = () => {
    if (!user?.role) return "/"; // Redirect to homepage if no role exists

    switch (user.role) {
      case "ADMIN":
        return "/dashboard/admin";
      case "DRIVER":
        return "/dashboard/driver";
      case "RIDER":
        return "/dashboard/rider";
      default:
        return "/dashboard"; // Fallback in case of an unknown role
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

          {/* Mobile Menu Button */}
          <div className="flex ml-auto md:hidden">
            <button onClick={toggleMenu} className="text-green-900">
              {menuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
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
          </div>

          {/* Conditional Profile Icon for Desktop and Mobile */}
          {isLoggedIn && user && (
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
                      {user.email}
                    </a>
                  </div>
                  <div className="px-4 py-2">
                    {/* Profile links */}
                    <a href={getDashboardLink()} className="block">
                      Dashboard
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
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Image src={logo} alt="Logo" width={30} />
          </div>
          <div className="flex">
            <button onClick={toggleMenu} className="text-green-900">
              <FaTimes className="h-5 w-5" />
            </button>
          </div>
        </div>

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
          {isLoggedIn && user && (
            <a
              href={getDashboardLink()}
              className="block text-lg font-medium text-black"
            >
              Dashboard
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
