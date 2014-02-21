/*
 * Copyright (c) 2013  Capgemini Technology Services (hereinafter “Capgemini”)
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

var CGSGNodeButtonProps = CGSGObject.extend(
	{
		initialize : function() {
			this.firstColor = "";
			this.lastColor = "";
			this.shadowColor = "";
			this.radius = 0;
			this.fontSize = 12;
			this.textAlign = "center";
			this.textColor = "";
			this.fontFamily = "";
			this.lineWidth = 0;
			this.lineColor = "";
			this.paddingV = 10;
			this.paddingH = 10;

			this.text = "";
			this.slice = null;
			/**
			 * Computed dimensions of the button in the 3 modes.
			 * Do not edit manually!
			 * @property _dimensions
			 * @type {Array}
			 * @private
			 */
			this.dimension = new CGSGDimension(10, 10);
		}

	}
);

/**
 * List the modes for a button : NORMAL, OVER, DEACTIVATED, SELECTED.
 * @class CGSGButtonMode
 * @type {Object}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 * @example
 *      myTextNode.setMode(CGSGButtonMode.DEACTIVATED);
 */
var CGSGButtonMode = {
	/**
	 * @property NORMAL
	 */
	NORMAL      : {
		id          : 0,
		isClickable : true
	},
	/**
	 * @property OVER
	 */
	OVER        : {
		id          : 1,
		isClickable : true
	},
	/**
	 * @property DEACTIVATED
	 */
	DEACTIVATED : {
		id          : 2,
		isClickable : false
	},

	/**
	 * @property SELECTED
	 */
	SELECTED : {
		id          : 3,
		isClickable : true
	}
};


var CGSGPositionMode = {
	/**
	 * @property TOP
	 */
	TOP : {index      : 0, decalX : 0, decalY : -1, dt : 1, dy : 1,
		computeWidth  : function(item1, item2) {
			return Math.max(item1, item2);
		},
		computeHeight : function(item1, item2) {
			return 0;
		}},

	/**
	 * @property BOTTOM
	 */
	BOTTOM : {index   : 1, decalX : 0, decalY : 1, dt : 0, dy : 1,
		computeWidth  : function(item1, item2) {
			return Math.max(item1, item2);
		},
		computeHeight : function(item1, item2) {
			return 0;
		}},
	/**
	 * @property LEFT
	 */
	LEFT   : {index   : 2, decalX : -1, decalY : 0, dt : 0, dy : 0,
		computeWidth  : function(item1, item2) {
			return 0;
		},
		computeHeight : function(item1, item2) {
			return Math.max(item1, item2);
		}},
	/**
	 * @property RIGHT
	 */
	RIGHT  : {index   : 3, decalX : 1, decalY : 0, dt : 1, dy : 0,
		computeWidth  : function(item1, item2) {
			return 0;
		},
		computeHeight : function(item1, item2) {
			return Math.max(item1, item2);
		}}
};


