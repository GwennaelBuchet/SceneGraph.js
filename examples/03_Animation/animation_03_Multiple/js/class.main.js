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
 * @date 10/08/2012
 *
 * Purpose :
 * animation example
 * */
var CGMain = CGSGScene.extend(
	{
		initialize : function (canvas) {

			this._super(canvas);

			////// INITIALIZATION /////////

			this.initializeCanvas();

			this.textNode = null;
			this.squareNode = null;

			this.createScene();

			this.startPlaying();
		},

		initializeCanvas : function () {
			//redimensionnement du canvas pour être full viewport en largeur
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},

		/**
		 *
		 *
		 */
		createScene : function () {
			//first create a root node with an arbitrary size and position
			this.rootNode = new CGSGNode(0, 0, 1, 1);
			this.sceneGraph.addNode(this.rootNode, null);

			//add a text node ("click me") with a onClick event
			var buttonNode = new CGSGNodeButton(10, 10, "Click Me");
			buttonNode.textBaseline = "bottom";
			//bind the "this.moveSquare" function to this. See Prototype.js "bind" function.
			var bindMoveSquare = this.moveSquare.bind(this);
			buttonNode.onClick = function (event) {
				bindMoveSquare();
			}
			//add the textNode as child of the root
			this.rootNode.addChild(buttonNode);

			this.squareNode = new CGSGNodeSquare(0, 60, 100, 100);
			this.squareNode.isResizable = true;
			this.squareNode.isDraggable = true;
			this.rootNode.addChild(this.squareNode);
		},

		/**
		 * The method called to move the square
		 */
		moveSquare : function () {

            //re-init position and scale
            this.squareNode.translateTo(0, 60);
            this.squareNode.scaleTo(1.0, 1.0);

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

		    this.sceneGraph.animate(this.squareNode, "position.x", 30, 0, 200, "linear", 0, false);
            this.sceneGraph.animate(this.squareNode, "position.y", 30, 60, 130, "linear", 30, false);
            this.sceneGraph.animate(this.squareNode, "scale.x", 30, 1, 2, "linear", 60, false);
            this.sceneGraph.animate(this.squareNode, "scale.y", 30, 1, 2, "linear", 60, false);
            this.sceneGraph.animate(this.squareNode, "scale.x", 30, 2, 1, "linear", 90, false);
            this.sceneGraph.animate(this.squareNode, "scale.y", 30, 2, 1, "linear", 90, false);

            //you can also add animation keys inside a timeline:
            //this.sceneGraph.addAnimationKey(this.squareNode, "position.x", 90, 90, "linear", true);
            //this.sceneGraph.addAnimationKey(this.squareNode, "position.x", 45, 90, "linear", true);


            //add events to the start and end of animation to log them
			this.sceneGraph.getTimeline(this.squareNode, "position.x").onAnimationStart = function (event) {
				console.log("animation started");
			};
			this.sceneGraph.getTimeline(this.squareNode, "position.x").onAnimationEnd = function (event) {
				console.log("animation ended");
			};
		}

	}
);