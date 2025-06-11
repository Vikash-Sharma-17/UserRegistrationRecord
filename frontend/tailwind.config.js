/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          900: '#312e81', // Example, adjust as needed
        },
        purple: {
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
        },
        slate: {
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Exo 2', 'Inter', 'sans-serif'],
      },
      animation: {
        flowGradient: 'flowGradient 20s ease infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', // Tailwind's default pulse
        'blink-caret': 'blink-caret 0.9s step-end infinite',
      },
      keyframes: {
        flowGradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'blink-caret': {
          'from, to': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
};