module.exports = function (grunt) {

    var srcFiles = [
        'src/utils/util.array.js',
        'src/utils/util.string.js',
        'src/utils/class.class.js',
        'src/utils/class.map.js',
        'src/utils/util.color.js',
        'src/utils/math/class.vector2D.js',
        'src/utils/class.region.js',
        'src/constants.js',
        'src/utils/class.traverser.js',
        'src/utils/class.imgManager.js',

        'src/event/class.event.js',
        'src/event/class.eventmanager.js',

        'src/theme/class.CSSManager.js',

        'src/animation/class.keyframe.js',
        'src/interpolator/class.interpolator.js',
        'src/interpolator/class.interpolator.linear.js',
        'src/interpolator/class.interpolator.TCB.js',
        'src/animation/class.anim.timeline.js',
        'src/animation/class.animmanager.js',

        'src/collision/enum.collision.method.js',
        'src/collision/class.collision.tester.region.js',
        'src/collision/class.collision.tester.ghost.ondemand.js',
        'src/collision/class.collision.tester.factory.js',
        'src/collision/class.collision.manager.js',

        'src/globals.js',
        'src/utils/util.global.js',
        'src/utils/util.color.js',

        'src/mask/class.mask.js',
        'src/mask/class.mask.clip.js',

        'src/utils/math/math.js',
        'src/utils/class.handlebox.js',
        'src/node/class.node.js',

        'src/node/class.node.dom.js',
        'src/node/class.node.line.js',
        'src/node/class.node.curveTCB.js',
        'src/node/class.node.colorPicker.js',
        'src/node/class.node.tabMenu.js',
        'src/node/class.node.text.js',
        'src/node/class.node.webview.js',
        'src/node/class.node.square.js',
        'src/node/class.node.slider.js',
        'src/node/class.node.circle.js',
        'src/node/class.node.ellipse.js',
        'src/node/class.node.image.js',
        'src/node/class.node.animatedSprite.js',
        'src/node/class.node.button.js',
        'src/node/class.particles.js',

        'src/class.scenegraph.js',
        'src/class.view.js'
    ];
    var output = 'min/<%= pkg.name %>_<%= pkg.version %>.js';
    var outputMin = 'min/<%= pkg.name %>_<%= pkg.version %>.min.js';
    var outputMap = 'min/<%= pkg.name %>_<%= pkg.version %>.map';

    // Grunt configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '',
                // Replace all 'use strict' statements in the code with a single one at the top
                banner: "'use strict';\n",
                process: function (src, filepath) {
                    return '// Source: ' + filepath + '\n' +
                        src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                }
            },
            dist: {
                src: srcFiles,
                dest: output
            }
        },
        uglify: {
            options: {
                separator: ';',
                sourceMap: true,
                sourceMapName: outputMap
            },
            min: {
                src: [output],
                dest: outputMin
            }
        },
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                "logo": "../logo/logoCGSG_256x57.png",
                "themedir": "./Medias/theme_yuidoc/defaulttheme.json",
                "options": {
                    "linkNatives": "true",
                    "attributesEmit": "true",
                    "selleck": "false",
                    "paths": ["./src"],
                    "outdir": "./api/v<%= pkg.version %>",
                    "tabtospace": 4
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                browser: true,
                strict: false,
                expr: true,
                evil: true,
                noempty: false,
                //reporter: require('jshint-stylish'),
                reporterOutput: "./jshint.log"
            },
            ignore_warning: {
                options: {
                    '-W015': true,
                    '-W030': true,
                    '-W083': true
                },
                src: srcFiles
            }
        }

    });

    // Load of plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Tasks definition
    grunt.registerTask('default', ['concat:dist', 'uglify:min', 'yuidoc:compile']);
    grunt.registerTask('full', ['concat:dist', 'jshint', 'uglify:min', 'yuidoc:compile']);
    grunt.task.registerTask('bowerRegister', 'Register this version to Bower.', function () {
        //bower register SceneGraph.js git://github.com/GwennaelBuchet/SceneGraph.js.git
    });

};

//bower register SceneGraph.js git://github.com/GwennaelBuchet/SceneGraph.js.git