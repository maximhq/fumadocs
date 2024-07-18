import { createPreset } from '@maximai/fumadocs-ui/tailwind-plugin';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  presets: [createPreset()],
  content: [
    './node_modules/@maximai/fumadocs-ui/dist/**/*.js',

    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './content/**/*.mdx',
    './mdx-components.tsx',
  ],
};
