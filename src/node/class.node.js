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

"use strict";

/**
 * Base class for a Node in the Scene Graph.
 * Each node encapsulates its position, dimension, scale and rotation, ...
 * @class CGSGNode
 * @extends Object
 * @module Node
 * @main Node
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @type {CGSGNode}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGNode = CGSGObject.extend(
	{
		initialize: function (x, y, width, height) {

			/**
			 * The name of this nodes. Should be unique, but no control is done.
			 * @property name
			 * @default ""
			 * @type {String}
			 */
			this.name = "";
			/**
			 * Indicate whether this node is selected or not.
			 * Use CGSGScene::scenegraph.selectNode(nodeToSelect) to select a node
			 * @property isSelected
			 * @readonly
			 * @default false
			 * @type {Boolean}
			 */
			this.isSelected = false;
			/**
			 * The type of this class. Must be redefined by inherited classes
			 * @property classType
			 * @readonly
			 * @type {String}
			 */
			this.classType = "CGSGNODE";

			/**
			 * The 8 handleboxes that will be the resize handles
			 * the resize handles will be in this order:
			 *  0  1  2
			 *  3     4
			 *  5  6  7
			 * @property resizeHandles
			 * @readonly
			 * @type {Array}
			 */
			this.resizeHandles = [];

			/**
			 * Level of transparency of the node.
			 * @default 1.0
			 * @property globalAlpha
			 * @type {Number}
			 */
			this.globalAlpha = 1.0;
			/**
			 * Indicate if the node is visible (and so selectable) or not
			 * @property isVisible
			 * @default true
			 * @type {Boolean}
			 */
			this.isVisible = true;

			/**
			 * If true, the node will be proportionally resized
			 * @property isProportionalResize
			 * @type {Boolean}
			 */
			this.isProportionalResize = false;

			/**
			 * Define the method the detection (or "pick") method will be used for this node.
			 * Possible values CGSGPickNodeMethod.REGION and CGSGPickNodeMethod.GHOST.
			 *
			 * <ul>
			 *     <li>REGION : the detection returns true if the mouse cursor is inside the bounding box of the node</li>
			 *     <li>GHOST : the detection will use the "renderGhost" method of the node to achieve a more accurate detection</li>
			 * </ul>
			 *
			 * @property pickNodeMethod
			 * @default CGSGPickNodeMethod.REGION
			 * @type {CGSGPickNodeMethod}
			 */
			this.pickNodeMethod = CGSGPickNodeMethod.REGION;

			/**
			 * List of the children (empty if this nodes is a leaf)
			 * @property children
			 * @readonly
			 * @type {Array}
			 */
			this.children = [];

			/**
			 * The constraint region when moving the node
			 * @property regionConstraint
			 * @default null
			 * @type {null}
			 */
			this.regionConstraint = null;

			/**
			 * Pivot point to apply a rotation.
			 * The point is a value between [0, 0] and [1, 1].
			 * [0, 0] is the top left corner of the bounding box and [1, 1] the bottom right corner.
			 * @property rotationCenter
			 * @default null
			 * @type {CGSGPosition}
			 */
			this.rotationCenter = null;

			/**
			 * can be fulfilled by the developer to put in whatever he needs
			 * @property userdata
			 * @default null
			 * @type {*}
			 */
			this.userdata = null;

			/**
			 * selection attributes
			 * If true, this node is clickable and so will be checked by the pickNode function
			 * @property isClickable
			 * @default true
			 * @type {Boolean}
			 */
			this.isClickable = true;
			/**
			 * If true, this node can be resized by the user. In that case, the dimension property will be affected, not the scale one.
			 * @property isResizable
			 * @default false
			 * @type {Boolean}
			 */
			this.isResizable = false;
			/**
			 * If true, the node can be dragged by the user
			 * @property isDraggable
			 * @default false
			 * @type {Boolean}
			 */
			this.isDraggable = false;

			/**
			 * If true, the absolute matrix will be recomputed after each movement (and so in animation).
			 * Set it to false to gain performance if you don't need to keep trace of absolute position (no need to collision, picknode, ...)
			 * @property needToKeepAbsoluteMatrix
			 * @default true
			 * @type {Boolean}
			 */
			this.needToKeepAbsoluteMatrix = true;

			/**
			 * Color for the line around this node when selected
			 * @property selectionLineColor
			 * @default "#FF6890"
			 * @type {String}
			 */
			this.selectionLineColor = CGSG_DEFAULT_SELECTED_STROKE_COLOR;
			/**
			 * Width for the line around this node when selected
			 * @property selectionLineWidth
			 * @default 2
			 * @type {Number}
			 */
			this.selectionLineWidth = CGSG_DEFAULT_SELECTED_STROKE_SIZE;
			/**
			 * Color for the handle boxes around this node when selected
			 * @property selectionHandleSize
			 * @default 6
			 * @type {Number}
			 */
			this.selectionHandleSize = CGSG_DEFAULT_SELECTED_RESIZEHANDLE_SIZE;
			/**
			 * Color for the handle boxes around this node when selected
			 * @property selectionHandleColor
			 * @default "#9068FF""
			 * @type {String}
			 */
			this.selectionHandleColor = CGSG_DEFAULT_SELECTED_RESIZEHANDLE_COLOR;

			/**
			 * Updated by the scene itself. Don't update it manually.
			 * True if the mice is over the node, false otherwise
			 * @property isMouseOver
			 * @readonly
			 * @type {Boolean}
			 */
			this.isMouseOver = false;
			/**
			 * Updated by the scene itself. Don't update it manually.
			 * True if the node is being moved manually, false otherwise
			 * @property isMoving
			 * @readonly
			 * @type {Boolean}
			 */
			this.isMoving = false;
			/**
			 * Updated by the scene itself. Don't update it manually.
			 * True if the node is being resized manually, false otherwise
			 * @property isResizing
			 * @readonly
			 * @type {Boolean}
			 */
			this.isResizing = false;

			/**
			 * ID for the node. Should be filled by the developer. The framework will never use it.
			 * @property _id
			 * @type {Number}
			 * @private
			 */
			this._id = 0;
			/**
			 * parent of this node
			 * @property _parentNode
			 * @type {CGSGNode}
			 * @private
			 */
			this._parentNode = null;

			/**
			 * Relative position of this nodes on the canvas container, relatively to the position of its parent node.
			 * Never use it to move the node, use translateBy/translateWith/translateTo instead
			 * @readonly
			 * @property position
			 * @default CGSGPosition(0, 0)
			 * @type {CGSGPosition}
			 */
			this.position = new CGSGPosition(0, 0);
			/**
			 * Absolute position of this nodes on the canvas container. Generated value. Don't modify it manually
			 * Never use it to move the node, use translateBy/translateWith/translateTo instead
			 * @readonly
			 * @property _absolutePosition
			 * @private
			 * @type {CGSGPosition}
			 */
			this._absolutePosition = new CGSGPosition(0, 0);
			/**
			 * Dimension of this nodes on the canvas container
			 * Never use it to resize the node, use resizeBy/resizeWith/resizeTo instead
			 * @readonly
			 * @property dimension
			 * @default CGSGDimension(0, 0)
			 * @type {CGSGDimension}
			 */
			this.dimension = new CGSGDimension(0, 0);
			/**
			 * Relative scale of this nodes on the canvas container, relatively to the scale of its parent node.
			 * Never use it to scale or resize the node, use scaleBy/scaleWith/scaleTo instead
			 * @readonly
			 * @property scale
			 * @default CGSGScale(1, 1)
			 * @type {CGSGScale}
			 */
			this.scale = new CGSGScale(1, 1);
			/**
			 * Absolute scale of this nodes on the canvas container. Generated value. Don't modify it manually
			 * Never use it to scale the node, use scaleBy/scaleWith/scaleTo instead
			 * @readonly
			 * @property _absoluteScale
			 * @private
			 * @type {CGSGScale}
			 */
			this._absoluteScale = new CGSGScale(1, 1);
			/**
			 * Relative rotation of this nodes on the canvas container, relatively to the rotation of its parent node.
			 * Never use it to rotate or resize the node, use rotateBy/rotateWith/rotateTo instead
			 * @readonly
			 * @property rotation
			 * @default CGSGRotation(0)
			 * @type {CGSGRotation}
			 */
			this.rotation = new CGSGRotation(0);
			/**
			 * Absolute rotation of this nodes on the canvas container. Generated value. Don't modify it manually
			 * Never use it to rotate or resize the node, use rotateBy/rotateWith/rotateTo instead
			 * @readonly
			 * @private
			 * @property _absoluteRotation
			 * @type {CGSGRotation}
			 */
			this._absoluteRotation = new CGSGRotation(0);

			/**
			 * @property _isDrag
			 * @type {Boolean}
			 * @private
			 */
			this._isDrag = false;

			//this.selectableZone =
			//new CGSGRegion(this.position.x, this.position.y, this.dimension.width, this.dimension.height);

			/**
			 * true if this node is traversable (recursively) (ie : by the picknode, a traverser, ...)
			 * @property isTraversable
			 * @type {Boolean}
			 */
			this.isTraversable = true;

            /**
             * Indicate if this node is managed by the collision manager
             * @property isCollisionManaged
             * @type {Boolean}
             */
            this.isCollisionManaged = false;

			//initialize the position and dimension
			this.translateTo(x, y, true);
			this.resizeTo(width, height);

			// initialize the selection handleBoxes
			for (var i = 0; i < 8; i++) {
				var handleBox = new CGSGHandleBox(this, this.selectionHandleSize, this.selectionHandleColor,
												  this.selectionLineColor, this.selectionLineWidth, 0, 0);
				this.resizeHandles.push(handleBox);
			}

			/**
			 * Callback on mouse over the node
			 * @property onMouseOver
			 * @default null
			 * @type {function}
			 *
			 * @example
			 *  this.onMouseOver = function (event) {
			 *      event.node; //CGSGNode
			 *      event.position; //Array of CGSGPosition
			 *      event.event; //Event
			 *  }
			 */
			this.onMouseOver = null;
			/**
			 * Callback on mouse enter on the node
			 * @property onMouseEnter
			 * @default null
			 * @type {function}
			 *
			 * @example
			 *  this.onMouseEnter = function (event) {
			 *      event.node; //CGSGNode
			 *      event.position; //Array of CGSGPosition
			 *      event.event; //Event
			 *  }
			 */
			this.onMouseEnter = null;
			/**
			 * Callback on mouse out
			 * @property onMouseOut
			 * @default null
			 * @type {function}
			 *
			 * @example
			 *  this.onMouseOut = function (event) {
			 *      event.node; //CGSGNode
			 *      event.position; //Array of CGSGPosition
			 *      event.event; //Event
			 *  }
			 */
			this.onMouseOut = null;
			/**
			 * Callback on mouse up
			 * @property onMouseUp
			 * @default null
			 * @type {function}
			 *
			 * @example
			 *  this.onMouseUp = function (event) {
			 *      event.node; //CGSGNode
			 *      event.position; //Array of CGSGPosition
			 *      event.event; //Event
			 *  }
			 */
			this.onMouseUp = null;
			/**
			 * Callback on mouse or touch click
			 * @property onClick
			 * @default null
			 * @type {function}
			 *
			 * @example
			 *  this.onClick = function (event) {
			 *      event.node; //CGSGNode
			 *      event.position; //Array of CGSGPosition
			 *      event.event; //Event
			 *  }
			 */
			this.onClick = null;
			/**
			 * Callback on mouse or touch double click
			 * @property onDblClick
			 * @default null
			 * @type {function}
			 *
			 * @example
			 *  this.onDblClick = function (event) {
			 *      event.node; //CGSGNode
			 *      event.position; //Array of CGSGPosition
			 *      event.event; //Event
			 *  }
			 */
			this.onDblClick = null;
			/**
			 * Callback on drag this node
			 * @property onDrag
			 * @default null
			 * @type {function}
			 *
			 * @example
			 *  this.onDrag = function (event) {
			 *      event.node; //CGSGNode
			 *      event.position; //Array of CGSGPosition
			 *      event.event; //Event
			 *  }
			 */
			this.onDrag = null;
			/**
			 * Callback on end of drag this node
			 * @property onDragEnd
			 * @default null
			 * @type {function}
			 *
			 * @example
			 *  this.onDragEnd = function (event) {
			 *      event.node; //CGSGNode
			 *      event.position; //Array of CGSGPosition
			 *      event.event; //Event
			 *  }
			 */
			this.onDragEnd = null;
			/**
			 * Callback on resize this node
			 * @property onResize
			 * @default null
			 * @type {function}
			 *
			 * @example
			 *  this.onResize = function (event) {
			 *      event.node; //CGSGNode
			 *      event.position; //Array of CGSGPosition
			 *      event.event; //Event
			 *  }
			 */
			this.onResize = null;
			/**
			 * Callback on end resize this node
			 * @property onResizeEnd
			 * @default null
			 * @type {function}
			 *
			 * @example
			 *  this.onResizeEnd = function (event) {
			 *      event.node; //CGSGNode
			 *      event.position; //Array of CGSGPosition
			 *      event.event; //Event
			 *  }
			 */
			this.onResizeEnd = null;
			/**
			 * Callback on select this node
			 * @property onSelect
			 * @default null
			 * @type {function}
			 *
			 * @example
			 *  this.onSelect = function (event) {
			 *      event.node; //CGSGNode
			 *      event.position; //Array of CGSGPosition
			 *      event.event; //Event
			 *  }
			 */
			this.onSelect = null;
			/**
			 * Callback on deselect this node
			 * @property onDeselect
			 * @default null
			 * @type {function}
			 *
			 * @example
			 *  this.onDeselect = function (event) {
			 *      event.node; //CGSGNode
			 *      event.position; //Array of CGSGPosition
			 *      event.event; //Event
			 *  }
			 */
			this.onDeselect = null;

			this.computeAbsoluteMatrix(true);
		},

		/**
		 * return the relative region of this node
		 * @public
		 * @method getRegion
		 * @return {CGSGRegion}
		 */
		getRegion: function () {
			return new CGSGRegion(this.position.x, this.position.y, this.getWidth(), this.getHeight());
		},

		/**
		 * return the absolute region of this node
		 * @public
		 * @method getAbsoluteRegion
		 * @return {CGSGRegion}
		 */
		getAbsoluteRegion: function () {
			return new CGSGRegion(this.getAbsoluteLeft(), this.getAbsoluteTop(), this.getAbsoluteWidth(),
								  this.getAbsoluteHeight());
		},

		//// RENDERING MANIPULATION //////

		/**
		 * Wipes the canvas context
		 * @method _clearContext
		 * @param context
		 * @param canvasWidth
		 * @param canvasHeight
		 * @private
		 */
		_clearContext: function (context, canvasWidth, canvasHeight) {
			context.clearRect(0, 0, canvasWidth, canvasHeight);
		},

		/**
		 * Empty rendering function. Must be overrided by the inherited classes
		 * @method render
		 * @param {CanvasRenderingContext2D} context the context into render the node
		 * */
		render: function (context) {
			//save current state
			this.beforeRender(context);

			//restore state
			this.afterRender(context);
		},

		/**
		 * Empty ghost rendering function.
		 * Render here your custom nodes with a single color (cgsgGhostColor).
		 * This will be used by the SceneGraph to know if the mouse cursor is over this nodes.
		 *
		 * @method renderGhost
		 * @param ghostContext The context for the ghost rendering
		 */
		renderGhost: function (ghostContext) {
			//save current state
			this.beforeRenderGhost(ghostContext);

			//restore state
			this.afterRenderGhost(ghostContext);
		},

		/**
		 * Render the selection box and handle boxes around the bounding box of this node when selected
		 * @protected
		 * @method renderSelected
		 * @param {CanvasRenderingContext2D} context the context into render the node
		 * */
		renderSelected: function (context) {
			this._absolutePosition = this.getAbsolutePosition(false);
			this._absoluteScale = this.getAbsoluteScale(false);

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
					this.resizeHandles[i].fillColor = this.selectionHandleColor;
					this.resizeHandles[i].strokeColor = this.selectionLineColor;
					this.resizeHandles[i].lineWidth = this.selectionLineWidth;
					this.resizeHandles[i].render(context);
				}
			}
		},

		/**
		 * Must be called before to start the rendering of the nodes
		 * @protected
		 * @method beforeRender
		 * @param {CanvasRenderingContext2D} context the context into render the nodes
		 * */
		beforeRender: function (context) {
			//first save the current context state
			context.save();

			//move the context to the nodes's relative position
			context.translate(this.position.x, this.position.y);


            context.scale(this.scale.x, this.scale.y);

			// translate context to center of canvas
			if (cgsgExist(this.rotationCenter)) {
				context.translate(this.dimension.width * this.rotationCenter.x,
								  this.dimension.height * this.rotationCenter.y);
				context.rotate(this.rotation.angle);
				context.translate(-this.dimension.width * this.rotationCenter.x,
								  -this.dimension.height * this.rotationCenter.y);
			}
			else {
				context.rotate(this.rotation.angle);
			}
		},

		/**
		 * Must be called after a render
		 * @protected
		 * @method afterRender
		 * @param {CanvasRenderingContext2D} context the context into render the nodes
		 * */
		afterRender: function (context) {
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
		 * Must be called before begin to render the nodes in GHOST mode
		 * @protected
		 * @method beforeRenderGhost
		 * @param {CanvasRenderingContext2D} context the context into render the nodes
		 */
		beforeRenderGhost: function (context) {
			//first save the current context state
			context.save();
			//move the context to the nodes's relative position
			context.translate(this._absolutePosition.x, this._absolutePosition.y);
			context.rotate(this._absoluteRotation.angle);
			context.scale(this._absoluteScale.x, this._absoluteScale.y);
		},

		/**
		 * Must be called before begin to render
		 * @protected
		 * @method afterRenderGhost
		 * @param {CanvasRenderingContext2D} context the context into render the nodes
		 * */
		afterRenderGhost: function (context) {
			//restore the context state
			context.restore();
		},

		/**
		 * Mark this nodes as selected
		 * @method setSelected
		 * @param {Boolean} isSelected
		 * */
		setSelected: function (isSelected) {
			this.isSelected = isSelected;
			this._isDrag = true;

			if (isSelected && this.onSelect !== null) {
				this.onSelect({node: this});
			}
			else if (this.onDeselect !== null) {
				this.onDeselect({node: this});
			}
		},

		/**
		 * return this if this nodes is under the mice cursor
		 * Can be overrided by inherited klass to optimize this perform.
		 * This default function used the ghost rendering method
		 * @protected
		 * @method detectSelection
		 * @param {CGSGPosition} mousePosition A CGSGPosition object
		 * @param {CanvasRenderingContext2D} ghostContext
		 * @param {CGSGScale} absoluteScale
		 */
		detectSelection: function (mousePosition, ghostContext, absoluteScale) {

			if (this.pickNodeMethod == CGSGPickNodeMethod.REGION) {
				if (mousePosition.x >= this._absolutePosition.x
						&& mousePosition.x < this._absolutePosition.x + this.getWidth() * absoluteScale.x
						&& mousePosition.y >= this._absolutePosition.y
					&& mousePosition.y < this._absolutePosition.y + this.getHeight() * absoluteScale.y
					) {
					return this;
				}
			}
			else /*if (this.pickNodeMethod == CGSGPickNodeMethod.GHOST)*/ {
				// draw shape onto ghost context
				this.renderGhost(ghostContext);

				// get image data at the mouse x,y pixel
				var imageData = ghostContext.getImageData(mousePosition.x, mousePosition.y, 1, 1);

				cgsgClearContext(ghostContext);

				// if the mouse pixel exists, select this nodes
				if (imageData.data[0] != 0 || imageData.data[1] != 0 || imageData.data[2] != 0) {
					return this;
				}
			}

			return null;
		},

		/**
		 * return this if this nodes is under the region
		 * Can be overrided by inherited klass to optimize this perform.
		 * This default function used the ghost rendering method
		 * @protected
		 * @method detectSelectionInRegion
		 * @param {CGSGRegion} region The region to check
		 * @param {CanvasRenderingContext2D} ghostContext
		 * @param {CGSGScale} absoluteScale
		 */
		detectSelectionInRegion: function (region, ghostContext, absoluteScale) {

			if (this.pickNodeMethod == CGSGPickNodeMethod.REGION) {

				var us = this.getAbsoluteRegion();

				/*var cond1 = region.position.x + region.dimension.width < us.position.x;
				 var cond2 = region.position.x > us.position.x + us.dimension.width;
				 var cond3 = region.position.y + region.dimension.height < us.position.y;
				 var cond4 = region.position.y > us.position.y + us.dimension.height;

				 if (!(cond1 || cond2 || cond3 || cond4)) {
				 return this;
				 }  */

				//select this node only if it is totally inside the region
				if (cgsgRegionIsInRegion(us, region, 0)) {
					return this;
				}

			}
			else /*if (this.pickNodeMethod == CGSGPickNodeMethod.GHOST)*/ {
				// draw shape onto ghost context
				this.renderGhost(ghostContext);

				// get image data at the mouse x,y pixel
				var imageData = ghostContext.getImageData(region.position.x, region.position.y, region.dimension.width,
														  region.dimension.height);

				cgsgClearContext(ghostContext);

				// if the a pixel exists in the region then, select this node
				for (var i = 0, len = imageData.length; i < len; ++i) {
					if (imageData.data[i] != 0) {
						return this;
					}
				}
			}

			return null;
		},

		/**
		 * Check if this nodes is under the cursor position.
		 * @public
		 * @method pickNode
		 * @param {CGSGPosition} mousePosition position of the mouse on the canvas
		 * @param {CGSGScale} absoluteScale a CGSGScale absolute relativeScale of all parents
		 * @param {CanvasRenderingContext2D} ghostContext a copy of the canvas context
		 * @param {Boolean} recursively if false, don't traverse the children of this nodes
		 * @param {Function} condition Condition to be picked
		 * ie: "color=='yellow'" or "classType=='CGSGNodeImage' && this.globalAlpha>0.5"
		 */
		pickNode: function (mousePosition, absoluteScale, ghostContext, recursively, condition) {
			var selectedNode = null;
			var childAbsoluteScale = null;
			if (cgsgExist(absoluteScale)) {
				childAbsoluteScale = absoluteScale.copy();
				childAbsoluteScale.multiply(this.scale);
			}
			else {
				childAbsoluteScale = this.getAbsoluteScale(false);
			}

			if (this.isTraversable && (this.isClickable || this.isResizable || this.isDraggable)) {
				if (!cgsgExist(condition) || condition(this) === true) {
					this.computeAbsoluteMatrix(false);
					selectedNode =
					this.detectSelection(mousePosition, ghostContext, childAbsoluteScale);
				}
			}

			//traverse the children if asked
			if (this.isTraversable && recursively && !this.isALeaf()) {
				for (var i = this.children.length - 1; i >= 0; --i) {
					var childNode = this.children[i];
					var selectedChild = childNode.pickNode(mousePosition,
														   childAbsoluteScale, ghostContext,
														   recursively, condition);
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
		 * Return all nodes (Array) in the given region
		 * @public
		 * @method pickNodes
		 * @param {CGSGRegion} region of the canvas to check
		 * @param {CGSGScale} absoluteScale a CGSGScale absolute relativeScale of all parents
		 * @param {CanvasRenderingContext2D} ghostContext a copy of the canvas context
		 * @param {Boolean} recursively if false, don't traverse the children of this nodes
		 * @param {Function} condition Condition to be picked
		 * ie: "color=='yellow'" or "classType=='CGSGNodeImage' && this.globalAlpha>0.5"
		 */
		pickNodes: function (region, absoluteScale, ghostContext, recursively, condition) {
			var selectedNodes = [];

			var childAbsoluteScale = null;
			if (cgsgExist(absoluteScale)) {
				childAbsoluteScale = absoluteScale.copy();
				childAbsoluteScale.multiply(this.scale);
			}
			else {
				childAbsoluteScale = this.getAbsoluteScale(false);
			}

			if (this.isTraversable && (/*this.isClickable ||*/ this.isResizable || this.isDraggable)) {
				if (!cgsgExist(condition) || condition(this) === true) {
					this.computeAbsoluteMatrix(false);
					var selected = this.detectSelectionInRegion(region, ghostContext, childAbsoluteScale);
					if (cgsgExist(selected)) {
						selectedNodes.push(selected);
					}
				}
			}

			//traverse the children if asked
			if (this.isTraversable && recursively && !this.isALeaf()) {
				for (var i = this.children.length - 1; i >= 0; --i) {
					var childNode = this.children[i];
					var selectedChildren = childNode.pickNodes(region,
															   childAbsoluteScale, ghostContext,
															   recursively, condition);
					if (selectedChildren !== null && selectedChildren !== undefined) {
						selectedNodes = selectedNodes.concat(selectedChildren);
					}
				}

				childAbsoluteScale = null;
			}

			return selectedNodes;
		},

		/**
		 * Return true if this nodes has no child
		 * @method isALeaf
		 * */
		isALeaf: function () {
			return this.children.length <= 0;
		},

		//// TRANSFORMATION MANIPULATION //////

		/**
		 * Replace current relative position by this new one
		 * @method translateTo
		 * @param {Number} newRelativeX
		 * @param {Number} newRelativeY
		 * @param {Boolean} computeAbsoluteValue (default: true)
		 */
		translateTo: function (newRelativeX, newRelativeY, computeAbsoluteValue) {
			this.position.translateTo(newRelativeX, newRelativeY);
			if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
				this._absolutePosition = this.getAbsolutePosition(true);
			}
		},

		/**
		 * Add new coordinate to the current relative one
		 * @method translateWith
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Boolean} computeAbsoluteValue (default: true)
		 * */
		translateWith: function (x, y, computeAbsoluteValue) {
			this.position.translateWith(x, y);
			if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
				this._absolutePosition = this.getAbsolutePosition(true);
			}
		},

		/**
		 * Add new coordinate to the current relative one
		 * @method translateBy
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Boolean} computeAbsoluteValue (default: true)
		 * */
		translateBy: function (x, y, computeAbsoluteValue) {
			this.position.translateBy(x, y);
			if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
				this._absolutePosition = this.getAbsolutePosition(true);
			}
		},

		/**
		 * Replace current dimension by these new ones
		 * @method resizeTo
		 * @param {Number} newWidth
		 * @param {Number} newHeight
		 * */
		resizeTo: function (newWidth, newHeight) {
			this.dimension.resizeTo(newWidth, newHeight);
		},

		/**
		 * Multiply current dimension by these new ones
		 * @method resizeBy
		 * @param {Number} widthFactor
		 * @param {Number} heightFactor
		 * */
		resizeBy: function (widthFactor, heightFactor) {
			this.dimension.resizeBy(widthFactor, heightFactor);
		},

		/**
		 * Increase/decrease current dimension with adding values
		 * @method resizeWith
		 * @param {Number} width
		 * @param {Number} height
		 * */
		resizeWith: function (width, height) {
			this.dimension.resizeWith(width, height);
		},

		/**
		 * Replace current relative relativeScale by this new one
		 * @method scaleTo
		 * @param {Number} scaleX
		 * @param {Number} scaleY
		 * @param {Boolean} computeAbsoluteValue (default: true)
		 * */
		scaleTo: function (scaleX, scaleY, computeAbsoluteValue) {
			this.scale.x = scaleX;
			this.scale.y = scaleY;
			if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
				this._absoluteScale = this.getAbsoluteScale(true);
			}
		},

		/**
		 * Multiply this relativeScale factor by the current relative relativeScale
		 * @method scaleBy
		 * @param {Number} scaleFactorX
		 * @param {Number} scaleFactorY
		 * @param {Boolean} computeAbsoluteValue (default: true)
		 * */
		scaleBy: function (scaleFactorX, scaleFactorY, computeAbsoluteValue) {
			this.scale.x *= scaleFactorX;
			this.scale.y *= scaleFactorY;
			if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
				this._absoluteScale = this.getAbsoluteScale(true);
			}
		},

		/**
		 * Add to the current relative Scale
		 * @method scaleWith
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Boolean} computeAbsoluteValue (default: true)
		 * */
		scaleWith: function (x, y, computeAbsoluteValue) {
			this.scale.x += x;
			this.scale.y += y;
			if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
				this._absoluteScale = this.getAbsoluteScale(true);
			}
		},

		/**
		 * Replace current relative relativeRotation by this new oneScale
		 * @method rotateTo
		 * @param {Number} newAngle
		 * @param {Boolean} computeAbsoluteValue (default: true)
		 *
		 * */
		rotateTo: function (newAngle, computeAbsoluteValue) {
			this.rotation.rotateTo(newAngle);
			if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
				this._absoluteRotation = this.getAbsoluteRotation(true);
			}
		},

		/**
		 * Multiply this relativeScale factor by the current relative relativeScale
		 * @method rotateBy
		 * @param {Number} rotateFactor
		 * @param {Boolean} computeAbsoluteValue (default: true)
		 * */
		rotateBy: function (rotateFactor, computeAbsoluteValue) {
			this.rotation.rotateBy(rotateFactor);
			if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
				this._absoluteRotation = this.getAbsoluteRotation(true);
			}
		},

		/**
		 * Add this angle to the current relative relativeRotation
		 * @method rotateWith
		 * @param {Number} angle
		 * @param {Boolean} computeAbsoluteValue (default: true)
		 * */
		rotateWith: function (angle, computeAbsoluteValue) {
			this.rotation.rotateWith(angle);
			if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
				this._absoluteRotation = this.getAbsoluteRotation(true);
			}
		},

		//// CHILDREN MANIPULATION //////

		/**
		 * Add a new nodes into this one, at the end of the list
		 * @method addChild
		 * @param {CGSGNode} newNode the nodes to add as a child
		 * */
		addChild: function (newNode) {
			newNode._parentNode = this;
			this.children[this.children.length] = newNode;
		},

		/**
		 * Add a new nodes at a particular index in the list of children.
		 * If the index is too large, the nodes will be inserted at the end of the list
		 * @method addChildAt
		 * @param {CGSGNode} newNode the nodes to insert as a child
		 * @param {Number} index the position of the new child in the list
		 * */
		addChildAt: function (newNode, index) {
			if (index > this.children.length) {
				index = this.children.length;
			}

			for (var i = this.children.length; i >= index; --i) {
				this.children[i] = this.children[i - 1];
			}

			newNode._parentNode = this;
			this.children[index] = newNode;
		},

		/**
		 * Remove the child passed in parameter and delete it
		 * @method removeChild
		 * @param {CGSGNode} node the nodes to remove
		 * @param {Boolean} searchRecursively if true, search the nodes on all the tree from this nodes
		 * @return {Boolean} true if the child was correctly removed or false if the nodes was not found.
		 * */
		removeChild: function (node, searchRecursively) {
			var index = this.children.indexOf(node);

			if (index >= 0) {
				this.children.without(node);
				node.free();
				return true;
			}

			if (searchRecursively) {
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
		 * @method removeAll
		 * */
		removeAll: function () {
			/*for (var i = this.children.length; i >=0; --i) {
			 var childNode = this.children[i];
			 childNode.removeAll();
			 this.removeChild(childNode, true);
			 }*/

			this.free();
		},

		/**
		 * Detach the nodes in index 'index' without delete it. So it's not a child anymore
		 * @method detachChildAt
		 * @param {Number} index
		 */
		detachChildAt: function (index) {
			if (index >= 0 && index < this.children.length) {
				this.detachChild(this.children[index]);
			}
		},

		/**
		 * Detach the nodes without delete it. So it's not a child anymore
		 * @method detachChild
		 * @param {CGSGNode} childNode
		 */
		detachChild: function (childNode) {
			if (cgsgExist(childNode)) {
				childNode._parentNode = null;
				/*this.children = */
				this.children.without(childNode);
			}
		},

		/**
		 * Execute/Eval the script passed in parameter in "this" scope.
		 * Used to set new value to an attribute of a node
		 * @method evalSet
		 * @param {String} attribute The attribute to be changed
		 * @param {*} value The new value for the attribute
		 *
		 * @example node.evalSet("position.y", 12);
		 */
		evalSet: function (attribute, value) {
			//check for common properties to optimize performances
			if (attribute == "position.x") {
				this.translateTo(value, this.position.y, this.needToKeepAbsoluteMatrix);
			}
			else if (attribute == "position.y") {
				this.translateTo(this.position.x, value, this.needToKeepAbsoluteMatrix);
			}
			else if (attribute == "dimension.width") {
				this.resizeTo(value, this.dimension.height);
			}
			else if (attribute == "dimension.height") {
				this.resizeTo(this.dimension.width, value);
			}
			else if (attribute == "scale.x") {
				this.scaleTo(value, this.scale.y, this.needToKeepAbsoluteMatrix);
			}
			else if (attribute == "scale.y") {
				this.scaleTo(this.scale.x, value, this.needToKeepAbsoluteMatrix);
			}
			else if (attribute == "rotation" || attribute == "rotation.angle") {
				this.rotateTo(value, this.needToKeepAbsoluteMatrix);
			}
			else if (attribute == "globalAlpha") {
				this.globalAlpha = value;
			}
			else if (attribute == "isVisible") {
				this.isVisible = value;
			}
			else if (attribute == "rotationCenter.x") {
				this.rotationCenter.x = value;
			}
			else if (attribute == "rotationCenter.y") {
				this.rotationCenter.y = value;
			}
			else if (attribute == "color.r") {
				var rgb = CGSGColor.hex2rgb(this.color);
				this.color = CGSGColor.rgb2hex(value, rgb.g, rgb.b);
			}
			else if (attribute == "color.g") {
				var rgb = CGSGColor.hex2rgb(this.color);
				this.color = CGSGColor.rgb2hex(rgb.r, value, rgb.b);
			}
			else if (attribute == "color.b") {
				var rgb = CGSGColor.hex2rgb(this.color);
				this.color = CGSGColor.rgb2hex(rgb.r, rgb.g, value);
			}

			//generic property
			else {
				eval("this." + attribute + "=" + value);
			}

			/*if (this.needToKeepAbsoluteMatrix) {
			 if (attribute.indexOf("position") == 0) {
			 this._absolutePosition = this.getAbsolutePosition(true);
			 }
			 else if (attribute.indexOf("rotation") == 0) {
			 this._absoluteRotation = this.getAbsoluteRotation(true);
			 }
			 else if (attribute.indexOf("scale") == 0) {
			 this._absoluteScale = this.getAbsoluteScale(true);
			 }
			 }*/
		},

		/**
		 * Set the region inside which one this node ca be placed an can move
		 * @public
		 * @method setRegionConstraint
		 * @param {CGSGRegion} region a CGSGRegion relatively to this parent region. Can be null.
		 */
		setRegionConstraint: function (region) {
			this.regionConstraint = region;
		},

		/**
		 * @public
		 * @method getAbsolutePosition
		 * @return {CGSGPosition} the absolute positions of this node
		 */
		getAbsolutePosition: function (recursive) {
			var n = this;
			var translation = this.position.copy();
			while (n._parentNode !== null) {
				translation.multiply(n._parentNode.scale);
				n = n._parentNode;
			}

			if (this._parentNode !== null) {
				translation.add(this._parentNode.getAbsolutePosition(false));
			}

            if (recursive !== false) {
                for (var c = 0; c < this.children.length; c++) {
                    if (cgsgExist(this.children[c])) {
                        this.children[c]._absolutePosition = this.children[c].getAbsolutePosition(recursive);
                    }
                }
            }

			return translation;
		},

		/**
		 * @public
		 * @method getAbsoluteScale
		 * @return {CGSGScale} the absolute scale of this node
		 */
		getAbsoluteScale: function (recursive) {
			var n = this;
			var s = this.scale.copy();
			while (n._parentNode !== null) {
				s.multiply(n._parentNode.scale);
				n = n._parentNode;
			}

            if (recursive !== false) {
                for (var c = 0; c < this.children.length; c++) {
                    if (cgsgExist(this.children[c])) {
                        this.children[c]._absoluteScale = this.children[c].getAbsoluteScale(recursive);
                    }
                }
            }

			return s;
		},

		/**
		 * @public
		 * @method getAbsoluteRotation
		 * @return {CGSGRotation} the absolute rotation of this node
		 */
		getAbsoluteRotation: function (recursive) {
			var n = this;
			var r = this.rotation.copy();
			while (n._parentNode !== null) {
				r.add(n._parentNode.rotation.angle);
				n = n._parentNode;
			}

            if (recursive !== false) {
                for (var c = 0; c < this.children.length; c++) {
                    if (cgsgExist(this.children[c])) {
                        this.children[c]._absoluteRotation = this.children[c].getAbsoluteRotation(recursive);
                    }
                }
            }

			return r;
		},

		/**
		 * Compute the absolute position, rotation and scale in the canvas container
		 * @public
		 * @method computeAbsoluteMatrix
		 * @param {Boolean} recursive if !== false, compute recursively
		 * */
		computeAbsoluteMatrix: function (recursive) {
			this._absolutePosition = this.getAbsolutePosition(false);
			this._absoluteScale = this.getAbsoluteScale(false);
			this._absoluteRotation = this.getAbsoluteRotation(false);

			if (recursive !== false) {
				for (var c = 0; c < this.children.length; c++) {
					if (cgsgExist(this.children[c])) {
						this.children[c].computeAbsoluteMatrix(recursive);
					}
				}
			}
		},

		/**
		 * @method getAbsoluteLeft
		 * @return {Number}
		 */
		getAbsoluteLeft  : function () {
			return this._absolutePosition.x;
		},
		/**
		 * @method getAbsoluteRight
		 * @return {Number}
		 */
		getAbsoluteRight : function () {
			return this._absolutePosition.x + this.getAbsoluteWidth();
		},
		/**
		 * @method getAbsoluteTop
		 * @return {Number}
		 */
		getAbsoluteTop   : function () {
			return this._absolutePosition.y;
		},
		/**
		 * @method getAbsoluteBottom
		 * @return {Number}
		 */
		getAbsoluteBottom: function () {
			return this._absolutePosition.y + this.getAbsoluteHeight();
		},
		/**
		 * @method getAbsoluteWidth
		 * @return {Number}
		 */
		getAbsoluteWidth : function () {
			return this.getWidth() * this._absoluteScale.x;
		},
		/**
		 * @method getAbsoluteHeight
		 * @return {Number}
		 */
		getAbsoluteHeight: function () {
			return this.getHeight() * this._absoluteScale.y;
		},
		/**
		 * @method getWidth
		 * @return {Number}
		 */
		getWidth         : function () {
			return this.dimension.width;
		},
		/**
		 * @method getHeight
		 * @return {Number}
		 */
		getHeight        : function () {
			return this.dimension.height;
		},

		/**
         * Test if this node is colliding the node in parameter. Don't forget to add nodes to CGSGCollisionManager.
         *
		 * @public
		 * @method isColliding
		 * @return {Boolean} true if the 2 nodes are colliding. They are colliding if the distance between them is minus than the threshold parameter
		 * @param {CGSGNode} node a CGSGNode
		 * @param {Number} threshold space between the 2 nodes before considering they are colliding (in mode region)
		 */
		isColliding: function (node, threshold) {
            return cgsgCollisionManager.isColliding(this, node, threshold);
		},

		/**
		 * @public
		 * @method getListOfCollidingBrothers
		 * @return {Array} a Array of nodes this one is colliding with (can be empty)
		 * @param {Number} threshold space between the 2 nodes before considering they are colliding
		 */
		getListOfCollidingBrothers: function (threshold) {
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
		 * @method isCollidingABrother
		 * @param {Number} threshold space between the 2 nodes before considering they are colliding
		 * @return {Boolean} true if this node is colliding one of the other children of its parent node
		 */
		isCollidingABrother: function (threshold) {
			var brother = null;
			for (var n = 0; n < this._parentNode.children.length; n++) {
				brother = this._parentNode.children[n];
				if (brother !== this && this.isColliding(brother, threshold)) {
					return true;
				}
			}

			return false;
		},

		/*
		 * TODO : to be completed
		 * Return the list of lines going joigning nodes' peaks
		 * param onlyBrothers a Boolean. Default = true
		 * param threshold distance from which the detectection is done
		 * return an array of CGSGVector2D (can be empty)
		 */
		/*getMagneticLines : function(onlyBrothers, threshold) {
		 if (!cgsgExist(onlyBrothers)) {
		 onlyBrothers = true;
		 }

		 //compute vectors
		 var topVector = this.getAbsoluteTop();
		 var bottomVector = this.getAbsoluteBottom();
		 var leftVector = this.getAbsoluteLeft();
		 var rightVector = this.getAbsoluteRight();

		 //line = a point and a normalized CGSGVector2D (ie : [0, 1] or [1, 0])
		 var listOfLines = [];

		 var brother = null;
		 for (var n = 0; n < this._parentNode.children.length; n++) {
		 brother = this._parentNode.children[n];

		 //vectors v & v' are colinear if and only if xy’ - yx’ = 0.

		 }

		 return listOfLines;
		 },*/

		/**
		 * Must be overrided by inherited classes
		 * @method copy
		 * @param {CGSGNode} node
		 * @return {CGSGNode} a copy of this node
		 */
		copy: function (node) {
			if (node === null || node === undefined) {
				node = new CGSGNode(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
			}
			node.classType = this.classType;
			node.name = this.name;
			node.globalAlpha = this.globalAlpha;
			node.isVisible = this.isVisible;
			node.isProportionalResize = this.isProportionalResize;
			node.pickNodeMethod = this.pickNodeMethod;
			node.needToKeepAbsoluteMatrix = this.needToKeepAbsoluteMatrix;

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
			node._ghostColor = cgsgGhostColor;
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
		},

		/**
		 * free memory taken by this object and it's children.
		 * The 'userData' property won't be freed
		 * @method free
		 */
		free: function () {
			for (var c = this.children.length - 1; c >= 0; c--) {
				this.children[c].free();
			}

			this.children.clear();

			cgsgFree(this);
		}
	}
);