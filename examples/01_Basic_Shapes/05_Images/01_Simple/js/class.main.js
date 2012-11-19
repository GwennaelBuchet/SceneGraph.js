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
 * image loading example
 * */

var CGMain = CGSGScene.extend(
	{
		initialize : function (canvas) {

            //call the contructor of the parent class (ie : CGSGScene)
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

	        var rootNode = new CGSGNode(0, 0, 0, 0);
	        this.sceneGraph.addNode(rootNode, null);

            /*
             * @param x
             * @param y
             * @param width
             * @param height
             * @param sliceX
             * @param sliceY
             * @param sliceWidth
             * @param sliceHeight
             * @param urlImage
             * @param context
             */
            this.imgNode = new CGSGNodeImage(
                60,     //x
                40,     //y
                -1,     //width (-1 = auto compute)
                -1,     //height (-1 = auto compute)
                0,      //slice x (used for tiles. Here we want to display all the image)
                0,      //slice y (used for tiles. Here we want to display all the image)
                -1,     //slice width (used for tiles. Here we want to display all the image)
                -1,     //slice height (used for tiles. Here we want to display all the image)
                "images/hello.png",      //URL. Warning : the web page mus be on a web server (apache, ...)
                this.context);      //context of rendering

            //add some attributes
            this.imgNode.isResizable = true;
            this.imgNode.isDraggable = true;

            //add image node as root of the scenegraph (2ns parameter = null)
	        rootNode.addChild(this.imgNode);


	        
	        //add a button to switch src
	        this.currentImg = 0;
	        this.buttonNode = new CGSGNodeButton(10, 10, "Switch source");
	        var bindSwitchSrc = this.switchSrc.bind(this);
	        this.buttonNode.onClick = function (event) {
		        bindSwitchSrc();
	        };
	        //add the textNode as child of the root
	        rootNode.addChild(this.buttonNode);
        },

		switchSrc : function () {
			this.currentImg = 1 - this.currentImg;

			var src = ["images/hello.png", "images/board.png"];
			this.imgNode.setURL(src[this.currentImg]);
		}
	}
);
