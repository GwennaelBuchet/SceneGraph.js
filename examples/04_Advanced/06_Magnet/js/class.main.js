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
 * @date 10/08/2012
 *
 * Purpose :
 * traverser example
 * */

var CGMain = CGSGView.extend(
	{
		initialize : function(canvas) {

			this._super(canvas);

			////// INITIALIZATION /////////

			this.initializeCanvas();
			this.createScene();

			this.startPlaying();
		},

		initializeCanvas : function() {
			//redimensionnement du canvas pour être full viewport en largeur
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},

		/**
		 * create a random scene with some nodes
		 *
		 */
		createScene : function() {
			//create and add a root node to the scene, with arbitrary dimension
			this.rootNode = new CGSGNode(0, 0, 1, 1);
			this.sceneGraph.addNode(this.rootNode, null);

			//distance used to detect collision
			this.threshold = 10;

			//create and add 4 Squares
			var square = null;
			for (var s = 0; s < 4; s++) {
				square = this.createRandomSquare();
				this.rootNode.addChild(square);
			}

			this.textNodeTitle = new CGSGNodeText(20, 10, "Move square to 'magnet' them together.");
			this.textNodeTitle.setSize(14);
			this.rootNode.addChild(this.textNodeTitle);

			this.textNodeComment = new CGSGNodeText(20, 30, "Magnet distance = " + this.threshold);
			this.textNodeComment.setSize(10);
			this.rootNode.addChild(this.textNodeComment);

		},

		createRandomSquare : function() {
			var w = CGSGMath.fixedPoint(CGSG.canvas.width / 6);
			var h = CGSGMath.fixedPoint(CGSG.canvas.height / 6);

			var x = Math.random() * CGSGMath.fixedPoint(CGSG.canvas.width - w);
			var y = Math.random() * CGSGMath.fixedPoint(CGSG.canvas.height - h);

			var colors = ["red", "green", "blue", "yellow", "#34A8BE", "magenta", "gray"];
			var color = colors[Math.floor(Math.random() * colors.length)];

			var squareNode = new CGSGNodeSquare(x, y, w, h);
			squareNode.color = color;
			squareNode.isResizable = true;
			squareNode.isDraggable = true;

			//add test collision on resize and on drag
			var bindTestCollide = this.testCollide.bind(this);
			squareNode.onDrag = bindTestCollide;
			squareNode.onResize = bindTestCollide;

			return squareNode;
		},

		testCollide : function(event) {
			var listColliders = event.node.getListOfCollidingBrothers(this.threshold);

			var collider = null;
			for (var i = 0; i < listColliders.length; i++) {
				collider = listColliders[i];

				if (collider.getAbsoluteLeft() < collider)

				event.node.translateTo(collider.getAbsoluteLeft(), collider.getAbsoluteTop());
			}
		}

	}
);
