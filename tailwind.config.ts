import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(0 0% 8%)',
        primary: 'hsl(217 100% 49%)',
        'primary-foreground': 'hsl(0 0% 100%)',
        secondary: 'hsl(0 0% 96%)',
        'secondary-foreground': 'hsl(0 0% 8%)',
        accent: 'hsl(217 100% 49%)',
        'accent-foreground': 'hsl(0 0% 100%)',
        muted: 'hsl(0 0% 94%)',
        'muted-foreground': 'hsl(0 0% 40%)',
        border: 'hsl(0 0% 90%)',
        ring: 'hsl(217 100% 49%)',
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.375rem',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
    },
  },
  plugins: [
    require('tailwindcss/plugin')(({ addUtilities }) => {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      })
    }),
  ],
}

export default config
