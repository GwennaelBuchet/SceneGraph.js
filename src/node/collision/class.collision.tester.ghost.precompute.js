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
 * @class CGSGCollisionGhostPrecomputeTester
 * @extends {Object}
 * @constructor
 * @type {CGSGCollisionGhostPrecomputeTester}
 * @author Vincent Vanghelle (vincent.vanghelle@capgemini.com)
 */
var CGSGCollisionGhostPrecomputeTester = CGSGObject.extend(
    {
        initialize : function () {
            this.classType="CGSGCollisionGhostPrecomputeTester";
        },

        isColliding : function(currentNode, testedNode,threshold){
            if (currentNode.fullImageData == null || testedNode.fullImageData == null){
                return false;
            }
            // get deltas to run through minimum pixels (only union of both nodes)
            var deltaX = testedNode.getAbsoluteLeft() - currentNode.getAbsoluteLeft();
            var deltaY = testedNode.getAbsoluteTop() - currentNode.getAbsoluteTop();

            // with delta, calculate the start and end (length) of x and y
            var lengthX = (deltaX >= 0) ?
                Math.min(currentNode.getAbsoluteWidth() - deltaX, testedNode.getAbsoluteWidth()) :
                Math.min(testedNode.getAbsoluteWidth() + deltaX, currentNode.getAbsoluteWidth());

            var lengthY = (deltaY >= 0) ?
                Math.min(currentNode.getAbsoluteHeight() - deltaY, testedNode.getAbsoluteHeight()) :
                Math.min(testedNode.getAbsoluteHeight() + deltaY, currentNode.getAbsoluteHeight());

            if ((lengthX <= 0) || (lengthY <= 0)) {
                return false;
            }

            var startX = (deltaX >= 0) ? deltaX : 0;
            var startY = (deltaY >= 0) ? deltaY : 0;
            var endX = startX + lengthX;
            var endY = startY + lengthY;

            var indexThis = 0, indexNode = 0 ;

            //run through data image data, in the common zone
            for (var x = startX; x < endX; x++) {
                for (var y = startY; y < endY; y++) {
                    indexThis = ((x) + (y) * currentNode.fullImageData.width) * 4;
                    indexNode = ((x - deltaX) + (y - deltaY) * testedNode.fullImageData.width) * 4;
                    // check alpha
                    if (currentNode.fullImageData.data[indexThis + 3] > 0 && testedNode.fullImageData.data[indexNode + 3] > 0) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
);
