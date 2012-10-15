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
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
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
 * @module Node
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on X
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @param {Number} sliceX Position of the content of this node on the src image
 * @param {Number} sliceY Position of the content of this node on the src image
 * @param {Number} sliceWidth Dimension of the content of this node on the src image
 * @param {Number} sliceHeight Dimension of the content of this node on the src image
 * @param {String} urlImage URL of the src image. Can be null tobe loaded later.
 * @param {CanvasRenderingContext2D} context context to render on
 * @type {CGSGNodeImage}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGNodeImage = CGSGNode.extend(
	{
		initialize : function(x, y, width, height, sliceX, sliceY, sliceWidth, sliceHeight, urlImage, context) {
			this._super(x, y, width, height);

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
			this.slice = new CGSGRegion(sliceX, sliceY, sliceWidth, sliceHeight);


			/**
			 * @property _isLoaded
			 * @type {Boolean}
			 * @private
			 */
			this._isLoaded = false;
			/**
			 * @property _context
			 * @type {CanvasRenderingContext2D}
			 * @private
			 */
			this._context = context;

			/**
			 * Event Fired when the image is finally loaded
			 * @property onLoadEnd
			 * @default null
			 * @type {Function}
			 */
			this.onLoadEnd = null;

			/**
			 * Fake canvas to pre-render the image
			 * @property _tmpCanvas
			 * @type {HTMLElement}
			 * @private
			 */
			this._tmpCanvas = document.createElement('canvas');

			///// INITIALIZATION //////
			//finally load the image
			if (this._urlImage !== undefined && this._urlImage !== null && this._urlImage != "") {
				this._img.onload = this._createDelegate(this, this._onImageLoaded, context);
				//this.img.onload = this._onImageLoaded(context);
				this._img.src = this._urlImage;
			}
		},


		/**
		 * used to call delegate method when the image is finally loaded
		 * @private
		 * @method _createDelegate
		 * @param objectContext
		 * @param delegateMethod
		 * @param renderContext
		 * @return {Function}
		 */
		_createDelegate : function(objectContext, delegateMethod, renderContext) {
			return function() {
				return delegateMethod.call(objectContext, renderContext);
			}
		},

		/**
		 * fired when the image is loaded.
		 * Check the dimension of the image and fired the onLoadEnd event
		 * @private
		 * @method _onImageLoaded
		 */
		_onImageLoaded : function(context) {
			this._checkDimension();
			this._isLoaded = true;

			if (this.onLoadEnd !== null) {
				this.onLoadEnd();
			}
			this._initShape();
			this.render(this._context);
		},

		/**
		 * To be overrided when the image failed to load
		 * @method _onImageError
		 * @protected
		 * @param context
		 */
		_onImageError : function(context) {
		},

		/**
		 * Check the true dimension of the image and fill the this.dimension property with it,
		 * only if dimension is not already defined in the constructor
		 * @private
		 * @method _checkDimension
		 */
		_checkDimension : function() {
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
		 * @public
		 * @method setImage
		 * @param {Image} newImage new Image object. Must bea already loaded before
		 */
		setImage : function(newImage) {
			this._img = newImage;
			if (cgsgExist(this._img)) {
				this._urlImage = this._img.src;
				this._checkDimension();
				this._isLoaded = true;
				this._initShape();
			}
		},

		/**
		 *  pre-render the image into _tmpCanvas to optimize the perfs
		 * @private
		 * @method _initShape
		 */
		_initShape : function() {
			this._tmpCanvas.width = this.dimension.width;
			this._tmpCanvas.height = this.dimension.height;
			var tmpContext = this._tmpCanvas.getContext('2d');

			tmpContext.drawImage(
				this._img, // image
				this.slice.position.x, this.slice.position.y, // start position on the image
				this.slice.dimension.width, this.slice.dimension.height, // dimension on the image
				0, 0,
				// position on the screen. let it to [0,0] because the 'beforeRender' function will translate the image
				this.dimension.width, this.dimension.height                // dimension on the screen
			);
		},

		/**
		 * Must be defined to allow the scene graph to render the image nodes
		 * @override
		 * @protected
		 * @method render
		 * @param {CanvasRenderingContext2D} context the context to render on
		 * */
		render : function(context) {
			if (this._isLoaded && this._img.src != "") {
				//save current state
				this.beforeRender(context);

				context.globalAlpha = this.globalAlpha;

				//custom rendering
				//context.drawImage(this.tmpCanvas, 0, 0);

				context.drawImage(
					this._img, // image
					this.slice.position.x, this.slice.position.y, // start position on the image
					this.slice.dimension.width, this.slice.dimension.height, // dimension on the image
					0, 0,
					// position on the screen. let it to [0,0] because the 'beforeRender' function will translate the image
					this.dimension.width, this.dimension.height                // dimension on the screen
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
		setEffect : function(effect) {
			this.effect = effect;
		},

		/**
		 * Ghost rendering function.
		 * Render here your custom nodes with a single color (cgsgGhostColor).
		 * This will be used by the SceneGraph to know if the mouse cursor is over this nodes.
		 * @override
		 * @protected
		 * @method renderGhost
		 * @param {CanvasRenderingContext2D} ghostContext The context for the ghost rendering
		 */
		renderGhost : function(ghostContext) {
			if (this._isLoaded && this._img.src != "") {
				//save current state
				this.beforeRenderGhost(ghostContext);

				ghostContext.drawImage(
					this._img, // image
					this.slice.position.x, this.slice.position.y, // start position on the image
					this.slice.dimension.width, this.slice.dimension.height, // dimension on the image
					0, 0,
					// position on the screen. let it to [0,0] because the 'beforeRender' function will tanslate the image
					this.dimension.width, this.dimension.height                // dimension on the screen
				);

				//restore state
				this.afterRenderGhost(ghostContext);
			}
		},

		/**
		 * Increase/decrease current dimension with adding values. It is used when the user resize
		 * the image with the handle boxes
		 * @override
		 * @public
		 * @method resizeWith
		 * @param {Number} width
		 * @param {Number} height
		 * */
		resizeWith : function(width, height) {
			this._super(width, height);
			this._initShape();
		},


		/**
		 * @override
		 * @public
		 * @method copy
		 * @return {CGSGNodeImage} a copy of this node
		 */
		copy : function() {
			var node = new CGSGNodeImage(this.position.x, this.position.y, this.dimension.width, this.dimension.height,
			                             this.slice.position.x, this.slice.position.y, this.slice.dimension.width,
			                             this.slice.dimension.height, /*this.urlImage*/null,
			                             this._context);
			//call the super method
			node = this._super(node);

			node._urlImage = this._urlImage;

			node.effect = this.effect;
			node.isProportionalResize = this.isProportionalResize;
			node._isLoaded = this._isLoaded;

			//the image object itself
			node.setImage(this._img);

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
