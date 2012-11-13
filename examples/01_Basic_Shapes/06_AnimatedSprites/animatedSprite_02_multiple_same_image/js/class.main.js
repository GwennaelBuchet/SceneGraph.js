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
 * Animated sprite example
 * */
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
		 * Create 3 times the same animated sprites, sharing the same image in memory
		 */
		createScene : function () {

			//create a first root node.
			//that's not mandatory, we could use the first sphere as the root node
			this.rootNode = new CGSGNode(0, 0, 1, 1);
			this.sceneGraph.addNode(this.rootNode, null);

			//then create 2 sprites with the same image : a turning sphere
			//in a second time we will actually load the image and set it to the animated sprites
			// so the image is created just once in memory

            /*
             * @param x
             * @param y
             * @param image url
             * @param context
             */
            this.pingoo = new CGSGNodeSprite(60, 60, null, this.context);
            this.pingoo.isDraggable = true;
            //name, speed, frames, sliceX, sliceY, width, height, framesPerLine
            this.pingoo.addAnimation("front", 6, 4, 476, 0, 34, 34, 4);
            this.pingoo.play("front", null);
            this.rootNode.addChild(this.pingoo);

            this.numbers = new CGSGNodeSprite(60, 120, null, this.context);
            this.numbers.isDraggable = true;
            //name, speed, frames, sliceX, sliceY, width, height, framesPerLine
            this.numbers.addAnimation("count", 20, 8, 476, 136, 34, 34, 4);
            this.numbers.play("count", null);
            this.rootNode.addChild(this.numbers);

            this.water = new CGSGNodeSprite(60, 180, null, this.context);
            this.water.isDraggable = true;
            //name, speed, frames, sliceX, sliceY, width, height, framesPerLine
            this.water.addAnimation("wave", 2, 32, 476, 204, 34, 34, 4);
            this.water.play("wave", null);
            this.rootNode.addChild(this.water);


			//now, load the image containing the sprite sheet.
			//The affectation to the sprite will be done in the loaded handler function
			this.spriteSheet = new Image();
			this.spriteSheet.onload = this.onImageLoaded();
			this.spriteSheet.src = "images/board.png";
		},

		/**
		 * once the image is loaded, set it to the sprites
		 */
		onImageLoaded : function () {
			this.pingoo.setImage(this.spriteSheet);
			this.numbers.setImage(this.spriteSheet);
            this.water.setImage(this.spriteSheet);
		}
	}
);
