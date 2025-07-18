// src/routes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Formulir from "./pages/Formulir";
import AdminDashboard from "./pages/AdminDashboard";

const RoutesComponent = () => {
  const userRole = localStorage.getItem("role");

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {userRole === "admin" && <Route path="/admin" element={<AdminDashboard />} />}
      {userRole === "karyawan" && <Route path="/formulir" element={<Formulir />} />}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesComponent;
