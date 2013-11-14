'use strict';

module.exports = function(grunt){
  grunt.initConfig({
    'copy': {
      'static': {
        src: [
          'index.html',
          'src/**/*',
          'media/*',
          'bower_components/**/*.{css,js}'
        ],
        dest: 'dist/'
      },
      trick: {
        expand: true,
        flatten: true,
        src: 'src/.gitignore',
        dest: 'dist'
      }
    },

    'gh-pages': {
      github: {
        src: [
          '**/*',
          '.gitignore'
        ],
        options: {
          base: 'dist/',
          repo: 'git@github.com:DavidBruant/SeeYouLaterElevator.git'
        }
      }
    },

    open: {
      ghp: {
        path: 'http://davidbruant.github.io/SeeYouLaterElevator/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', ['copy', 'gh-pages', 'open']);
};
