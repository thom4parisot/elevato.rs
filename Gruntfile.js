'use strict';

module.exports = function(grunt){
  grunt.initConfig({

    'gh-pages': {
      github: {
        src: [
          'index.html',
          'src/**/*',
          '!src/**/*.js',
          'src/bundle.js',
          'media/*',
          'bower_components/**/*.css'
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

  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', ['gh-pages', 'open']);
};
