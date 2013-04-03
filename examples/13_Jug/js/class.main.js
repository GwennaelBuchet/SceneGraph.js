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
 * Template project
 * */var CGMain = CGSGView.extend(
	{
		initialize : function (canvas) {

			this._super(canvas);

			this.initializeCanvas();

			this.createScene();

			this.startPlaying();
		},

		initializeCanvas : function () {
			//redimensionnement du canvas pour être full viewport en largeur
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},

		/**
		 * Just create a single node (a square node)
		 *
		 */
		createScene : function () {
			this.rootNode = new CGSGNode(0, 0, 0, 0);
			CGSG.sceneGraph.addNode(this.rootNode, null);

            this.marxzel = new CGSGNodeSprite(10, 10, null, CGSG.context);
            this.rootNode.addChild(this.marxzel);


            //load the global image
            this.imgBoard = new Image();
            this.imgBoard.onload = this.onLoadImgBoard.bind(this);
            this.imgBoard.src = "img/board.png";
		},

        onLoadImgBoard : function() {
            this.marxzel.setImage(this.imgBoard);
        }

	}
);
