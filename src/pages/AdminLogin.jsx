// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE = "https://mbabane-defrdwe3dkekfkdp.southafricanorth-01.azurewebsites.net"; // make sure this matches your backend

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${BASE}/api/Admin/login`, {
        username,
        password
      });

      if (res.data.success) {
        // store token if backend returns JWT
        localStorage.setItem("adminToken", res.data.token || "");
        alert("Login successful!");
        navigate("/admin"); // redirect to AdminDashboard
      } else {
        setError(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-[#BFA76F]">
      <form
        onSubmit={handleLogin}
        className="bg-[#1A1F3A] p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {error && (
          <div className="bg-red-600 text-white p-2 mb-4 rounded">{error}</div>
        )}

        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 rounded bg-black border border-[#BFA76F]"
            style={{ color: "#BFA76F" }}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded bg-black border border-[#BFA76F]"
            style={{ color: "#BFA76F" }}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#BFA76F] text-black py-2 rounded font-bold hover:bg-yellow-500 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
