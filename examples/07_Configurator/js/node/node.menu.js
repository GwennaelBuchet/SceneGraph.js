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
 * The bottom menu
 * @class MenuNode
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} width Relative dimension
 * @type {*}
 */
var MenuNode = CGSGNode.extend(
	{
		initialize : function (x, width) {
			//call the constructor of CGSGNode
			this._super(x, cgsgCanvas.height - MENU_HEIGHT, width, MENU_HEIGHT);

			/**
			 * Define the class type.
			 * Not mandatory but very useful, as Javascript does not have a mechanism to manage the type of class
			 * @type {String}
			 */
			this.classType = "MenuNode";

			//fake canvas to pre-render static display
			this._tmpCanvas = null;
			this._initShape();
		},

		/**
		 * Pre-render the cloud into a temp canvas to optimize the perfs
		 * @method initShape
		 * @private
		 */
		_initShape : function () {
			this._tmpCanvas = document.createElement('canvas');
			this._tmpCanvas.width = this.dimension.width;
			this._tmpCanvas.height = this.dimension.height;
			var tmpContext = this._tmpCanvas.getContext('2d');

			//background
			//draw this zone
			tmpContext.fillStyle = "#cccccc";
			tmpContext.lineWidth = 0;
			tmpContext.fillRect(0, 0, this.dimension.width, this.dimension.height);

		},

		/**
		 * Custom rendering. Must be defined to allow the traverser to render this node
		 * @method render
		 * @protected
		 * @override
		 * @param {CanvasRenderingContext2D} context the context into render the node
		 * */
		render : function (context) {
			//call this before your custom rendering
			this.beforeRender(context);

			context.globalAlpha = this.globalAlpha;

			//render the pre-rendered canvas
			context.drawImage(this._tmpCanvas, 0, 0);

			//call this after your custom rendering
			this.afterRender(context);
		},

		/**
		 * Return a copy of this node
		 * @method copy
		 * @return {BackgroundNode} a copy of this node
		 */
		copy : function () {
			var node = new BackgroundNode(this.position.x, this.position.y, this.dimension.width,
			                              this.dimension.height);
			//call the super method
			node = this._super(node);

			return node;
		}
	}
);
