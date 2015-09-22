'use strict';


module.exports = function (nitro) {

  var canClear = ['dist'];

  nitro.task({
    clear: function (target) {
      if( canClear.indexOf(target) >= 0 ) {
        nitro.dir.remove(target);
      }
    },
    js: function (target) {
      nitro.dir('src/js').load('{,**/}*.js').process('uglify').write('dist/js');
    },
    sass: function (target) {
      nitro.dir('src/sass').load('{,**/}*.{sass,scss}').process('sass').write('dist/css');
    },
    html: function (target) {
      nitro.dir('src/html').copy('*.html', 'dist');
    }
  });

  nitro.task('build', ['clear:dist', 'js', 'sass', 'html']);

  nitro.task('watch', ['build'], function () {
    nitro.watch('src')
      .when('js/{,**/}*.*', 'js')
      .when('sass/{,**/}*.*', 'sass')
      .when('html/{,**/}*.*', 'html');

    nitro.require('livereload').createServer().watch(['dist']);
  });

  nitro.task('live', ['watch'], function () {
    nitro.serve({
      root: 'dist',
      openInBrowser: true
    });
  });

};
