// src/components/ui/label.jsx
import React from "react";

export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block font-medium mb-1">
      {children}
    </label>
  );
}
