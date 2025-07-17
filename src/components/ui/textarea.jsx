// src/components/ui/textarea.jsx
import React from "react";

export function Textarea(props) {
  return (
    <textarea
      {...props}
      className={`border rounded-md p-2 w-full ${props.className || ""}`}
    />
  );
}
