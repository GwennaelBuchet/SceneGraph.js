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
 * A Traverser is an utility class that traverse the scene graph and return a list of node, depending on conditions you fixed
 * @class CGSGTraverser
 * @extends Object
 * @constructor
 * @type {CGSGTraverser}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGTraverser = CGSGObject.extend(
	{
		initialize: function () {
			/**
			 * Last results provided by the last check
			 * @property lastResults
			 * @type {Array}
			 */
			this.lastResults = [];
		},

		/**
		 * @public
		 * @method traverse
		 *
		 * @param {CGSGNode} rootNode
		 * @param {Function} condition. can be null
		 * @param {Array} excludedNodes Array of CGSGNode
		 * @return {Array} the list of nodes recursively under 'rootNode', accepting the 'condition' and not in 'excludedNodes'
		 *
		 * @example
		 *  var condition = function(node) {
					return node.color == "yellow";
				};

		 var traverser = new CGSGTraverser();
		 var listSquares = traverser.traverse(this.rootNode, condition, null);
		 for (var s = 0; s < listSquares.length; s++) {
					...
				}
		 */
		traverse: function (rootNode, condition, excludedNodes) {
			this.lastResults.clear();

			if (cgsgExist(condition)) {
				this._check(rootNode, condition, excludedNodes);
			}

			return this.lastResults;
		},

		/**
		 * @private
		 * @method _check
		 * @param {CGSGNode} rootNode
		 * @param {Function} condition
		 * @param {Array} excludedNodes
		 */
		_check: function (rootNode, condition, excludedNodes) {
			if (rootNode.isTraversable === true) {
				var exclusionExist = cgsgExist(excludedNodes) && excludedNodes.length > 0;

				if (!(exclusionExist && excludedNodes.contains(rootNode)) && condition(rootNode) === true) {
					this.lastResults.push(rootNode);
				}

				for (var i = rootNode.children.length - 1; i >= 0; --i) {
					var childNode = rootNode.children[i];
					this._check(childNode, condition, excludedNodes);
				}
			}
		}
	}
);