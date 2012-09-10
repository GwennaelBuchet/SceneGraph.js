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
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
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
            //redimensionnement du canvas pour être full viewport en largeur
            this.viewDimension = cgsgGetRealViewportDimension();
            this.setCanvasDimension(this.viewDimension);
        },

        /**
         *
         *
         */
        createScene:function () {
            //first create a root node with an arbitrary size and position
            this.rootNode = new CGSGNode(0, 0, 500, 500);
            this.sceneGraph.addNode(this.rootNode, null);

            this.textNode = new CGSGNodeText(40, 10, "Over on : (nothing)");
            this.textNode.setSize(18);
            //add the textNode as child of the root
            this.rootNode.addChild(this.textNode);

            this.img = new Image();
            var bindOnImageLoaded = this.onImageLoaded.bind(this);
            this.img.onload = bindOnImageLoaded;
            this.img.src = "images/board.png";
        },

        onImageLoaded:function () {
            for (var s = 0; s < 400; s++) {
                var s1 = this.addSquare({
                    hasEvent:true, name:"Pingoo " + s,
                    x:Math.random() * this.canvas.width / 1.5,
                    y:40 + Math.random() * this.canvas.height / 1.5,
                    w:30 + Math.random() * 50});
                //add squares to the scene
                this.rootNode.addChild(s1);
            }

        },

        addSquare:function (attributes) {

            //second, create the 2 nodes, with no image URL, and add them to the root node
            var imgNode = new CGSGNodeImage(
                attributes.x, //x
                attributes.y, //y
                34, //width (-1 = auto compute)
                34, //height (-1 = auto compute)
                476, //slice x (slice x = position in the source image)
                0, //slice y
                34, //slice width (used for tiles. Here we want to display all the image)
                34, //slice height (used for tiles. Here we want to display all the image)
                null, //URL. Warning : the web page mus be on a web server (apache, ...)
                this.context);      //context of rendering
            imgNode.setImage(this.img);
            imgNode.globalAlpha = 0.5;
            imgNode.name = attributes.name;
            //imgNode.pickNodeMethod = CGSGPickNodeMethod.REGION;
            //imgNode.resizeTo(attributes.w, attributes.w);
            //imgNode.initShape();


            if (attributes.hasEvent === false) {
                //create the text inside
                var textNode = new CGSGNodeText(0, 4, "No over event");
                textNode.setSize(14);
                imgNode.addChild(textNode);
            }
            else {
                //add mouse over and out events
                var that = this;
                //animate a scale + with shadow
                imgNode.onMouseOver = function (event) {
                    that.textNode.setText("Over on : " + event.node.name);
                    //some cool animation effect
                    that.sceneGraph.animate(event.node, "globalAlpha", 10, 0.5, 1.0, "linear", 0, true);
                    that.sceneGraph.animate(event.node, "scale.x", 10, 1.0, 1.1, "linear", 0, true);
                    that.sceneGraph.animate(event.node, "scale.y", 10, 1.0, 1.1, "linear", 0, true);
                };
                //initial scale + without shadow
                imgNode.onMouseOut = function (event) {
                    that.textNode.setText("Over on : (nothing)");
                    //some cool animation effect
                    that.sceneGraph.animate(event.node, "globalAlpha", 10, 1.0, 0.5, "linear", 0, true);
                    that.sceneGraph.animate(event.node, "scale.x", 10, 1.1, 1.0, "linear", 0, true);
                    that.sceneGraph.animate(event.node, "scale.y", 10, 1.1, 1.0, "linear", 0, true);
                };
            }

            return imgNode;

            //create the square
            /*var square = new CGSGNodeSquare(attributes.x, attributes.y, attributes.w, attributes.w);
            square.isDraggable = true;
            square.isResizable = true;
            square.globalAlpha = 0.5;
            square.color = attributes.color;
            square.lineWidth = 2;
            square.name = attributes.name;



            return square;*/
        }

    }
);