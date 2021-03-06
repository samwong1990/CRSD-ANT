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
                    'www/index.html': 'www/index.tpl.html',
                    'www/settings.html': 'www/settings.tpl.html'
                }
            }
        },
        watch: {
            scripts: {
                files: ['www/elm/*.elm', 'www/js/**/*.js', 'www/css/**/*.css', 'www/index.tpl.html', 'www/settings.tpl.html'],
                tasks: ['shell:compileElm', 'includeSource', 'shell:runCordovaBrowser'],
                options: {
                    spawn: false,
                    interrupt: true,
                    debounceDelay: 100
                }
            }
        },
        shell: {
            compileElm: {
                command: 'cd www && elm-make elm/*.elm --output=js/prioritized/elm.js',
                options: {
                    async: false
                }
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
            },
            bowerInstall: {
                command: 'bower install',
                options: {
                    async: false
                }
            }

        }
    });

    // Default task(s).
    grunt.registerTask('default', ['shell:bowerInstall', 'includeSource', 'shell:runCordovaBrowser', 'shell:runTestServer', 'watch']);

};
