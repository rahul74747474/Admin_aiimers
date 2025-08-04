import Lead from "../models/lead.js";

// Get All Leads (Admin-only)
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({ leads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ errors: "Failed to fetch leads" });
  }
};