/**
 * A CGSGNodeButton represent a basic square
 *
 * @class CGSGNodeButton
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {String} text
 * @type {CGSGNodeButton}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGNodeButton = CGSGNode.extend(
	{
		initialize : function(x, y, text) {
			this._super(x, y);

			this._clsNormal = "cgsgnode-button";
			this._clsOver = "cgsgnode-button-over";
			this._clsDeactivated = "cgsgnode-button-deactivated";
			this._clsSelected = "cgsgnode-button-selected";

			/**
			 * A properties group for each mode.
			 * Index in this array corresponds to the id of the mode
			 * @property _props
			 * @type {CGSGNodeButtonProps[]}
			 * @private
			 */
			this._props = [
				new CGSGNodeButtonProps(),
				new CGSGNodeButtonProps(),
				new CGSGNodeButtonProps(),
				new CGSGNodeButtonProps()
			];

			/**
			 * Text Node encapsulating the text rendering
			 * @property _textsNode
			 * @type {CGSGNodeText}
			 */
			this.textNode = new CGSGNodeText(0, 0, "");
			this.textNode.setTextAlign("center", false);
			this.textNode.setTextBaseline("middle", false);

			this.setTexts(text);

			/**
			 * @property _picto
			 * @type {CGSGNodeImage}
			 */
			this._picto = new CGSGNodeImage(0, 0, null);

			/**
			 * @property _pictoPosition
			 * @default CGSGPositionMode.LEFT
			 * @type {CGSGPositionMode}
			 * @private
			 */
			this._pictoPosition = CGSGPositionMode.LEFT;

			/**
			 * Distance between the picto and the text
			 * @property _distancePictoText
			 * @default 10
			 * @type {Number}
			 * @private
			 */
			this._distancePictoText = 10;

			/**
			 * Fake canvases to pre-render static display
			 * @property _tmpCanvas
			 * @type {Array}
			 * @private
			 */
			this._tmpCanvases = [document.createElement('canvas'),
								 document.createElement('canvas'),
								 document.createElement('canvas'),
								 document.createElement('canvas')];

			/**
			 * @property classType
			 * @readonly
			 * @type {String}
			 * @default "CGSGNodeButton"
			 */
			this.classType = "CGSGNodeButton";

			//this._initShapes();

			/**
			 * Current mode of the button
			 * @property _currentMode
			 * @type {CGSGButtonMode}
			 * @default CGSGButtonMode.NORMAL
			 * @private
			 */
			this._currentMode = CGSGButtonMode.NORMAL;

			this._mustRecomputeSize = true;

			this.setMode(this._currentMode);

			var that = this;
			this.onMouseOver = function(event) {
				if (that.getMode() == CGSGButtonMode.NORMAL) {
					that.setMode(CGSGButtonMode.OVER);
				}
			};

			this.onMouseOut = function(event) {
				if (that.getMode() == CGSGButtonMode.OVER) {
					that.setMode(CGSGButtonMode.NORMAL);
				}
			};

			this._isInitialized = true;
		},

		/**
		 * Change the position of the picto : CGSGPositionMode.LEFT, CGSGPositionMode.TOP, CGSGPositionMode.RIGHT, CGSGPositionMode.BOTTOM
		 * @method setPictoPosition
		 * @param {CGSGPositionMode} p
		 */
		setPictoPosition : function(p) {
			this._pictoPosition = p;
			this._needRedraw = true;
		},

		/**
		 * Set the image for the picto
		 * @method setImage
		 * @param {Image} img
		 */
		setImage : function(img) {
			this._picto.setImage(img);
			this._needRedraw = true;
		},

		/**
		 * Set the URL for the picto
		 * @method setImageURL
		 * @param url
		 */
		setImageURL : function(url) {
			this._picto.onLoadEnd = this._onLoadImageEnd.bind(this);
			this._picto.setURL(url);
		},

		_onLoadImageEnd : function() {
			this._needRedraw = true;
		},

		/**
		 * Return the text of the button
		 * @method getText
		 * @return {Array}
		 */
		getTexts : function() {
			var t = [CGSGButtonMode.NORMAL.props.text, CGSGButtonMode.OVER.props.text,
					 CGSGButtonMode.DEACTIVATED.props.text, CGSGButtonMode.SELECTED.props.text];

			return t;
		},
		/**
		 * Set the values for text of the button
		 * @method setText
		 * @param valuess {Array}
		 * @example
		 *  button.setText(["normal", "over", "deactivated"]);
		 */
		setTexts : function(valuess) {
			//if valuess is not an array, create an array of 4 times this values
			if (!cgsgIsArray(valuess)) {
				var v = valuess.toString();
				valuess = [v, v, v, v];
			}

			this._props[CGSGButtonMode.NORMAL.id].text = valuess[0];
			this._props[CGSGButtonMode.OVER.id].text = valuess[1];
			this._props[CGSGButtonMode.DEACTIVATED.id].text = valuess[2];
			this._props[CGSGButtonMode.SELECTED.id].text = valuess[3];
			this._needRedraw = true;
		},

		/**
		 * @method setFixedSize
		 * @param {CGSGDimension} dim Can be null to remove fixed size
		 */
		setFixedSize : function(dim) {
			this._props[CGSGButtonMode.NORMAL.id].dimension = dim;
			this._props[CGSGButtonMode.OVER.id].dimension = dim;
			this._props[CGSGButtonMode.DEACTIVATED.id].dimension = dim;
			this._props[CGSGButtonMode.SELECTED.id].dimension = dim;

			this._fixedSize = cgsgExist(dim);
			this._mustRecomputeSize = true;
			this._needRedraw = true;
		},

		invalidate : function() {
			if (cgsgExist(this._isInitialized) && this._isInitialized === true)
				this._initShapes();
		},

		/**
		 * Reload theme (colors, ...) from loaded CSS file
		 * @method invalidateTheme
		 * @override
		 */
		invalidateTheme : function() {
			if (cgsgExist(this._isInitialized) && this._isInitialized === true) {
				//call parent's method
				this._super();

				this._mustRecomputeSize = true;
				this._needRedraw = true;

				//Use of "this._cls" class name which define the current CSS class used by this object.
				this._loadAttrs(this._clsNormal, CGSGButtonMode.NORMAL);
				this._loadAttrs(this._clsOver, CGSGButtonMode.OVER);
				this._loadAttrs(this._clsDeactivated, CGSGButtonMode.DEACTIVATED);
				this._loadAttrs(this._clsSelected, CGSGButtonMode.SELECTED);

				this._initShapes();
			}
		},

		/**
		 *
		 * @param cls
		 * @param mode
		 * @private
		 */
		_loadAttrs : function(cls, mode) {
			var id = mode.id;
			var props = this._props[id];

			var fillStyle = CGSG.cssManager.getAttr(cls, "background");
			var lineWidth = CGSG.cssManager.getAttr(cls, "border-width");
			var lineColor = CGSG.cssManager.getAttr(cls, "border-color");
			var paddingV = CGSG.cssManager.getAttr(cls, "padding-top");
			var paddingH = CGSG.cssManager.getAttr(cls, "padding-left");
			var radius = CGSG.cssManager.getAttr(cls, "border-radius");
			var textAlign = CGSG.cssManager.getAttr(cls, "text-align");
			var fontSize = CGSG.cssManager.getAttr(cls, "font-size");
			var fontFamily = CGSG.cssManager.getAttr(cls, "font-family");
			var textColor = CGSG.cssManager.getAttr(cls, "color");

			//Avoid to override previous value if no one is defined now. So check existence of new one first.
			if (cgsgExist(fillStyle)) {
				//value is given as "linear-gradient(rgb(150, 150, 150), rgb(127, 127, 127))".
				// Let's convert it to 2 hex.
				var srgb1 = fillStyle.substring(fillStyle.indexOf("rgb"), fillStyle.indexOf(")") + 1);
				var srgb2 = fillStyle.substring(fillStyle.lastIndexOf("rgb"), fillStyle.lastIndexOf(")"));
				var rgb1 = CGSGColor.fromString(srgb1);
				var rgb2 = CGSGColor.fromString(srgb2);
				props.firstColor = CGSGColor.rgb2hex(rgb1.r, rgb1.g, rgb1.b);
				props.lastColor = CGSGColor.rgb2hex(rgb2.r, rgb2.g, rgb2.b);
			}

			if (cgsgExist(lineWidth))
				props.lineWidth = CGSG.cssManager.getNumber(lineWidth);
			if (cgsgExist(lineColor))
				props.lineColor = lineColor;

			if (cgsgExist(radius))
				props.radius = CGSG.cssManager.getNumber(radius);

			if (cgsgExist(fontSize))
				props.fontSize = CGSG.cssManager.getNumber(fontSize);

			if (cgsgExist(textAlign))
				props.textAlign = textAlign;

			if (cgsgExist(textColor))
				props.textColor = textColor;

			if (cgsgExist(fontFamily))
				props.fontFamily = fontFamily;

			if (cgsgExist(lineWidth))
				props.lineWidth = CGSG.cssManager.getNumber(lineWidth);

			if (cgsgExist(lineColor))
				props.lineColor = lineColor;

			if (cgsgExist(paddingV))
				props.paddingV = CGSG.cssManager.getNumber(paddingV);
			if (cgsgExist(paddingH))
				props.paddingH = CGSG.cssManager.getNumber(paddingH);
		},

		/**
		 * Pre-render the button into a temp canvas to optimize the perfs
		 * @method _initShape
		 * @private
		 */
		_initShapes : function() {
			this._initShape(CGSGButtonMode.NORMAL);
			this._initShape(CGSGButtonMode.OVER);
			this._initShape(CGSGButtonMode.DEACTIVATED);
			this._initShape(CGSGButtonMode.SELECTED);
			this._mustRecomputeSize = false;
			this._needRedraw = false;
		},

		/**
		 * Pre-render the shape for normal rendering
		 * @method _initShape
		 * @param mode
		 * @private
		 */
		_initShape : function(mode) {
			var id = mode.id;
			this.textNode.setSize(this._props[id].fontSize, false);
			this.textNode.setText(this._props[id].text, false);
			this.textNode.setTypo(this._props[id].fontFamily || "Arial", true);

			var dPT = this._distancePictoText;
			if (this._props[id].text === "") {
				dPT = 0;
			}

			var decalPictoX = 0, decalPictoY = 0;
			var wImg = 0;
			var hImg = 0;
			if (this._picto.isLoaded) {
				if (this._slices.length > 0) {
					this._picto.setSlice(this._props[id].slice.position.x, this._props[id].slice.position.y,
										 this._props[id].slice.dimension.width, this._props[id].slice.dimension.height,
										 true);
				}

				wImg = this._picto.slice.dimension.width;
				hImg = this._picto.slice.dimension.height;

				decalPictoX = (wImg + dPT) * Math.abs(this._pictoPosition.decalX);
				decalPictoY = (hImg + dPT) * Math.abs(this._pictoPosition.decalY);
			}

			if (this._mustRecomputeSize) {
				if (this._fixedSize) {
					this.dimension.resizeTo(this._props[id].dimension.width, this._props[id].dimension.height);
					this._isDimensionChanged = true;
				}
				else {
					this.dimension.resizeTo(
						(2 * this._props[id].paddingH) + decalPictoX +
						this.textNode.getWidth() * Math.abs(this._pictoPosition.decalX) +
						this._pictoPosition.computeWidth(this.textNode.getWidth(), wImg),
						(2 * this._props[id].paddingV) + decalPictoY +
						this.textNode.getHeight() * Math.abs(this._pictoPosition.decalY) +
						this._pictoPosition.computeHeight(this.textNode.getHeight(), hImg));

					this._props[id].dimension = this.dimension.copy();
					this._isDimensionChanged = true;

					//this.setFixedSize(this.dimension);
				}
			}

			this._tmpCanvases[id].width = this.dimension.width + 2 * this._props[id].radius;
			this._tmpCanvases[id].height = this.dimension.height + 2 * this._props[id].radius;
			var tmpContext = this._tmpCanvases[id].getContext('2d');

			cgsgClearContext(tmpContext);

			//render the panel
			tmpContext.save();
			{
				var r = this._props[id].radius;
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
				gradient.addColorStop(0, this._props[id].firstColor);
				gradient.addColorStop(1, this._props[id].lastColor);
				tmpContext.fillStyle = gradient;

				if (cgsgExist(this._props[id].shadowColor)) {
					tmpContext.shadowColor = this._props[id].shadowColor;
					tmpContext.shadowBlur = 10;
					tmpContext.shadowOffsetX = 0;
					tmpContext.shadowOffsetY = 0;
				}

				tmpContext.fill();

				if (cgsgExist(this._props[id].lineColor) && this._props[id].lineColor > 0) {
					tmpContext.strokeStyle = this._props[id].lineColor;
					tmpContext.lineWidth = this._props[id].lineWidth;
					tmpContext.stroke();
				}
			}
			tmpContext.restore();

			this.textNode.color = this._props[id].textColor;

			var w = this.textNode.getWidth();
			var h = this.textNode.getHeight() - this.textNode._size;

			var textX = (-this._pictoPosition.decalX * decalPictoX + this.getWidth() - w) / 2;
			var textY = (-this._pictoPosition.decalY * decalPictoY + this.getHeight() - h) / 2;
			//(this.getHeight() - (this.textNode.getHeight() - this.textNode._size)) / 2;

			if (this._picto.isLoaded) {
				var ctX = w / 2;
				var ctY = h / 2;

				this._picto.translateTo(
					textX + ctX + this._pictoPosition.decalX * (ctX + dPT + (1 - this._pictoPosition.dt) * wImg) -
					this._pictoPosition.dy * wImg / 2,
					//textY + (h - hImg) / 2
					(1 - this._pictoPosition.dy) * (textY + (h - hImg) / 2)
						+ this._pictoPosition.dy * (textY - this.textNode._size / 2
														- this._pictoPosition.dt * (dPT + hImg) +
													(1 - this._pictoPosition.dt) * (this.textNode.getHeight() + dPT))
					//+ this._pictoPosition.dy * (textY - this.textNode._size / 2 - ( this._pictoPosition.dt) * this.textNode.getHeight())
				);

				this._picto.doRender(tmpContext);
			}

			this.textNode.translateTo(textX, textY, false);
			this.textNode.doRender(tmpContext);
		},

		/**
		 * Switch current mode
		 * @method setMode
		 * @param mode
		 */
		setMode : function(mode) {
			this._currentMode = mode;
			this.isClickable = mode.isClickable;
			this.dimension.resizeTo(this._props[mode.id].dimension.width, this._props[mode.id].dimension.height);
			this._isDimensionChanged = true;
		},

		/**
		 * @method getMode
		 * @return {CGSGButtonMode}
		 */
		getMode : function() {
			return this._currentMode;
		},

		/**
		 * Custom rendering
		 * @method render
		 * @protected
		 * @param {CanvasRenderingContext2D} context the context into render the node
		 * */
		render : function(context) {
			if (this._needRedraw) {
				this._initShapes();
			}

			//render the pre-rendered canvas
			context.drawImage(this._tmpCanvases[this._currentMode.id], 0, 0);
		},

		/**
		 * @method copy
		 * @return {CGSGNodeSquare} a copy of this node
		 */
		copy : function() {
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
