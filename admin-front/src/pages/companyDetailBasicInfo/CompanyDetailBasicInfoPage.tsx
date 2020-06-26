import React, { useState, useEffect } from 'react';
import { ApiResponseCompany } from 'api/apiResponse';
import { ApiClient } from 'api/apiClient';
import { useParams } from 'react-router-dom';
import { ItemCompanyName } from './components/ItemCompanyName';
import { ItemCompanyNameAlias } from './components/ItemCompanyNameAlias';
import { ItemRailwayTypes } from './components/ItemRailwayTypes';
import { FormControl, TextField, Grid, Button } from '@material-ui/core';

const Core: React.FC<{
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
  /*
  const [railwayTypes, setRailwayTypes] = useState<string[]>(
    company.railwayTypes.map((v) => String(v.railwayTypeId))
  );
  */

  const saveActionCompanyCode = (): void => {
    save.companyCode(companyCode);
  };
  const saveActionCompanyName = (): void => {
    save.companyName(companyName);
  };
  const saveActionCompanyNameAlias = (): void => {
    save.companyNameAlias(companyNameAlias);
  };
  const saveActionRailwayTypes = (): void => {
    //console.log(railwayTypes);
  };

  return (
    <div>
      <FormControl fullWidth>
        <TextField
          label="事業者コード"
          value={companyCode}
          onChange={(e): void => {
            setCompanyCode(e.target.value);
          }}
        />
      </FormControl>
      <ItemCompanyName
        value={companyName}
        setValue={setCompanyName}
        saveAction={saveActionCompanyName}
        cancelAction={(): void => {
          setCompanyName(company.companyName);
        }}
      />
      <ItemCompanyNameAlias
        value={companyNameAlias}
        setValue={setCompanyNameAlias}
        saveAction={saveActionCompanyNameAlias}
        cancelAction={(): void => {
          setCompanyNameAlias(company.companyNameAlias);
        }}
      />
      <Grid container justify="center">
        <Grid item sm={6} xs={12}>
          <Button color="primary" variant="contained" fullWidth>
            保存
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export const CompanyDetailBasicInfoPage: React.FC = () => {
  const apiClient = new ApiClient();
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
      await apiClient.patchCompany(companyId, { companyCode: companyCode });
      await loadCompany();
    })();
  };
  const saveCompanyName = (companyName: string): void => {
    (async (): Promise<void> => {
      await apiClient.patchCompany(companyId, { companyName: companyName });
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

  if (company === null) {
    return <>NOW LOADING ...</>;
  }
  return (
    <Core
      company={company}
      save={{
        companyCode: saveCompanyCode,
        companyName: saveCompanyName,
        companyNameAlias: saveCompanyNameAlias,
      }}
    />
  );
};
