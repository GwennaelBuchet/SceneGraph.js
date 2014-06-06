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
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 * @date 10/08/2012
 *
 * Purpose :
 * Template project
 * */

var CGMain = CGSGView.extend(
    {
        initialize: function (canvas) {

            this._super(canvas);

            this.createScene();

            this.startPlaying();
        },

        /**
         * Initialize the nodes of the scene
         */
        createScene: function () {
            this.rootNode = new CGSGNode(0, 0);
            CGSG.sceneGraph.addNode(this.rootNode, null);

			//instanciate and add our sky node
			var skyNode = new SkyNode();
			this.rootNode.addChild(skyNode);

			//create the floor node.
			//We want it at the bottom of the scene
            this.floorNode = new CGSGNodeImage(0, CGSG.canvas.height - 99, "img/floor.png");
			this.rootNode.addChild(this.floorNode);

			//animate the floor on its X axis
			//params are : node, attribute, duration, from, to, delay
			CGSG.animationManager.animate(this.floorNode, "position.x", 2000, 0, -2000, 0);

			//sprite for Marxzel.
			//We'll add animation later, when spritesheet will be loaded
			//In a real game, we'll probably create a class specifically for each character,
			// with their own event methods
			this.marxzel = new CGSGNodeSprite(CGSG.canvas.width / 2 - 16, CGSG.canvas.height - 64, null);
			this.rootNode.addChild(this.marxzel);

			//sprite for the sheep, and add it to the floor, so it will be translated each frame too
			this.sheep = new CGSGNodeSprite(570, 50, null);
			this.floorNode.addChild(this.sheep);
			this.sheep.isDraggable = true;
			this.sheep.selectionLineColor = "#B5DCFF";
			this.sheep.onMouseEnter = function(event) {
				event.data.node.play("cry");
			};
			this.sheep.onMouseOut = function(event) {
				event.data.node.play("sleep");
				var node = event.data.node;
				CGSG.animationManager.animate(node, "position.y", 30, node.position.y, 50, 0);
			};

			//load the spritesheet file with a JavaScript Image object
			this.imgBoard = new Image();
			//when image is loaded, call the method to set it to the sprites
			this.imgBoard.onload = this.onLoadImgBoard.bind(this);
			//start loading the image
			this.imgBoard.src = "img/board.png";
        },

		/**
		 * Fired when spritesheet file is loaded.
		 * Set the spritesheet file to the sprites and add animations.
		 * @method onLoadImgBoard
		 */
		onLoadImgBoard: function () {
			this.marxzel.setImage(this.imgBoard);
			/*
			 * Add an animation.
			 * This is where we need to know the position of the frames inside the spritesheet
			 *
			 * @param name {String} Name for this animation
			 * @param speed {Number} Number of frames between 2 steps
			 * @param frames {Number} Number of frame for this animation
			 * @param sliceX {Number} slice position inside the image for this animation
			 * @param sliceY {Number} slice position inside the image for this animation
			 * @param width {Number} width of 1 frame
			 * @param height {Number} height of 1 frame
			 * @param framesPerLine {Number} Number of frames per line in the image
			 */
			this.marxzel.addAnimation("run", 7, 3, 0, 0, 32, 32, 1);
			//then play this animation
			this.marxzel.play("run");

			//add animations for the sheep
			this.sheep.setImage(this.imgBoard);
			this.sheep.addAnimation("sleep", 5, 2, 64, 0, 32, 16, 1);
			this.sheep.addAnimation("cry", 5, 2, 64, 16, 32, 16, 1);
			this.sheep.play("sleep");

		}
    }
);
