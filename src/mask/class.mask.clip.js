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

/**
 * This class clips a region of a given node (including its children) according to a specified dimension. Internally,
 * a fake context is created and then desired data are retrieved from it and drawn to the original context.
 *
 * @class CGSGMaskClip
 * @extends CGSGMask parent class here
 * @constructor
 * @param {CGSGRegion} clipRegion the region to clip
 * @author Guillaume Drouet (guidrouet@gmail.com)
 * @type {CGSGMaskClip}
 */

var CGSGMaskClip = CGSGMask.extend(
    {
        initialize: function (clipRegion) {
            this._super();
            this._maskRegion = clipRegion;

            this._saveContext = null;

            this.canvas = document.createElement('canvas');
            this.canvas.width = CGSG.canvas.width;
            this.canvas.height = CGSG.canvas.height;
            this._renderContext = this.canvas.getContext('2d');
        },

        /**
         * Prepare the rendering of the node by saving the given context and returning a temporary context where the
         * node and its children should rendered.
         *
         * @method prepare
         * @param node {CGSGNode} the node
         * @param context {CanvasRenderingContext2D} the context where the region will be clipped
         * @return {CanvasRenderingContext2D} the context to use
         */
        prepare : function(node, context) {
            this._renderContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this._saveContext = context;

            return this._renderContext;
        },

        /**
         * Finalize this mask by adding to the saved context the image data corresponding to the mask region.
         *
         * @method finalize
         * @param node {CGSGNode} the node
         * @param context {CanvasRenderingContext2D} the context returned by prepare()
         * @return {CanvasRenderingContext2D} the context that was used to invoke prepare()
         */
        finalize : function(node, context) {
            // Get mask region
            var pMask = this._maskRegion.position;
            var dMask = this._maskRegion.dimension;
            var x = pMask.x;
            var y = pMask.y;

            // Get node region according to its scale and mask constraints
            var nodeAbsPos = node.getAbsolutePosition();
            var nodeAbsScale = node.getAbsoluteScale();
            var nodeDimension = node.dimension;
            var nodeWidth = (nodeDimension.width * nodeAbsScale.x) - x;
            var nodeHeight = (nodeDimension.height * nodeAbsScale.y) - y;

            // Decide if the mask or the node region should be applied
            var w = dMask.width * nodeAbsScale.x;
            var h = dMask.height * nodeAbsScale.y;

            if (w > nodeWidth) {
                w = nodeWidth <= 0 ? 0 : nodeWidth;
            }

            if (h > nodeHeight) {
                h = nodeHeight <= 0 ? 0 : nodeHeight;
            }

            // Get image data only if necessary...
            if (w > 0 && h > 0) {
                var rX = nodeAbsPos.x + x;
                var rY = nodeAbsPos.y + y;

                // Define slices according to the part of the node out of the window
                var sX, sY, sW, sH;

                if (rX < 0) {
                    sX = 0;
                    sW = w + rX;
                } else {
                    sX = rX;
                    sW = w;
                }

                if (rY < 0) {
                    sY = 0;
                    sH = h + rY;
                } else {
                    sY = rY;
                    sH = h;
                }

                this._saveContext.drawImage(this.canvas, sX, sY, sW, sH, sX, sY, sW, sH);
            }

            return this._saveContext;
        }
    }
);
