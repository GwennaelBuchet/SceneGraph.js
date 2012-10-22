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
 * traverser example
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

			//create and add random children
			for (var i = 0; i < 50; i++) {
				var squareNode = this.createRandomSquare(0, 0);
				this.rootNode.addChild(squareNode);

				//create and add children for this node too
				for (var c = 0; c < 10; c++) {
					var child = this.createRandomSquare(squareNode.position.x, squareNode.position.y);
					squareNode.addChild(child);
				}
			}

			//condition to use while traverse the graph
			var condition = function(node) {
				return node.color == "yellow";
			};

			var traverser = new CGSGTraverser();
			var listSquares = traverser.traverse(this.rootNode, condition, null);
			for (var s = 0; s < listSquares.length; s++) {
				this.sceneGraph.selectNode(listSquares[s]);
			}

			this.textNode = new CGSGNodeText(20, 10,
			                                 "Number of nodes found by the Traverser with the condition \"color == 'yellow'\" = "
				                                 + listSquares.length);
			this.textNode.setSize(14);
			//add the textNode as child of the root
			this.rootNode.addChild(this.textNode);

		},

		createRandomSquare : function(parentX, parentY) {
			var w = 20 + Math.random() * 40;
			var h = 20 + Math.random() * 40;

			var x = 100 + Math.random() * (cgsgCanvas.width - 200) - w - parentX;
			var y = 100 + Math.random() * (cgsgCanvas.height - 200) - h - parentY;

			var colors = ["red", "green", "blue", "yellow", "#34A8BE", "magenta", "gray"];
			var color = colors[Math.floor(Math.random() * colors.length)];

			var squareNode = new CGSGNodeSquare(x, y, w, h);
			squareNode.color = color;
			squareNode.isResizable = true;
			squareNode.isDraggable = true;

			return squareNode;
		}


	}
);
