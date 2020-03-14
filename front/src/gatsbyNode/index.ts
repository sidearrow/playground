import axios from 'axios';
import { GatsbyNode } from 'gatsby';
import path from 'path';
import { ApiResponceType } from '../ApiResponceType';

export const createPages: GatsbyNode['createPages'] = async ({
  actions: { createPage }
}) => {
  const companiesData: { data: ApiResponceType.Company[] } = await axios.get('http://localhost:5000/company');

  createPage({
    path: 'company',
    component: path.resolve('src/templates/Company.tsx'),
    context: {
      'companies': companiesData.data,
    },
  });

  for (const company of companiesData.data) {
    try {
      const companyDetailData: { data: ApiResponceType.Line } = await axios.get(`http://localhost:5000/company/${company.companyCode}`);
      createPage({
        path: `company/${company.companyCode}`,
        component: path.resolve('src/templates/CompanyDetail.tsx'),
        context: { 'company': companyDetailData.data }
      });
    } catch { }
  }
}
