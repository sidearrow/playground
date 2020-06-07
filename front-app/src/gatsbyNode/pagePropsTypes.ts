import {
  ApiResponseCompanyAll,
  CompanyEntity,
  LinesEntitiy,
  ApiResponseLine,
} from '../entities';

export type PagePropsCompany = {
  companies: ApiResponseCompanyAll;
};

export type PagePropsCompanyDetail = {
  company: CompanyEntity;
  lines: LinesEntitiy;
};

export type PagePropsLineDetail = {
  line: ApiResponseLine;
};
