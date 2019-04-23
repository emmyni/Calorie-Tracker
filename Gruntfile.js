module.exports = (grunt) => {
  grunt.initConfig({
    execute: {
      target: {
        src: ['db_connection.js']
      }
    },
    watch: {
      scripts: {
        files: ['db_connection.js'],
        tasks: ['execute'],
      },
  }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-execute');
};
