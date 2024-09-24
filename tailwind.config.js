/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-1': '#EF5AFF',
        'bg-2': '#4EBEFF',
      },
      keyframes: {
        'scale-up': {
          '0%': { transform: 'scale(0.5)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'scale-up': 'scale-up 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}