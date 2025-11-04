import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BASE = "https://mbabane-defrdwe3dkekfkdp.southafricanorth-01.azurewebsites.net";

export default function EditFixtureForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [fixture, setFixture] = useState({
    date: "",
    time: "",
    homeTeam: "",
    awayTeam: "",
    stadium: ""
  });

  useEffect(() => {
    axios.get(`${BASE}/api/fixtures/${id}`)
      .then(res => {
        setFixture({
          date: res.data.date,
          time: res.data.time,
          homeTeam: res.data.homeTeam,
          awayTeam: res.data.awayTeam,
          stadium: res.data.stadium
        });
      })
      .catch(err => {
        console.error("❌ Failed to fetch fixture:", err);
        alert("Failed to load fixture.");
        navigate("/admin");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFixture((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      Date: fixture.date,
      Time: fixture.time + ":00",
      HomeTeam: fixture.homeTeam,
      AwayTeam: fixture.awayTeam,
      Stadium: fixture.stadium
    };

    try {
      await axios.put(`${BASE}/api/fixtures/update-fixture/${id}`, payload);
      alert("Fixture updated successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("❌ Failed to update fixture:", err);
      alert("Failed to update fixture.");
    }
  };

  const handleCancel = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-black text-[#BFA76F] p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Fixture</h1>
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
            name="homeTeam"
            value={fixture.homeTeam}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#1A1F3A] text-[#BFA76F] border border-[#BFA76F]"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Away Team</label>
          <input
            type="text"
            name="awayTeam"
            value={fixture.awayTeam}
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
            ✏️ Update Fixture
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