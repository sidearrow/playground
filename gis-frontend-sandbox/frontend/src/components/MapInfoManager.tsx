import React, { useState } from 'react';

export const MapInfoManager: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleBtnText = isOpen ? 'CLOSE' : 'OPEN';

  const widthClass = isOpen ? 'w-full md:w-1/4' : '';

  const handleClickToggleBtn = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-end">
      <div className={`bg-transparent z-10 right-0 ${widthClass}`}>
        <div
          className="bg-white mt-1 mx-1 p-2 border border-gray-500 rounded"
          style={{ opacity: 0.9 }}
        >
          <div className="text-right">
            <button onClick={handleClickToggleBtn}>{toggleBtnText}</button>
          </div>
          {isOpen && <div>{children}</div>}
        </div>
      </div>
    </div>
  );
};
