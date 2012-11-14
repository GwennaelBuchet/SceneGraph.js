/*
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
 */

/*
To create a new class that inherit from a class "Parent":
var MyClass = Parent.extend(
{
	//constructor :
	initialize : function() {
		//each properties defined with "this." is global to the class
		this.x = 2;
	},

	myMethod : function(x) {
	}
}
);
 */
var CGMain = CGSGScene.extend(
	{
		// initialize is the constructor
		initialize : function (canvas) {
			//call constructor of the parent : CGSGScene
			this._super(canvas);

			//Optional : initialize the size of the canvas
			this.initializeCanvas();
			//Fill the graph with your nodes
			this.createScene();

			//start to play !
			this.startPlaying();
		},

		/**
		 * Set/change the size of the canvas to the size of the viewport of the browser
		 * @method initializeCanvas
		 */
		initializeCanvas : function () {
			//resize the canvas to fill the viewport
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},

		/**
		 * Just create a single node (a square node)
		 * @method createScene
		 */
		createScene : function () {
			//create a square node : x, y, width, height
			this.squareNode = new CGSGNodeSquare(60, 20, 200, 200);
			//add some nice properties
			this.squareNode.isResizable = true;
			this.squareNode.isDraggable = true;

			//add the square node as the root of the graph
			this.sceneGraph.addNode(this.squareNode, null);
		}

	}
);
