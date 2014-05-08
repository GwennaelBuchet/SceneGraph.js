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
		initialize : function(canvas) {

			this._super(canvas);

			////// INITIALIZATION /////////

			//this.initializeCanvas();

			this.createScene();

			this.startPlaying();
		},

		initializeCanvas : function() {
			//resize the canvas to fulfill the viewport
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},

		/**
		 *
		 *
		 */
		createScene : function() {
			var root = new CGSGNode(0, 0);
			CGSG.sceneGraph.addNode(root, null);

			var txt = new CGSGNodeText(10, 10, "This sample demonstrates how easy it is to switch between themes");
			txt.setClass("cgsg-h1");
			txt.isDraggable = true;
			txt.isResizable = true;
			root.addChild(txt);

			//No set of specific class for that circle, so it will use default colors from the current theme imported from index.html
			var circle = new CGSGNodeCircle(300, 80, 30);
			circle.isDraggable = true;
			circle.isResizable = true;
			root.addChild(circle);

			var ellipse = new CGSGNodeEllipse(340, 55, 90, 50);
			ellipse.isDraggable = true;
			ellipse.isResizable = true;
			root.addChild(ellipse);

			var square = new CGSGNodeSquare(440, 50, 60, 60);
			square.isDraggable = true;
			square.isResizable = true;
			root.addChild(square);

			var btnDeactivated = new CGSGNodeButton(270, 130, "Deactivated");
			btnDeactivated.setMode(CGSGButtonMode.DEACTIVATED);
			btnDeactivated.isDraggable = true;
			btnDeactivated.isResizable = true;
			root.addChild(btnDeactivated);

			var buttonPictoLeft = new CGSGNodeButton(440, 130, "Picto Alert");
			buttonPictoLeft.isDraggable = true;
			buttonPictoLeft.isResizable = true;
			buttonPictoLeft.setPictoPosition(CGSGPositionMode.LEFT);
			buttonPictoLeft.addClass("cgsg-button-icon-alert");
			root.addChild(buttonPictoLeft, null);

			//add lines
			var points = [
				new CGSGPosition(270, 180),
				new CGSGPosition(310, 220),
				new CGSGPosition(350, 180),
				new CGSGPosition(390, 220),
				new CGSGPosition(430, 180),
				new CGSGPosition(470, 220)
			];

			var line = new CGSGNodeLine(points);
			//line.setPoints(points);
			line.isDraggable = true;
			line.isResizable = true;
			root.addChild(line);

			var t1 = new CGSGNodeText(270, 230, "Text H1");
			t1.setClass("cgsg-h1");
			t1.isDraggable = true;
			t1.isResizable = true;
			root.addChild(t1);
			var t2 = new CGSGNodeText(270, 260, "Text H2");
			t2.setClass("cgsg-h2");
			t2.isDraggable = true;
			t2.isResizable = true;
			root.addChild(t2);
			var t3 = new CGSGNodeText(270, 290, "Text H3");
			t3.setClass("cgsg-h3");
			t3.isDraggable = true;
			t3.isResizable = true;
			root.addChild(t3);
			var t4 = new CGSGNodeText(270, 320, "Text H4");
			t4.setClass("cgsg-h4");
			t4.isDraggable = true;
			t4.isResizable = true;
			root.addChild(t4);
			var t5 = new CGSGNodeText(400, 230, "Text H5");
			t5.setClass("cgsg-h5");
			t5.isDraggable = true;
			t5.isResizable = true;
			root.addChild(t5);
			var t6 = new CGSGNodeText(400, 260, "Text H6");
			t6.setClass("cgsg-h6");
			t6.isDraggable = true;
			t6.isResizable = true;
			root.addChild(t6);
			var tp = new CGSGNodeText(400, 290, "Text Paragraph");
			tp.setClass("cgsg-p");
			tp.isDraggable = true;
			tp.isResizable = true;
			root.addChild(tp);

			var buttonPink = new CGSGNodeButton(10, 60, "switch to Pink theme", true);
			buttonPink.setFixedSize(new CGSGDimension(240, 30));
			root.addChild(buttonPink);
			var buttonGreen = new CGSGNodeButton(10, 100, "switch to Green theme", true);
			buttonGreen.setFixedSize(new CGSGDimension(240, 30));
			root.addChild(buttonGreen);
			var buttonBlue = new CGSGNodeButton(10, 140, "switch to Blue theme", true);
			buttonBlue.setFixedSize(new CGSGDimension(240, 30));
			root.addChild(buttonBlue);
			var buttonGray = new CGSGNodeButton(10, 180, "switch to Gray (default) theme", true);
			buttonGray.setFixedSize(new CGSGDimension(240, 30));
			root.addChild(buttonGray);

			var bindSwitchTheme = this.switchTheme.bind(this);

			buttonPink.onClick = function() {
				bindSwitchTheme("../../../js/sg/css/themes/pink/pinkTheme.css");
			};
			buttonGreen.onClick = function() {
				bindSwitchTheme("../../../js/sg/css/themes/green/greenTheme.css");
			};
			buttonBlue.onClick = function() {
				bindSwitchTheme("../../../js/sg/css/themes/blue/blueTheme.css");
			};
			buttonGray.onClick = function() {
				bindSwitchTheme("../../../js/sg/css/themes/gray/grayTheme.css");
			};

			this.currentTheme = "../../../js/sg/css/themes/gray/grayTheme.css";
		},

		/**
		 * Switch the CSS theme
		 */
		switchTheme : function(url) {
			//unload previous theme to free memory. Not mandatory, but strongly advised.
			CGSG.cssManager.unloadCSSFile(this.currentTheme);

			//load new one
			//first add an event fired when file will be effectively loaded.
			CGSG.cssManager.onLoadEnd = this.onCSSLoaded.bind(this);
			CGSG.cssManager.loadCSSFile(url);

			this.currentTheme = url;
		},

		onCSSLoaded : function() {
			//Force scene to be validated again, to redraw objects that were in cache.
			this.invalidateTheme();
		}


	}
);