import React from 'react'

const CmpBadge: React.FC<{ color: string | null }> = ({ color, children }) => (
  <span className="badge font-weight-normal text-white" style={{ background: color || '#6c757d' }}>{children}</span>
);

export default CmpBadge;
