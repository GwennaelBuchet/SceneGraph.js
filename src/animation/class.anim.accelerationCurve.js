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
 * Acceleration curve used for animation.
 * The curve has the time (ie. the frames) as x axis and the value (percent value from 0 to 100) as y axis.
 * @module Animation
 * @class CGSGAnimationAccelerationCurve
 * @extends {Object}
 * @constructor
 * @type {CGSGAnimationAccelerationCurve}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGAnimationAccelerationCurve = CGSGObject.extend(
    {
        initialize: function () {
            /**
             * List of the keys on the curve
             * @property _keys
             * @type {Array}
             * @private
             */
            this._keys = [];

            /**
             * Contains the minimum and maximum values for this acceleration curve.
             * When compute the values, they'll be values from 0% to 100% from whithin this range
             * @property _range
             * @type {{min: number, max: number, delta: number}}
             * @private
             */
            this._range = {min: NaN, max: NaN, delta: 0};

            /**
             * List of the computed [frame, value] pairs for the animation.
             * The index of the list begins at 0, not at the first key frame
             *
             * @property values
             * @readOnly
             * @type {Array}
             */
            this.values = [];

            this._numberOfFrameBetweenKeys = [];

            /**
             * Interpolation method to define the acceleration between keys.
             *
             * @property _interpolator
             * @type {CGSGInterpolator}
             * @default {CGSGInterpolatorLinear} CGSGAnimationMethod.LINEAR
             * @private
             */
            this._interpolator = CGSGAnimationMethod.LINEAR;
        },

        setInterpolator: function (interpolator) {
            this._interpolator = interpolator;
        },


        /**
         * @method addKey
         * @param {Number} frame the frame number
         * @param {Number} value A percent value between 0 and 100
         * @return {CGSGKeyFrame} the new created key frame
         */
        addKey: function (frame, value) {
            var k = new CGSGKeyFrame(frame, {x: value, y: value});
            this._keys.push(k);
            this.sortByFrame();
            return k;
        },

        /**
         * Remove the key associated to the frame, if exists.
         * @method removeKey
         * @param frame
         */
        removeKey: function (frame) {
            var k = this.getKey(frame);
            if (cgsgExist(k)) {
                this._keys.without(k);
                cgsgFree(k);
            }

            this.sortByFrame()
        },

        /**
         * Remove all keys and values
         * @method removeAll
         */
        removeAll: function () {
            this._keys.clear();
            this.values.clear();
        },

        /**
         * @method getKey
         * @param frame {Number} frame where the key is located right now
         * @return {CGSGKeyFrame}
         */
        getKey: function (frame) {
            var k = null;
            for (var i = 0, l = this._keys.length; i < l; i++) {
                k = this._keys[i];
                if (k.frame === frame)
                    return k;
            }

            return null;
        },

        /**
         * @method updateKey
         * @param key {CGSGKeyFrame} key to update
         * @param frame {Number} Integer
         * @param value {Number} new percent value for the key, between 0 and 100
         */
        updateKey: function (key, frame, value) {
            var k = this.getKey(key.frame);
            k.frame = frame;
            k.value = value;
            this.sortByFrame();
        },

        /**
         * Set the new value for the frame.
         * If no key exists for this frame and 'createIfEmpty' is true, then it will create the key
         * @method setValueToFrame
         * @param frame {Number}
         * @param value {Number}
         * @param createIfEmpty {Boolean} if true, then it will create a new key for the frame if it not already exists
         * @param inPercent {Boolean} true if the value is given in percent (from 0 to 100). If the value is not given in percent, so percent value will be computed
         * @return {CGSGKeyFrame} The modified or created key
         */
        setValueToFrame: function (frame, value, createIfEmpty, inPercent) {
            var k = null;
            //convert value in percent if it's given in pure value
            if (!inPercent)
                value = this._convertToPercent(value);

            //range the value between 0 and 100 in case of incorrect value would be passed
            value = Math.max(0, Math.min(100, value));

            for (var i = 0, l = this._keys.length; i < l; i++) {
                k = this._keys[i];
                if (k.frame === frame) {
                    k.value = value;
                    return k;
                }
            }

            if (createIfEmpty) {
                k = this.addKey(frame, value);
                return k;
            }
        },

        /**
         * @method setValueToKey
         * @param key {CGSGKeyFrame}
         * @param value {Number} a percentage number between 0 and 100
         */
        setValueToKey: function (key, value) {
            key.value = value;
        },


        /**
         * Scale the time for all the keys, starting from the first one.
         * That means that the first key does not change.
         * @method scaleTimeBy
         * @param s
         */
        scaleTimeBy: function (s) {

        },

        translateTimeWith: function (t) {

        },

        translateTimeTo: function (t) {

        },

        translateTimeBy: function (s) {

        },

        /**
         * Sort the list of keys by frame number
         * @public
         * @method sortByFrame
         */
        sortByFrame: function () {
            this._keys.sort(function (a, b) {
                return a.frame - b.frame;
            });
        },

        /**
         * @method _convertToPercent
         * @param value
         * @returns {number}
         * @private
         */
        _convertToPercent: function (value) {
            var val = 0, delta, k, i, l;

            //1st key added
            if (isNaN(this._range.min) || value == this._range.min) {
                this._range.min = value;
                val = 0;   //0%
            }
            //2nd key added
            else if (isNaN(this._range.max) || value == this._range.max) {
                if (value < this._range.min) {
                    val = 0;
                    this._range.max = this._range.min;
                    this._range.min = value;
                    this._keys[0] = 100;
                }
                else {
                    this._range.max = value;
                    val = 100; //100%
                }
            }

            else if (value > this._range.min && value < this._range.max) {
                delta = this._range.max - this._range.min;
                val = value * delta / 100;
            }

            else if (value < this._range.min) {
                delta = (this._range.max - value) / (this._range.max - this._range.min);

                //rescale the value for every following keys in the curve
                for (i = 0, l = this._keys.length; i < l; i++) {
                    k = this._keys[i];
                    k.value *= delta;
                }

                this._range.min = value;
                val = 0;   //0%
            }

            else if (value > this._range.max) {
                delta = value / this._range.max;

                //rescale the value for every previous keys in the curve
                for (i = 0, l = this._keys.length; i < l; i++) {
                    k = this._keys[i];
                    k.value /= delta;
                }

                this._range.max = value;

                val = 100;   //100%
            }

            this._range.delta = this._range.max - this._range.min;
            return val;
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
                nbFrameInSection = this._keys[k + 1].frame - this._keys[k].frame;
                this._numberOfFrameBetweenKeys.push(nbFrameInSection);
            }
        },

        /**
         * Compute the values for all the points on the curve
         * @method compute
         * @return {Array} list of computed values
         */
        compute: function () {
            this._computeNumberOfFrameBetweenKeys();
            this.values = this._interpolator.compute(this._keys, this._numberOfFrameBetweenKeys);
            return this.values;
        }
    }
);
