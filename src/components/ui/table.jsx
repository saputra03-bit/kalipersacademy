// src/components/ui/table.jsx
import React from "react";

export function Table({ children }) {
  return <table className="w-full border">{children}</table>;
}

export function TableHeader({ children }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function TableRow({ children }) {
  return <tr className="border-t">{children}</tr>;
}

export function TableCell({ children }) {
  return <td className="p-2 border">{children}</td>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}
