import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/1-removebg-preview.png";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("userRole", "admin");
      navigate("/admin");
    } else if (username === "karyawan" && password === "karyawan123") {
      localStorage.setItem("userRole", "karyawan");
      navigate("/formulir");
    } else {
      alert("Username atau password salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Kalipers Logo" className="h-20" />
        </div>
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Login Kalipers Academy
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Masukkan username"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Masukkan password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          &copy; 2025 Kalipers Academy — Made by Risky Saputra
        </p>
      </div>
    </div>
  );
}

export default Login;
