'use strict';

module.exports = function(grunt){
  grunt.initConfig({

    less: {
      main: {
        src: [
          'bower_components/normalize-css/normalize.css',
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

    open: {
      ghp: {
        path: 'http://elevato.rs'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', ['less', 'gh-pages', 'open']);
};
