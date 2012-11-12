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
 * button example
 * */
var CGMain = CGSGScene.extend(
	{
		initialize : function (canvas) {

			this._super(canvas);

			////// INITIALIZATION /////////

			this.initializeCanvas();

			this.createScene();

			this.startPlaying();
		},

		initializeCanvas : function () {
			//resize the canvas to fulfill the viewport
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},

		/**
		 *
		 *
		 */
		createScene : function () {

			//create a root node to the graph, with arbitrary position and size
			var rootNode = new CGSGNode(0, 0, 0, 0);
			this.sceneGraph.addNode(rootNode, null);

			//X, Y, WIDTH, HEIGHT
			var buttonNormal = new CGSGNodeButton(10, 10, "Normal");
			buttonNormal.name = "Normal Button";
			buttonNormal.onClick = function(event) {
				alert(event.node.name);
			}
			rootNode.addChild(buttonNormal, null);

			var buttonOver = new CGSGNodeButton(110, 10, "Big & initially Overed");
			//3 text : normal, over, deactivated
			buttonOver.setText(["Still Big but mouse out", "Big & initially Overed", "Big and deactivated"]);
			buttonOver.setMode(CGSGButtonMode.OVER);
			buttonOver.isDraggable = true;
			buttonOver.setVerticalPadding(42);
			rootNode.addChild(buttonOver, null);

			var buttonDeactivated = new CGSGNodeButton(210, 10, "Deactivated");
			buttonDeactivated.setMode(CGSGButtonMode.DEACTIVATED);
			buttonDeactivated.isDraggable = true;
			rootNode.addChild(buttonDeactivated, null);


			var buttonLittle = new CGSGNodeButton(10, 50, "Little");
			buttonLittle.onClick = function(event) {
				alert("click on button : " + event.node.getText()[0]);
			}
			buttonLittle.setVerticalPadding(2);
			buttonLittle.setHorizontalPadding(4);
			//3 radius : normal, over, deactivated
			buttonLittle.setRadius([5, 5, 5]);
			//3 sizes : normal, over, deactivated
			buttonLittle.setTextSize([8, 8, 8]);
			rootNode.addChild(buttonLittle, null);


			var buttonCustom = new CGSGNodeButton(10, 80, "Custom\nColors");
			//3 colors : normal, over, deactivated
			buttonCustom.setFirstColor(["#FFADAD", "#D89393", "#F9DBDB"]);
			buttonCustom.setLastColor(["#FF8E8E", "#D37676", "#D8BEBE"]);
			buttonCustom.setTextColor(["#FFFFFF", "#8EA7FF", "gray"]);
			rootNode.addChild(buttonCustom, null);

		}
	}
);