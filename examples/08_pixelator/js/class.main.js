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

//number of horizontal squares
var NB_HORIZONTAL_SLIDE = 70;
//number of vertical squares
var NB_VERTICAL_SLIDE = 70;
//total width of the generated wall of squares
var TOTAL_WIDTH = 200;
//width of a square
var SQ_WIDTH = CGSGMath.fixedPoint(TOTAL_WIDTH / NB_HORIZONTAL_SLIDE);
//height of a square
var SQ_HEIGHT = NaN; //if NaN, value will be computed to keep the ratio of the original image

//position of the wall of squares
var startX = 70, startY = 60;


var CGMain = CGSGView.extend(
    {
        initialize:function (canvas) {
            this._super(canvas);

            //this.initializeCanvas();
            this.createScene();

            this.startPlaying();
        },

        initializeCanvas:function () {
            this.viewDimension = cgsgGetRealViewportDimension();
			this.viewDimension.height -= 80;
            this.setCanvasDimension(this.viewDimension);
        },

        createScene:function () {
            this.rootNode = new CGSGNode(0, 0);
            CGSG.sceneGraph.addNode(this.rootNode, null);

            this.listSquares = [];

            this.buttonRelease = new CGSGNodeButton(10, 10, "Release them all ("+ (NB_HORIZONTAL_SLIDE * NB_VERTICAL_SLIDE) + " nodes) !");
            this.rootNode.addChild(this.buttonRelease);
            this.buttonRelease.setMode(CGSGButtonMode.DEACTIVATED);
            this.buttonRelease.onClick = this.explode.bind(this);

            this.buttonReload = new CGSGNodeButton(270, 10, "Reload");
            this.rootNode.addChild(this.buttonReload);
            this.buttonReload.onClick = function (event) {
                document.location.reload(true);
            };


            //load the image to
            this.img = new Image();
            this.img.onload = this.onImageLoaded.bind(this);
            this.img.src = "/SceneGraph.js/examples/shared/images/bear.png";
        },

        explode:function () {
            this.buttonRelease.setMode(CGSGButtonMode.DEACTIVATED);
            var i, len, sq, r, w2 = NB_VERTICAL_SLIDE / 2, delay;
            var floor = startY + SQ_WIDTH * NB_VERTICAL_SLIDE * 1.5;
            for (i = 0, len = this.listSquares.length; i < len; i++) {
                sq = this.listSquares[i];

                //pseudo-random distance between the horizontal center of the image and the current square
                r = 1 - (Math.abs((1 - Math.random() * 0.2) * sq.x - w2) / w2);

                //random delay before launching animation, from bottom of the image to top
                delay = (NB_VERTICAL_SLIDE - sq.y) * (1 + Math.random()*2);

                //add an animation on y position
                CGSG.animationManager.animate(sq.sq, "position.y", 5 + Math.random() * 5,
                    sq.sq.position.y,
                    floor - Math.random() * r * 20,
                    delay,
                    true);

                //add an animation on rotation angle
                CGSG.animationManager.animate(sq.sq, "rotation.angle", 5 + Math.random() * 5,
                    0,
                    200 + Math.random() * 360,
                    delay,
                    true);
            }
        },

        /**
         * Fired when the image loading is complete.
         */
        onImageLoaded:function () {
            var x, y, sq, imageData, currentPixel;
            var timeline;

            var w = this.img.width / NB_HORIZONTAL_SLIDE;
            var h = this.img.height / NB_VERTICAL_SLIDE;
            if (isNaN(SQ_HEIGHT))
                SQ_HEIGHT = CGSGMath.fixedPoint((h / w) * SQ_WIDTH);

            //create reduced image in a temporary context
            this._scaledCanvas = document.createElement('canvas');
            this._scaledCanvas.width = NB_HORIZONTAL_SLIDE;
            this._scaledCanvas.height = NB_VERTICAL_SLIDE;
            var scaledContext = this._scaledCanvas.getContext('2d');
            scaledContext.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, NB_HORIZONTAL_SLIDE, NB_VERTICAL_SLIDE);

            //get reduced image data
            imageData = scaledContext.getImageData(0, 0, NB_HORIZONTAL_SLIDE, NB_VERTICAL_SLIDE);

            //loop over reduced image date and create squares
            for (x = 0; x < NB_HORIZONTAL_SLIDE; x++) {
                for (y = 0; y < NB_VERTICAL_SLIDE; y++) {
                    //current pixel  in the image (ie : current texel)
                    currentPixel = (y * NB_HORIZONTAL_SLIDE + x) * 4; // 4 because 4 values per pixel : RGBA

                    //create a square per pixel, only if it's visible (alpha > 0)
                    if (imageData.data[currentPixel + 3] > 0) {
                        //create square
                        sq = new CGSGNodeSquare(startX + x * SQ_WIDTH, startY + y * SQ_HEIGHT, SQ_WIDTH, SQ_HEIGHT);
                        //get color in hex format
                        sq.bkgcolors = [CGSGColor.rgb2hex(
                            imageData.data[currentPixel + 0],
                            imageData.data[currentPixel + 1],
                            imageData.data[currentPixel + 2]
                        )];
                        sq.globalAlpha = imageData.data[currentPixel + 3] / 255;
						sq.lineWidth = 0;
                        //optimize performance
                        sq.needToKeepAbsoluteMatrix = false;
                        sq.isTraversable = false;
                        sq.isClickable = false;
						//sq.setPrecomputed(true);

                        this.listSquares.push({sq:sq, x:x, y:y});

                        //add square to root node
                        this.rootNode.addChild(sq);
                    }
                }
            }

            this.buttonRelease.setMode(CGSGButtonMode.NORMAL);
        }

    }
);
