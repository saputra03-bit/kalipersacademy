// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ allowedRole, children }) {
  const role = localStorage.getItem("userRole");
  return role === allowedRole ? children : <Navigate to="/" />;
}

export default PrivateRoute;
