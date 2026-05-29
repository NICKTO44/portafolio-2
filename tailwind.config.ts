import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core palette
        black:    '#0A0A0A',
        carbon: {
          DEFAULT: '#1A1A1A',
          '2':     '#242424',
          '3':     '#2E2E2E',
        },
        beige: {
          DEFAULT: '#D4C5A9',
          '2':     '#C4B394',
          '3':     '#E8DDD0',
        },
        cream:    '#F5F2EE',
        gold:     '#B8975A',
        muted:    '#6B6B6B',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans:  ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem', letterSpacing: '0.1em' }],
        xs:    ['0.75rem',  { lineHeight: '1rem' }],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
      transitionTimingFunction: {
        'expo-out':    'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'spring':      'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
      },
      animation: {
        'fade-up':      'fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':      'fadeIn 0.6s ease forwards',
        'scroll-line':  'scrollLine 2s ease-in-out infinite',
        'dock-bounce':  'dockBounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        scrollLine: {
          '0%, 100%': { transform: 'scaleY(1)', opacity: '1' },
          '50%':      { transform: 'scaleY(0.4)', opacity: '0.3' },
        },
        dockBounce: {
          from: { transform: 'translateY(-12px) scale(1.25)' },
          to:   { transform: 'translateY(0) scale(1)' },
        },
      },
      backdropBlur: {
        xs: '4px',
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
      },
      borderRadius: {
        'sm2': '2px',
      },
      maxWidth: {
        '8xl':  '88rem',
        '9xl':  '96rem',
        '10xl': '104rem',
      },
      screens: {
        'xs': '375px',
        '3xl': '1920px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
}

export default config
