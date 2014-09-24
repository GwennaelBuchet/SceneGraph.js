module.exports = function (grunt) {

    // Configuration de Grunt
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';',
                // Replace all 'use strict' statements in the code with a single one at the top
                banner: "'use strict';\n",
                process: function (src, filepath) {
                    return '// Source: ' + filepath + '\n' +
                        src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                }
            },
            dist: {
                src: [
                    'utils/util.array.js',
                    'utils/util.string.js',
                    'utils/class.class.js',
                    'utils/class.map.js',
                    'utils/util.color.js',
                    'utils/math/class.vector2D.js',
                    'utils/class.region.js',
                    'constants.js',
                    'utils/class.traverser.js',
                    'utils/class.imgManager.js',

                    'event/class.event.js',
                    'event/class.eventmanager.js',

                    'theme/class.CSSManager.js',

                    'animation/class.keyframe.js',
                    'interpolator/class.interpolator.js',
                    'interpolator/class.interpolator.linear.js',
                    'interpolator/class.interpolator.TCB.js',
                    'animation/class.anim.timeline.js',
                    'animation/class.animmanager.js',

                    'collision/enum.collision.method.js',
                    'collision/class.collision.tester.region.js',
                    'collision/class.collision.tester.ghost.ondemand.js',
                    'collision/class.collision.tester.factory.js',
                    'collision/class.collision.manager.js',

                    'globals.js',
                    'utils/util.global.js',
                    'utils/util.color.js',

                    'mask/class.mask.js',
                    'mask/class.mask.clip.js',

                    'utils/math/math.js',
                    'utils/class.handlebox.js',
                    'node/class.node.js',

                    'node/class.node.dom.js',
                    'node/class.node.line.js',
                    'node/class.node.curveTCB.js',
                    'node/class.node.colorPicker.js',
                    'node/class.node.tabMenu.js',
                    'node/class.node.text.js',
                    'node/class.node.webview.js',
                    'node/class.node.square.js',
                    'node/class.node.slider.js',
                    'node/class.node.circle.js',
                    'node/class.node.ellipse.js',
                    'node/class.node.image.js',
                    'node/class.node.animatedSprite.js',
                    'node/class.node.button.js',
                    'node/class.particles.js',

                    'class.scenegraph.js',
                    'class.view.js'
                ],
                dest: 'min/<%= pkg.name %>_<%= pkg.version %>.js'
            }
        },
        uglify: {
            options: {
                separator: ';'
            },
            min: {
                src: ['min/<%= pkg.name %>_<%= pkg.version %>.js'],
                dest: 'min/<%= pkg.name %>_<%= pkg.version %>.min.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-unglify');

    // Définition des tâches Grunt
    grunt.registerTask('default', ['concat:dist', 'uglify:min'])

};