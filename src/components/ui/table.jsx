import React from "react";

export function Table({ children }) {
  return <table className="w-full border text-sm">{children}</table>;
}

export function TableHeader({ children }) {
  return <thead className="bg-green-100">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children, className = "" }) {
  return <tr className={className}>{children}</tr>;
}

export function TableCell({ children, className = "" }) {
  return <td className={`p-2 border text-center ${className}`}>{children}</td>;
}