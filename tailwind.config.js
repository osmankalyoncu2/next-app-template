/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/navigation/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    darkMode: 'class',
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          50: 'rgba(var(--primary-color-50) / <alpha-value>)',
          100: 'rgba(var(--primary-color-100) / <alpha-value>)',
          200: 'rgba(var(--primary-color-200) / <alpha-value>)',
          300: 'rgba(var(--primary-color-300) / <alpha-value>)',
          400: 'rgba(var(--primary-color-400) / <alpha-value>)',
          500: 'rgba(var(--primary-color-500) / <alpha-value>)',
          600: 'rgba(var(--primary-color-600) / <alpha-value>)',
          700: 'rgba(var(--primary-color-700) / <alpha-value>)',
          800: 'rgba(var(--primary-color-800) / <alpha-value>)',
          900: 'rgba(var(--primary-color-900) / <alpha-value>)',
          950: 'rgba(var(--primary-color-950) / <alpha-value>)'
        },
        secondary: {
          50: 'rgba(var(--secondary-color-50) / <alpha-value>)',
          100: 'rgba(var(--secondary-color-100) / <alpha-value>)',
          200: 'rgba(var(--secondary-color-200) / <alpha-value>)',
          300: 'rgba(var(--secondary-color-300) / <alpha-value>)',
          400: 'rgba(var(--secondary-color-400) / <alpha-value>)',
          500: 'rgba(var(--secondary-color-500) / <alpha-value>)',
          600: 'rgba(var(--secondary-color-600) / <alpha-value>)',
          700: 'rgba(var(--secondary-color-700) / <alpha-value>)',
          800: 'rgba(var(--secondary-color-800) / <alpha-value>)',
          900: 'rgba(var(--secondary-color-900) / <alpha-value>)',
          950: 'rgba(var(--secondary-color-950) / <alpha-value>)'
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
