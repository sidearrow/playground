import React, { useState, useEffect } from 'react';
import { CompanyEntity } from 'entity';
import { ApiClient } from 'api/apiClient';
import { Link } from 'react-router-dom';

const CompanyList: React.FC = () => {
  const apiClient = new ApiClient();

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
          <Link to={`/company/${company.companyId}/basic-info`}>
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
