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
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGNodeImageEx = CGSGNode.extend(
	{
		initialize : function(x, y) {
			this._super(x, y, 0, 0);

			/**
			 * @property classType
			 * @type {String}
			 */
			this.classType = "CGSGNodeImageEx";


			/**
			 * the image object itself
			 * @property _img
			 * @type {Image}
			 * @private
			 */
			this._img = new Image();


			/**
			 * @property _isLoaded
			 * @type {Boolean}
			 * @private
			 */
			this.isLoaded = false;

			this._tmpCanvas = null;
		},


		/**
		 * @public
		 * @method setImage
		 * @param {Image} newImage new Image object. Must be already loaded before
		 */
		setImage : function(newImage) {
			this._img = newImage;
			if (cgsgExist(this._img)) {
				this.isLoaded = true;
				if (!cgsgExist(this._tmpCanvas)) {
					this._tmpCanvas = document.createElement('canvas');
					this._tmpContext = this._tmpCanvas.getContext('2d');
				}
				this.resizeTo(newImage.width, newImage.height);
				this._tmpCanvas.width = newImage.width;
				this._tmpCanvas.height = newImage.height;
				this._tmpContext.drawImage(this._img, 0, 0);
				this._tmpCanvas.style.position = "absolute";
				//document.body.appendChild(this._tmpCanvas);
			}
		},

		/**
		 * @method getImage
		 * @return {Image}
		 */
		getImage : function() {
			return this._img;
		},


		/**
		 * Must be defined to allow the scene graph to render the image nodes
		 * @protected
		 * @method render
		 * @param {CanvasRenderingContext2D} context the context to render on
		 * */
		render : function(context) {
			/*this._tmpCanvas.style.left = this.position.x + "px";
			 this._tmpCanvas.style.top = this.position.y + "px";
			 this._tmpCanvas.style.width = this.getWidth() + "px";
			 this._tmpCanvas.style.height = this.getHeight() + "px";*/
			context.drawImage(this._img, 0, 0);
		}

	}
);
