'use strict';


module.exports = function (nitro) {

  var canClear = ['public'];

  nitro.task('clear', function (target) {
    if( canClear.indexOf(target) >= 0 ) {
      nitro.dir.remove(target);
    }
  });

};
