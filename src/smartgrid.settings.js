var smartgrid = require('smart-grid');

var settings = {
  mobileFirst: false,
  filename: "_smartgrid.inc",
  outputStyle: 'styl',
  columns: 24,
  offset: '2%',
  container: {
    maxWidth: '990px',
    fields: '45px' /* side fields */
  },
  breakPoints: {},
  mixinNames: {
    size: "col-size",
    clearfix: "cf"
  },
  tab: "  "
};

smartgrid('./app-stylus', settings);
