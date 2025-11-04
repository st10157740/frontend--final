import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE = "https://mbabane-defrdwe3dkekfkdp.southafricanorth-01.azurewebsites.net";

export default function AddFixtureForm() {
  const navigate = useNavigate();

  const [fixture, setFixture] = useState({
    date: "",
    time: "",
    home: "",
    away: "",
    stadium: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFixture((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        date: fixture.date, 
        time: fixture.time + ":00",
        homeTeam: fixture.home,
        awayTeam: fixture.away,
        stadium: fixture.stadium
      };

      console.log("🚀 Sending payload:", payload);
      await axios.post(`${BASE}/api/Fixtures`, payload);
      alert("Fixture added successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("❌ Failed to add fixture:", err.response?.data || err);
      alert("Failed to add fixture. Check console.");
    }
  };

  const handleCancel = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-black text-[#BFA76F] p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Fixture</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={fixture.date}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#1A1F3A] text-[#BFA76F] border border-[#BFA76F]"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Time</label>
          <input
            type="time"
            name="time"
            value={fixture.time}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#1A1F3A] text-[#BFA76F] border border-[#BFA76F]"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Home Team</label>
          <input
            type="text"
            name="home"
            value={fixture.home}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#1A1F3A] text-[#BFA76F] border border-[#BFA76F]"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Away Team</label>
          <input
            type="text"
            name="away"
            value={fixture.away}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#1A1F3A] text-[#BFA76F] border border-[#BFA76F]"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Stadium</label>
          <input
            type="text"
            name="stadium"
            value={fixture.stadium}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#1A1F3A] text-[#BFA76F] border border-[#BFA76F]"
          />
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            type="submit"
            className="bg-[#BFA76F] text-black font-bold px-4 py-2 rounded shadow"
          >
            ➕ Add Fixture
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded shadow"
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
}