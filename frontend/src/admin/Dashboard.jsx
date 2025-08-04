import React from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.webp";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";

function Dashboard() {
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("admin");
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-5">
        {/* Logo & Admin Info */}
        <div className="flex items-center flex-col mb-10">
          <img src={logo} alt="Admin Logo" className="rounded-full h-20 w-20" />
          <h2 className="text-lg font-semibold mt-4">I'm Admin</h2>
        </div>

        {/* Navigation Buttons */}
        <nav className="flex flex-col space-y-4">
          {/* Listings */}
          <Link to="/admin/testimonials">
            <button className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded">
              Testimonials
            </button>
          </Link>

          {/* Create Listing */}
          <Link to="/admin/testimonial/create">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded">
              Create Testimonial
            </button>
          </Link>
          <Link to="/admin/leads">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded">
              Leads
            </button>
          </Link>
          <Link to="/admin/College/create">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded">
              Create College
            </button>
          </Link>
          <Link to="/admin/College">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded">
              Colleges
            </button>
          </Link>

          {/* View Success Stories */}
          <Link to="/admin/success-stories">
            <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded">
              Success Stories
            </button>
          </Link>

          {/* Create Success Story */}
          <Link to="/admin/success-stories/create">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded">
              Create Success Story
            </button>
          </Link>

          {/* Home Page */}
          <Link to="/">
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded">
              Home
            </button>
          </Link>

          {/* Logout */}
          <Link to="/admin/login">
            <button
              onClick={handleLogout}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
            >
              Logout
            </button>
          </Link>
        </nav>
      </div>

      {/* Welcome Message Section */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <h1 className="text-3xl font-semibold text-gray-700">Welcome to the Admin Dashboard!</h1>
      </div>
    </div>
  );
}

export default Dashboard;
