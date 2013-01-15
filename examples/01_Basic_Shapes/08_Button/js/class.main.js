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
 * button example
 * */
var CGMain = CGSGScene.extend(
    {
        initialize:function (canvas) {

            this._super(canvas);

            ////// INITIALIZATION /////////

            this.initializeCanvas();

            this.createScene();

            this.startPlaying();
        },

        initializeCanvas:function () {
            //resize the canvas to fulfill the viewport
            this.viewDimension = cgsgGetRealViewportDimension();
            this.setCanvasDimension(this.viewDimension);
        },

        /**
         *
         *
         */
        createScene:function () {

            //create a root node to the graph, with arbitrary position and size
            var rootNode = new CGSGNode(0, 0, 0, 0);
            this.sceneGraph.addNode(rootNode, null);

            //X, Y, WIDTH, HEIGHT
            var buttonNormal = new CGSGNodeButton(10, 10, "Normal");
            buttonNormal.name = "Normal Button";
            buttonNormal.onClick = function (event) {
                alert(event.node.name);
            };
            rootNode.addChild(buttonNormal, null);

            var buttonDeactivated = new CGSGNodeButton(110, 10, "Deactivated");
            buttonDeactivated.setMode(CGSGButtonMode.DEACTIVATED);
            buttonDeactivated.onClick = function (event) {
                alert("click on button : " + event.node.getTexts()[0]);
            };
            rootNode.addChild(buttonDeactivated, null);

            var buttonLittle = new CGSGNodeButton(35, 80, "Tiny");
            buttonLittle.onClick = function (event) {
                alert("click on button : " + event.node.getTexts()[0]);
            };
            buttonLittle.setVerticalPadding(2);
            buttonLittle.setHorizontalPadding(4);
            //3 radius : normal, over, deactivated
            buttonLittle.setRadiuses([5, 5, 5]);
            //3 sizes : normal, over, deactivated
            buttonLittle.setTextSizes([8, 8, 8]);
            rootNode.addChild(buttonLittle, null);


            var buttonCustom = new CGSGNodeButton(110, 60, "Custom\nbutton");
            //3 colors : normal, over, deactivated
            buttonCustom.setFirstColors(["#FFADAD", "#D89393", "#F9DBDB"]);
            buttonCustom.setLastColors(["#FF8E8E", "#D37676", "#D8BEBE"]);
            buttonCustom.setTextColors(["green", "#8EA7FF", "gray"]);
            buttonCustom.setRadiuses([0, 20, 10]);
            rootNode.addChild(buttonCustom, null);

            var buttonPictoTop = new CGSGNodeButton(10, 140, "Picto @ TOP");
            buttonPictoTop.setPictoPosition(CGSGPositionMode.TOP);
            buttonPictoTop.setImageURL("images/alert.png");
            rootNode.addChild(buttonPictoTop, null);

            var buttonPictoLeft = new CGSGNodeButton(140, 120, "Picto @ LEFT");
            buttonPictoLeft.setPictoPosition(CGSGPositionMode.LEFT);
            buttonPictoLeft.setImageURL("images/error.png");
            rootNode.addChild(buttonPictoLeft, null);
            var buttonPictoRight = new CGSGNodeButton(137, 180, "Picto @ RIGHT");
            buttonPictoRight.setPictoPosition(CGSGPositionMode.RIGHT);
            buttonPictoRight.setImageURL("images/error.png");
            rootNode.addChild(buttonPictoRight, null);
            var buttonPictoBottom = new CGSGNodeButton(325, 140, "Picto @ BOTTOM");
            buttonPictoBottom.setPictoPosition(CGSGPositionMode.BOTTOM);
            buttonPictoBottom.setImageURL("images/alert.png");
            rootNode.addChild(buttonPictoBottom, null);

            this.img = new Image();
            this.img.onload = this.onImageLoaded.bind(this);
            this.img.src = "images/board.png";
            this.buttonSpritesheet = new CGSGNodeButton(150, 240, "Pictos in \nspritesheet");
            this.buttonSpritesheet.setSlices([
                new CGSGRegion(0, 0, 32, 32),
                new CGSGRegion(32, 0, 32, 32),
                new CGSGRegion(64, 0, 32, 32)]);
            this.buttonSpritesheet.isDraggable = true;
            rootNode.addChild(this.buttonSpritesheet, null);

            var buttonOver = new CGSGNodeButton(10, 310, "Big & initially Overed");
            //3 text : normal, over, deactivated
            buttonOver.setTexts(["Still BIG but mouse out", "Big & initially Overed", "Big and deactivated"]);
            buttonOver.setTextSizes([24, 28, 24]);
            buttonOver.setMode(CGSGButtonMode.OVER);
            buttonOver.setVerticalPadding(42);
            buttonOver.setHorizontalPadding(42);
            rootNode.addChild(buttonOver, null);
        },

        onImageLoaded:function () {
            this.buttonSpritesheet.setImage(this.img);
        }
    }
);