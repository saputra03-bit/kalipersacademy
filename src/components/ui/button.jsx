// src/components/ui/button.jsx
import React from "react";

export function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md ${className || ""}`}
    >
      {children}
    </button>
  );
}
