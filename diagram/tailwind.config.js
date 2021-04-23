module.exports = {
  purge: ['./src/**/*.tsx', './public/index.html'],
  theme: {
    extend: {
             //borderCollapse: ['hover', 'focus'],
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
  ],
}