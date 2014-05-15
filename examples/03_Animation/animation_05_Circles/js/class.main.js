/**
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
 *
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 * @date 10/08/2012
 *
 * Purpose :
 * animation example
 * */
var CGMain = CGSGView.extend(
	{
		initialize : function(canvas) {

			this._super(canvas);

			////// INITIALIZATION /////////

			//this.initializeCanvas();

			this.createScene();

			this.startPlaying();
		},

		initializeCanvas : function() {
			//redimensionnement du canvas pour être full viewport en largeur
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},

		/**
		 * Create 'n' circles
		 * @method createScene
		 */
		createScene : function() {
			//create a square node : x, y, width, height
			var rootNode = new CGSGNodeSquare(0, 0, 20, 20);
			//add the square node as the root of the graph
			CGSG.sceneGraph.addNode(rootNode, null);
			rootNode.isDraggable = true;

			for (var i = 0 ; i < 130 ; i++) {
				var circle = new CGSGNodeCircle(0, 0, 1);
				circle.isTraversable = false;
				circle.lineWidth = 0;
				circle.bkgcolors = [CGSGColor.rgb2hex(Math.random() * 255, Math.random() * 255, Math.random() * 255)];
				rootNode.addChild(circle);

				this.resetCircle(circle);
			}

		},

		/**
		 * set the position and animation of a circle
		 * @method resetCircle
		 * @param {CGSGNode} circle
		 */
		resetCircle : function(circle) {
			var x = Math.random() * CGSG.canvas.width;
			var y = Math.random() * CGSG.canvas.height;
			circle.translateTo(x, y);

			//animate size and alpha
			var r = 20 + Math.random() * 30;
			var delay = 10 + Math.random() * 40;
			var timeline = CGSG.animationManager.animate(circle, "globalAlpha", delay, 1, 0, 0);
			CGSG.animationManager.animate(circle, "scale.x", delay, 1.0, r, 0);
			CGSG.animationManager.animate(circle, "scale.y", delay, 1.0, r, 0);
			CGSG.animationManager.animate(circle, "position.x", delay, x, x - r, 0);
			CGSG.animationManager.animate(circle, "position.y", delay, y, y - r, 0);

			//at the end of the animation, reset this node
			var that = this;
			timeline.onAnimationEnd = function(event) {
				that.resetCircle(event.node);
			};
		}

	}
)




