/*
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
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  Except as contained in this notice, the name of Capgemini shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Capgemini.
 *
 *  These Terms of Use are subject to French law.
 */

var CGSGTABHEIGHT = 35;

/**
 * A tab menu
 * @class CGSGNodeTabMenu
 * @extends CGSGNode
 * @param {Number} x X position
 * @param {Number} y Y position
 * @param {Number} w Width of the tab menu
 * @constructor
 * @type {CGSGNodeTabMenu}
 */
var CGSGNodeTabMenu = CGSGNode.extend(
	{
		initialize: function (x, y, w) {
			//call the constructor of CGSGNode
			this._super(x, y, w, CGSGTABHEIGHT);

			/**
			 * Define the class type.
			 * Not mandatory but very useful, as Javascript does not have a mechanism to manage the type of class
			 * @property classType
			 * @type {String}
			 */
			this.classType = "CGSGNodeTabMenu";

			this._buttonRadius = 4;

			this._tabsContainer = new CGSGNode(0, 0, w, 0);
			this._tabsContainer.color = "#A0A0A0";
			this._tabsContainer.lineWidth = 0;
			this.addChild(this._tabsContainer);

			var sep1 = new CGSGNodeSquare(0, CGSGTABHEIGHT - this._buttonRadius + 1, w, this._buttonRadius);
			sep1.color = "white";
			sep1.lineWidth = 0;
			this.addChild(sep1);
			var sep2 = new CGSGNodeSquare(0, CGSGTABHEIGHT - this._buttonRadius, w, 1);
			sep2.color = "#A0A0A0";
			sep2.lineWidth = 0;
			this.addChild(sep2);

			this.hideUnderline = new CGSGNodeSquare(0, CGSGTABHEIGHT - this._buttonRadius, w, 1);
			this.hideUnderline.color = "white";
			this.hideUnderline.lineWidth = 0;
			this.addChild(this.hideUnderline);

			this._tabsBaseline = new CGSGNode(0, CGSGTABHEIGHT - this._buttonRadius + 1, w, 0);
			this.addChild(this._tabsBaseline);

			/**
			 * Array of the buttons in the menu
			 * @property buttons
			 * @type {Array} array of CGSGNodeButtons
			 */
			this.tabs = [];

			/**
			 * Event
			 * @property onTabChanged
			 * @default null
			 * @type {Function}
			 */
			this.onTabChanged = null;

			this._selectedTab = null;
		},

		/**
		 * @method addButton
		 * @param {String} text the text on the tab
		 * @param {CGSGNode} view the root node for the view to show when is that is activated
		 * @return {Object} The new created tab
		 */
		addTab: function (text, view) {
			var pX = this.tabs.length;

			var button = new CGSGNodeButton(0, 0, text);
			button.setHorizontalPadding(10);
			button.setVerticalPadding(8);
			button.setTextSizes([10, 10, 10]);
			button.setFirstColors(["#EAEAEA", "white", "white"]);
			button.setLastColors(["#EAEAEA", "white", "white"]);
			button.setTextColors(["#999999", "#000000", "#000000"]);
			button._lineWidth = 1;
			button._strokeColor = "#A0A0A0";
			button.setRadiuses([this._buttonRadius, this._buttonRadius, this._buttonRadius]);
			button._initShapes();

			var tab = {button: button, view: view};
			this.tabs.push(tab);

			var that = this;
			button.onClick = function (event) {
				that.selectTab(tab);
			};

			this._tabsContainer.addChild(button);

			this._recomputeButtonsWidth();

			if (!cgsgExist(this._selectedTab)) {
				this.selectTab(tab);
			}

			return tab;
		},

		/**
		 * Select the tab passed in parameter
		 * @method selectTab
		 * @param {Object} tab
		 * @return {Object} the selected tab
		 */
		selectTab: function (tab) {
			if (cgsgExist(this._selectedTab)) {
				if (cgsgExist(this._selectedTab.view)) {
					this._selectedTab.view.isVisible = true;
					this._selectedTab.view.isTraversable = true;
				}
				this._tabsBaseline.detachChild(this._selectedTab.view);
			}
			this._tabsBaseline.addChild(tab.view);
			this._selectedTab = tab;

			for (var i = 0; i < this.tabs.length; i++) {
				this.tabs[i].view.isVisible = false;
				this.tabs[i].view.isTraversable = false;
				this.tabs[i].button.setMode(CGSGButtonMode.NORMAL);
			}

			if (cgsgExist(tab.view)) {
				tab.view.isVisible = true;
				tab.view.isTraversable = true;
			}
			tab.button.setMode(CGSGButtonMode.SELECTED);
			this.hideUnderline.translateTo(tab.button.position.x, this.hideUnderline.position.y);
			this.hideUnderline.resizeTo(tab.button.getWidth(), 1);

			if (cgsgExist(this.onTabChanged)) {
				this.onTabChanged({tab: tab});
			}

			return tab;
		},

		/**
		 * @method selectTabByIndex
		 * @param {Number} index
		 * @return {Object} the selected tab
		 */
		selectTabByIndex: function (index) {
			return this.selectTab(this.tabs[index]);
		},

		/**
		 * Recompute width for all buttons
		 * @method _recomputeButtonsWidth
		 * @private
		 */
		_recomputeButtonsWidth: function () {
			var totalWidth = 0;
			var i;
			var bw = 0; //biggest width
			for (i = 0; i < this.tabs.length; i++) {
				var w = this.tabs[i].button.getWidth();
				totalWidth += w;
				bw = Math.max(bw, w);
			}

			//each button get the same width:
			//whether the width of the biggest button, or the width of the tab / number of buttons
			if (totalWidth > this.getWidth() || this.tabs.length * bw > this.getWidth()) {
				//common width
				var cw = this.getWidth() / this.tabs.length;

				for (i = 0; i < this.tabs.length; i++) {
					this.tabs[i].button.setFixedSize(new CGSGDimension(cw, CGSGTABHEIGHT));
					this.tabs[i].button.translateTo(i * cw, 0);
				}
			}
			else {
				for (i = 0; i < this.tabs.length; i++) {
					this.tabs[i].button.setFixedSize(new CGSGDimension(bw, CGSGTABHEIGHT));
					this.tabs[i].button.translateTo(i * bw, 0);
				}
			}

		}
	}
);
