/*
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
 */


var CGMain = CGSGView.extend(
	{
		initialize : function(canvas) {
			this._super(canvas);

			this.initializeCanvas();

			this.bbox = new SGJSBox2dWebWrapper();
			this.createScene();

			this.startPlaying();
		},

		initializeCanvas : function() {
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},


		/**
		 * Initrialize the nodes of the scene
		 * @method createScene
		 */
		createScene : function() {
			this.rootNode = new CGSGNodeSquare(0, 0, CGSG.canvas.width, CGSG.canvas.height);
			this.rootNode.bkgcolors[0] = "lightgray";
			CGSG.sceneGraph.addNode(this.rootNode, null);

			var that = this;

			//create ground
			this.ground = new CGSGNodeSquare(20, 400, 400, 20);
			this.ground.name = "ground";
			this.ground.bkgcolors[0] = "#11EF22";
			this.ground.lineWidth = 0;
			this.ground.isResizable = true;
			this.ground.isDraggable = true;
			this.rootNode.addChild(this.ground);
			this.bbox.addPhysics(this.ground, SGJSBox2dWebType.BOX, true);

			//add star
			/*var star = new CGSGNodeStar(10, 10, 11, 40, 60);
			 star.translateTo(200, 0);
			 this.rootNode.addChild(star);
			 this.bbox.addPhysicsToNode(star, SGJSBox2dWebType.BOX, true);
			 star.isDraggable = true;
			 star.isResizable = true;

			 //add cube


			 //add polygon
			 var points1 = [
			 new CGSGPosition(60, 140),
			 new CGSGPosition(100, 180),
			 new CGSGPosition(140, 140),
			 new CGSGPosition(180, 180),
			 new CGSGPosition(220, 140),
			 new CGSGPosition(260, 180)
			 ];

			 //centerX, centerY, radius, angle, clockwise
			 var poly = new CGSGNodePolygon(points1);
			 poly.isDraggable = true;
			 poly.isResizable = true;
			 //this.rootNode.addChild(poly);
			 //this.addPhysicsToNode(poly, SGJSBox2dWebType.POLYGON, true);
			 */

			//add image
			/*var imgNode = new CGSGNodeImage(
				30,     //x
				10,     //y
				"images/bear.png");
			this.rootNode.addChild(imgNode);
			imgNode.onLoadEnd = function() {
				that.bbox.addPhysicsToNode(imgNode, SGJSBox2dWebType.BOX, false);
			};
			imgNode.isDraggable = true;*/

			//add button
			/*var buttonNormal = new CGSGNodeButton(10, 140, "Stop Animation");
			buttonNormal.onClick = function(e) {
				that.bbox.toggle(this);
				buttonNormal.setTexts(that.bbox._isRunning ? "Stop Animation" : "Start Animation");
			};
			this.rootNode.addChild(buttonNormal);
			this.bbox.addPhysics(buttonNormal, SGJSBox2dWebType.BOX, false);*/

			//add circle
			var circle = new CGSGNodeCircle(100, 0, 40);
			circle.bkgcolors[0] = "blue";
			circle.bkgcolors[1] = "red";
			circle.isResizable = true;
			circle.isDraggable = true;
			this.rootNode.addChild(circle);
			this.bbox.addPhysics(circle, SGJSBox2dWebType.CIRCLE, false);
			CGSG.eventManager.bindHandler(circle, cgsgEventTypes.ON_CLICK_START, function(e){that.bbox.removePhysics(circle)} );

			var box = new CGSGNodeImage(200, 30, "images/box.jpeg");
			box.onLoadEnd = function() {
				that.rootNode.addChild(box);
				that.bbox.addPhysics(box, SGJSBox2dWebType.BOX, false);
			};


			this.rootNode.addChild(this.bbox.createBox(200, 30, 60, 60, false));
			this.rootNode.addChild(this.bbox.createBox(150, 250, 180, 10, true));
			this.rootNode.addChild(this.bbox.createCircle(300, 130, 40, false));

			this.bbox.start(this);
		}

	}
);
