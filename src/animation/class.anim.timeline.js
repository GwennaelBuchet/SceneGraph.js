/**
 * Copyright (c) 2012  Capgemini Technology Services (hereinafter “Capgemini”)
 *
 * License/Terms of Use
 *
 * Permission is hereby granted, free of charge and for the term of intellectual property rights on the Software, to any
 * person obtaining a copy of this software and associated documentation files (the "Software"), to use, copy, modify
 * and propagate free of charge, anywhere in the world, all or part of the Software subject to the following mandatory conditions:
 *
 *   •	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 *  Any failure to comply with the above shall automatically terminate the license and be construed as a breach of these
 *  Terms of Use causing significant harm to Capgemini.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  Except as contained in this notice, the name of Capgemini shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Capgemini.
 *
 *  These Terms of Use are subject to French law.
 *
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 * @date 10/08/12
 *
 * Purpose :
 * A timeline is a set of animation keys (CSSGAnimationKey) for one attribute of one node.
 *
 * @param parentNode A handle to the node playing the animation
 * @param attribute A string representing the attribute to be animated (eg: "position.x", "rotation.angle", "fill", ...)
 * @param method A string representing the interpolation method
 */
var CGSGTimeline = Object.extend(
	{
		initialize : function (parentNode, attribute, method) {

			/////// @public ////////
			//the animated nodes
			this.parentNode = parentNode;
			//A string representing the attribute to be animated (eg: "position.x", "rotation.angle", "fill", ...)
			this.attribute = attribute;

			if (arguments.length == 3) {
				this.method = method;
			}
			else {
				this.method = "linear";
			}
			//list of the [frame, value] pairs for the animation
			//the index of the list begins at 0, not at the first key frame
			this.listValues = [];

			////// @private ////////
			//List of the animation keys
			this._listKeys = [];
			//precomputed values for animation since first key to latest-1.
			//Each  cell contains the step, in pixel, from the previous key to the next one
			this._listSteps = [];

			//events
			this.onAnimationStart = null;
			this.onAnimationEnd = null;
		},

		/**
		 * @public
		 * Add a new animation key frame to the timeline and sort the timeline by frame number
		 * @param frame
		 * @param value
		 */
		addKey : function (frame, value) {
			this._listKeys.push(new CGSGAnimationKey(frame, value));
			this.sortByFrame();

			if (this.getNbKeys() > 1) {
				this._computeStepsValues();
			}
		},

		/**
		 * Remove the key at the specified frame
		 * @param frame
		 */
		removeKey : function (frame) {
			var key = null;
			for (var k = 0; k < this._listKeys.length - 1; k++) {
				if (this._listKeys[k].frame == frame) {
					key = this._listKeys[k];
					break;
				}
			}
			/*this._listKeys = */
			this._listKeys.without(key);

			this._listSteps.clear();
			if (this.getNbKeys() > 1) {
				this._computeStepsValues();
			}

			if (this.listValues.length > 0) {
				this.listValues.clear();
				this.computeValues(0);
			}
		},

		/**
		 * @public
		 * Remove all keys and values
		 */
		removeAll : function () {
			this.listValues.clear();
			this._listKeys.clear();
			this._listSteps.clear();
		},

		/**
		 * @public
		 */
		_computeStepsValues : function () {
			var nbFrameInSection = 0;
			var totalDistance = 0;
			for (var k = 0; k < this._listKeys.length - 1; k++) {
				nbFrameInSection = this._listKeys[k + 1].frame - this._listKeys[k].frame;
				totalDistance = this._listKeys[k + 1].value - this._listKeys[k].value;
				this._listSteps.push(totalDistance / nbFrameInSection);
			}
		},

		/**
		 * @public
		 * @return the number of keys in this timeline
		 */
		getNbKeys : function () {
			return this._listKeys.length;
		},

		/**
		 * @public
		 * Sort the list of keys by frame number
		 */
		sortByFrame : function () {
			this._listKeys.sort(function (a, b) {
				return a.frame - b.frame;
			});
		},

		/**
		 * @public
		 * Compute all the values (steps) for the animation of this timeline
		 * @param fromFrame first frame at which one the computing must start
		 * @param method interpolation method : "linear", "catmullrom". If method is specified, it replace the method for
		 *  this timline instance
		 */
		computeValues : function (fromFrame, method) {
			if (arguments.length == 2) {
				this.method = method;
			}
			//empy the list of values
			this.listValues = [];

			var nbKeys = this.getNbKeys();

			if (nbKeys <= 1) {
				return;
			}

			var value = 0;
			var duration = 0;
			var f = 0;
			var v = 0;
			for (var k = 0; k < nbKeys - 1; ++k) {
				duration = this._listKeys[k + 1].frame - this._listKeys[k].frame;
				for (f = 0; f <= duration; ++f) {
					value =
					this.computeValue(k, this._listKeys[k].frame + f, method);
					this.listValues[v++] = value;
				}
			}
		},

		/**
		 * @private
		 * Compute animated value for one frame between key ay indeex keyIndex and keyIndex+1
		 * @param keyIndex
		 * @param frame
		 * @param method
		 */
		computeValue : function (keyIndex, frame, method) {
			var previousKey = this._listKeys[keyIndex];
			var nextKey = this._listKeys[keyIndex + 1];

			if (frame == previousKey.frame) {
				return previousKey.value;
			}
			if (frame == nextKey.frame) {
				return nextKey.value;
			}

			var currentStep = frame - previousKey.frame;
			if (method == "linear") {
				return currentStep * this._listSteps[keyIndex] + previousKey.value;
			}
		},

		/**
		 * @return the first key frame of this timeline
		 */
		getFirstKey : function () {
			if (this.getNbKeys() == 0) {
				return null;
			}

			return this._listKeys[0];
		},

		/**
		 * @return the last key frame of this timeline
		 */
		getLastKey : function () {
			if (this.getNbKeys() == 0) {
				return null;
			}

			return this._listKeys[this.getNbKeys() - 1];
		},

		/**
		 * @public
		 * @param frame the frame binded with the returned value
		 * @return the interpolated value of the attribute at the specified frame
		 * If no key is defined, return undefined
		 * If there is only one key, return it's value
		 * If the frame is before the first key, return the first key value
		 * If the frame is after the last key, return the last key value
		 */
		getValue : function (frame) {
			var nbKeys = this.getNbKeys();
			//if no key : no animation
			if (nbKeys == 0) {
				return undefined;
			}

			var duration = frame - this._listKeys[0].frame;

			//if before first key or after latest key, return no value
			if (duration < 0) {
				return undefined;
			}
			if (frame > this._listKeys[nbKeys - 1].frame) {
				var value = this.getLastKey().value;
				this.listValues.clear();
				this._listKeys.clear();
				//just left the last key in this timeline
				this._listKeys.push(new CGSGAnimationKey(frame, value));

				return undefined;
			}

			//if there is only 1 key or if the frame is before the first key, get its value
			if (nbKeys == 1) {
				return this._listKeys[0].value;
			}

			//if no value is precomputed, compute it now
			if (this.listValues.length == 0) {
				//get keys from which the frame is between
				var previousKeyIndex = 0;
				for (var k = 1; k < nbKeys; k++) {
					if (frame < this._listKeys[k].frame) {
						previousKeyIndex = k - 1;
						break;
					}
				}
				return this.computeValue(previousKeyIndex, frame, this.method);
			}

			//the index of the list of keys start at 0, so we have to shift to the frame of the first key
			return this.listValues[duration];
		},

		/**
		 * @return the precomputed array of values for this timeline
		 */
		exportValues : function () {
			return this.listValues.clone();
		},

		/**
		 * Import new precomputed values for this timeline.
		 * The number of values must match the number of frame defined by the keys of this timeline
		 * @param newValues Array of new values
		 */
		importValues : function (newValues) {
			this.listValues.clear();
			this.listValues = newValues.clone();
		}
	}
);
