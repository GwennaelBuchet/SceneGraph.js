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
 * animation example
 * */
var CGMain = CGSGScene.extend(
	{
		initialize : function(canvas) {

			this._super(canvas);

			////// INITIALIZATION /////////

			this.initializeCanvas();

			this.textNode = null;
			this.squareNode = null;

			this.createScene();

			this.startPlaying();
		},

		initializeCanvas : function() {
			//resize the canvas to fill the viewport
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
			this.textNode = new CGSGNodeText(10, 10, "Click Me.\n" +
			                                         "Animation is precomputed once and played by several nodes.");
			this.textNode.setSize(14);
			//bind the "this.moveSquare" function to this.
			var bindMoveSquare = this.moveSquares.bind(this);
			//add the onClick event to the text
			this.textNode.isClickable = true;
			this.textNode.onClick = function(event) {
				bindMoveSquare();
			}
			//add the textNode as child of the root
			this.rootNode.addChild(this.textNode);

			this.squareNode1 = new CGSGNodeSquare(60, 60, 100, 100);
			this.rootNode.addChild(this.squareNode1);

			this.squareNode2 = new CGSGNodeSquare(60, 180, 100, 100);
			this.rootNode.addChild(this.squareNode2);

			this.squareNode3 = new CGSGNodeSquare(60, 300, 100, 100);
			this.rootNode.addChild(this.squareNode3);


			/**
			 * The purpose here is to pre-compute values of animation when you need to apply the same animation several
			 * times (may be not on several nodes).
			 *
			 * To achieve this, we will :
			 *      - first simulate an animation on an arbitrary node
			 *      - export the values computed in the generated timeline
			 *      - then import theses values into timelines when need to use them
			 */

				//create arbitrary animation on squareNode1
			this.addAnimation(this.squareNode1);
			//save animation values into this.animationValues
			this.animationValues = this.sceneGraph.getTimeline(this.squareNode1, "position.x").exportValues();
			//no need to keep animation values or keys in memory. free them
			this.sceneGraph.getTimeline(this.squareNode1, "position.x").removeAll();
		},

		/**
		 *
		 * @param precompute
		 */
		addAnimation : function(node) {
			this.sceneGraph.addAnimationKey(node, "position.x", 0, 100, "linear", false); //don't precompute
			this.sceneGraph.addAnimationKey(node, "position.x", 30, 200, "linear", true); //precompute

			//we cal also use the helper method which add 2 animation keys ('from' and 'to'):
			//this.sceneGraph.animate(this.squareNode1, "position.x", 30, 100, 100, "linear", true);
		},

		/**
		 * The method is called to move the 3 squares, with the same pre-computed animation values.
		 */
		moveSquares : function() {
			//import values into the timeline, starting to the current frame (or later if you need)
			this.sceneGraph.getTimeline(this.squareNode1, "position.x").importValues(this.animationValues,
			                                                                         cgsgCurrentFrame);
			this.sceneGraph.getTimeline(this.squareNode2, "position.x").importValues(this.animationValues,
			                                                                         cgsgCurrentFrame);
			this.sceneGraph.getTimeline(this.squareNode3, "position.x").importValues(this.animationValues,
			                                                                         cgsgCurrentFrame);
		}

	}
)