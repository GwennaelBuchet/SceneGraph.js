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
 * @class CGSGCollisionGhostOnDemandTester
 * @extends {Object}
 * @constructor
 * @type {CGSGCollisionGhostOnDemandTester}
 * @author Vincent Vanghelle (vincent.vanghelle@capgemini.com)
 */
var CGSGCollisionGhostOnDemandTester = CGSGObject.extend(
    {
        initialize : function () {
            this.classType="CGSGCollisionGhostOnDemandTester";
        },

        /**
         * Indicate if two nodes are colliding
         * @method isColliding
         * @param currentNode
         * @param testedNode
         * @param threshold
         * @return {boolean} true if nodes are colliding
         */
        isColliding : function(currentNode, testedNode,threshold){
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

            // draw 1st
            var tmpCanvas = document.createElement('canvas');
            tmpCanvas.width = currentNode.getAbsoluteWidth();
            tmpCanvas.height = currentNode.getAbsoluteHeight();
            var ctx = tmpCanvas.getContext("2d");
            //ctx.scale(currentNode.getAbsoluteScale().x, currentNode.getAbsoluteScale().y);
            ctx.scale(currentNode._absoluteScale.x, currentNode._absoluteScale.y);

            // draw 1st at 0x0; (backup position, render, restore position)
            var backupPosition = currentNode.position;
            currentNode.position = new CGSGPosition(0, 0);
            currentNode.render(ctx);
            currentNode.position = backupPosition;

            // draw node : canvas
            var tmpCanvas2 = document.createElement('canvas');
            tmpCanvas2.width = testedNode.getAbsoluteWidth();
            tmpCanvas2.height = testedNode.getAbsoluteHeight();
            var ctx2 = tmpCanvas2.getContext("2d");

            // draw node  (backup position, render, restore position)
            backupPosition = testedNode.position;
            testedNode.position = new CGSGPosition(0,0);
            testedNode.render(ctx2);
            testedNode.position = backupPosition;

            // compute both with mask at deltas
            ctx.globalCompositeOperation = "destination-in";
            //ctx.drawImage(tmpCanvas2, deltaX / currentNode.getAbsoluteScale().x, deltaY / currentNode.getAbsoluteScale().y);
            ctx.drawImage(tmpCanvas2, deltaX / currentNode._absoluteScale.x, deltaY / currentNode._absoluteScale.y);

            // WARN : security exception with chrome when calling .html directly (no apache server)
            var canvasData = ctx.getImageData(startX, startY, lengthX, lengthY);
            //run through data canvas, in the common zone
            for (var x = 0; x < canvasData.width; x++) {
                for (var y = 0; y < canvasData.height; y++) {
                    var idx = ((x) + (y) * canvasData.width) * 4;
                    // check alpha
                    if (canvasData.data[idx + 3] > 0) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
);
