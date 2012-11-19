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
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  Except as contained in this notice, the name of Capgemini shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Capgemini.
 *
 *  These Terms of Use are subject to French law.
 */
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
			//redimensionnement du canvas pour être full viewport en largeur
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},

		/**
		 *
		 *
		 */
		createScene : function () {
			//first create a root node with an arbitrary size and position
			this.rootNode = new CGSGNode(0, 0, 500, 500);
			this.sceneGraph.addNode(this.rootNode, null);

			//create a webview node
			this.webviewNode = new CGSGNodeWebview(20, 40, this.viewDimension.width / 2, this.viewDimension.height / 2,
			                                       "http://gwennaelbuchet.github.com/cgSceneGraph/", this.context);
			this.webviewNode.setPreviewURL("images/hello.png");
			this.webviewNode.isResizable = true;
			this.webviewNode.isDraggable = true;
			this.rootNode.addChild(this.webviewNode);

			//add a button to switch mode
			this.buttonNode = new CGSGNodeButton(10, 10, "Switch mode");
			var bindSwitchMode = this.switchMode.bind(this);
			this.buttonNode.onClick = function (event) {
				bindSwitchMode();
			};
			//add the textNode as child of the root
			this.rootNode.addChild(this.buttonNode);
		},

		switchMode : function () {
			if (this.webviewNode.getCurrentMode() === CGSGWEBVIEWMODE.LIVE) {
				this.webviewNode.switchMode(CGSGWEBVIEWMODE.PREVIEW);
			}
			else {
				this.webviewNode.switchMode(CGSGWEBVIEWMODE.LIVE);
			}
		}
	}
);