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
var CloudNode = CGSGNode.extend(
	{
		initialize: function (x, y, width, height) {
			//call the initialize of the parent
			this._super(x, y, width, height);

			//define the classType with the name of the class
			this.classType = "CloudNode";

			//define attributes of your custom node
			this._firstColor = "white";
			this._lastColor = "#dae3f2";

			//fake canvas to pre-render static display
			this._tmpCanvas = null;

			this.initShape();

			//random values for scaling animation
			this.scaleYSpeed = 16.0 + Math.random() * 2.0;

			this.isClickable = false;
		},

		/**
		 * Pre-render the cloud into a temp canvas to optimize the perfs
		 */
		initShape: function () {
			this._tmpCanvas = document.createElement('canvas');
			this._tmpCanvas.width = cgsgCanvas.width;
			this._tmpCanvas.height = cgsgCanvas.height;
			var tmpContext = this._tmpCanvas.getContext('2d');

			var startX = 100;
			var startY = 100;

			tmpContext.save();
			tmpContext.scale(0.4, 0.4);

			// draw cloud shape
			tmpContext.beginPath();
			tmpContext.moveTo(startX, startY);
			tmpContext.bezierCurveTo(startX - 60 + Math.random() * 60, startY + 20, startX - 40, startY + 70,
									 startX + 60, startY + 70);
			tmpContext.bezierCurveTo(startX + 60 + Math.random() * 100, startY + 60 + Math.random() * 80, startX + 250,
									 startY + 40, startX + 220, startY + 20);
			tmpContext.bezierCurveTo(startX + 230 + Math.random() * 60, startY - 40, startX + 200, startY - 50,
									 startX + 170, startY - 30);
			tmpContext.bezierCurveTo(startX + 120 + Math.random() * 60, startY - 75, startX + 80 + Math.random() * 60,
									 startY - 60, startX + 80, startY - 30); //middle_top
			tmpContext.bezierCurveTo(startX + 30 + Math.random() * 40, startY - 75 + Math.random() * 40,
									 startX - 20 + Math.random() * 40, startY - 60, startX, startY); //left-top
			tmpContext.closePath();

			var gradient = tmpContext.createLinearGradient(startX, startY, startX, 70 + startY);
			gradient.addColorStop(0, this._firstColor);
			gradient.addColorStop(1, this._lastColor);
			tmpContext.fillStyle = gradient;

			tmpContext.shadowColor = '#7ba3e6';
			tmpContext.shadowBlur = 20;
			tmpContext.shadowOffsetX = 0;
			tmpContext.shadowOffsetY = 5;

			tmpContext.fill();

			tmpContext.restore();
		},

		start: function () {
			this.initPosAndSpeed(true);
			this.startAnim();

			var bindReStartAnim = this.reStartAnim.bind(this);
			sceneGraph.getTimeline(this, "position.x").onAnimationEnd = bindReStartAnim;
		},

		initPosAndSpeed: function (isFirst) {
			this.globalAlpha = 0.7 + Math.random() * 0.295;
			var x = CGSGMath.fixedPoint(-150 + Math.random() * 20);
			if (isFirst) {
				x += Math.random() * cgsgCanvas.width;
			}
			var y = CGSGMath.fixedPoint(Math.random() * 50);
			this.translateTo(x, y);
			this.speed = CGSGMath.fixedPoint(cgsgCanvas.width * 2.5 + Math.random() * cgsgCanvas.width * 2);

		},

		startAnim: function () {
			sceneGraph.animate(this, "position.x", this.speed, this.position.x,
							   CGSGMath.fixedPoint(cgsgCanvas.width + Math.random() * 50), "linear", 0, true);
		},

		reStartAnim: function () {
			this.initPosAndSpeed(false);
			this.startAnim();
		},

		/**
		 * Must be defined to allow the scene graph to render the image nodes
		 * */
		render: function (context) {
			//save current state
			//always call it
			this.beforeRender(context);

			context.globalAlpha = this.globalAlpha;

			//custom rendering
			var heightScale = -1 * Math.sin(cgsgCurrentFrame / this.scaleYSpeed) * 0.05 + 0.95;
			context.scale(1.0, heightScale);
			//render the pre-rendered canvas
			context.drawImage(this._tmpCanvas, 0, 0);

			//restore state
			//always call it
			this.afterRender(context);
		}
	}
);
