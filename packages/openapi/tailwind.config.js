import { createPreset } from '@maximai/fumadocs-ui/tailwind-plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/ui/**/*.{ts,tsx}'],
  presets: [createPreset()],
};
