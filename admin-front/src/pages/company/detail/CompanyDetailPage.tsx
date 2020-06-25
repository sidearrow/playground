import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApiClient } from 'api/apiClient';
import { ApiResponseCompany } from 'api/apiResponse';
import { BasicInfoTabContent } from './BasicInfoTabContent';

const apiClient = new ApiClient();

const patchCompanyCode = async (
  companyId: number,
  companyCode: string
): Promise<void> => {
  await apiClient.patchCompany(companyId, { companyCode: companyCode });
};

const patchCompanyName = async (
  companyId: number,
  companyName: string
): Promise<void> => {
  await apiClient.patchCompany(companyId, { companyName: companyName });
};

export const CompanyDetailPage: React.FC = () => {
  const companyId = Number(useParams<{ companyId: string }>().companyId);

  const [company, setCompany] = useState<ApiResponseCompany | null>(null);

  const loadCompany = async (): Promise<void> => {
    setCompany(await apiClient.getCompany(Number(companyId)));
  };

  useEffect(() => {
    (async (): Promise<void> => await loadCompany())();
  }, []);

  const saveCompanyCode = (companyCode: string): void => {
    (async (): Promise<void> => {
      await patchCompanyCode(companyId, companyCode);
      await loadCompany();
    })();
  };
  const saveCompanyName = (companyName: string): void => {
    (async (): Promise<void> => {
      await patchCompanyName(companyId, companyName);
      await loadCompany();
    })();
  };
  const saveCompanyNameAlias = (companyNameAlias: string): void => {
    (async (): Promise<void> => {
      await apiClient.patchCompany(companyId, {
        companyNameAlias: companyNameAlias,
      });
      await loadCompany();
    })();
  };

  return (
    <>
      <h1>事業者詳細画面</h1>
      <section>
        {company === null && <span>NOW LOADING ...</span>}
        {company !== null && (
          <BasicInfoTabContent
            company={company}
            save={{
              companyCode: saveCompanyCode,
              companyName: saveCompanyName,
              companyNameAlias: saveCompanyNameAlias,
            }}
          />
        )}
      </section>
    </>
  );
};
