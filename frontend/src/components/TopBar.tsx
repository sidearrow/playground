import React from "react";
import Link from "next/link";

export const TopBar: React.FC = ({ children }) => {
  return (
    <div className="flex justify-between bg-gray-300 px-2 py-2">
      <Link href="/">まとめたね</Link>
      <span>{children}</span>
    </div>
  );
};
