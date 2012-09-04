/**
 * Copyright (c) 2012  Capgemini Technology Services (hereinafter “Capgemini”)
 *
 * License/Terms of Use
 *
 * Permission is hereby granted, free of charge and for the term of intellectual property rights on the Software, to any
 * person obtaining a copy of this software and associated documentation files (the "Software"), to use, copy, modify
 * and propagate free of charge, anywhere in the world, all or part of the Software subject to the following mandatory conditions:
 *
 *   •	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 *  Any failure to comply with the above shall automatically terminate the license and be construed as a breach of these
 *  Terms of Use causing significant harm to Capgemini.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  Except as contained in this notice, the name of Capgemini shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Capgemini.
 *
 *  These Terms of Use are subject to French law.
 *
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 * @date 07/08/2012
 *
 * Purpose:
 * Subclassing CGSGNode.
 *
 * A CGSGText represent a text node
 */
var CGSGWrapMode = {
	WORD     : {space : " "},
	LETTER   : {space : ""},
	SENTENCE : {space : "."}
};

var CGSGNodeText = CGSGNode.extend(
	{
		initialize : function (x, y, text) {
			this._super(x, y, -1, -1);

			///// @public //////
			this._text = "";
			this.color = "#444444";
			//size of the text, in pt
			this._size = 18;
			this._textAlign = "left";
			this._textBaseline = "top";
			this._stroke = false;
			this._typo = "Arial";
			//max width for the text. if -1, so no max will be used
			this._maxWidth = -1;
			//line height when wrap the text
			this._lineHeight = this._size;
			this._wrapMode = CGSGWrapMode.LETTER;

			//list of sections in the text. a section is delimited by a Carriage Return
			this._sections = [];
			//the string to replace the tabulation characters
			this._tabulation = "    ";

			this.pickNodeMethod = "ghost";//CGSGPickNodeMethod.GHOST;

			//computed each frame it is rendered. Contains width and height
			this.metrics = {width : 1};
			this._nbLines = 1;

			this.classType = "CGSGNodeText";

			this.setText(text);
			this.resizeTo(this.getWidth(), this.getHeight());
		},

		/**
		 * set the wrapmode for the text if maxWidth > 0
		 * @param a CGSGWrapMode (CGSGWrapMode.WORD, CGSGWrapMode.LETTER)
		 */
		setWrapMode : function (mode, mustRecomputeDimension) {
			this._wrapMode = mode;
			if (mustRecomputeDimension !== false) {
				this.computeRealDimension();
			}
		},

		/**
		 * set the string to replace the tabulation characters
		 */
		setTabulationString : function (tab, mustRecomputeDimension) {
			this._tabulation = tab;
			this._text = this._text.replace(/(\t)/g, this._tabulation);
			if (mustRecomputeDimension !== false) {
				this.computeRealDimension();
			}
		},

		/**
		 *
		 * @param s a Boolean
		 * @param mustRecomputeDimension true by default
		 */
		setStroke : function (s, mustRecomputeDimension) {
			this._stroke = s;
			if (mustRecomputeDimension !== false) {
				this.computeRealDimension();
			}
		},

		/**
		 *
		 * @param t the new text
		 * @param mustRecomputeDimension true by default
		 */
		setText : function (t, mustRecomputeDimension) {
			this._text = t;
			this._text = this._text.replace(/(\r\n|\n\r|\r|\n)/g, "\n");
			this._text = this._text.replace(/(\t)/g, this._tabulation);
			this._sections = this._text.split("\n");
			if (mustRecomputeDimension !== false) {
				this.computeRealDimension();
			}
		},

		/**
		 *
		 * @param s the new size (an integer)
		 * @param mustRecomputeDimension true by default
		 */
		setSize : function (s, mustRecomputeDimension) {
			this._size = s;
			if (mustRecomputeDimension !== false) {
				this.computeRealDimension();
			}
		},

		/**
		 *
		 * @param a A String ("left", "right", "center")
		 */
		setTextAlign : function (a) {
			this._textAlign = a;
		},

		/**
		 *
		 * @param b A String ("bottom", "top", ...)
		 * @param mustRecomputeDimension true by default
		 */
		setTextBaseline : function (b, mustRecomputeDimension) {
			this._textBaseline = b;
			if (mustRecomputeDimension !== false) {
				this.computeRealDimension();
			}
		},

		/**
		 *
		 * @param t "Arial" by default
		 * @param mustRecomputeDimension true by default
		 */
		setTypo : function (t, mustRecomputeDimension) {
			this._typo = t;
			if (mustRecomputeDimension !== false) {
				this.computeRealDimension();
			}
		},

		/**
		 *
		 * @param m Max Width for the text
		 * @param mustRecomputeDimension true by default
		 */
		setMaxWidth : function (m, mustRecomputeDimension) {
			this._maxWidth = m;
			this.resizeTo(m, this.getHeight());
			if (mustRecomputeDimension !== false) {
				this.computeRealDimension();
			}
		},

		/**
		 *
		 * @param l height of a line, in case of wrap is true
		 * @param mustRecomputeDimension true by default
		 */
		setLineHeight : function (l, mustRecomputeDimension) {
			this._lineHeight = l;
			if (mustRecomputeDimension !== false) {
				this.computeRealDimension();
			}
		},

		/**
		 * compute the real dimension of the text
		 */
		computeRealDimension : function () {
			this.metrics.width = 0;
			var fakeCanvas = document.createElement('canvas');
			fakeCanvas.height = 800;
			fakeCanvas.width = 1000;
			var fakeContext = fakeCanvas.getContext('2d');

			this._doRender(fakeContext);
			//this.resizeTo(this.getWidth(), this.getHeight());

			fakeCanvas.width = 0;
			fakeCanvas.height = 0;
			delete(fakeCanvas);
		},

		/**
		 * @override
		 * Must be defined to allow the scene graph to render the image nodes
		 * */
		render : function (context) {
			//save current state
			this.beforeRender(context);

			context.fillStyle = this.color;

			this._doRender(context);

			//restore state
			this.afterRender(context);
		},

		/**
		 * @private
		 * Do the effective render
		 * @param context
		 */
		_doRender : function (context, ghostmode) {
			context.font = this._size + "pt " + this._typo;
			context.textAlign = this._textAlign;
			context.textBaseline = this._textBaseline;
			var s = 0;
			var textW = 0;
			var posX = 0
			var posY = 0;

			if (isNaN(this._maxWidth) || this._maxWidth <= 0) {
				posX = this._computeDecalX(this.getWidth());
				for (s = 0; s < this._sections.length; s++) {
					textW = context.measureText(this._sections[s]).width;
					this._drawText(this._sections[s], posX, posY, context, ghostmode, textW);
					posY += this._lineHeight;
				}
				this._nbLines = this._sections.length;
			}
			else {
				this._nbLines = 0;
				for (s = 0; s < this._sections.length; s++) {
					var words = this._sections[s].split(this._wrapMode.space);
					var nbWords = 1;
					var testLine = words[0];
					posY = 0;
					textW = 0;
					while (nbWords < words.length) {
						while ((textW = context.measureText(testLine).width) < this._maxWidth &&
							   nbWords < words.length) {
							if (testLine != "") {
								testLine += this._wrapMode.space;
							}
							testLine += words[nbWords++];
						}
						textW = context.measureText(testLine).width;
						posY = this._nbLines * this._lineHeight;
						posX = this._computeDecalX(this.getWidth());
						this._drawText(testLine, posX, posY, context, ghostmode, textW);
						this._nbLines++;

						//reinit for the next loop
						testLine = "";
						textW = 0;
					}
				}
			}
		},

		/**
		 * @private
		 * @param x
		 * @param y
		 * @param context
		 */
		_drawText : function (text, x, y, context, ghostmode, width) {
			if (ghostmode === true) {
				return this._drawSquare(x, y, width, context);
			}
			//uncomment this to debug
			/*context.fillStyle = "red";
			 this._drawSquare(x, y, width, context);
			 context.fillStyle = this.color;*/

			if (this._stroke) {
				context.strokeText(text, x, y);
			}
			else {
				context.fillText(text, x, y);
			}

			var mt = context.measureText(text);
			if (mt.width > this.metrics.width) {
				this.metrics.width = mt.width;
			}
		},

		/**
		 *
		 * @param text
		 * @param x
		 * @param y
		 * @param context
		 */
		_drawSquare : function (x, y, width, context) {
			context.fillRect(x - this._computeDecalX(width), y + this._computeDecalY(), width, this._size * 1.0);
		},

		/**
		 * @public
		 * return
		 */
		getHeight : function () {
			if (this._nbLines == 0) {
				return this._nbLines;
			}
			else if (this._nbLines == 1) {
				return this._size;
			}

			return (this._nbLines * this._size) + ((this._nbLines - 1) * (this._lineHeight - this._size));
		},

		/**
		 * @public
		 * return
		 */
		getWidth : function () {
			return this.metrics.width;
		},

		/**
		 * @private
		 */
		_computeDecalX : function (width) {
			var decalX = 0;
			if (this._textAlign == "start" || this._textAlign == "left") {
				decalX = 0.0;
			}
			else if (this._textAlign == "center") {
				decalX = width / 2.0;
			}
			else if (this._textAlign == "end" || this._textAlign == "right") {
				decalX = width;
			}

			return decalX;
		},

		/**
		 * @private
		 */
		_computeDecalY : function () {
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
		 * Empty ghost rendering function.
		 * Render here your custom nodes with a single color (this._ghostColor, defined in the CGSGNode class).
		 * This will be used by the SceneGraph to know if the mouse cursor is over this nodes.
		 *
		 * @param ghostContext The context for the ghost rendering
		 */
		renderGhost : function (ghostContext) {
			//save current state
			this.beforeRenderGhost(ghostContext);

			//draw this zone in this._ghostColor
			ghostContext.fillStyle = this._ghostColor;

			this._doRender(ghostContext, true);

			//restore state
			this.afterRenderGhost(ghostContext);
		},

		/**
		 * @private
		 * Render the resize handler
		 * */
		renderSelected : function (context) {
			var decalX = 0;
			var decalY = this._computeDecalY();

			this._absolutePosition = this.computeAbsolutePosition();
			this._absoluteScale = this.computeAbsoluteScale();

			var height = this.getHeight();
			var width = this.getWidth();

			context.strokeStyle = this.selectionLineColor;

			context.lineWidth = this.selectionLineWidth / this._absoluteScale.y;
			context.beginPath();
			//top line
			context.moveTo(decalX, decalY);
			context.lineTo(width, decalY);
			//bottom line
			context.moveTo(decalX, decalY + height);
			context.lineTo(width, decalY + height);
			context.stroke();
			context.closePath();

			context.lineWidth = this.selectionLineWidth / this._absoluteScale.x;
			context.beginPath();
			//left line
			context.moveTo(decalX, decalY);
			context.lineTo(decalX, decalY + height);
			//right line
			context.moveTo(decalX + width, decalY);
			context.lineTo(decalX + width, decalY + height);
			context.stroke();
			context.closePath();

			//draw the resize handles
			if (this.isResizable) {
				// draw the handle boxes
				var halfX = this.selectionHandleSize / (2 * this._absoluteScale.x);
				var halfY = this.selectionHandleSize / (2 * this._absoluteScale.y);

				// 0  1  2
				// 3     4
				// 5  6  7

				// top left, middle, right
				this.resizeHandles[0].translateTo(-halfX, -halfY + decalY);
				this.resizeHandles[1].translateTo(width / 2 - halfX, -halfY + decalY);
				this.resizeHandles[2].translateTo(width - halfX, -halfY + decalY);

				// middle left
				this.resizeHandles[3].translateTo(-halfX, height / 2 - halfY + decalY);

				// middle right
				this.resizeHandles[4].translateTo(width - halfX,
												  height / 2 - halfY + decalY);

				// bottom left, middle, right
				this.resizeHandles[6].translateTo(width / 2 - halfX,
												  height - halfY + decalY);
				this.resizeHandles[5].translateTo(-halfX, height - halfY + decalY);
				this.resizeHandles[7].translateTo(width - halfX,
												  height - halfY + decalY);

				for (var i = 0; i < 8; i++) {
					this.resizeHandles[i].size = this.selectionHandleSize;
					this.resizeHandles[i].color = this.selectionHandleColor;
					this.resizeHandles[i].render(context);
				}
			}
		},

		/**
		 *
		 * @return a copy of this node
		 */
		copy : function () {
			var node = new CGSGText(this.position.x, this.position.y, this._text);
			//call the super method
			node = this._super(node);

			this.color = "#444444";
			//size of the text, in pt
			node.setSize(this._size, false);
			node.setTextAlign(this._textAlign, false);
			node.setTextBaseline(this._textBaseline, false);
			node.setStroke(this._stroke, false);
			node.setTypo(this._typo, false);
			node.setMaxWidth(this._maxWidth, false);
			node.setLineHeight(this._lineHeight, false);
			node.setWrapMode(this._wrapMode, false);
			node.setTabulationString(this._tabulation, false);
			node.pickNodeMethod = this.pickNodeMethod;

			this.setText(this._text);
			this.resizeTo(this.getWidth(), this.getHeight());
			return node;
		}
	}
);
