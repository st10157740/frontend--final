import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ import context

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { setUser, setRole } = useAuth(); // ✅ use context setters

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Logging in...");

    try {
      const response = await fetch("https://mbabane-defrdwe3dkekfkdp.southafricanorth-01.azurewebsites.net/api/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(text);
      }

      if (response.ok && data.access_token) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));

        const role = Array.isArray(data.user.roles) ? data.user.roles[0] : "user";
        localStorage.setItem("role", role);
        const expiryTime = Date.now() + 3600 * 1000; // 1 hour
        localStorage.setItem("token_expiry", expiryTime);
        // Update context
        setUser(data.user);
        setRole(role);
        setStatus("✅ Login successful!");
        navigate("/shop");
      } else {
        const errorMsg = data.message || "Invalid email or password";
        setStatus(`❌ Login failed: ${errorMsg}`);
      }
    } catch (err) {
      setStatus(`🚨 Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-[#C1A85E]">
      <form onSubmit={handleSubmit} className="bg-[#1A1F3A] p-8 rounded shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded text-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded text-black"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#C1A85E] text-black font-bold py-2 rounded hover:bg-yellow-500"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Or{" "}
          <Link to="/register" className="text-yellow-400 font-bold hover:underline">
            Register
          </Link>
        </p>

        {status && <p className="mt-4 text-sm text-center">{status}</p>}
      </form>
    </div>
  );
}