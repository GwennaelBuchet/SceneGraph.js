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
 * @module Collision
 * @class CGSGCollisionManager
 * @extends {Object}
 * @constructor
 * @type {CGSGCollisionManager}
 * @author Vincent Vanghelle (vincent.vanghelle@capgemini.com)
 */
var CGSGCollisionManager = CGSGObject.extend(
	{
		initialize : function () {
		},

        /**
         * Indicate if two nodes are colliding
         * @method isColliding
         * @param currentNode
         * @param testedNode
         * @param threshold
         * @return {boolean} true if nodes are colliding
         */
        isColliding : function(currentNode, testedNode, threshold){
            if (currentNode.isCollisionManaged && testedNode.isCollisionManaged){
                if (cgsgExist(cgsgPerformanceKeys)){
                    return cgsgPerformanceKeys.collisionTester.isColliding(currentNode,testedNode,threshold);
                }
            }
            return false;
        },

        /**
         * Defines a node as managed by the collision manager
         * @method manageNode
         * @param node
         */
        manageNode : function(node){
            node.isCollisionManaged = true;
        },

        /**
         * Defines a node as not managed by the collision manager
         * @method unManageNode
         * @param node
         */
        unManageNode : function(node){
            node.isCollisionManaged = false;
        }
	}
);

