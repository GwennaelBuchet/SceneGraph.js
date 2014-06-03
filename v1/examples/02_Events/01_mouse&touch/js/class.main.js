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
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 * @date 10/08/2012
 *
 * Purpose :
 * events example
 * */
var CGMain = CGSGScene.extend(
	{
		initialize: function (canvas) {

			this._super(canvas);

			////// INITIALIZATION /////////

			this.initializeCanvas();

			this.createScene();

			this.startPlaying();
		},

		initializeCanvas: function () {
			//redimensionnement du canvas pour être full viewport en largeur
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},

		/**
		 *
		 */
		createScene: function () {
			//first create a root node with an arbitrary size and position
			this.rootNode = new CGSGNode(0, 0, 1000, 1000);
			this.sceneGraph.addNode(this.rootNode, null);

			this.textNode = new CGSGNodeText(40, 40, "Event : (none)");
			this.textNode.setSize(18);
			this.rootNode.addChild(this.textNode);

			var squareMediumPurple = this.createSquare(20, 100, "MediumPurple", "click me");
			var squareSlateGray = this.createSquare(140, 100, "SlateGray", "over/out me");
			var squareGreenYellow = this.createSquare(260, 100, "GreenYellow", "dblclick me");
			var squareDeepSkyBlue = this.createSquare(380, 100, "DeepSkyBlue", "drag me");
			var squareHotPink = this.createSquare(20, 220, "HotPink", "resize me");
			var squareOrange = this.createSquare(140, 220, "Orange", "select me");
			this.squareBisque = this.createSquare(260, 220, "Bisque", "drag & \ncollide me");

			//squareOrange.isDraggable = false;
			squareOrange.isResizable = false;
			squareMediumPurple.isResizable = false;

			//add events on nodes
			var that = this; // avoid the problem of binding

			this.onSceneClickEnd = function (event) {
				if (this.selectedNodes.length == 0) {
					that.textNode.setText("Event : click on scene");
				}
			};

			squareMediumPurple.onClick = function (event) {
				that.textNode.setText("Event : click on square MediumPurple");
			};

			squareSlateGray.onMouseOver = function (event) {
				that.textNode.setText("Event : over on square SlateGray");
			};
			squareSlateGray.onMouseOut = function (event) {
				that.textNode.setText("Event : out of square SlateGray");
			};

			squareGreenYellow.onDblClick = function (event) {
				that.textNode.setText("Event : dblclick on square GreenYellow");
			};
			squareGreenYellow.isDraggable = false;
			squareGreenYellow.isResizable = false;

			squareDeepSkyBlue.onDrag = function (event) {
				that.textNode.setText("Event : drag square DeepSkyBlue");
			};
			squareDeepSkyBlue.onDragEnd = function (event) {
				that.textNode.setText("Event : drag end square DeepSkyBlue");
			};

			squareHotPink.onResize = function (event) {
				that.textNode.setText("Event : resize square HotPink");
			};
			squareHotPink.onResizeEnd = function (event) {
				that.textNode.setText("Event : resize end square HotPink");
			};

			squareOrange.onSelect = function (event) {
				that.textNode.setText("Event : select square Orange");
			};
			squareOrange.onDeselect = function (event) {
				that.textNode.setText("Event : deselect square Orange");
			};

			var bindTestCollide = this.testCollide.bind(this);
			this.squareBisque.onDrag = bindTestCollide;
			this.squareBisque.onResize = bindTestCollide;

			//add nodes on the scene
			this.rootNode.addChild(squareMediumPurple);
			this.rootNode.addChild(squareSlateGray);
			this.rootNode.addChild(squareGreenYellow);
			this.rootNode.addChild(squareDeepSkyBlue);
			this.rootNode.addChild(squareHotPink);
			this.rootNode.addChild(squareOrange);
			this.rootNode.addChild(this.squareBisque);
		},

		testCollide: function () {
			var list = this.squareBisque.getListOfCollidingBrothers(0);
			var listNames = "";
			for (var i = 0; i < list.length; i++) {
				listNames += list[i].name + "; ";
			}
			this.textNode.setText("Event : colliding square Bisque with : " + listNames);
		},

		/**
		 * Create a square and return it
		 * @param x position.x
		 * @param y position.y
		 * @param color color to apply (will also be used to construct the name of the node)
		 * @param text text to print inside the square
		 * @return {CGSGNodeSquare}
		 */
		createSquare: function (x, y, color, text) {
			//create a red square as child of the blue one
			var square = new CGSGNodeSquare(x, y, 100, 100);
			square.isDraggable = true;
			square.isResizable = true;
			square.color = color;
			square.name = color;

            //indicate that the square will be checked by the collision manager
            //(new to v1.4.1)
            square.isCollisionManaged = true;

			//add a text to the square node
			var textNode = new CGSGNodeText(5, 5, color + "\n" + text);
			textNode.setSize(10);
			textNode.color = "black";
			textNode.isClickable = false;
			square.addChild(textNode);

			return square;
		}
	}
);