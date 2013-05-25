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
 */

/**
 * Represent the scene graph it self.
 *
 * @class CGSGSceneGraph
 * @module Scene
 * @constructor
 * @extends {Object}
 * @param {HTMLElement} canvas a handler to the canvas HTML element
 * @param {CanvasRenderingContext2D} context context to render on
 * @type {CGSGSceneGraph}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGSceneGraph = CGSGObject.extend(
    {
        initialize: function (canvas, context) {

            /**
             * Root node of the graph
             * @property root
             * @type {CGSGNode}
             */
            this.root = null;

            /**
             * @property context
             * @type {CanvasRenderingContext2D}
             */
            this.context = context;

            /**
             *
             * @property _nextNodeID
             * @type {Number}
             * @private
             */
            this._nextNodeID = 1;

            ///// INITIALIZATION //////

            /**
             * Initialize a ghost canvas used to determine which nodes are selected by the user
             * @property ghostCanvas
             * @type {HTMLElement}
             */
            this.ghostCanvas = document.createElement('canvas');
            this.initializeGhost(canvas.width, canvas.height);

            //fixes a problem where double clicking causes text to get selected on the canvas
            CGSG.canvas.onselectstart = function () {
                return false;
            };
        },

        /**
         * Initialize the ghost rendering, used by the PickNode function
         * @private
         * @method initializeGhost
         * @param {Number} width The width for the canvas. Must be the same as the rendering canvas
         * @param {Number} height The height for the canvas. Must be the same as the rendering canvas
         * */
        initializeGhost: function (width, height) {
            this.ghostCanvas.height = height;
            this.ghostCanvas.width = width;
            //noinspection JSUndeclaredVariable
            CGSG.ghostContext = this.ghostCanvas.getContext('2d');
        },

        /**
         * Render the SceneGraph
         * @public
         * @method render
         * */
        render: function () {
            //erase previous rendering
            cgsgClearContext(this.context);

            if (cgsgExist(this.root)) {
                var node = null;
                var i = 0, evt;
                var key = null;
                //set the new values for all the animated nodes
                if (CGSG.animationManager.listTimelines.length > 0) {
                    node = null;
                    var value, timeline;
                    for (i = CGSG.animationManager.listTimelines.length - 1; i >= 0; --i) {
                        timeline = CGSG.animationManager.listTimelines[i];
                        node = timeline.parentNode;

                        if (node.isVisible) {
                            value = timeline.getValue(CGSG.currentFrame);
                            if (value !== undefined) {
                                node.evalSet(timeline.attribute, value);
                                if (timeline.onAnimate !== null) {
                                    CGSG.eventManager.dispatch(timeline, cgsgEventTypes.ON_ANIMATE,
                                        new CGSGEvent(this, {node: node, attribute: timeline.attribute, value: value}));
                                }
                            }

                            //fire event if this is the first animation key for this timeline
                            key = timeline.getFirstKey();
                            if (key !== null && key.frame == CGSG.currentFrame &&
                                timeline.onAnimationStart !== null) {
                                evt = new CGSGEvent(this, {node: node});
                                evt.node = node;
                                CGSG.eventManager.dispatch(timeline, cgsgEventTypes.ON_ANIMATION_START, evt);
                            }

                            //fire event if this is the last animation key for this timeline
                            key = timeline.getLastKey();
                            if (key !== null && key.frame == CGSG.currentFrame) {
                                timeline.removeAll();
                                if (timeline.onAnimationEnd !== null) {
                                    evt = new CGSGEvent(this, {node: node});
                                    evt.node = node;
                                    CGSG.eventManager.dispatch(timeline, cgsgEventTypes.ON_ANIMATION_END, evt);
                                }
                            }
                        }
                    }
                }

                //run the rendering traverser
                this.context.save();
                this.context.scale(CGSG.displayRatio.x, CGSG.displayRatio.y);
                if (this.root.isVisible) {
                    this.root.doRender(this.context, CGSG.currentFrame);
                    //cgsgRender(this.context, this.root);
                }
                this.context.restore();
            }

            //draw the selection markers around the selected nodes
            if (CGSG.isBoundingBoxOnTop && CGSG.selectedNodes.length > 0) {
                for (i = CGSG.selectedNodes.length - 1; i >= 0; i--) {
                    node = CGSG.selectedNodes[i];
                    if (node.isVisible) {
                        //todo valider l'interet de calculer la matrice absolue
                        node.computeAbsoluteMatrix(true);

                        this.context.save();
                        this.context.scale(CGSG.displayRatio.x, CGSG.displayRatio.y);

                        var n = node;
                        var t = n.getAbsolutePosition();

                        this.context.translate(t.x, t.y);

                        if (cgsgExist(node.rotationCenter)) {

                            this.context.translate(node.dimension.width * node.rotationCenter.x,
                                node.dimension.height * node.rotationCenter.y);
                            this.context.rotate(node.rotation.angle);
                            this.context.translate(-node.dimension.width * node.rotationCenter.x,
                                -node.dimension.height * node.rotationCenter.y);
                        }
                        else {
                            this.context.rotate(node.rotation.angle);
                        }
                        this.context.scale(node._absoluteScale.x, node._absoluteScale.y);

                        node.renderBoundingBox(this.context);
                        this.context.restore();
                    }
                }
            }

            CGSG.currentFrame++;
        },

        /**
         * Change the dimension of the canvas.
         * Does not really change the dimension of the rendering canvas container,
         *  but is used for different computations
         * @method setCanvasDimension
         * @param {CGSGDimension} newDimension
         * */
        setCanvasDimension: function (newDimension) {
            this.initializeGhost(newDimension.width, newDimension.height);
        },

        /**
         * Mark the nodes as selected so the select marker (also called selectedHandlers)
         *  will be shown and the SceneGraph will manage the moving and resizing of the selected objects.
         * @method selectNode
         * @param nodeToSelect The CGSGNode to be selected
         * */
        selectNode: function (nodeToSelect) {
            if (!nodeToSelect.isSelected) {
                nodeToSelect.setSelected(true);
                nodeToSelect.computeAbsoluteMatrix(false);
                CGSG.selectedNodes[CGSG.selectedNodes.length] = nodeToSelect;
            }
        },

        /**
         * Mark the nodes as not selected
         * @method deselectNode
         * @param {CGSGNode} nodeToDeselect
         * */
        deselectNode: function (nodeToDeselect) {
            nodeToDeselect.setSelected(false);
            /*CGSG.selectedNodes = */
            CGSG.selectedNodes.without(nodeToDeselect);
        },

        /**
         * Mark all nodes as not selected
         * @method deselectAll
         * @param {Array} excludedArray CGSGNodes to not deselect
         * */
        deselectAll: function (excludedArray) {
            var node = null;
            for (var i = CGSG.selectedNodes.length - 1; i >= 0; i--) {
                node = CGSG.selectedNodes[i];
                if (!cgsgExist(excludedArray) || !excludedArray.contains(node)) {
                    this.deselectNode(node);
                }
            }

            //just to be sure
            CGSG.selectedNodes.clear();
        },

        /**
         * Recursively traverse the nodes and return the one who is under the mouse coordinates
         * @method pickNode
         * @param {CGSGPosition} mousePosition
         * @param {String} condition
         * @return {CGSGNode}
         * @example
         *  this.scenegraph.picknode(mousePosition, 'position.x > 100'); <br/>
         *  this.scenegraph.picknode(mousePosition, 'position.x > 100 && this.position.y > 100');
         */
        pickNode: function (mousePosition, condition) {
            //empty the current selection first
            //CGSG.selectedNodes = new Array();
            cgsgClearContext(CGSG.ghostContext);
            //recursively traverse the nodes to get the selected nodes
            if (!cgsgExist(this.root)) {
                return null;
            }
            else {
                return this.root.pickNode(
                    mousePosition.copy(), //position of the cursor on the viewport
                    new CGSGScale(1, 1), //absolute scale for the nodes
                    CGSG.ghostContext, //context for the ghost rendering
                    true, //recursively ?
                    //CGSG.canvas.width / CGSG.displayRatio.x, CGSG.canvas.height / CGSG.displayRatio.y,
                    //dimension of the canvas container
                    condition);  // condition to the picknode be executed
            }
        },

        /**
         * Recursively traverse the nodes and return the ones who are under the mouse coordinates
         * @method pickNodes
         * @param {CGSGRegion} region
         * @param {String} condition
         * @return {Array}
         * @example
         *  this.scenegraph.picknodes(region, 'position.x > 100'); <br/>
         *  this.scenegraph.picknodes(region, 'position.x > 100 && this.position.y > 100');
         */
        pickNodes: function (region, condition) {
            //empty the current selection first
            //CGSG.selectedNodes = new Array();
            cgsgClearContext(CGSG.ghostContext);
            //recursively traverse the nodes to get the selected nodes
            if (!cgsgExist(this.root)) {
                return null;
            }
            else {
                return this.root.pickNodes(
                    region.copy(), //position of the cursor on the viewport
                    new CGSGScale(1, 1), //absolute scale for the nodes
                    CGSG.ghostContext, //context for the ghost rendering
                    true, //recursively ?
                    //CGSG.canvas.width / CGSG.displayRatio.x, CGSG.canvas.height / CGSG.displayRatio.y,
                    //dimension of the canvas container
                    condition);  // condition to the picknode be executed
            }
        },

        /**
         * Remove the child nodes passed in parameter, from the root nodes
         * @method removeNode
         * @param {CGSGNode} node the nodes to remove
         * @return {Boolean} true if the nodes was found and removed
         * */
        removeNode: function (node) {
            if (cgsgExist(node)) {
                this.deselectNode(node);
                if (this.root !== null) {
                    return this.root.removeChild(node, true);
                }
            }
            return false;
        },

        /**
         * Add a node on the scene.
         * If the root does not already exist, this node will be used as root
         * @method addNode
         * @param {CGSGNode} node the node to add
         * @param {CGSGNode} parent the parent node of the new one. If it's null, the node will be the root.
         * */
        addNode: function (node, parent) {
            node._id = this._nextNodeID++;
            if (this.root === null) {
                this.root = node;
            }
            else {
                if (parent === null) {
                    parent = this.root;
                }
                parent.addChild(node);
            }
        }
    }
);
