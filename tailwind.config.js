module.exports = {
  mode: 'jit',
  purge: [   
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        main : '#FEF8F1',
        sub : '#A26749',
      }
    },
  },
  plugins: [],
}
