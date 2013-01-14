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
 * */

"use strict";

/**
 * A Position object
 * @class CGSGPosition
 * @extends CGSGVector2D
 * @constructor
 * @param {Number} x X value
 * @param {Number} y Y value
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 * @type {CGSGPosition}
 */
var CGSGPosition = CGSGVector2D.extend(
	{
		initialize: function (x, y) {
			this._super(x, y);
		},

		/**
		 * return a new object with these attributes
		 * @public
		 * @method copy
		 * @return {CGSGPosition}
		 */
		copy: function () {
			return new CGSGPosition(this.x, this.y);
		},

		/**
		 * Replace current relative position by this new one
		 * @method translateTo
		 * @param {Number} newX
		 * @param {Number} newY
		 */
		translateTo: function (newX, newY) {
			this.x = newX;
			this.y = newY;
		},

		/**
		 * Add new coordinate to the current relative one
		 * @public
		 * @method translateWith
		 * @param {Number} x
		 * @param {Number} y
		 */
		translateWith: function (x, y) {
			this.x += x;
			this.y += y;
		},

		/**
		 * Add new coordinate to the current relative one
		 * @public
		 * @method translateBy
		 * @param {Number} x
		 * @param {Number} y
		 */
		translateBy: function (x, y) {
			this.x *= x;
			this.y *= y;
		}
	}
);

/**
 * A Scale object
 * @class CGSGScale
 * @extends CGSGPosition
 * @constructor
 * @param {Number} x X value
 * @param {Number} y Y value
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 * @type {CGSGScale}
 */
var CGSGScale = CGSGPosition.extend(
	{
		initialize: function (x, y) {
			this._super(x, y);
		}
	}
);

/**
 * A Rotation object
 * @class CGSGRotation
 * @extends Object
 * @constructor
 * @param {Number} angle Angle value
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 * @type {CGSGRotation}
 */
var CGSGRotation = CGSGObject.extend(
	{
		initialize: function (angle) {
			this.angle = angle;
		},

		/**
		 * return a new object with these attributes
		 * @public
		 * @method copy
		 * @return {CGSGRotation}
		 */
		copy: function () {
			return new CGSGRotation(this.angle);
		},

		/**
		 * Replace current angle by this new one
		 * @public
		 * @method rotateTo
		 * @param {Number} newAngle
		 */
		rotateTo: function (newAngle) {
			this.angle = newAngle;
		},

		/**
		 * Multiply this angle by this factor
		 * @public
		 * @method rotateBy
		 * @param {Number} rotateFactor
		 */
		rotateBy: function (rotateFactor) {
			this.multiply(rotateFactor);
		},

		/**
		 * Add this angle to the current one
		 * @public
		 * @method rotateWith
		 * @param {Number} angle
		 */
		rotateWith: function (angle) {
			this.add(angle);
		},

		/**
		 * Add this angle to the current one
		 * @public
		 * @method add
		 * @param {Number} angle
		 */
		add: function (angle) {
			this.angle += angle;
		},

		/**
		 * Substract this angle to the current one
		 * @public
		 * @method substract
		 * @param {Number} angle
		 */
		substract: function (angle) {
			this.angle -= angle;
		},

		/**
		 * Multiply this angle to the current one
		 * @public
		 * @method multiply
		 * @param {Number} angle
		 */
		multiply: function (angle) {
			this.angle *= angle;
		}
	}
);

/**
 * A Dimension object
 * @class CGSGDimension
 * @extends CGSGVector2D
 * @constructor
 * @param {Number} width
 * @param {Number} height
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 * @type {CGSGDimension}
 */
var CGSGDimension = CGSGVector2D.extend(
	{
		initialize: function (width, height) {

			this._super(width, height);

			/**
			 * Alias to the x attribute
			 * @property width
			 * @type {Number}
			 */
			this.width = this.x;
			/**
			 * Alias to the y attribute
			 * @property height
			 * @type {Number}
			 */
			this.height = this.y;
		},

		/**
		 * Return a new object with these attributes
		 * @method copy
		 * @return {CGSGDimension}
		 */
		copy: function () {
			return new CGSGDimension(this.width, this.height);
		},

		/**
		 * Replace current dimension by these new ones
		 * @method resizeTo
		 * @param {Number} newWidth
		 * @param {Number} newHeight
		 * */
		resizeTo: function (newWidth, newHeight) {
			if (newWidth >= 0) {
				this.width = newWidth;
			}
			if (newHeight >= 0) {
				this.height = newHeight;
			}
		},

		/**
		 * Multiply current dimension by these new ones
		 * @method resizeBy
		 * @param {Number} widthFactor
		 * @param {Number} heightFactor
		 * */
		resizeBy: function (widthFactor, heightFactor) {
			if (widthFactor >= 0) {
				this.width *= widthFactor;
			}
			if (heightFactor >= 0) {
				this.height *= heightFactor;
			}
		},

		/**
		 * Increase/decrease current dimension with adding values
		 * @method resizeWith
		 * @param {Number} width
		 * @param {Number} height
		 * */
		resizeWith: function (width, height) {
			if (this.width + width >= 0) {
				this.width += width;
			}
			if (this.height + height >= 0) {
				this.height += height;
			}
		}
	}
);

/**
 * A Region object encapsulates a CGSGPosition and a CGSGDimension
 * @class CGSGRegion
 * @extends Object
 * @constructor
 * @param {Number} x Position on X
 * @param {Number} y Position on Y
 * @param {Number} width Dimension on Width
 * @param {Number} height Dimension on Height
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 * @type {CGSGRegion}
 */
var CGSGRegion = CGSGObject.extend(
	{
		initialize: function (x, y, width, height) {
			/**
			 * @property position
			 * @type {CGSGPosition}
			 */
			this.position = new CGSGPosition(x, y);
			/**
			 * @property dimension
			 * @type {CGSGDimension}
			 */
			this.dimension = new CGSGDimension(width, height);
		},

		/**
		 * @method copy
		 * @return {CGSGRegion}
		 */
		copy: function () {
			return new CGSGRegion(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
		},

		/**
		 * @method add
		 * @param region {CGSGRegion}
		 */
		add: function (region) {
			this.position.translateWith(region.position.x, region.position.y);
			this.dimension.resizeWith(region.dimension.width, region.dimension.height);
		},

		/**
		 * @method substract
		 * @param {CGSGRegion} region
		 */
		substract: function (region) {
			this.position.translateWith(-region.position.x, -region.position.y);
			this.dimension.resizeWith(-region.dimension.width, -region.dimension.height);
		}
	}
);

