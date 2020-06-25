import React, { useState, useEffect } from 'react';
import { constant } from 'constant';
import { FormCheckGroup } from 'components/Form/FormCheckGroup';
import { Item, ItemView, ItemEdit } from 'components/Item/Item';
import { ApiResponseCompany } from 'api/apiResponse';
import { FormInput } from 'components/Form/FormInput';

export const BasicInfoTabContent: React.FC<{
  company: ApiResponseCompany;
  save: {
    companyCode: (companyCode: string) => void;
    companyName: (companyName: string) => void;
    companyNameAlias: (companyNameAlias: string) => void;
  };
}> = ({ company, save }) => {
  const [companyCode, setCompanyCode] = useState<string>(company.companyCode);
  const [companyName, setCompanyName] = useState<string>(company.companyName);
  const [companyNameAlias, setCompanyNameAlias] = useState<string>(
    company.companyNameAlias
  );
  const [railwayTypes, setRailwayTypes] = useState<string[]>(
    company.railwayTypes.map((v) => String(v.railwayTypeId))
  );

  const saveActionCompanyCode = (): void => {
    save.companyCode(companyCode);
  };
  const cancelActionCompanyCode = (): void => {
    setCompanyCode(company.companyCode);
  };
  const saveActionCompanyName = (): void => {
    save.companyName(companyName);
  };
  const cancelActionCompanyName = (): void => {
    setCompanyName(company.companyName);
  };
  const saveActionCompanyNameAlias = (): void => {
    save.companyNameAlias(companyNameAlias);
  };
  const cancelActionCompanyNameAlias = (): void => {
    setCompanyNameAlias(company.companyNameAlias);
  };
  const saveActionRailwayTypes = (): void => {
    console.log(railwayTypes);
  };
  const cancelActionRailwayTypes = (): void => {
    setRailwayTypes(company.railwayTypes.map((v) => String(v.railwayTypeId)));
  };

  return (
    <div>
      <Item
        label="事業者コード"
        saveAction={saveActionCompanyCode}
        cancelAction={cancelActionCompanyCode}
      >
        <ItemView>{companyCode}</ItemView>
        <ItemEdit>
          <FormInput
            value={companyCode}
            onChange={(e): void => {
              setCompanyCode(e.target.value);
            }}
          />
        </ItemEdit>
      </Item>
      <Item
        label="事業者名"
        saveAction={saveActionCompanyName}
        cancelAction={cancelActionCompanyName}
      >
        <ItemView>{companyName}</ItemView>
        <ItemEdit>
          <FormInput
            value={companyName}
            onChange={(e): void => {
              setCompanyName(e.target.value);
            }}
          />
        </ItemEdit>
      </Item>
      <Item
        label="事業者名 略称"
        saveAction={saveActionCompanyNameAlias}
        cancelAction={cancelActionCompanyNameAlias}
      >
        <ItemView>{companyNameAlias}</ItemView>
        <ItemEdit>
          <FormInput
            value={companyNameAlias}
            onChange={(e): void => {
              setCompanyNameAlias(e.target.value);
            }}
          />
        </ItemEdit>
      </Item>
      <Item
        label="鉄道タイプ"
        saveAction={saveActionRailwayTypes}
        cancelAction={cancelActionRailwayTypes}
      >
        <ItemView>
          {company?.railwayTypes.map((v, i) => (
            <span key={i}>{v.railwayTypeName}</span>
          ))}
        </ItemView>
        <ItemEdit>
          <FormCheckGroup
            items={constant.selectItems.railwayType}
            idPrefix="railwayType"
            values={railwayTypes}
            changeAction={(v): void => {
              setRailwayTypes(v);
            }}
          />
        </ItemEdit>
      </Item>
    </div>
  );
};
