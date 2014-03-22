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
 * animated sprite example
 * */
var CGMain = CGSGView.extend(
    {
        initialize: function (canvas) {
            this._super(canvas);

            ////// INITIALIZATION /////////

            this.createScene();

            CGSG.performanceKeys.setCollisionMethod(CGSGCollisionMethod.GHOSTONDEMAND);

            //keyboard events handler
            document.onkeydown = this.onKeyDown.bind(this);
            document.onkeyup = this.onKeyUp.bind(this);

            this.startPlaying();
        },


        /**
         * Create a complete character with several animations in the same sprite sheet (ie the same image)
         */
        createScene: function () {
            //create a first root node.
            //that's not mandatory, we could use the first sphere as the root node
            this.rootNode = new CGSGNode(0, 0);
            CGSG.sceneGraph.addNode(this.rootNode, null);

            this.backgroundNode = new CGSGNodeImage(0, 0, null);
            this.rootNode.addChild(this.backgroundNode);
            this.backgroundNode.setSlice(0, 0, 476, 635, true);

            /*
             * @param x
             * @param y
             * @param image url
             * @param context
             */
            this.pingoo = new CGSGNodeSprite(68, 68, null);
            this.pingoo.isDraggable = true;
            //name, speed, frames, sliceX, sliceY, width, height, framesPerLine
            this.pingoo.addAnimation("front", 6, 4, 476, 0, 34, 34, 4);
            this.pingoo.addAnimation("back", 6, 4, 476, 35, 34, 34, 4);
            this.pingoo.addAnimation("left", 6, 4, 476, 69, 34, 34, 4);
            this.pingoo.addAnimation("right", 6, 4, 476, 102, 34, 34, 4);
            this.pingoo.play("front", null);
            this.pingoo.isCollisionManaged = true;

            this.rootNode.addChild(this.pingoo);

            this.listAnimations = ["front", "left", "back", "right"];
            this.currentAnimation = 0;

            this.img = new Image();
            this.img.onload = this.onImageLoaded.bind(this);
            this.img.src = "img/board.png";
        },

        addSnowMen: function () {
            var x, y;
            for (var i = 0; i < 20; i++) {
                x = 34 + CGSGMath.fixedPoint(Math.random() * 11) * 34;
                y = 34 + CGSGMath.fixedPoint(Math.random() * 11) * 34;

                var s = new CGSGNodeImage(x, y, null);
                s.setSlice(612, 34, 34, 34, true);
                s.setImage(this.img);
                s.isCollisionManaged = true;
                this.rootNode.addChild(s);
            }
        },

        onImageLoaded: function () {
            this.backgroundNode.setImage(this.img);
            this.pingoo.setImage(this.img);

            this.addSnowMen();

            this.igloo = new CGSGNodeImage(376, 544, null);
            this.igloo.setImage(this.img);
            this.igloo.setSlice(476, 476, 102, 68, true);
            this.igloo.isCollisionManaged = true;
            this.rootNode.addChild(this.igloo);
        },

        /**
         * @method onKeyDown
         * @param event
         * @return {*}
         */
        onKeyDown: function (event) {
            var y = 0;
            var x = 0;

            var keynum = (window.event) ? event.keyCode : event.which;

            switch (keynum) {
                case 37: //left
                    x = -34;
                    this.pingoo.play("left", null);
                    break;
                case 38: //up
                    this.pingoo.play("back", null);
                    y = -34;
                    break;
                case 39: //right
                    this.pingoo.play("right", null);
                    x = 34;
                    break;
                case 40: //down
                    this.pingoo.play("front", null);
                    y = 34;
                    break;
            }

            var currentX = this.pingoo.position.x;
            var currentY = this.pingoo.position.y;

            this.pingoo.translateWith(x, y, true);
            if (this.pingoo.isColliding(this.igloo)) {
                var txt = new CGSGNodeText(140, 238, "YOU WIN !");
                txt.setSize(32, true);
                this.rootNode.addChild(txt);
            }
            else if (this.pingoo.isCollidingABrother(0)) {
                this.pingoo.translateWith(-x, -y);
            }
            else {
                CGSG.animationManager.animate(this.pingoo, "position.x", 24, currentX, currentX + x, 0, true);
                CGSG.animationManager.animate(this.pingoo, "position.y", 24, currentY, currentY + y, 0, true);
            }
        },

        /**
         * @method onKeyUp
         * @param event
         * @return {*}
         */
        onKeyUp: function (event) {
            //CGSG.animationManager.animate(this.pingoo, "position.y", 16, this.pingoo.position.y, this.pingoo.position.y - 34, 0, true);
        }
    }
);
