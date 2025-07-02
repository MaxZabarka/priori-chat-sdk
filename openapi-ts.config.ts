import { defineConfig, defaultPlugins } from '@hey-api/openapi-ts';

export default defineConfig({
  input: {
    path: './openapi/v1.yaml',
    validate_EXPERIMENTAL: true,
  },
  output: {
    path: 'src/client',
    format: 'prettier',
    lint: 'eslint',
  },
  plugins: [
    ...defaultPlugins,
    { name: '@hey-api/client-axios', throwOnError: true },
    { name: 'zod', exportFromIndex: true }
  ],
});
