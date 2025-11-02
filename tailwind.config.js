/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./main.js",
    "./docs/**/*.md"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pine: {
          DEFAULT: '#2E7D32',
          light: '#A5D6A7',
          dark: '#1B5E20',
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            code: {
              fontWeight: '500',
              backgroundColor: theme('colors.gray.100'),
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
            }
          }
        },
        invert: {
          css: {
            code: {
              backgroundColor: theme('colors.gray.800'),
            }
          }
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
