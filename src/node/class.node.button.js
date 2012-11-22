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
 * List the modes for a button : NORMAL, OVER, DEACTIVATED.
 * @class CGSGButtonMode
 * @type {Object}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 * @example
 *      myTextNode.setWrapMode(CGSGWrapMode.WORD, true);
 */
var CGSGButtonMode = {
	/**
	 * @property NORMAL
	 */
	NORMAL      : {index : 0},
	/**
	 * @property OVER
	 */
	OVER        : {index : 1},
	/**
	 * @property DEACTIVATED
	 */
	DEACTIVATED : {index : 2}
};

/**
 * A CGSGNodeButton represent a basic square
 *
 * @class CGSGNodeButton
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on X
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @param {Number} radius Radius for the round corner
 * @type {CGSGNodeButton}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGNodeButton = CGSGNode.extend(
	{
		initialize : function (x, y, text) {
			this._super(x, y, 0, 0);

			/**
			 * High colors for the button in 3 mode : normal, over, deactivated
			 * @property _firstColors
			 * @default ["#858585", "#5F5F5F", "#9C9C9C"]
			 * @type {Array}
			 * @private
			 */
			this._firstColors = ["#969696", "#5F5F5F", "#D8D8D8"];
			/**
			 * Low color for the button in 3 mode : normal, over, deactivated
			 * @property _lastColors
			 * @default ["#606060", "#4B4B4B", "#747474"]
			 * @type {Array}
			 * @private
			 */
			this._lastColors = ["#7F7F7F", "#4B4B4B", "#B5B5B5"];

			/**
			 * Shadow color for the button in 3 mode : normal, over, deactivated. Can be null.
			 * @property _shadowColors
			 * @default [null, null, null]
			 * @type {Array}
			 * @private
			 */
			this._shadowColors = [null, null, null];

			/**
			 * Radius for the round corner in 3 mode : normal, over, deactivated
			 * @property _radiuses
			 * @type {Array}
			 * @default [10, 10, 10]
			 * @private
			 */
			this._radiuses = [8, 8, 8];

			/**
			 * Text for the button in 3 mode : normal, over, deactivated
			 * @property _texts
			 * @default [text, text, text]
			 * @type {Array}
			 * @private
			 */
			this._texts = [text, text, text];

			/**
			 * Text size for the button in 3 mode : normal, over, deactivated
			 * @property _textSizes
			 * @default [12, 12, 12]
			 * @type {Array}
			 * @private
			 */
			this._textSizes = [12, 12, 12];

			/**
			 * Color for the text in the 3 mode  : normal, over, deactivated
			 * @property _textColors
			 * @type {Array}
			 * @default ["white", "white", "gray"]
			 * @private
			 */
			this._textColors = ["white", "white", "#999999"];

			/**
			 * Text Node encapsulating the text rendering
			 * @property _textsNode
			 * @type {CGSGNodeText}
			 */
			this.textNode = new CGSGNodeText(0, 0, "");
			this.textNode.setTextAlign("center", false);
			this.textNode.setTextBaseline("middle", false);

			/**
			 * @property _picto
			 * @type {CGSGNodeImage}
			 */
			this._picto = new CGSGNodeImage(0, 10, null, null);
			this.addChild(this._picto);
			/**
			 * @property _slices
			 * @type {Array}
			 */
			this._slices = [];

			/**
			 * Fake canvases to pre-render static display
			 * @property _tmpCanvas
			 * @type {Array}
			 * @private
			 */
			this._tmpCanvas =
			[document.createElement('canvas'), document.createElement('canvas'), document.createElement('canvas')];

			/**
			 * Padding applied to the left and right of the text
			 * @property _horizontalPadding
			 * @type {Number}
			 * @default 15
			 * @private
			 */
			this._horizontalPadding = 16;
			/**
			 * Padding applied to the top and bottom of the text
			 * @property _verticalPadding
			 * @type {Number}
			 * @default 5
			 * @private
			 */
			this._verticalPadding = 7;

			/**
			 * @property classType
			 * @readonly
			 * @type {String}
			 * @default "CGSGNodeButton"
			 */
			this.classType = "CGSGNodeButton";

			this._initShapes();

			/**
			 * Current mode of the button
			 * @property _currentMode
			 * @type {CGSGButtonMode}
			 * @default CGSGButtonMode.NORMAL
			 * @private
			 */
			this._currentMode = CGSGButtonMode.NORMAL;

			this.setMode(CGSGButtonMode.NORMAL);

			var that = this;
			this.onMouseOver = function (event) {
				if (that.getMode() == CGSGButtonMode.NORMAL) {
					that.setMode(CGSGButtonMode.OVER);
				}
			};

			this.onMouseOut = function (event) {
				if (that.getMode() == CGSGButtonMode.OVER) {
					that.setMode(CGSGButtonMode.NORMAL);
				}
			};
		},

		/**
		 * Set the image for the picto
		 * @method setImage
		 * @param {Image} img
		 */
		setImage : function (img) {
			this._picto.setImage(img);
		},

		/**
		 * Set the URL for the picto
		 * @method setImageURL
		 * @param url
		 */
		setImageURL : function(url) {
			this._picto.setURL(url);
		},

		/**
		 * Return the slices in the image for the 3 modes
		 * @method getSlices
		 * @return {Array}
		 */
		getSlices : function() {
			return this._slices;
		},
		/**
		 * Set the slices in the image for the 3 modes
		 * @method setSlices
		 * @param {Array} values
		 */
		setSlices : function (values) {
			this._slices = values;
			this._initShapes();
		},

		/**
		 * Return the High color for the button
		 * @method getFirstColor
		 * @return {Array}
		 */
		getFirstColors : function () {
			return this._firstColors;
		},
		/**
		 * Set the values for the high color of the button
		 * @method setFirstColor
		 * @param values {Array}
		 */
		setFirstColors : function (values) {
			this._firstColors = values;
			this._initShapes();
		},

		/**
		 * Return the Low color for the button
		 * @method getLastColor
		 * @return {Array}
		 */
		getLastColors : function () {
			return this._lastColors;
		},
		/**
		 * Set the values for the low color of the button
		 * @method setLastColor
		 * @param values {Array}
		 */
		setLastColors : function (values) {
			this._lastColors = values;
			this._initShapes();
		},

		/**
		 * Return the Shadow color for the button
		 * @method getShadowColor
		 * @return {Array}
		 */
		getShadowColors : function () {
			return this._shadowColors;
		},
		/**
		 * Set the values for the shadow color of the button
		 * @method setShadowColor
		 * @param values {Array}
		 */
		setShadowColors : function (values) {
			this._shadowColors = values;
			this._initShapes();
		},

		/**
		 * Return the Low color for the button
		 * @method getRadius
		 * @return {Array}
		 */
		getRadiuses : function () {
			return this._radiuses;
		},
		/**
		 * Set the values for the low color of the button
		 * @method setRadius
		 * @param values {Array}
		 */
		setRadiuses : function (values) {
			this._radiuses = values;
			this._initShapes();
		},

		/**
		 * Return the text of the button
		 * @method getText
		 * @return {Array}
		 */
		getTexts : function () {
			return this._texts;
		},
		/**
		 * Set the values for text of the button
		 * @method setText
		 * @param valuess {Array}
		 * @example
		 *  button.setText(["normal", "over", "deactivated"]);
		 */
		setTexts : function (valuess) {
			//if valuess is not an array, create an array of 3 times this values
			if (!cgsgIsArray(valuess)) {
				var v = valuess.toString();
				valuess = [v, v, v];
			}

			this._texts = valuess;
			this._initShapes();
		},

		/**
		 * Return the text sizes of the button
		 * @method getTextSize
		 * @return {Array}
		 */
		getTextSizes : function () {
			return this._textSizes;
		},
		/**
		 * Set the values for text sizes of the button
		 * @method setTextSize
		 * @param values {Array}
		 */
		setTextSizes : function (values) {
			this._textSizes = values;
			this._initShapes();
		},

		/**
		 * Return the text of the button
		 * @method getTextColor
		 * @return {Array}
		 */
		getTextColors : function () {
			return this._textColors;
		},
		/**
		 * Set the color for text of the button
		 * @method setTextColor
		 * @param values {Array}
		 * @example
		 *  button.setTextColor(["white", "green", "yellow"]);
		 */
		setTextColors : function (values) {
			this._textColors = values;
			this._initShapes();
		},

		/**
		 * Return the horizontal padding of the button
		 * @method getHorizontalPadding
		 * @return {Number}
		 */
		getHorizontalPadding : function () {
			return this._horizontalPadding;
		},
		/**
		 * Set the horizontal padding of the button
		 * @method setHorizontalPadding
		 * @param values {Number}
		 */
		setHorizontalPadding : function (values) {
			this._horizontalPadding = values;
			this._initShapes();
		},

		/**
		 * Return the vertical padding of the button
		 * @method getVerticalPadding
		 * @return {Number}
		 */
		getVerticalPadding : function () {
			return this._verticalPadding;
		},
		/**
		 * Set the vertical padding of the button
		 * @method setHorizontalPadding
		 * @param values {Number}
		 */
		setVerticalPadding : function (values) {
			this._verticalPadding = values;
			this._initShapes();
		},

		/**
		 * Pre-render the button into a temp canvas to optimize the perfs
		 * @method _initShape
		 * @private
		 */
		_initShapes : function () {
			this._initShape(0);
			this._initShape(1);
			this._initShape(2);
		},

		/**
		 * Pre-render the shape for normal rendering
		 * @method _initShape
		 * @param {Number} index
		 * @private
		 */
		_initShape : function (index) {
			this.textNode.setSize(this._textSizes[index], false);
			this.textNode.setText(this._texts[index], true);
			this.resizeTo(this.textNode.getWidth() + 2 * this._horizontalPadding,
			              this.textNode.getHeight() + 2 * this._verticalPadding);

			this._tmpCanvas[index].width = this.dimension.width + 2 * this._radiuses[index];
			this._tmpCanvas[index].height = this.dimension.height + 2 * this._radiuses[index];
			var tmpContext = this._tmpCanvas[index].getContext('2d');

			cgsgClearContext(tmpContext);

			//render the panel
			tmpContext.save();
			{
				var r = this._radiuses[index];
				tmpContext.translate(-r, -r);
				tmpContext.beginPath();

				tmpContext.moveTo(r, r);
				tmpContext.lineTo(r + this.dimension.width - r, r);
				tmpContext.quadraticCurveTo(r + this.dimension.width,
				                            r,
				                            r + this.dimension.width,
				                            r + r);
				tmpContext.lineTo(r + this.dimension.width,
				                  r + this.dimension.height - r);
				tmpContext.quadraticCurveTo(r + this.dimension.width,
				                            r + this.dimension.height,
				                            r + this.dimension.width - r,
				                            r + this.dimension.height);
				tmpContext.lineTo(r + r,
				                  r + this.dimension.height);
				tmpContext.quadraticCurveTo(r,
				                            r + this.dimension.height,
				                            r,
				                            r + this.dimension.height - r);
				tmpContext.lineTo(r, r + r);
				tmpContext.quadraticCurveTo(r, r,
				                            r + r,
				                            r);
				tmpContext.closePath();

				var gradient = tmpContext.createLinearGradient(0, 0, 0, this.dimension.height);
				gradient.addColorStop(0, this._firstColors[index]);
				gradient.addColorStop(1, this._lastColors[index]);
				tmpContext.fillStyle = gradient;

				if (cgsgExist(this._shadowColors)) {
					tmpContext.shadowColor = this._shadowColors[index];
					tmpContext.shadowBlur = 10;
					tmpContext.shadowOffsetX = 0;
					tmpContext.shadowOffsetY = 0;
				}

				tmpContext.fill();
			}
			tmpContext.restore();

			this.resizeTo(2 * this._radiuses[index] + this.dimension.width,
			              2 * this._radiuses[index] + this.dimension.height);
			this.textNode.color = this._textColors[index];

			var x = (this.getWidth() - this.textNode.getWidth()) / 2;
			var y = (this.getHeight() - (this.textNode.getHeight() - this.textNode._size)) / 2;

			this.textNode.translateTo(x, y);
			this.textNode.render(tmpContext);
		},

		/**
		 * Switch current mode
		 * @method setMode
		 * @param {CGSGButtonMode} mode
		 */
		setMode : function (mode) {
			this._currentMode = mode;
		},

		/**
		 * @method getMode
		 * @return {CGSGButtonMode}
		 */
		getMode : function () {
			return this._currentMode;
		},

		/**
		 * Custom rendering
		 * @method render
		 * @protected
		 * @override
		 * @param {CanvasRenderingContext2D} context the context into render the node
		 * */
		render : function (context) {
			//save current state
			this.beforeRender(context);

			context.globalAlpha = this.globalAlpha;
			//render the pre-rendered canvas
			context.drawImage(this._tmpCanvas[this._currentMode.index], 0, 0);

			this._picto.set

			//restore state
			this.afterRender(context);
		},

		/**
		 * @method copy
		 * @return {CGSGNodeSquare} a copy of this node
		 */
		copy : function () {
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
