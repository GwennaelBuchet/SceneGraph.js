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
 * @date 07/07/2012
 *
 * Purpose:
 * Subclassing CGSGNode.
 *
 */
var SunNode = CGSGNode.extend(
	{
		initialize : function(x, y, width, height) {
			//call the initialize of the parent
			this._super(x, y, width, height);

			//define the classType with the name of the class
			this.classType = "SunNode";

			//fake canvas to pre-render static display
			this._tmpCanvas = null;

			this.initShape();

			this.isClickable = false;
		},

		/**
		 * Pre-render the cloud into a temp canvas to optimize the perfs
		 */
		initShape : function() {
			this._tmpCanvas = document.createElement('canvas');
			this._tmpCanvas.width = canvasWidth;
			this._tmpCanvas.height = canvasHeight;
			var tmpContext = this._tmpCanvas.getContext('2d');

			tmpContext.globalAlpha = 0.5;



			tmpContext.restore();
		},

		/**
		 * @override
		 * Must be defined to allow the scene graph to render the image nodes
		 * */
		render : function(context) {
			//save current state
			//always call it
			this.beforeRender(context);

			context.globalAlpha = this.globalAlpha;

			//render the pre-rendered canvas
			context.drawImage(this._tmpCanvas, 0, 0);

			//restore state
			//always call it
			this.afterRender(context);
		}
	}
);
