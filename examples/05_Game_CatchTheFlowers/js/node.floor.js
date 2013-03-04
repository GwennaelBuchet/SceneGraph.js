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
var FloorNode = CGSGNode.extend(
	{
		initialize: function (x, y, width, height) {
			//call the initialize of the parent
			this._super(x, y, width, height);

			//define the classType with the name of the class
			this.classType = "FloorNode";

			//define attributes of your custom node
			this.firstColors = ["#63d957", "#528363", "#294131", "#528363", "#63d957"];
			this.lastColors = ["#6fac69", "#163f18", "#052c06", "#163f18", "#6fac69"];
			this.flowerColors = ["#f0eb69", "#ac9a5b", "#655f32", "#beb565", "#f0eb69"];

			//fake canvas to pre-render static display
			this._tmpCanvas = null;

			this.isClickable = false;

			this.flowersPosition = [];
			var centerX = 0;
			var centerY = 0;
			var radius = 1;
			for (var s = 0; s < 5; s++) {
				centerX = Math.random() * cgsgCanvas.width;
				centerY = cgsgCanvas.height - Math.random() * 100;
				radius = 2 + Math.random() * 2.3;
				this.flowersPosition.push({x: centerX, y: centerY, r: radius});
			}
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
			this.flowerColorCurrent =
			CGSGColor.lerp(this.flowerColors[currentColorIndex], this.flowerColors[currentColorIndex + 1],
						   currentColorLerp);

			//save current state
			//always call it
			this.beforeRender(context);

			context.globalAlpha = this.globalAlpha;

			//render the pre-rendered canvas
			//context.drawImage(this._tmpCanvas, 0, 0);

			var startX = -50;
			var startY = 140;

			context.save();

			context.scale(3, 2);

			// draw cloud shape
			context.beginPath();
			context.moveTo(startX, startY);

			context.bezierCurveTo(startX - 10, startY + 20, startX - 40, startY + 70,
								  startX + 30, startY + 70);
			context.bezierCurveTo(startX + 60, startY + 60, startX + 250,
								  startY + 40, startX + 220, startY + 20);
			context.bezierCurveTo(startX + 240, startY - 40, startX + 200, startY - 50,
								  startX + 170, startY - 30);
			context.bezierCurveTo(startX + 50, startY - 60,
								  startX, startY - 30, startX, startY); //left-top

			context.closePath();

			var gradient = context.createLinearGradient(startX, startY / 1.3, startX, cgsgCanvas.height / 2);
			gradient.addColorStop(0, this.firstColorCurrent);
			gradient.addColorStop(1, this.lastColorCurrent);
			context.fillStyle = gradient;

			context.shadowColor = "#55e147";
			context.shadowBlur = 40;
			context.shadowOffsetX = 0;
			context.shadowOffsetY = 0;

			context.fill();
			context.restore();

			//draw some little flowers
			context.shadowBlur = 0;
			for (var s = 0; s < this.flowersPosition.length; s++) {
				context.beginPath();
				context.arc(this.flowersPosition[s].x, this.flowersPosition[s].y, this.flowersPosition[s].r, 0,
							CGSGMath.PI2, false);
				context.fillStyle = this.flowerColorCurrent;
				context.fill();
			}

			//restore state
			//always call it
			this.afterRender(context);
		}
	}
);
