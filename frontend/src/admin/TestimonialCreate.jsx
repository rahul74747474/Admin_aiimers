import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

function TestimonialCreate() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState(null);
  const [quote, setQuote] = useState("");

  const navigate = useNavigate();

  const handleCreateTestimonial = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    if (!token) {
      toast.error("Not authorized");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("course", course);
    formData.append("image", image);  // 👈 file object
    formData.append("quote", quote);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/admin/testimonials/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message || "Testimonial created successfully");
      setName("");
      setCourse("");
      setImage("");
      setQuote("");
      navigate("/admin/testimonials");
    } catch (error) {
      toast.error(error.response?.data?.errors || "Error creating testimonial");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen py-10 bg-gray-100">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
        <h3 className="text-2xl font-semibold mb-6">Create Testimonial</h3>

        <form onSubmit={handleCreateTestimonial} className="space-y-6">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              placeholder="Student name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Course</label>
            <input
              type="text"
              placeholder="Course name"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Upload image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Quote</label>
            <textarea
              placeholder="What did they say?"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default TestimonialCreate;
