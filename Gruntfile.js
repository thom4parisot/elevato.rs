'use strict';

module.exports = function(grunt){
  grunt.initConfig({

    less: {
      main: {
        src: [
          'node_modules/normalize-css/normalize.css',
          'node_modules/codemirror/lib/codemirror.css',
          'node_modules/codemirror/theme/neo.css',
          'src/main.css'
        ],
        dest: 'src/bundle.css'
      }
    },

    'gh-pages': {
      github: {
        src: [
          'index.html',
          'src/**/*',
          '!src/**/*.js',
          'src/bundle.js',
          'media/*',
          'CNAME'
        ],
        options: {
          base: './',
          repo: 'git@github.com:oncletom/elevato.rs.git'
        }
      }
    },

    appcache: {
      core: {
        dest: 'src/app.appcache',
        cache: {
          patterns: 'src/**/*.{css,js}',
          literals: [
            '/',
            'index.html'
          ]
        }
      },
      dev: {
        dest: 'src/app.appcache',
        cache: '',
        network: '*'
      },
      options: {
	      basePath: 'src/'
      }
    },

    open: {
      ghp: {
        path: 'http://elevato.rs'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-appcache');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('build', ['less', 'appcache:core']);
  grunt.registerTask('deploy', ['build', 'gh-pages']);
  grunt.registerTask('default', ['build', 'open']);
};
