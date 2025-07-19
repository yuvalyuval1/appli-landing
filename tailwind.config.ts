
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-blue-300': '#A9C8FF',
        'brand-lilac-300': '#CDB3FF',
        'brand-peach-300': '#FFB9A0',
        'brand-yellow-400': '#FFB700',
        'brand-gray-900': '#0A0A0A',
        'brand-gray-700': '#333333',
        'surface-card': '#F7F8FA',
        'surface-base': '#FFFFFF',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
