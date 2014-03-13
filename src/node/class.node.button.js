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
			this.cls = [];
			this.firstColor = "";
			this.lastColor = "";
			this.shadowColor = "";
			this.radius = 0;

			this.lineWidth = 0;
			this.lineColor = "";
			this.paddingV = 10;
			this.paddingH = 10;

			this.txtNode = new CGSGNodeText(0, 0, "");
			/**
			 * Slice in the image for the icon
			 * @type {CGSGRegion}
			 */
			this.slice = null;
			/**
			 * @property icon
			 * @type {CGSGNodeImage}
			 */
			this.icon = null;
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

				this._super(x, y);


				this._mustRecomputeSize = true;

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

				/**
				 * Current mode of the button
				 * @property _currentMode
				 * @type {CGSGButtonMode}
				 * @default CGSGButtonMode.NORMAL
				 * @private
				 */
				this._currentMode = CGSGButtonMode.NORMAL;

				this.setMode(this._currentMode);

				this.setClassFor("cgsg-button", CGSGButtonMode.NORMAL);
				this.setClassFor("cgsg-button-over", CGSGButtonMode.OVER);
				this.setClassFor("cgsg-button-deactivated", CGSGButtonMode.DEACTIVATED);
				this.setClassFor("cgsg-button-selected", CGSGButtonMode.SELECTED);
				this._props[0].txtNode.addClass("cgsg-button-text");
				this._props[1].txtNode.addClass("cgsg-button-over-text");
				this._props[2].txtNode.addClass("cgsg-button-deactivated-text");
				this._props[3].txtNode.addClass("cgsg-button-selected-text");

				this.setTexts(text);

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
				this._mustRecomputeSize = true;
			},

			/**
			 * Because a button got 4 modes it also got 4 CSS management
			 * @method setClassFor
			 * @param cls {String}
			 * @param mode {CGSGButtonMode}
			 */
			setClassFor : function(cls, mode) {
				this._props[mode.id].cls = [];
				this._props[mode.id].cls.push(cls);

				this._mustRecomputeSize = false;
				this._needRedraw = false;
				this._loadAttrs(mode, cls);
				this._initShape(mode);
			},

			/**
			 * Set the same CSS class for all 4 modes
			 * @method setClass
			 * @override
			 * @param cls {String}
			 */
			setClass : function(cls) {
				this._props[CGSGButtonMode.NORMAL.id].cls = [];
				this._props[CGSGButtonMode.NORMAL.id].cls.push(cls);
				this._props[CGSGButtonMode.OVER.id].cls = [];
				this._props[CGSGButtonMode.OVER.id].cls.push(cls);
				this._props[CGSGButtonMode.DEACTIVATED.id].cls = [];
				this._props[CGSGButtonMode.DEACTIVATED.id].cls.push(cls);
				this._props[CGSGButtonMode.SELECTED.id].cls = [];
				this._props[CGSGButtonMode.SELECTED.id].cls.push(cls);

				this.invalidateTheme();
			},

			/**
			 * Add CSS class for this node and for this mode only (not for bounding box, use 'setClassBBox' instead).
			 * CSS class must define attributes used by this node.
			 * @method addClassFor
			 * @param {String} cls
			 * @param mode {CGSGButtonMode}
			 */
			addClassFor : function(cls, mode) {
				this._props[mode.id].cls.push(cls);

				this._mustRecomputeSize = false;
				this._needRedraw = false;
				this._loadAttrs(mode, cls);
				this._initShape(mode);
			},

			/**
			 * Add CSS class for this node for all 4 modes (not for bounding box, use 'setClassBBox' instead).
			 * CSS class must define attributes used by this node.
			 * @method addClass
			 * @override
			 * @param {String} cls
			 */
			addClass : function(cls) {
				this._props[CGSGButtonMode.NORMAL.id].cls.push(cls);
				this._props[CGSGButtonMode.OVER.id].cls.push(cls);
				this._props[CGSGButtonMode.DEACTIVATED.id].cls.push(cls);
				this._props[CGSGButtonMode.SELECTED.id].cls.push(cls);

				this.invalidateTheme();
			},

			/**
			 * remove CSS class for this node and for this mode only (not for bounding box, use 'setClassBBox' instead).
			 * @method removeClassFor
			 * @param {String} cls
			 */
			removeClassFor : function(cls, mode) {
				this._props[mode.id].cls = this._props[mode.id].cls.without(cls);
				this._mustRecomputeSize = false;
				this._needRedraw = false;
				this._loadAttrs(mode, cls);
				this._initShape(mode);
			},

			/**
			 * remove CSS class for this node for all 4 modes (not for bounding box, use 'setClassBBox' instead).
			 * @method removeClass
			 * @param {String} cls
			 */
			removeClass : function(cls) {
				this._props[CGSGButtonMode.NORMAL.id].cls = this._props[CGSGButtonMode.NORMAL.id].without(cls);
				this._props[CGSGButtonMode.OVER.id].cls = this._props[CGSGButtonMode.OVER.id].without(cls);
				this._props[CGSGButtonMode.DEACTIVATED.id].cls =
				this._props[CGSGButtonMode.DEACTIVATED.id].without(cls);
				this._props[CGSGButtonMode.SELECTED.id].cls = this._props[CGSGButtonMode.SELECTED.id].without(cls);

				this.invalidateTheme();
			},

			/**
			 * @method setImageFor
			 * @param img {Image}
			 * @param mode {CGSGButtonMode}
			 */
			setImageFor : function(img, mode) {
				this._props[mode.id].icon.setImage(img);
			},

			/**
			 * Set the image for the picto
			 * @method setImage
			 * @param {Image} img
			 */
			setImage : function(img) {
				this._checkIcon();

				this.setImageFor(img, CGSGButtonMode.NORMAL);
				this.setImageFor(img, CGSGButtonMode.OVER);
				this.setImageFor(img, CGSGButtonMode.DEACTIVATED);
				this.setImageFor(img, CGSGButtonMode.SELECTED);

				this._forceRedraw();
			},

			/**
			 * Set the URL for the icon for all modes
			 * @method setImageURL
			 * @param url
			 */
			setImageURL : function(url) {
				this._checkIcon();

				this._props[CGSGButtonMode.NORMAL.id].icon.onLoadEnd = this._onLoadImageEndAll.bind(this);
				this._props[CGSGButtonMode.NORMAL.id].icon.setURL(url);
			},

			/**
			 * Set the URL for the icon for all modes
			 * @method setImageURL
			 * @param url
			 * @param mode {CGSGButtonMode}
			 */
			setImageURLFor : function(url, mode) {
				this._props[mode.id].icon.onLoadEnd = this._forceRedraw.bind(this);
				this._props[mode.id].icon.setURL(url);
			},

			_onLoadImageEndAll : function() {
				var img = this._props[CGSGButtonMode.NORMAL.id].icon.getImage();
				this._props[CGSGButtonMode.OVER.id].icon.setImage(img);
				this._props[CGSGButtonMode.DEACTIVATED.id].icon.setImage(img);
				this._props[CGSGButtonMode.SELECTED.id].icon.setImage(img);

				this._forceRedraw();
			},

			/**
			 * Check if icon object already exist for each mode.
			 * If not, create them
			 * @method _checkIcon
			 * @private
			 */
			_checkIcon : function() {
				this._checkIconFor(CGSGButtonMode.NORMAL);
				this._checkIconFor(CGSGButtonMode.OVER);
				this._checkIconFor(CGSGButtonMode.DEACTIVATED);
				this._checkIconFor(CGSGButtonMode.SELECTED);
			},

			/**
			 * @method _checkIconFor
			 * @param mode
			 * @private
			 */
			_checkIconFor : function(mode) {
				if (!cgsgExist(this._props[mode.id].icon))
					this._props[mode.id].icon = new CGSGNodeImage(0, 0, null);
			},

			/**
			 * Return the text of the button
			 * @method getText
			 * @return {Array}
			 */
			getTexts : function() {
				var t = [CGSGButtonMode.NORMAL.props.txtNode._text, CGSGButtonMode.OVER.props.txtNode._text,
						 CGSGButtonMode.DEACTIVATED.props.txtNode._text, CGSGButtonMode.SELECTED.props.txtNode._text];

				return t;
			},

			_forceRedraw:function() {
				this._needRedraw = true;
				this._mustRecomputeSize = true;
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

				this._props[CGSGButtonMode.NORMAL.id].txtNode.setText(valuess[0], true);
				this._props[CGSGButtonMode.OVER.id].txtNode.setText(valuess[1], true);
				this._props[CGSGButtonMode.DEACTIVATED.id].txtNode.setText(valuess[2], true);
				this._props[CGSGButtonMode.SELECTED.id].txtNode.setText(valuess[3], true);

				this._forceRedraw();
			},

			/**
			 * @method setTextClass
			 * @param mode {CGSGButtonMode}
			 * @param cls {String} CSS class name
			 */
			setTextClass : function(mode, cls) {
				this._props[mode.id].txtNode.setClass(cls);
				this.invalidate();
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
				this._forceRedraw();
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
				this._forceRedraw();

				this._props[CGSGButtonMode.NORMAL.id].txtNode.invalidateTheme();
				this._props[CGSGButtonMode.OVER.id].txtNode.invalidateTheme();
				this._props[CGSGButtonMode.DEACTIVATED.id].txtNode.invalidateTheme();
				this._props[CGSGButtonMode.SELECTED.id].txtNode.invalidateTheme();

				//Use of "this._cls" class name which define the current CSS class used by this object.
				this._loadAttrs(CGSGButtonMode.NORMAL, this._props[CGSGButtonMode.NORMAL.id].cls);
				this._loadAttrs(CGSGButtonMode.OVER, this._props[CGSGButtonMode.OVER.id].cls);
				this._loadAttrs(CGSGButtonMode.DEACTIVATED, this._props[CGSGButtonMode.DEACTIVATED.id].cls);
				this._loadAttrs(CGSGButtonMode.SELECTED, this._props[CGSGButtonMode.SELECTED.id].cls);

				this.invalidate();
			},

			/**
			 * @method _loadAttrs
			 * @param mode
			 * @param cls
			 * @private
			 */
			_loadAttrs : function(mode, cls) {
				var id = mode.id;
				var prop = this._props[id];

				var fillStyle = CGSG.cssManager.getAttrInArray(cls, "background");
				var lineWidth = CGSG.cssManager.getAttrInArray(cls, "border-width");
				var lineColor = CGSG.cssManager.getAttrInArray(cls, "border-color");
				var paddingV = CGSG.cssManager.getAttrInArray(cls, "padding-top");
				var paddingH = CGSG.cssManager.getAttrInArray(cls, "padding-left");
				var radius = CGSG.cssManager.getAttrInArray(cls, "border-radius");
				var icon = CGSG.cssManager.getAttrInArray(cls, "icon");
				if (!cgsgExist(icon))
					icon = CGSG.cssManager.getAttrInArray(cls, "list-style-image");

				//Avoid to override previous value if no one is defined now. So check existence of new one first.
				if (cgsgExist(fillStyle)) {
					//value is given as "linear-gradient(rgb(150, 150, 150), rgb(127, 127, 127))".
					// Let's convert it to 2 hex.
					var srgb1 = fillStyle.substring(fillStyle.indexOf("rgb"), fillStyle.indexOf(")") + 1);
					var srgb2 = fillStyle.substring(fillStyle.lastIndexOf("rgb"), fillStyle.lastIndexOf(")"));
					var rgb1 = CGSGColor.fromString(srgb1);
					var rgb2 = CGSGColor.fromString(srgb2);
					prop.firstColor = CGSGColor.rgb2hex(rgb1.r, rgb1.g, rgb1.b);
					prop.lastColor = CGSGColor.rgb2hex(rgb2.r, rgb2.g, rgb2.b);
				}

				if (cgsgExist(lineWidth))
					prop.lineWidth = CGSG.cssManager.getNumber(lineWidth);
				if (cgsgExist(lineColor))
					prop.lineColor = lineColor;

				if (cgsgExist(radius))
					prop.radius = CGSG.cssManager.getNumber(radius);

				if (cgsgExist(lineWidth))
					prop.lineWidth = CGSG.cssManager.getNumber(lineWidth);

				if (cgsgExist(lineColor))
					prop.lineColor = lineColor;

				if (cgsgExist(paddingV))
					prop.paddingV = CGSG.cssManager.getNumber(paddingV);
				if (cgsgExist(paddingH))
					prop.paddingH = CGSG.cssManager.getNumber(paddingH);

				if (cgsgExist(icon)) {
					this._checkIconFor(mode);
					this.setImageURLFor(CGSG.cssManager.getURL(icon), mode);
				}
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
				this._forceRedraw();
			},

			/**
			 * Pre-render the shape for normal rendering
			 * @method _initShape
			 * @param mode
			 * @private
			 */
			_initShape : function(mode) {
				var id = mode.id;
				var prop = this._props[id];
				var txtNode = prop.txtNode;
				var tW = txtNode.getWidth(), tH = txtNode.getHeight();

				var dPT = this._distancePictoText;
				if (prop.text === "") {
					dPT = 0;
				}

				var decalPictoX = 0, decalPictoY = 0;
				var wImg = 0;
				var hImg = 0;
				if (cgsgExist(prop.icon) && prop.icon.isLoaded) {
					if (cgsgExist(prop.slice)) {
						prop.icon.setSlice(prop.slice.position.x, prop.slice.position.y,
										   prop.slice.dimension.width, prop.slice.dimension.height,
										   true);
					}

					wImg = prop.icon.slice.dimension.width;
					hImg = prop.icon.slice.dimension.height;

					decalPictoX = (wImg + dPT) * Math.abs(this._pictoPosition.decalX);
					decalPictoY = (hImg + dPT) * Math.abs(this._pictoPosition.decalY);
				}

				if (this._mustRecomputeSize) {
					if (this._fixedSize) {
						this.dimension.resizeTo(prop.dimension.width, prop.dimension.height);
						this._isDimensionChanged = true;
					}
					else {
						this.dimension.resizeTo(
							(2 * prop.paddingH) + decalPictoX +
							tW * Math.abs(this._pictoPosition.decalX) +
							this._pictoPosition.computeWidth(tW, wImg),
							(2 * prop.paddingV) + decalPictoY +
							tH * Math.abs(this._pictoPosition.decalY) +
							this._pictoPosition.computeHeight(tH, hImg));

						prop.dimension = this.dimension.copy();
						this._isDimensionChanged = true;
					}
				}

				this._tmpCanvases[id].width = this.dimension.width + 2 * prop.radius;
				this._tmpCanvases[id].height = this.dimension.height + 2 * prop.radius;
				var tmpContext = this._tmpCanvases[id].getContext('2d');

				cgsgClearContext(tmpContext);

				//render the panel
				tmpContext.save();
				{
					var r = prop.radius;
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
					gradient.addColorStop(0, prop.firstColor);
					gradient.addColorStop(1, prop.lastColor);
					tmpContext.fillStyle = gradient;

					if (cgsgExist(prop.shadowColor)) {
						tmpContext.shadowColor = prop.shadowColor;
						tmpContext.shadowBlur = 10;
						tmpContext.shadowOffsetX = 0;
						tmpContext.shadowOffsetY = 0;
					}

					tmpContext.fill();

					if (cgsgExist(prop.lineColor) && prop.lineColor > 0) {
						tmpContext.strokeStyle = prop.lineColor;
						tmpContext.lineWidth = prop.lineWidth;
						tmpContext.stroke();
					}
				}
				tmpContext.restore();

				var textX = (-this._pictoPosition.decalX * decalPictoX + this.getWidth() - tW) / 2;
				var textY = (-this._pictoPosition.decalY * decalPictoY + this.getHeight() - tH) / 2;

				if (cgsgExist(prop.icon) && prop.icon.isLoaded) {
					var ctX = tW / 2;

					prop.icon.translateTo(
						textX + ctX + this._pictoPosition.decalX * (ctX + dPT + (1 - this._pictoPosition.dt) * wImg) -
						this._pictoPosition.dy * wImg / 2,
						(1 - this._pictoPosition.dy) * (textY + (tH - hImg) / 2)
							+ this._pictoPosition.dy * (textY - txtNode._size / 2
															- this._pictoPosition.dt * (dPT + hImg) +
														(1 - this._pictoPosition.dt) * (tH + dPT))
					);

					prop.icon.doRender(tmpContext);
				}

				txtNode.translateTo(textX, textY, false);
				txtNode.doRender(tmpContext);
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
	)
	;
