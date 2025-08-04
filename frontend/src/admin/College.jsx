import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function Colleges() {
  const [colleges, setColleges] = useState([]);

  const fetchColleges = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${BACKEND_URL}/admin/colleges`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setColleges(res.data.colleges || []);
    } catch (error) {
      toast.error("Failed to fetch colleges");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(`${BACKEND_URL}/admin/colleges/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("College deleted successfully");
      fetchColleges(); // Refresh list
    } catch (error) {
      toast.error("Error deleting college");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Colleges</h2>

      {colleges.length === 0 ? (
        <p className="text-gray-600">No colleges found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {colleges.map((college) => (
            <div key={college._id} className="bg-white rounded shadow p-4">
              <img
                src={college.image?.url || "/no-image.png"}
                alt={college.name}
                className="h-40 w-full object-contain mb-2"
              />
              <h3 className="text-lg font-bold">{college.name}</h3>
              <p className="text-sm text-gray-600">Location: {college.location}</p>
              <p className="text-sm text-gray-600">Courses: {college.courses}</p>
              <p className="text-sm text-gray-600">Grade: {college.grade}</p>
              <p className="text-sm text-gray-600">Established: {college.established}</p>
              <button
                onClick={() => handleDelete(college._id)}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Colleges;
