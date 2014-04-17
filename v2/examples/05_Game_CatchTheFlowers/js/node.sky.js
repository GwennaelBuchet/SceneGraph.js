/**
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
 *
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 * @date 07/07/2012
 *
 * Purpose:
 * Subclassing CGSGNode.
 *
 */
var SkyNode = CGSGNode.extend(
	{
		initialize: function (x, y, width, height, context) {
			//call the initialize of the parent
			this._super(x, y, width, height);

			//define the classType with the name of the class
			this.classType = "SkyNode";

			//colors for color animation
			this.firstColors = ["#7badff", "#422d70", "#000000", "#2d4070", "#7badff"];
			this.lastColors = ["#bcd5ff", "#f0875a", "#110b6d", "#5955ae", "#bcd5ff"];
			this.alpha = [1, 0.5, 0, 0.5, 1];
			this.reStartAnim();

			this.sun = new SunNode(0, 0);
			this.addChild(this.sun);

			this.stars = new StarsNode();
			this.addChild(this.stars);
		},

		reStartAnim: function () {
			//this.firstColorCurrent = this.firstColors[this.currentColorIndex];
			//this.lastColorCurrent = this.lastColors[this.currentColorIndex];
		},

		/**
		 * Must be defined to allow the scene graph to render the image nodes
		 * */
		render: function (context) {
			this.firstColorCurrent =
			CGSGColor.lerp(this.firstColors[currentColorIndex], this.firstColors[currentColorIndex + 1],
						   currentColorLerp);
			this.lastColorCurrent =
			CGSGColor.lerp(this.lastColors[currentColorIndex], this.lastColors[currentColorIndex + 1],
						   currentColorLerp);

			this.sun.globalAlpha =
			CGSGMath.lerp(this.alpha[currentColorIndex], this.alpha[currentColorIndex + 1], currentColorLerp);
			this.stars.globalAlpha = 1.0 - this.sun.globalAlpha;

			//save current state
			//always call it
			this.beforeRender(context);

			context.globalAlpha = this.globalAlpha;

			// create linear gradient
			var gradient = context.createLinearGradient(0, 0, 0, this.dimension.height);
			gradient.addColorStop(0, this.firstColorCurrent);
			gradient.addColorStop(1, this.lastColorCurrent);
			context.fillStyle = gradient;

			context.fillRect(0, 0, this.dimension.width, this.dimension.height);

			//restore state
			//always call it
			this.afterRender(context);
		},

		/**
		 * once the image is loaded, set it to the sprites
		 */
		onImageLoaded: function () {
			this.spirale.setImage(this.img);
			this.spirale.rotationCenter.x = 0.5;
			this.spirale.rotationCenter.y = 0.5;
		}
	}
);
