module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'mono': ['Fira Code', 'IBM Plex Mono', 'Consolas'],
      'sans': ['Inter', 'Arial', 'Helvetica']
    },
    extend: {
      colors: {
        'background': '#090909',
        'han-purple': '#6320ee',
        'medium-blue': '#8075ff',
        'ash-gray': '#cad5ca'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
