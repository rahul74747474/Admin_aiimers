import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error("Not authorized");
        return;
      }

      const res = await axios.get(`${BACKEND_URL}/admin/testimonials`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTestimonials(res.data.testimonials || []);
    } catch (error) {
      toast.error("Failed to fetch testimonials");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(`${BACKEND_URL}/admin/testimonials/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Testimonial deleted successfully");
      fetchTestimonials();
    } catch (error) {
      toast.error("Error deleting testimonial");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div key={t._id} className="bg-white rounded p-4 shadow-md">
            {/* ✅ Show Image if available */}
            {t.image?.url && (
              <img
                src={t.image.url}
                alt={t.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <p className="text-lg font-semibold">{t.name}</p>
            <p className="text-sm text-gray-600 italic">"{t.quote}"</p>
            <button
              onClick={() => handleDelete(t._id)}
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

export default Testimonials;
