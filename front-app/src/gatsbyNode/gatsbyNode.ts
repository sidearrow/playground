import path from 'path';
import { GatsbyNode } from 'gatsby';
import { ApiClient } from './api/apiClient';
import { PagePropsCompany } from './pagePropsTypes';

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
};
