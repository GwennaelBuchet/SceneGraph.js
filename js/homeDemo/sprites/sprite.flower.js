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

var FLOWER_TYPE = [
	{ live : 0, points : 100, petalColor : "white", centerColor : "f2e2a0"},
	{ live : 1, points : 500, petalColor : "#ed87ad", centerColor : "f2e2a0"},
	{ live : 2, points : 3000, petalColor : "87b9ed", centerColor : "dd87ed"}
];


var FlowerNode = CGSGNode.extend(
	{
		initialize : function() {
			//call the initialize of the parent
			this._super(0, 0, 20, 20);

			//define the classType with the name of the class
			this.classType = "FlowerNode";

			//define attributes of your custom node
			var index = 0;
			var rand = Math.random();
			if (rand > 0.90) {
				index = 2;
			}
			else if (rand > 0.88) {
				index = 1;
			}
			this._petalColor = FLOWER_TYPE[index].petalColor;
			this._centerColor = FLOWER_TYPE[index].centerColor;
			this.live = FLOWER_TYPE[index].live;
			this.points = FLOWER_TYPE[index].points;

			//fake canvas to pre-render static display
			this._tmpCanvas = null;

			//random values for scaling animation
			this.animXSpeed = 10 + Math.random() * 50;
			this.animXAmplitude = 0.2 + Math.random() * 1;

			this.initShape();
		},

		/**
		 * Pre-render the cloud into a temp canvas to optimize the perfs
		 */
		initShape : function() {
			this._tmpCanvas = document.createElement('canvas');
			this._tmpCanvas.width = 400;
			this._tmpCanvas.height = 300;
			var tmpContext = this._tmpCanvas.getContext('2d');

			var scale = 0.1 + Math.random() * 0.05;

			tmpContext.save();
			tmpContext.scale(scale, scale);
			tmpContext.beginPath();
			tmpContext.moveTo(130.3, 37.6);
			tmpContext.bezierCurveTo(126.0, -8.3, 56.3, -16.6, 47.4, 37.6);
			tmpContext.bezierCurveTo(-1.4, 33.0, -17.0, 93.7, 21.9, 115.6);
			tmpContext.bezierCurveTo(5.6, 158.7, 55.0, 192.7, 88.8, 162.3);
			tmpContext.bezierCurveTo(119.3, 191.4, 172.3, 162.0, 155.7, 115.7);
			tmpContext.bezierCurveTo(192.0, 98.4, 183.6, 33.7, 130.3, 37.6);
			tmpContext.closePath();
			tmpContext.fillStyle = this._petalColor;
			tmpContext.fill();

			var centerX = 88;
			var centerY = 90;
			var radius = 30;

			tmpContext.beginPath();
			tmpContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			tmpContext.fillStyle = this._centerColor;
			tmpContext.fill();
			tmpContext.lineWidth = 4;
			tmpContext.strokeStyle = 'gray';
			tmpContext.stroke();

			tmpContext.restore();

			this.resizeTo(175 * scale, 175 * scale);
		},

		start : function() {
			this.initPosAndSpeed(1);
			this.startAnim();

			var bindReStartAnim = this.reStartAnim.bind(this);
			sceneGraph.getTimeline(this, "position.y").onAnimationEnd = bindReStartAnim;
		},

		initPosAndSpeed : function(speed) {
			var x = CGSGMath.fixedPoint(20 + (Math.random() * (canvasWidth - 40)));
			var y = -50;
			this.translateTo(x, y);
			this.speed = CGSGMath.fixedPoint(canvasHeight + Math.random() * canvasHeight * 2);
			this.speed *= speed;
		},

		startAnim : function() {
			sceneGraph.animate(this, "position.y", this.speed, this.position.y,
			                   CGSGMath.fixedPoint(canvasHeight + Math.random() * 50), "linear", 0, true);
		},

		reStartAnim : function() {
			this.initPosAndSpeed(1);
			this.startAnim();
		},

		onRenderStartHandler : function() {
			//var xpos = Math.sin(cgsgCurrentFrame / this.animXSpeed) * this.animXAmplitude;
			//this.translateWith(xpos, 0);
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

			//translate x on a sinusoidal way, for the next frame
			var xpos = Math.sin(cgsgCurrentFrame / this.animXSpeed) * this.animXAmplitude;
			this.translateWith(xpos, 0);
		}
	}
);
