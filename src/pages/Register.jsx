import React, { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus("Registering...");

    try {
      const response = await fetch("https://mbabane-defrdwe3dkekfkdp.southafricanorth-01.azurewebsites.net/api/account/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword: password // required by backend
        })
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(text);
      }

      if (response.ok) {
        setStatus("✅ Registration successful!");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        const errorMsg =
          data.errors?.email?.[0] ||
          data.errors?.password?.[0] ||
          data.errors?.confirmPassword?.[0] ||
          Object.values(data.errors || {})[0]?.[0] ||
          data.message ||
          "Unknown error";
        setStatus(`❌ Registration failed: ${errorMsg}`);
      }
    } catch (err) {
      setStatus(`🚨 Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-[#C1A85E] p-4">
      <div className="bg-[#1A1F3A] p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 rounded bg-black text-[#C1A85E] border border-[#C1A85E]"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 rounded bg-black text-[#C1A85E] border border-[#C1A85E]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 rounded bg-black text-[#C1A85E] border border-[#C1A85E]"
            required
          />
          <button
            type="submit"
            className="bg-[#C1A85E] text-black font-bold py-2 px-4 rounded hover:bg-yellow-500"
          >
            Register
          </button>
        </form>
        {status && <p className="mt-4 text-sm text-center">{status}</p>}
      </div>
    </div>
  );
}