import React, { useEffect, useState } from 'react';
import { ApiClient } from 'api/apiClient';
import { useParams } from 'react-router-dom';
import { Item } from 'components/Item';

export const CompanyDetailPage: React.FC = () => {
  const apiClient = new ApiClient();

  const companyId = Number(useParams<{ companyId: string }>().companyId);

  const [isNowLoading, setIsNowLoading] = useState<boolean>(true);
  const [companyCode, setCompanyCode] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [companyNameAlias, setCompanyNameAlias] = useState<string>('');

  const loadCompany = async (): Promise<void> => {
    const company = await apiClient.getCompany(companyId);
    setCompanyCode(company.companyCode);
    setCompanyName(company.companyName);
    setCompanyNameAlias(company.companyNameAlias);
  };

  const saveCompanyCode = async (): Promise<void> => {
    await apiClient.patchCompany(companyId, { companyCode: companyCode });
    await loadCompany();
  };
  const saveCompanyName = async (): Promise<void> => {
    await apiClient.patchCompany(companyId, { companyName: companyName });
    await loadCompany();
  };
  const saveCompanyNameAlias = async (): Promise<void> => {
    await apiClient.patchCompany(companyId, {
      companyNameAlias: companyNameAlias,
    });
    await loadCompany();
  };

  useEffect(() => {
    (async () => {
      await loadCompany();
      setIsNowLoading(false);
    })();
  }, []);

  if (isNowLoading) {
    return <div>Now Loading ...</div>;
  }

  return (
    <>
      <h1>事業者詳細画面</h1>
      <section>
        <Item
          label="事業者コード"
          value={companyCode}
          setValue={setCompanyCode}
          saveAction={saveCompanyCode}
        />
        <Item
          label="事業者名"
          value={companyName}
          setValue={setCompanyName}
          saveAction={saveCompanyName}
        />
        <Item
          label="事業者名 略称"
          value={companyNameAlias}
          setValue={setCompanyNameAlias}
          saveAction={saveCompanyNameAlias}
        />
      </section>
    </>
  );
};
