/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx}', 
    './components/**/*.{js,ts,tsx}',
    './src/**/*.{js,ts,tsx}'
  ],
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Dark theme colors (purple/blue)
        background: '#0F172A',
        foreground: '#E2E8F0',
        card: {
          DEFAULT: '#1E293B',
          foreground: '#E2E8F0',
        },
        popover: {
          DEFAULT: '#1E293B',
          foreground: '#E2E8F0',
        },
        primary: {
          DEFAULT: '#8B5CF6',
          foreground: '#F8FAFC',
        },
        secondary: {
          DEFAULT: '#6366F1',
          foreground: '#F8FAFC',
        },
        muted: {
          DEFAULT: '#334155',
          foreground: '#94A3B8',
        },
        accent: {
          DEFAULT: '#818CF8',
          foreground: '#F8FAFC',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#F8FAFC',
        },
        border: '#475569',
        input: '#475569',
        ring: '#8B5CF6',
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [],
};
