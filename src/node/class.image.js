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
 * @date 06/07/2012
 *
 * Purpose:
 * Subclassing CGSGNode.
 * @param x
 * @param y
 * @param width
 * @param height
 * @param sliceX
 * @param sliceY
 * @param sliceWidth
 * @param sliceHeight
 * @param urlImage
 * @param context
 *
 * A CGSGImage represent an image nodes
 */
var CGSGNodeImage = CGSGNode.extend(
	{
		initialize : function (x, y, width, height, sliceX, sliceY, sliceWidth, sliceHeight, urlImage, context) {
			this._super(x, y, width, height);

			///// @public //////
			this.classType = "CGSGNodeImage";

			//the selected effect to be applied
			this.effect = null;
			//url of the image
			this.urlImage = urlImage;

			this.isProportionalResize = true;
			//the image object itself
			this.img = new Image();
			//the region on the image to render
			this.slice = new CGSGRegion(sliceX, sliceY, sliceWidth, sliceHeight);

			///// @private //////
			this._isLoaded = false;
			this._context = context;

			this.onLoadEnd = null;

			///// INITIALIZATION //////
			//finally load the image
			if (this.urlImage !== undefined && this.urlImage !== null && this.urlImage != "") {
				this.img.onload = this.createDelegate(this, this._onImageLoaded, context);
				//this.img.onload = this._onImageLoaded(context);
				this.img.src = this.urlImage;
			}
		},

		/**
		 * @private
		 * @param contextObject
		 * @param delegateMethod
		 * @return {Function}
		 */
		createDelegate : function (objectContext, delegateMethod, renderContext) {
			return function () {
				return delegateMethod.call(objectContext, renderContext);
			}
		},

		/**
		 * @private
		 * fired when the image is loaded
		 */
		_onImageLoaded : function (context) {
			this._checkDimension();
			this._isLoaded = true;

			if (this.onLoadEnd !== null) {
				this.onLoadEnd();
			}
			this.render(this._context);
		},

		/**
		 * @private
		 */
		_checkDimension : function () {
			//if no width or height are specified in the constructor
			if (this.dimension.width <= 0 && this.dimension.height <= 0) {
				this.dimension.width = this.img.width;
				this.dimension.height = this.img.height;
			}

			//if no slice was specified, adjust it with the full image
			if (this.slice.dimension.width <= 0 || this.slice.dimension.height <= 0) {
				this.slice.dimension.width = this.dimension.width;
				this.slice.dimension.height = this.dimension.height;
			}
		},

		/**
		 * @public
		 * @param newImage new Image object. Must bea already loaded before
		 */
		setImage : function (newImage) {
			this.img = newImage;
			this._isLoaded = true;
		},

		/**
		 * @override
		 * Must be defined to allow the scene graph to render the image nodes
		 * */
		render : function (context) {
			if (this._isLoaded && this.img.src != "") {
				//save current state
				this.beforeRender(context);

				//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
				context.drawImage(
					this.img, // image
					this.slice.position.x, this.slice.position.y, // start position on the image
					this.slice.dimension.width, this.slice.dimension.height, // dimension on the image
					0, 0,
					// position on the screen. let it to [0,0] because the 'beforeRender' function will tanslate the image
					this.dimension.width, this.dimension.height                // dimension on the screen
				);

				//apply image effect
				if (this.effect != null) {
					this.effect.render(context, this.dimension.width, this.dimension.height);
				}

				//restore state
				this.afterRender(context);
			}
		},

		/**
		 * @public
		 * @param effect
		 */
		setEffect : function (effect) {
			this.effect = effect;
		},

		/**
		 * Empty ghost rendering function.
		 * Render here your custom nodes with a single color (this._ghostColor, defined in the CGSGNode class).
		 * This will be used by the SceneGraph to know if the mouse cursor is over this nodes.
		 *
		 * @param ghostContext The context for the ghost rendering
		 * @param cumulatedPosition The CGSGPosition absolute position of the nodes in the canvas
		 * @param cumulatedRotation The CGSGRotation absolute rotation of the nodes in the canvas
		 * @param cumulatedScale The CGSGScale absolute scale of the nodes in the canvas
		 */
		renderGhost : function (ghostContext) {
			if (this._isLoaded && this.img.src != "") {
				//save current state
				this.beforeRenderGhost(ghostContext);

				ghostContext.drawImage(
					this.img, // image
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
		 *
		 * @return a copy of this node
		 */
		copy : function () {
			var node = new CGSGNodeImage(this.position.x, this.position.y, this.dimension.width, this.dimension.height,
										 this.slice.x, this.slice.y, this.slice.width, this.slice.height, this.urlImage,
										 this._context);
			//call the super method
			node = this._super(node);

			node.effect = this.effect;
			node.isProportionalResize = this.isProportionalResize;
			//the image object itself
			node.img = this.img;

			///// @private //////
			node._isLoaded = this._isLoaded;

			node.onLoadEnd = this.onLoadEnd;
			if (this.urlImage !== undefined && this.urlImage !== null && this.urlImage != "") {
				node.img.onload = node.createDelegate(node, node._onImageLoaded, node.context);
				//this.img.onload = this._onImageLoaded(context);
				node.img.src = node.urlImage;
			}

			return node;
		}
	}
);
