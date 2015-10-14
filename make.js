#!/usr/bin/env node
'use strict';

require('nitro')(function (nitro) {

    nitro.task('build', ['clear:public', 'js', 'sass', 'templates']);

    nitro.task('build-dev', ['clear:public', 'js:dev', 'sass:dev', 'templates:dev']);

    function logTime () {
      console.log( new Date() );
    }

    nitro.task('dev', ['build-dev'], function () {
      nitro.watch('js', ['js:dev', 'templates:dev', logTime]);
      nitro.watch('styles', ['sass:dev', logTime]);
      nitro.watch('templates', ['templates:dev', logTime]);

      nitro.livereload('public');
    });

    nitro.task('live', ['dev'], function () {
      nitro.server({
        root: 'public',
        openInBrowser: true
      });
    });

  })
  .import('.make')
  .run();
