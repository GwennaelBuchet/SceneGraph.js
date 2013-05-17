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
 * Static class that encapsulates some useful methods.
 * @module Math
 * @main Math
 * @static
 * @class CGSGMath
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGMath = {
	/**
	 * PI x 2
	 * @static
	 * @property PI2
	 */
	PI2 : 6.28318530718, //Math.PI * 2.0,

	/**
	 * Convert degree to radian
	 * @method deg2rad
	 * @static
	 * @param {Number} angle
	 * @return {Number} The radian value
	 */
	deg2rad : function (angle) {
		return (angle / 180.0) * Math.PI;
	},

	/**
	 * Convert radian to degree
	 * @method rad2deg
	 * @static
	 * @param {Number} angle
	 * @return {Number} The degree value
	 */
	rad2deg : function (angle) {
		return angle * 57.29577951308232;
	},

	/**
	 * Compute the rounded integer of n
	 * @method fixedPoint
	 * @static
	 * @param {Number} n
	 * @return {Number} The integer value
	 */
	fixedPoint : function (n) {
		return (0.5 + n) << 0;
	},

	/**
	 * Linear interpolation between 'from' and 'to'
	 * @method lerp
	 * @static
	 * @param {Number} from
	 * @param {Number} to
	 * @param {Number} weight Percentage to apply to the first value
	 * @return {Number} The interpolated value
	 */
	lerp : function (from, to, weight) {
		return from + (to - from) * weight;
	}
};
