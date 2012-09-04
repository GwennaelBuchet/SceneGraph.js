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
 * @date 10/08/2012
 *
 * Subclassing CGSGNode.
 *
 * This template is an empty custom node.
 * All mandatory functions and attributes are defined.
 *
 * @param x position X on the screen, relatively to it's parent
 * @param y position Y on the screen, relatively to it's parent
 * @param width total width of the image, including all the sprite positions
 * @param height total height of the image, including all the sprite positions
 */
var CGSGNodeTemplate = CGSGNode.extend(
	{
		/**
		 * Constructor.
		 * Contains the initialization of all attributes
		 * */
		initialize : function (x, y, width, height /*, other parameters here */) {
			//call the constructor of CGSGNode
			this._super(x, y, width, height);

			///// @public //////

			//define the class type.
			//Not mandatory but very useful, as Javascript does not have a mechanism to manage the type of class
			this.classType = "CGSGNodeTemplate";

			//define below your public variables and initialize them with the parameters of the constructor
			//ex.: this.urlImage = urlImage;

			///// @private //////

			//define below your private variables and initialize them with the parameters of the constructor
			//ex.: this._isLoaded = false;

			///// INITIALIZATION //////

			//add here your processes to initialize your object
		},

		/**
		 * @override
		 * Must be defined to allow the scene graph to render your custom nodes
		 * */
		render : function (context) {
			//call this before your custom rendering
			this.beforeRender(context);

			//your rendering here

			//call this after your custom rendering
			this.afterRender(context);
		},

		/**
		 *
		 * @return a copy of this node
		 */
		copy : function () {
			var node = new CGSGNodeTemplate(this.position.x, this.position.y, this.dimension.width,
											this.dimension.height);
			//call the super method
			node = this._super(node);

			//node.color = this.color;
			//node.lineColor = this.lineColor;
			//node.lineWidth = this.lineWidth;
			return node;
		}
	}
);
