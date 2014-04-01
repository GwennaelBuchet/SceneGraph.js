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
 * animated sprite example
 * */

var CGMain = CGSGView.extend(
	{
		initialize : function (canvas) {

			this._super(canvas);

			////// INITIALIZATION /////////

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
		 * Just create a 1 animated sprite
		 *
		 */
		createScene : function () {

			this.rootNode = new CGSGNode(0, 0);
			CGSG.sceneGraph.addNode(this.rootNode, null);

			/*
			 * @param x
			 * @param y
			 * @param image url
			 * @param context
			 */
			var pingoo = new CGSGNodeSprite(60, 60, "images/board.png");
            //add the sprite to the scene
            pingoo.isResizable = true;
            CGSG.sceneGraph.addNode(pingoo, this.rootNode);


            //add an animation
			//name, speed, frames, sliceX, sliceY, width, height, framesPerLine
            var speed = 4;
            pingoo.addAnimation("front", speed, 4, 476, 0, 34, 34, 4);

			//run in an infinite loop
            pingoo.play("front", null); //null or -1 = infinite loop. 1, 2, 3, ... = 1, 2, 3 loops
		}
	}
);
