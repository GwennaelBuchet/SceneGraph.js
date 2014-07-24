/*
 * Copyright (c) 2014 Gwennael Buchet
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
 *  Terms of Use causing significant harm to Gwennael Buchet.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  Except as contained in this notice, the name of Gwennael Buchet shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Gwennael Buchet.
 *
 *  These Terms of Use are subject to French law.
 */

/**
 * List the methods to wrap the text. Used by {CGSGNodeText} Node.
 * @class CGSGWrapMode
 * @type {Object}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 * @example
 *      myTextNode.setWrapMode(CGSGWrapMode.WORD, true);
 */
var CGSGWrapMode = {
	/**
	 * @property WORD
	 */
	WORD     : {space : " "},
	/**
	 * @property LETTER
	 */
	LETTER   : {space : ""},
	/**
	 * @property SENTENCE
	 */
	SENTENCE : {space : "."}
};

/**
 * A CGSGNodeText represent a basic circle
 *
 * @class CGSGNodeText
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {String} text Text to display
 * @type {CGSGNodeText}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGNodeText = CGSGNode.extend(
	{
		initialize : function(x, y, text, mustRecomputeDimension) {
			this._super(x, y);

			/**
			 * @property _text
			 * @type {String}
			 * @private
			 */
			this._text = "";
			/**
			 * Size of the text, in pt
			 * @property _size
			 * @default 18
			 * @type {Number}
			 * @private
			 */
			this._size;
			/**
			 * Possible values : "left", "right", "center"
			 * @property _align
			 * @default "left"
			 * @type {String}
			 * @private
			 */
			this._align;
			/**
			 * Possible values : "top", "hanging", "middle", "alphabetic", "ideographic", "bottom"
			 * @property _textBaseline
			 * @default "top"
			 * @type {String}
			 * @private
			 */
			this._textBaseline = "top";
			/**
			 * @property _strokeColor
			 * @type {String}
			 * @private
			 */
			this._strokeColor;

			/**
			 * @property crossed
			 * @default false
			 * @type {Boolean}
			 * @private
			 */
			this.crossed = false;

			/**
			 * @property _style
			 * @default ""
			 * @type {String}
			 * @private
			 */
			this._style = "";
			/**
			 * @property _typo
			 * @default "Arial"
			 * @type {String}
			 * @private
			 */
			this._typo;

			this._sizeT;
			this._variant;
			this._weight;

			this._transform;
			/**
			 * Max width for the text. If -1, so no max will be used
			 * @property _maxWidth
			 * @type {Number}
			 * @private
			 */
			this._maxWidth = -1;
			/**
			 * Line height when wrap the text.
			 * A line height is the size between 2 tops of line
			 * @property _lineHeight
			 * @default this._size
			 * @type {Number}
			 * @private
			 */
			this._lineHeight = this._size;
			/**
			 * @property _wrapMode
			 * @default CGSGWrapMode.LETTER
			 * @type {Object}
			 * @private
			 */
			this._wrapMode = CGSGWrapMode.LETTER;

			/**
			 * List of sections in the text. a section is delimited by a Carriage Return
			 * @property _sections
			 * @type {Array}
			 * @private
			 */
			this._sections = [];

			/**
			 * The string to replace the tabulation characters
			 * @property _tabulation
			 * @type {String}
			 * @private
			 */
			this._tabulation = "    ";

			/**
			 * Method to select the text
			 * @property pickNodeMethod
			 * @type {Object}
			 */
			this.pickNodeMethod = CGSGPickNodeMethod.GHOST;

			/**
			 * Metrics of the text.
			 * Computed each frame it is rendered. Contains only width.
			 * Use getWidth() and getHeight() methods to get correct values
			 * @readonly
			 * @property metrics
			 * @type {Object}
			 */
			this.metrics = {width : 1};

			/**
			 * number of lines in the text
			 * @property _nbLines
			 * @type {Number}
			 * @private
			 */
			this._nbLines = 1;

			/**
			 * @property classType
			 * @type {String}
			 */
			this.classType = "CGSGNodeText";

			this.setClass("cgsg-p");

			this.setText(text, mustRecomputeDimension !== false);
			this.resizeTo(this.getWidth(), this.getHeight());
		},

		/**
		 * Reload theme (colors, ...) from loaded CSS file
		 * @method invalidateTheme
		 */
		invalidateTheme : function() {
			this._super();

			var cl = CGSG.cssManager.getAttrInArray(this._cls, "color");
			var style = CGSG.cssManager.getAttrInArray(this._cls, "font-style");
			var variant = CGSG.cssManager.getAttrInArray(this._cls, "font-variant");
			var weight = CGSG.cssManager.getAttrInArray(this._cls, "font-weight");
			var size = CGSG.cssManager.getAttrInArray(this._cls, "font-size");
			var family = CGSG.cssManager.getAttrInArray(this._cls, "font-family");
			var height = CGSG.cssManager.getAttrInArray(this._cls, "line-height");
			var align = CGSG.cssManager.getAttrInArray(this._cls, "text-align");
			var transform = CGSG.cssManager.getAttrInArray(this._cls, "text-transform");
			var strokeWidth = CGSG.cssManager.getAttrInArray(this._cls, "-webkit-text-stroke-width");
			if (!cgsgExist(strokeWidth)) {
				strokeWidth = CGSG.cssManager.getAttrInArray(this._cls, "text-stroke-width");
			}
			var strokeColor = CGSG.cssManager.getAttrInArray(this._cls, "-webkit-text-stroke-color");
			if (!cgsgExist(strokeColor)) {
				strokeColor = CGSG.cssManager.getAttrInArray(this._cls, "text-stroke-color");
			}

			if (cgsgExist(cl)) {
				//value is given as "rgb(xx, yy, zz)". Let's convert it to hex
				var rgb = CGSGColor.fromString(cl);
				this.color = CGSGColor.rgb2hex(rgb.r, rgb.g, rgb.b);
			}
			if (cgsgExist(style)) {
				this._style = style;
			}
			if (cgsgExist(variant)) {
				this._variant = variant;
			}
			if (cgsgExist(weight)) {
				this._weight = weight;
			}
			if (cgsgExist(size)) {
				this._sizeT = size;
				this._size = CGSG.cssManager.getNumber(size);
				this._lineHeight = this._size;
			}
			if (cgsgExist(family)) {
				this._typo = family;
			}
			if (cgsgExist(height)) {
				this._lineHeight = height;
			}
			if (cgsgExist(align)) {
				this._align = align;
			}
			if (cgsgExist(transform)) {
				this._transform = transform;
			}
			if (cgsgExist(strokeWidth)) {
				this.lineWidth = strokeWidth;
			}
			if (cgsgExist(strokeColor)) {
				this.lineColor = strokeColor;
			}

			this._invalidateFont();
		},

		_invalidateFont : function() {
			var st = (cgsgExist(this._style) && this._style.length > 0) ? (this._style + ' ') : "";
			var va = (cgsgExist(this._variant) && this._variant.length > 0) ? (this._variant + ' ') : "";
			var we = (cgsgExist(this._weight) && this._weight.length > 0) ? (this._weight + ' ') : "";
			var si = (cgsgExist(this._sizeT)) ? (this._sizeT + ' ') : "";
			var ty = (cgsgExist(this._typo) && this._typo.length > 0) ? (this._typo + ' ') : "";

			this._fullfont = st + va + we + si + ty;
		},

		/**
		 * Set the wrap mode for the text if maxWidth > 0
		 * @method setWrapMode
		 * @param {Object} mode a CGSGWrapMode (CGSGWrapMode.WORD, CGSGWrapMode.LETTER)
		 * @param {Boolean} mustRecomputeDimension (default : true)
		 * @example
		 *      myTextNode.setWrapMode(CGSGWrapMode.WORD, true);
		 */
		setWrapMode : function(mode, mustRecomputeDimension) {
			this._wrapMode = mode;
			this.invalidate();
			if (mustRecomputeDimension !== false) {
				this.computeRealDimension();
			}
		},

		/**
		 * Set the string to replace the tabulation characters
		 * @method setTabulationString
		 * @param {String} tab TExt to replace tabulation (ie: 4 spaces, ...)
		 * @param {Boolean} mustRecomputeDimension (default : true)
		 */
		setTabulationString : function(tab, mustRecomputeDimension) {
			this._tabulation = tab;
			this._text = this._text.replace(/(\t)/g, this._tabulation);
			this.invalidate();
			if (mustRecomputeDimension !== false) {
				this.computeRealDimension();
			}
		},

		/**
		 * @method setText
		 * @param {String} t the new text
		 * @param {Boolean} mustRecomputeDimension (default : true)
		 */
		setText : function(t, mustRecomputeDimension) {
			this._text = t;
			this._text = this._text.replace(/(\r\n|\n\r|\r|\n)/g, "\n");
			this._text = this._text.replace(/(\t)/g, this._tabulation);
			this._sections = this._text.split("\n");

			if (mustRecomputeDimension !== false) {
				this.computeRealDimension();
			}

			if ((!cgsgExist(this._maxWidth) || this._maxWidth <= 0) && this.getWidth() > 0)
				this.setMaxWidth(this.getWidth() + 1, true);

			this.invalidate();
		},

		/**
		 * @method setTextBaseline
		 * @param {String} b A String (Possible values : "top", "hanging", "middle", "alphabetic", "ideographic", "bottom")
		 * @param {Boolean} mustRecomputeDimension (default : true)
		 */
		setTextBaseline : function(b, mustRecomputeDimension) {
			this._textBaseline = b;
			this.invalidate();
			if (mustRecomputeDimension !== false) {
				this.computeRealDimension();
			}
		},

		/**
		 * @method setStyle
		 * @param {String} s "" by default
		 * @param {Boolean} mustRecomputeDimension (default : true)
		 */
		setStyle : function(s, mustRecomputeDimension) {
			this._style = s;
			this._invalidateFont();
			this.invalidate();
			if (mustRecomputeDimension !== false) {
				this.computeRealDimension();
			}
		},

		/**
		 * Line height when wrap the text.
		 * A line height is the size between 2 tops of line
		 * @method setLineHeight
		 * @param {Number} l height of a line
		 * @param {Boolean} mustRecomputeDimension (default : true)
		 */
		setLineHeight : function(l, mustRecomputeDimension) {
			this._lineHeight = l;
			this.invalidate();
			if (mustRecomputeDimension !== false) {
				this.computeRealDimension();
			}
		},

		/**
		 * @method setSize
		 * @param {Number} s the new size (an integer)
		 * @param {Boolean} mustRecomputeDimension (default : true)
		 */
		setSize : function(s, mustRecomputeDimension) {
			this._size = s;
			this._invalidateFont();
			this.invalidate();
			if (mustRecomputeDimension !== false) {
				this.computeRealDimension();
			}
		},

		/**
		 * @method setTypo
		 * @param {String} t "Arial" by default
		 * @param {Boolean} mustRecomputeDimension (default : true)
		 */
		setTypo : function(t, mustRecomputeDimension) {
			this._typo = t;
			this._invalidateFont();
			this.invalidate();
			if (mustRecomputeDimension !== false) {
				this.computeRealDimension();
			}
		},

		/**
		 * @method setWeight
		 * @param w
		 */
		setWeight : function(w) {
			this._weight = w;
			this._invalidateFont();
			this.invalidate();
		},

		/**
		 * @method setVariant
		 * @param v
		 */
		setVariant : function(v) {
			this._variant = v;
			this._invalidateFont();
			this.invalidate();
		},

		/**
		 * @method setTextAlign
		 * @param {String} a A String (Possible values : "left", "right", "center")
		 */
		setTextAlign : function(a) {
			this._align = a;
			this.invalidate();
		},

		/**
		 * compute the real dimension of the text
		 * @method computeRealDimension
		 */
		computeRealDimension : function() {
			this.metrics.width = 0;
			var fakeCanvas = document.createElement('canvas');
			//fakeCanvas.height = 800;
			//fakeCanvas.width = 1000;
			var fakeContext = fakeCanvas.getContext('2d');

			this._doRender(fakeContext, false);
			//this.resizeTo(this.getWidth(), this.getHeight());

			fakeCanvas.width = 0;
			fakeCanvas.height = 0;
			fakeCanvas = null;
		},

		/**
		 * @method setMaxWidth
		 * @param {Number} m Max Width for the text
		 * @param {Boolean} mustRecomputeDimension (default : true)
		 */
		setMaxWidth : function(m, mustRecomputeDimension) {
			this._maxWidth = m;
			if (this._maxWidth > 0) {
				this.dimension.width = m;
				if (mustRecomputeDimension !== false) {
					this.computeRealDimension();
				}
			}
		},

		/**
		 * Increase/decrease current dimension with adding values
		 * @method resizeWith
		 * @param {Number} w
		 * @param {Number} h
		 * */
		resizeWith : function(w, h) {
			if (this._maxWidth + w > 0) {
				this._afterResize(this._maxWidth + w);
			}
		},

		_afterResize : function(m) {
			var w = this.getWidth();
			this._maxWidth = m;
			//this.dimension.width = m;//Math.max(m, this.dimension.width);
			this.computeRealDimension();

			if (this._nbLines == 1 && this.getWidth() <= w)
				this._maxWidth = this.getWidth() + 1;

			this._applyContraintsToFollowers();
			this._endResize();
		},

		/**
		 * Custom rendering
		 * @method render
		 * @protected
		 * @param {CanvasRenderingContext2D} context the context into render the node
		 * */
		render : function(context) {
			context.fillStyle = this.color || this.bkgcolors[0];

			this._doRender(context, false);
		},

		/**
		 * Do the effective render
		 * @method _doRender
		 * @param {CanvasRenderingContext2D} context the context into render the node
		 * @param {Boolean} isGhostmode. If true a square will be rendered instead of the text.
		 * @private
		 */
		_doRender : function(context, isGhostmode) {
			context.font = this._fullfont;

			context.textAlign = this._align;
			context.textBaseline = this._textBaseline;

			var s = 0, textW = 0, posX = 0, posY = 0, mt;
			if (this.crossed) {
				context.save();
				context.strokeStyle = "grey";
				context.moveTo(this.getWidth(), 3);
				context.lineTo(0, this.getHeight() + 3);
				context.stroke();
				context.restore();
			}
			if (!cgsgExist(this._maxWidth) || this._maxWidth <= 0) {
				posX = this._computeDecalX(this.getWidth());
				for (s = 0 ; s < this._sections.length ; s++) {
					textW = context.measureText(this._sections[s]).width;
					this._drawText(this._sections[s], posX, posY, context, isGhostmode, textW);
					posY += this._lineHeight;
				}
				this._nbLines = this._sections.length;
			}
			else { //if (this._maxWidth > 0
				this._nbLines = 0;


				for (s = 0 ; s < this._sections.length ; s++) {
					var words = this._sections[s].split(this._wrapMode.space);
					var nbWords = 0;
					var testLine = "";
					posY = 0;
					textW = 0;
					if (words.length == 1) {
						textW = context.measureText(testLine).width;
						posY = this._nbLines * this._lineHeight;
						posX = this._computeDecalX(this.getWidth());
						this._drawText(testLine, posX, posY, context, isGhostmode, textW);
						this._nbLines++;
					}
					else {
						while (nbWords < words.length) {

							testLine = words[nbWords];
							mt = context.measureText(testLine + this._wrapMode.space + words[nbWords + 1]);
							while (mt.width < (this._maxWidth /*- 5*/) &&
								   nbWords < words.length - 1
								) {
								if (testLine != "") {
									testLine += this._wrapMode.space;
								}
								testLine += words[++nbWords];
								mt = context.measureText(testLine + this._wrapMode.space + words[nbWords + 1]);
							}

							textW = context.measureText(testLine).width;
							posY = this._nbLines * this._lineHeight;
							posX = this._computeDecalX(this.getWidth());
							this._drawText(testLine, posX, posY, context, isGhostmode, textW);
							this._nbLines++;

							++nbWords;
						}
					}
				}


			}

			//region constraint

			var rgc;
			if (this.nodeConstraint !== null) {
				rgc = this.nodeConstraint.getAbsoluteRegion();
			}
			else {
				rgc = this.regionConstraint;
			}
			if (rgc !== null) {
				var r = this.getAbsoluteRegion();
				var d = this.getAbsBottom() - (rgc.position.x + rgc.dimension.height);
				if (d > 0)
					this.translateWith(0, -d);
			}
		},

		/**
		 * @method _drawText
		 * @param {String} text
		 * @param {Number} x
		 * @param {Number} y
		 * @param {CanvasRenderingContext2D} context the context into render the node
		 * @param {Boolean} isGhostmode
		 * @param {Number} width
		 * @private
		 */
		_drawText : function(text, x, y, context, isGhostmode, width) {
			if (cgsgExist(this._transform)) {
				if (this._transform === "capitalize") {
					text = text.capitalize();
				}
				if (this._transform === "lowercase") {
					text = text.toLowerCase();
				}
				if (this._transform === "uppercase") {
					text = text.toUpperCase();
				}
			}

			if (isGhostmode) {
				this._drawSquare(x, y, width, context);
				return;
			}
			//uncomment this to debug
			//context.fillStyle = "red";
			//this._drawSquare(x, y, width, context);
			//context.fillStyle = this.color;

			if (cgsgExist(this.lineWidth) && this.lineWidth > 0) {
				context.strokeText(text, x, y);
			}

			if (cgsgExist(this.bkgcolors[0]) && this.globalAlpha > 0) {
				context.fillText(text, x, y);
			}

			var mt = context.measureText(text);
			if (mt.width > this.metrics.width) {
				this.metrics.width = mt.width;
			}
		},

		/**
		 * @method _drawSquare
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} width
		 * @param {CanvasRenderingContext2D} context the context into render the node
		 * @private
		 */
		_drawSquare : function(x, y, width, context) {
			context.fillRect(x - this._computeDecalX(width), y + this._computeDecalY(), width, this._size);
		},

		/**
		 * @method getHeight
		 * @return {Number}
		 */
		getHeight : function() {
			if (this._nbLines == 0) {
				return this._nbLines;
			}

			return ((this._nbLines - 1) * this._lineHeight) + this._size;
		},

		/**
		 * @method getWidth
		 * @return {Number}
		 */
		getWidth : function() {
			return this.metrics.width;
		},

		/**
		 * @private
		 * @method _computeDecalX
		 * @return {Number}
		 */
		_computeDecalX : function(width) {
			var decalX = 0;
			if (this._align == "start" || this._align == "left") {
				decalX = 0.0;
			}
			else if (this._align == "center") {
				decalX = width / 2.0;
			}
			else if (this._align == "end" || this._align == "right") {
				decalX = width;
			}

			return decalX;
		},

		/**
		 * Browsers don't render the text in the exact same way.
		 * It can be few pixels of difference in Y position
		 * @private
		 * @method _computeDecalY
		 * @return {Number}
		 */
		_computeDecalY : function() {
			var decalY = 0;
			if (this._textBaseline == "top" || this._textBaseline == "hanging") {
				decalY = this._size / cgsgCurrentExplorer.textDecalYTop;
			}
			else if (this._textBaseline == "middle") {
				decalY = -this._size / cgsgCurrentExplorer.textDecalYMiddle;
			}
			else if (this._textBaseline == "alphabetic" || this._textBaseline == "ideographic") {
				decalY = -this._size * cgsgCurrentExplorer.textDecalYAlpha;
			}
			else if (this._textBaseline == "bottom") {
				decalY = -this._size * cgsgCurrentExplorer.textDecalYBottom;
			}

			return decalY;
		},

		/**
		 * Override ghost "do rendering" function.
		 *
		 * @method doRenderGhost
		 * @protected
		 * @param {CanvasRenderingContext2D} ghostContext The context for the ghost rendering
		 */
		doRenderGhost : function(ghostContext) {
			//save current state
			this.beforeRenderGhost(ghostContext);

			if (this.globalAlpha > 0) {
				this.renderGhost(ghostContext);
				ghostContext.fillStyle = CGSG.ghostColor;

				this._doRender(ghostContext, true);
			}

			//restore state
			this.afterRenderGhost(ghostContext);
		},

		/**
		 * Render the resize handler
		 * @protected
		 * @method renderBoundingBox
		 * @param {CanvasRenderingContext2D} context the context into render the node
		 */
		renderBoundingBox : function(c) {
			var decalX = 0;
			var decalY = this._computeDecalY();

			//this._absPos = this.getAbsPosition(false);
			//this._absSca = this.getAbsScale(false);

			var height = this.getHeight();
			var width = this.getWidth();

			if (cgsgExist(this.selectionLineWidth) && this.selectionLineWidth > 0) {
				c.strokeStyle = this.selectionLineColor;

				c.lineWidth = this.selectionLineWidth / this._absSca.y;
				c.beginPath();
				//top line
				c.moveTo(decalX, decalY);
				c.lineTo(width, decalY);
				//bottom line
				c.moveTo(decalX, decalY + height);
				c.lineTo(width, decalY + height);
				c.stroke();
				c.closePath();

				c.lineWidth = this.selectionLineWidth / this._absSca.x;
				c.beginPath();
				//left line
				c.moveTo(decalX, decalY);
				c.lineTo(decalX, decalY + height);
				//right line
				c.moveTo(decalX + width, decalY);
				c.lineTo(decalX + width, decalY + height);
				c.stroke();
				c.closePath();
			}

			//draw the resize handles
			if (this.isResizable) {
				// draw the handle boxes
				var halfX = this.handleSize / (2 * this._absSca.x);
				var halfY = this.handleSize / (2 * this._absSca.y);

				// 0  1  2
				// 3     4
				// 5  6  7

				// top left, middle, right
				this.handles[0].translateTo(-halfX, -halfY + decalY);
				this.handles[1].translateTo(width / 2 - halfX, -halfY + decalY);
				this.handles[2].translateTo(width - halfX, -halfY + decalY);

				// middle left
				this.handles[3].translateTo(-halfX, height / 2 - halfY + decalY);

				// middle right
				this.handles[4].translateTo(width - halfX,
											height / 2 - halfY + decalY);

				// bottom left, middle, right
				this.handles[6].translateTo(width / 2 - halfX,
											height - halfY + decalY);
				this.handles[5].translateTo(-halfX, height - halfY + decalY);
				this.handles[7].translateTo(width - halfX,
											height - halfY + decalY);

				for (var i = 0 ; i < 8 ; i++) {
					this.handles[i].size = this.handleSize;
					this.handles[i].fillColor = this.handleColor;
					this.handles[i].strokeColor = this.selectionLineColor;
					this.handles[i].lineWidth = this.selectionLineWidth;
					this.handles[i].render(c);
				}
			}
		},

		/**
		 * @method copy
		 * @return {CGSGNodeText} a copy of this node
		 */
		copy : function() {
			var node = new CGSGNodeText(this.position.x, this.position.y, this._text);
			//call the super method
			node = this._super(node);

			node.setSize(this._size, false);
			node.setTextAlign(this._align, false);
			node.setTextBaseline(this._textBaseline, false);
			node.setStroke(this.lineWidth, false);
			node.setTypo(this._typo, false);
			node.setMaxWidth(this._maxWidth, false);
			node.setLineHeight(this._lineHeight, false);
			node.setWrapMode(this._wrapMode, false);
			node.setTabulationString(this._tabulation, false);
			node.pickNodeMethod = this.pickNodeMethod;

			this.setText(this._text, true);
			this.resizeTo(this.getWidth(), this.getHeight());
			return node;
		}
	}
);
