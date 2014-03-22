/**
 * Copyright (c) 2014 Gwennael Buchet
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
 * animation and collision example
 * */
var CGMain = CGSGView.extend(
	{
		initialize : function (canvas) {

			this._super(canvas);

			////// INITIALIZATION /////////

			this.initializeCanvas();
			this.createScene();

			this.startPlaying();
		},

		initializeCanvas : function () {
			//scale canvas to fulfill the viewport in width
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},

		/**
		 *
		 *
		 */
		createScene : function () {
			//first create a root node with an arbitrary position
			this.rootNode = new CGSGNode(0, 0);
			CGSG.sceneGraph.addNode(this.rootNode, null);

			//add a text node ("click me") with a onClick event
			var buttonNode = new CGSGNodeButton(10, 10, "Click Me");
			//bind the "this.moveSquare" function to this.
			var bindMoveSquare = this.moveSquare.bind(this);
			buttonNode.onClick = function (event) {
				bindMoveSquare();
			}
			//add the textNode as child of the root
			this.rootNode.addChild(buttonNode);

			//the blue square
			this.blueSquareNode = new CGSGNodeSquare(220, 80, 260, 160);
			this.blueSquareNode.color = "blue";
			this.blueSquareNode.isResizable = true;
			this.blueSquareNode.isDraggable = true;
			this.rootNode.addChild(this.blueSquareNode);

			//the red square
			this.redSquareNode = new CGSGNodeSquare(0, 60, 100, 100);
			this.redSquareNode.color = "red";
			this.redSquareNode.isResizable = true;
			this.redSquareNode.isDraggable = true;
			this.rootNode.addChild(this.redSquareNode);

            //the green square
            this.greenSquareNode = new CGSGNodeSquare(100, 60, 100, 100);
            this.greenSquareNode.color = "green";
            this.greenSquareNode.isResizable = true;
            this.greenSquareNode.isDraggable = true;
            this.redSquareNode.addChild(this.greenSquareNode);

            this.blueSquareNode.isCollisionManaged = true;
            this.redSquareNode.isCollisionManaged = true;
            this.greenSquareNode.isCollisionManaged = true;

			//the log text
			this.logNode = new CGSGNodeText(160, 10, "Collision between green and blue : false");
			this.rootNode.addChild(this.logNode);

			//detect collision each frame
			var bindCheckCollision = this.checkCollision.bind(this);
			this.onRenderEnd = function () {
				bindCheckCollision();
			};
		},

		/**
		 * The method called to move the square
		 */
		moveSquare : function () {

			/*
			 * Animate an attribute of a nodes
			 * @param node Handler to the nodes to animate
			 * @param attribute String representing the attribute to animate ("position.y", "rotation.angle", "fill", ...)
			 * @param duration Integer. Duration of the animation, in frames
			 * @param from Start value
			 * @param to End value
			 * @param method String. animation method: 'linear', 'catmullrom'
			 * @param delay Integer. Delay before start the animation, in frames
			 *
			 * @example CGSG.animationManager.animate(imgNode, "position.x", 700, 0, 200, 0, true);
			 */
			var timeline = CGSG.animationManager.animate(this.redSquareNode, "position.x", 80, 0, 500, 0);

            //timeline = CGSG.animationManager.getTimeline(this.redSquareNode, "position.x");
            timeline.onAnimationStart = function (event) {
				console.log("animation started");
			};
            timeline.onAnimationEnd = function (event) {
				console.log("animation ended");
			};
            timeline.onAnimationStart = function (event) {
				console.log("animation started");
			};
		},

		checkCollision : function () {
			//uncomment to chek the collision with all brothers (text node included)
			//var isColliding = this.redSquareNode.isCollidingABrother();

			//var isColliding = this.redSquareNode.isColliding(this.blueSquareNode, 0);
			var isColliding = this.greenSquareNode.isColliding(this.blueSquareNode, 0);
			this.logNode.setText("Collision between green and blue : " + isColliding);
		}

	}
);