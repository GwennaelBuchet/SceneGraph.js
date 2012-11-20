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

var CGButtonState = {
	NORMAL   : {id : 0, textColor : "#666666", color : "#f2f2f2"},
	SELECTED : {id : 1, textColor : "white", color : "#999999"}
};

/**
 * The bottom menu button
 * @class MenuNode
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} width Relative dimension
 * @type {*}
 */
var MenuButtonNode = CGSGNode.extend(
	{
		initialize : function (x, y, width, height, text, context) {
			//call the constructor of CGSGNode
			this._super(x, y, width, height);

			/**
			 * Define the class type.
			 * Not mandatory but very useful, as Javascript does not have a mechanism to manage the type of class
			 * @type {String}
			 */
			this.classType = "MenuButtonNode";

			this.textNode = new CGSGNodeText(10, 70, text);
			this.textNode.setSize(10, false);
			this.textNode.setLineHeight(12, true);
			this.textNode.setTextAlign("center");
			this.addChild(this.textNode);
			this.textNode.translateWith((this.getWidth() - this.textNode.getWidth()) / 3,
			                            -this.textNode.getHeight() / 3);

			this.picto = new CGSGNodeImage(0, 10, null, context);
			this.addChild(this.picto);
			this.slices = [];

			this.radius = 4;

			this.state = CGButtonState.NORMAL;

			//fake canvas to pre-render static display
			this._tmpCanvas = [];

			this.initShape();
			//this.resizeWith(this.radius * 2, this.radius * 2);
		},

		setImage : function (img) {
			this.picto.setImage(img);
		},

		/**
		 * Pre-render the cloud into a temp canvas to optimize the perfs
		 */
		initShape : function () {
			for (var i = 0; i < 2; i++) {
				this._tmpCanvas[i] = document.createElement('canvas');
				this._tmpCanvas[i].width = this.dimension.width + 2 * this.radius;
				this._tmpCanvas[i].height = this.dimension.height + 2 * this.radius;
				this._drawButton(i);
			}
		},

		_drawButton : function (index) {
			var tmpContext = this._tmpCanvas[index].getContext('2d');

			var s = (index === 0) ? CGButtonState.NORMAL : CGButtonState.SELECTED;
			tmpContext.fillStyle = s.color;

			var rw = this.radius + this.dimension.width;
			var rh = this.radius + this.dimension.height;

			tmpContext.beginPath();
			tmpContext.moveTo(this.radius + this.radius, this.radius);
			tmpContext.lineTo(this.dimension.width, this.radius);
			tmpContext.quadraticCurveTo(rw, this.radius, rw, this.radius + this.radius);
			tmpContext.lineTo(rw, rh - this.radius);
			tmpContext.quadraticCurveTo(rw, rh, rw - this.radius, rh);
			tmpContext.lineTo(this.radius + this.radius, rh);
			tmpContext.quadraticCurveTo(this.radius, rh, this.radius, rh - this.radius);
			tmpContext.lineTo(this.radius, this.radius + this.radius);
			tmpContext.quadraticCurveTo(this.radius, this.radius, this.radius + this.radius, this.radius);
			tmpContext.closePath();
			tmpContext.fill();
		},

		setState : function (state) {
			this.state = state;

			this.textNode.color = this.state.textColor;
			var s = this.slices[this.state.id];
			this.picto.setSlice(s);
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
			context.drawImage(this._tmpCanvas[this.state.id], 0, 0);

			var s = this.slices[this.state.id];
			this.picto.setSlice(s.position.x, s.position.y, s.dimension.width, s.dimension.height, true);

			//call this after your custom rendering
			this.afterRender(context);
		},

		/**
		 * Return a copy of this node
		 * @method copy
		 * @return {MenuButtonNode} a copy of this node
		 */
		copy : function () {
			var node = new MenuButtonNode(this.position.x, this.position.y, this.dimension.width,
			                              this.dimension.height);
			//call the super method
			node = this._super(node);

			return node;
		}
	}
);
