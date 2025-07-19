import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import FormulirKaryawan from "./pages/FormulirKaryawan";
import AdminDashboard from "./pages/AdminDashboard";
import KaryawanDashboard from "./pages/KaryawanDashboard";

const getRole = () => localStorage.getItem("role");
const isLoggedIn = () => !!localStorage.getItem("token");

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Karyawan Pages */}
        <Route
          path="/karyawan/formulir"
          element={
            isLoggedIn() && getRole() === "karyawan" ? (
              <FormulirKaryawan />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/karyawan/dashboard"
          element={
            isLoggedIn() && getRole() === "karyawan" ? (
              <KaryawanDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Admin Pages */}
        <Route
          path="/admin/dashboard"
          element={
            isLoggedIn() && getRole() === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
