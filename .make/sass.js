'use strict';


module.exports = function (nitro) {

  nitro.task('sass', function (target) {

    var dev = target === 'dev';

    nitro.dir('styles')
      .load('{,**/}*.{sass,scss}')
      .process('sass', {
        autoprefix: true,
        sourceComments: dev,
        outputStyle: dev ? 'nested' : 'compressed'
      })
      .write('public/css');

  });

});
