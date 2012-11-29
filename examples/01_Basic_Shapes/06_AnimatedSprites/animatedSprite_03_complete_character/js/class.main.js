/**
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
 *
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 * @date 10/08/2012
 *
 * Purpose :
 * animated sprite example
 * */
var CGMain = CGSGScene.extend(
    {
        initialize:function (canvas) {
            this._super(canvas);

            ////// INITIALIZATION /////////

            this.initializeCanvas();
            this.createScene();

            //keyboard events handler
            var scope = this;
            document.onkeydown = this.onKeyDown.bind(this);
            document.onkeyup = this.onKeyUp.bind(this);

            this.startPlaying();
        },

        initializeCanvas:function () {
            //redimensionnement du canvas pour être full viewport en largeur
            this.viewDimension = cgsgGetRealViewportDimension();
            this.setCanvasDimension(this.viewDimension);
        },

        /**
         * Create a complete character with several animations in the same sprite sheet (ie the same image)
         */
        createScene:function () {

            //create a first root node.
            //that's not mandatory, we could use the first sphere as the root node
            this.rootNode = new CGSGNode(0, 0, 1, 1);
            this.sceneGraph.addNode(this.rootNode, null);


            this.imgNode = new CGSGNodeImage(
                0, //x
                0, //y
                "images/board.png");      //URL. Warning : the web page mus be on a web server (apache, ...)

            //add some attributes
            this.imgNode.isResizable = true;
            this.imgNode.isDraggable = true;

            this.rootNode.addChild(this.imgNode);

            this.imgNode.setSlice(0, 0, 476, 635, true);

            this.listAnimations = ["front", "left", "back", "right"];

            /*
             * @param x
             * @param y
             * @param image url
             * @param context
             */
            this.pingoo = new CGSGNodeSprite(68, 68, "images/board.png", this.context);
            this.pingoo.isDraggable = true;
            //name, speed, frames, sliceX, sliceY, width, height, framesPerLine
            this.pingoo.addAnimation("front", 6, 4, 476, 0, 34, 34, 4);
            this.pingoo.addAnimation("back", 6, 4, 476, 35, 34, 34, 4);
            this.pingoo.addAnimation("left", 6, 4, 476, 69, 34, 34, 4);
            this.pingoo.addAnimation("right", 6, 4, 476, 102, 34, 34, 4);
            this.pingoo.play("front", null);

            this.rootNode.addChild(this.pingoo);

            this.currentAnimation = 0;

            //add a text node ("click me") with a onClick event
            this.buttonNode = new CGSGNodeButton(10, 20, "Switch Animation");
            this.buttonNode.onClick = this.switchAnimation.bind(this);
            //add the textNode as child of the root
            //this.rootNode.addChild(this.buttonNode);

            this.changeTextAnimation();
        },

        switchAnimation:function () {
            this.currentAnimation = (this.currentAnimation + 1) % this.listAnimations.length;
            this.pingoo.play(this.listAnimations[this.currentAnimation], null);

            this.changeTextAnimation();
        },

        /**
         * change the text of the button
         */
        changeTextAnimation:function () {
            this.buttonNode.setTexts("Switch Animation.\n(current = " + this.listAnimations[this.currentAnimation] + ")");
        },

        /**
         * @method onKeyDown
         * @param event
         * @return {*}
         */
        onKeyDown:function (event) {
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

            this.sceneGraph.animate(this.pingoo, "position.y", 24, this.pingoo.position.y, this.pingoo.position.y + y, "linear", 0, true);
            this.sceneGraph.animate(this.pingoo, "position.x", 24, this.pingoo.position.x, this.pingoo.position.x + x, "linear", 0, true);
        },

        /**
         * @method onKeyUp
         * @param event
         * @return {*}
         */
        onKeyUp:function (event) {
            //this.sceneGraph.animate(this.pingoo, "position.y", 16, this.pingoo.position.y, this.pingoo.position.y - 34, "linear", 0, true);
        }
    }
);
