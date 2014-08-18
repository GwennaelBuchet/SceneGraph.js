/**
 * Copyright (c) 2014 Gwennael Buchet
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
            //resize the canvas to fulfill the viewport
            this.viewDimension = cgsgGetRealViewportDimension();
            this.setCanvasDimension(this.viewDimension);
		},

        /**
         * Just create a single node (an image node)
         */
        createScene : function () {
	        var rootNode = new CGSGNode(0, 0);
	        CGSG.sceneGraph.addNode(rootNode, null);

            /*
             * @param x
             * @param y
             * @param urlImage
             */
            this.imgNode = new CGSGNodeImage(
                60,     //x
                60,     //y
                "images/hello.png");      //URL. Warning : the web page should be on a web server (apache, ...)

            //this.imgNode.resizeTo(120, 100);
            //this.imgNode.setSlice(30, 30, 80, 200, true);

            //add some attributes
            this.imgNode.isResizable = true;
            this.imgNode.isDraggable = true;

	        rootNode.addChild(this.imgNode);

	        //add a button to switch src
	        this.currentImg = 0;
	        this.buttonNode = new CGSGNodeButton(10, 10, "Switch source");
	        this.buttonNode.onClick = this.switchSrc.bind(this);

	        //add the textNode as child of the root
	        rootNode.addChild(this.buttonNode);
        },

		switchSrc : function () {
			this.currentImg = 1 - this.currentImg;
			var src = ["images/hello.png", "images/board.png"];

            //set the new URL
			this.imgNode.setURL(src[this.currentImg]);

            //to force the check of the dimension ofr this new image:
            this.imgNode.onLoadEnd = function(event) {
                event.data.node.checkDimension();
            };
		}
	}
);
