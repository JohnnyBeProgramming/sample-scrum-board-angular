/// <reference path="typings/imports.d.ts" />
/*
* Prototyped Grunt file for a task based javascript builder
*/
module.exports = function (grunt) {
    'use strict';

    // Load required tasks
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html2js');

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
        'typescript',
        'html2js',
    ]);

    // Configure grunt
    var config = {
        pkg: grunt.file.readJSON('package.json'),
        env: process.env,
        cfg: {
            base: '../app/',
            dest: '../dest/',
        },
        less: {
            options: {},
            targets: {
                files: {
                    '<%= cfg.base %>assets/css/app.css': '<%= cfg.base %>assets/css/app.less'
                }
            },
        },
        cssmin: {
            options: {},
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
        typescript: {
            options: {
                sourceMap: false,
                declaration: true,
                target: 'es5', //or es3 
                //module: 'commonjs', //or amd 
            },
            targets: {
                src: [
                    '<%= cfg.base %>modules**/*.ts',
                    '<%= cfg.base %>views**/*.ts',
                    '!node_modules/**/*.ts'
                ],
                dest: '<%= cfg.base %>assets/lib/app.js',
            }
        },
        html2js: {
            options: {
                base: '<%= cfg.base %>',
                quoteChar: '\'',
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
            },
            main: {
                src: [
                    '<%= cfg.base %>**/*.tpl.html'
                ],
                dest: '<%= cfg.base %>assets/lib/app.tpl.js',
                module: 'myScrumBoard.templates',
            },
        },
        watch: {
            ts: {
                tasks: ['typescript'],
                files: [
                    '<%= cfg.base %>modules/**/*.ts'
                ],
            },
            less: {
                tasks: ['less'],
                files: '<%= cfg.base %>assets/css/*.less',
            },
            css: {
                tasks: ['cssmin'],
                files: [
                    '!**/*.min.css',
                    '<%= cfg.base %>assets/css/*.css',
                ],
            },
        },
    };

    grunt.initConfig(config)
};