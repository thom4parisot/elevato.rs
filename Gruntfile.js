'use strict';

module.exports = function(grunt){
  grunt.initConfig({
    'copy': {
      'static': {
        src: [
          'index.html',
          'src/**/*',
          'bower_components/**/*.{css,js}'
        ],
        dest: 'dist/'
      }
    },

    'gh-pages': {
      github: {
        src: ['**/*'],
        options: {
          base: 'dist/'
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