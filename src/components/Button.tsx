import React from "react";

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <button
      className="px-4 py-1 rounded border border-blue-500 text-blue-500 hover:bg-blue-200"
      {...props}
    />
  );
};
