'use strict';


module.exports = function (nitro) {

  nitro.task('templates', function (target) {

    var path = require('path'),
        _ = nitro.tools,
        file = nitro.file,
        template = nitro.template,
        renderPage = template( file.read('templates/layout.html') ),
        baseScope = _.scope({
          dev: target === 'dev',
          title: 'Awesome Site'
        }),
        publicDir = 'public';

    nitro.dir('templates/partials').load('{,**/}*.html').each(function (f) {
      var pathParts = f.getPath().split('/'),
          filename = pathParts.pop();

      pathParts.push( filename.replace(/^_|\.html$/g, '') );

      template.put( pathParts.join('/'), f.getSrc() );
    });

    template.put( 'jsLibs', nitro.dir('public').libs2html([
      'vendor/{,**/}jqlite.js',
      'vendor/{,**/}jquery.js',
      'vendor/{,**/}jq-plugin.js',
      'vendor/{,**/}*.js',
      '{,**/}*.js'
    ], { rootSlash: false }) );

    template.put( 'cssLibs', nitro.dir('public').libs2html('css/{,**/}*.css', { rootSlash: false }) );

    nitro.dir('templates/pages').load('{,**/}*.html').each(function (f) {
      var pathParts = f.getPath().split('/'),
          filename = pathParts.pop();

      if( filename !== '_home.html' ) {
        pathParts.push( filename.replace(/^_|\.html$/g, '') );
      }

      file.write( path.join.apply(null, [publicDir].concat(pathParts).concat(['index.html']) ), renderPage( baseScope.$$new({
        page: f.getSrc().trim(),
        pageClass: pathParts.join(' '),
        section: pathParts[0]
      }) ) );
    });

  });

};
