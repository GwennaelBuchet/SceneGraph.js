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
 * A CGSGNodeSquare represent a basic square
 *
 * @class CGSGNodeSquare
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @type {CGSGNodeSquare}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGNodeSquare = CGSGNode.extend(
    {
        initialize: function (x, y, width, height) {
            this._super(x, y);

            this.resizeTo(width, height);

            /**
             * @property classType
             * @readonly
             * @type {String}
             */
            this.classType = "CGSGNodeSquare";
        },

        /**
         * Custom rendering
         * @method render
         * @protected
         * @param c {CanvasRenderingContext2D} the context into render the node
         * */
        render: function (c) {
            //Next lines are already managed by CGSGNode.
            //I let it here just to provide an example

            //draw this zone
            //c.fillStyle = this.bkgcolors[0];

            //if (this.lineWidth > 0) {
            //	c.strokeStyle = this.lineColor;
            //	c.lineWidth = this.lineWidth;
            //}

            //we draw the rect at (0,0) because we have already translated the c to the correct position
            if (!cgsgExist(this.radius) || this.radius <= 0) {
                c.fillRect(0, 0, this.dimension.width, this.dimension.height);
                if (this.lineWidth > 0) {
                    c.strokeRect(0, 0, this.dimension.width, this.dimension.height);
                }
            }
            else {
                c.save();
                var r = this.radius;
                var w = this.dimension.width;
                var h = this.dimension.height;
                var rw = r + w;
                var rh = r + h;

                c.translate(-r, -r);

                c.beginPath();
                c.moveTo(2 * r, r);
                c.lineTo(w, r);
                c.quadraticCurveTo(rw, r, rw, r + r);
                c.lineTo(rw, h);
                c.quadraticCurveTo(rw, rh, w, rh);
                c.lineTo(r + r, rh);
                c.quadraticCurveTo(r, rh, r, h);
                c.lineTo(r, r + r);
                c.quadraticCurveTo(r, r, r + r, r);
                c.closePath();

                c.fill();
                if (this.lineWidth > 0) {
                    c.stroke();
                }

                c.restore();
            }
        },

        /**
         * @method copy
         * @return {CGSGNodeSquare} a copy of this node
         */
        copy: function () {
            var node = new CGSGNodeSquare(this.position.x, this.position.y, this.dimension.width,
                                          this.dimension.height);
            //call the super method
            return this._super(node);
        }
    }
);
