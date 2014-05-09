/**
 * Copyright (c) 2014 Gwennael Buchet
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
 * event example
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
			//resize the canvas to fulfill the viewport
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},

		/**
		 *
		 *
		 */
		createScene : function() {

			var root = new CGSGNode(0, 0);
			CGSG.sceneGraph.addNode(root, null);

			var txtNode = new CGSGNodeText(10, 10, "This sample shows how to set a custom CSS class to a node.");
			root.addChild(txtNode);

			//No set of specific class for that circle, so it will use default colors from the current theme imported from index.html
			var circle1 = new CGSGNodeCircle(60, 160, 30);
			circle1.isDraggable = true;
			circle1.isResizable = true;
			root.addChild(circle1);

			this.circle2 = new CGSGNodeCircle(160, 160, 30);
			this.circle2.isDraggable = true;
			this.circle2.isResizable = true;
			root.addChild(this.circle2);

			var button = new CGSGNodeButton(10, 60, "switch style of 2nd circle");
			root.addChild(button);

			button.onClick = this.switchCls.bind(this);
			//define a counter for current CSS class applied on circle2. Will be used on following function
			this.clsIndex = 1;
		},

		/**
		 * Switch the CSS class for this.circle2 only
		 */
		switchCls : function() {

			//".cgsgnode" is a CSS class defined in "theme/gray.css" and is the default class for CGSGNode
			//".blueCircle" is a CSS class defined in "style.css" which is our specific CSS for this example
			this.cls = ["cgsgnode", "blueCircle"];
			//".cgsgnode-bbox" is a CSS class defined in "theme/gray.css" and is the default class for Bounding box of CGSGNode
			//".green-bbox" is a CSS class defined in "style.css" which is our specific CSS for this example
			this.clsBBox = ["cgsgnode-bbox", "green-bbox"];

			this.circle2.setClass(this.cls[this.clsIndex]);

			//want to change style of bounding box when selected
			this.circle2.setClassBBox(this.clsBBox[this.clsIndex]);

			//switch current CSS class
			this.clsIndex = 1 - this.clsIndex;
		}
	}
);