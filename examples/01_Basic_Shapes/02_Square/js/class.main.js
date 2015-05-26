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
 * event example
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
			//resize the canvas to fulfill the viewport
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},

		/**
		 *
		 *
		 */
		createScene : function () {
            CGSG.globalDetectSelectionThreshold = 10; // Threshold applied to all new nodes
            CGSG.isBoundingBoxOnTop = false;

            //first create a root node with an arbitrary position
            this.rootNode = new CGSGNode(0, 0);
            CGSG.sceneGraph.addNode(this.rootNode, null);

			//X, Y, WIDTH, HEIGHT
			var square = new CGSGNodeSquare(20, 80, 150, 150);
			square.isDraggable = true;
			square.isResizable = true;

			square.rotateTo(0.3, true);
			square.pickNodeMethod = CGSGPickNodeMethod.GHOST;

            this.rootNode.addChild(square);

            this.roundSquare = new CGSGNodeSquare(200, 80, 200, 100);
			this.roundSquare.radius = 10;
			this.roundSquare.bkgcolors = ["#af3421"];
			//this.roundSquare.detectSelectionThreshold = 0; // specific detection threshold for this node
			this.roundSquare.isDraggable = true;
			this.roundSquare.isResizable = true;
			//this.rootNode.addChild(this.roundSquare);


			//add a slider to control radius for 2nd square
			var txt = new CGSGNodeText(10, 10, "Radius of gray rectangle: " + square.borderRadius);
			txt.setClass("cgsg-h2");
			this.rootNode.addChild(txt);

			var sliderListener = (function(event) {
				var s = event.observable.getParentSlider();
				square.borderRadius = s.value;
				txt.setText("Radius of gray rectangle: " + square.borderRadius);
			}).bind(this);

			var slider = new CGSGNodeSlider(20, 40, 400, 10);
			this.rootNode.addChild(slider);
			slider.setValue(square.borderRadius);
			slider.setMin(0);
			slider.setMax(150);
			CGSG.eventManager.bindHandler(slider.getHandle(), cgsgEventTypes.ON_DRAG, sliderListener);


		}
	}
);