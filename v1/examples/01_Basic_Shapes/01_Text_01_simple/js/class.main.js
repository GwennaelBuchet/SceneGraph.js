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
 * text example
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
		 *
		 */
		createScene: function () {
			//first create a root node with an arbitrary size and position
			this.rootNode = new CGSGNode(0, 0, 500, 500);
			this.sceneGraph.addNode(this.rootNode, null);

			this.create1LineText();
			this.createMaxWidthText();
			this.createCarriageReturnText();
			this.createScaledText();
		},

		create1LineText: function () {
			var textNode = new CGSGNodeText(10, 10, "Simple line");
			textNode.pickNodeMethod = CGSGPickNodeMethod.REGION;
			textNode.setSize(26);
			textNode.setTypo("Arial");
			textNode.isDraggable = true;

			//add the textNode as child of the root
			this.rootNode.addChild(textNode);
		},

		createMaxWidthText: function () {
			var maxWidth = 180;

			var textNode = new CGSGNodeText(10, 100, "Simple centered and long text with a max of :" + maxWidth +
													 " px to be on a multiline...");
			textNode.setSize(14);
			textNode.setTypo("Arial");
			textNode.isDraggable = true;
			textNode.isResizable = true;

			textNode.setWrapMode(CGSGWrapMode.WORD);
			textNode.setTextAlign("center");
			textNode.setMaxWidth(maxWidth);
			textNode.setLineHeight(18);

			textNode.onResize = function (event) {
				event.node.setMaxWidth(event.node.dimension.width);
			}

			//add the textNode as child of the root
			this.rootNode.addChild(textNode);
		},

		createCarriageReturnText: function () {
			var textNode = new CGSGNodeText(10, 200, "Simple blue text with a carriage return:\njust\there");
			textNode.setSize(14);
			textNode.setTypo("Times New Roman");
			textNode.isDraggable = true;

			textNode.color = "blue";

			//add the textNode as child of the root
			this.rootNode.addChild(textNode);
		},

		createScaledText: function () {
			var parent = new CGSGNodeSquare(40, 300, 200, 90);
			parent.isDraggable = true;

			var textNodeBottom = new CGSGNodeText(10, 20, "Bottom on " + cgsgCurrentExplorer.name);
			textNodeBottom.setSize(14);
			textNodeBottom.setTypo("courier new");
			textNodeBottom.isDraggable = true;
			textNodeBottom.color = "white";
			textNodeBottom.setTextBaseline("bottom");

			var textNodeMiddle = new CGSGNodeText(10, 30, "Middle on " + cgsgCurrentExplorer.name);
			textNodeMiddle.setSize(14);
			textNodeMiddle.setTypo("Arial");
			textNodeMiddle.isDraggable = true;
			textNodeMiddle.color = "white";
			textNodeMiddle.setTextBaseline("middle");

			var textNodeTop = new CGSGNodeText(10, 40, "Top on " + cgsgCurrentExplorer.name);
			textNodeTop.setSize(14);
			textNodeTop.setTypo("Arial");
			textNodeTop.isDraggable = true;
			textNodeTop.color = "white";
			textNodeTop.setTextBaseline("top");

			var textNodeAlphabetic = new CGSGNodeText(10, 80, "alphabetic on " + cgsgCurrentExplorer.name);
			textNodeAlphabetic.setSize(14);
			textNodeAlphabetic.setTypo("Arial");
			textNodeAlphabetic.isDraggable = true;
			textNodeAlphabetic.color = "white";
			textNodeAlphabetic.setTextBaseline("alphabetic");

			parent.addChild(textNodeTop);
			parent.addChild(textNodeMiddle);
			parent.addChild(textNodeBottom);
			parent.addChild(textNodeAlphabetic);
			parent.scaleTo(2.0, 2.0);
			//add the textNode as child of the root
			this.rootNode.addChild(parent);
		}

	}
);