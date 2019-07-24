module.exports = () => {

  $.gulp.task('serve', () => {
    $.sync.init({
      // tunnel: 'gulp4webpack',
      // open: 'tunnel',
      open: false,
      proxy: path.server.proxy
    });
  });

};
