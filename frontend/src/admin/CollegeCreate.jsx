import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

function CollegeCreate() {
  const [name, setName] = useState("");
  const [fees, setFees] = useState("");
  const [established, setEstablished] = useState("");
  const [seat, setSeat] = useState("");
  const [location, setLocation] = useState("");
  const [courses, setCourses] = useState("");
  const [grade, setGrade] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    if (!token) {
      toast.error("Unauthorized");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("courses", courses);
    formData.append("grade", grade);
    formData.append("image", image);
    formData.append("established", established);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/admin/colleges/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(res.data.message);
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.errors || "Failed to create college");
      console.error(error);
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Create College</h2>
      <form onSubmit={handleCreate} className="max-w-xl space-y-4">
        <input
          type="text"
          placeholder="College Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Courses Offered"
          value={courses}
          onChange={(e) => setCourses(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Grade (e.g. A+)"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-2 border rounded"
          required
        />

        {/* ✅ Image Preview */}
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="h-32 object-contain border p-2 rounded"
          />
        )}

        <input
          type="text"
          placeholder="established"
          value={established}
          onChange={(e) => setEstablished(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Create College
        </button>
      </form>
    </div>
  );
}

export default CollegeCreate;

