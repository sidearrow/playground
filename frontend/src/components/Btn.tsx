import React from 'react';

export const Btn: React.FC<{
  isActive: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ isActive, children, onClick }) => {
  const className = isActive
    ? 'bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded'
    : 'bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-1 px-2 rounded border border-blue-500';

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};
