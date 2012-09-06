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
 * @date 02/08/2012
 *
 * Purpose:
 * A CGSGPosition
 * */
var CGSGPosition = CGSGVector2D.extend(
	{
		initialize : function (x, y) {
			this._super(x, y);
		},

		/**
		 * @public
		 * return a new object with these attributes
		 */
		copy : function () {
			return new CGSGPosition(this.x, this.y);
		},

		/**
		 * @public
		 * Replace current relative position by this new one
		 * */
		translateTo : function (newX, newY) {
			this.x = CGSGMath.fixedPoint(newX);
			this.y = CGSGMath.fixedPoint(newY);
		},

		/**
		 * @public
		 * Add new coordinate to the current relative one
		 * */
		translateWith : function (x, y) {
			this.x += x;
			this.y += y;
		},

		/**
		 * @public
		 * Add new coordinate to the current relative one
		 * */
		translateBy : function (x, y) {
			this.x *= x;
			this.y *= y;
		}
	}
);

/**
 * User: gbuchet
 * Date: 12/01/12
 * Time: 21:31
 *
 * Purpose:
 * A CGSGScale
 * */
var CGSGScale = CGSGPosition.extend(
	{
		initialize : function (x, y) {
			this._super(x, y);
		}
	}
);

/**
 * User: gbuchet
 * Date: 12/01/12
 * Time: 21:31
 *
 * Purpose:
 * A CGSGRotation
 * */
var CGSGRotation = Object.extend(
	{
		initialize : function (angle) {
			this.angle = angle;
		},

		/**
		 * @public
		 * return a new object with these attributes
		 */
		copy : function () {
			return new CGSGRotation(this.angle);
		},

		/**
		 * @public
		 * Replace current relative relativeRotation by this new one
		 * */
		rotateTo : function (newAngle) {
			this.angle = newAngle;
		},

		/**
		 * @public
		 * Multiply this relativeScale factor by the current relative relativeScale
		 * */
		rotateBy : function (rotateFactor) {
			this.multiply(rotateFactor);
		},

		/**
		 * @public
		 * Add this angle to the current relative relativeRotation
		 * */
		rotateWith : function (angle) {
			this.add(angle);
		},

		/**
		 * @public
		 * @param angle
		 */
		add : function (angle) {
			this.angle += angle;
		},

		/**
		 * @public
		 * @param angle
		 */
		substract : function (angle) {
			this.angle -= angle;
		},

		/**
		 * @public
		 * @param angle
		 */
		multiply : function (angle) {
			this.angle *= angle;
		}
	}
);

/**
 * User: gbuchet
 * Date: 12/01/12
 * Time: 21:31
 *
 * Purpose:
 * A CGSGDimension
 * */
var CGSGDimension = CGSGVector2D.extend(
	{
		initialize : function (width, height) {

			this._super(width, height);

			///// @public //////
			//alias to the x attribute
			this.width = this.x;
			//alias to the y attribute
			this.height = this.y;
		},

		/**
		 * @public
		 * return a new object with these attributes
		 */
		copy : function () {
			return new CGSGDimension(this.width, this.height);
		},

		/**
		 * @public
		 * Replace current dimension by these new ones
		 * */
		resizeTo : function (newWidth, newHeight) {
			if (newWidth > 0) {
				this.width = newWidth;
			}
			if (newHeight > 0) {
				this.height = newHeight;
			}
		},

		/**
		 * Multiply current dimension by these new ones
		 * */
		resizeBy : function (widthFactor, heightFactor) {
			if (widthFactor > 0) {
				this.width *= widthFactor;
			}
			if (heightFactor > 0) {
				this.height *= heightFactor;
			}
		},

		/**
		 * Increase/decrease current dimention with adding values
		 * */
		resizeWith : function (width, height) {
			if (this.width + width > 0) {
				this.width += width;
			}
			if (this.height + height > 0) {
				this.height += height;
			}
		}
	}
);

/**
 * User: gbuchet
 * Date: 12/01/12
 * Time: 21:31
 *
 * Purpose:
 * A CGSGRegion represent a region on the screen with a position and a dimension
 *
 * @param x
 * @param y
 * @param width
 * @param height
 * */
var CGSGRegion = Object.extend(
	{
		initialize : function (x, y, width, height) {
			///// @public //////
			this.position = new CGSGPosition(x, y);
			this.dimension = new CGSGDimension(width, height);
		},

		copy : function () {
			return new CGSGRegion(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
		},

		add : function (region) {
			this.position.translateWith(region.position.x, region.position.y);
			this.dimension.resizeWith(region.dimension.width, region.dimension.height);
		},

		substract : function (region) {
			this.position.translateWith(-region.position.x, -region.position.y);
			this.dimension.resizeWith(-region.dimension.width, -region.dimension.height);
		}
	}
);

