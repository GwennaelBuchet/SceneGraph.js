/**
 * Copyright (c) 2013  Capgemini Technology Services (hereinafter “Capgemini”)
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
 *
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 * @date 10/08/2012
 *
 * Purpose :
 * traverser example
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
			//redimensionnement du canvas pour être full viewport en largeur
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},

		/**
		 * create a random scene with some nodes
		 *
		 */
		createScene : function() {
			//create and add a root node to the scene, with arbitrary dimension
			this.rootNode = new CGSGNode(0, 0);
			CGSG.sceneGraph.addNode(this.rootNode, null);

            var w = 350;
            var h = 350;

            var parentNode = new CGSGNodeSquare(10, 120, 40, 40);
            parentNode.color = "yellow";
            parentNode.isDraggable = true;
            this.rootNode.addChild(parentNode);

            var squareNode = new CGSGNodeSquare(50, CGSG.canvas.height / 3, w, h);
            squareNode.color = "red";
            squareNode.isResizable = true;
            squareNode.isDraggable = true;

            var squareChildBlue = new CGSGNodeSquare(100, 20, w, h / 2);
            squareChildBlue.color = "blue";
            squareNode.addChild(squareChildBlue);

            var squareChildBlack = new CGSGNodeSquare(-20, 50, w / 2, h / 3);
            squareChildBlack.color = "black";
            squareNode.addChild(squareChildBlack);

            var clip = new CGSGMaskClip(new CGSGRegion(10, 10, 200, 200));
            var img = new CGSGNodeImage(CGSG.canvas.width / 3, CGSG.canvas.height / 6, "images/cat-and-rabbit.jpg");
            img.scaleTo(0.5, 0.5);
            img.isResizable = true;
            img.isDraggable = true;


            this.rootNode.addChild(img);
            parentNode.addChild(squareNode);

            squareNode.scaleTo(0.5, 0.5);

            clip.apply(img);
            clip.apply(squareNode);

            var apply = true;
            var btn = new CGSGNodeButton(5, 5, 'Apply / Remove mask');
            btn.onClick = function() {
                if (apply = !apply) {
                    clip.apply(img);
                    clip.apply(squareNode);
                } else {
                    clip.remove(img);
                    clip.remove(squareNode);
                }
            };

            this.rootNode.addChild(btn);
		}
	}
);
