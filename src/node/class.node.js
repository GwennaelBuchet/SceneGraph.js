/*
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
 */

/**
 * Base class for a Node in the Scene Graph.
 * Each node encapsulates its position, dimension, scale and rotation, ...
 * @class CGSGNode
 * @extends CGSGObject
 * @module Node
 * @main Node
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @type {CGSGNode}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGNode = CGSGObject.extend(
		{
			initialize: function (x, y) {

				/**
				 * The name of this nodes. Should be unique, but no control is done.
				 * @property name
				 * @default ""
				 * @type {String}
				 */
				this.name = "";
				/**
				 * Indicate whether this node is selected or not.
				 * Use CGSGView::scenegraph.selectNode(nodeToSelect) to select a node
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
				 * @property handles
				 * @readonly
				 * @type {Array}
				 */
				this.handles = [];

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
				 * Set to true if the node can't be resized only in height or width
				 * @property isProportionalResizeOnly
				 * @default false
				 * @type {boolean}
				 */
				this.isProportionalResizeOnly = false;

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
				 * Node defining constraint region when moving the node
				 * @property nodeConstraint
				 * @default null
				 * @type {null}
				 */
				this.nodeConstraint = null;

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
				 * @property userData
				 * @default {} Empty object
				 * @type {*}
				 */
				this.userData = {};

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
				this.selectionLineColor = null;
				/**
				 * Width for the line around this node when selected
				 * @property selectionLineWidth
				 * @default 2
				 * @type {Number}
				 */
				this.selectionLineWidth = null;
				/**
				 * Color for the handle boxes around this node when selected
				 * @property handleSize
				 * @type {Number}
				 */
				this.handleSize = null;
				/**
				 * Color for the handle boxes around this node when selected
				 * @property handleColor
				 * @type {String}
				 */
				this.handleColor = null;

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

				this._isCached = false;
				//fake canvas to pre-render static display
				this._cacheCanvas = null;
				this._cacheCtx = null;

				/**
				 * @property shadowOffsetX
				 * @default 0
				 * @type {number}
				 */
				this.shadowOffsetX = 0;
				/**
				 * @property shadowOffsetY
				 * @default 0
				 * @type {number}
				 */
				this.shadowOffsetY = 0;
				/**
				 * @property shadowBlur
				 * @default 0
				 * @type {number}
				 */
				this.shadowBlur = 0;
				/**
				 * @property shadowColor
				 * @default "#333333"
				 * @type {string}
				 */
				this.shadowColor = "#333333";

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
				 * @property _absPos
				 * @private
				 * @type {CGSGPosition}
				 */
				this._absPos = new CGSGPosition(0, 0);
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
				 * @property _absSca
				 * @private
				 * @type {CGSGScale}
				 */
				this._absSca = new CGSGScale(1, 1);
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
				 * @property _absRot
				 * @type {CGSGRotation}
				 */
				this._absRot = new CGSGRotation(0);

				/**
				 * @property _isDrag
				 * @type {Boolean}
				 * @private
				 */
				this._isDrag = false;

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

				/**
				 * Callback on mouse over the node
				 * @property onMouseOver
				 * @default null
				 * @type {function}
				 *
				 * @example
				 *  this.onMouseOver = function (event) {
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
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
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
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
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
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
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
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
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
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
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
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
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
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
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
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
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
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
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
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
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
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
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
			 *  }
				 */
				this.onDeselect = null;

				/**
				 * Callback on when a child is removed
				 * @property onChildRemove
				 * @default null
				 * @type {function}
				 *
				 * @example
				 *  this.onDeselect = function (event) {
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
			 *  }
				 */
				this.onChildRemove = null;

				/**
				 * Callback before the node is rendered, children included
				 * @property onBeforeRender
				 * @default null
				 * @type {function}
				 * */
				this.onBeforeRender = null;
				/**
				 * Callback after the scene is rendered
				 * @property onAfterRender
				 * @default null
				 * @type {function}
				 * */
				this.onAfterRender = null;
				/**
				 * @property onAfterRenderStart
				 * @default null
				 * @type {function}
				 * */
				this.onAfterRenderStart = null;
				/**
				 * Callback fired while translating
				 * @property onTranslate
				 * @default null
				 * @type {function}
				 * */
				this.onTranslate = null;

				/**
				 * Threshold applied when detecting selection. Defalt value is picked from CGSG.globalDetectSelectionThreshold.
				 * Value could be changed after.
				 *
				 * @property detectSelectionThreshold
				 * @type {Number}
				 * @example
				 * var n = new CGSGNode(10, 10);
				 * n.detectSelectionThreshold = 10; // node will be picked in an area [0, 0, 30, 30] (x, y, w, h)
				 */
				this.detectSelectionThreshold = CGSG.globalDetectSelectionThreshold;

				/**
				 * Array of colors to fill the background of the node. Will be overrided with CSS content.
				 * CGSGNode extensions should (but not mandatory) use this attribute
				 *
				 * CSS managed.
				 * @property bkgcolors
				 * @type {Array}
				 */
				this.bkgcolors = [];

				/**
				 * Color to stroke the node. Will be overrided with CSS content
				 * CGSGNode extensions should (but not mandatory) use this attribute as the stroke color for their node
				 *
				 * CSS managed.
				 * @property lineColor
				 * @type {String}
				 */
				this.lineColor = null;
				/**
				 * Width of the line that stroke the node. Will be overrided with CSS content.
				 * CGSGNode extensions should (but not mandatory) use this attribute as the strokeWidth for their node
				 * Let 0 if you don't want to stroke the node.
				 *
				 * CSS managed.
				 * @property lineWidth
				 * @default 0
				 * @type {Number}
				 */
				this.lineWidth = 0;

				/**
				 * Corner radius. Used by only few official nodes and maybe by some community's nodes.
				 *
				 * CSS managed.
				 *
				 * @property borderRadius
				 * @type {number}
				 * @default 0
				 */
				this.borderRadius = 0;

				this._cls = [];
				this._clsBBox = null;
				this.setClass("cgsgnode");
				this.setClassBBox("cgsgnode-bbox");

				//initialize the position and dimension
				this.translateTo(x, y, true);
				this.resizeTo(0, 0);

				/**
				 * Set to true if dimension of the node is not the original one anymore
				 * @property _isDimensionChanged
				 * @default false
				 * @private
				 */
				this._isDimensionChanged = false;

				// initialize the selection handleBoxes
				for (var i = 0; i < 8; i++) {
					var handleBox = new CGSGHandleBox(this, this.handleSize, this.handleColor,
					                                  this.selectionLineColor, this.selectionLineWidth, 0, 0);
					this.handles.push(handleBox);
				}

				this.computeAbsoluteMatrix(true);
			},

			/**
			 * @method moveLocalZIndex
			 * @param s {Number} step
			 */
			moveLocalZIndex: function (s) {
				var i = this.getLocalZIndex();

				if (!isNaN(i)) {
					this.setLocalZIndex(this.getLocalZIndex() + s);
				}
			},

			/**
			 * @method setLocalZIndex
			 * @param i {Number} index
			 */
			setLocalZIndex: function (i) {
				if (cgsgExist(this._parentNode)) {
					i = Math.max(0, Math.min(CGSGMath.fixedPoint(i), this._parentNode.children.length - 1));

					var n = this.getLocalZIndex();
					var p = this._parentNode;

					if (i != n) {
						p.detachChild(this);
						p.addChildAt(this, i);
					}
				}
			},

			setLocalZIndexToLast: function () {
				this.setLocalZIndex(this._parentNode.children.length - 1);
			},

			getLocalZIndex: function () {
				if (!cgsgExist(this._parentNode)) {
					return NaN;
				}

				return this._parentNode.children.indexOf(this);
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
				return new CGSGRegion(this.getAbsLeft(), this.getAbsTop(), this.getAbsWidth(),
				                      this.getAbsHeight());
			},

			//// RENDERING MANIPULATION //////

			/**
			 * Wipes the canvas context
			 * @method _clearContext
			 * @param c {?} context
			 * @param w {Number} canvasWidth
			 * @param h {Number} canvasHeight
			 * @private
			 */
			_clearContext: function (c, w, h) {
				c.clearRect(0, 0, w, h);
			},

			/**
			 * Use this method to make the node precomputed or not.
			 * If it's precomputed, it won't be redraw every frame, but only when the "invalidate" method is called.
			 * @method setPrecomputed
			 * @param p {Boolean} isPrecomputed
			 */
			setPrecomputed: function (p) {
				this._isCached = p;
				this.invalidate();
			},

			/**
			 * Force the redraw of the node if it's precomputed
			 * @method invalidate
			 */
			invalidate: function () {
				if (this._isCached) {
					this._preCompute();
				}
			},

			/**
			 * Reload theme (colors, ...) from loaded CSS file
			 * To be overrided
			 * @method invalidateTheme
			 *
			 */
			invalidateTheme: function () {

				//Use of "this._cls" class names which define the current CSS classes used by this object.
				var fs = CGSG.cssManager.getAttrInArray(this._cls, "background");//"background-color");
				var lw = CGSG.cssManager.getAttrInArray(this._cls, "border-width");
				var ss = CGSG.cssManager.getAttrInArray(this._cls, "border-color");
				var a = CGSG.cssManager.getFloat(CGSG.cssManager.getAttrInArray(this._cls, "opacity"));
				var r = CGSG.cssManager.getNumber(CGSG.cssManager.getAttrInArray(this._cls, "border-radius"));

				if (cgsgExist(r)) {
					this.borderRadius = r;
				}

				var rgb;

				if (cgsgExist(fs)) {
					//value is given as "rgb(xx, yy, zz)". Let's convert it to hex
					rgb = CGSGColor.fromString(fs);
					if (cgsgExist(rgb.r) && cgsgExist(rgb.g) && cgsgExist(rgb.b)) {
						this.bkgcolors[0] = CGSGColor.rgb2hex(rgb.r, rgb.g, rgb.b);
					}
					else {
						//value is given as "linear-gradient(rgb(150, 150, 150), rgb(127, 127, 127))".
						// Let's convert it to 2 hex.
						var srgb1 = fs.substring(fs.indexOf("rgb"), fs.indexOf(")") + 1);
						var srgb2 = fs.substring(fs.lastIndexOf("rgb"), fs.lastIndexOf(")"));
						var rgb1 = CGSGColor.fromString(srgb1);
						var rgb2 = CGSGColor.fromString(srgb2);
						this.bkgcolors[0] = CGSGColor.rgb2hex(rgb1.r, rgb1.g, rgb1.b);
						this.bkgcolors[1] = CGSGColor.rgb2hex(rgb2.r, rgb2.g, rgb2.b);
					}

				}
				if (cgsgExist(lw)) {
					this.lineWidth = CGSG.cssManager.getNumber(lw);
				}
				if (cgsgExist(ss)) {
					this.lineColor = ss;
				}

				//avoid to override previous value if no one was defined
				if (cgsgExist(a)) {
					this.globalAlpha = a;
				}

				if (cgsgExist(this._clsBBox)) {
					var sc = CGSG.cssManager.getAttr(this._clsBBox, "background-color");
					var sw = CGSG.cssManager.getNumber(CGSG.cssManager.getAttr(this._clsBBox, "border-width"));
					var slc = CGSG.cssManager.getAttr(this._clsBBox, "outline-color");
					var slw = CGSG.cssManager.getNumber(CGSG.cssManager.getAttr(this._clsBBox, "outline-width"));

					if (cgsgExist(sc)) {
						this.handleColor = sc;
					}
					if (cgsgExist(sw)) {
						this.handleSize = sw;
					}
					if (cgsgExist(slc)) {
						this.selectionLineColor = slc;
					}
					if (cgsgExist(slw)) {
						this.selectionLineWidth = slw;
					}
				}
			},

			/**
			 * Set CSS class for this node (not for bounding box, use 'setClassBBox' instead).
			 * CSS class must define attributes used by this node.
			 * @method setClass
			 * @param {String} cls
			 */
			setClass: function (cls) {
				this._cls = [];
				this._cls.push(cls);
				this.invalidateTheme();
			},

			/**
			 * Add CSS class for this node (not for bounding box, use 'setClassBBox' instead).
			 * CSS class must define attributes used by this node.
			 * @method addClass
			 * @param {String} cls
			 */
			addClass: function (cls) {
				this._cls.push(cls);
				this.invalidateTheme();
			},

			/**
			 * remove CSS class for this node (not for bounding box, use 'setClassBBox' instead).
			 * @method removeClass
			 * @param {String} cls
			 */
			removeClass: function (cls) {
				this._cls = this._cls.without(cls);
				this.invalidateTheme();
			},

			/**
			 * Set CSS class for the bounding box of this node (not for node itself, use 'setClass' instead).
			 * CSS class must define attributes used by BBox.
			 * @method setClassBBox
			 * @param {String} cls
			 */
			setClassBBox: function (cls) {
				this._clsBBox = cls;
				this.invalidateTheme();
			},

			/**
			 * @method _applyShadow
			 * @param c {CanvasRenderingContext2D}
			 * @private
			 */
			_applyShadow: function (c) {
				if (this.shadowOffsetX !== 0 || this.shadowOffsetY !== 0) {
					c.shadowOffsetX = this.shadowOffsetX;
					c.shadowOffsetY = this.shadowOffsetY;
					c.shadowBlur = this.shadowBlur;
					c.shadowColor = this.shadowColor;
				}
			},

			/**
			 * @method _preCompute
			 * @private
			 */
			_preCompute: function () {
				if (!cgsgExist(this._cacheCanvas)) {
					this._cacheCanvas = document.createElement('canvas');
					this._cacheCtx = this._cacheCanvas.getContext('2d');
				}
				//this._cacheCanvas.width = this.getWidth() + this.shadowOffsetX; //CGSG.canvas.width;
				//this._cacheCanvas.height = this.getHeight() + this.shadowOffsetY; //CGSG.canvas.height;
				cgsgClearContext(this._cacheCtx);

				this._applyShadow(this._cacheCtx);
				this.render(this._cacheCtx);
			},

			/**
			 * internal method of the framework that encapsulate all the work aroud the rendering method
			 * @method doRender
			 * @param c {CanvasRenderingContext2D} context
			 * @param t {Boolean} isThemeInvalidated
			 */
			doRender: function (c, t) {
				if (t) {
					this.invalidateTheme();
				}

				var ctx = c;

				var startEvt = new CGSGEvent(this, {context: c});

				if (cgsgExist(this.onBeforeRender)) {
					CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_BEFORE_RENDER, startEvt);
					ctx = startEvt.data.context;
					//this.onBeforeRender({context: context});
				}

				//save current state
				this.beforeRender(ctx);

				if (this.globalAlpha > 0) {
					ctx.globalAlpha = this.globalAlpha;

					if (this._isCached) {
						//render the pre-rendered canvas
						ctx.drawImage(this._cacheCanvas, 0, 0);
					}
					else {
						if (!cgsgExist(this.bkgcolors[1])) {
							ctx.fillStyle = this.bkgcolors[0];
						}
						else {
							var gradient = ctx.createLinearGradient(0, 0, 0, this.dimension.height);
							for (var i = 0, len = this.bkgcolors.length; i < len; i++) {
								gradient.addColorStop(i, this.bkgcolors[i]);
							}
							ctx.fillStyle = gradient;
						}

						if (this.lineWidth > 0) {
							ctx.strokeStyle = this.lineColor;
							ctx.lineWidth = this.lineWidth;
						}

						this._applyShadow(ctx);
						this.render(ctx);
					}
				}

				if (!CGSG.isBoundingBoxOnTop && this.isSelected) {
					this.renderBoundingBox(ctx);
				}

				var endEvt = new CGSGEvent(this, {context: ctx});

				//restore state
				this.afterRender(endEvt.data.context, t);

				if (cgsgExist(this.onAfterRender)) {
					CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_AFTER_RENDER, endEvt);
					ctx = endEvt.data.context;
					//this.onAfterRender({context: c});
				}

			},

			/**
			 * Empty rendering function. Must be overrided by the inherited classes
			 * @method render
			 * @param {CanvasRenderingContext2D} context the context into render the node
			 * */
			render: function (context) {
			},

			/**
			 * internal method of the framework that encapsulate all the work around the ghost rendering method
			 * @method doRenderGhost
			 * @param c {CanvasRenderingContext2D} ghost Context
			 */
			doRenderGhost: function (c) {
				//save current state
				this.beforeRenderGhost(c);

				if (this.globalAlpha > 0) {
					if (this._isCached) {
						//render the pre-rendered canvas
						c.drawImage(this._cacheCanvas, 0, 0);
					}
					else {
						c.fillStyle = this.bkgcolors[0];

						if (this.lineWidth > 0) {
							c.strokeStyle = this.lineColor;
							c.lineWidth = this.lineWidth;
						}

						this.renderGhost(c);
					}
				}

				//restore state
				this.afterRenderGhost(c);
			},

			/**
			 * Empty ghost rendering function.
			 * Render here your custom nodes with a single color (CGSG.ghostColor).
			 * This will be used by the SceneGraph to know if the mouse cursor is over this nodes.
			 *
			 * @method renderGhost
			 * @param ghostCtx {CanvasRenderingContext2D} The context for the ghost rendering
			 */
			renderGhost: function (ghostCtx) {
				this.render(ghostCtx);
			},

			/**
			 * Render the selection box and handle boxes around the bounding box of this node when selected
			 * @protected
			 * @method renderBoundingBox
			 * @param c {CanvasRenderingContext2D} context the context into render the node
			 * */
			renderBoundingBox: function (c) {
				//this.computeAbsoluteMatrix(true);

				var w = this.getWidth(), h = this.getHeight();

				if (cgsgExist(this.selectionLineWidth) && this.selectionLineWidth > 0) {
					c.strokeStyle = this.selectionLineColor;

					c.lineWidth = this.selectionLineWidth / this._absSca.y;
					c.beginPath();
					//top line
					c.moveTo(0, 0);
					c.lineTo(w, 0);
					//bottom line
					c.moveTo(0, h);
					c.lineTo(w, h);
					c.stroke();
					c.closePath();

					c.lineWidth = this.selectionLineWidth / this._absSca.x;
					c.beginPath();
					//left line
					c.moveTo(0, 0);
					c.lineTo(0, h);
					//right line
					c.moveTo(w, 0);
					c.lineTo(w, h);
					c.stroke();
					c.closePath();
				}

				//draw the resize handles
				if (this.isResizable) {
					// draw the handle boxes
					var hx = this.handleSize / (2 * this._absSca.x);
					var hy = this.handleSize / (2 * this._absSca.y);

					// 0  1  2
					// 3     4
					// 5  6  7

					// top left, middle, right
					this.handles[0].translateTo(-hx, -hy);
					this.handles[1].translateTo(w / 2 - hx, -hy);
					this.handles[2].translateTo(w - hx, -hy);

					// middle left
					this.handles[3].translateTo(-hx, h / 2 - hy);

					// middle right
					this.handles[4].translateTo(w - hx, h / 2 - hy);

					// bottom left, middle, right
					this.handles[6].translateTo(w / 2 - hx, h - hy);
					this.handles[5].translateTo(-hx, h - hy);
					this.handles[7].translateTo(w - hx, h - hy);

					if (this.isProportionalResizeOnly) {
						this.handles[1].isVisible = false;
						this.handles[3].isVisible = false;
						this.handles[4].isVisible = false;
						this.handles[6].isVisible = false;
					}

					var i;
					for (i = 0; i < 8; i++) {
						this.handles[i].size = this.handleSize;
						this.handles[i].fillColor = this.handleColor;
						this.handles[i].strokeColor = this.selectionLineColor;
						this.handles[i].lineWidth = this.selectionLineWidth;
						this.handles[i].render(c);
					}
				}
			},

			/**
			 * Must be called before to start the rendering of the nodes
			 * @protected
			 * @method beforeRender
			 * @param c {CanvasRenderingContext2D} context the context into render the nodes
			 * */
			beforeRender: function (c) {
				//first save the current c state
				c.save();

				//move the c to the nodes's relative position
				c.translate(this.position.x, this.position.y);
				c.scale(this.scale.x, this.scale.y);

				// translate c to center of canvas
				if (cgsgExist(this.rotationCenter)) {
					c.translate(this.dimension.width * this.rotationCenter.x,
					            this.dimension.height * this.rotationCenter.y);
					c.rotate(this.rotation.angle);
					c.translate(-this.dimension.width * this.rotationCenter.x,
					            -this.dimension.height * this.rotationCenter.y);
				}
				else {
					c.rotate(this.rotation.angle);
				}

				if (this.onBeforeRenderEnd) {
					CGSG.eventManager.dispatch(this, cgsgEventTypes.BEFORE_RENDER_END,
					                           new CGSGEvent(this, {c: c}));
				}
			},

			/**
			 * Must be called after a render
			 * @protected
			 * @method afterRender
			 * @param c {CanvasRenderingContext2D} The context into render the nodes
			 * @param t {Boolean} isThemeInvalidated true if you need to reload theme for children of this node
			 * */
			afterRender: function (c, t) {
				if (cgsgExist(this.onAfterRenderStart)) {
					CGSG.eventManager.dispatch(this, cgsgEventTypes.AFTER_RENDER_START,
					                           new CGSGEvent(this, {context: c}));
				}

				//render all children
				if (!this.isALeaf()) {
					//draw children
					for (var i = 0, len = this.children.length; i < len; ++i) {
						var childNode = this.children[i];
						if (childNode.isVisible) {
							childNode.doRender(c, t);
						}
					}
				}

				//restore the context state
				c.restore();
			},

			/**
			 * Must be called before begin to render the nodes in GHOST mode
			 * @protected
			 * @method beforeRenderGhost
			 * @param c {CanvasRenderingContext2D} context the context into render the nodes
			 */
			beforeRenderGhost: function (c) {
				//first save the current context state
				c.save();
				//move the context to the nodes's relative position
				c.translate(this._absPos.x, this._absPos.y);
				c.rotate(this._absRot.angle);
				c.scale(this._absSca.x, this._absSca.y);
			},

			/**
			 * Must be called before begin to render
			 * @protected
			 * @method afterRenderGhost
			 * @param c {CanvasRenderingContext2D} context the context into render the nodes
			 * */
			afterRenderGhost: function (c) {
				//restore the context state
				c.restore();
			},

			/**
			 * Mark this nodes as selected
			 * @method setSelected
			 * @param s {Boolean} is Selected
			 * */
			setSelected: function (s) {
				this.isSelected = s;
				this._isDrag = true;

				if (s && this.onSelect !== null) {
					//this.onSelect({node: this});
					CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SELECT, new CGSGEvent(this, {node: this}));
				}
				else if (this.onDeselect !== null) {
					CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_DESELECT, new CGSGEvent(this, {node: this}));
					//this.onDeselect({node: this});
				}
			},

			/**
			 * Returns a region which represents the total surface covered by this node and its children too.
			 * @protected
			 * @method getCompleteRegion
			 * @return {CGSGRegion}
			 */
			getCompleteRegion: function () {
				return new CGSGRegion(this.getMinAbsoluteLeft(), this.getMinAbsoluteTop(), this.getMaxAbsoluteRight(),
				                      this.getMaxAbsoluteBottom());
			},

			/**
			 * Returns a position which represents the lowest position covered between this node and its children too.
			 * @protected
			 * @method getCompletePosition
			 * @return {CGSGPosition}
			 */
			getCompletePosition: function () {
				return new CGSGPosition(this.getMinAbsoluteLeft(), this.getMinAbsoluteTop());
			},

			/**
			 * Returns a position which represents the highest dimension covered between this node and its children too.
			 * @protected
			 * @method getCompleteDimension
			 * @return {CGSGDimension}
			 */
			getCompleteDimension: function () {
				return new CGSGDimension(this.getMaxAbsoluteRight(), this.getMaxAbsoluteBottom());
			},

			/**
			 * return this if this nodes is under the mice cursor
			 * Can be overrided by inherited klass to optimize this perform.
			 * This default function used the ghost rendering method
			 * @protected
			 * @method detectSelection
			 * @param pos {CGSGPosition} mousePosition A CGSGPosition object
			 * @param c {CanvasRenderingContext2D} ghost Context
			 * @param s {CGSGScale} absoluteScale
			 */
			detectSelection: function (pos, c, s) {
				if (this.pickNodeMethod == CGSGPickNodeMethod.REGION) {
					if (pos.x >= this._absPos.x - this.detectSelectionThreshold
						    &&
						pos.x <
						this._absPos.x + this.detectSelectionThreshold + this.getWidth() * s.x
						    && pos.y >= this._absPos.y - this.detectSelectionThreshold
						&&
						pos.y <
						this._absPos.y + this.detectSelectionThreshold + this.getHeight() * s.y
						) {
						return this;
					}
				}
				else /*if (this.pickNodeMethod == CGSGPickNodeMethod.GHOST)*/ {

					//todo: is this node is in cache, so check if there is a painted pixel at x,y from getImageData()

					// draw shape onto ghost context
					this.doRenderGhost(c);

					// get image data at the mouse x,y pixel
					var id = c.getImageData(pos.x, pos.y, 1, 1);

					cgsgClearContext(c);

					// if the mouse pixel exists, select this nodes
					if (id.data[0] != 0 || id.data[1] != 0 || id.data[2] != 0) {
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
			 * @param rg {CGSGRegion} region The region to check
			 * @param c {CanvasRenderingContext2D} ghostContext
			 */
			detectSelectionInRegion: function (rg, c) {

				//if (this.pickNodeMethod == CGSGPickNodeMethod.REGION) {

				var us = this.getAbsoluteRegion();
				//select this node only if it is totally inside the region
				if (cgsgRegionIsInRegion(us, rg, 0)) {
					return this;
				}

				/*}
				 else { //if (this.pickNodeMethod == CGSGPickNodeMethod.GHOST) {
				 // draw shape onto ghost context
				 this.doRenderGhost(c);

				 // get image data at the mouse x,y pixel
				 if (!rg.isEmpty()) {
				 var id = c.getImageData(rg.position.x, rg.position.y, rg.dimension.width, rg.dimension.height);

				 cgsgClearContext(c);

				 var len = id.data.length;
				 var count = 0;
				 // if the a pixel exists in the region then, select this node
				 for (var i = 0 ; i < len ; i += 4) {
				 if (id.data[i] != 0 || id.data[i + 1] != 0 || id.data[i + 2] != 0) {
				 count += 4;
				 //return this;
				 }
				 }
				 if (count >= len)
				 return this;
				 }
				 }*/

				return null;
			},

			/**
			 * Check if this nodes is under the cursor position.
			 * @public
			 * @method pickNode
			 * @param pos {CGSGPosition} mousePosition position of the mouse on the canvas
			 * @param absSca {CGSGScale} absoluteScale a CGSGScale absolute relativeScale of all parents
			 * @param c {CanvasRenderingContext2D} ghostContext a copy of the canvas context
			 * @param {Boolean} recursively if false, don't traverse the children of this nodes
			 * @param {Function} condition Condition to be picked
			 * ie: "color=='yellow'" or "classType=='CGSGNodeImage' && this.globalAlpha>0.5"
			 */
			pickNode: function (pos, absSca, c, recursively, condition) {
				var selectedNode = null;
				var childAbsoluteScale = null;
				if (cgsgExist(absSca)) {
					childAbsoluteScale = absSca.multiply(this.scale);
				}
				else {
					childAbsoluteScale = this.getAbsoluteScale(false);
				}

				if (this.isTraversable && (this.isClickable || this.isResizable || this.isDraggable)) {
					if (!cgsgExist(condition) || condition(this) === true) {
						this.computeAbsoluteMatrix(false);

						// First of all, try to to see if resize handler has been picked
						if (this.isSelected && this.isResizable) {
							for (var h = 0; h < 8; h++) {
								var selectionHandle = this.handles[h];

								if (selectionHandle.checkIfSelected(pos, CGSG.resizeHandleThreshold)) {
									return this;
								}
							}
						}

						selectedNode =
						this.detectSelection(pos, c, childAbsoluteScale);
					}
				}

				//traverse the children if asked
				if (this.isTraversable && recursively && !this.isALeaf()) {
					for (var i = this.children.length - 1; i >= 0; --i) {
						var childNode = this.children[i];
						var selectedChild = childNode.pickNode(pos,
						                                       childAbsoluteScale, c,
						                                       recursively, condition);
						if (cgsgExist(selectedChild)) {
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

				//if (region.dimension.width == 0 && region.dimension.height == 0)
				if (region.isEmpty()) {
					return selectedNodes;
				}

				var childAbsoluteScale = null;
				if (cgsgExist(absoluteScale)) {
					childAbsoluteScale = absoluteScale.multiply(this.scale);
				}
				else {
					childAbsoluteScale = this.getAbsoluteScale(false);
				}

				if (this.isTraversable && (/*this.isClickable ||*/ this.isResizable || this.isDraggable)) {
					if (!cgsgExist(condition) || condition(this) === true) {
						this.computeAbsoluteMatrix(false);
						var selected = this.detectSelectionInRegion(region, ghostContext);
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
			 * @param {Number} x
			 * @param {Number} y
			 * @param {Boolean} computeAbsoluteValue (default: true)
			 */
			translateTo: function (x, y, computeAbsoluteValue) {
				this.position.translateTo(x, y);
				if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
					this._absPos = this.getAbsolutePosition(true);
				}

				if (cgsgExist(this.onTranslate)) {
					CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_TRANSLATE, new CGSGEvent(this, null));
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
					this._absPos = this.getAbsolutePosition(true);
				}

				if (cgsgExist(this.onTranslate)) {
					CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_TRANSLATE, new CGSGEvent(this, null));
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
					this._absPos = this.getAbsolutePosition(true);
				}

				if (cgsgExist(this.onTranslate)) {
					CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_TRANSLATE, new CGSGEvent(this, null));
				}
			},

			/**
			 * Replace current dimension by these new ones
			 * @method resizeTo
			 * @param {Number} w
			 * @param {Number} h
			 * */
			resizeTo: function (w, h) {
				this.dimension.resizeTo(w, h);
				this._endResize();
			},

			/**
			 * Multiply current dimension by these new ones
			 * @method resizeTBy
			 * @param {Number} wf
			 * @param {Number} hf
			 * */
			resizeBy: function (wf, hf) {
				this.dimension.resizeBy(wf, hf);
				this._endResize();
			},

			/**
			 * Increase/decrease current dimension with adding values
			 * @method resizeWith
			 * @param {Number} w
			 * @param {Number} h
			 * */
			resizeWith: function (w, h) {
				this.dimension.resizeWith(w, h);
				this._endResize();
			},

			_endResize: function () {
				this._isDimensionChanged = true;
				this.invalidate();
				if (cgsgExist(this.onResize)) {
					CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_RESIZE, new CGSGEvent(this, {node: this}));
				}
			},

			/**
			 * Replace current relative relativeScale by this new one
			 * @method scaleTo
			 * @param {Number} sx
			 * @param {Number} sy
			 * @param {Boolean} computeAbsoluteValue (default: true)
			 * */
			scaleTo: function (sx, sy, computeAbsoluteValue) {
				this.scale.x = sx;
				this.scale.y = sy;
				if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
					this._absSca = this.getAbsoluteScale(true);
				}

				if (cgsgExist(this.onScale)) {
					CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SCALE, new CGSGEvent(this, {node: this}));
				}
			},

			/**
			 * Multiply this relativeScale factor by the current relative relativeScale
			 * @method scaleBy
			 * @param {Number} sfx
			 * @param {Number} sfy
			 * @param {Boolean} computeAbsoluteValue (default: true)
			 * */
			scaleBy: function (sfx, sfy, computeAbsoluteValue) {
				this.scale.x *= sfx;
				this.scale.y *= sfy;
				if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
					this._absSca = this.getAbsoluteScale(true);
				}

				if (cgsgExist(this.onScale)) {
					CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SCALE, new CGSGEvent(this, {node: this}));
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
					this._absSca = this.getAbsoluteScale(true);
				}

				if (cgsgExist(this.onScale)) {
					CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SCALE, new CGSGEvent(this, {node: this}));
				}
			},

			/**
			 * Replace current relative relativeRotation by this new oneScale
			 * @method rotateTo
			 * @param {Number} a
			 * @param {Boolean} computeAbsoluteValue (default: true)
			 *
			 * */
			rotateTo: function (a, computeAbsoluteValue) {
				this.rotation.rotateTo(a);
				if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
					this._absRot = this.getAbsoluteRotation(true);
				}

				if (cgsgExist(this.onRotate)) {
					CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_ROTATE, new CGSGEvent(this, {node: this}));
				}
			},

			/**
			 * Multiply this relativeScale factor by the current relative relativeScale
			 * @method rotateBy
			 * @param {Number} af
			 * @param {Boolean} computeAbsoluteValue (default: true)
			 * */
			rotateBy: function (af, computeAbsoluteValue) {
				this.rotation.rotateBy(af);
				if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
					this._absRot = this.getAbsoluteRotation(true);
				}

				if (cgsgExist(this.onRotate)) {
					CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_ROTATE, new CGSGEvent(this, {node: this}));
				}
			},

			/**
			 * Add this angle to the current relative relativeRotation
			 * @method rotateWith
			 * @param {Number} a
			 * @param {Boolean} computeAbsoluteValue (default: true)
			 * */
			rotateWith: function (a, computeAbsoluteValue) {
				this.rotation.rotateWith(a);
				if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
					this._absRot = this.getAbsoluteRotation(true);
				}

				if (cgsgExist(this.onRotate)) {
					CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_ROTATE, new CGSGEvent(this, {node: this}));
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
			 * @param index {Number} index the position of the new child in the list
			 * */
			addChildAt: function (newNode, i) {
				if (i > this.children.length) {
					i = this.children.length;
				}

				for (var j = this.children.length; j >= i; --j) {
					this.children[j] = this.children[j - 1];
				}

				newNode._parentNode = this;
				this.children[i] = newNode;

				if (cgsgExist(this.onChildAdd)) {
					CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_CHILD_ADD, new CGSGEvent(this, {node: this}));
				}
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

					if (cgsgExist(this.onChildRemove)) {
						CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_CHILD_REMOVED,
						                           new CGSGEvent(this, {node: this}));
					}
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
			 * @param i {Number} index
			 */
			detachChildAt: function (i) {
				if (i >= 0 && i < this.children.length) {
					this.detachChild(this.children[i]);
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
			 * @param a {String} attribute The attribute to be changed
			 * @param v {*} value The new value for the attribute
			 *
			 * @example node.evalSet("position.y", 12);
			 */
			evalSet: function (a, v) {
				var rgb;
				//check for common properties to optimize performances
				if (a == "position.x") {
					this.translateTo(v, this.position.y, this.needToKeepAbsoluteMatrix);
				}
				else if (a == "position.y") {
					this.translateTo(this.position.x, v, this.needToKeepAbsoluteMatrix);
				}
				else if (a == "dimension.width") {
					this.resizeTo(v, this.dimension.height);
				}
				else if (a == "dimension.height") {
					this.resizeTo(this.dimension.width, v);
				}
				else if (a == "scale.x") {
					this.scaleTo(v, this.scale.y, this.needToKeepAbsoluteMatrix);
				}
				else if (a == "scale.y") {
					this.scaleTo(this.scale.x, v, this.needToKeepAbsoluteMatrix);
				}
				else if (a == "rotation" || a == "rotation.angle") {
					this.rotateTo(v, this.needToKeepAbsoluteMatrix);
				}
				else if (a == "globalAlpha" || a == "opacity") {
					this.globalAlpha = v;
					this.invalidate();
				}
				else if (a == "isVisible") {
					this.isVisible = v;
				}
				else if (a == "rotationCenter.x") {
					this.rotationCenter.x = v;
				}
				else if (a == "rotationCenter.y") {
					this.rotationCenter.y = v;
				}
				else if (a == "bkgcolors[0].r") {
					rgb = CGSGColor.hex2rgb(this.bkgcolors[0]);
					this.bkgcolors[0] = CGSGColor.rgb2hex(v, rgb.g, rgb.b);
					this.invalidate();
				}
				else if (a == "bkgcolors[0].g") {
					rgb = CGSGColor.hex2rgb(this.bkgcolors[0]);
					this.bkgcolors[0] = CGSGColor.rgb2hex(rgb.r, v, rgb.b);
					this.invalidate();
				}
				else if (a == "bkgcolors[0].b") {
					rgb = CGSGColor.hex2rgb(this.bkgcolors[0]);
					this.bkgcolors[0] = CGSGColor.rgb2hex(rgb.r, rgb.g, v);
					this.invalidate();
				}
				else if (a == "fillStyle.r") {
					this.fillStyle.r = v;
					this.invalidate();
				}
				else if (a == "fillStyle.g") {
					this.fillStyle.g = v;
					this.invalidate();
				}
				else if (a == "fillStyle.b") {
					this.fillStyle.b = v;
					this.invalidate();
				}

				//generic property
				else {
					eval("this." + a + "=" + v);
					this.invalidate();
				}

				/*if (this.needToKeepAbsoluteMatrix) {
				 if (a.indexOf("position") == 0) {
				 this._absPos = this.getAbsolutePosition(true);
				 }
				 else if (a.indexOf("rotation") == 0) {
				 this._absRot = this.getAbsoluteRotation(true);
				 }
				 else if (a.indexOf("scale") == 0) {
				 this._absSca = this.getAbsoluteScale(true);
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
				this.nodeConstraint = null;
				this.regionConstraint = region;
			},

			/**
			 * Set the region inside which one this node ca be placed an can move
			 * @public
			 * @method setNodeRegionConstraint
			 * @param node {CGSGNode} a CGSGNode relatively to this parent region. Can be null.
			 */
			setNodeRegionConstraint:function(node) {
				this.regionConstraint = null;
				this.nodeConstraint = node;
			},

			/**
			 * @public
			 * @method getAbsolutePosition
			 * @param {boolean} recursive flag indicating if computation should be recusive or not
			 * @return {CGSGPosition} the absolute positions of this node
			 */
			getAbsolutePosition: function (recursive) {
				var n = this;
				var translation = this.position.copy();
				while (n._parentNode !== null) {
					translation.multiplyEquals(n._parentNode.scale);
					n = n._parentNode;
				}

				if (this._parentNode !== null) {
					translation.addEquals(this._parentNode.getAbsolutePosition(false));
				}

				if (recursive !== false) {
					for (var c = 0; c < this.children.length; c++) {
						if (cgsgExist(this.children[c])) {
							this.children[c]._absPos = this.children[c].getAbsolutePosition(recursive);
						}
					}
				}

				return translation;
			},

			/**
			 * @public
			 * @method getAbsoluteScale
			 * @param {boolean} recursive flag indicating if computation should be recusive or not
			 * @return {CGSGScale} the absolute scale of this node
			 */
			getAbsoluteScale: function (recursive) {
				var n = this;
				var s = this.scale.copy();
				while (n._parentNode !== null) {
					s.multiplyEquals(n._parentNode.scale);
					n = n._parentNode;
				}

				if (recursive !== false) {
					for (var c = 0; c < this.children.length; c++) {
						if (cgsgExist(this.children[c])) {
							this.children[c]._absSca = this.children[c].getAbsoluteScale(recursive);
						}
					}
				}
				return s;
			},

			/**
			 * @public
			 * @method getAbsoluteRotation
			 * @param {boolean} recursive flag indicating if computation should be recusive or not
			 * @return {CGSGRotation} the absolute rotation of this node
			 */
			getAbsoluteRotation: function (recursive) {
				var n = this;
				var r = this.rotation.copy();
				while (n._parentNode !== null) {
					r.addEquals(n._parentNode.rotation.angle);
					n = n._parentNode;
				}

				if (recursive !== false) {
					for (var c = 0; c < this.children.length; c++) {
						if (cgsgExist(this.children[c])) {
							this.children[c]._absRot = this.children[c].getAbsoluteRotation(recursive);
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
				this._absPos = this.getAbsolutePosition(false);
				this._absSca = this.getAbsoluteScale(false);
				this._absRot = this.getAbsoluteRotation(false);

				if (recursive !== false) {
					//for (var c = 0; c < this.children.length; c++) {
					cgsgIterate(this.children, (function (i, child) {
						if (cgsgExist(child)) {
							child.computeAbsoluteMatrix(recursive);
						}
					}).bind(this));
					//}
				}
			},

			/**
			 * Returns the x position with the lowest value between this node and its children.
			 *
			 * @method getMinAbsoluteLeft
			 * @return {Number}
			 */
			getMinAbsoluteLeft: function () {
				var retval = this._absPos.x;

				if (this.children.length > 0) {
					cgsgIterate(this.children.length, (function (i, child) {
						if (retval < child._absPos.x) {
							retval = child._absPos.x;
						}
					}).bind(this));
				}

				return retval;
			},

			/**
			 * Returns the right border's position with the highest value between this node and its children.
			 *
			 * @method getMostAbsoluteRight
			 * @return {Number}
			 */
			getMaxAbsoluteRight: function () {
				var retval = this._absPos.x + (this.getWidth() * this._absSca.x);

				if (this.children.length > 0) {
					cgsgIterate(this.children.length, (function (i, child) {
						var absRight = this._absPos.x + (this.getWidth() * this._absSca.x);
						if (retval < absRight) {
							retval = absRight;
						}
					}).bind(this));
				}

				return retval;
			},

			/**
			 * Returns the y position with the lowest value between this node and its children.
			 *
			 * @method getMinAbsoluteTop
			 * @return {Number}
			 */
			getMinAbsoluteTop: function () {
				var retval = this._absPos.y;

				if (this.children.length > 0) {
					cgsgIterate(this.children.length, (function (i, child) {
						if (retval < child._absPos.y) {
							retval = child._absPos.y;
						}
					}).bind(this));
				}

				return retval;
			},

			/**
			 * Returns the bottom border's position with the highest value between this node and its children.
			 *
			 * @method getAbsBottom
			 * @return {Number}
			 */
			getMaxAbsoluteBottom: function () {
				var retval = this._absPos.y + (this.getHeight() * this._absSca.y);

				if (this.children.length > 0) {
					cgsgIterate(this.children.length, (function (i, child) {
						var absRight = this._absPos.y + (this.getHeight() * this._absSca.y);
						if (retval < absRight) {
							retval = absRight;
						}
					}).bind(this));
				}

				return retval;
			},
			/**
			 *
			 * @method getAbsLeft
			 * @return {Number}
			 */
			getAbsLeft          : function () {
				return this._absPos.x;
			},

			/**
			 * @method getAbsRight
			 * @return {Number}
			 */
			getAbsRight: function () {
				return this._absPos.x + this.getAbsWidth();
			},

			/**
			 * @method getAbsTop
			 * @return {Number}
			 */
			getAbsTop: function () {
				return this._absPos.y;
			},

			/**
			 * @method getAbsBottom
			 * @return {Number}
			 */
			getAbsBottom: function () {
				return this._absPos.y + this.getAbsHeight();
			},

			/**
			 * @method getAbsWidth
			 * @return {Number}
			 */
			getAbsWidth: function () {
				return this.getWidth() * this._absSca.x;
			},

			/**
			 * @method getAbsHeight
			 * @return {Number}
			 */
			getAbsHeight: function () {
				return this.getHeight() * this._absSca.y;
			},

			/**
			 * @method getWidth
			 * @return {Number}
			 */
			getWidth: function () {
				return this.dimension.width;
			},

			/**
			 * @method getHeight
			 * @return {Number}
			 */
			getHeight: function () {
				return this.dimension.height;
			},

			/**
			 * Return center of the node, based on its position and dimension
			 * @method getCenter
			 * @return {CGSGPosition}
			 */
			getCenter: function () {
				var x = this.position.x + (this.getWidth() / 2);
				var y = this.position.y + (this.getHeight() / 2);

				return new CGSGPosition(x, y);
			},

			/**
			 * Test if this node is colliding the node in parameter. Don't forget to add nodes to CGSGCollisionManager.
			 *
			 * @public
			 * @method isColliding
			 * @return {Boolean} true if the 2 nodes are colliding. They are colliding if the distance between them is minus than the threshold parameter
			 * @param {CGSGNode} node a CGSGNode
			 * @param {Number} threshold space between the 2 nodes before considering they are colliding
			 */
			isColliding: function (node, threshold) {
				return CGSG.collisionManager.isColliding(this, node, threshold);
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
				//for (var n = 0; n < this._parentNode.children.length; n++) {
				cgsgIterate(this._parentNode.children, (function (i, brother) {
					if (brother !== this && this.isColliding(brother, threshold)) {
						listOfCollidingNodes.push(brother);
					}
				}).bind(this));
				//}

				return listOfCollidingNodes;
			},

			/**
			 * @public
			 * @method isCollidingABrother
			 * @param {Number} threshold space between the 2 nodes before considering they are colliding
			 * @return {Boolean} true if this node is colliding one of the other children of its parent node
			 */
			isCollidingABrother: function (threshold) {
				var retval = false;

				cgsgIterate(this._parentNode.children, (function (i, brother) {
					if (brother !== this && this.isColliding(brother, threshold)) {
						retval = true;

						return retval; // break the loop
					}
					return false;
				}).bind(this));

				return retval;
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
			 var topVector = this.getAbsTop();
			 var bottomVector = this.getAbsBottom();
			 var leftVector = this.getAbsLeft();
			 var rightVector = this.getAbsRight();

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
					node = new CGSGNode(this.position.x, this.position.y);
					node.resizeTo(this.dimension.width, this.dimension.height);
				}
				node.classType = this.classType;
				node.name = this.name;
				node.globalAlpha = this.globalAlpha;
				node.bkgcolors = this.bkgcolors;
				node.lineColor = this.lineColor;
				node.lineWidth = this.lineWidth;
				node.isVisible = this.isVisible;
				node.isProportionalResize = this.isProportionalResize;
				node.pickNodeMethod = this.pickNodeMethod;
				node.needToKeepAbsoluteMatrix = this.needToKeepAbsoluteMatrix;

				//list of the children (empty if this nodes is a leaf)
				//this.children = [];

				if (this.regionConstraint !== null) {
					node.regionConstraint = this.regionConstraint.copy();
				}
				node.nodeConstraint = this.nodeConstraint;

				//can be fulfilled by the developer to put in whatever he needs
				node.userData = this.userData;

				//selection attributes
				//if true, this nodes is clickable and so will be checked by the pickNode function
				node.isClickable = this.isClickable;
				//if true, this nodes can be selected and so can be transformed (dimension)
				node.isResizable = this.isResizable;
				node.isDraggable = this.isDraggable;
				node.isTraversable = this.isTraversable;

				node.selectionLineColor = this.selectionLineColor;
				node.selectionLineWidth = this.selectionLineWidth;
				node.handleSize = this.handleSize;
				node.handleColor = this.handleColor;
				node._id = this._id;
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
	)
	;