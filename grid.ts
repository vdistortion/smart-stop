import grid from 'smart-grid';

grid('./src', {
  mobileFirst: false,
  filename: '_grid',
  outputStyle: 'scss',
  columns: 24,
  offset: '2%',
  container: {
    maxWidth: '990px',
    fields: '45px' /* side fields */,
  },
  breakPoints: {},
});
