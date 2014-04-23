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
 * button example
 * */
var CGMain = CGSGView.extend(
        {
            initialize: function (canvas) {

                this._super(canvas);

                ////// INITIALIZATION /////////

                this.initializeCanvas();

                this.createScene();

                this.startPlaying();
            },

            initializeCanvas: function () {
                //resize the canvas to fulfill the viewport
                this.viewDimension = cgsgGetRealViewportDimension();
                this.setCanvasDimension(this.viewDimension);
            },

            /**
             *
             *
             */
            createScene: function () {
                //create a root node to the graph, with arbitrary position and size
                var rootNode = new CGSGNode(0, 0);
                CGSG.sceneGraph.addNode(rootNode, null);

                //handler method on click
                var bindClickHandler = this.clickHandler.bind(this);

                //X, Y, WIDTH, HEIGHT
                var buttonNormal = new CGSGNodeButton(10, 60, "Normal");
                buttonNormal.name = "Normal Button";
                buttonNormal.onClick = bindClickHandler;
                rootNode.addChild(buttonNormal, null);

                var buttonDeactivated = new CGSGNodeButton(110, 60, "Deactivated");
                buttonDeactivated.setMode(CGSGButtonMode.DEACTIVATED);
                buttonDeactivated.onClick = bindClickHandler;
                rootNode.addChild(buttonDeactivated, null);

                var buttonLittle = new CGSGNodeButton(250, 70, "Tiny");
                buttonLittle.name = "Tiny Button";
				buttonLittle.setClass("tiny");
				buttonLittle.setTextClass("tiny");
                buttonLittle.onClick = bindClickHandler;
                rootNode.addChild(buttonLittle, null);


                var buttonCustom = new CGSGNodeButton(310, 50, "Custom\nbutton");
				buttonCustom.setTextClasses(["custom-normal", "custom-over", "custom-deactivated", "custom-selected"]);
				buttonCustom.setClasses(["custom-normal", "custom-over", "custom-deactivated", "custom-selected"]);
				//this will also work:
                /*buttonCustom.setClassFor("custom-normal", CGSGButtonMode.NORMAL);
                buttonCustom.setClassFor("custom-over", CGSGButtonMode.OVER);
                buttonCustom.setClassFor("custom-deactivated", CGSGButtonMode.DEACTIVATED);
                buttonCustom.setClassFor("custom-selected", CGSGButtonMode.SELECTED);*/
                rootNode.addChild(buttonCustom, null);
                buttonCustom.name = "Custom Button";
                buttonCustom.onClick = bindClickHandler;

                var buttonPictoTop = new CGSGNodeButton(10, 140, "Picto @ TOP");
                buttonPictoTop.setPictoPosition(CGSGPositionMode.TOP);
                buttonPictoTop.setImageURL("/cgsg/v2/examples/shared/images/alert.png");
                rootNode.addChild(buttonPictoTop, null);
                buttonPictoTop.name = "picto top Button";
                buttonPictoTop.onClick = bindClickHandler;

                var buttonPictoLeft = new CGSGNodeButton(140, 120, "Picto @ LEFT");
                buttonPictoLeft.setPictoPosition(CGSGPositionMode.LEFT);
                buttonPictoLeft.setImageURL("/cgsg/v2/examples/shared/images/error.png");
                rootNode.addChild(buttonPictoLeft, null);
                buttonPictoLeft.name = "picto left Button";
                buttonPictoLeft.onClick = bindClickHandler;

                var buttonPictoRight = new CGSGNodeButton(137, 180, "Picto @ RIGHT");
                buttonPictoRight.setPictoPosition(CGSGPositionMode.RIGHT);
                buttonPictoRight.setImageURL("/cgsg/v2/examples/shared/images/error.png");
                rootNode.addChild(buttonPictoRight, null);
                buttonPictoRight.name = "picto right Button";
                buttonPictoRight.onClick = bindClickHandler;

                var buttonPictoBottom = new CGSGNodeButton(325, 140, "Picto @ BOTTOM");
                buttonPictoBottom.setPictoPosition(CGSGPositionMode.BOTTOM);
                buttonPictoBottom.setImageURL("/cgsg/v2/examples/shared/images/alert.png");
                rootNode.addChild(buttonPictoBottom, null);
                buttonPictoBottom.name = "picto bottom Button";
                buttonPictoBottom.onClick = bindClickHandler;

                this.img = new Image();
                this.img.onload = this.onImageLoaded.bind(this);
                this.img.src = "/cgsg/v2/examples/shared/images/exclamation.png";
                this.buttonSpritesheet = new CGSGNodeButton(50, 240, "Pictos in \nspritesheet");
                this.buttonSpritesheet.setSlices([
                    new CGSGRegion(0, 0, 32, 32),
                    new CGSGRegion(32, 0, 32, 32),
                    new CGSGRegion(64, 0, 32, 32),
					new CGSGRegion(64, 0, 32, 32)]);
                this.buttonSpritesheet.isDraggable = true;
                rootNode.addChild(this.buttonSpritesheet, null);
                this.buttonSpritesheet.name = "Spritesheet Button";
                this.buttonSpritesheet.onClick = bindClickHandler;

				this.buttonSpritesheetCSS = new CGSGNodeButton(250, 240, "Pictos in \nspritesheet via CSS");
				this.buttonSpritesheetCSS.setSlices([
													 new CGSGRegion(0, 0, 32, 32),
													 new CGSGRegion(32, 0, 32, 32),
													 new CGSGRegion(64, 0, 32, 32),
													 new CGSGRegion(64, 0, 32, 32)]);
				this.buttonSpritesheetCSS.addClass("spritesheet");
				this.buttonSpritesheetCSS.isDraggable = true;
				rootNode.addChild(this.buttonSpritesheetCSS, null);
				this.buttonSpritesheetCSS.name = "Spritesheet CSS Button";
				this.buttonSpritesheetCSS.onClick = bindClickHandler;

                //just a title text
                this.txtNode = new CGSGNodeText(10, 10, "Button examples.");
                rootNode.addChild(this.txtNode);
            },

            clickHandler: function (event) {
                this.txtNode.setText("Button examples. Click on : " + event.data.node.name);
            },

            onImageLoaded: function () {
                this.buttonSpritesheet.setImage(this.img);
				this.buttonSpritesheet.forceRedraw();
				this.buttonSpritesheet.invalidate();
            }
        }
    )
    ;