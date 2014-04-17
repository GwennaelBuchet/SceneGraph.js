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
 * */
var CGMain = CGSGView.extend(
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
            var rootNode = new CGSGNode(0, 0);
            CGSG.sceneGraph.addNode(rootNode, null);

			rootNode.translateTo(230, 50);

            var that = this;

			var parent = new CGSGNode(10, 10);
			rootNode.addChild(parent);

            //the color picker itself, in the default size
            var colorPicker = new CGSGNodeColorPicker(20, 20, 200, 200);
            parent.addChild(colorPicker);
            //add events. Do not use "onMouseOver" or "onClik" events to get selected color. Use the ones below.
            colorPicker.onOverColor = function (event) {
                that.selectColor(event);
            };
            colorPicker.onClickColor = function (event) {
                that.selectColor(event);
            };
			colorPicker.translateWith(-100, 10);


            //A second color picker with a custom size
            var colorPicker2 = new CGSGNodeColorPicker(300, 20, 60, 60);
            rootNode.addChild(colorPicker2);

            //add events. Do not use "onMouseOver" or "onClik" events to get selected color. Use the ones below.
            colorPicker2.onOverColor = function (event) {
                that.selectColor(event);
            };
            colorPicker2.onClickColor = function (event) {
                that.selectColor(event);
            };

            //A third color picker with a custom size
            var colorPicker3 = new CGSGNodeColorPicker(300, 100, 320, 100);
            rootNode.addChild(colorPicker3);
            colorPicker3.isDraggable = true;

            //add events. Do not use "onMouseOver" or "onClik" events to get selected color. Use the ones below.
            colorPicker3.onOverColor = function (event) {
                that.selectColor(event);
            };
            colorPicker3.onClickColor = function (event) {
                that.selectColor(event);
            };


            //A square that will receive the color selected in the colorPicker
            this.cpWitness = new CGSGNodeSquare(320, 291, 40, 40);
            this.cpWitness.lineColor = "gray";
            this.cpWitness.lineWidth = 2;
            rootNode.addChild(this.cpWitness);

            //A text node to display the color RGB value
            this.txtNode = new CGSGNodeText(320, 271, "");
            this.txtNode.setSize(12);
            rootNode.addChild(this.txtNode);
        },

        /**
         * The "onOverColor" and "onClickColor" methods of the CGSGNodeColorPicker return a {r, g, b} object
         * @method selectColor
         * @param {Object} event
         */
        selectColor:function (event) {
            this.cpWitness.bkgcolors = [CGSGColor.rgb2hex(event.r, event.g, event.b)];
            this.txtNode.setText("[" + event.r + "," + event.g + "," + event.b + "]", false);
        }

    }
);