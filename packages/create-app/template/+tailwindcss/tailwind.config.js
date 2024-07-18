import { createPreset } from '@maximai/fumadocs-ui/tailwind-plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './mdx-components.{ts,tsx}',
    './node_modules/@maximai/fumadocs-ui/dist/**/*.js',
  ],
  presets: [createPreset()],
};
