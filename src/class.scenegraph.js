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

/**
 * Represent the scene graph it self.
 * It encapsulates the root node and list of timelines for animations
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

			//initialize the current frame to 0
			//noinspection JSUndeclaredVariable
			cgsgCurrentFrame = 0;

			/**
			 * The nodes currently selected by the user
			 * @property selectedNodes
			 * @type {Array}
			 */
			this.selectedNodes = [];
			/**
			 *
			 * @property _nextNodeID
			 * @type {Number}
			 * @private
			 */
			this._nextNodeID = 1;

			/**
			 * List of the timelines for the animations.
			 * A timeline consists of a list of animation keys for 1 attribute of the nodes
			 * @property _listTimelines
			 * @type {Array}
			 * @private
			 */
			this._listTimelines = [];

			///// INITIALIZATION //////

			/**
			 * Initialize a ghost canvas used to determine which nodes are selected by the user
			 * @property ghostCanvas
			 * @type {HTMLElement}
			 */
			this.ghostCanvas = document.createElement('canvas');
			this.initializeGhost(canvas.width, canvas.height);

			//fixes a problem where double clicking causes text to get selected on the canvas
			cgsgCanvas.onselectstart = function () {
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
			cgsgGhostContext = this.ghostCanvas.getContext('2d');
		},

		/**
		 * Render the SceneGraph
		 * @public
		 * @method render
		 * */
		render: function () {
			//erase previous rendering
			cgsgClearContext(this.context);

			if (this.root !== null && this.root !== undefined) {
				var node = null;
				var i = 0;
				var len = 0;
				var key = null;
				//set the new values for all the animated nodes
				if (this._listTimelines.length > 0) {
					node = null;
					var value, timeline;
					for (i = this._listTimelines.length - 1; i >= 0; --i) {
						timeline = this._listTimelines[i];
						node = timeline.parentNode;

						if (node.isVisible) {
							value = timeline.getValue(cgsgCurrentFrame);
							if (value !== undefined) {
								node.evalSet(timeline.attribute, value.value);
								if (timeline.onAnimate !== null) {
									timeline.onAnimate({node: node});
								}
							}

							//fire event if this is the first animation key for this timeline
							key = timeline.getFirstKey();
							if (key !== null && key.frame == cgsgCurrentFrame &&
								timeline.onAnimationStart !== null) {
								timeline.onAnimationStart({node: node});
							}

							//fire event if this is the last animation key for this timeline
							key = timeline.getLastKey();
							if (key !== null && key.frame == cgsgCurrentFrame) {
								timeline.removeAll();
								//this._listTimelines.without(timeline);
								if (timeline.onAnimationEnd !== null) {
									timeline.onAnimationEnd({node: node});
								}

								//cgsgFree(timeline);
							}
						}
					}
				}

				//run the rendering traverser
				this.context.save();
				this.context.scale(cgsgDisplayRatio.x, cgsgDisplayRatio.y);
				if (this.root.isVisible) {
					this.root.render(this.context, cgsgCurrentFrame);
				}
				this.context.restore();
			}

			//draw the selection markers around the selected nodes
			if (this.selectedNodes.length > 0) {
				for (i = this.selectedNodes.length - 1; i >= 0; i--) {
					node = this.selectedNodes[i];
					if (node.isVisible) {
						//node.computeAbsoluteMatrix();
						this.context.save();
						this.context.scale(cgsgDisplayRatio.x, cgsgDisplayRatio.y);

						var n = node;
						var t = n.getAbsolutePosition();

						this.context.translate(t.x, t.y);
						this.context.rotate(node._absoluteRotation);
						this.context.scale(node._absoluteScale.x, node._absoluteScale.y);

						node.renderSelected(this.context);
						this.context.restore();
					}
				}
			}

			cgsgCurrentFrame++;
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
				nodeToSelect.computeAbsoluteMatrix();
				this.selectedNodes[this.selectedNodes.length] = nodeToSelect;
			}
		},

		/**
		 * Mark the nodes as not selected
		 * @method deselectNode
		 * @param {CGSGNode} nodeToDeselect
		 * */
		deselectNode: function (nodeToDeselect) {
			nodeToDeselect.setSelected(false);
			/*this.selectedNodes = */
			this.selectedNodes.without(nodeToDeselect);
		},

		/**
		 * Mark all nodes as not selected
		 * @method deselectAll
		 * @param {Array} excludedArray CGSGNodes to not deselect
		 * */
		deselectAll: function (excludedArray) {
			var node = null;
			for (var i = this.selectedNodes.length - 1; i >= 0; i--) {
				node = this.selectedNodes[i];
				if (!cgsgExist(excludedArray) || !excludedArray.contains(node)) {
					this.deselectNode(node);
				}
			}

			//just to be sure
			this.selectedNodes.clear();
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
			//this.selectedNodes = new Array();
			cgsgClearContext(cgsgGhostContext);
			//recursively traverse the nodes to get the selected nodes
			if (!cgsgExist(this.root)) {
				return null;
			}
			else {
				return this.root.pickNode(
					mousePosition.copy(), //position of the cursor on the viewport
					new CGSGScale(1, 1), //absolute scale for the nodes
					cgsgGhostContext, //context for the ghost rendering
					true, //recursively ?
					//cgsgCanvas.width / cgsgDisplayRatio.x, cgsgCanvas.height / cgsgDisplayRatio.y,
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
			//this.selectedNodes = new Array();
			cgsgClearContext(cgsgGhostContext);
			//recursively traverse the nodes to get the selected nodes
			if (!cgsgExist(this.root)) {
				return null;
			}
			else {
				return this.root.pickNodes(
					region.copy(), //position of the cursor on the viewport
					new CGSGScale(1, 1), //absolute scale for the nodes
					cgsgGhostContext, //context for the ghost rendering
					true, //recursively ?
					//cgsgCanvas.width / cgsgDisplayRatio.x, cgsgCanvas.height / cgsgDisplayRatio.y,
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
		 * Add a nodes on the scene.
		 * If the root does not already exist, this nodes will be used as root
		 * @method addNode
		 * @param {CGSGNode} node the nodes to add
		 * @param {CGSGNode} parent the parent nodes of the new one. If it's null, the root will be used as nodes.
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
		},

		/**
		 * Add a key
		 * @method addAnimationKey
		 * @param {CGSGNode} node handler to the nodes to animate
		 * @param {String} attribute String representing the attribute to animate ("position.y", "rotation.angle", "fill", ...)
		 * @param {Number} frame the date for the key
		 * @param {Number} value value for the attribute at the frame
		 * @param {String} method animation method. Must be 'linear' for now
		 * @param {Boolean} precompute  Set to true if you want to precompute the animations steps
		 *
		 * @example this.sceneGraph.addAnimation(imgNode, "position.x", 2000, 200, "linear", true);
		 */
		addAnimationKey: function (node, attribute, frame, value, method, precompute) {
			//if a timeline already exist fot this nodes and attribute use it, else create a new one
			var timeline = this.getTimeline(node, attribute);
			timeline.method = method;

			//add the new key to the timeline
			timeline.addKey(CGSGMath.fixedPoint(frame), value);

			//if the user want to precompute the animation, do it now
			if (precompute) {
				timeline.computeValues(cgsgCurrentFrame, method);
			}
		},

		/**
		 * Animate an attribute of a nodes
		 * @method animate
		 * @param {CGSGNode} node Handler to the nodes to animate
		 * @param {String} attribute String representing the attribute to animate ("position.y", "rotation.angle", "fill", ...)
		 * @param {Number} duration Duration of the animation, in frame
		 * @param {Number} from Start value
		 * @param {Number} to End value
		 * @param {String} method Animation method. Must be 'linear' for now
		 * @param {Number} delay Delay before start the animation, in frames
		 * @param {Boolean} precompute Set to true if you want to precompute the animations steps
		 * @example this.sceneGraph.animate(imgNode, "position.x", 700, 0, 200, "linear", 0, true);
		 */
		animate: function (node, attribute, duration, from, to, method, delay, precompute) {
			this.addAnimationKey(node, attribute, cgsgCurrentFrame + CGSGMath.fixedPoint(delay), from,
								 method, false);
			this.addAnimationKey(node, attribute, cgsgCurrentFrame + CGSGMath.fixedPoint(delay + duration),
								 to, method, precompute);
		},

		/**
		 * @method stillHaveAnimation
		 * @return {Boolean} true if there are still animation key after the current frame
		 */
		stillHaveAnimation: function () {
			if (this._listTimelines.length == 0) {
				return false;
			}
			else {
				for (var i = 0, len = this._listTimelines.length; i < len; ++i) {
					if (this._listTimelines[i].getLastKey() !== null &&
						this._listTimelines[i].getLastKey().frame <= cgsgCurrentFrame) {
						return true;
					}
				}
			}

			return false;
		},

		/**
		 * Return the timeline corresponding with the nodes and attribute. Create it if does not exists yet
		 * @method getTimeline
		 * @param {CGSGNode} node Handle to the nodes
		 * @param {String} attribute String. the attribute name
		 * @return {CGSGTimeline}
		 */
		getTimeline: function (node, attribute) {
			for (var i = 0, len = this._listTimelines.length; i < len; ++i) {
				if (this._listTimelines[i].parentNode === node && this._listTimelines[i].attribute == attribute) {
					return this._listTimelines[i];
				}
			}

			//no timeline yet, create a new one
			var timeline = new CGSGTimeline(node, attribute, "linear");
			this._listTimelines.push(timeline);
			return timeline;
		}
	}
);
