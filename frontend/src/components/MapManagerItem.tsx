import React from 'react';

export const MapManagerItem: React.FC<{ title?: string }> = ({
  title,
  children,
}) => {
  return (
    <div className="flex justify-end">
      <div className="w-full md:w-1/2  bg-transparent z-10 right-0">
        <div
          className="bg-white mt-1 mx-1 p-2 border border-gray-500 rounded text-sm"
          style={{ opacity: 0.9 }}
        >
          {title !== undefined && (
            <div className="text-base border-b border-gray-500 pb-1 mb-2">
              {title}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
