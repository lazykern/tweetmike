module.exports = {
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  bracketSpacing: false,
  trailingComma: 'es5',
  arrowParens: 'avoid',
  importOrder: [
    '^@mui/(.*)$',
    '^@components/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require('prettier-plugin-sort-class-names')],
};
