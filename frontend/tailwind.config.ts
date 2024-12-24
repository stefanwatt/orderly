import typography from '@tailwindcss/typography';
import catppuccin from '@catppuccin/tailwindcss'
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {}
  },

  plugins: [typography, catppuccin({
    prefix: "ctp",
    defaultFlavour: "mocha"
  }) ]
} satisfies Config;
