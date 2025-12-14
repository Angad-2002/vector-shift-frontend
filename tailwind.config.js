/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          hover: '#818cf8',
        },
        background: {
          dark: '#020617',
          card: 'rgba(2, 6, 23, 0.95)',
        },
        border: {
          DEFAULT: 'rgba(99, 102, 241, 0.25)',
          glow: 'rgba(99, 102, 241, 0.15)',
        },
        text: {
          primary: '#c7d2fe',
          secondary: '#94a3b8',
          muted: '#64748b',
        },
        dark: {
          100: '#334155',
          200: '#1e293b',
          300: '#0f172a',
          400: '#0d1425',
          500: '#0a0f1f',
          700: '#06080f',
          800: '#020510',
        },
        light: {
          50: '#f8fafc',
          900: '#e2e8f0',
        },
        teal: {
          500: '#14b8a6',
          600: '#0d9488',
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-lg': '0 0 30px rgba(99, 102, 241, 0.4)',
        'node': '0 0 0 1px rgba(99, 102, 241, 0.15), 0 20px 40px rgba(0, 0, 0, 0.6)',
        'node-hover': '0 0 0 1px rgba(99, 102, 241, 0.25), 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(99, 102, 241, 0.2)',
        'node-selected': '0 0 0 1px rgba(99, 102, 241, 0.3), 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(99, 102, 241, 0.4)',
      },
      backdropBlur: {
        5: '5px',
      },
      backdropSaturate: {
        80: '.8',
      },
    },
  },
  plugins: [],
}

