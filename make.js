#!/usr/bin/env node
'use strict';

require('nitro')(function (nitro) {

    nitro.task('build', ['clear:public', 'js', 'sass', 'templates']);

    nitro.task('build-dev', ['clear:public', 'js:dev', 'sass:dev', 'templates:dev']);

    nitro.task('dev', ['build-dev'], function () {
      nitro.watch('js', ['js:dev', 'templates:dev']);
      nitro.watch('styles', ['sass:dev']);
      nitro.watch('templates', ['templates:dev']);

      nitro.livereload('public');
    });

    nitro.task('live', ['dev'], function () {
      nitro.serve({
        root: 'public',
        openInBrowser: true
      });
    });

  })
  .import('.make')
  .run();
