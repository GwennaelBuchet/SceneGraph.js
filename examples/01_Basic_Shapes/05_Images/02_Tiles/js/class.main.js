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
		initialize : function (canvas) {

			//call the contructor of the parent class (ie : CGSGView)
			this._super(canvas);

			////// INITIALIZATION /////////

			this.initializeCanvas();
			this.createScene();

			this.startPlaying();
		},

		initializeCanvas : function () {
			//resize the dimension of the canvas to fulfill the viewport
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},

		/**
		 * Just create a single node (an image node)
		 */
		createScene : function () {
			//first, create a root node
			this.rootNode = new CGSGNode(0, 0);
			CGSG.sceneGraph.addNode(this.rootNode, null);

			//second, create the 2 nodes, with no image URL, and add them to the root node
			this.imgNode1 = new CGSGNodeImage(
				40, //x
				40, null); //

			//cut the slice from the source image
			this.imgNode1.setSlice(612, 34, 34, 34, true);

			//add some attributes
			this.imgNode1.isResizable = true;
			this.imgNode1.isDraggable = true;

			//add image node to the root of the scenegraph
			this.rootNode.addChild(this.imgNode1);

			this.imgNode2 = new CGSGNodeImage(
				90, //x
				40, null); //y

			//add some attributes
			this.imgNode2.isResizable = true;
			this.imgNode2.isDraggable = true;
			this.rootNode.addChild(this.imgNode2);
			//cut the slice from the source image
			this.imgNode2.setSlice(476, 0, 34, 34, true);

			//then load the image normally, like in any JS context
			this.img = new Image();
			this.img.onload = this.onImageLoaded.bind(this);
			this.img.src = "images/board.png";
		},

		/**
		 * Fired when the image loading is complete.
		 * Set the image object (img) to our image nodes
		 */
		onImageLoaded : function () {
			this.imgNode1.setImage(this.img);
			this.imgNode2.setImage(this.img);
		}
	}
);
