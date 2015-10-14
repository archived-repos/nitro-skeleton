'use strict';


module.exports = function (nitro) {

  nitro.task('js', {
    dev: function (target) {
      nitro.package('bower').dependencies().copy('public/vendor');
      nitro.dir('js').copy('{,**/}*.js', 'public');
    },
    default: function () {
      nitro.package('bower').dependencies().copy('.tmp/vendor');
      nitro.load([
            '.tmp/vendor/{,**/}jqlite.js',
            '.tmp/vendor/{,**/}jquery.js',
            '.tmp/vendor/{,**/}jq-plugin.js',
            '.tmp/vendor/{,**/}*.js',
            'js/{,**/}*.js'
          ])
          .join('skeleton.min.js')
          .process('uglify')
          .write('public');
    }
  });

};
