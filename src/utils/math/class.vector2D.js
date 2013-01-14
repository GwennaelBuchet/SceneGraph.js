/*
 * Copyright (c) 2012  Capgemini Technology Services (hereinafter “Capgemini”)
 *
 * License/Terms of Use
 *
 * Permission is hereby granted, free of charge and for the term of intellectual property rights on the Software, to any
 * person obtaining a copy of this software and associated documentation files (the "Software"), to use, copy, modify
 * and propagate free of charge, anywhere in the world, all or part of the Software subject to the following mandatory conditions:
 *
 *   •    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 *  Any failure to comply with the above shall automatically terminate the license and be construed as a breach of these
 *  Terms of Use causing significant harm to Capgemini.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  Except as contained in this notice, the name of Capgemini shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Capgemini.
 *
 *  These Terms of Use are subject to French law.
 */

/**
 * A 2D vector object
 * @module Math
 * @class CGSGVector2D
 * @extends {Object}
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @type {CGSGVector2D}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGVector2D = CGSGObject.extend(
	{
		initialize: function (x, y) {
			/**
			 * @property x
			 * @type {Number}
			 */
			this.x = x;
			/**
			 * @property y
			 * @type {Number}
			 */
			this.y = y;
		},

		/**
		 * @public
		 * @method copy
		 * @return {CGSGVector2D} a new CGSGVector2D, clone of this one
		 */
		copy: function () {
			return new CGSGVector2D(this.x, this.y);
		},

		/**
		 * add to this vector, the value passed in parameter
		 * @public
		 * @method add
		 * @param {CGSGVector2D} vector
		 */
		add: function (vector) {
			this.x += vector.x;
			this.y += vector.y;
		},

		/**
		 * substract to this vector, the value passed in parameter
		 * @public
		 * @method substract
		 * @param {CGSGVector2D} vector
		 */
		substract: function (vector) {
			this.x -= vector.x;
			this.y -= vector.y;
		},

		/**
		 * multiply to this vector, the value passed in parameter
		 * @public
		 * @method multiply
		 * @param {CGSGVector2D} vector
		 */
		multiply: function (vector) {
			this.x *= vector.x;
			this.y *= vector.y;
		},

		/**
		 * divide to this vector, the value passed in parameter
		 * @public
		 * @method divide
		 * @param {CGSGVector2D} vector
		 */
		divide: function (vector) {
			this.x /= vector.x;
			this.y /= vector.y;
		},

		/**
		 * Multiply x and y by f
		 * @public
		 * @method multiplyByFloat
		 * @param {Number} f
		 */
		multiplyByFloat: function (f) {
			this.x *= f;
			this.y *= f;
		},

		/**
		 * Divide x and y by f
		 * @public
		 * @method divideByFloat
		 * @param {Number} f
		 */
		divideByFloat: function (f) {
			this.x /= f;
			this.y /= f;
		},

		/**
		 * Compute the euclidian distance between this vector and the one passe in parameter
		 * @public
		 * @method getDistance
		 * @param {CGSGVector2D} vector
		 * @return {Number}
		 */
		getDistance: function (vector) {
			return Math.sqrt(
				Math.pow(this.x - vector.x, 2) +
				Math.pow(this.y - vector.y, 2)
			);
		},

		/**
		 * rotate this vector around its origin
		 * @public
		 * @method rotate
		 * @param {Number} angle
		 */
		rotate: function (angle) {
			var ca = Math.cos(angle);
			var sa = Math.sin(angle);
			this.x = this.x * ca + this.y * sa;
			this.y = this.x * sa - this.y * ca;
		},

		/**
		 * @public
		 * @method getLength
		 * @return {Number}
		 */
		getLength: function () {
			return Math.sqrt((this.x * this.x) + (this.y * this.y));
		},

		/**
		 * @public
		 * @method getSquaredLength
		 * @return {Number}
		 */
		getSquaredLength: function () {
			return (this.x * this.x) + (this.y * this.y);
		},

		/**
		 * Normalize this vector
		 * @public
		 * @method normalize
		 */
		normalize: function () {
			var scalefactor;
			var length = this.getLength();

			//return if length is 1 or 0
			if (length == 1 || length == 0) {
				return;
			}

			scalefactor = 1.0 / length;
			this.x *= scalefactor;
			this.y *= scalefactor;
		}
	}
);

