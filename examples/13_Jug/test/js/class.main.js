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
 * Template project
 * */

//global speed
var speed = -0.7;

var CGMain = CGSGView.extend(
    {
        initialize: function (canvas) {

            this._super(canvas);

            this.createScene();

            var scope = this;
            document.onkeydown = function (event) {
                scope.onKeyDown(event);
            };
            document.onkeyup = function (event) {
                scope.onKeyUp(event);
            };

            this.startPlaying();
        },

        /**
         * Just create a single node (a square node)
         *
         */
        createScene: function () {
            this.rootNode = new CGSGNode(0, 0);
            CGSG.sceneGraph.addNode(this.rootNode, null);

            var skyNode = new SkyNode();
            this.rootNode.addChild(skyNode);

            this.floorNode = new FloorNode("img/floor.png");
            this.rootNode.addChild(this.floorNode);

            this.scene = new CGSGNode(0, 0);
            this.rootNode.addChild(this.scene);

            this.marxzel = new CGSGNodeSprite(CGSG.canvas.width / 2 - 16, CGSG.canvas.height - 64, null);
            this.scene.addChild(this.marxzel);
            this.marxzel.addAnimation("run", 5, 3, 0, 0, 32, 32, 1);
            this.marxzel.addAnimation("jump", 5, 1, 0, 96, 32, 32, 1);
            this.marxzel.isDraggable = true;
            this.marxzel.isCollisionManaged = true;

            this.obstacles = [];

            this.onRenderEnd = this.onRenderEndHandler.bind(this);

            //load the global image
            this.imgBoard = new Image();
            this.imgBoard.onload = this.onLoadImgBoard.bind(this);
            this.imgBoard.src = "img/board.png";
        },

        onRenderEndHandler: function () {
            this.slideAll();
            this.detectCollision();
        },

        detectCollision: function () {
            if (this.marxzel.isCollidingABrother(0)) {
                this.marxzel.translateWith(speed, 0);
                if (this.marxzel.position.x < 0) {
                    var txtLost = new CGSGNodeText(0, 0, "You Loose");
                    this.rootNode.addChild(txtLost);
                    speed = 0;
                }
            }
        },

        slideAll: function () {
            cgsgIterate(this.obstacles, function (i, item) {
                item.translateWith(speed, 0);
            });
            this.floorNode.translateWith(speed, 0);

            if (this.isJumping === true) {
                this.marxzel.translateWith(0, -0.7);
            }
        },

        onLoadImgBoard: function () {
            this.marxzel.setImage(this.imgBoard);
            this.marxzel.play("run");

            var that = this;
            cgsgIterate(obstaclesDef, function (i, item) {
                var node = new CGSGNodeSprite(item.x, item.y, null);
                node.setImage(that.imgBoard);
                node.isCollisionManaged = true;
                node.addAnimation("quiet", 5, 2, item.sprite.sx, item.sprite.sy, item.sprite.w, item.sprite.h, 1);
                node.addAnimation("worried", 5, 2, item.sprite.sx, item.sprite.sy + item.sprite.h * 2, item.sprite.w, item.sprite.h, 1);
                node.play("quiet");
                that.obstacles.push(node);
                that.scene.addChild(node);
            });

        },

        onKeyDown: function (event) {

        },

        onKeyUp: function (event) {
            if (this.isJumping !== true) {

                this.isJumping = true;
                this.marxzel.play("jump", 1);
                //var timeline = CGSG.animationManager.animate(this.marxzel, "position.y", 70, this.marxzel.position.y, this.marxzel.position.y - 46, 0, false);

                //timeline.onAnimationEnd = this.endJump.bind(this);
            }
        },

        endJump : function() {
            var timeline = CGSG.animationManager.animate(this.marxzel, "position.y", 70, this.marxzel.position.y, CGSG.canvas.height - 64, 0, false);
            var that = this;

            timeline.onAnimationEnd = function() {  that.marxzel.play("run"); that.isJumping = false; };
        }

    }
);
