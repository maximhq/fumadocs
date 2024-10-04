import { defineConfig } from 'tsup';
import { injectImport } from './build-config';

const exportedComponents = [
  'type-table',
  'image-zoom',
  'files',
  'tabs',
  'accordion',
  'steps',
  'inline-toc',
  'callout',
  'api',
  'card',
  'heading',
  'codeblock',
  'banner',
  'dialog/search',
  'dialog/search-default',
  'dialog/search-algolia',
  'layout/root-toggle',
  'layout/language-toggle',
];

const injectImports = [
  './src/page.tsx',
  './src/mdx.tsx',
  './src/layout.tsx',
  './src/home-layout.tsx',
  './src/components/api.tsx',
];

export default defineConfig({
  entry: [
    `./src/components/{${exportedComponents.join(',')}}.tsx`,
    './src/{i18n,home-layout,layout,page,provider,mdx,tailwind-plugin,og}.{ts,tsx}',
    './src/twoslash/popup.tsx',
    './src/**/*.client.tsx',
  ],
  external: ['server-only', '../../dist/image-zoom.css', 'tailwindcss'],
  async onSuccess() {
    const replaceImports = injectImports.map((src) => injectImport(src));

    await Promise.all(replaceImports);
  },
  format: 'esm',
  dts: true,
  target: 'esnext',
});
