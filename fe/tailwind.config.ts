import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '48px',
      },
      colors: {
        arctic: {
          blue: {
            '600': '#253BFF',
          },
        },
        lime: {
          green: {
            '400': '#9FF443',
          },
        },
        blue: {
          gray: {
            '0': '#FFFFFF',
            '50': '#F9FAFB',
            '200': '#EAECF0',
            '300': '#D0D5DD',
            '400': '#98A2B3',
            '500': '#667085',
            '800': '#1D2939',
            '900': '#101828',
          },
        },
      },
      fontSize: {
        sm: ['0.875rem', '0.875rem'],
        'display-md': ['2rem', '2.5rem'],
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
};
export default config;

