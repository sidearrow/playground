import path from 'path';
import { GatsbyNode } from 'gatsby';
import { ApiClient } from './api/apiClient';
import {
  PagePropsCompany,
  PagePropsCompanyDetail,
  PagePropsLineDetail,
} from './pagePropsTypes';

const getTemplatePath = (templateName: string) =>
  path.resolve(`src/templates/${templateName}.tsx`);

export const createPages: GatsbyNode['createPages'] = async ({
  actions: { createPage },
}) => {
  const apiClient = new ApiClient();

  const companies = await apiClient.getCompanyAll();

  createPage<PagePropsCompany>({
    path: 'company',
    component: getTemplatePath('companyTemplate'),
    context: {
      companies: companies,
    },
  });

  companies.map(async (company) => {
    const lines = await apiClient.getCompanyLine(company.companyId);

    createPage<PagePropsCompanyDetail>({
      path: `/company/${company.companyCode}`,
      component: getTemplatePath('companyDetailTemplate'),
      context: {
        company: company,
        lines: lines,
      },
    });
  });

  const lines = await apiClient.getLineAll();

  lines.map(async (l) => {
    const line = await apiClient.getLineOne(l.lineId);

    createPage<PagePropsLineDetail>({
      path: `/company/${line.company.companyCode}/line/${line.lineCode}`,
      component: getTemplatePath('lineDetailTemplate'),
      context: {
        line: line,
      },
    });
  });
};
