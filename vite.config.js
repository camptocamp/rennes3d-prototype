/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import commonViteConfig from './commonViteConfig.js';

const configMain = defineConfig(async ({ mode }) => {
  const production = mode === 'production';
  const https = false;
  const port = production ? 4173 : 8080;
  let proxy = {};

  return {
    ...commonViteConfig,
    optimizeDeps: {
      exclude: [
        '@vcmap/core',
        'ol',
        '@vcsuite/ui-components',
      ],
      include: [
        '@vcmap/core > fast-deep-equal',
        '@vcmap/core > rbush-knn',
        '@vcmap/core > rbush-knn > tinyqueue',
        '@vcmap/core > pbf',
        'ol > pbf',
        '@vcmap/cesium',
      ],
    },
    server: {
      https,
      strictPort: true,
      port,
      proxy,
      watch: {
        ignored: ['!**/node_modules/@vcsuite/ui-components/**'],
      },
    },
  };
});

export default configMain;
