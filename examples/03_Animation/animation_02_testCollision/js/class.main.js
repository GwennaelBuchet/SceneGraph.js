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
 * @date 10/08/2012
 *
 * Purpose :
 * animation and collision example
 * */
var CGMain = CGSGScene.extend(
	{
		initialize : function(canvas) {

			this._super(canvas);

			////// INITIALIZATION /////////

			this.initializeCanvas();
			this.createScene();

			this.startPlaying();
		},

		initializeCanvas : function() {
			//scale canvas to fulfill the viewport in width
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},

		/**
		 *
		 *
		 */
		createScene : function() {
			//first create a root node with an arbitrary size and position
			this.rootNode = new CGSGNode(0, 0, 1, 1);
			this.sceneGraph.addNode(this.rootNode, null);

			//add a text node ("click me") with a onClick event
			this.textNode = new CGSGNodeText(10, 50, "Click Me");
			//bind the "this.moveSquare" function to this. See Prototype.js "bind" function.
			var bindMoveSquare = this.moveSquare.bind(this);
			//add the onClick event to the text
			this.textNode.isClickable = true;
			this.textNode.onClick = function(event) {
				bindMoveSquare();
			}
			//add the textNode as child of the root
			this.rootNode.addChild(this.textNode);

			//the blue square
			this.blueSquareNode = new CGSGNodeSquare(220, 140, 260, 160);
			this.blueSquareNode.color = "blue";
			this.blueSquareNode.isResizable = true;
			this.blueSquareNode.isDraggable = true;
			this.rootNode.addChild(this.blueSquareNode);

			//the red square
			this.redSquareNode = new CGSGNodeSquare(0, 160, 100, 100);
			this.redSquareNode.color = "red";
			this.redSquareNode.isResizable = true;
			this.redSquareNode.isDraggable = true;
			this.rootNode.addChild(this.redSquareNode);

			//the log text
			this.logNode = new CGSGNodeText(160, 50, "Collision : false");
			this.rootNode.addChild(this.logNode);

			//detect collision each frame
			var bindCheckCollision = this.checkCollision.bind(this);
			this.onRenderEnd = function() {
				bindCheckCollision();
			};
		},

		/**
		 * The method called to move the square
		 */
		moveSquare : function() {

			/*
			 * Animate an attribute of a nodes
			 * @param node Handler to the nodes to animate
			 * @param attribute String representing the attribute to animate ("position.y", "rotation.angle", "fill", ...)
			 * @param duration Integer. Duration of the animation, in frames
			 * @param from Start value
			 * @param to End value
			 * @param method String. animation method: 'linear', 'catmullrom'
			 * @param delay Integer. Delay before start the animation, in frames
			 * @param precompute Boolean. Set to tru if you want to precompute the animations steps
			 *
			 * @example this.sceneGraph.animate(imgNode, "position.x", 700, 0, 200, "linear", 0, true);
			 */
			this.sceneGraph.animate(this.redSquareNode, "position.x", 80, 0, 500, "linear", 0, true);

			this.sceneGraph.getTimeline(this.redSquareNode, "position.x").onAnimationStart = function(event) {
				console.log("animation started");
			};
			this.sceneGraph.getTimeline(this.redSquareNode, "position.x").onAnimationEnd = function(event) {
				console.log("animation ended");
			};
			this.sceneGraph.getTimeline(this.redSquareNode, "position.x").onAnimationStart = function(event) {
				console.log("animation started");
			};
		},

		checkCollision : function() {
			//uncomment to chek the collision with all brothers (text node included)
			//var isColliding = this.redSquareNode.isCollidingABrother();

			var isColliding = this.redSquareNode.isColliding(this.blueSquareNode);
			this.logNode.setText("Collision : " + isColliding);
		}

	}
);