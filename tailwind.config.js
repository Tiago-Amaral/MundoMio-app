/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        historias: '#f2ebfb',
        games: '#e9f9ef',
        desenhos: '#fff3e7',
        conquistas: '#e7f4fd',
      },
    },
  },
  plugins: [],
};
