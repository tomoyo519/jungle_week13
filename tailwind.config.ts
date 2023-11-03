import type { Config } from 'tailwindcss'
import { join } from 'path'
const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',

    join(__dirname, './src/pages/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, './src/pages/*.{js,ts,jsx,tsx}'),
    join(__dirname, './src/components/**/*.{js,ts,jsx,tsx)'),
    join(__dirname, './src/app/*.{js,ts,jsx,tsx)'),
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
export default config
