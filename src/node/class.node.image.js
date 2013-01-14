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
 * A CGSGNodeImage represent an image node
 *
 * @class CGSGNodeImage
 * @extends CGSGNode
 * @module Node
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on X
 * @param {String} urlImage URL of the src image. Can be null tobe loaded later.
 * @type {CGSGNodeImage}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGNodeImage = CGSGNode.extend(
	{
		initialize: function (x, y, urlImage) {
			this._super(x, y, 0, 0);

			/**
			 * @property classType
			 * @type {String}
			 */
			this.classType = "CGSGNodeImage";

			/**
			 * the selected effect to be applied
			 * @property effect
			 * @default null
			 * @type {CGSGEffect}
			 */
			this.effect = null;
			/**
			 * URL of the image
			 * @property _urlImage
			 * @type {String}
			 * @private
			 */
			this._urlImage = urlImage;

			/**
			 * @property isProportionalResize
			 * @default true
			 * @type {Boolean}
			 */
			this.isProportionalResize = true;
			/**
			 * the image object itself
			 * @property _img
			 * @type {Image}
			 * @private
			 */
			this._img = new Image();
			/**
			 * the region on the image to render
			 * @property slice
			 * @type {CGSGRegion}
			 */
			this.slice = new CGSGRegion(0, 0, 0, 0);

			/**
			 * @property _isLoaded
			 * @type {Boolean}
			 * @private
			 */
			this.isLoaded = false;

			/**
			 * Event Fired when the image is finally loaded
			 * @property onLoadEnd
			 * @default null
			 * @type {Function}
			 */
			this.onLoadEnd = null;
			/**
			 * Event Fired when the image failed to load
			 * @property onLoadError
			 * @default null
			 * @type {Function}
			 */
			this.onLoadError = null;
			/**
			 * Event Fired when the image loading is aborted
			 * @property onLoadAbort
			 * @default null
			 * @type {Function}
			 */
			this.onLoadAbort = null;

			///// INITIALIZATION //////
			//finally load the image
			if (cgsgExist(this._urlImage) && this._urlImage != "") {
				this.setURL(urlImage);
			}
		},

		/**
		 * used to call delegate method when the image is finally loaded
		 * @private
		 * @method _createDelegate
		 * @param objectContext
		 * @param delegateMethod
		 * @return {Function}
		 */
		_createDelegate: function (objectContext, delegateMethod) {
			return function () {
				return delegateMethod.call(objectContext);
			}
		},

		/**
		 * fired when the image is loaded.
		 * Check the dimension of the image and fired the onLoadEnd event
		 * @private
		 * @method _onImageLoaded
		 */
		_onImageLoaded: function () {
			this._checkDimension();
			this.isLoaded = true;

			if (this.onLoadEnd !== null) {
				this.onLoadEnd();
			}
		},

		/**
		 * To be overrided when the image failed to load
		 * @method _onImageError
		 * @protected
		 */
		_onImageError: function () {
			if (this.onLoadError !== null) {
				this.onLoadError();
			}
		},
		/**
		 * To be overrided when the image loading is aborted
		 * @method _onImageAbort
		 * @protected
		 */
		_onImageAbort: function () {
			if (this.onLoadAbort !== null) {
				this.onLoadAbort();
			}
		},

		/**
		 * Check the true dimension of the image and fill the this.dimension property with it,
		 * only if dimension is not already defined in the constructor
		 * @private
		 * @method _checkDimension
		 */
		_checkDimension: function () {
			//if no width or height are specified in the constructor
			if (this.dimension.width <= 0 && this.dimension.height <= 0) {
				this.dimension.width = this._img.width;
				this.dimension.height = this._img.height;
			}

			//if no slice was specified, adjust it with the full image
			if (this.slice.dimension.width <= 0 || this.slice.dimension.height <= 0) {
				this.slice.dimension.width = this.dimension.width;
				this.slice.dimension.height = this.dimension.height;
			}
		},

		/**
		 * Set the slice into the image
		 * @method setSlice
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} w
		 * @param {Number} h
		 * @param {Boolean} updateDimension If true, the dimension will be set with the dimension of the slice
		 */
		setSlice: function (x, y, w, h, updateDimension) {
			this.slice.position.x = x;
			this.slice.position.y = y;
			this.slice.dimension.width = w;
			this.slice.dimension.height = h;

			if (updateDimension) {
				this.resizeTo(w, h);
			}
		},

		/**
		 * @public
		 * @method setImage
		 * @param {Image} newImage new Image object. Must bea already loaded before
		 */
		setImage: function (newImage) {
			this._img = newImage;
			if (cgsgExist(this._img)) {
				this._urlImage = this._img.src;
				this._checkDimension();
				this.isLoaded = true;
			}
		},

		/**
		 * Set a new URL for the image of the node
		 * @method setURL
		 * @param {String} url
		 */
		setURL: function (url) {
			this._urlImage = url;

			delete(this._img);
			this.isLoaded = false;
			this._img = new Image();

			this._img.onload = this._createDelegate(this, this._onImageLoaded);
			this._img.onerror = this._createDelegate(this, this._onImageError);
			this._img.onabort = this._createDelegate(this, this._onImageAbort);
			this._img.src = this._urlImage;
		},

		/**
		 * Must be defined to allow the scene graph to render the image nodes
		 * @protected
		 * @method render
		 * @param {CanvasRenderingContext2D} context the context to render on
		 * */
		render: function (context) {
			if (this.isLoaded && this._img.src != "") {
				//save current state
				this.beforeRender(context);

				context.globalAlpha = this.globalAlpha;

				context.drawImage(
					this._img, // image
					this.slice.position.x, this.slice.position.y, // start position on the image
					this.slice.dimension.width, this.slice.dimension.height, // dimension on the image
					0, 0,
					// position on the screen. let it to [0,0] because the 'beforeRender' function will translate the image
					this.getWidth(), this.getHeight()                // dimension on the screen
				);
				//restore state
				this.afterRender(context);
			}
		},

		/**
		 * @public
		 * @method setEffect
		 * @param {CGSGEffect} effect
		 */
		setEffect: function (effect) {
			this.effect = effect;
		},

		/**
		 * Ghost rendering function.
		 * Render here your custom nodes with a single color (cgsgGhostColor).
		 * This will be used by the SceneGraph to know if the mouse cursor is over this nodes.
		 * @protected
		 * @method renderGhost
		 * @param {CanvasRenderingContext2D} ghostContext The context for the ghost rendering
		 */
		renderGhost: function (ghostContext) {
			if (this.isLoaded && this._img.src != "") {
				//save current state
				this.beforeRenderGhost(ghostContext);

				ghostContext.drawImage(
					this._img, // image
					this.slice.position.x, this.slice.position.y, // start position on the image
					this.slice.dimension.width, this.slice.dimension.height, // dimension on the image
					0, 0,
					// position on the screen. let it to [0,0] because the 'beforeRender' function will tanslate the image
					this.getWidth(), this.getHeight()                // dimension on the screen
				);

				//restore state
				this.afterRenderGhost(ghostContext);
			}
		},

		/**
		 * Increase/decrease current dimension with adding values. It is used when the user resize
		 * the image with the handle boxes
		 * @public
		 * @method resizeWith
		 * @param {Number} width
		 * @param {Number} height
		 * */
		resizeWith: function (width, height) {
			this._super(width, height);
			//this._initShape();
		},

		/**
		 * @public
		 * @method copy
		 * @return {CGSGNodeImage} a copy of this node
		 */
		copy: function (node) {
			if (!cgsgExist(node)) {
				node = new CGSGNodeImage(this.position.x, this.position.y, null);
			}
			//call the super method
			node = this._super(node);

			node._urlImage = this._urlImage;

			node.effect = this.effect;
			node.isProportionalResize = this.isProportionalResize;
			node._isLoaded = this.isLoaded;

			//the image object itself
			node.setImage(this._img);

			node.setSlice(this.slice.position.x, this.slice.position.y, this.slice.dimension.width,
						  this.slice.dimension.height, true);
			node.resizeTo(this.dimension.width, this.dimension.height);

			node.onLoadEnd = this.onLoadEnd;
			/*if (this.urlImage !== undefined && this.urlImage !== null && this.urlImage != "") {
			 node.img.onload = node.createDelegate(node, node._onImageLoaded, node.context);
			 //this.img.onload = this._onImageLoaded(context);
			 node.img.src = node.urlImage;
			 }*/

			return node;
		}
	}
);
