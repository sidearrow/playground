import React from 'react';
import { Link } from 'gatsby';

export const CmpBreadcrumb: React.FC<{
  items: { text: string; path: string | null }[];
}> = ({ items }) => (
  <nav>
    <ol className="breadcrumb bg-transparent">
      {items.map((item, i) => {
        if (item.path === null) {
          return (
            <li className="breadcrumb-item active" key={i}>
              <a href="#">{item.text}</a>
            </li>
          );
        }
        return (
          <li className="breadcrumb-item" key={i}>
            <Link to={item.path}>{item.text}</Link>
          </li>
        );
      })}
    </ol>
  </nav>
);
