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

"use strict";

/**
 * @module Animation
 * @class CGSGTimeline
 * @extends {Object}
 * @constructor
 * @param {CGSGNode} parentNode
 * @param {string} attribute string representing the attribute to be animated (eg: "position.x", "rotation.angle", ...)
 * @param {string} method A string representing the interpolation method = "linear"
 * @type {CGSGTimeline}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGTimeline = CGSGObject.extend(
    {
        initialize: function (parentNode, attribute) {

            /**
             * The animated nodes
             * @property parentNode
             * @type {CGSGNode}
             */
            this.parentNode = parentNode;

            /**
             * A string representing the attribute to be animated (eg: "position.x", "rotation.angle", "color.g", ...)
             * The attribute must be a numeric property
             * @property attribute
             * @type {String}
             */
            this.attribute = attribute;


            /**
             * @property _method
             * @type {CGSGInterpolator}
             * @default {CGSGInterpolatorLinear} CGSGAnimationMethod.LINEAR
             * @private
             */
            this._method = CGSGAnimationMethod.LINEAR;

            /**
             * list of the [frame, value] pairs for the animation
             * the index of the list begins at 0, not at the first key frame
             *
             * @property listValues
             * @type {Array}
             */
            this.listValues = [];

            //List of the animation keys
            this._listKeys = [];
            //precomputed values for animation since first key to latest-1.
            //Each  cell contains the step, in pixel, from the previous key to the next one
            this._numberOfFrameBetweenKeys = [];
            //list of interpolation keys used to compute the values between all frames
            this._listErpKeys = [];

            /**
             * Callback on animation start event
             * @property onAnimationStart
             * @type {Function}
             */
            this.onAnimationStart = null;
            /**
             * Callback on animation end event
             * @property onAnimationEnd
             * @type {Function}
             */
            this.onAnimationEnd = null;
            /**
             * Callback on animation event
             * @property onAnimate
             * @type {Function}
             */
            this.onAnimate = null;
        },

        /**
         * Add a new animation key frame to the timeline and sort the timeline by frame number
         * @public
         * @method addKey
         * @param {Number} frame. Must be an integer value.
         * @param {Number} value
         */
        addKey: function (frame, value) {
            this._listKeys.push(new CGSGKeyFrame(frame, {x: value, y: 0}));
            this.sortByFrame(this._listKeys);

            this.listValues.clear();

            //by default, create 1 interpolation key for every animation key
            this.addInterpolationKey(frame, value);
        },

        /**
         * Remove the key at the specified frame
         * @method removeKey
         * @param frame {Number} Must be an integer value.
         */
        removeKey: function (frame) {
            this._removeKeyToList(frame, this._listKeys);
            this._removeKeyToList(frame, this._listErpKeys);

            if (this.getNbKeys() > 1) {
                this._computeNumberOfFrameBetweenKeys();
            }
            this.listValues.clear();
        },

        /**
         * @method removeKeysBetween
         * @param frame1 {number}
         * @param frame2 {number}
         */
        removeKeysBetween: function (frame1, frame2) {
            var k;
            for (k = this._listKeys.length - 1; k >= 0; k--) {
                if (this._listKeys[k].frame >= frame1 && this._listKeys[k].frame <= frame2) {
                    this._listKeys.without(this._listKeys[k]);
                }
            }

            for (k = this._listErpKeys.length - 1; k >= 0; k--) {
                if (this._listErpKeys[k].frame >= frame1 && this._listErpKeys[k].frame <= frame2) {
                    this._listErpKeys.without(this._listErpKeys[k]);
                }
            }

            this.listValues.clear();
        },

        addInterpolationKey:function(frame, value) {
            this._removeKeyToList(frame, this._listErpKeys);
            this._listErpKeys.push(new CGSGKeyFrame(frame, {x: value, y: 0}));
            this.sortByFrame(this._listErpKeys);
        },

        removeInterpolationKey:function(frame) {
            this._removeKeyToList(frame, this._listErpKeys);
        },

        _removeKeyToList:function(frame, list) {
            var key = null, k = 0;
            for (k; k < list.length - 1; k++) {
                if (list[k].frame === frame) {
                    key = list[k];
                    break;
                }
            }
            list.without(key);
        },

        /**
         * Remove all keys and values
         * @public
         * @method removeAll
         */
        removeAll: function () {
            this.listValues.clear();
            this._listKeys.clear();
            this._listErpKeys.clear();
            this._numberOfFrameBetweenKeys.clear();
        },

        /**
         * Compute the number of steps between all keys, 2 by 2
         * @private
         * @method _computeNumberOfFrameBetweenKeys
         */
        _computeNumberOfFrameBetweenKeys: function () {
            this._numberOfFrameBetweenKeys.clear();
            var nbFrameInSection = 0, k = 0;
            for (k; k < this._listErpKeys.length - 1; k++) {
                nbFrameInSection = this._listErpKeys[k + 1].frame - this._listErpKeys[k].frame;
                this._numberOfFrameBetweenKeys.push(nbFrameInSection);
            }
        },

        /**
         * @public
         * @method getNbKeys
         * @return {Number} the number of keys in this timeline. Must be an integer value.
         */
        getNbKeys: function () {
            return this._listKeys.length;
        },

        /**
         * Sort the list of keys by frame number
         * @public
         * @method sortByFrame
         */
        sortByFrame: function (list) {
            list.sort(function (a, b) {
                return a.frame - b.frame;
            });
        },

        /**
         * Compute all the values (steps) for the animation of this timeline
         * @public
         * @method compute
         */
        compute: function () {
            //empty the list of values
            this.listValues.clear();
            if (this.getNbKeys() < 1) {
                return;
            }

            this._computeNumberOfFrameBetweenKeys();
            this.listValues = this._method.compute(this._listErpKeys, this._numberOfFrameBetweenKeys);
        },

        /**
         * @method getFirstKey
         * @return {CGSGKeyFrame} the first key frame of this timeline
         */
        getFirstKey: function () {
            if (this.getNbKeys() === 0) {
                return null;
            }

            return this._listKeys[0];
        },

        /**
         * @method getLastKey
         * @return {CGSGKeyFrame} the last key frame of this timeline
         */
        getLastKey: function () {
            if (this.getNbKeys() === 0) {
                return null;
            }

            return this._listKeys[this.getNbKeys() - 1];
        },

        /**
         * Get the value for the frame number passed in parameter
         * @public
         * @method getValue
         * @param {Number} frame the frame bound with the returned value. Must be an integer value.
         * @return {*} Object with 2 properties : frame and value, or undefined
         * If no key is defined, return undefined
         * If there is only one key, returns it's value
         * If the frame is before the first key, returns the first key value
         * If the frame is after the last key, returns the last key value
         */
        getValue: function (frame) {
            var nbKeys = this.getNbKeys();

            //if no keys : no animation
            if (nbKeys === 0 && this.listValues.isEmpty()) {
                return undefined;
            }

            //I have keys, but no precomputed values, so compute values
            if (this.listValues.isEmpty()) {
                if (frame < this._listKeys[0].frame) {
                    return undefined;
                }
                return this.compute();
            }

            //Here, I have precomputed values

            //if frame < first frame, return no value
            if (frame < this._listKeys[0].frame) {
                return undefined;
            }

            //if frame > last frame (ie last key), return last value
            if (frame >= this._listKeys[this._listKeys.length - 1].frame) {
                return this.listValues[this.listValues.length - 1].x;
            }

            return this.listValues[frame - this._listKeys[0].frame].x;
        },

        /**
         * Return the precomputed array of values for this timeline
         * @method exportValues
         * @return {Array}
         */
        exportValues: function () {
            if (this.listValues.length === 0) {
                this.compute();
            }

            var values = [], i;
            for (i = 0; i < this.listValues.length; i++) {
                values.push(this.listValues[i]);
            }
            return values;
        },

        /**
         * Import new precomputed values for this timeline.
         * The number of values must match the number of frame defined by the keys of this timeline
         * @method importValues
         * @param newValues {Array} of new values
         * @param startFrame {Number} Must be an integer value.
         */
        importValues: function (newValues, startFrame) {
            this.addKey(startFrame, newValues[0]);
            this.addKey(startFrame + newValues.length - 1, newValues[newValues.length - 1]);
            var i;
            for (i = 0; i < newValues.length; i++) {
                this.listValues.push(newValues[i]);
            }
        }
    }
);
