'use strict';

module.exports = function(grunt){
  grunt.initConfig({
    'gh-pages': {
      github: {
        src: [
          'index.html',
          'src/**/*',
          'bower_components/**/*.{js,css}'
        ],
        options: {
          base: './'
        }
      }
    },

    open: {
      ghp: {
        path: 'http://davidbruant.github.io/SeeYouLaterElevator/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', ['gh-pages', 'open']);
};