module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      src: ['src/*.js']
    },
    uglify: {
      dist: {
        files: {
          'plainJane.min.js': ['plainJane.js']
        }
      }
    },
    watch: {
      scripts: {
        files: ['plainJane.js'],
        tasks: ['uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch', 'uglify']);

};