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
 * @module Collision
 * @class CGSGCollisionRegionTester
 * @extends {Object}
 * @constructor
 * @type {CGSGCollisionRegionTester}
 * @author Vincent Vanghelle (vincent.vanghelle@capgemini.com)
 */
var CGSGCollisionRegionTester = CGSGObject.extend(
    {
        initialize: function () {
            this.classType = "CGSGCollisionRegionTester";
        },

        /**
         * Indicate if two nodes are colliding
         * @method isColliding
         * @param currentNode
         * @param testedNode
         * @param threshold
         * @return {boolean} true if nodes are colliding
         */
        isColliding: function (currentNode, testedNode, threshold) {
            if (threshold === null) {
                threshold = 0;
            }
            var curNodeLeft = currentNode.getAbsLeft();
            var curNodeRight = currentNode.getAbsRight();
            var curNodeBottom = currentNode.getAbsBottom();
            var testedNodeLeft = testedNode.getAbsLeft();
            var testedNodeRight = testedNode.getAbsRight();
            var testedNodeBottom = testedNode.getAbsBottom();

            if ((curNodeLeft <= testedNodeRight + threshold &&
                 curNodeRight >= testedNodeLeft - threshold) ||
                (curNodeRight >= testedNodeLeft - threshold &&
                 curNodeLeft <= testedNodeRight + threshold)) {

                if (currentNode.getAbsTop() <= testedNodeBottom + threshold &&
                    curNodeBottom >= testedNode.getAbsTop() - threshold) {
                    return true;
                }
            }

            return false;
        }
    }
);
