import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import Purchases from "./components/Purchases";
import Buy from "./components/Buy";
import Courses from "./components/Courses";
import AdminSignup from "./admin/AdminSignup";
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import Testimonial from "./admin/Testimonials";
import TestimonialCreate from "./admin/TestimonialCreate";
import Leads from "./admin/Leads";
import CollegeCreate from "./admin/CollegeCreate";
import College from "./admin/College";

// import Dashboard from ".//Dashboard";
import SuccessStories from "./admin/SuccessStories";
import CreateSuccessStory from "./admin/SuccessStoryCreate";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  return (
    <div>
      <Routes>

        {/* Admin Routes */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={<Dashboard /> }
        />
<Route path="/admin/success-stories" element={<SuccessStories />} />
<Route path="/admin/success-stories/create" element={<CreateSuccessStory />} />
<Route path="/admin/testimonials" element={<Testimonial />} />
<Route path="/admin/testimonial/create" element={<TestimonialCreate />} />
<Route path="/admin/leads" element={<Leads />} />
<Route path="/admin/College/create" element={<CollegeCreate />} />
<Route path="/admin/College" element={<College />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
