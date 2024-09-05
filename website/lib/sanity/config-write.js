import { createClient } from '@sanity/client';

const options = {
  dataset: 'production',
  projectId: process.env.SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN_WRITE,
  apiVersion: '2023-05-03',
};

export default createClient(options);

export const previewClient = createClient({
  ...options,
});
