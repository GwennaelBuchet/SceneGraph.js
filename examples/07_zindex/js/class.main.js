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
 * event example
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
            //first create a root node with an arbitrary position
            this.rootNode = new CGSGNode(0, 0);
            CGSG.sceneGraph.addNode(this.rootNode, null);

            var rootSquare = new CGSGNode(20, 80);
            this.rootNode.addChild(rootSquare);

            var i;
            for (i = 0; i < 10; i++) {
                var square = new CGSGNodeSquare(i * 15, i * 15, 150, 150);

                square.isDraggable = true;
                square.isResizable = true;
                square.globalAlpha = 0.8;
                square.color = "lightgray";
                square.lineWidth = 2;
                square.lineColor = "gray";
                rootSquare.addChild(square);
            }

            this.blueSquare = new CGSGNodeSquare(0, 0, 150, 150);
            this.blueSquare.isDraggable = true;
            this.blueSquare.isResizable = true;
            this.blueSquare.globalAlpha = 0.8;
            this.blueSquare.color = "blue";
            this.blueSquare.lineWidth = 2;
            this.blueSquare.lineColor = "gray";
            rootSquare.addChild(this.blueSquare);

            this.replaceBlueSquare();

            var btnDecrease = new CGSGNodeButton(10, 10, "Decrease z-index");
            btnDecrease.onClick = this.decreaseZIndex.bind(this);
            this.rootNode.addChild(btnDecrease);

            var btnIncrease = new CGSGNodeButton(170, 10, "Increase z-index");
            btnIncrease.onClick = this.increaseZIndex.bind(this);
            this.rootNode.addChild(btnIncrease);

            var btnSetFirst = new CGSGNodeButton(320, 10, "Set z-index to back");
            btnSetFirst.onClick = this.zIndexToFirst.bind(this);
            this.rootNode.addChild(btnSetFirst);

            var btnSetLast = new CGSGNodeButton(490, 10, "Set z-index to front");
            btnSetLast.onClick = this.zIndexToLast.bind(this);
            this.rootNode.addChild(btnSetLast);

        },

        decreaseZIndex: function () {
            this.blueSquare.moveLocalZIndex(-1);

            this.replaceBlueSquare();
        },

        increaseZIndex: function () {
            this.blueSquare.moveLocalZIndex(1);
            this.replaceBlueSquare();
        },

        zIndexToFirst: function () {
            this.blueSquare.setLocalZIndex(0);
            this.replaceBlueSquare();
        },

        zIndexToLast: function () {
            this.blueSquare.setLocalZIndexToLast();
            //equal to : this.blueSquare.setLocalZIndex(this.blueSquare._parentNode.childre.length - 1);

            this.replaceBlueSquare();
        },

        replaceBlueSquare: function () {
            //replace the blue square in X and Y
            var index = this.blueSquare.getLocalZIndex();
            this.blueSquare.translateTo(index * 15 - 7,  index * 15 - 7);
        }

    }
);