import typography from '@tailwindcss/typography';
import catppuccin from '@catppuccin/tailwindcss'
import ctp_daisyui from '@catppuccin/daisyui'
import daisyui from 'daisyui'
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {}
  },

  plugins: [
    typography,
    catppuccin({
      prefix: "ctp",
      defaultFlavour: "mocha"
    }),
    daisyui
  ],
  daisyui: {
    themes: [
      ctp_daisyui('mocha', {primary: 'peach', secondary: 'sky'})
    ]
  },
} satisfies Config;
