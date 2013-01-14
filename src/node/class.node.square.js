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
 * A CGSGNodeSquare represent a basic square
 *
 * @class CGSGNodeSquare
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on X
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @type {CGSGNodeSquare}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGNodeSquare = CGSGNode.extend(
	{
		initialize: function (x, y, width, height) {
			this._super(x, y, width, height);

			/**
			 * Color  to fill the square
			 * @property color
			 * @default "#444444"
			 * @type {String}
			 */
			this.color = "#444444";
			/**
			 * Color to stroke the square
			 * @property lineColor
			 * @default "#222222"
			 * @type {String}
			 */
			this.lineColor = "#222222";
			/**
			 * Width of the line that stroke the square.
			 * Let 0 if you don't want to stroke the square.
			 * @property lineWidth
			 * @default 0
			 * @type {Number}
			 */
			this.lineWidth = 0;

			/**
			 * @property classType
			 * @readonly
			 * @type {String}
			 */
			this.classType = "CGSGNodeSquare";
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

			context.globalAlpha = this.globalAlpha;
			//draw this zone
			context.fillStyle = this.color;

			//we draw the rect at (0,0) because we have already translated the context to the correct position
			context.fillRect(0, 0, this.dimension.width, this.dimension.height);

			if (this.lineWidth > 0) {
				context.strokeStyle = this.lineColor;
				context.lineWidth = this.lineWidth;
				context.strokeRect(0, 0, this.dimension.width, this.dimension.height);
			}

			//restore state
			this.afterRender(context);
		},

		/**
		 * @method copy
		 * @return {CGSGNodeSquare} a copy of this node
		 */
		copy: function () {
			var node = new CGSGNodeSquare(this.position.x, this.position.y, this.dimension.width,
										  this.dimension.height);
			//call the super method
			node = this._super(node);

			node.color = this.color;
			node.lineColor = this.lineColor;
			node.lineWidth = this.lineWidth;
			return node;
		}
	}
);
