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
 * A CGSGNodeRegularPolygon represent a basic Regular Polygon.
 * By default, the pickNodeMethod used to detect the node under the mice is CGSGPickNodeMethod.GHOST.
 * If you don't need precision on detection on your circles, just change the property to pickNodeMethod.REGION.
 *
 * @class CGSGNodeRegularPolygon
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} sides number of sides on polygon
 * @param {Number} radius radius of polygon
 * @type {CGSGNodeRegularPolygon}
 * @author 
 */
var CGSGNodeRegularPolygon = CGSGNode.extend(
	{
		initialize: function (sides, radius) {

			/**
			 * @property sides
			 * @type {Number}
			 * @private
			 */
			this._sides = sides;

			/**
			 * @property radius
			 * @type {Number}
			 * @private
			 */
			this._radius = radius;
			
			this._super(0, 0, this._radius * 2.0, this._radius * 2.0);

			/**
			 * Color  to fill the star
			 * @property color
			 * @default "#444444"
			 * @type {String}
			 */
			this.color = "#444444";
			/**
			 * Color to stroke the star
			 * @property lineColor
			 * @default "#222222"
			 * @type {String}
			 */
			this.lineColor = "#222222";
			/**
			 * Width of the line that stroke the star.
			 * Let 0 if you don't want to stroke the star.
			 * @property lineWidth
			 * @default 0
			 * @type {Number}
			 */
			this.lineWidth = 0;

			this.pickNodeMethod = CGSGPickNodeMethod.GHOST;
			this.isProportionalResize = true;

			/**
			 * @property classType
			 * @readonly
			 * @type {String}
			 */
			this.classType = "CGSGNodeRegularPolygon";
		},

		/**
		 * Set the new radius and compute new dimension of the Polygon
		 * @method setRadius
		 * @param {Number} radius
		 */
		setRadius: function (radius) {
			this._radius = radius;
			this.dimension.width = this._radius * 2.0;
			this.dimension.height = this.dimension.width;
		},
		
		/**
		 * Set the number of sides
		 * @method setSides
		 * @param {Number} sides
		 */
		setSides: function (sides) {
			this._sides = sides;
		},

		/**
		 * Get the radius
		 * @method getRadius

		 */
		getRadius: function () {
			return this._radius;
		},
		
		/**
		 * Get the number of sides
		 * @method getSides
		 */
		getSides: function () {
			return this._sides;
		},
		
		/**
		 * Custom rendering
		 * @method render
		 * @protected
		 * @param {CanvasRenderingContext2D} context the context into render the node
		 * */
		render: function (context) {
			//save current state
			this.beforeRender(context);

			this.doRenderLogic(context);

			//restore state
			this.afterRender(context);
		},
		
		/**
         * Render the Regular Polygon
         * @public
         * @method doRenderLogic
         * @param {CanvasRenderingContext2D} context the context into render the node
        */	
		doRenderLogic: function (context) {
			context.beginPath();
			context.globalAlpha = this.globalAlpha;
			
			context.moveTo(0 + this._radius, 0);
            for(var i = 1; i < this._sides; i++) {
				var x = this._radius * Math.sin(i * 2 * Math.PI / this._sides);
				var y = -1 * this._radius * Math.cos(i * 2 * Math.PI / this._sides);
				context.lineTo(x + this._radius, y + this._radius);
            }
			context.closePath();			
			context.fillStyle = this.color;
			context.fill();
			
			if (this.lineWidth > 0) {
				context.lineWidth = this.lineWidth;
				context.strokeStyle = this.lineColor;
				context.stroke();
			}	
		},
		
		/**
		 * Replace current dimension by these new ones and compute new radius
		 * @method resizeTo
		 * @param {Number} newWidth
		 * @param {Number} newHeight
		 * */
		resizeTo: function (newWidth, newHeight) {
			this.dimension.resizeTo(newWidth, newHeight);

			this._computeResizedRadius();
		},

		/**
		 * Multiply current dimension by these new ones
		 * @method resizeTBy
		 * @param {Number} widthFactor
		 * @param {Number} heightFactor
		 * */
		resizeBy: function (widthFactor, heightFactor) {
			this.dimension.resizeBy(widthFactor, heightFactor);

			this._computeResizedRadius();
		},

		/**
		 * Increase/decrease current dimension with adding values
		 * @method resizeWith
		 * @param {Number} width
		 * @param {Number} height
		 * */
		resizeWith: function (width, height) {
			this.dimension.resizeWith(width, height);

			this._computeResizedRadius();
		},

		/**
		 * @method _computeResizedRadius
		 * @private
		 */
		_computeResizedRadius: function () {
			this._radius = Math.min(this.dimension.width, this.dimension.height) / 2.0;
		},

		/**
		 * @method renderGhost
		 * @param {CanvasRenderingContext2D} ghostContext the context into render the node
		 */
		renderGhost: function (ghostContext) {
			//save current state
			this.beforeRenderGhost(ghostContext);

			if (this.globalAlpha > 0) {
				this.doRenderLogic(ghostContext);
			}

			//restore state
			this.afterRenderGhost(ghostContext);
		},

		/**
		 * @method copy
		 * @return {CGSGNodeRegularPolygon} a copy of this node
		 */
		copy: function () {
			var node = new CGSGNodeRegularPolygon(this._sides, this._radius);
			//call the super method
			node = this._super(node);

			node.color = this.color;
			node.lineColor = this.lineColor;
			node.lineWidth = this.lineWidth;
			return node;
		}
	}
);
