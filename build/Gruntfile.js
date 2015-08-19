/// <reference path="typings/imports.d.ts" />
/*!
* Prototyped Grunt file for a task based javascript builder
*/
module.exports = function (grunt) {
    'use strict';

    // Load required tasks
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Define the task(s)
    grunt.registerTask('default', [
        'build',
    ]);
    grunt.registerTask('build', [
        'build-styles',
        'build-scripts',
    ]);
    grunt.registerTask('build-styles', [
        'less',
        'cssmin',
    ]);
    grunt.registerTask('build-scripts', [
        'ts',
    ]);

    // Configure grunt
    var config = {
        pkg: grunt.file.readJSON('package.json'),
        env: process.env,
        cfg: {
            base: '../app/',
            dest: '../dest/',
        },
        ts: {
            all: {
                options: {
                    fast: 'never'
                },
                files: [{
                    src: [
                    '<%= cfg.base %>**/*.ts',
                    '!node_modules/**/*.ts'
                    ],
                    dest: '<%= cfg.base %>assets/lib/app.ts.js'
                }],
            }
        },
        less: {
            targets: {
                options: {
                    paths: ['<%= cfg.base %>assets/css']
                },
                files: {
                    'app.css': 'app.less'
                }
            },
        },
        cssmin: {
            options: {
                keepSpecialComments: 0,
                shorthandCompacting: false,
                roundingPrecision: -1,
            },
            targets: {
                files: [{
                    expand: true,
                    cwd: '<%= cfg.base %>assets/css',
                    src: [
                        '*.css',
                        '!*.min.css'
                    ],
                    dest: '<%= cfg.base %>assets/css',
                    ext: '.min.css'
                }]
            }
        },
    };

    grunt.initConfig(config)
};