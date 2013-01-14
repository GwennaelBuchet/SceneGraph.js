/**
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
 * Description here...
 * @class CGSGNodeTemplate
 * @extends CGSGNode
 * @module CustomNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on X
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @type {CGSGNodeTemplate}
 */
var CGSGNodeTemplate = CGSGNode.extend(
	{
		initialize: function (x, y, width, height /*, other parameters here */) {
			//call the constructor of CGSGNode
			this._super(x, y, width, height);

			/**
			 * Define the class type.
			 * Not mandatory but very useful, as Javascript does not have a mechanism to manage the type of class
			 * @type {String}
			 */
			this.classType = "CGSGNodeTemplate";

		},

		/**
		 * Custom rendering. Must be defined to allow the traverser to render this node
		 * @method render
		 * @protected
		 * @param {CanvasRenderingContext2D} context the context into render the node
		 * */
		render: function (context) {
			//call this before your custom rendering
			this.beforeRender(context);

			//your rendering here

			//call this after your custom rendering
			this.afterRender(context);
		},

		/**
		 * Return a copy of this node
		 * @method copy
		 * @return {CGSGNodeTemplate} a copy of this node
		 */
		copy: function () {
			var node = new CGSGNodeTemplate(this.position.x, this.position.y, this.dimension.width,
											this.dimension.height);
			//call the super method
			node = this._super(node);

			//node.color = this.color;
			//node.lineColor = this.lineColor;
			//node.lineWidth = this.lineWidth;
			return node;
		}
	}
);
