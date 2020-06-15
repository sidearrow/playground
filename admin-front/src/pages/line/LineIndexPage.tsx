import React, { useState, useEffect } from 'react';
import { ApiClient } from 'api/apiClient';
import { Link } from 'react-router-dom';
import { ApiResponseLines } from 'api/apiResponse';

const LineList: React.FC = () => {
  const [lines, setLines] = useState<ApiResponseLines>([]);

  useEffect(() => {
    const apiClient = new ApiClient();
    (async () => {
      setLines(await apiClient.getLines());
    })();
  }, []);

  return (
    <div className="row">
      {lines.map((line, i) => (
        <div className="col-md-4 col-6" key={i}>
          <Link to={`/line/${line.lineId}`}>{line.lineNameAlias}</Link>
        </div>
      ))}
    </div>
  );
};

export const LineIndexPage: React.FC = () => (
  <div>
    <LineList />
  </div>
);
