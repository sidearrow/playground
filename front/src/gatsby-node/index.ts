import 'reflect-metadata';
import path from 'path';
import { GatsbyNode } from 'gatsby';
import { getDatabaseConnection } from '../database/database-connection';
import { lineCreatePage } from './create-page/line.create-page';
import {
  getAllLineId,
  lineDetailCreatePage,
} from './create-page/line-detail.create-page';

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const databaseConnection = await getDatabaseConnection();

  await lineCreatePage(databaseConnection, actions);

  const lineIdList = await getAllLineId(databaseConnection);
  for (const lineId of lineIdList) {
    await lineDetailCreatePage(databaseConnection, actions, lineId);
  }

  (async () => {
    type AllMarkdown = {
      allMarkdownRemark: {
        edges: {
          node: {
            frontmatter: {
              path: string;
            };
          };
        }[];
      };
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
      actions.createPage({
        path: node.frontmatter.path,
        component: path.resolve('src/templates/Markdown.tsx'),
        context: {},
      });
    });
  })();

  /*
  createPage({
    path: 'eigyo-kilo',
    component: path.resolve('src/templates/EigyoKilo.tsx'),
    context: {
      companies: companiesData.data,
    },
  });

  for (const company of companiesData.data) {
    try {
      const companyDetailData: {
        data: ApiResponceType.CompanyDetail;
      } = await axios.get(`company/${company.companyCode}`);
      createPage({
        path: `company/${company.companyCode}`,
        component: path.resolve('src/templates/CompanyDetail.tsx'),
        context: { company: companyDetailData.data },
      });

      for (const line of companyDetailData.data.lines) {
        try {
          const lineDetailData: {
            data: ApiResponceType.LineDetail;
          } = await axios.get(`line/${line.lineCode}`);
          createPage({
            path: `line/${line.lineCode}`,
            component: path.resolve('src/templates/LineDetail.tsx'),
            context: { lineDetail: lineDetailData.data },
          });
        } catch { }
      }
    } catch { }
  }
  */
};
