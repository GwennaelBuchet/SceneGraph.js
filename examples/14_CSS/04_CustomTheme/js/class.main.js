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
		initialize : function(canvas) {

			this._super(canvas);

			////// INITIALIZATION /////////

			this.initializeCanvas();

			this.createScene();

			this.startPlaying();
		},

		initializeCanvas : function() {
			//resize the canvas to fulfill the viewport
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);

			//if CSS files was declared in <head> tag of index.html file, so we have to ask the framework
			// to load all components in cache
			this.invalidateTheme();
		},

		/**
		 *
		 *
		 */
		createScene : function() {
			var root = new CGSGNode(0, 0);
			CGSG.sceneGraph.addNode(root, null);

			var txt = new CGSGNodeText(10, 10, "This sample demonstrates how easy it is to switch between themes");
			txt.setClass("h4");
			root.addChild(txt);

			//No set of specific class for that circle, so it will use default colors from the current theme imported from index.html
			var circle = new CGSGNodeCircle(300, 80, 30);
			circle.isDraggable = true;
			circle.isResizable = true;
			root.addChild(circle);

			var ellipse = new CGSGNodeEllipse(340, 55, 90, 50);
			root.addChild(ellipse);

			var square = new CGSGNodeSquare(440, 50, 60, 60);
			square.isDraggable = true;
			square.isResizable = true;
			root.addChild(square);

			var btn = new CGSGNodeButton(280, 130, "Deactivated");
			btn.setMode(CGSGButtonMode.DEACTIVATED);
			btn.isDraggable = true;
			btn.isResizable = true;
			root.addChild(btn);

			//add lines
			var points = [
				new CGSGPosition(270, 160),
				new CGSGPosition(310, 200),
				new CGSGPosition(350, 160),
				new CGSGPosition(390, 200),
				new CGSGPosition(430, 160),
				new CGSGPosition(470, 200)
			];

			var line = new CGSGNodeLine(points);
			//line.setPoints(points);
			line.isDraggable = true;
			line.isResizable = true;
			root.addChild(line);


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
				bindSwitchTheme("../../shared/themes/pink/pinkTheme.css");
			};
			buttonGreen.onClick = function() {
				bindSwitchTheme("../../shared/themes/green/greenTheme.css");
			};
			buttonBlue.onClick = function() {
				bindSwitchTheme("../../shared/themes/blue/blueTheme.css");
			};
			buttonGray.onClick = function() {
				bindSwitchTheme("../../shared/themes/gray/grayTheme.css");
			};

			this.currentTheme = "../../shared/themes/green/greenTheme.css";
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