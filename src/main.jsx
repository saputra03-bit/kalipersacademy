// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import FormulirKaryawan from "./pages/FormulirKaryawan";
import PrivateRoute from "./components/PrivateRoute";
import "./assets/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRole="admin">
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/formulir"
        element={
          <PrivateRoute allowedRole="karyawan">
            <FormulirKaryawan />
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
);
