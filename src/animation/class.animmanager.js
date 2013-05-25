/*
 * Copyright (c) 2013  Capgemini Technology Services (hereinafter “Capgemini”)
 *
 * License/Terms of Use
 *
 * Permission is hereby granted, free of charge and for the term of intellectual property rights on the Software, to any
 * person obtaining a copy of this software and associated documentation files (the "Software"), to use, copy, modify
 * and propagate free of charge, anywhere in the world, all or part of the Software subject to the following mandatory
 * conditions:
 *
 *   •    The above copyright notice and this permission notice shall be included in all copies or substantial portions
 *   of the Software.
 *
 *  Any failure to comply with the above shall automatically terminate the license and be construed as a breach of these
 *  Terms of Use causing significant harm to Capgemini.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 *  Except as contained in this notice, the name of Capgemini shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Capgemini.
 *
 *  These Terms of Use are subject to French law.
 */

/**
 * List the interpolation methods to compute the values between 2 animation keys
 * @class CGSGAnimationMethod
 * @type {Object}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGAnimationMethod = {
    /**
     * @property LINEAR
     * @type {CGSGInterpolatorLinear}

     */
    LINEAR: new CGSGInterpolatorLinear(),
    /**
     * @property NURBS
     * @type {CGSGInterpolatorTCB}
     */
    CUBIC_SPLINE: new CGSGInterpolatorTCB()
};

/**
 * @module Animation
 * @class CGSGAnimationManager
 * @extends {Object}
 * @constructor
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGAnimationManager = CGSGObject.extend(
    {
        initialize: function () {
            /**
             * List of the timelines for the animations.
             * A timeline consists of a list of animation keys for 1 attribute of 1 node
             * @property listTimelines
             * @type {Array}
             */
            this.listTimelines = []
        },

        /**
         * Add a key
         * @method addAnimationKey
         * @param {CGSGTimeline} timeline handler to the timeline to animate
         * @param {Number} frame the date for the key
         * @param {Number} value value for the attribute at the frame
         *
         * @example this.sceneGraph.addAnimation(imgNode, "position.x", 2000, 200, "linear", true);
         */
        addAnimationKey: function (timeline, frame, value) {
            //add the new key to the timeline
            timeline.addKey(CGSGMath.fixedPoint(frame), value);
        },

        /**
         * @method removeAnimationKey
         * @param timeline {CGSGTimeline}
         * @param frame {Number} the date for the key
         */
        removeAnimationKey: function (timeline, frame) {
            //add the new key to the timeline
            timeline.removeKey(CGSGMath.fixedPoint(frame));
        },

        /**
         * Animate an attribute of a nodes
         * @method animate
         * @param {CGSGNode} node Handler to the nodes to animate
         * @param {String} attribute String representing the attribute to animate ("position.y", "rotation.angle", "fill", ...)
         * @param {Number} duration Duration of the animation, in frame
         * @param {Number} from Start value
         * @param {Number} to End value
         * @param {Number} delay Delay before start the animation, in frames
         * @return {CGSGTimeline} the timeline on which tha the animation was added
         * @example CGSG.animationManager.animate(imgNode, "position.x", 700, 0, 200, 0, true);
         */
        animate: function (node, attribute, duration, from, to, delay) {
            var timeline = this.getTimeline(node, attribute);
            var d1 = CGSG.currentFrame + CGSGMath.fixedPoint(delay);
            var d2 = CGSG.currentFrame + CGSGMath.fixedPoint(delay + duration);
            timeline.removeKeysBetween(d1, d2);
            this.addAnimationKey(timeline, d1, from);
            this.addAnimationKey(timeline, d2, to);
            this.compute(timeline);
            return timeline;
        },

        compute: function (timeline) {
            timeline.compute();
        },


        /**
         * @method stillHaveAnimation
         * @return {Boolean} true if there is still animation key after the current frame
         */
        stillHaveAnimation: function () {
            if (this.listTimelines.length == 0) {
                return false;
            }
            else {
                for (var i = 0, len = this.listTimelines.length; i < len; ++i) {
                    if (this.listTimelines[i].getLastKey() !== null &&
                        this.listTimelines[i].getLastKey().frame <= CGSG.currentFrame) {
                        return true;
                    }
                }
            }

            return false;
        },

        /**
         * Return the timeline corresponding with the nodes and attribute. Create it if does not exists yet
         * @method getTimeline
         * @param {CGSGNode} node Handle to the nodes
         * @param {String} attribute String. the attribute name
         * @return {CGSGTimeline}
         */
        getTimeline: function (node, attribute) {
            for (var i = 0, len = this.listTimelines.length; i < len; ++i) {
                if (this.listTimelines[i].parentNode === node && this.listTimelines[i].attribute == attribute) {
                    return this.listTimelines[i];
                }
            }

            //no timeline yet, create a new one
            return this._createTimeline(node, attribute);
        },

        /**
         * Create a new timeline
         * @private
         * @method createTimeline
         * @param node {CGSGNode} Handle to the nodes
         * @param attribute {String} the attribute name
         * @return {CGSGTimeline}
         */
        _createTimeline: function (node, attribute) {
            var timeline = new CGSGTimeline(node, attribute);
            this.listTimelines.push(timeline);
            return timeline;
        }
    }
);
