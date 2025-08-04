import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function Leads() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${BACKEND_URL}/admin/leads`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLeads(res.data.leads || []);
    } catch (error) {
      toast.error("Failed to fetch leads");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Leads</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {leads.map((lead) => (
          <div key={lead._id} className="bg-white rounded shadow p-4">
            <p><strong>Name:</strong> {lead.fullName}</p>
            <p><strong>Email:</strong> {lead.email}</p>
            <p><strong>Phone:</strong> {lead.phone}</p>
            <p><strong>Course:</strong> {lead.course}</p>
            <p><strong>Location:</strong> {lead.location}</p>
            <p className="text-sm text-gray-500 mt-1">
              <strong>Created:</strong> {new Date(lead.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leads;
