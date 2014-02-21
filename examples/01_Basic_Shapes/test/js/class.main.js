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

/**
 * Return center of the node, based on its position and dimension
 * @method getCenter
 * @return {CGSGPosition}
 */
CGSGNode.prototype.getCenter = function() {
	var x = this.position.x + (this.getWidth() / 2);
	var y = this.position.y + (this.getHeight() / 2);

	return new CGSGPosition(x, y);
}

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
			//this.viewDimension = cgsgGetRealViewportDimension();
			//this.setCanvasDimension(this.viewDimension);
			//if CSS files was declared in <head> tag of index.html file, so we have to ask the framework
			// to load all components in cache
			this.invalidateTheme();
		},

		/**
		 *
		 *
		 */
		createScene : function() {
			//first create a root node with an arbitrary position
			this.rootNode = new CGSGNode(0, 0);
			CGSG.sceneGraph.addNode(this.rootNode, null);

			var constraint = new CGSGNodeSquare(40, 60, 720, 300);
			this.rootNode.addChild(constraint);

			this.s2 = new CGSGNodeSquare(60, 80, 50, 50);
			this.s2.detectSelectionThreshold = 0; // specific threshold for this node
			this.s2.isDraggable = true;
			this.s2.isResizable = true;
			this.rootNode.addChild(this.s2);

			this.s2.setRegionConstraint(constraint.getRegion());
			//or: this.s2.setRegionConstraint(constraint.getAbsoluteRegion());
			//or: this.s2.setRegionConstraint(new CGSGRegion(40, 60, 720, 300));

			this.s2.onMouseEnter = this.onS2MouseEnter.bind(this);
			this.s2.onDragEnd = this.onS2DragEnd.bind(this);
			this.s2.onDrag = this.onS2Drag.bind(this);
			this.s2.onResize = this._updateDimensionBox.bind(this);

			//use arbitrary points, we'll update them after
			this.points = [
				new CGSGPosition(0, 0),
				new CGSGPosition(0, 0),
				new CGSGPosition(0, CGSG.canvas.height)
			];

			//centerX, centerY, radius, angle, clockwise
			this.dimensionBox = new CGSGNodeLine(this.points);
			this.dimensionBox.isTraversable = false;
			this.rootNode.addChild(this.dimensionBox);
			//update dimension of the box, that means to update lines
			this._updateDimensionBox();
		},

		onS2MouseEnter : function(event) {
			this.s2.userData = {};
			this.s2.userData.x = event.data.node.position.x; // Save position before drag
			this.s2.userData.y = event.data.node.position.y;
		},

		onS2DragEnd : function(event) {
			var oldPosition = event.data.node.userData;
			event.data.node.translateTo(oldPosition.x, oldPosition.y);

			//update dimension of the box, that means to update lines
			this._updateDimensionBox();
		},

		onS2Drag : function(event) {
			console.log("-----------------------------------------------------");
			console.log("Previous position : " + event.data.node.userData.x + ", " + event.data.node.userData.y);
			console.log("New position : " + event.data.positions[0]);
			console.log("Node position : " + event.data.node.position);

			//update dimension of the box, that means to update lines
			this._updateDimensionBox();
		},

		_updateDimensionBox : function() {
			var dim = this.s2.getCenter();

			//only set changed values
			this.points[0].y = dim.y;
			this.points[1] = new CGSGPosition(dim.x, dim.y);
			this.points[2].x = dim.x;

			this.dimensionBox.setPoints(this.points);
		}
	}
);