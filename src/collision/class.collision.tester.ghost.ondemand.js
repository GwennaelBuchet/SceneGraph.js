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
        initialize: function () {
            this.classType = "CGSGCollisionGhostOnDemandTester";
        },

        /**
         * Indicate if two nodes are colliding
         * @method isColliding
         * @param cn {CGSGNode} currentNode
         * @param tn {CGSGNode} testedNode
         * @param t {Number} threshold
         * @return {boolean} true if nodes are colliding
         */
        isColliding: function (cn, tn, t) {
            // get deltas to run through minimum pixels (only union of both nodes)
            var deltaX = tn.getAbsLeft() - cn.getAbsLeft();
            var deltaY = tn.getAbsTop() - cn.getAbsTop();

            // with delta, calculate the start and end (length) of x and y
            var lengthX = (deltaX >= 0) ?
                Math.min(cn.getAbsWidth() - deltaX, tn.getAbsWidth()) :
                Math.min(tn.getAbsWidth() + deltaX, cn.getAbsWidth());

            var lengthY = (deltaY >= 0) ?
                Math.min(cn.getAbsHeight() - deltaY, tn.getAbsHeight()) :
                Math.min(tn.getAbsHeight() + deltaY, cn.getAbsHeight());

            if ((lengthX <= 0) || (lengthY <= 0)) {
                return false;
            }

            var startX = (deltaX >= 0) ? deltaX : 0;
            var startY = (deltaY >= 0) ? deltaY : 0;

            // draw 1st
            var tmpCanvas = document.createElement('canvas');
            tmpCanvas.width = cn.getAbsWidth();
            tmpCanvas.height = cn.getAbsHeight();
            var ctx = tmpCanvas.getContext("2d");
            //ctx.scale(cn.getAbsoluteScale().x, cn.getAbsoluteScale().y);
            ctx.scale(cn._absSca.x, cn._absSca.y);

            // draw 1st at 0x0; (backup position, render, restore position)
            var backupPosition = cn.position;
            cn.position = new CGSGPosition(0, 0);
            cn.render(ctx);
            cn.position = backupPosition;

            // draw node : canvas
            var tmpCanvas2 = document.createElement('canvas');
            tmpCanvas2.width = tn.getAbsWidth();
            tmpCanvas2.height = tn.getAbsHeight();
            var ctx2 = tmpCanvas2.getContext("2d");

            // draw node  (backup position, render, restore position)
            backupPosition = tn.position;
            tn.position = new CGSGPosition(0, 0);
            tn.render(ctx2);
            tn.position = backupPosition;

            // compute both with mask at deltas
            ctx.globalCompositeOperation = "destination-in";
            //ctx.drawImage(tmpCanvas2, deltaX / cn.getAbsoluteScale().x, deltaY / cn.getAbsoluteScale().y);
            ctx.drawImage(tmpCanvas2, deltaX / cn._absSca.x, deltaY / cn._absSca.y);

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
