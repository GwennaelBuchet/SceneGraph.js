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
 * @date 01/07/2012
 *
 * Represent a node in the scene graph.
 * It encapsulates a position and a dimension.
 * @param x the X position of this nodes, relatively to its parent position
 * @param y the Y position of this nodes, relatively to its parent position
 * @param width width of this nodes with a scale of [1; 1]
 * @param height height of this nodes with a scale of [1; 1]
 */
var CGSGPickNodeMethod = {
	GHOST  : "region",
	REGION : "region"
};

var CGSGNode = Object.extend(
	{
		initialize : function(x, y, width, height) {

			///// @public //////

			//the name of this nodes
			this.name = "";
			this.isSelected = false;
			//the type of this class. Must be redefined by inherited classes
			this.classType = "CGSGNODE";

			// The 8 handleboxes that will be the resize handles
			// the resize handles will be in this order:
			// 0  1  2
			// 3     4
			// 5  6  7
			this.resizeHandles = [];

			this.globalAlpha = 1.0;
			this.isVisible = true;

			//if true, the node will be proportionally resized
			this.isProportionalResize = false;

			//"region", "ghost"
			this.pickNodeMethod = CGSGPickNodeMethod.REGION;

			//list of the children (empty if this nodes is a leaf)
			this.children = [];

			//the constraint region when moving the node
			this.regionConstraint = null;

			//pivot point to apply a rotation
			this.rotationCenter = new CGSGPosition(0, 0);

			//can be fulfilled by the developer to put in whatever he needs
			this.userdata = null;

			//selection attributes
			//if true, this nodes is clickable and so will be checked by the pickNode function
			this.isClickable = true;
			//if true, this nodes can be selected and so can be transformed (dimension)
			this.isResizable = false;
			this.isDraggable = false;

			this.selectionLineColor = CGSG_DEFAULT_SELECTED_STROKE_COLOR;
			this.selectionLineWidth = CGSG_DEFAULT_SELECTED_STROKE_SIZE;
			this.selectionHandleSize = CGSG_DEFAULT_SELECTED_RESIZEHANDLE_SIZE;
			this.selectionHandleColor = CGSG_DEFAULT_SELECTED_RESIZEHANDLE_COLOR;

			//Updated by the scene itself. Don't update it manually.
			//True if the mice is over the node, false otherwise
			this.isMouseOver = false;
			this.isMoving = false;
			this.isResizing = false;

			///// @private & @protected /////

			this._id = 0;
			//parent of this nodes
			this._parentNode = null;

			//position of this nodes on the screen, relatively to the position of its parent nodes
			this.position = new CGSGPosition(0, 0);
			//absolute position on the canvas container. Generated value. don't modify it manually
			this._absolutePosition = new CGSGPosition(0, 0);
			//dimension of this nodes when scale = 1
			this.dimension = new CGSGDimension(0, 0);
			//scale of this nodes, relatively to the scale of its parent nodes
			this.scale = new CGSGScale(1, 1);
			//Generated value. don't modify it manually
			this._absoluteScale = new CGSGScale(1, 1);
			//rotation of this nodes, relatively to the rotation of its parent nodes
			this.rotation = new CGSGRotation(0);
			//Generated value. don't modify it manually
			this._absoluteRotation = new CGSGRotation(0);

			this._isDrag = false;

			this._ghostColor = "#FF0000";

			//true if it has been moved and the absolute SRT of the children must be recomputed
			this._isAbsoluteSRTObsolete = true;

			///// INITIALIZATION //////
			this.selectableZone =
			new CGSGRegion(this.position.x, this.position.y, this.dimension.width, this.dimension.height);

			//true if this node is traversable (recursively) (ie : by the picknode, a traverser, ...)
			this.isTraversable = true;

			//initialize the position and dimension
			this.translateTo(x, y);
			this.resizeTo(width, height);

			// initialize the selection handleBoxes
			for (var i = 0; i < 8; i++) {
				var handleBox = new CGSGHandleBox(this, this.selectionHandleSize, this.selectionHandleColor, 0, 0);
				this.resizeHandles.push(handleBox);
			}

			//all the events for the node
			this.onMouseOver = null;
			this.onMouseOut = null;
			this.onClick = null;
			this.onDblClick = null;
			this.onDrag = null;
			this.onDragEnd = null;
			this.onResize = null;
			this.onResizeEnd = null;
			this.onSelect = null;
			this.onDeselect = null;

			this.computeAbsoluteMatrix(true);
		},

		/**
		 * @public
		 * return the relative region of this node
		 * @return {CGSGRegion}
		 */
		getRegion : function() {
			return new CGSGRegion(this.position.x, this.position.y, this.getWidth(), this.getHeight());
		},

		/**
		 * @public
		 * return the absolute region of this node
		 * @return {CGSGRegion}
		 */
		getAbsoluteRegion : function() {
			return new CGSGRegion(this.getAbsoluteLeft(), this.getAbsoluteTop(), this.getAbsoluteWidth(),
			                      this.getAbsoluteHeight());
		},

		//// RENDERING MANIPULATION //////

		/**
		 * Wipes the canvas context
		 * */
		_clearContext : function(context, canvasWidth, canvasHeight) {
			context.clearRect(0, 0, canvasWidth, canvasHeight
				/*, context.width, context.height*/);
		},

		/**
		 * Empty rendering function. Must be overrided into the subclasses
		 * @param context the context into render the nodes
		 * @param currentFrame the number for the current frame
		 * */
		render : function(context) {
			//save current state
			this.beforeRender(context);

			//restore state
			this.afterRender(context);
		},

		/**
		 * Empty ghost rendering function.
		 * Render here your custom nodes with a single color (this._ghostColor, defined in the CGSGNode class).
		 * This will be used by the SceneGraph to know if the mouse cursor is over this nodes.
		 *
		 * @param ghostContext The context for the ghost rendering
		 * @param cumulatedPosition The CGSGPosition absolute position of the nodes in the canvas
		 * @param cumulatedRotation The CGSGRotation absolute rotation of the nodes in the canvas
		 * @param cumulatedScale The CGSGScale absolute scale of the nodes in the canvas
		 */
		renderGhost : function(ghostContext) {
			//save current state
			this.beforeRenderGhost(ghostContext);

			//restore state
			this.afterRenderGhost(ghostContext);
		},

		/**
		 * @protected
		 * Render the resize handler
		 * */
		renderSelected : function(context) {
			this._absolutePosition = this.getAbsolutePosition();
			this._absoluteScale = this.getAbsoluteScale();

			context.strokeStyle = this.selectionLineColor;

			context.lineWidth = this.selectionLineWidth / this._absoluteScale.y;
			context.beginPath();
			//top line
			context.moveTo(0, 0);
			context.lineTo(this.dimension.width, 0);
			//bottom line
			context.moveTo(0, this.dimension.height);
			context.lineTo(this.dimension.width, this.dimension.height);
			context.stroke();
			context.closePath();

			context.lineWidth = this.selectionLineWidth / this._absoluteScale.x;
			context.beginPath();
			//left line
			context.moveTo(0, 0);
			context.lineTo(0, this.dimension.height);
			//right line
			context.moveTo(this.dimension.width, 0);
			context.lineTo(this.dimension.width, this.dimension.height);
			context.stroke();
			context.closePath();

			//draw the resize handles
			if (this.isResizable) {
				// draw the handle boxes
				var halfX = this.selectionHandleSize / (2 * this._absoluteScale.x);
				var halfY = this.selectionHandleSize / (2 * this._absoluteScale.y);

				// 0  1  2
				// 3     4
				// 5  6  7

				// top left, middle, right
				this.resizeHandles[0].translateTo(-halfX, -halfY);
				this.resizeHandles[1].translateTo(this.dimension.width / 2 - halfX, -halfY);
				this.resizeHandles[2].translateTo(this.dimension.width - halfX, -halfY);

				// middle left
				this.resizeHandles[3].translateTo(-halfX, this.dimension.height / 2 - halfY);

				// middle right
				this.resizeHandles[4].translateTo(this.dimension.width - halfX,
				                                  this.dimension.height / 2 - halfY);

				// bottom left, middle, right
				this.resizeHandles[6].translateTo(this.dimension.width / 2 - halfX,
				                                  this.dimension.height - halfY);
				this.resizeHandles[5].translateTo(-halfX, this.dimension.height - halfY);
				this.resizeHandles[7].translateTo(this.dimension.width - halfX,
				                                  this.dimension.height - halfY);

				for (var i = 0; i < 8; i++) {
					this.resizeHandles[i].size = this.selectionHandleSize;
					this.resizeHandles[i].color = this.selectionHandleColor;
					this.resizeHandles[i].render(context);
				}
			}
		},

		/**
		 * @public
		 * Must be called before to start the rendering of the nodes
		 * @param context the context into render the nodes
		 * @param currentFrame the number for the current frame
		 * */
		beforeRender : function(context) {
			//first save the current context state
			context.save();

			//move the context to the nodes's relative position
			context.translate(this.position.x, this.position.y);

			// translate context to center of canvas
			context.translate(this.dimension.width * this.rotationCenter, this.dimension.height * this.rotationCenter);
			context.rotate(this.rotation.angle);
			context.scale(this.scale.x, this.scale.y);
		},

		/**
		 * @protected
		 * Must be called before begin to render
		 * */
		afterRender : function(context) {
			//render all children
			if (!this.isALeaf()) {
				//draw children
				for (var i = 0, len = this.children.length; i < len; ++i) {
					var childNode = this.children[i];
					if (childNode.isVisible) {
						childNode.render(context);
					}
				}
			}

			//restore the context state
			context.restore();
		},

		/**
		 * @protected
		 * Must be called before begin to render the nodes
		 * @param context
		 */
		beforeRenderGhost : function(context) {
			//first save the current context state
			context.save();
			//move the context to the nodes's relative position
			context.translate(this._absolutePosition.x, this._absolutePosition.y);
			context.rotate(this._absoluteRotation.angle);
			context.scale(this._absoluteScale.x, this._absoluteScale.y);
		},

		/**
		 * @protected
		 * Must be called before begin to render
		 * */
		afterRenderGhost : function(context) {
			//restore the context state
			context.restore();
		},

		/**
		 * Mark this nodes as selected
		 * */
		setSelected : function(isSelected) {
			this.isSelected = isSelected;
			this._isDrag = true;

			if (isSelected && this.onSelect !== null) {
				this.onSelect({node:this});
			}
			else if (this.onDeselect !== null) {
				this.onDeselect({node:this});
			}
		},

		/**
		 * @protected
		 * return this if this nodes is under the mice cursor
		 * Can be overrided by inherited klass to optimize this perform.
		 * This default function used the ghost rendering method
		 * @param mousePosition A CGSGPosition object
		 * @param ghostContext
		 * @param absoluteScale
		 * @param canvasWidth
		 * @param canvasHeight
		 */
		detectSelection : function(mousePosition, ghostContext, absoluteScale, canvasWidth, canvasHeight) {

			if (this.pickNodeMethod == "region" /*CGSGPickNodeMethod.REGION*/) {
				if (mousePosition.x >= this._absolutePosition.x
					    && mousePosition.x <= this._absolutePosition.x + this.dimension.width * absoluteScale.x
					    && mousePosition.y >= this._absolutePosition.y
					&& mousePosition.y <= this._absolutePosition.y + this.dimension.height * absoluteScale.y
					) {
					return this;
				}
			}
			else /*if (this.pickNodeMethod == CGSGPickNodeMethod.GHOST)*/ {
				// draw shape onto ghost context
				this.renderGhost(ghostContext);

				// get image data at the mouse x,y pixel
				var imageData = ghostContext.getImageData(mousePosition.x, mousePosition.y, 1, 1);

				this._clearContext(ghostContext, canvasWidth, canvasHeight);

				// if the mouse pixel exists, select this nodes
				if (imageData.data[0] != 0 || imageData.data[1] != 0 || imageData.data[2] != 0) {
					return this;
				}
			}

			return null;
		},

		/**
		 * Check if this nodes is under the cursor position.
		 * @param mousePosition position of the mouse on the canvas
		 * @param absoluteScale a CGSGScale absolute relativeScale of all parents
		 * @param ghostContext a copy of the canvas context
		 * @param recursively if false, don't traverse the children of this nodes
		 * @param canvasWidth the width of the canvas container
		 * @param canvasHeight the height of the canvas container
		 * */
		pickNode : function(mousePosition, absoluteScale, ghostContext, recursively, canvasWidth, canvasHeight,
		                    condition) {
			var selectedNode = null;

			var childAbsoluteScale = null;
			if (cgsgExist(absoluteScale)) {
				childAbsoluteScale = absoluteScale.copy();
				childAbsoluteScale.multiply(this.scale);
			}
			else {
				childAbsoluteScale = this.getAbsoluteScale();
			}

			if (this.isTraversable && (this.isClickable || this.isResizable || this.isDraggable)) {
				if (this.eval(condition) === true) {
					this.computeAbsoluteMatrix(false);
					selectedNode =
					this.detectSelection(mousePosition, ghostContext, childAbsoluteScale,
					                     canvasWidth, canvasHeight);
				}
			}

			//traverse the children if asked
			if (this.isTraversable && recursively && !this.isALeaf()) {
				for (var i = this.children.length - 1; i >= 0; --i) {
					var childNode = this.children[i];
					var selectedChild = childNode.pickNode(mousePosition,
					                                       childAbsoluteScale, ghostContext,
					                                       recursively, canvasWidth,
					                                       canvasHeight, condition);
					if (selectedChild !== null && selectedChild !== undefined) {
						selectedNode = selectedChild;
						break;
					}
				}

				childAbsoluteScale = null;
			}

			return selectedNode;
		},

		/**
		 * Return true if this nodes has no child
		 * */
		isALeaf : function() {
			return this.children.length <= 0;
		},

		//// TRANSFORMATION MANIPULATION //////

		/**
		 * Replace current relative position by this new one
		 * */
		translateTo : function(newRelativeX, newRelativeY, computeAbosluteValue) {
			this.position.translateTo(newRelativeX, newRelativeY);
			if (computeAbosluteValue !== false) {
				this._absolutePosition = this.getAbsolutePosition();
			}
		},

		/**
		 * Add new coordinate to the current relative one
		 * */
		translateWith : function(x, y, computeAbosluteValue) {
			this.position.translateWith(x, y);
			if (computeAbosluteValue !== false) {
				this._absolutePosition = this.getAbsolutePosition();
			}
		},

		/**
		 * Add new coordinate to the current relative one
		 * */
		translateBy : function(x, y, computeAbosluteValue) {
			this.position.translateBy(x, y);
			if (computeAbosluteValue !== false) {
				this._absolutePosition = this.getAbsolutePosition();
			}
		},

		/**
		 * Replace current dimension by these new ones
		 * */
		resizeTo : function(newWidth, newHeight) {
			this.dimension.resizeTo(newWidth, newHeight);
		},

		/**
		 * Multiply current dimension by these new ones
		 * */
		resizeBy : function(widthFactor, heightFactor) {
			this.dimension.resizeBy(widthFactor, heightFactor);
		},

		/**
		 * Increase/decrease current dimension with adding values
		 * */
		resizeWith : function(width, height) {
			var w = width, h = height;
			this.dimension.resizeWith(w, h);
		},

		/**
		 * Replace current relative relativeScale by this new one
		 * */
		scaleTo : function(scaleX, scaleY, computeAbosluteValue) {
			this.scale.x = scaleX;
			this.scale.y = scaleY;
			if (computeAbosluteValue !== false) {
				this._absoluteScale = this.getAbsoluteScale();
			}
		},

		/**
		 * Multiply this relativeScale factor by the current relative relativeScale
		 * */
		scaleBy : function(scaleFactorX, scaleFactorY, computeAbosluteValue) {
			this.scale.x *= scaleFactorX;
			this.scale.y *= scaleFactorY;
			if (computeAbosluteValue !== false) {
				this._absoluteScale = this.getAbsoluteScale();
			}
		},

		/**
		 * Add to the current relative Scale
		 * */
		scaleWith : function(x, y, computeAbosluteValue) {
			this.scale.x += scaleFactorX;
			this.scale.y += scaleFactorY;
			if (computeAbosluteValue !== false) {
				this._absoluteScale = this.getAbsoluteScale();
			}
		},

		/**
		 * Replace current relative relativeRotation by this new one
		 * */
		rotateTo : function(newAngle, computeAbosluteValue) {
			this.rotation.rotateTo(newAngle);
			if (computeAbosluteValue !== false) {
				this._absoluteRotation = this.getAbsoluteRotation();
			}
		},

		/**
		 * Multiply this relativeScale factor by the current relative relativeScale
		 * */
		rotateBy : function(rotateFactor, computeAbosluteValue) {
			this.rotation.rotateBy(rotateFactor);
			if (computeAbosluteValue !== false) {
				this._absoluteRotation = this.getAbsoluteRotation();
			}
		},

		/**
		 * Add this angle to the current relative relativeRotation
		 * */
		rotateWith : function(angle, computeAbosluteValue) {
			this.rotation.rotateWith(angle);
			if (computeAbosluteValue !== false) {
				this._absoluteRotation = this.getAbsoluteRotation();
			}
		},

		//// CHILDREN MANIPULATION //////

		/**
		 * Add a new nodes into this one, at the end of the list
		 * @param newNode the nodes to add as a child
		 * */
		addChild : function(newNode) {
			newNode._parentNode = this;
			this.children[this.children.length] = newNode;
		},

		/**
		 * Add a new nodes at a particular index in the list of children.
		 * If the index is too large, the nodes will be inserted at the end of the list
		 * @param newNode the nodes to insert as a child
		 * @param index the position of the new child in the list
		 * */
		addChildAt : function(newNode, index) {
			if (index > this.children.length) {
				index = this.children.length;
			}

			for (var i = this.children.length; i >= index; --i) {
				this.children[i] = this.children[i - 1];
			}

			newNode.parentNode = this;
			this.children[index] = newNode;
		},

		/**
		 * Remove the child passed in parameter and delete it
		 * @param node the nodes to remove
		 * @param recursively if true, search the nodes on all the tree from this nodes
		 * @return true if the child was correctly removed or false if the nodes was not found.
		 * */
		removeChild : function(node, recursively) {
			var index = this.children.indexOf(node);
			if (index >= 0) {
				/*this.children = */
				this.children.without(node);
				delete(node);
				return true;
			}

			if (recursively) {
				for (var i = 0, len = this.children.length; i < len; ++i) {
					var childNode = this.children[i];
					if (childNode.removeChild(node, true)) {
						return true;
					}
				}
			}

			return false;
		},

		/**
		 * remove all children, delete them and reset the current parameters
		 * */
		removeAll : function() {
			for (var i = 0, len = this.children.length; i < len; ++i) {
				var childNode = this.children[i];
				if (childNode.isALeaf()) {
					delete (childNode);
				}
				else {
					childNode.removeAll();
				}
			}

			this.children.clear();

			this.initialize(0, 0, 10, 10);
		},

		/**
		 * Detach the nodes in index 'index' without delete it. So it's not a child anymore
		 * @param index
		 */
		detachChildAt : function(index) {
			if (index >= 0 && index < this.children.length) {
				this.detachChild(this.children[index]);
			}
		},

		/**
		 * Detach the nodes without delete it. So it's not a child anymore
		 * @param childNode
		 */
		detachChild : function(childNode) {
			childNode._parentNode = null;
			/*this.children = */
			this.children.without(childNode);
		},

		/**
		 * Eval the script passed in parameter in "this" scope.
		 * @param attribute The attribute to be changed
		 * @param value The new value for the attribute
		 *
		 * @example nodes.eval("position.y", 12);
		 */
		evalSet : function(attribute, value) {
			eval("this." + attribute + "=" + value);

			if (attribute.indexOf("position") == 0) {
				this._absolutePosition = this.getAbsolutePosition();
			}
			else if (attribute.indexOf("rotation") == 0) {
				this._absoluteRotation = this.getAbsoluteRotation();
			}
			else if (attribute.indexOf("scale") == 0) {
				this._absoluteScale = this.getAbsoluteScale();
			}
		},

		eval : function(operation) {
			if (operation === undefined || operation === null) {
				return true;
			}
			return eval("this." + operation);
		},

		/**
		 * @public
		 * Set the region inside which one this node ca be placed an can move
		 * @param region a CGSGRegion relatively to this parent region. Can be null.
		 */
		setRegionConstraint : function(region) {
			this.regionConstraint = region;
		},

		/**
		 * @public
		 * @return the absolute positions of this node
		 */
		getAbsolutePosition : function() {
			var n = this;
			var translation = this.position.copy();
			while (n._parentNode !== null) {
				translation.multiply(n._parentNode.scale);
				n = n._parentNode;
			}

			if (this._parentNode !== null) {
				translation.add(this._parentNode.getAbsolutePosition());
			}

			return translation;
		},

		/**
		 * @public
		 * @return the absolute scale of this node
		 */
		getAbsoluteScale : function() {
			var n = this;
			var s = this.scale.copy();
			while (n._parentNode !== null) {
				s.multiply(n._parentNode.scale);
				n = n._parentNode;
			}
			return s;
		},

		/**
		 * @public
		 * @return the absolute rotation of this node
		 */
		getAbsoluteRotation : function() {
			var n = this;
			var r = this.rotation.copy();
			while (n._parentNode !== null) {
				r.add(n._parentNode.rotation.angle);
				n = n._parentNode;
			}
			return r;
		},

		/**
		 * @public
		 * Compute the absolute position, rotation and scale in the canvas container
		 * @param recursive if !== false, compute recursively
		 * */
		computeAbsoluteMatrix : function(recursive) {
			this._absolutePosition = this.getAbsolutePosition();
			this._absoluteScale = this.getAbsoluteScale();
			this._absoluteRotation = this.getAbsoluteRotation();

			if (recursive !== false) {
				for (var c = 0; c < this.children.length; c++) {
					if (cgsgExist(this.children[c])) {
						this.children[c].computeAbsoluteMatrix(recursive);
					}
				}
			}
		},

		getAbsoluteLeft   : function() {
			return this._absolutePosition.x;
		},
		getAbsoluteRight  : function() {
			return this._absolutePosition.x + this.getAbsoluteWidth();
		},
		getAbsoluteTop    : function() {
			return this._absolutePosition.y;
		},
		getAbsoluteBottom : function() {
			return this._absolutePosition.y + this.getAbsoluteHeight();
		},
		getAbsoluteWidth  : function() {
			return this.getWidth() * this._absoluteScale.x;
		},
		getAbsoluteHeight : function() {
			return this.getHeight() * this._absoluteScale.y;
		},
		getWidth          : function() {
			return this.dimension.width;
		},

		getHeight : function() {
			return this.dimension.height;
		},

		/**
		 * @public
		 * @return true if the 2 nodes are colliding. They are colliding if the distance between them is minus than the threshold parameter
		 * @param node a CGSGNode
		 * @param space between the 2 nodes before considering they are colliding
		 */
		isColliding : function(node, threshold) {
			if (threshold === undefined || threshold === null) {
				threshold = 0;
			}
			var nodeRight = node.getAbsoluteRight();
			var nodeBottom = node.getAbsoluteBottom();

			if ((this.getAbsoluteLeft() <= nodeRight + threshold &&
			     this.getAbsoluteRight() >= node.getAbsoluteLeft() - threshold) ||
			    (this.getAbsoluteRight() >= node.getAbsoluteLeft() - threshold &&
			     this.getAbsoluteLeft() <= nodeRight + threshold)) {

				if (this.getAbsoluteTop() <= nodeBottom + threshold &&
				    this.getAbsoluteBottom() >= node.getAbsoluteTop() - threshold) {
					return true;
				}
			}

			return false;
		},

		/**
		 * @public
		 * @return a Array of nodes this one is colliding with (can be empty)
		 * @param threshold space between the 2 nodes before considering they are colliding
		 */
		getListOfCollidingBrothers : function(threshold) {
			var listOfCollidingNodes = [];
			var brother = null;
			for (var n = 0; n < this._parentNode.children.length; n++) {
				brother = this._parentNode.children[n];
				if (brother !== this && this.isColliding(brother, threshold)) {
					listOfCollidingNodes.push(brother);
				}
			}

			return listOfCollidingNodes;
		},

		/**
		 * @public
		 * @param threshold space between the 2 nodes before considering they are colliding
		 * @return {Boolean} true if this node is colliding one of the other children of its parent node
		 */
		isCollidingABrother : function(threshold) {
			var brother = null;
			for (var n = 0; n < this._parentNode.children.length; n++) {
				brother = this._parentNode.children[n];
				if (brother !== this && this.isColliding(brother, threshold)) {
					return true;
				}
			}

			return false;
		},

		/**
		 *
		 * @return a copy of this node
		 */
		copy : function(node) {
			if (node === null || node === undefined) {
				node = new CGSGNode(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
			}
			node.classType = this.classType;
			node.name = this.name;
			node.globalAlpha = this.globalAlpha;
			node.isVisible = this.isVisible;
			node.isProportionalResize = this.isProportionalResize;
			node.pickNodeMethod = this.pickNodeMethod;

			//list of the children (empty if this nodes is a leaf)
			//this.children = [];

			if (this.regionConstraint !== null) {
				node.regionConstraint = this.regionConstraint.copy();
			}

			//can be fulfilled by the developer to put in whatever he needs
			if (this.userdata !== null) {
				node.userdata = this.userdata.copy();
			}

			//selection attributes
			//if true, this nodes is clickable and so will be checked by the pickNode function
			node.isClickable = this.isClickable;
			//if true, this nodes can be selected and so can be transformed (dimension)
			node.isResizable = this.isResizable;
			node.isDraggable = this.isDraggable;
			node.isTraversable = this.isTraversable;

			node.selectionLineColor = this.selectionLineColor;
			node.selectionLineWidth = this.selectionLineWidth;
			node.selectionHandleSize = this.selectionHandleSize;
			node.selectionHandleColor = this.selectionHandleColor;
			node._id = this._id;
			node._ghostColor = this._ghostColor;
			node.translateTo(this.position.x, this.position.y);
			node.resizeTo(this.dimension.width, this.dimension.height);
			node.scaleTo(this.scale.x, this.scale.y);
			node.rotateTo(this.rotation.angle);

			node.selectableZone =
			new CGSGRegion(node.position.x, node.position.y, node.dimension.width, node.dimension.height);

			//all the events for the node
			node.onMouseOver = this.onMouseOver;
			node.onMouseOut = this.onMouseOut;
			node.onClick = this.onClick;
			node.onDblClick = this.onDblClick;
			node.onDrag = this.onDrag;
			node.onDragEnd = this.onDragEnd;
			node.onResize = this.onResize;
			node.onResizeEnd = this.onResizeEnd;
			node.onSelect = this.onSelect;
			node.onDeselect = this.onDeselect;

			node.computeAbsoluteMatrix(true);

			return node;
		}
	}
);