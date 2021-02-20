import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export const TopBar: React.FC = ({ children }) => {
  return (
    <div className="flex justify-between items-center bg-gray-300 px-2 py-2">
      <span className="flex-1">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </span>
      <span className="flex-1 text-right">{children}</span>
    </div>
  );
};
