/**
 * Copyright (c) 2012  Gwennaël Buchet Technology Services (hereinafter “Gwennaël Buchet”)
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
 *  Terms of Use causing significant harm to Gwennaël Buchet.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  Except as contained in this notice, the name of Gwennaël Buchet shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Gwennaël Buchet.
 *
 *  These Terms of Use are subject to French law.
 *
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 * @date 10/08/2012
 *
 * Purpose :
 * displayRatio example
 * */

var CGMain = CGSGScene.extend(
	{
		initialize: function (canvas) {

			this._super(canvas);

			////// INITIALIZATION /////////

			this.initializeCanvas();
			this.createScene();

			this.startPlaying();

			//add an handler on the window resize event
			var bindInitializeCanvas = this.initializeCanvas.bind(this);
			window.onresize = bindInitializeCanvas;
		},

		initializeCanvas: function () {
			//redimensionnement du canvas pour être full viewport en largeur
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);

			/*
			 Compute a ratio between a reference screensize (here : 1920x1080) and the actual screen size.
			 With that ratio, the content of the scenegraph will be rendered as if it were displayed in the reference screen size.

			 For example:
			 - your screen size is 1280x1024
			 - the screen size of another player/user is bigger : 1600x1200
			 - the screen size of a 3rd player/user is lower : 1024x768

			 You want all users/players to see all the content, what ever the size of the canvas and the scene, so you have to reduce it or increase the size
			 of all the nodes to be correctly displayed on all screens.
			 No problem, the cgSceneGraph will do all the job :)
			 Just specify the displayratio and all the nodes will be rendered at the correct size :
			 their position, dimension, scale and rotation are the same, but at the rendering time, they appear at the scaled size and position.
			 */

			var sw = this.viewDimension.width / 1600;
			var sh = this.viewDimension.height / 1200;

			var actualRatio = this.viewDimension.width / this.viewDimension.height;
			var targetRatio = 1600 / 1200;

			var displayRatio = new CGSGScale(cgsgCanvas.width / 1600, cgsgCanvas.height / 1200);
			this.setDisplayRatio(displayRatio);
		},

		/**
		 * create a random scene with some nodes
		 *
		 */
		createScene: function () {

			var background = new CGSGNodeSquare(0, 0, cgsgCanvas.width / 2, cgsgCanvas.height / 2);
			background.color = "lightgray";
			this.sceneGraph.addNode(background, null);

			var text = new CGSGNodeText(10, 10, "The square and text will be full sized at 1600x1200.\n" +
												"In other size, the scene will be automatically resized to allow all rezolutions to see the entiere scene.\n\n"
				+
												"Resize your screen to see the changes.");
			background.addChild(text);
			text.setLineHeight(25);

			var squareNode = new CGSGNodeSquare(60, 140, 200, 200);
			squareNode.isResizable = true;
			squareNode.isDraggable = true;

			background.addChild(squareNode);
		}

	}
);
