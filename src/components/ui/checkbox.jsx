// src/components/ui/checkbox.jsx
import React from "react";

export function Checkbox({ checked, onCheckedChange, name }) {
  return (
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className="w-4 h-4"
    />
  );
}
