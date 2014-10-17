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
	cache: 'src/**/*.{css,js}'
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

  grunt.registerTask('default', ['less', 'appcache:core', 'gh-pages', 'open']);
};
