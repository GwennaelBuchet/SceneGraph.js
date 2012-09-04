/**
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
 * @date 30/08/2012
 *
 * Purpose:
 * Propose a UI logger
 *
 */
var CGSGUILogger = CGSGNode.extend(
	{
		initialize : function (x, y) {
			this._super(x, y, width, height);

			///// @public //////
			this.isTraversable = false;
			this.isResizable = false;
			this.isDraggable = true;

			this.color = "#444444";
			this.lineColor = "#222222";
			this.lineWidth = 2;
			this.globalAlpha = 0.6;
			this.textSize = 12;
			this.textColor = "white";

			this._attributes = [];

			this.classType = "CGSGUILogger";

			//construct the panel
			this._createPanel();
		},

		_createPanel : function() {

		},

		//set a new couple name/value to render onto the logger
		//if an attribute already exists with that name, just update the value
		set        : function (name, value) {
			//if the attribute already exists,just update the value
			var attr = null;
			for (var a = 0; a < this._attributes[a]; a++) {
				if (name === this._attributes[a].name) {
					attr = this._attributes[a];
					attr.value = value;
					attr.nodeValue.setText(value);
					break;
				}
			}

			//else create it, and add it to the window
			if (attr === null) {
				var tnn = new CGSGNodeText(10, 10, name);
				var tnv = new CGSGNodeText(100, 10, value);
				tnn.setSize(this.textSize);
				tnn.color = this.textColor;
				tnv.setSize(this.textSize);
				tnv.color = this.textColor;
				attr = {name : name, value : value, nodeName : tnn, nodeValue : tnv};
				this._attributes.push(attr);
			}

		},

		/**
		 * @override
		 * Must be defined to allow the scene graph to render the image nodes
		 * */
		render : function (context) {
			//save current state
			this.beforeRender(context);

			context.globalAlpha = this.globalAlpha;
			//draw this zone
			context.fillStyle = this.color;
			context.strokeStyle = this.lineColor;
			context.lineWidth = this.lineWidth;

			//we draw the rect at (0,0) because we have already translated the context to the correct position
			context.fillRect(0, 0, this.dimension.width, this.dimension.height);

			context.strokeRect(0, 0, this.dimension.width, this.dimension.height);

			//restore state
			this.afterRender(context);
		},

		/**
		 *
		 * @return a copy of this node
		 */
		copy : function () {
			var node = new CGSGUILogger(this.position.x, this.position.y);
			//call the super method
			node = this._super(node);

			node.isTraversable = this.isTraversable;
			node.isResizable = this.isResizable;
			node.isDraggable = this.isDraggable;

			node.color = this.color;
			node.lineColor = this.lineColor;
			node.lineWidth = this.lineWidth;
			node.globalAlpha = this.globalAlpha;

			for (var i = 0; i < this._attributes.length; i++) {
				node.setAttribute(this._attributes[i].name, this._attributes[i].value);
			}

			return node;
		}
	}
);
