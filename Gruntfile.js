module.exports = function(grunt) {
	"use strict";
	var siteMap = [];
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		connect: {
			server: {
				options: {
					port: '3000',
					base: './build/',
					keepalive: true,
					hostname: 'localhost'
				}
			}
		},
		less: {
			main: {
				files: {
					'build/common/styles/main.css': [
						'common/styles/main.less'
					]
				},
				options: {
					compress: true,
					sourceMap: true,
					sourceMapFilename: 'build/common/main.css.map',
					sourceMapURL: '/common/main.css.map',
					sourceMapRootpath: '/'
				}
			}
		},
		liquid: {
			options: {
				includes: 'templates/includes',
				siteMap: siteMap
			},
			pages: {
				files: [{
					cwd: 'templates/',
					expand: true,
					flatten: false,
					src: ['**/*.liquid', '**/**/*.liquid', "!includes/**/*.liquid"],
					dest: 'build/',
					ext: '.html'
				}]
			}
		},
		copy: {
			main: {
				files: [{
					expand: true,
					flatten: false,
					cwd: 'common/',
					src: ['**/*.*,!**/*.less'],
					dest: 'build/common/'
				}, {
					expand: true,
					src: ['common/images/**'],
					dest: 'build/'
				}, {
					expand: true,
					src: ['common/fonts/**'],
					dest: 'build/'
				}, {
					expand: true,
					flatten: false,
					src: ['common/scripts/**'],
					dest: 'build/'
				}]
			},
			bower: {
				files: [{
					expand: true,
					flatten: false,
					cwd: 'bower_components/',
					src: ['**/*.*,!**/*.less'],
					dest: 'build/bower_components/'
				}]
			}
		},
		watch: {
			styles: {
				files: ['**/*.less'],
				tasks: ['less'],
				options: {
					nospawn: false,
					livereload: true
				}
			},
			js: {
				files: ['common/scripts/**/*.js'],
				tasks: ['copy'],
				options: {
					livereload: true
				}
			},
			template: {
				files: ['**/*.liquid'],
				tasks: ['liquid'],
				options: {
					livereload: true
				}
			},
			html: {
				files: ['**/*.html'],
				options: {
					livereload: true
				}
			},
			copy: {
				files: ['common/**/*.*'],
				tasks: ['copy']
			}
		},
		concurrent: {
			all: {
				tasks: ['newer:less', 'connect:server', 'newer:liquid', 'copy', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});

	grunt.registerTask('default', ['concurrent:all']);
	grunt.registerTask('build', ['newer:less', 'newer:liquid', 'copy:main', 'copy:bower']);
};