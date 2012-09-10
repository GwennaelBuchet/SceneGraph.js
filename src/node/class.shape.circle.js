/**
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
 * @date 07/07/2012
 *
 * Purpose:
 * Subclassing CGSGNode.
 *
 * A CGSGNodeSquare represent a square
 */
var CGSGNodeCircle = CGSGNode.extend(
    {
        initialize:function (x, y, width, height) {
            this._super(x, y, width, height);

            ///// @public //////
            this.color = "#444444";
            this.lineColor = "#222222";
            this.lineWidth = 0;

            this.classType = "CGSGNodeCircle";
        },

        /**
         * @override
         * Must be defined to allow the scene graph to render the image nodes
         * */
        render:function (context) {
            //save current state
            this.beforeRender(context);

            context.globalAlpha = this.globalAlpha;

            var centerX = this.dimension.width / 2;
            var centerY = this.dimension.height / 2;
            var radius = Math.min(centerX, centerY);

            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            context.fillStyle = this.color;
            context.fill();
            if (this.lineWidth > 0) {
                context.lineWidth = this.lineWidth;
                context.strokeStyle = this.lineColor;
                context.stroke();
            }

            //restore state
            this.afterRender(context);
        },

        /**
         *
         * @return a copy of this node
         */
        copy:function () {
            var node = new CGSGNodeSquare(this.position.x, this.position.y, this.dimension.width,
                this.dimension.height);
            //call the super method
            node = this._super(node);

            node.color = this.color;
            node.lineColor = this.lineColor;
            node.lineWidth = this.lineWidth;
            return node;
        }
    }
);
