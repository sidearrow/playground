import React from 'react';

export const SwitchBtn: React.FC<{
  isOn: boolean;
  lable: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ isOn, lable, onClick }) => {
  const className = isOn
    ? 'bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded'
    : 'bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-1 px-2 rounded border border-blue-500';
  const labelOnOff = isOn ? 'ON' : 'OFF';

  return (
    <button className={className} onClick={onClick}>
      <span className="mr-2">{lable}</span>
      <span>{labelOnOff}</span>
    </button>
  );
};
