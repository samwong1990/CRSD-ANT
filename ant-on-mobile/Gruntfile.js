module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt)

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        includeSource: {
            options: {
                basePath: 'www',
                baseUrl: '',
                templates: {
                    js: '<script src="{filePath}"></script>',
                    css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
                }
            },
            myTarget: {
                files: {
                    'www/index.html': 'www/index.tpl.html'
                }
            }
        },
        watch: {
            scripts: {
                files: ['www/elm/*.elm', 'www/js/**/*.js', 'www/css/**/*.css', 'www/index.tpl.html'],
                tasks: ['shell:compileElm', 'includeSource', 'shell:runCordovaBrowser'],
                options: {
                    spawn: false,
                    interrupt: true,
                    debounceDelay: 250
                }
            }
        },
        shell: {
            compileElm: {
                command: 'cd www && elm-make elm/*.elm --output=js/prioritized/elm.js',
            },
            runTestServer: {                                // Task
                command: 'npm test',
                options: {
                    async: true
                }
            },
            runCordovaBrowser: {
                command: 'cordova run browser',
                options: {
                    async: true
                }
            }

        }
    });

    // Default task(s).
    grunt.registerTask('default', ['includeSource', 'shell:runTestServer', 'shell:runCordovaBrowser', 'watch']);

};
