import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

function SuccessStoryCreate() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [college, setCollege] = useState("");
  const [imageFile, setImageFile] = useState(null); // File object
  const [preview, setPreview] = useState(""); // Preview URL
  const [quote, setQuote] = useState("");
  const [year, setYear] = useState("");
  const [score, setScore] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleCreateStory = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    if (!imageFile) {
      toast.error("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("course", course);
    formData.append("college", college);
    formData.append("quote", quote);
    formData.append("year", year);
    formData.append("score", score);
    formData.append("category", category);
    formData.append("image", imageFile); // Important!

    try {
      const response = await axios.post(`${BACKEND_URL}/admin/listing/success`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message || "Success story created successfully");
      navigate("/admin/success-stories");

      // Clear all fields
      setName("");
      setCourse("");
      setCollege("");
      setQuote("");
      setYear("");
      setScore("");
      setCategory("");
      setImageFile(null);
      setPreview("");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.errors || "Story creation failed.");
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-8">New Success Story</h3>

        <form onSubmit={handleCreateStory} className="space-y-6" encType="multipart/form-data">
          <div className="space-y-2">
            <label className="block text-lg">Name</label>
            <input
              type="text"
              placeholder="Enter student name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg">Course</label>
            <input
              type="text"
              placeholder="Enter course (e.g. NEET, JEE)"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg">College</label>
            <input
              type="text"
              placeholder="Enter college name"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              required
            />
          </div>

          {preview && (
            <div className="flex items-center justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-full max-w-sm h-auto rounded-md object-cover"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-lg">Quote</label>
            <input
              type="text"
              placeholder="Enter inspirational quote"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg">Year</label>
            <input
              type="text"
              placeholder="e.g. 2025"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg">Score</label>
            <input
              type="text"
              placeholder="Enter score (e.g. 710)"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg">Category</label>
            <input
              type="text"
              placeholder="Enter category (e.g. General, OBC)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200"
          >
            Submit Success Story
          </button>
        </form>
      </div>
    </div>
  );
}

export default SuccessStoryCreate;
