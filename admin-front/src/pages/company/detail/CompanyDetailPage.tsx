import React, { useEffect, useState } from 'react';
import { CompanyEntity } from 'entity';
import { ApiClient } from 'api/apiClient';
import { useParams } from 'react-router-dom';
import { Item } from 'components/Item';

export const CompanyDetailPage: React.FC = () => {
  const apiClient = new ApiClient();

  const companyId = Number(useParams<{ companyId: string }>().companyId);

  const [
    companyBasicData,
    setCompanyBasicData,
  ] = useState<CompanyEntity | null>(null);

  useEffect(() => {
    (async () => {
      setCompanyBasicData(await apiClient.getCompany(companyId));
    })();
  }, []);

  if (companyBasicData === null) {
    return <div>Now Loading ...</div>;
  }

  return (
    <>
      <h1>事業者詳細画面</h1>
      <section>
        <Item label="事業者コード" value={companyBasicData.companyCode} />
        <Item label="事業者名" value={companyBasicData.companyName} />
        <Item label="事業者名 略称" value={companyBasicData.companyNameAlias} />
      </section>
    </>
  );
};
