import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function SuccessStories() {
  const [stories, setStories] = useState([]);

  const fetchStories = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return toast.error("You must be logged in as admin");

    try {
      const res = await axios.get(`${BACKEND_URL}/admin/listing/success-stories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStories(res.data.stories || []);
    } catch (error) {
      toast.error("Failed to fetch success stories.");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("adminToken");
    if (!token) return toast.error("Not authorized");

    try {
      await axios.delete(`${BACKEND_URL}/admin/listing/success-stories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Success story deleted");
      fetchStories(); // Refresh list
    } catch (error) {
      toast.error("Failed to delete story");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Success Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story._id} className="bg-white shadow-md rounded p-4">
            <img
              src={story.image?.url} // ✅ Use Cloudinary URL from DB
              alt={story.name}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="mt-4 font-bold text-lg">{story.name}</h3>
            <p className="text-sm text-gray-600">{story.college}</p>
            <p className="text-sm text-gray-600">Course: {story.course}</p>
            <p className="text-sm text-gray-600">Score: {story.score}</p>
            <p className="text-sm text-gray-600">Year: {story.year}</p>
            <p className="text-sm text-gray-600 italic mt-2">"{story.quote}"</p>
            <button
              onClick={() => handleDelete(story._id)}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuccessStories;
