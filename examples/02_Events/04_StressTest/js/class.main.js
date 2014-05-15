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
 * event example
 * */
var CGMain = CGSGView.extend(
    {
        initialize:function (canvas) {

            this._super(canvas);

            ////// INITIALIZATION /////////
            this.createScene();

            this.startPlaying();
        },

        /**
         *
         *
         */
        createScene:function () {
            //first create a root node with an arbitrary position
            this.rootNode = new CGSGNode(0, 0);
            CGSG.sceneGraph.addNode(this.rootNode, null);

            this.textNode = new CGSGNodeText(40, 10, "Over on : (nothing)");
            this.textNode.setSize(18);
            //add the textNode as child of the root
            this.rootNode.addChild(this.textNode);

            this.img = new Image();
            this.img.onload = this.onImageLoaded.bind(this);
            this.img.src = "/cgSceneGraph/examples/shared/images/board.png";
        },

        onImageLoaded:function () {
            for (var s = 0; s < 400; s++) {
                var s1 = this.addSquare({
                    hasEvent:true, name:"Pingoo " + s,
                    x:Math.random() * CGSG.canvas.width / 1.5,
                    y:40 + Math.random() * CGSG.canvas.height / 1.5,
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
                null); //URL. Warning : the web page mus be on a web server (apache, ...)
            imgNode.setImage(this.img);
            imgNode.globalAlpha = 0.5;

	        //cut the slice from the source image
	        imgNode.setSlice(476, 0, 34, 34, true);

            imgNode.name = attributes.name;

            if (attributes.hasEvent === false) {
                //create the text inside
                var textNode = new CGSGNodeText(0, 4, "No over event");
                textNode.setSize(14);
                imgNode.addChild(textNode);
            }
            else {
                //add mouse over and out events
                var that = this;
                var node;
                //animate a scale + with shadow
                imgNode.onMouseOver = function (event) {
                    node = event.data.node;
                    that.textNode.setText("Over on : " + node.name);

	                node.globalAlpha = 1.0;
	                node.scaleTo(1.1, 1.1, false);
                    //some cool animation effect
                    //CGSG.animationManager.animate(event.node, "globalAlpha", 10, 0.5, 1.0, 0, true);
                    //CGSG.animationManager.animate(event.node, "scale.x", 10, 1.0, 1.1, 0, true);
                    //CGSG.animationManager.animate(event.node, "scale.y", 10, 1.0, 1.1, 0, true);
                };
                //initial scale + without shadow
                imgNode.onMouseOut = function (event) {
                    node = event.data.node;
                    that.textNode.setText("Over on : (nothing)");

	                node.globalAlpha = 0.5;
	                node.scaleTo(1.0, 1.0, false);
                    //some cool animation effect
                    //CGSG.animationManager.animate(event.node, "globalAlpha", 10, 1.0, 0.5, 0, true);
                    //CGSG.animationManager.animate(event.node, "scale.x", 10, 1.1, 1.0, 0, true);
                    //CGSG.animationManager.animate(event.node, "scale.y", 10, 1.1, 1.0, 0, true);
                };
            }

            return imgNode;
        }

    }
);