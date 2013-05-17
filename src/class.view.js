/*
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
 * */

"use strict";

/**
 * Provides requestAnimationFrame in a cross browser way.
 * @property cgsgGlobalRenderingTimer
 * @private
 * @type {Number}
 */
var cgsgGlobalRenderingTimer = null;
//var cgsgGlobalFramerate = CGSG_DEFAULT_FRAMERATE;
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
            var timeToCall = Math.max(0, 17 - (currTime - lastTime)); //1000/60 = 16.667
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
 * Represent the scene of the application.
 * It encapsulates the scene graph itself and several methods to track mouse and touch events, ...
 *
 * @class CGSGView
 * @constructor
 * @module Scene
 * @main Scene
 * @extends {Object}
 * @param {HTMLElement} canvas a handler to the canvas HTML element
 * @type {CGSGView}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGView = CGSGObject.extend(
    {
        initialize: function (canvas) {

            //detect the current explorer to apply correct parameters
            cgsgDetectCurrentExplorer();

            //for IE10 on Win8 : disable the default touch actions
            if (typeof canvas.style.msTouchAction != 'undefined') {
                canvas.style.msTouchAction = "none";
            }

            //noinspection JSUndeclaredVariable
            CGSG.canvas = canvas;
            //noinspection JSUndeclaredVariable
            CGSG.context = CGSG.canvas.getContext("2d");

            /**
             * Multiselection boolean.
             * @property allowMultiSelect
             * @default true
             * @type {Boolean}
             */
            this.allowMultiSelect = true;

            /**
             * Fill color for the drag selection selection rectangle
             * @property dragSelectFillColor
             * @default "#C0C0C0"
             * @type {String}
             */
            this.dragSelectFillColor = CGSG_DEFAULT_DRAG_SELECT_FILL_COLOR;

            /**
             * Stroke color for the drag selection selection rectangle
             * @property dragSelectStrokeColor
             * @default "#808080"
             * @type {String}
             */
            this.dragSelectStrokeColor = CGSG_DEFAULT_DRAG_SELECT_STROKE_COLOR;

            /**
             * Alpha value for the drag selection rectangle
             * @property dragSelectAlpha
             * @default 0.6
             * @type {Number}
             */
            this.dragSelectAlpha = CGSG_DEFAULT_DRAG_SELECT_ALPHA;

            //noinspection JSUndeclaredVariable
            CGSG.sceneGraph = new CGSGSceneGraph(CGSG.canvas, CGSG.context);

            /*
             * If true, framework will take care of multi-touch : NOT EFFECTIVE YET
             * @property multitouch
             * @default false
             * @type {Boolean}
             */
            //this.multitouch = false;

            ////// @private /////////
            /**
             * @property _isRunning
             * @type {Boolean}
             * @private
             */
            this._isRunning = false;
            // when set to true, the canvas will redraw everything
            // invalidate() just sets this to false right now
            // we want to call invalidate() whenever we make a change
            this._needRedraw = true;

            /**
             * @property _frameContainer Handler to the HTML Element displaying the FPS
             * @type {HTMLElement}
             * @private
             */
            this._frameContainer = null;

            /**
             * True if the [CTRL} key is being pressed
             * @property _keyDownedCtrl
             * @default false
             * @type {Boolean}
             * @private
             */
            this._keyDownedCtrl = false;

            /**
             * @property _timerDblTouch
             * @default null
             * @type {Number}
             * @private
             */
            this._timerDblTouch = null;

            /**
             * The delay between 2 touches to be considered as a dbl touch event.
             * To remove the double touch, just set it to 0
             * @property dblTouchDelay
             * @default CGSG_DEFAULT_DBLTOUCH_DELAY
             * @type {Number}
             */
            this.dblTouchDelay = CGSG_DEFAULT_DBLTOUCH_DELAY;

            /**
             * Current positions of the mouse or touch (Array of CGSGPosition)
             * @property _mousePosition
             * @type {Array}
             * @private
             */
            this._mousePosition = [];
            this._mouseOldPosition = [];
            this._dragSelectStartMousePosition = [];
            this._dragSelectEndMousePosition = [];
            this._isDrag = false;
            this._isResizeDrag = false;
            this._isDragSelect = false;
            this._resizingDirection = -1;
            this._isDblClick = false;
            this._mouseUpCount = 0; // counter used to identify dbl click action
            this._timeoutDblClick = null;
            this._isPressing = false;
            this._frameRatio = 0;

            /**
             * @property _listCursors List of the names for the cursor when overring a handlebox
             * @type {Array}
             * @private
             */
            this._listCursors =
                ['nw-resize', 'n-resize', 'ne-resize', 'w-resize', 'e-resize', 'sw-resize',
                    's-resize', 'se-resize'];
            this._offsetX = 0;
            this._offsetY = 0;
            /**
             * @property _selectedNode The current last selected node
             * @type {null}
             * @private
             */
            this._selectedNode = null;

            //Experimental : double-buffer for the temporary rendering
            /*this._dblCanvas = document.createElement('canvas');
             this._dblContext = null;*/

            ////// INITIALIZATION /////////

            //use an external variable to define the scope of the processes
            var scope = this;
            CGSG.canvas.onmouseout = function(event) {
                scope.onMouseOutHandler(event);
            };

            CGSG.canvas.onmousedown = function (event) {
                scope.onMouseDown(event);
            };
            CGSG.canvas.onmouseup = function (event) {
                scope.onMouseUp(event);
            };
            CGSG.canvas.ondblclick = function (event) {
                scope.onMouseDblClick(event);
            };
            CGSG.canvas.onmousemove = function (event) {
                scope.onMouseMove(event);
            };
            document.onkeydown = function (event) {
                scope.onKeyDownHandler(event);
            };
            document.onkeyup = function (event) {
                scope.onKeyUpHandler(event);
            };
            CGSG.canvas.addEventListener('touchstart', function (event) {
                scope.onTouchStart(event);
            }, false);
            CGSG.canvas.addEventListener('touchmove', function (event) {
                scope.onTouchMove(event);
            }, false);
            CGSG.canvas.addEventListener('touchend', function (event) {
                scope.onTouchEnd(event);
            }, false);

            CGSG.canvas.addEventListener('MSPointerDown', function (event) {
                scope.onTouchStart(event);
            }, false);
            CGSG.canvas.addEventListener("MSPointerMove", function (event) {
                scope.onTouchMove(event);
            }, false);
            CGSG.canvas.addEventListener('MSPointerUp', function (event) {
                scope.onTouchEnd(event);
            }, false);

            this._lastUpdate = new Date().getTime();

            this._nodeMouseOver = null;

            /**
             * Callback on click down on scene event.
             * @property onSceneClickStart
             * @default null
             * @type {Function}
             * @example
             *  this.onSceneClickStart = function (event) {
			 *      event.position; //Array of CGSGPosition
			 *      event.event; //Event
			 *  }
             */
            this.onSceneClickStart = null;
            /**
             * Callback on click up on scene event
             * @property onSceneClickEnd
             * @default null
             * @type {Function}
             * @example
             *  this.onSceneClickEnd = function (event) {
			 *      event.position; //Array of CGSGPosition
			 *      event.event; //Event
			 *  }
             */
            this.onSceneClickEnd = null;
            /**
             * Callback on double click start on scene event
             * @property onSceneDblClickStart
             * @default null
             * @type {Function}
             * @example
             *  this.onSceneDblClickStart = function (event) {
			 *      event.position; //Array of CGSGPosition
			 *      event.event; //Event
			 *  }
             */
            this.onSceneDblClickStart = null;
            /**
             * Callback on double click up on scene event
             * @property onSceneDblClickEnd
             * @default null
             * @type {Function}
             * @example
             *  this.onSceneDblClickEnd = function (event) {
			 *      event.position; //Array of CGSGPosition
			 *      event.event; //Event
			 *  }
             */
            this.onSceneDblClickEnd = null;
            /**
             * Callback on start rendering event
             * @property onRenderStart
             * @default null
             * @type {Function}
             * @example
             *  this.onSceneClickStart = function () {
			 *      //...
			 *  }
             */
            this.onRenderStart = null;
            /**
             * Callback on end rendering event
             * @property onRenderEnd
             * @default null
             * @type {Function}
             * @example
             *  this.onRenderEnd = function () {
			 *      //...
			 *  }
             */
            this.onRenderEnd = null;

            //initialize the current frame to 0
            //noinspection JSUndeclaredVariable
            CGSG.currentFrame = 0;
        },

        /**
         * Change the dimension of the canvas.
         * Does not really change the dimension of the rendering canvas container,
         *  but is used by the different computations
         * @method setCanvasDimension
         * @param {CGSGDimension} newDimension
         * */
        setCanvasDimension: function (newDimension) {
            CGSG.canvas.width = newDimension.width;
            CGSG.canvas.height = newDimension.height;
            CGSG.sceneGraph.setCanvasDimension(newDimension);

            //Experimental
            /*this._dblCanvas.width = newDimension.x;
             this._dblCanvas.height = newDimension.y;
             this._dblContext = this._dblCanvas.getContext('2d');*/
        },

        /**
         * Remove the nodes selected in the scene graph
         * @method deleteSelected
         */
        deleteSelected: function () {
            if (CGSG.selectedNodes.length > 0) {
                //for (var i = CGSG.selectedNodes.length - 1; i >= 0; i--) {
                cgsgIterateReverse(CGSG.selectedNodes, (function(i, node) {
                    this._selectedNode = CGSG.selectedNodes[i];
                    CGSG.sceneGraph.removeNode(this._selectedNode, true);
                }).bind(this));
            }
        },

        /**
         * Deselect all nodes
         * @public
         * @method deselectAll
         * @param {Array} excludedArray CGSGNodes not to deselect
         */
        deselectAll: function (excludedArray) {
            this._isDrag = false;
            this._isResizeDrag = false;
            this._resizingDirection = -1;
            //CGSG.canvas.style.cursor = 'auto';
            CGSG.sceneGraph.deselectAll(excludedArray);
            this.invalidate();
        },

        /**
         * the main rendering loop
         * @protected
         * @method render
         */
        render: function () {
            if (this._isRunning && this._needRedraw) {
                if (this.onRenderStart !== null) {
                    var evt = new CGSGEvent(this, null);
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_RENDER_START, evt);
                    //this.onRenderStart();
                }

                CGSG.sceneGraph.render();

                //render the drag selection box directly onto the scene graph ontop of everything else
                if (this._dragSelectStartMousePosition.length > 0 && this._dragSelectEndMousePosition.length > 0) {

                    var p1 = this._dragSelectStartMousePosition[0];
                    var p2 = this._dragSelectEndMousePosition[0];

                    var dx = p2.x - p1.x, dy = p2.y - p1.y;

                    CGSG.sceneGraph.context.save();

                    CGSG.sceneGraph.context.scale(CGSG.displayRatio.x, CGSG.displayRatio.y);
                    CGSG.sceneGraph.context.strokeStyle = this.dragSelectStrokeColor;
                    CGSG.sceneGraph.context.fillStyle = this.dragSelectFillColor;
                    CGSG.sceneGraph.context.globalAlpha = this.dragSelectAlpha;
                    CGSG.sceneGraph.context.fillRect(p1.x, p1.y, dx, dy);
                    CGSG.sceneGraph.context.strokeRect(p1.x, p1.y, dx, dy);
                    CGSG.sceneGraph.context.restore();
                }

                if (this.onRenderEnd !== null) {
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_RENDER_END, new CGSGEvent(this, null));
                    //this.onRenderEnd();
                }

            }

            //if (!CGSG.sceneGraph.stillHaveAnimation()) {
            //	this._needRedraw = false;
            //}

            this._updateFramerate();
            this._updateFramerateContainer();
        },

        /**
         * Call this to start the update of the scene
         * @public
         * @method startPlaying
         */
        startPlaying: function () {
            //we want the callback of the requestAnimationFrame function to be this one.
            //however, the scope of 'this' won't be the same on the requestAnimationFrame function (scope = window)
            // and this one (scope = this). So we bind this function to this scope
            var bindStartPlaying = this.startPlaying.bind(this);
            window.requestAnimationFrame(bindStartPlaying);
            this._isRunning = true;
            this.render();
        },

        /**
         * Call this to stop the rendering (and so animation) update
         * @public
         * @method stopPlaying
         */
        stopPlaying: function () {
            window.cancelAnimationFrame(cgsgGlobalRenderingTimer);
            this._isRunning = false;
        },

        /**
         * Inform the SceneGraph that a new render is needed
         * @public
         * @method invalidate
         */
        invalidate: function () {
            this._needRedraw = true;
        },

        /**
         * Update the current framerate
         * @method _updateFramerate
         * @private
         */
        _updateFramerate: function () {
            if (!cgsgExist(this._fpss)) {
                this._fpss = [];
                this.currentFps = 0;
            }

            var now = new Date().getTime();
            var delta = (now - this._lastUpdate);

            if (!isNaN(CGSG.maxFramerate)) {
                while ((1000.0 / delta) > CGSG.maxFramerate) {
                    now = new Date().getTime();
                    delta = (now - this._lastUpdate);
                }
            }

            this._fpss[this.currentFps++] = 1000.0 / delta;

            if (this.currentFps == CGSG.framerateDelay) {
                this.currentFps = 0;
                CGSG.fps = this._fpss.average();
            }

            /*if (this._frameRatio === 0) {
                this._frameRatio = CGSG.fps;
            } else {
                this._frameRatio = ((this._frameRatio * (CGSG.currentFrame - 1)) + CGSG.fps) / CGSG.currentFrame;
            }*/

            this._lastUpdate = now;
        },

        /**
         * Update the innerHTML of the HTMLElement passed as parameter of the "showFPS" function
         * @method _updateFramerateContainer
         * @private
         */
        _updateFramerateContainer: function () {
            if (this._frameContainer !== null) {
                this._frameContainer.innerHTML = Math.round(CGSG.fps)/*.toString() + " | ~" + (this._frameRatio)*/;
            }
        },

        /**
         * @public
         * @method showFPS
         * @param {HTMLElement} elt an HTML element to receive the FPS. Can be null if you want to remove the framerate
         */
        showFPS: function (elt) {
            this._frameContainer = elt;
        },

        /**
         * Set the new value for the display ratio.
         * The display ratio is used to resize all the elements on the graph to be adapted to the screen,
         * depending on the reference screen size.
         * You can compute the ratio like this: x = canvas.width/reference.width ; y = canvas.height/reference.height
         * @public
         * @method setDisplayRatio
         * @param {CGSGScale} newRatio a CGSGScale value
         */
        setDisplayRatio: function (newRatio) {
            //noinspection JSUndeclaredVariable
            CGSG.displayRatio = newRatio;
            CGSG.sceneGraph.initializeGhost(CGSG.canvas.width / CGSG.displayRatio.x,
                CGSG.canvas.height / CGSG.displayRatio.y);
        },

        /**
         * Detects when the mouse leaves the canvas.
         * @method onMouseOutHandler
         * @param event {MouseEvent} the event
         */
        onMouseOutHandler : function(event) {
            this._isPressing = false;
        },

        /**
         * click mouse Event handler function
         * @protected
         * @method onMouseDown
         * @param {MouseEvent} event
         */
        onMouseDown: function (event) {
            this.onTouchStart(event);
        },

        /**
         * touch down Event handler function
         * @protected
         * @method onTouchStart
         * @param {Event} event
         */
        onTouchStart: function (event) {
            this._isPressing = true;
            if (cgsgExist(this._mousePosition)) {
                this._mouseOldPosition = this._mousePosition.copy();
            }

            this._mousePosition = cgsgGetCursorPositions(event, CGSG.canvas);
            this._selectedNode = CGSG.sceneGraph.pickNode(this._mousePosition[0], null);
            if (cgsgExist(this._selectedNode) && this._selectedNode.onClickStart) {
                CGSG.eventManager.dispatch(this._selectedNode, cgsgEventTypes.ON_CLICK_START, new CGSGEvent(this, {nativeEvent : event, position : this._mousePosition}));
            }

            this._updateSelection(event);
        },

        /**
         * Updates the current selection according to the given event.
         *
         * @method _updateSelection
         * @param {Event} event the event
         * @private
         */
        _updateSelection : function(event) {
            //if a node is under the cursor, select it if it is (clickable || resizable || draggable)
            var selectable = cgsgExist(this._selectedNode) &&
                (this._selectedNode.isClickable || this._selectedNode.isDraggable || this._selectedNode.isResizable);

            if (selectable) {
                if (this._selectedNode.isDraggable || this._selectedNode.isResizable) {
                    //if multiselection is activated
                    if (this.allowMultiSelect && this._keyDownedCtrl) {
                        if (!this._selectedNode.isSelected) {
                            CGSG.sceneGraph.selectNode(this._selectedNode);
                        }
                        else {
                            CGSG.sceneGraph.deselectNode(this._selectedNode);
                        }
                    }
                    //no multiselection
                    else {
                        //if node not already selected
                        if (!this._selectedNode.isSelected) {
                            this.deselectAll(null);
                            CGSG.sceneGraph.selectNode(this._selectedNode);
                        }
                    }

                    this._isDrag = !this._detectResizeMode(this._mousePosition[0]);

                    //ask for redraw
                    this.invalidate();
                }
            }
            //else if no nodes was clicked
            else {
                this.deselectAll(null);
            }

            // Check if we can start drag selection
            var canStartDragSelection = this._canStartDragSelection(event);

            // if the _canStartDragSelection has not been sub classed : apply this rule :
            // if no nodes were hit (that were clickable,resizeable or draggable) lets start a drag selection if we are allowed
            if (!cgsgExist(canStartDragSelection)) {
                canStartDragSelection = !selectable;
            }

            if (this.allowMultiSelect && canStartDragSelection) {
                this._isDragSelect = true;
                this._dragSelectStartMousePosition = cgsgGetCursorPositions(event, CGSG.canvas);
                this._dragSelectEndMousePosition = cgsgGetCursorPositions(event, CGSG.canvas);
                this.deselectAll(null);
            }
        },

        /**
         * This method indicates if, according to the current state of the scene, a drag selection could starts. Called
         * when a touchStart event triggered. Could be overridden to specify different behaviour.
         *
         * @method _canStartDragSelection
         * @protected
         * @param {Event} event the event
         * @return {Boolean} true if drag selection could starts, false otherwise
         */
        _canStartDragSelection : function(event) {
            // tells the caller to use default behaviour by returning nothing (undefined)
        },

        /**
         * Dispatch a 'click' event and for any selected node which is clickable and and only if 'this._isDblClick' == false.
         *
         * @method _dispatchClick
         * @param event {CGSGEvent} the event to dispatch
         * @private
         */
        _dispatchClick : function(event) {
            //execute the action bound with the click event
            if (cgsgExist(this._selectedNode) && this._selectedNode.isClickable) {
                if (!this._isDblClick && cgsgExist(this._selectedNode.onClick)) {
                    event.data.node = this._selectedNode;
                    event.data.positions = this._mousePosition.copy();
                    CGSG.eventManager.dispatch(this._selectedNode, cgsgEventTypes.ON_CLICK, event);
                    //this._selectedNode.onClick({node: this._selectedNode, positions: this._mousePosition.copy(), event: event});
                }
                //deselect all node except the new _selectedNode
                if (this._selectedNode.isDraggable === false && this._selectedNode.isResizable === false) {
                    this.deselectAll([this._selectedNode]);
                }
            }
        },

        /**
         * Click on the scene
         *
         * @private
         * @method _clickOnScene
         * @param {CGSGEvent} event wrapper of MouseEvent or TouchEvent
         * @param {Boolean} mustPickNode
         */
        _clickOnScene: function (event, mustPickNode) {
            this._mousePosition = cgsgGetCursorPositions(event.data.nativeEvent, CGSG.canvas);

            if (this.onSceneClickStart !== null) {
                CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SCENE_CLICK_START, event);
                //this.onSceneClickStart({positions: this._mousePosition.copy(), event: event});
            }

            //try to pick up the nodes under the cursor
            if (mustPickNode) {
                this._selectedNode = CGSG.sceneGraph.pickNode(this._mousePosition[0], function (node) {
                    return (node.isTraversable === true && (node.isClickable === true || node.isDraggable === true
                        || node.isResizable === true));
                });
            }

            //this._updateSelection(event);
            this._dispatchClick(event);

            if (this.onSceneClickEnd !== null) {
                CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SCENE_CLICK_END, event);
                //this.onSceneClickEnd({positions: this._mousePosition.copy(), event: event});
            }

            //this._mouseOldPosition = this._mousePosition.copy();
        },

        /**
         * mouse move Event handler function
         * @protected
         * @method onMouseMove
         * @param {MouseEvent} event
         */
        onMouseMove: function (event) {
            this._moveOnScene(event);
        },

        /**
         * touch move Event handler function
         * @protected
         * @method onTouchMove
         * @param {Event} event
         */
        onTouchMove: function (event) {
            if (event.preventManipulation)
                event.preventManipulation();
            event.preventDefault();
            event.stopPropagation();
            this._moveOnScene(event);
        },

        /**
         * @private
         * @method _moveOnScene
         * @param {Event} event MouseEvent or TouchEvent
         */
        _moveOnScene: function (event) {
            var mousePosition = cgsgGetCursorPositions(event, CGSG.canvas);
            var currentPosition = mousePosition[0];

            var i, nodeOffsetX, nodeOffsetY;
            this._mousePosition = mousePosition;
            var selectedNode = this._selectedNode;
            this._selectedNode = null;

            if (this._isPressing && this._isDrag) {
                if (CGSG.selectedNodes.length > 0) {
                    var mp = this._mousePosition[0];
                    var mop = this._mouseOldPosition[0];
                    this._offsetX = mp.x - mop.x;
                    this._offsetY = mp.y - mop.y;
                    var canMove = true;
                    for (i = CGSG.selectedNodes.length - 1; i >= 0; i--) {
                        this._selectedNode = CGSG.selectedNodes[i];
                        if (this._selectedNode !== null && this._selectedNode.isDraggable) {
                            this._selectedNode.isMoving = true;
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
                                    var evt = new CGSGEvent(this, {node: this._selectedNode, positions: this._mousePosition.copy(), nativeEvent: event});
                                    CGSG.eventManager.dispatch(this._selectedNode, cgsgEventTypes.ON_DRAG, evt);
                                    //this._selectedNode.onDrag({node: this._selectedNode, positions: this._mousePosition.copy(), event: event});
                                }
                            }
                        }
                    }

                    this._mouseOldPosition = this._mousePosition.copy();

                    // something is changing position so we better invalidate the canvas!
                    this.invalidate();
                }
            }
            else if (this._isPressing && this._isResizeDrag) {
                if (CGSG.selectedNodes.length > 0) {
                    var mp = this._mousePosition[0];
                    var mop = this._mouseOldPosition[0];
                    this._offsetX = mp.x - mop.x;
                    this._offsetY = mp.y - mop.y;

                    //for (i = CGSG.selectedNodes.length - 1; i >= 0; i--) {
                    cgsgIterateReverse(CGSG.selectedNodes, (function(i, node) {
                        this._selectedNode = node;//CGSG.selectedNodes[i];

                        if (this._selectedNode.isResizable) {
                            this._selectedNode.isResizing = true;
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
                            var d = {dW: 0, dH: 0};
                            // 0  1  2
                            // 3     4
                            // 5  6  7
                            switch (this._resizingDirection) {
                                case 0:
                                    if (this._selectedNode.isProportionalResize) {
                                        d = this._getDeltaOnMove(delta, nodeOffsetX, nodeOffsetY, realDimX,
                                            realDimY,
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
                                        d = this._getDeltaOnMove(delta, nodeOffsetX, nodeOffsetY, realDimX,
                                            realDimY,
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
                                        d = this._getDeltaOnMove(delta, nodeOffsetX, nodeOffsetY, realDimX,
                                            realDimY,
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
                                        d = this._getDeltaOnMove(delta, nodeOffsetX, nodeOffsetY, realDimX,
                                            realDimY,
                                            1, 1);
                                        this._selectedNode.resizeWith(d.dW, d.dH, false);
                                    }
                                    else {
                                        this._selectedNode.resizeWith(nodeOffsetX, nodeOffsetY, false);
                                    }
                                    break;
                            }
                            this._selectedNode.computeAbsoluteMatrix(false);
                            if (this._selectedNode.onResize !== null) {
                                var evt = new CGSGEvent(this, {node: this._selectedNode, positions: this._mousePosition.copy(), event: event});
                                CGSG.eventManager.dispatch(this._selectedNode, cgsgEventTypes.ON_RESIZE, evt);
                                //this._selectedNode.onResize({node: this._selectedNode, positions: this._mousePosition.copy(), event: event});
                            }
                        }
                    }).bind(this));
                }
                this._mouseOldPosition = this._mousePosition.copy();

                this.invalidate();
            }
            // if there's a selection, see if we grabbed one of the resize handles
            else if (CGSG.selectedNodes.length > 0/* && this._isResizeDrag == false*/) {
                if (this._detectResizeMode(this._mousePosition[0])) {
                    return;
                } else {
                    // not over a selection box, return to normal
                    //this._isResizeDrag = false;
                    this._resizingDirection = -1;
                    CGSG.canvas.style.cursor = 'auto';

                    //ask for redraw
                    this.invalidate();
                }
            }
            //if we are drag selecting
            else if (this._isDragSelect) {
                this._dragSelectEndMousePosition = this._mousePosition.copy();

                //ask to redraw for the selection box
                this.invalidate();
            }

            //mouse over a node ?
            if (!this._isDrag && !this._isResizeDrag) {
                var n = null;
                //first test the mouse over the current _nodeMouseOver. If it's ok, no need to traverse other
                if (cgsgExist(this._nodeMouseOver)) {
                    n = this._nodeMouseOver.pickNode(this._mousePosition[0], null, CGSG.ghostContext, false, null);

                    if (n === null) {
                        this._nodeMouseOver.isMouseOver = false;
                        if (cgsgExist(this._nodeMouseOver.onMouseOut)) {
                            var evt = new CGSGEvent(this, {node: this._nodeMouseOver, positions: this._mousePosition.copy(), event: event});
                            CGSG.eventManager.dispatch(this._nodeMouseOver, cgsgEventTypes.ON_MOUSE_OUT, evt);
                            //this._nodeMouseOver.onMouseOut({node: this._nodeMouseOver, positions: this._mousePosition.copy(), event: event});
                        }
                        this._nodeMouseOver = null;
                    }
                    else if (n === this._nodeMouseOver) {
                        if (cgsgExist(this._nodeMouseOver.onMouseOver)) {
                            var evt = new CGSGEvent(this, {node: this._nodeMouseOver, positions: this._mousePosition.copy(), event: event});
                            CGSG.eventManager.dispatch(this._nodeMouseOver, cgsgEventTypes.ON_MOUSE_OVER, evt);
                            //this._nodeMouseOver.onMouseOver({node: this._nodeMouseOver, positions: this._mousePosition.copy(), event: event});
                        }
                    }
                }

                //if the previous node under the mouse is no more under the mouse, test the other nodes
                if (n === null) {
                    if ((n = CGSG.sceneGraph.pickNode(this._mousePosition[0], function (node) {
                        return (node.onMouseEnter !== null || node.onMouseOver !== null)
                    })) !== null) {
                        n.isMouseOver = true;
                        this._nodeMouseOver = n;
                        this._nodeMouseOver.isMouseOver = true;
                        if (cgsgExist(this._nodeMouseOver.onMouseEnter)) {
                            var evt = new CGSGEvent(this, {node: this._nodeMouseOver, positions: this._mousePosition.copy(), event: event});
                            CGSG.eventManager.dispatch(this._nodeMouseOver, cgsgEventTypes.ON_MOUSE_ENTER, evt);
                            //this._nodeMouseOver.onMouseEnter({node: this._nodeMouseOver, positions: this._mousePosition.copy(), event: event})
                        }
                    }
                }
            }

            this._selectedNode = selectedNode;
        },

        /**
         * Detects if the mouse if over the handle box of a selected node.
         *
         * @method _detectResizeMode
         * @param mousePosition {CGSGPosition} the cursor position
         * @return {Boolean} true if we resize, false otherwise
         * @private
         */
        _detectResizeMode : function(mousePosition) {
            var selectedNode = this._selectedNode;

            cgsgIterateReverse(CGSG.selectedNodes, (function(i, node) {
                //for (i = CGSG.selectedNodes.length - 1; i >= 0; i--) {
                this._selectedNode = node;//CGSG.selectedNodes[i];
                if (this._selectedNode.isResizable) {
                    for (var h = 0; h < 8; h++) {
                        var selectionHandle = this._selectedNode.resizeHandles[h];
                        this._isResizeDrag = selectionHandle.checkIfSelected(mousePosition, CGSG.resizeHandleThreshold);

                        // resize handles will always be rectangles
                        if (this._isResizeDrag) {
                            // we found one!
                            this._resizingDirection = h;

                            //draw the correct cursor
                            CGSG.canvas.style.cursor = this._listCursors[h];

                            //if the mouse cursor is over a handle box (ie: a resize marker)
                            // if (this._resizingDirection !== -1) {
                            //     this._isResizeDrag = true;
                            //}

                            return false;
                        }
                    }
                }
            }).bind(this));

            this._selectedNode = selectedNode;
            return this._isResizeDrag;
        },

        /**
         * @method _getDeltaOnMove
         * @param delta
         * @param nodeOffsetX
         * @param nodeOffsetY
         * @param w
         * @param h
         * @param signeX
         * @param signeY
         * @return {Object}
         * @private
         */
        _getDeltaOnMove: function (delta, nodeOffsetX, nodeOffsetY, w, h, signeX, signeY) {
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

            return {dW: dW, dH: dH};
        },

        /**
         * mouse up Event handler function
         * @protected
         * @method onMouseUp
         * @param {MouseEvent} event
         */
        onMouseUp: function (event) {
            this.onTouchEnd(event);
        },

        /**
         * touch up Event handler function
         * @protected
         * @method onTouchEnd
         * @param {Event} event
         */
        onTouchEnd: function (event) {
            if (event.preventManipulation)
                event.preventManipulation();
            event.preventDefault();
            event.stopPropagation();

            this._isPressing = false;
            this._mouseUpCount++;

            //if the touch was over a node with the onDblClick method defined, check whether it's a dbl touch or not
            if (cgsgExist(this._selectedNode) && cgsgExist(this._selectedNode.onDblClick)) {

                //if the timer exists, then it's a dbl touch
                if (this._mouseUpCount > 1) {
                    clearTimeout(this._timeoutDblClick);
                    this._upAndDblClick(event);
                } else {
                    this._timeoutDblClick = setTimeout((function() {
                        this._upAndClick(event);
                    }).bind(this), this.dblTouchDelay);
                }
            }
            else {
                // not a touch on a node with the onDblClick event defined,
                // so it's a single touch, just call the _clickOnScene method usually
                this._upAndClick(event);
            }
        },

        /**
         * Creates the custom event by calling _upOnScene and then call _clickOnScene.
         *
         * @method _upAndClick
         * @param {Event} event the event
         * @private
         */
        _upAndClick : function(event) {
            this._mouseUpCount = 0;
            var eventData = this._upOnScene(event);
            eventData.nativeEvent = event;
            this._clickOnScene(new CGSGEvent(this, eventData), false);
        },

        /**
         * Creates the custom event by calling _upOnScene and then call _dblClickOnScene.
         *
         * @method _upAndDblClick
         * @param {Event} event the event
         * @private
         */
        _upAndDblClick : function(event) {
            this._mouseUpCount = 0;
            var eventData = this._upOnScene(event);
            eventData.nativeEvent = event;
            this._dblClickOnScene(new CGSGEvent(this, eventData), false);
        },

        /**
         * @method _upOnScene
         * @param {Event} event MouseEvent or TouchEvent
         * @return {Object} a structure indicating is the node has been moved or resize
         * @private
         */
        _upOnScene: function (event) {
            var selectedNode = this._selectedNode;
            var i = 0;
            var retval = {};
            retval.nativeEvent = event;

            var exist = cgsgExist(selectedNode);
            retval.hasMoved = exist && selectedNode.isMoving;
            retval.hasResize = exist && selectedNode.isResizing;

            //if current action was to drag nodes
            if (this._isDrag) {
                cgsgIterateReverse(CGSG.selectedNodes, (function(i, node) {
                    //for (i = CGSG.selectedNodes.length - 1; i >= 0; i--) {
                    //    this._selectedNode = CGSG.selectedNodes[i];
                    this._selectedNode = node;

                    if (this._selectedNode.isMoving) {
                        this._selectedNode.isMoving = false;
                        this._selectedNode.computeAbsoluteMatrix(true);

                        if (this._selectedNode.onDragEnd !== null) {
                            var evt = new CGSGEvent(this, {node: this._selectedNode, positions: this._mousePosition.copy(), nativeEvent: event});
                            CGSG.eventManager.dispatch(this._selectedNode, cgsgEventTypes.ON_DRAG_END, evt);
                            //    this._selectedNode.onDragEnd({node: this._selectedNode, positions: this._mousePosition.copy(), event: event});
                        }
                    }
                    //}
                }).bind(this));

                this._isDrag = false;
            }

            //else if current action was to resize nodes
            else if (this._isResizeDrag) {
                cgsgIterateReverse(CGSG.selectedNodes, (function(i, node) {
                    //for (i = CGSG.selectedNodes.length - 1; i >= 0; i--) {
                    //this._selectedNode = CGSG.selectedNodes[i];
                    this._selectedNode = node;

                    if (this._selectedNode.isResizing) {
                        this._selectedNode.isResizing = false;
                        this._selectedNode.computeAbsoluteMatrix(true);

                        if (this._selectedNode.onResizeEnd !== null) {
                            var evt = new CGSGEvent(this, {node: this._selectedNode, positions: this._mousePosition.copy(), nativeEvent: event});
                            CGSG.eventManager.dispatch(this._selectedNode, cgsgEventTypes.ON_RESIZE_END, evt);
                            //this._selectedNode.onResizeEnd({node: this._selectedNode, positions: this._mousePosition.copy(), event: event});
                        }
                    }
                    //}
                }).bind(this));

                this._isResizeDrag = false;
            }
            //else if this is a drag select
            else if (this._isDragSelect) {
                this._isDragSelect = false;
                this._doDragSelect();
                this._dragSelectStartMousePosition = [];
                this._dragSelectEndMousePosition = [];

                //request a re-render for the drag select rect to be killed with
                this.invalidate();
            }

            //else if just up the mice of nodes
            else {
                this._selectedNode = CGSG.selectedNodes[CGSG.selectedNodes.length - 1];
                if (cgsgExist(this._selectedNode) && this._selectedNode.onMouseUp !== null) {
                    var evt = new CGSGEvent(this, {node: this._selectedNode, positions: this._mousePosition.copy(), event: event});
                    CGSG.eventManager.dispatch(this._selectedNode, cgsgEventTypes.ON_MOUSE_UP, evt);
                    //this._selectedNode.onMouseUp({node: this._selectedNode, positions: this._mousePosition.copy(), event: event});
                }
            }

            this._resizingDirection = -1;
            this._selectedNode = selectedNode;
            return retval;
        },

        /**
         * Select the nodes under the drag select rectangle
         * @protected
         * @method _doDragSelect
         */
        _doDragSelect  : function () {

            var p1 = this._dragSelectStartMousePosition[0];
            var p2 = this._dragSelectEndMousePosition[0];

            var dx = p2.x - p1.x, dy = p2.y - p1.y;

            if (dx < 0) {
                dx = Math.abs(dx);
                p1.x -= dx;
            }

            if (dy < 0) {
                dy = Math.abs(dy);
                p1.y -= dy;
            }

            var region = new CGSGRegion(p1.x, p1.y, dx, dy);
            var newSelections = CGSG.sceneGraph.pickNodes(region, function (node) {
                return (node.isTraversable === true && (/*node.isClickable === true ||*/ node.isDraggable === true
                    || node.isResizable === true))
            });

            for (var i = 0, len = newSelections.length; i < len; ++i) {
                CGSG.sceneGraph.selectNode(newSelections[i]);
            }
        },
        /**
         * mouse double click Event handler function
         * @protected
         * @method onMouseDblClick
         * @param {MouseEvent} event
         */
        onMouseDblClick: function (event) {
            //this._dblClickOnScene(event);
            event.preventDefault();
            event.stopPropagation();
        },

        /**
         * @protected
         * @method _dblClickOnScene
         * @param {CGSGEvent} event wrapping the native event
         * @param {Boolean} mustPickNode
         * @return {CGSGNode} the node that was double-clicked
         * @private
         */
        _dblClickOnScene: function (event, mustPickNode) {
            //this._updateSelection(event);

            if (this.onSceneDblClickStart !== null) {
                CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SCENE_DBL_CLICK_START, event);
                //this.onSceneDblClickStart(event);
            }

            if (mustPickNode) {
                //this._mousePosition = cgsgGetCursorPositions(event, CGSG.canvas);
                this._selectedNode = CGSG.sceneGraph.pickNode(this._mousePosition[0], function (node) {
                    return true;
                });
            }

            if (cgsgExist(this._selectedNode) && this._selectedNode.onDblClick !== null) {
                event.data.node = this._selectedNode;
                event.data.positions = this._mousePosition.copy();
                CGSG.eventManager.dispatch(this._selectedNode, cgsgEventTypes.ON_DBL_CLICK, event);
                //this._selectedNode.onDblClick({node: this._selectedNode, positions: this._mousePosition.copy(), event: event});
            }
            else if (this.onSceneDblClickEnd !== null) {
                CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SCENE_DBL_CLICK_END, event);
                //this.onSceneDblClickEnd({positions: this._mousePosition.copy(), event: event});
            }
            return this._selectedNode;
        },

        /**
         * @method onKeyDownHandler
         * @protected
         * @param {KeyboardEvent} event
         * @return {Number}
         */
        onKeyDownHandler: function (event) {
            var keynum = (window.event) ? event.keyCode : event.which;

            switch (keynum) {
                case 17:
                    this._keyDownedCtrl = true;
                    break;
            }

            return keynum;
        },

        /**
         * @method onKeyUpHandler
         * @protected
         * @param {KeyboardEvent} event
         * @return {Number}
         */
        onKeyUpHandler: function (event) {
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
