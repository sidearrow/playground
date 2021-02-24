import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import categories from "../content/categories.json";

export const TopBar: React.FC = () => {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const toggleMenuShow = () => {
    setIsMenuShow(!isMenuShow);
  };

  return (
    <React.Fragment>
      <div className="flex justify-between items-center bg-white py-2">
        <Link href="/">
          <a className="flex-1 text-2xl">
            <FontAwesomeIcon icon={faHome} />
          </a>
        </Link>
        <span className="flex-1 text-right">
          <button className="text-2xl px-2 py-1" onClick={toggleMenuShow}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </span>
      </div>
      <div className={`bg-white py-2 ${isMenuShow ? "" : "hidden"}`}>
        {categories.map((v, i) => (
          <Link href={`/_/${v.categoryId}`}>
            <a className="pr-4">{v.categoryName}</a>
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
};
