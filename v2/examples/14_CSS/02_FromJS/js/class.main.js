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

			var rootNode = new CGSGNode(0, 0);
			CGSG.sceneGraph.addNode(rootNode);

			var txtNode = new CGSGNodeText(10, 10, "CSS is loaded from inside JS file.");
			rootNode.addChild(txtNode);

			//No set of specific class for that circle, so it will use default colors from the current theme imported from index.html
			var circle1 = new CGSGNodeCircle(60, 80, 30);
			circle1.isDraggable = true;
			circle1.isResizable = true;
			rootNode.addChild(circle1, null);

			var circle2 = new CGSGNodeCircle(140, 80, 30);
			circle2.isDraggable = true;
			circle2.isResizable = true;
			rootNode.addChild(circle2, null);

			/**********************
			 Load CSS file here
			 **********************/
			//if another CSS file was previoulsy loaded, you may unload it to free memory and avoid confusion risks
			//CGSG.cssManager.unloadCSSFile("../shared/themes/otherTheme/previous.css");

			//first add an event fired when file will be effectively loaded.
			CGSG.cssManager.onLoadEnd = this.onCSSLoaded.bind(this);

			//then load the file. URL is relative to the html file
			CGSG.cssManager.loadCSSFile("../../../js/sg/css/themes/gray/grayTheme.css");
		},

		onCSSLoaded : function() {
			//Force scene to be validated again, to redraw objects that were in cache.
			this.invalidateTheme();
		}
	}
);