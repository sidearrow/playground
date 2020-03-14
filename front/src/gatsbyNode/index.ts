import axios from 'axios';
import { GatsbyNode } from 'gatsby';
import path from 'path';

const TEPLATES_DIR = path.join(__dirname, '../templates');

export const createPages: GatsbyNode['createPages'] = async ({
  actions: { createPage }
}) => {
  const companiesData = await axios.get('http://localhost:5000/company');

  createPage({
    path: 'companies',
    component: path.join(TEPLATES_DIR, 'companies.tsx'),
    context: {
      'companies': companiesData.data,
    },
  });
}
