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
            this.canvas.width = 10;
            this.canvas.height = 10;
            this._renderContext = this.canvas.getContext('2d');
            this.autoRefresh = true;
            this.refreshOnNextFrame = false;
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
        prepare : function (node, context) {
            this._saveContext = context;
            this.canDrawImage = true;

            if (this.autoRefresh || this.refreshOnNextFrame) {
                this._renderContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.refreshOnNextFrame = false;

                // Get mask region
                var pMask = this._maskRegion.position;
                var dMask = this._maskRegion.dimension;
                var x = pMask.x;
                var y = pMask.y;

                // Get node region according to its scale and mask constraints
                var nodePos = node.position;
                var nodeDimension = node.dimension;
                var nodeWidth = nodeDimension.width - x;
                var nodeHeight = nodeDimension.height - y;

                // Decide if the mask or the node region should be applied
                var w = dMask.width;
                var h = dMask.height;

                if (w > nodeWidth) {
                    w = nodeWidth <= 0 ? 0 : nodeWidth;
                }

                if (h > nodeHeight) {
                    h = nodeHeight <= 0 ? 0 : nodeHeight;
                }

                // Get image data only if necessary...
                if (w > 0 && h > 0) {
                    var rX = nodePos.x + x;
                    var rY = nodePos.y + y;

                    // Define slices according to the part of the node out of the window
                    var sX, sY, sW, sH;

                    if (rX < 0) {
                        sX = 0;
                        sW = w + rX;
                    } else {
                        sX = node.position.x + x;
                        sW = w;
                    }

                    if (rY < 0) {
                        sY = 0;
                        sH = h + rY;
                    } else {
                        sY = node.position.y + y;
                        sH = h;
                    }

                    // Experimental, reduce definition in memory to work on non-retina IPad (< 4)
                    //sH *= 0.5;
                    //sY *= 0.5;
                    //node.scaleTo(0.5, 0.5, true);

                    this.canvas.width = (sX + sW + 1);
                    this.canvas.height = (sY + sH + 1);
                    this.sliceX = sX;
                    this.sliceY = sY;
                    this.sliceWidth = sW;
                    this.sliceHeight = sH;
                } else {
                    this.canDrawImage = false;
                }

                this._renderContext.save();
                return this._renderContext;
            }

            return null;
        },

        /**
         * Finalize this mask by adding to the saved context the image data corresponding to the mask region.
         *
         * @method finalize
         * @param node {CGSGNode} the node
         * @param context {CanvasRenderingContext2D} the context returned by prepare()
         * @return {CanvasRenderingContext2D} the context that was used to invoke prepare()
         */
        finalize : function (node, context) {

            if (this.canDrawImage) {
                //node.scaleTo(1, 1, true);
                this._saveContext.drawImage(this.canvas, this.sliceX, this.sliceY, this.sliceWidth, this.sliceHeight, this.sliceX, this.sliceY, this.sliceWidth /* 2*/, this.sliceHeight /* 2*/);
                this._renderContext.restore();
            }

            return this._saveContext;
        }
    }
);
