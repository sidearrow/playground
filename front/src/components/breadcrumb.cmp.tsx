import React from 'react';
import Link from 'next/link';

const CmpBreadcrumb: React.FC<{ items: { name: string; path: string | null; }[] }> = ({ items }) => {
  return (
    <nav>
      <ol className="breadcrumb bg-transparent">
        {items.map(item => {
          if (item.path === null) {
            return (
              <li className="breadcrumb-item active">{item.name}</li>
            )
          }
          return (
            <li className="breadcrumb-item">
              <Link href={item.path}>{item.name}</Link>
            </li>
          )
        })}
      </ol>
    </nav>
  );
};

export default CmpBreadcrumb;
