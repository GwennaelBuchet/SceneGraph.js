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
 * @date 09/08/2012
 *
 * Purpose:
 * A vector 2D encapsulate 2 numbers : x, y
 *
 */
var CGSGVector2D = Object.extend(
	{
		initialize : function (x, y) {
			///// @public //////
			this.x = x;
			this.y = y;
		},

		/**
		 * @public
		 *
		 * @return a new CGSGVector2D, clone of this one
		 */
		copy : function () {
			return new CGSGVector2D(this.x, this.y);
		},

		/**
		 * @public
		 * add to this vector, the value passed in parameter
		 * @param vector
		 */
		add : function (vector) {
			this.x += vector.x;
			this.y += vector.y;
		},

		/**
		 * @public
		 * substract to this vector, the value passed in parameter
		 * @param vector
		 */
		substract : function (vector) {
			this.x -= vector.x;
			this.y -= vector.y;
		},

		/**
		 * @public
		 * multiply to this vector, the value passed in parameter
		 * @param vector
		 */
		multiply : function (vector) {
			this.x *= vector.x;
			this.y *= vector.y;
		},

		/**
		 * @public
		 * divide to this vector, the value passed in parameter
		 * @param vector
		 */
		divide : function (vector) {
			this.x /= vector.x;
			this.y /= vector.y;
		},

		multiplyByFloat : function (f) {
			this.x *= f;
			this.y *= f;
		},

		divideByFloat : function (f) {
			this.x /= f;
			this.y /= f;
		},

		/**
		 * @public
		 * @param vector
		 * @return the euclidian distance between this vector and the one passe in parameter
		 */
		getDistance : function (vector) {
			return Math.sqrt(
				Math.pow(this.x - vector.x, 2) +
				Math.pow(this.y - vector.y, 2)
			);
		},

		/**
		 * rotate this vector around its origin
		 * @param angle
		 */
		rotate : function (angle) {
			var ca = Math.cos(angle);
			var sa = Math.sin(angle);
			this.x = this.x * ca + this.y * sa;
			this.y = this.x * sa - this.y * ca;
		},

		/**
		 *
		 * @return {Number}
		 */
		getLength : function () {
			return Math.sqrt((this.x * this.x) + (this.y * this.y));
		},

		/**
		 *
		 * @return {*}
		 */
		getSquaredLength : function () {
			return (this.x * this.x) + (this.y * this.y);
		},

		normalize : function () {
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

