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
 * image loading example
 * */

var CGMain = CGSGView.extend(
	{
		initialize: function (canvas) {

			//call the contructor of the parent class (ie : CGSGView)
			this._super(canvas);

			////// INITIALIZATION /////////

			this.initializeCanvas();
			this.createScene();

			this.startPlaying();
		},

		initializeCanvas: function () {
			//resize the canvas to fulfill the viewport
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},

		createScene: function () {
			//first create a root node with an arbitrary position
			this.rootNode = new CGSGNode(0, 0);
			CGSG.sceneGraph.addNode(this.rootNode, null);

			// image
			var image = new CGSGNodeImage(0, 0, "images/hello.png");
			image.isResizable = true;
			image.isDraggable = true;

			// text
			var maxWidth = 600;
			this.text =
			new CGSGNodeText(10, 100,
			                 "They didn’t agree on much. In fact, they didn’t agree on anything. They fought all the time and challenged each other every day.");
			this.text.isDraggable = true;
			this.text.isResizable = true;
			this.text.selectionLineWidth = 0;

			this.text.setClass("cgsg-h3");
			this.text.addClass("cgsg-center");
			this.text.color = "red";

			this.text.setNodeRegionConstraint(image);

			this.text.setWrapMode(CGSGWrapMode.WORD);
			this.text.setMaxWidth(maxWidth);

			this.text.onResize = function (event) {
				event.data.node.setMaxWidth(event.data.node.dimension.width);
			};

			var bindSetMaxWidth = this.setMaxWidth.bind(this);
			image.onLoadEnd = bindSetMaxWidth;
			//image.onResize = bindSetMaxWidth;

			//add the textNode as child of the root
			this.rootNode.addChild(image);
			this.rootNode.addChild(this.text);
		},

		setMaxWidth: function (event) {
			var width = event.data.node.getWidth();

			this.text.setMaxWidth(width);
			console.log("maxWidth = " + this.text._maxWidth);
			console.log("current width = " + this.text.getWidth());
		}
	}
);
