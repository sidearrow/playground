import React, { useState, useEffect } from 'react';
import { CompanyEntity } from 'entity';
import { apiClient } from 'api/apiClient';
import { Link } from 'react-router-dom';

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyEntity[]>([]);

  useEffect(() => {
    (async () => {
      setCompanies(await apiClient.getCompanies());
    })();
  }, []);

  return (
    <div className="row">
      {companies.map((company, i) => (
        <div key={i} className="col-md-4 col-6">
          <Link to={`/company/${company.companyId}`}>
            {company.companyNameAlias}
          </Link>
        </div>
      ))}
    </div>
  );
};

export const CompanyIndexPage: React.FC = () => (
  <div>
    <CompanyList />
  </div>
);
