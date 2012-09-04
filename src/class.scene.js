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
 * @date 20/08/2012
 *
 * */

/**
 * Provides requestAnimationFrame in a cross browser way.
 */
//the global timer for the scene
var cgsgGlobalRenderingTimer = null;
var cgsgGlobalFramerate = CGSG_DEFAULT_FRAMERATE;
(function () {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame =
		window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function (callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			cgsgGlobalRenderingTimer = window.setTimeout(function () {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			//return id;
		};
	}

	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		};
	}
}());

/**
 * Purpose:
 * Represent the scene of the application.
 * It ensapsulates the scenegraph itself and several methods to track mouse and touch events, ...
 *
 * @param canvas a handler to the canvas HTML element
 * @type {*}
 */
var CGSGScene = Object.extend(
	{
		initialize : function (canvas) {

			//detect the current explorer to apply correct parameters
			cgsgDetectCurrentExplorer();

			////// @public //////////
			this.canvas = canvas;
			this.context = this.canvas.getContext("2d");

			////// @protected /////////

			//the scene graph itself
			this.sceneGraph = new CGSGSceneGraph(this.canvas, this.context);

			//list of the selected nodes in the scenegraph
			this.selectedNodes = this.sceneGraph.selectedNodes;

			//current framerate of the application
			this.fps = 0;

			////// @private /////////
			this._isRunning = false;
			// when set to true, the canvas will redraw everything
			// invalidate() just sets this to false right now
			// we want to call invalidate() whenever we make a change
			this._needRedraw = true;

			this._frameContainer = null;

			this._keyDownedCtrl = false;

			this._mousePosition = new CGSGPosition(0, 0);
			this._mouseOldPosition = new CGSGPosition(0, 0);
			this._isDrag = false;
			this._isResizeDrag = false;
			this._resizingDirection = -1;
			this._listCursors =
			['nw-resize', 'n-resize', 'ne-resize', 'w-resize', 'e-resize', 'sw-resize',
			 's-resize', 'se-resize'];
			this._offsetX = 0;
			this._offsetY = 0;
			this._selectedNode = null;

			////// INITIALIZATION /////////

			//use an external variable to define the scope of the processes
			var scope = this;
			this.canvas.onmousedown = function (event) {
				scope.onMouseDown(event);
			};
			this.canvas.onmouseup = function (event) {
				scope.onMouseUp(event);
			};
			this.canvas.ondblclick = function (event) {
				scope.onMouseDblClick(event);
			};
			this.canvas.onmousemove = function (event) {
				scope.onMouseMove(event);
			};
			document.onkeydown = function (event) {
				scope.onKeyDownHandler(event);
			};
			document.onkeyup = function (event) {
				scope.onKeyUpHandler(event);
			};
			this.canvas.addEventListener('touchstart', function (event) {
				scope.onTouchStart(event);
			}, false);
			this.canvas.addEventListener('touchmove', function (event) {
				scope.onTouchMove(event);
			}, false);
			this.canvas.addEventListener('touchend', function (event) {
				scope.onTouchEnd(event);
			}, false);

			// Padding and border style widths for mouse/touch offsets
			// fixes mouse co-ordinate problems when there's a border or padding
			// see this.mousePosition = getMousePosition for more detail
			if (document.defaultView && document.defaultView.getComputedStyle) {
				cgsgStylePaddingLeft =
				parseInt(document.defaultView.getComputedStyle(this.canvas, null)['paddingLeft'], 10) || 0;
				cgsgStylePaddingTop =
				parseInt(document.defaultView.getComputedStyle(this.canvas, null)['paddingTop'], 10) || 0;
				cgsgStyleBorderLeft =
				parseInt(document.defaultView.getComputedStyle(this.canvas, null)['borderLeftWidth'], 10) || 0;
				cgsgStyleBorderTop =
				parseInt(document.defaultView.getComputedStyle(this.canvas, null)['borderTopWidth'], 10) || 0;
			}

			this._now = 0;
			this._lastUpdate = (new Date) * 1 - 1;
			this._fpsFilter = 2;

			this._nodeMouseOver = null;

			//events for the scene
			this.onSceneClickStart = null;
			this.onSceneClickEnd = null;
			this.onSceneDblClickStart = null;
			this.onSceneDblClickEnd = null;
			this.onRenderStart = null;
			this.onRenderEnd = null;
		},

		/**
		 * @public
		 * Change the dimension of the canvas.
		 * Does not really change the dimension of the rendering canvas container,
		 *  but is used by the different computations
		 * @param newDimension a CGSGVector2D
		 * */
		setCanvasDimension : function (newDimension) {
			this.canvas.width = newDimension.x;
			this.canvas.height = newDimension.y;
			this.sceneGraph.setCanvasDimension(newDimension);
		},

		/**
		 * @public
		 * Remove the nodes selected in the scene graph
		 */
		deleteSelected : function () {
			if (this.sceneGraph.selectedNodes.length > 0) {
				for (var i = this.sceneGraph.selectedNodes.length - 1; i >= 0; i--) {
					this._selectedNode = this.sceneGraph.selectedNodes[i];
					this.sceneGraph.removeNode(this._selectedNode, true);
				}
			}
		},

		/**
		 * @public
		 * Deselect all nodes
		 */
		deselectAll : function () {
			this._isDrag = false;
			this._isResizeDrag = false;

			this.sceneGraph.deselectAll();

			this.invalidate();
		},

		/**
		 * @private
		 * the main rendering loop
		 */
		render : function () {
			if (this._isRunning && this._needRedraw) {
				if (this.onRenderStart !== null) {
					this.onRenderStart();
				}
				this.sceneGraph.render();
				if (this.onRenderEnd !== null) {
					this.onRenderEnd();
				}

				//if (!this.sceneGraph.stillHaveAnimation()) {
				//    	this._needRedraw = false;
				//}
			}

			this._updateFramerate();
		},

		/**
		 * @public
		 * Call this to start the update of the scene
		 */
		startPlaying : function () {
			//we want the callback of the requestAnimationFrame function to be this one.
			//however, the scope of 'this' won't be the same on the requestAnimationFrame function (scope = window)
			// and this one (scope = this). So we bind this function to this scope
			var bindStartPlaying = this.startPlaying.bind(this);
			window.requestAnimationFrame(bindStartPlaying);
			this._isRunning = true;
			this.render();
		},

		/**
		 * @public
		 * Call this to stop the rendering (and so animation) update
		 */
		stopPlaying : function () {
			window.cancelAnimationFrame(cgsgGlobalRenderingTimer);
			this._isRunning = false;
		},

		/**
		 * @public
		 * Inform the SceneGraph that a new render is needed
		 * */
		invalidate : function () {
			this._needRedraw = true;
		},

		/**
		 * @private
		 * Update the current framerate
		 */
		_updateFramerate : function () {
			this._now = new Date();
			this.fps = 1000.0 / (this._now - this._lastUpdate);

			if (this._frameContainer !== null) {
				this._frameContainer.innerText = Math.round(this.fps);
			}

			this._lastUpdate = this._now;
		},

		/**
		 * @public
		 * If (elt !== null), framerate will be rendered inside
		 * @param elt an HTML element to receive the FPS. Can be null if you want to remove the framerate
		 */
		showFPS : function (elt) {
			this._frameContainer = elt;
		},

		/**
		 * @public
		 * Set the new value for the display ratio.
		 * The display ratio is used to resize all the elements on the graph to be adapted to the screen,
		 * depending on the reference screen size.
		 * You can compute the ratio like this: x = canvas.width/reference.width ; y = canvas.height/reference.height
		 * @param newRatio a CGSGScale value
		 */
		setDisplayRatio : function (newRatio) {
			cgsgDisplayRatio = newRatio;
			this.sceneGraph.initializeGhost(this.canvas.width / cgsgDisplayRatio.x,
											this.canvas.height / cgsgDisplayRatio.y);
		},

		/**
		 * @public
		 * @return the current display ratio (a CGSGScale object)
		 */
		getDisplayRatio : function () {
			return cgsgDisplayRatio;
		},

		/**
		 * @private
		 * click mouse Event handler function
		 * @param event
		 */
		onMouseDown : function (event) {
			this._clickOnScene(event);
		},

		/**
		 * @private
		 * touch down Event handler function
		 * @param event
		 */
		onTouchStart : function (event) {
			this._clickOnScene(event);
		},

		/**
		 * @protected
		 *
		 */
		_clickOnScene : function (event) {
			if (this.onSceneClickStart !== null) {
				this.onSceneClickStart(event);
			}

			this._mousePosition = cgsgGetCursorPosition(event, this.canvas);

			//if the mouse cursor is over a handle box (ie: a resize marker)
			if (this._resizingDirection !== -1) {
				this._mouseOldPosition = this._mousePosition.copy();
				this._isResizeDrag = true;
				if (this.onSceneClickEnd !== null) {
					this.onSceneClickEnd(event);
				}
				return;
			}

			//try to pick up the nodes under the cursor
			this._selectedNode = this.sceneGraph.pickNode(this._mousePosition,
														  "isClickable===true || this.isDraggable===true || this.isResizable===true");
			//if a nodes is under the cursor, select it
			if (this._selectedNode !== null && this._selectedNode !== undefined) {

				if (this._selectedNode.isDraggable || this._selectedNode.isResizable) {
					//if the clicked nodes was already selected, deselect it
					if (this._selectedNode.isSelected && this._keyDownedCtrl) {
						this.sceneGraph.deselectNode(this._selectedNode);
					}
					//if we choose a non-already selected nodes, select it
					else {
						this._mouseOldPosition = this._mousePosition.copy();
						this._isDrag = true;
						this._isResizeDrag = false;

						//if the nodes isn't already selected, select it
						if (!this._selectedNode.isSelected) {
							//if it's not a multi-selection, deselect all selected nodes to only select this one
							if (!this._keyDownedCtrl) {
								//inform the scene graph we deselect these nodes
								this.sceneGraph.deselectAll();
							}

							//inform the scene graph that we've selected this nodes
							this.sceneGraph.selectNode(this._selectedNode);
						}
					}
					//ask for redraw
					this.invalidate();
				}

				//execute the action binded with the click event
				if (this._selectedNode.isClickable) {
					if (cgsgExist(this._selectedNode.onClick)) {
						this._selectedNode.onClick(event)
					}
					else if (this._selectedNode.isDraggable === false && this._selectedNode.isResizable === false) {
						this.deselectAll();
					}
				}

			}
			//else if no nodes was clicked
			else {
				this.deselectAll();
			}

			if (this.onSceneClickEnd !== null) {
				this.onSceneClickEnd(event);
			}
		},

		/**
		 * @private
		 * mouse move Event handler function
		 * @param event
		 */
		onMouseMove : function (event) {
			this._moveOnScene(event);
		},

		/**
		 * @private
		 * touch move Event handler function
		 * @param event
		 */
		onTouchMove : function (event) {
			event.preventDefault();
			event.stopPropagation();
			this._moveOnScene(event);
		},

		/**
		 * @protected
		 */
		_moveOnScene : function (event) {
			this._mousePosition = cgsgGetCursorPosition(event, this.canvas);
			var i;
			this._selectedNode = null;

			if (this._isDrag) {
				if (this.sceneGraph.selectedNodes.length > 0) {
					this._offsetX = this._mousePosition.x - this._mouseOldPosition.x;
					this._offsetY = this._mousePosition.y - this._mouseOldPosition.y;
					var nodeOffsetX = 0, nodeOffsetY = 0;
					var canMove = true;
					for (i = this.sceneGraph.selectedNodes.length - 1; i >= 0; i--) {
						this._selectedNode = this.sceneGraph.selectedNodes[i];
						if (this._selectedNode !== null && this._selectedNode.isDraggable) {
							//TODO : appliquer aussi l'opposée de la rotation
							nodeOffsetX = this._offsetX /
										  (this._selectedNode._absoluteScale.x / this._selectedNode.scale.x);
							nodeOffsetY = this._offsetY /
										  (this._selectedNode._absoluteScale.y / this._selectedNode.scale.y);
							//check for the region constraint
							if (this._selectedNode.regionConstraint !== null) {
								var reg = this._selectedNode.getRegion().copy();
								reg.position.x += nodeOffsetX;
								reg.position.y += nodeOffsetY;
								if (!cgsgRegionIsInRegion(reg, this._selectedNode.regionConstraint, 0)) {
									canMove = false;
								}
							}

							if (canMove) {
								this._selectedNode.translateWith(nodeOffsetX, nodeOffsetY);
								if (this._selectedNode.onDrag !== null) {
									this._selectedNode.onDrag(event);
								}
							}
						}
					}

					this._mouseOldPosition = this._mousePosition.copy();

					// something is changing position so we better invalidate the canvas!
					this.invalidate();
				}
			}
			else if (this._isResizeDrag) {
				if (this.sceneGraph.selectedNodes.length > 0) {
					this._offsetX = this._mousePosition.x - this._mouseOldPosition.x;
					this._offsetY = this._mousePosition.y - this._mouseOldPosition.y;
					var nodeOffsetX = 0, nodeOffsetY = 0;
					for (i = this.sceneGraph.selectedNodes.length - 1; i >= 0; i--) {
						this._selectedNode = this.sceneGraph.selectedNodes[i];
						if (this._selectedNode.isResizable) {
							//TODO : appliquer aussi l'opposée de la rotation
							nodeOffsetX = this._offsetX / this._selectedNode._absoluteScale.x;
							nodeOffsetY = this._offsetY / this._selectedNode._absoluteScale.y;

							var delta = Math.max(nodeOffsetX, nodeOffsetY);
							if (delta == 0) {
								delta = Math.min(nodeOffsetX, nodeOffsetY);
							}
							var realDimX = this._selectedNode.dimension.width *
										   this._selectedNode._absoluteScale.x;
							var realDimY = this._selectedNode.dimension.height *
										   this._selectedNode._absoluteScale.y;
							var ratio = 1.0;
							// 0  1  2
							// 3     4
							// 5  6  7
							switch (this._resizingDirection) {
								case 0:
									if (this._selectedNode.isProportionalResize) {
										var d = this.getDeltaOnMove(delta, nodeOffsetX, nodeOffsetY, realDimX, realDimY,
																	-1, -1);
										this._selectedNode.translateWith(-d.dW, -d.dH, false);
										this._selectedNode.resizeWith(d.dW, d.dH, false);
									}
									else {
										this._selectedNode.translateWith(nodeOffsetX * this._selectedNode.scale.x,
																		 nodeOffsetY * this._selectedNode.scale.y,
																		 false);
										this._selectedNode.resizeWith(-nodeOffsetX, -nodeOffsetY, false);
									}
									break;
								case 1:
									this._selectedNode.translateWith(0, nodeOffsetY * this._selectedNode.scale.y,
																	 false);
									this._selectedNode.resizeWith(0, -nodeOffsetY, false);
									break;
								case 2:
									if (this._selectedNode.isProportionalResize) {
										var d = this.getDeltaOnMove(delta, nodeOffsetX, nodeOffsetY, realDimX, realDimY,
																	1, -1);
										this._selectedNode.translateWith(0, -d.dH, false);
										this._selectedNode.resizeWith(d.dW, d.dH, false);
									}
									else {
										this._selectedNode.translateWith(0, nodeOffsetY * this._selectedNode.scale.y,
																		 false);
										this._selectedNode.resizeWith(nodeOffsetX, -nodeOffsetY, false);
									}
									break;
								case 3:
									this._selectedNode.translateWith(nodeOffsetX * this._selectedNode.scale.x, 0,
																	 false);
									this._selectedNode.resizeWith(-nodeOffsetX, 0, false);
									break;
								case 4:
									this._selectedNode.resizeWith(nodeOffsetX, 0, false);
									break;
								case 5:
									if (this._selectedNode.isProportionalResize) {
										var d = this.getDeltaOnMove(delta, nodeOffsetX, nodeOffsetY, realDimX, realDimY,
																	1, -1);
										this._selectedNode.translateWith(d.dW, 0, false);
										this._selectedNode.resizeWith(-d.dW, -d.dH, false);
									}
									else {
										this._selectedNode.translateWith(nodeOffsetX * this._selectedNode.scale.x, 0,
																		 false);
										this._selectedNode.resizeWith(-nodeOffsetX, nodeOffsetY, false);
									}
									break;
								case 6:
									this._selectedNode.resizeWith(0, nodeOffsetY, false);
									break;
								case 7:
									if (this._selectedNode.isProportionalResize) {
										var d = this.getDeltaOnMove(delta, nodeOffsetX, nodeOffsetY, realDimX, realDimY,
																	1, 1);
										this._selectedNode.resizeWith(d.dW, d.dH, false);
									}
									else {
										this._selectedNode.resizeWith(nodeOffsetX, nodeOffsetY, false);
									}
									break;
							}
							this._selectedNode.computeAbsoluteMatrix();
							if (this._selectedNode.onResize !== null) {
								this._selectedNode.onResize({node : this._selectedNode});
							}
						}
					}
				}
				this._mouseOldPosition = this._mousePosition.copy();

				this.invalidate();
			}
			// if there's a selection, see if we grabbed one of the resize handles
			else if (this.sceneGraph.selectedNodes.length > 0 && this._isResizeDrag == false) {
				for (i = this.sceneGraph.selectedNodes.length - 1; i >= 0; i--) {
					this._selectedNode = this.sceneGraph.selectedNodes[i];
					if (this._selectedNode.isResizable) {
						for (var h = 0; h < 8; h++) {
							var selectionHandle = this._selectedNode.resizeHandles[h];

							// resize handles will always be rectangles
							if (selectionHandle.checkIfSelected(this._mousePosition, cgsgResizeHandleThreshold)) {
								// we found one!
								this._resizingDirection = h;

								//draw the correct cursor
								this.canvas.style.cursor = this._listCursors[h];

								return;
							}
						}
					}
				}

				// not over a selection box, return to normal
				this._isResizeDrag = false;
				this._resizingDirection = -1;
				this.canvas.style.cursor = 'auto';

				//ask for redraw
				this.invalidate();
			}

			//mouse over a node ?
			if (!this._isDrag && !this._isResizeDrag) {
				var n = null;
				//first test the mouse over the current _nodeMouseOver. If it's ok, no need to traverse other
				if (cgsgExist(this._nodeMouseOver)) {
					n = this._nodeMouseOver.pickNode(this._mousePosition, null, false,
													 this.canvas.width, this.canvas.height, null);

					if (n === null && cgsgExist(this._nodeMouseOver.onMouseOut)) {
						this._nodeMouseOver.isMouseOver = false;
						this._nodeMouseOver.onMouseOut({node : this._nodeMouseOver, position : this._mousePosition});
						this._nodeMouseOver = null;
					}
				}

				//if the previous node under the mouse is no more under the mouse, test the other nodes
				if (n === null) {
					if ((n = this.sceneGraph.pickNode(this._mousePosition, "onMouseOver !== null")) !== null) {
						n.isMouseOver = true;
						this._nodeMouseOver = n;
						this._nodeMouseOver.onMouseOver({node : this._nodeMouseOver, position : this._mousePosition})
					}
				}
			}
		},

		/**
		 * @private
		 * @param w
		 * @param h
		 * @param signe 1 or -1
		 */
		getDeltaOnMove : function (delta, nodeOffsetX, nodeOffsetY, w, h, signeX, signeY) {
			var dW = nodeOffsetX, dH = nodeOffsetY;
			var ratio = 1.0;
			if (delta == nodeOffsetX) {
				ratio = (w + signeX * delta) / w;
				dW = signeX * delta;
				dH = (ratio - 1.0) * h;
			}
			else {
				ratio = (h + signeY * delta) / h;
				dH = signeY * delta;
				dW = (ratio - 1.0) * w;
			}

			return {dW : dW, dH : dH};
		},

		/**
		 * @private
		 * mouse up Event handler function
		 * @param event
		 */
		onMouseUp : function (event) {
			this._upOnScene(event);
		},

		/**
		 * @private
		 * touch up Event handler function
		 * @param event
		 */
		onTouchEnd : function (event) {
			this._upOnScene(event);
		},

		_upOnScene : function (event) {
			var i = 0;

			if (this._isDrag) {
				for (i = this.sceneGraph.selectedNodes.length - 1; i >= 0; i--) {
					this._selectedNode = this.sceneGraph.selectedNodes[i];
					this._selectedNode.computeAbsoluteMatrix();
					if (this._selectedNode.onDragEnd !== null) {
						this._selectedNode.onDragEnd(event);
					}
				}
				this._isDrag = false;
			}

			if (this._isResizeDrag) {
				for (i = this.sceneGraph.selectedNodes.length - 1; i >= 0; i--) {
					this._selectedNode = this.sceneGraph.selectedNodes[i];
					this._selectedNode.computeAbsoluteMatrix();
					if (this._selectedNode.onResizeEnd !== null) {
						this._selectedNode.onResizeEnd(event);
					}
				}
				this._isResizeDrag = false;
			}
			this._resizingDirection = -1;
		},

		/**
		 * @private
		 * mouse double click Event handler function
		 * @param event
		 */
		onMouseDblClick : function (event) {
			this.dblClickOnScene(event);
		},

		/**
		 * @protected
		 * @return {*}
		 */
		dblClickOnScene : function (event) {
			if (this.onSceneDblClickStart !== null) {
				this.onSceneDblClickStart(event);
			}
			this._mousePosition = cgsgGetCursorPosition(event, this.canvas);
			this._selectedNode = this.sceneGraph.pickNode(this._mousePosition);
			if (this._selectedNode !== null && this._selectedNode !== undefined &&
				this._selectedNode.onDblClick !== null) {
				this._selectedNode.onDblClick(event);
			}
			if (this.onSceneDblClickEnd !== null) {
				this.onSceneDblClickEnd(event);
			}
			return this._selectedNode;
		},

		onKeyDownHandler : function (event) {
			var keynum = (window.event) ? event.keyCode : event.which;

			switch (keynum) {
				case 17:
					this._keyDownedCtrl = true;
					break;
			}

			return keynum;
		},

		onKeyUpHandler : function (event) {
			var keynum = (window.event) ? event.keyCode : event.which;

			switch (keynum) {
				case 17:
					this._keyDownedCtrl = false;
					break;
			}

			return keynum;
		}
	}
);
