module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        newcap: false
      },
      src: ['plainJane.js', 'Gruntfile.js']
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
        tasks: ['jshint', 'uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch', 'uglify']);

};
