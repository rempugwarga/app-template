import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig, loadEnv } from '@rsbuild/core';

const { publicVars } = loadEnv({ prefixes: ['PUBLIC_'] });

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: './src/main.tsx',
    },
    define: publicVars,
  },
  html: {
    title: 'My App — rempugwarga',
  },
});
