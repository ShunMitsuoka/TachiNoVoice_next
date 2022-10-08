module.exports = {
  mode: 'jit',
  content: [   
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'main': ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      colors: {
        main : '#FEF8F1',
        sub : '#A26749',
        red : '#E9C3CE',
        green : '#DFE7C0',
        orange : '#EFB795',
        host : '#E9C3CE',
        village : '#A0D2ED',
        core : '#DFE7C0',
        rise : '#EFB795',
        p : {
          sub : '#F0E5DF'
        }
      }
    },
  },
  plugins: [],
}
