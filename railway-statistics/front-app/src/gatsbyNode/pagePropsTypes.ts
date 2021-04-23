import {
  ApiResponseCompanies,
  CompanyEntity,
  LinesEntity,
  ApiResponseLine,
} from '../entities';

export type PagePropsCompany = {
  companies: ApiResponseCompanies;
};

export type PagePropsCompanyDetail = {
  company: CompanyEntity;
  lines: LinesEntity;
};

export type PagePropsLineDetail = {
  line: ApiResponseLine;
};
