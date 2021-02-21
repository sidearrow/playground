import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export const TopBar: React.FC = ({ children }) => {
  return (
    <div className="flex justify-between items-center bg-gray-300 px-2 py-2">
      <Link href="/">
        <a className="flex-1 text-2xl">
          <FontAwesomeIcon icon={faHome} />
        </a>
      </Link>
      <span className="flex-1 text-right">{children}</span>
    </div>
  );
};
