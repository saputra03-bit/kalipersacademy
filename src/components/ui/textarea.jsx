import React from "react";

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
      {...props}
    />
  );
}