/*
 * Copyright (c) 2012  Gwennaël Buchet Technology Services (hereinafter “Gwennaël Buchet”)
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
 *  Terms of Use causing significant harm to Gwennaël Buchet.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  Except as contained in this notice, the name of Gwennaël Buchet shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Gwennaël Buchet.
 *
 *  These Terms of Use are subject to French law.
 */

/**
 * The background of the scene
 * @class BackgroundNode
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on X
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @type {*}
 */
var BackgroundNode = CGSGNode.extend(
	{
		initialize: function (x, y, width, height) {
			//call the constructor of CGSGNode
			this._super(x, y, width, height);

			/**
			 * Define the class type.
			 * Not mandatory but very useful, as Javascript does not have a mechanism to manage the type of class
			 * @type {String}
			 */
			this.classType = "BackgroundNode";

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

			// create linear gradient
			var gradient = context.createLinearGradient(0, 0, 0, this.dimension.height);
			gradient.addColorStop(0, "#e9e9e9");
			gradient.addColorStop(FLOOR_PERCENT - 0.024, "#efefef");
			gradient.addColorStop(FLOOR_PERCENT - 0.023, "#ececec");
			gradient.addColorStop(FLOOR_PERCENT, "#d1cecd");
			gradient.addColorStop(FLOOR_PERCENT + 0.001, "#cbc8c7");
			gradient.addColorStop(1, "#ffffff");
			context.fillStyle = gradient;

			context.fillRect(0, 0, this.dimension.width, this.dimension.height);

			context.strokeStyle = "#c4c3c2";
			context.beginPath();
			context.moveTo(0, FLOOR_POSITION);
			context.lineTo(this.dimension.width, FLOOR_POSITION);
			context.stroke();

			//white light on the wall
			/*var centerX = cgsgCanvas.width / 2;
			 var centerY = FLOOR_POSITION / 2;
			 var radius = 30;

			 context.beginPath();
			 context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			 context.fillStyle = 'white';
			 context.shadowColor = 'white';
			 context.shadowBlur = 170;
			 context.shadowOffsetX = 0;
			 context.shadowOffsetY = 0;
			 context.fill();*/

			//call this after your custom rendering
			this.afterRender(context);
		},

		/**
		 * Return a copy of this node
		 * @method copy
		 * @return {BackgroundNode} a copy of this node
		 */
		copy: function () {
			var node = new BackgroundNode(this.position.x, this.position.y, this.dimension.width,
										  this.dimension.height);
			//call the super method
			node = this._super(node);

			return node;
		}
	}
);
