import 'reflect-metadata';
import path from 'path';
import { GatsbyNode } from 'gatsby';
import { getConnection } from './database-connection';
import { Company } from './database-entities/company.entity';

export const createPages: GatsbyNode['createPages'] = async ({
  actions: { createPage },
  graphql,
}) => {
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
      createPage({
        path: node.frontmatter.path,
        component: path.resolve('src/templates/Markdown.tsx'),
        context: {},
      });
    });
  })();

  const connection = await getConnection();
  const companyData = await connection
    .getRepository(Company)
    .find({ relations: ['lines'] });

  console.log(companyData);

  /*
  createPage({
    path: 'company',
    component: path.resolve('src/templates/Company.tsx'),
    context: {
      companies: companiesData.data,
    },
  });
  */

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
