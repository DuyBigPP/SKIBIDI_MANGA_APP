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
        // Enhanced Dark theme - Gaming/Entertainment focused
        background: '#0A0A0F',      // Deeper black for OLED
        foreground: '#F1F5F9',       // Brighter white for contrast
        card: {
          DEFAULT: '#12121A',        // Dark card background
          foreground: '#F1F5F9',
        },
        popover: {
          DEFAULT: '#12121A',
          foreground: '#F1F5F9',
        },
        primary: {
          DEFAULT: '#A855F7',        // Vibrant purple
          foreground: '#FAFAFA',
          light: '#C084FC',          // Light purple for hover
          dark: '#7C3AED',           // Dark purple
        },
        secondary: {
          DEFAULT: '#6366F1',        // Indigo
          foreground: '#FAFAFA',
        },
        muted: {
          DEFAULT: '#1A1A24',        // Slightly lighter than background
          foreground: '#A1A1AA',     // Better muted text
        },
        accent: {
          DEFAULT: '#F472B6',        // Pink accent for highlights
          foreground: '#FAFAFA',
          purple: '#C084FC',
          blue: '#60A5FA',
        },
        destructive: {
          DEFAULT: '#F43F5E',        // Rose red
          foreground: '#FAFAFA',
        },
        success: {
          DEFAULT: '#22C55E',        // Bright green
          foreground: '#FAFAFA',
        },
        warning: {
          DEFAULT: '#F59E0B',        // Amber
          foreground: '#FAFAFA',
        },
        border: '#27272A',           // Subtle border
        input: '#27272A',
        ring: '#A855F7',
        // Gradient stops
        gradient: {
          start: '#A855F7',
          middle: '#6366F1',
          end: '#3B82F6',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.25rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(168, 85, 247, 0.3)',
        'glow-lg': '0 0 40px rgba(168, 85, 247, 0.4)',
      },
    },
  },
  plugins: [],
};
