import React, { useState, useEffect } from 'react';
import { ApiResponseCompany } from 'api/apiResponse';
import { ApiClient } from 'api/apiClient';
import { useParams } from 'react-router-dom';
import {
  FormControl,
  TextField,
  Grid,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from '@material-ui/core';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { constant } from 'constant';
import { CmpLineListPanel } from './components/CmpLineListPanel';

const apiClient = new ApiClient();

const Core: React.FC<{
  company: ApiResponseCompany;
  reloadCompany: () => void;
}> = ({ company, reloadCompany }) => {
  const [companyCode, setCompanyCode] = useState<string>(company.companyCode);
  const [companyName, setCompanyName] = useState<string>(company.companyName);
  const [companyNameAlias, setCompanyNameAlias] = useState<string>(
    company.companyNameAlias
  );
  const [companyNameKana, setCompanyNameKana] = useState<string>(
    company.companyNameKana
  );
  const [length, setLength] = useState<number>(company.length);
  const [lineNum, setLineNum] = useState<number>(company.lineNum);
  const [stationNum, setStationNum] = useState<number>(company.stationNum);

  const handleClickSaveBtn = () => {
    (async () => {
      await apiClient.updateCompany(company.companyId, {
        companyCode: companyCode,
        companyName: companyName,
        companyNameAlias: companyNameAlias,
        companyNameKana: companyNameKana,
        length: length,
        lineNum: lineNum,
        stationNum: stationNum,
      });
      reloadCompany();
    })();
  };

  return (
    <div>
      <FormControl fullWidth margin="normal">
        <FormLabel>事業者コード</FormLabel>
        <TextField
          value={companyCode}
          margin="normal"
          onChange={(e): void => {
            setCompanyCode(e.target.value);
          }}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <FormLabel>事業者名</FormLabel>
        <TextField
          value={companyName}
          margin="normal"
          onChange={(e): void => {
            setCompanyName(e.target.value);
          }}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <FormLabel>事業者名 略称</FormLabel>
        <TextField
          value={companyNameAlias}
          margin="normal"
          onChange={(e): void => {
            setCompanyNameAlias(e.target.value);
          }}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <FormLabel>事業者名 かな</FormLabel>
        <TextField
          value={companyNameKana}
          margin="normal"
          onChange={(e): void => {
            setCompanyNameKana(e.target.value);
          }}
        />
      </FormControl>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <FormLabel>総営業キロ</FormLabel>
            <TextField
              value={length}
              margin="normal"
              onChange={(e): void => {
                setLength(Number(e.target.value));
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <FormLabel>路線数</FormLabel>
            <TextField
              value={lineNum}
              margin="normal"
              onChange={(e): void => {
                setLineNum(Number(e.target.value));
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <FormLabel>駅数</FormLabel>
            <TextField
              value={stationNum}
              margin="normal"
              onChange={(e): void => {
                setStationNum(Number(e.target.value));
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
      <FormControl component="fieldset" margin="normal">
        <FormLabel>事業者タイプ</FormLabel>
        <RadioGroup>
          {constant.selectItems.companyType.map((v, i) => (
            <FormControlLabel
              key={i}
              value={v.value}
              label={v.label}
              control={<Radio />}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Grid container justify="center">
        <Grid item sm={6} xs={12}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleClickSaveBtn}
          >
            保存
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export const CompanyDetailBasicInfoPage: React.FC = () => {
  const companyId = Number(useParams<{ companyId: string }>().companyId);

  const [company, setCompany] = useState<ApiResponseCompany | null>(null);

  const loadCompany = async (): Promise<void> => {
    setCompany(await apiClient.getCompany(Number(companyId)));
  };

  useEffect(() => {
    (async (): Promise<void> => await loadCompany())();
  }, []);

  if (company === null) {
    return <></>;
  }
  return (
    <>
      <Box marginBottom={2}>
        <Breadcrumbs
          links={[
            { text: 'HOME', href: '/' },
            { text: '事業者一覧', href: '/company' },
            { text: company.companyNameAlias, href: null },
          ]}
        />
      </Box>
      <Box marginBottom={2}>
        <CmpLineListPanel lines={company.lines} />
      </Box>
      <Core
        company={company}
        reloadCompany={() => {
          loadCompany();
        }}
      />
    </>
  );
};
