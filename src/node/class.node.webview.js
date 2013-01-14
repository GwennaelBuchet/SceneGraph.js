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
 * The different rendering mode
 * @class CGSGWEBVIEWMODE
 * @type {Object}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGWEBVIEWMODE = {
	/**
	 * @property LIVE
	 */
	LIVE   : 0,
	/**
	 * @property PREVIEW
	 */
	PREVIEW: 1
};

/*
 * TODO :
 * - When resize or drag : switch to PREVIEW mode to allow mouse over the webview
 * - load a page in AJAX and make an image from it to assign to the PREVIEW mode
 */

"use strict";

/**
 * @class CGSGNodeWebview
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on X
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @param {String} url URL of the webpage
 * @type {CGSGNodeWebview}
 */
var CGSGNodeWebview = CGSGNode.extend(
	{
		initialize: function (x, y, width, height, url) {
			this._super(x, y, CGSGMath.fixedPoint(width), CGSGMath.fixedPoint(height));

			/**
			 * Size of the area around the webview in LIVE mode
			 * @property threshold
			 * @default 20
			 * @type {Number}
			 */
			this.threshold = 20;
			/**
			 * Color of the area around the webview in LIVE mode
			 * @property color
			 * @default "lightGray"
			 * @type {String}
			 */
			this.color = "lightGray";
			/**
			 * Color of line around the webview in LIVE mode
			 * @property color
			 * @default "Gray"
			 * @type {String}
			 */
			this.lineColor = "Gray";

			/**
			 * @property classType
			 * @type {String}
			 */
			this.classType = "CGSGNodeWebview";

			/**
			 * A HTML tag that contains the web view : an iframe
			 * @property _liveContainer
			 * @type {HTMLElement}
			 * @private
			 */
			this._liveContainer = null;

			/**
			 * A CGSGNodeImage rendering the preview of the webpage
			 * @property _previewContainer
			 * @type {CGSGNodeImage}
			 * @private
			 */
			this._previewContainer = null;

			/**
			 * URL of the web page
			 * @property _url
			 * @type {String}
			 * @private
			 */
			this._url = url;

			/**
			 * URL for the preview mode
			 * @property _previewURL
			 * @private
			 * @type {String}
			 */
			this._previewURL = null;

			this._createLiveContainer();
			this._createPreviewContainer();

			this.switchMode(CGSGWEBVIEWMODE.LIVE);
		},

		/**
		 * Initialize and add the live container to the HTML body
		 * @method _initLiveContainer
		 * @private
		 */
		_initLiveContainer: function () {
			if (!cgsgExist(this._liveContainer)) {
				this._createLiveContainer();
			}

			document.body.appendChild(this._liveContainer);
		},

		/**
		 * Initialize and add the CGSGNodeImage
		 * @method _initPreviewContainer
		 * @private
		 */
		_initPreviewContainer: function () {
			if (!cgsgExist(this._previewContainer)) {
				this._createPreviewContainer();
			}

			this.addChild(this._previewContainer);

			//load the webcontent via Ajax
			//this._loadPageAsync();
		},

		/**
		 * Create an IFRAME tag in the _liveContainer property
		 * @method _createLiveContainer
		 * @private
		 */
		_createLiveContainer: function () {
			var uri = "";
			if (cgsgExist(this._url)) {
				uri = this._url;
			}

			this._liveContainer = document.createElement("IFRAME");

			this._liveContainer.style.position = "absolute";
			this._liveContainer.setAttribute("src", uri);
		},

		/**
		 * Create the CGSGNodeImage to contain the preview
		 * @method _createPreviewContainer
		 * @private
		 */
		_createPreviewContainer: function () {
			this._previewContainer =
			new CGSGNodeImage(0, 0, this._previewURL);

			this._previewContainer.isTraversable = false;
		},

		/*
		 *
		 * @private
		 * @method _loadPageAsync
		 */
		/*_loadPageAsync : function () {

		 },*/

		/**
		 * @method setURL
		 * @param {String} url
		 */
		setURL: function (url) {
			this._url = url;

			if (cgsgExist(this._liveContainer)) {
				this._liveContainer.setAttribute("src", this._url);
			}
		},

		/**
		 * Get a String representing the URL
		 * @method getURL
		 * @return {string}
		 */
		getURL: function () {
			return this._url;
		},

		/**
		 * Set the URL of the image for the preview mode (CGSGWEBVIEWMODE.PREVIEW)
		 * @method setPreviewURL
		 * @param {String} imageURL
		 */
		setPreviewURL: function (imageURL) {
			this._previewURL = imageURL;
			this._previewContainer.setURL(this._previewURL);
		},

		/**
		 * Switch between rendering mode
		 * @method switchMode
		 * @param {Number} mode a CGSGWEBVIEWMODE enum : LIVE or PREVIEW
		 */
		switchMode: function (mode) {
			if (mode === CGSGWEBVIEWMODE.LIVE) {
				this.detachChild(this._previewContainer);
				this._initLiveContainer();
			}
			else {
				//Initially, there is no mode, so we cannot remove the child from the Body
				if (this._mode === CGSGWEBVIEWMODE.LIVE) {
					document.body.removeChild(this._liveContainer);
				}
				this._initPreviewContainer();
			}

			this._mode = mode;
		},

		/**
		 * @method getCurrentMode
		 * @return {CGSGWEBVIEWMODE} the current mode
		 */
		getCurrentMode: function () {
			return this._mode;
		},

		/**
		 * @protected
		 * @method render
		 * Custom rendering
		 * */
		render: function (context) {
			//save current state
			this.beforeRender(context);

			context.globalAlpha = this.globalAlpha;

			if (this._mode === CGSGWEBVIEWMODE.LIVE) {
				context.fillStyle = this.color;
				context.strokeStyle = this.lineColor;
				context.lineWidth = this.lineWidth;

				//we draw the rect at (0,0) because we have already translated the context to the correct position
				context.fillRect(0, 0, this.dimension.width, this.dimension.height);

				context.strokeRect(0, 0, this.dimension.width, this.dimension.height);

				context.strokeRect(this.threshold - 2, this.threshold - 2,
								   8 + this.dimension.width - this.threshold * 2,
								   8 + this.dimension.height - this.threshold * 2);

				if (cgsgExist(this._liveContainer)) {
					this._liveContainer.style.left = (this.getAbsoluteLeft() + this.threshold) + "px";
					this._liveContainer.style.top = (this.getAbsoluteTop() + this.threshold) + "px";
					this._liveContainer.style.width = (this.getAbsoluteWidth() - this.threshold * 2) + "px";
					this._liveContainer.style.height = (this.getAbsoluteHeight() - this.threshold * 2) + "px";
				}
			}
			else {
				this._previewContainer.resizeTo(this.getWidth(), this.getHeight());

				//draw this zone
				context.fillStyle = this.color;

				//we draw the rect at (0,0) because we have already translated the context to the correct position
				context.fillRect(0, 0, this.getWidth(), this.getHeight());
			}

			//restore state
			this.afterRender(context);
		},

		/**
		 * Free the memory taken by this node
		 * @method free
		 */
		free: function () {
			if (cgsgExist(this._liveContainer)) {
				cgsgCanvas.removeChild(this._liveContainer);
				delete (this._liveContainer);
			}

			this._super();
		},

		/**
		 * Return the copy of this node
		 * @method copy
		 * @return {CGSGNodeWebview}
		 */
		copy: function () {
			var node = new CGSGNodeWebview(this.position.x, this.position.y, this.dimension.width,
										   this.dimension.height, this.url);
			//call the super method
			node = this._super(node);

			node.threshold = this.threshold;
			node.color = this.color;
			node.lineColor = this.lineColor;

			node.switchMode(this.mode);

			return node;
		}
	}
);
