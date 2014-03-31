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
            var rootNode = new CGSGNodeSquare(10, 10, 200, 400);
            rootNode.color = "white";
            rootNode.lineColor = "gray";
            rootNode.lineWidth = 1;
            CGSG.sceneGraph.addNode(rootNode, null);

            this.tabMenu = new CGSGNodeTabMenu(0, 0, 200);
            rootNode.addChild(this.tabMenu);

            //now, create tabs
            this.createFirstTab();
            this.createSecondTab();
        },

        createFirstTab : function() {
            //a tab is just a text with a root node to render into when it's selected (called the "view").
            //So we create a node to render bound with the tab

            var root = new CGSGNode(0, 0);

            var sq = new CGSGNodeSquare(10, 10, 30, 40);
            root.addChild(sq);

            var txt = new CGSGNodeText(10, 70, "tab1");
            root.addChild(txt);


            //create the tab with "root" as view.
            var tab = this.tabMenu.addTab("tab 1",root);

            //"tab" now contains tab.text and tab.view
        },

        createSecondTab : function() {
            //a tab is just a text with a root node to render into when it's selected (called the "view").
            //So we create a node to render bound with the tab

            var root = new CGSGNode(0, 0);

			this.cpWitness = new CGSGNodeSquare(320, 291, 40, 40);
			this.cpWitness.lineColor = "gray";
			this.cpWitness.lineWidth = 2;
			root.addChild(this.cpWitness);

			//A second color picker with a custom size
			var colorPicker2 = new CGSGNodeColorPicker(30, 20, 160, 260);
			root.addChild(colorPicker2);

			var that = this;
			colorPicker2.onOverColor = function (event) {
				that.selectColor(event);
			};
			colorPicker2.onClickColor = function (event) {
				that.selectColor(event);
			};


            //create the tab with "root" as view.
            var tab = this.tabMenu.addTab("tab 2",root);

            //"tab" now contains tab.text and tab.view
        },

		/**
		 * The "onOverColor" and "onClickColor" methods of the CGSGNodeColorPicker return a {r, g, b} object
		 * @method selectColor
		 * @param {Object} event
		 */
		selectColor:function (event) {
			this.cpWitness.bkgcolors = [CGSGColor.rgb2hex(event.r, event.g, event.b)];
		}

    }
);