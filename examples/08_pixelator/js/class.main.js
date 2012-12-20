/*
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
 */

//number of horizontal squares
var NB_HORIZONTAL_SLIDE = 40;
//number of vertical squares
var NB_VERTICAL_SLIDE = 40;
//width of a square
var SQ_WIDTH = 5;
//height of a square
var SQ_HEIGHT = NaN; //if NaN, value will be computed to keep the ratio of the original image

//position of the wall of squares
var startX = 10, startY = 100;


var CGMain = CGSGScene.extend(
    {
        initialize:function (canvas) {
            this._super(canvas);

            this.initializeCanvas();
            this.createScene();

            this.startPlaying();
        },

        initializeCanvas:function () {
            this.viewDimension = cgsgGetRealViewportDimension();
            this.setCanvasDimension(this.viewDimension);
        },

        createScene:function () {
            this.rootNode = new CGSGNode(0, 0, 0, 0);
            this.sceneGraph.addNode(this.rootNode, null);

            this.listSquares = [];

            this.buttonRelease = new CGSGNodeButton(10, 10, "Release them !");
            this.rootNode.addChild(this.buttonRelease);
            this.buttonRelease.setMode(CGSGButtonMode.DEACTIVATED);
            this.buttonRelease.onClick = this.explode.bind(this);

            this.buttonReload = new CGSGNodeButton(170, 10, "Reload");
            this.rootNode.addChild(this.buttonReload);
            this.buttonReload.onClick = function(event) { document.location.reload(true); };


            //load the image to
            this.img = new Image();
            this.img.onload = this.onImageLoaded.bind(this);
            this.img.src = "images/bear.png";
        },

        explode:function () {
            this.buttonRelease.setMode(CGSGButtonMode.DEACTIVATED);
            var sq, r, w2 = NB_VERTICAL_SLIDE / 2;
            for (x = 0; x < NB_HORIZONTAL_SLIDE; x++) {
                for (y = 0; y < NB_VERTICAL_SLIDE; y++) {
                    r = Math.abs(x - w2) / w2;
                    sq = this.listSquares[y * NB_HORIZONTAL_SLIDE + x];
                    this.sceneGraph.animate(sq, "position.y", 20 + Math.random() * 20,
                        sq.position.y,
                        500 - Math.random() * r * 40,
                        "linear", 0, true);
                }
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

                    //create square
                    sq = new CGSGNodeSquare(startX + x * SQ_WIDTH, startY + y * SQ_HEIGHT, SQ_WIDTH, SQ_HEIGHT);
                    //get color in hex format
                    sq.color = CGSGColor.rgb2hex(
                        imageData.data[currentPixel + 0],
                        imageData.data[currentPixel + 1],
                        imageData.data[currentPixel + 2]
                    );
                    sq.globalAlpha = imageData.data[currentPixel + 3];
                    //optimize performance
                    sq.needToKeepAbsoluteMatrix = false;
                    sq.isTraversable = false;
                    sq.isClickable = false;

                    this.listSquares.push(sq);

                    //add square to root node
                    this.rootNode.addChild(sq);
                }
            }

            this.buttonRelease.setMode(CGSGButtonMode.NORMAL);
        }

    }
);
