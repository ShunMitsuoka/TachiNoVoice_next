module.exports = {
  mode: 'jit',
  purge: [   
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'main': ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      colors: {
        main : '#FEF8F1',
        sub : '#A26749',
        p : {
          sub : '#F0E5DF'
        }
      }
    },
  },
  plugins: [],
}
