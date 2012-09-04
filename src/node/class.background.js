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
 * @date 05/07/2012
 *
 * Purpose : render an image in full screen
 * @param urlImage the URL of the image to load
 * @param repeatOption pattern to apply to the image: "repeat", "repeat-x", "repeat-y", "no-repeat"
 * @param context the context to render in
 */
var CGSGNodeBackground = CGSGNodeImage.extend(
	{
		initialize : function (x, y, width, height, urlImage, bkgColor, repeatOption, context) {
			this._super(x, y, width, height);

			///// @public //////

			this.classType = "CGSGNodeBackground";

			this.repeatOption = repeatOption;

			//the selected effect to be applied
			this.effect = null;
			//url of the image
			this.urlImage = urlImage;
			this.bkgColor = bkgColor;
			//the image object itself
			this.img = new Image();
			this._context = context;

			///// @private //////

			this.isLoaded = false;

			///// INITIALIZATION //////

			this.isClickable = false;

			//finally load the image
			if (this.urlImage !== null) {
				this.img.onload = this._onImageLoaded(context);
				this.img.src = this.urlImage;
			}
			else {
				this.isLoaded = true;
			}
		},

		/**
		 * @override
		 * Must be defined to allow the scene graph to render the image nodes
		 * */
		render : function (context) {
			if (this.isLoaded && this.img.src != "") {
				//save current state
				this.beforeRender(context);

				if (this.urlImage === null) {
					context.fillStyle = this.bkgColor;
					context.fillRect(0, 0, this.dimension.width, this.dimension.height);
					context.strokeRect(0, 0, this.dimension.width, this.dimension.height);
				}
				else {

					if (this.repeatOption === null) {
						context.drawImage(this.img, this.position.x, this.position.y);
					}
					else {
						var pattern = context.createPattern(this.img, this.repeatOption);

						context.rect(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
						context.fillStyle = pattern;
						context.fill();
					}
				}

				//restore state
				this.afterRender(context);
			}
		},

		/**
		 *
		 * @return a copy of this node
		 */
		copy : function () {
			var node = new CGSGNodeBackground(this.position.x, this.position.y, this.dimension.width,
											  this.dimension.height, this.urlImage, this.bkgColor, this.repeatOption,
											  this._context);
			//call the super method
			node = this._super(node);

			node.effect = this.effect;
			node.img = this.img;
			node.isLoaded = this.isLoaded;
			node.isClickable = this.isClickable;

			//finally load the image
			if (this.urlImage !== null) {
				node.img.onload = node._onImageLoaded(node.context);
				node.img.src = node.urlImage;
			}
			else {
				node.isLoaded = true;
			}

			return node;
		}
	}
);

