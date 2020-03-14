import { GatsbyNode } from 'gatsby';
import path from 'path';

const TEPLATES_DIR = path.join(__dirname, '../templates');

export const createPages: GatsbyNode['createPages'] = async({
  actions: { createPage }
}) => {
  createPage({
    path: 'companies',
    component: path.join(TEPLATES_DIR, 'companies.tsx'),
    context: {},
  });
}
