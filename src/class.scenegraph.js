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
 * @date 02/07/2012
 *
 * Purpose:
 * Represent the scene graph itself.
 *
 * It encapsulates the root node of the graph and timelines for animations.
 *
 */
var CGSGSceneGraph = Object.extend(
	{
		initialize : function (canvas, context) {
			///// @public //////
			this.root = null;
			this.context = context;
			this.canvas = canvas;

			///// @protected //////
            cgsgCurrentFrame = 0;

			///// @private //////

			//the nodes selected by the user
			this.selectedNodes = new Array();
			this._nextNodeID = 1;

			//list of the timelines for the animations
			//a timeline consist of a list of animation keys for 1 attribute of the nodes
			this._listTimelines = [];

			///// INITIALIZATION //////

			//initialize the ghost canvas used to determine which nodes are selected by the user
			this.ghostCanvas = document.createElement('canvas');
			this.initializeGhost();

			//fixes a problem where double clicking causes text to get selected on the canvas
			this.canvas.onselectstart = function () {
				return false;
			};
		},

		/**
		 * @private
		 * @param width The width for the canvas. Must be the same as the rendering canvas
		 * @param height The height for the canvas. Must be the same as the rendering canvas
		 * Initialize the ghost rendering, used by the PickNode function
		 * */
		initializeGhost : function (width, height) {
			this.ghostCanvas.height = height;
			this.ghostCanvas.width = width;
			cgsgGhostContext = this.ghostCanvas.getContext('2d');
		},

		/**
		 * @private
		 * wipes the canvas context
		 * */
		_clearContext : function (context) {
			context.setTransform(1, 0, 0, 1, 0, 0);
			// Will always clear the right space
			context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		},

		/**
		 * @public
		 * render the SceneGraph
		 * */
		render : function () {
			//erase previous rendering
			this._clearContext(this.context);

			if (this.root !== null && this.root !== undefined) {
				var node = null;
				var i = 0;
				var len = 0;
				var key = null;
				//set the new values for the animated nodes
				if (this._listTimelines.length > 0) {
					node = null;
					var value = undefined;
					for (i = 0, len = this._listTimelines.length; i < len; ++i) {
						node = this._listTimelines[i].parentNode;

						if (node.isVisible) {
							value = this._listTimelines[i].getValue(cgsgCurrentFrame);
							if (value !== undefined) {
								node.evalSet(this._listTimelines[i].attribute, value.value);
							}

							//fire event if this is the first animation key for this timeline
							key = this._listTimelines[i].getFirstKey();
							if (key !== null && key.frame == cgsgCurrentFrame &&
								this._listTimelines[i].onAnimationStart !== null) {
								this._listTimelines[i].onAnimationStart();
							}
							//fire event if this is the last animation key for this timeline
							key = this._listTimelines[i].getLastKey();
							if (key !== null && key.frame == cgsgCurrentFrame) {
								if (this._listTimelines[i].onAnimationEnd !== null) {
									this._listTimelines[i].onAnimationEnd();
								}
								this._listTimelines[i].removeAll();
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
						var t = n.computeAbsolutePosition();

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
		 * @private
		 * Change the dimension of the canvas.
		 * Does not really change the dimension of the rendering canvas container,
		 *  but is used by the different computations
		 * @param newDimension a CGSGVector2D
		 * */
		setCanvasDimension : function (newDimension) {
			this.canvas.width = newDimension.x;
			this.canvas.height = newDimension.y;
			this.initializeGhost(this.canvas.width, this.canvas.height);
		},

		/**
		 * @public
		 * Mark the nodes as selected so the select marker (also called selectedHandlers)
		 *  will be shown and the SceneGraph will manage the moving and resizing of the seledted objects.
		 * To manually manage the selected object, do not call this function
		 * @param nodeToSelect The CGSGNode to be selected
		 * */
		selectNode : function (nodeToSelect) {
			if (!nodeToSelect.isSelected) {
				nodeToSelect.setSelected(true);
				nodeToSelect.computeAbsoluteMatrix();
				this.selectedNodes[this.selectedNodes.length] = nodeToSelect;
			}
		},

		/**
		 * @public
		 * Mark the nodes as not selected
		 * */
		deselectNode : function (nodeToDeselect) {
			nodeToDeselect.setSelected(false);
			/*this.selectedNodes = */
			this.selectedNodes.without(nodeToDeselect);
		},

		/**
		 * @public
		 * Mark all nodes as not selected
		 * */
		deselectAll : function () {
			this._isDrag = false;
			this._isResizeDrag = false;
			this._resizingDirection = -1;

			for (var i = this.selectedNodes.length - 1; i >= 0; i--) {
				this.deselectNode(this.selectedNodes[i]);
			}

			//just to be sure
			this.selectedNodes.clear();
		},

		/**
		 * @public
		 * Recursively traverse the nodes and return the one who is under the mouse coordinates
		 * @param mousePosition A CGSGPosition object
		 * */
		pickNode : function (mousePosition, condition) {
			//empty the current selection first
			//this.selectedNodes = new Array();
			this._clearContext(cgsgGhostContext);
			//recursively traverse the nodes to get the selected nodes
			if (this.root === null || this.root === undefined) {
				return null;
			}
			else {
				return this.root.pickNode(
					mousePosition.copy(), //position of the cursor on the viewport
					new CGSGScale(1, 1), //absolute scale for the nodes
					cgsgGhostContext, //context for the ghost rendering
					true, //recursively ?
					this.canvas.width / cgsgDisplayRatio.x, this.canvas.height / cgsgDisplayRatio.y,
					//dimension of the canvas container
					condition);  // condition to the picknode be executed
			}
		},

		/**
		 * @public
		 * Remove the child nodes passed in parameter, from the root nodes
		 * @param node the nodes to remove
		 * @param recursively if true, try to remove the nodes inside the entire tree
		 * @return true if the nodes was foud and removed
		 * */
		removeNode : function (node, recursively) {
			if (node !== null && node !== undefined) {
				this.deselectNode(node);
				if (this.root !== null) {
					return this.root.removeChild(node, recursively);
				}
			}
			return false;
		},

		/**
		 * @public
		 * Add a nodes on the scene
		 * @param node the nodes to add
		 * @param parent the parent nodes of the new one. If it's null, the root will be used as nodes.
		 * If the root does not already exist, this nodes will be used as root
		 * */
		addNode : function (node, parent) {
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
		 * @public
		 *
		 * Add a key
		 *
		 * @param node handler to the nodes to animate
		 * @param attribute String representing the attribute to animate ("position.y", "rotation.angle", "fill", ...)
		 * @param frame integer. the date for the key
		 * @param value value for the attribute at the frame
		 * @param method String. animation method: 'linear', 'catmullrom'
		 * @param precompute Boolean. Set to tru if you want to precompute the animations steps
		 *
		 * @example this.sceneGraph.addAnimation(imgNode, "position.x", 2000, 200, "linear", true);
		 */
		addAnimationKey : function (node, attribute, frame, value, method, precompute) {
			//if a timeline already exist fot this nodes and attribute use it, else create a new one
			var timeline = this.getTimeline(node, attribute);
			timeline.method = method;

			//add the new key to the timeline
			timeline.addKey(frame, value);

			//if the user want to precompute the animation, do it now
			if (precompute) {
				timeline.computeValues(cgsgCurrentFrame, method);
			}
		},

		/**
		 * @public
		 * Animate an attribute of a nodes
		 * @param node Handler to the nodes to animate
		 * @param attribute String representing the attribute to animate ("position.y", "rotation.angle", "fill", ...)
		 * @param duration Integer. Duration of the animation, in frames
		 * @param from Start value
		 * @param to End value
		 * @param method String. animation method: 'linear', 'catmullrom'
		 * @param delay Integer. Delay before start the animation, in frames
		 * @param precompute Boolean. Set to tru if you want to precompute the animations steps
		 *
		 * @example this.sceneGraph.animate(imgNode, "position.x", 700, 0, 200, "linear", 0, true);
		 */
		animate : function (node, attribute, duration, from, to, method, delay, precompute) {
			this.addAnimationKey(node, attribute, cgsgCurrentFrame + CGSGMath.fixedPoint(delay), from,
								 method, false);
			this.addAnimationKey(node, attribute, cgsgCurrentFrame + CGSGMath.fixedPoint(delay + duration),
								 to, method, precompute);
		},

		/**
		 * @public
		 * Return true if there are still animation key after the current frame
		 */
		stillHaveAnimation : function () {
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
		 * @public
		 * Return the timeline corresponding with the nodes and attribute. Create it if not exists
		 * @param node Handle to the nodes
		 * @param attribute String. the attribute name
		 */
		getTimeline : function (node, attribute) {
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
