/*
 * Copyright (c) 2012  Capgemini Technology Services (hereinafter “Capgemini”)
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
		initialize: function (parentNode, attribute, method) {

			/**
			 * The animated nodes
			 * @property parentNode
			 * @type {CGSGNode}
			 */
			this.parentNode = parentNode;

			/**
			 * A string representing the attribute to be animated (eg: "position.x", "rotation.angle", "fill", ...)
			 * @property attribute
			 * @type {String}
			 */
			this.attribute = attribute;

			if (arguments.length === 3) {
				this.method = method;
			}
			else {
				this.method = "linear";
			}
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
			this._listSteps = [];

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
			this._listKeys.push(new CGSGAnimationKey(frame, value));
			this.sortByFrame();

			if (this.getNbKeys() > 1) {
				this._computeStepsValues();
			}

			this.listValues.clear();
		},

		/**
		 * Remove the key at the specified frame
		 * @method removeKey
		 * @param frame {Number} Must be an integer value.
		 */
		removeKey: function (frame) {
			var key = null, k = 0;
			for (k; k < this._listKeys.length - 1; k++) {
				if (this._listKeys[k].frame === frame) {
					key = this._listKeys[k];
					break;
				}
			}
			this._listKeys.without(key);

			this._computeStepsValues();

			if (this.listValues.length > 0) {
				this.computeValues(0);
			}
		},

		/**
		 * Remove all keys and values
		 * @public
		 * @method removeAll
		 */
		removeAll: function () {
			this.listValues.clear();
			this._listKeys.clear();
			this._listSteps.clear();
		},

		/**
		 * Compute the number of steps between all keys, 2 by 2
		 * @private
		 * @method _computeStepsValues
		 */
		_computeStepsValues: function () {
			this._listSteps.clear();
			var nbFrameInSection = 0, totalDistance = 0, k = 0;
			for (k; k < this._listKeys.length - 1; k++) {
				nbFrameInSection = this._listKeys[k + 1].frame - this._listKeys[k].frame;
				totalDistance = this._listKeys[k + 1].value - this._listKeys[k].value;
				this._listSteps.push(totalDistance / nbFrameInSection);
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
		sortByFrame: function () {
			this._listKeys.sort(function (a, b) {
				return a.frame - b.frame;
			});
		},

		/**
		 * Compute all the values (steps) for the animation of this timeline
		 * @public
		 * @method computeValues
		 * @param fromFrame {Number} first frame at which one the computing must start. Must be an integer value.
		 * @param method {String} interpolation method : "linear"
		 *  for this timeline instance
		 */
		computeValues: function (fromFrame, method) {
			if (arguments.length === 2) {
				this.method = method;
			}
			//empty the list of values
			this.listValues.clear();

			var nbKeys = this.getNbKeys();

			if (nbKeys <= 1) {
				return;
			}

			var duration = 0, f = 0, v = 0, k = 0;
			for (k; k < nbKeys - 1; ++k) {
				duration = this._listKeys[k + 1].frame - this._listKeys[k].frame;
				for (f = 0; f <= duration; ++f) {
					this.listValues[v++] = this.computeValue(k, this._listKeys[k].frame + f, method);
				}
			}
		},

		/**
		 * Compute animated value for one frame between key ay index keyIndex and keyIndex+1
		 * @private
		 * @method computeValue
		 * @param keyIndex {Number} Must be an integer value.
		 * @param frame {Number} Must be an integer value.
		 * @param method {String} = "linear"
		 * @return {*} Object with 2 properties : frame and value, or undefined if keyIndex < 0
		 */
		computeValue: function (keyIndex, frame, method) {
			if (keyIndex < 0) {
				return undefined;
			}
			var previousKey = this._listKeys[keyIndex];
			var nextKey = this._listKeys[keyIndex + 1];

			if (frame === previousKey.frame) {
				return {frame: frame, value: previousKey.value};
			}
			if (frame === nextKey.frame) {
				return {frame: frame, value: nextKey.value};
			}

			var currentStep = frame - previousKey.frame;
			if (method === "linear") {
				return {frame: frame, value: currentStep * this._listSteps[keyIndex] + previousKey.value};
			}

			return undefined;
		},

		/**
		 * @method getFirstKey
		 * @return {CGSGAnimationKey} the first key frame of this timeline
		 */
		getFirstKey: function () {
			if (this.getNbKeys() === 0) {
				return null;
			}

			return this._listKeys[0];
		},

		/**
		 * @method getLastKey
		 * @return {CGSGAnimationKey} the last key frame of this timeline
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
		 * @return {Number} the interpolated value of the attribute at the specified frame
		 * If no key is defined, return undefined
		 * If there is only one key, return it's value
		 * If the frame is before the first key, return the first key value
		 * If the frame is after the last key, return the last key value
		 */
		getValue: function (frame) {
			var nbKeys = this.getNbKeys();

			//if no keys : no animation
			if (nbKeys === 0 && this.listValues.length === 0) {
				return undefined;
			}

			//I have keys, but no precomputed values, so compute value for this frame
			if (this.listValues.length === 0) {
				//get keys from which the frame is between
				var previousKeyIndex = -1;
				if (frame < this._listKeys[0].frame) {
					return undefined;
				}
				var k;
				for (k = 1; k < nbKeys; k++) {
					if (frame < this._listKeys[k].frame) {
						previousKeyIndex = k - 1;
						break;
					}
				}
				return this.computeValue(previousKeyIndex, frame, this.method);
			}

			//Here, I have precomputed values

			//if frame < first frame, return no value
			if (frame < this.listValues[0].frame) {
				return undefined;
				//return this.listValues[0];
			}

			//if frame > last frame (ie last key), return no value
			if (frame >= this.listValues[this.listValues.length - 1].frame) {
				//return undefined;
				return this.listValues[this.listValues.length - 1];
			}

			var i;
			//search for value at the frame
			for (i = 0; i < this.listValues.length; i++) {
				if (this.listValues[i].frame === frame) {
					return this.listValues[i];
				}
			}

			return undefined;
		},

		/**
		 * Return the precomputed array of values for this timeline
		 * @method exportValues
		 * @return {Array}
		 */
		exportValues: function () {
			if (this.listValues.length === 0) {
				this.computeValues(cgsgCurrentFrame, this.method);
			}

			var values = [], i;
			for (i = 0; i < this.listValues.length; i++) {
				values.push(this.listValues[i].value);
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
			this.listValues.clear();
			var i;
			for (i = 0; i < newValues.length; i++) {
				this.listValues.push({frame: startFrame + i, value: newValues[i]});
			}
		}
	}
);
