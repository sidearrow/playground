import axios from 'axios';
import { GatsbyNode } from 'gatsby';
import path from 'path';
import { ApiResponceType } from '../ApiResponceType';

axios.defaults.baseURL = 'http://localhost:5000';

export const createPages: GatsbyNode['createPages'] = async ({
  actions: { createPage },
  graphql
}) => {
  (async () => {
    type AllMarkdown = {
      allMarkdownRemark: {
        edges: {
          node: {
            frontmatter: {
              path: string;
            }
          }
        }[]
      }
    };

    const allMarkdown: { data?: AllMarkdown } = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `);

    if (allMarkdown.data === undefined) {
      return;
    }

    allMarkdown.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: path.resolve('src/templates/Markdown.tsx'),
        context: {},
      });
    });
  })();

  const companiesData: { data: ApiResponceType.Company[] } = await axios.get('company');

  createPage({
    path: 'company',
    component: path.resolve('src/templates/Company.tsx'),
    context: {
      'companies': companiesData.data,
    },
  });
  createPage({
    path: 'eigyo-kilo',
    component: path.resolve('src/templates/EigyoKilo.tsx'),
    context: {
      'companies': companiesData.data,
    },
  });

  for (const company of companiesData.data) {
    try {
      const companyDetailData: { data: ApiResponceType.CompanyDetail } = await axios.get(`company/${company.companyCode}`);
      createPage({
        path: `company/${company.companyCode}`,
        component: path.resolve('src/templates/CompanyDetail.tsx'),
        context: { 'company': companyDetailData.data }
      });

      for (const line of companyDetailData.data.lines) {
        try {
          const lineDetailData: { data: ApiResponceType.LineDetail } = await axios.get(`line/${line.lineCode}`);
          createPage({
            path: `line/${line.lineCode}`,
            component: path.resolve('src/templates/LineDetail.tsx'),
            context: { 'lineDetail': lineDetailData.data }
          });
        } catch { }
      }
    } catch { }
  }
}
