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
             * Interpolation method to define the path between animation keys.
             *
             * @property _interpolator
             * @type {CGSGInterpolator}
             * @default {CGSGInterpolatorLinear} CGSGAnimationMethod.LINEAR
             * @private
             */
            this._interpolator = CGSGAnimationMethod.LINEAR;

            /**
             * List of the computed [frame, value] pairs for the animation.
             * The index of the list begins at 0, not at the first key frame
             *
             * @property values
             * @readOnly
             * @type {Array}
             */
            this.values = [];

            //List of the animation keys
            this._keys = [];
            //precomputed values for animation since first key to latest-1.
            //Each  cell contains the step, in pixel, from the previous key to the next one
            this._numberOfFrameBetweenKeys = [];
            //list of interpolation keys used to compute the values between all frames
            //this._listErpKeys = [];
            /**
             * This is the curve describing the acceleration of the animation.
             * Each key describing the curve is a {CGSGKeyFrame} object with a value between 0% and 100%.
             * The accelerationCurve also embed its own interpolator to
             * @property accelerationCurve
             * @type {CGSGAnimationAccelerationCurve}
             */
            this.accelerationCurve = new CGSGAnimationAccelerationCurve();

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
         * Add a new animation key frame to the timeline and sort the timeline by frame number.
         * A key is going to be also added to {this.accelerationCurve} for the same frame.
         * After added the key, developer must call "compute" method in order to recompute the animation.
         * @public
         * @method addKey
         * @param {Number} frame. Must be an integer value.
         * @param {Number} value
         */
        addKey: function (frame, value) {
            //remove previous key at this frame, if exists
            //this.removeKey(frame);
            //add the new key
            if (!cgsgExist(this.getKeyByValue(value))) {
                this._keys.push(new CGSGKeyFrame(frame, {x: value, y: 0}));
                this.sortByValue(this._keys);
            }

            //by default, create 1 interpolation key for every animation key
            this.accelerationCurve.setValueToFrame(frame, value, true, false);
        },

        /**
         * Remove the key at the specified frame.
         * If there is also a key for the same frame on this.accelerationCurve, so it will also be deleted.
         * After deleted the key, developer must call "compute" method in order to recompute the animation.
         * @method removeKey
         * @param frame {Number} Must be an integer value.
         */
        removeKey: function (frame) {
            var condition = function (item, frame) {
                return item.frame === frame
            };
            this._keys.withoutByCondition(condition, frame);

            //remove the key for the same frame on the acceleration curve
            this.accelerationCurve.removeKey(frame);
        },

        /**
         * Remove all animation keys between the two frames.
         * For each key removed, also remove the keys at the same frames (and only at the same frames) in the acceleration curve.
         * After deleted the keys, developer must call "compute" method in order to recompute the animation.
         * @method removeKeysBetween
         * @param frame1 {number}
         * @param frame2 {number}
         */
        removeKeysBetween: function (frame1, frame2) {
            var k;
            for (k = this._keys.length - 1; k >= 0; k--) {
                if (this._keys[k].frame >= frame1 && this._keys[k].frame <= frame2) {
                    //remove the key for this frame in the acceleration curve
                    this.accelerationCurve.removeKey(this._keys[k].frame);
                    //remove the key from this timeline
                    this._keys.without(this._keys[k]);
                }
            }

            this.values.clear();
        },

        /**
         * Remove all keys and values from the timeline and the acceleration curve.
         * After deleted the keys, developer must call "compute" method in order to recompute the animation.
         * @public
         * @method removeAll
         */
        removeAll: function () {
            this.values.clear();
            this._keys.clear();
            this._numberOfFrameBetweenKeys.clear();
            this.accelerationCurve.removeAll();
        },

        /**
         * Compute the number of steps between all keys, 2 by 2
         * @private
         * @method _computeNumberOfFrameBetweenKeys
         */
        _computeNumberOfFrameBetweenKeys: function () {
            this._numberOfFrameBetweenKeys.clear();
            var nbFrameInSection = 0, k = 0, len = this._keys.length - 1;
            for (k; k < len; k++) {
                nbFrameInSection = CGSGMath.fixedPoint(this._keys[k + 1].frame - this._keys[k].frame);
                this._numberOfFrameBetweenKeys.push(Math.max(CGSG.interpolatorAccuracy, nbFrameInSection));
            }
        },

        /**
         * @public
         * @method getNbKeys
         * @return {Number} the number of keys in this timeline. Must be an integer value.
         */
        getNbKeys: function () {
            return this._keys.length;
        },

        /**
         * @method getKeyByValue
         * @param value {Number}
         * @returns {CGSGKeyFrame} or undefined if no key corresponds to the value
         */
        getKeyByValue: function (value) {
            var k = 0, len = this._keys.length;
            for (k; k < len; k++) {
                if (this._keys[k].value.x === value) {
                    return this._keys[k];
                }
            }
            return undefined;
        },

        /**
         * Sort the list of keys by frame number
         * @public
         * @method sortByValue
         */
        sortByValue: function (list) {
            list.sort(function (a, b) {
                //return a.frame - b.frame;
                return a.value.x - b.value.x;
            });
        },

        /**
         * Compute all the values (steps) for the animation of this timeline
         * @public
         * @method compute
         * @return {Array} List of computed values
         */
        compute: function () {
            //empty the list of values
            this.values = [];
            if (this.getNbKeys() < 1) {
                return [];
            }

            // 1. compute the acceleration curve, with values between 0% and 100%
            var lerp = this.accelerationCurve.compute();

            // 2. compute all values for the animation
            this._computeNumberOfFrameBetweenKeys();
            //todo : this._numberOfFrameBetweenKeys n'est pas le bon nombre
            var v = this._interpolator.compute(this._keys, this._numberOfFrameBetweenKeys);

            // 3. put in "this.values" all interpolated values
            var l = lerp.length - 1;
            var p, vl = v.length;
            for (var i = 0; i < l; i++) {
                p = CGSGMath.fixedPoint(lerp[i].x * vl / 100);

                this.values[i] = v[p].x;

                console.log("i=" + i + "; v[i].x =" + v[i].x + " ; lerp = " + lerp[i].x + " ; p = " + p + " ; value = " + this.values[i]);
                //for (var k = 0; k < vl; k++) {
                //    console.log("v[" + k + "] = " + v[k].x);
                //}
                //console.log("----------------\n");
            }

            return this.values;
        },

        /**
         * @method getFirstKey
         * @return {CGSGKeyFrame} the first key frame of this timeline
         */
        getFirstKey: function () {
            if (this.getNbKeys() === 0) {
                return null;
            }

            return this._keys[0];
        },

        /**
         * @method getLastKey
         * @return {CGSGKeyFrame} the last key frame of this timeline
         */
        getLastKey: function () {
            if (this.getNbKeys() === 0) {
                return null;
            }

            return this._keys[this.getNbKeys() - 1];
        },

        /**
         * Get the value for the frame number passed in parameter
         * @public
         * @method getValue
         * @param {Number} frame the frame bound with the returned value. Must be an integer value.
         * @return {Number} value fro this frame or NaN
         * If no key is defined, return undefined
         * If there is only one key, returns it's value
         * If the frame is before the first key, returns the first key value
         * If the frame is after the last key, returns the last key value
         */
        getValue: function (frame) {
            var nbKeys = this.getNbKeys();

            //if no keys : no animation
            if (nbKeys === 0 && this.values.isEmpty()) {
                return NaN;
            }

            //I have keys, but no precomputed values, so compute values
            if (this.values.isEmpty()) {
                if (frame < this._keys[0].frame) {
                    return NaN;
                }
                this.compute();
            }

            //Here, I have precomputed values

            //if frame < first frame, return no value
            if (frame < this._keys[0].frame) {
                return NaN; //this.values[0];
            }

            //if frame > last frame (ie last key), return last value
            if (frame >= this._keys[this._keys.length - 1].frame) {
                return this.values[this.values.length - 1];
            }

            return this.values[frame - this._keys[0].frame];
        },

        /**
         * Return the precomputed array of values for this timeline
         * @method exportValues
         * @return {Array}
         */
        exportValues: function () {
            if (this.values.length === 0) {
                this.compute();
            }

            var values = [], i;
            for (i = 0; i < this.values.length; i++) {
                values.push(this.values[i]);
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
                this.values.push(newValues[i]);
            }
        }
    }
);
