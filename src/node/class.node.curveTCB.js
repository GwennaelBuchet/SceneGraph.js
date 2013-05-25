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

/**
 * A CGSGNodeSquare represent a basic square
 *
 * @class CGSGNodeCurveTCB
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @type {CGSGNodeCurveTCB}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGNodeCurveTCB = CGSGNode.extend(
    {
        initialize: function (x, y) {
            this._super(x, y);

            this.resizeTo(300, 300);

            /**
             * Color  to fill the square
             * @property color
             * @default "#444444"
             * @type {String}
             */
            this.color = "#444444";
            /**
             * Color to stroke the square
             * @property lineColor
             * @default "#222222"
             * @type {String}
             */
            this.lineColor = "#222222";
            /**
             * Width of the line that stroke the square.
             * Let 0 if you don't want to stroke the square.
             * @property lineWidth
             * @default 0
             * @type {Number}
             */
            this.lineWidth = 2;

            this._interpolator = new CGSGInterpolatorTCB();
            this._keys = [];
            this._nbKeys = 0;
            this._values = [];
            this._nbValues = 0;
            this._steps = [];

            /**
             * @property classType
             * @readonly
             * @type {String}
             */
            this.classType = "CGSGNodeCurveTCB";
        },

        /**
         * @method addKey
         * @param x
         * @param y
         * @param t
         * @param c
         * @param b
         * @return {CGSGKeyFrame}
         */
        addKey: function (x, y, t, c, b) {
            var k = new CGSGKeyFrame(this._nbKeys, {x: x, y: y});
            k.userData = {t: t, c: c, b: b};
            this._keys.push(k);
            this._nbKeys++;

            if (this._nbKeys > 1)
                this._steps.push(20);

            var s = new CGSGNodeSquare(x - 2, y - 2, 4, 4);
            s.color = "#4488AF";
            this.addChild(s);

            return k;
        },

        compute: function () {
            var v = this._interpolator.compute(this._keys, this._steps);
            this._values = v.copy();
            this._nbValues = this._values.length;
        },

        /**
         * Custom rendering
         * @method render
         * @protected
         * @param {CanvasRenderingContext2D} context the context into render the node
         * */
        render: function (context) {
            if (this._nbValues > 0) {
                context.fillStyle = this.color;

                context.beginPath();
                context.globalAlpha = this.globalAlpha;

                context.moveTo(this._values[0].x, this._values[0].y);

                for (var i = 1; i < this._nbValues; i++) {
                    context.lineTo(this._values[i].x, this._values[i].y);
                }

                if (this.lineWidth > 0) {
                    context.lineWidth = this.lineWidth;
                    context.strokeStyle = this.lineColor;
                    context.stroke();
                }
            }
        },

        /**
         * @method copy
         * @return {CGSGNodeCurveTCB} a copy of this node
         */
        copy: function () {
            var node = new CGSGNodeCurveTCB(this.position.x, this.position.y);
            //call the super method
            node = this._super(node);
            
            var k;
            for (var i= 0; i<this._nbKeys; i++) {
                k = this._keys[i];
                node.addKey(k.value.x, k.value.y, k.userData.t, k.userData.c, k.userData.b);
            }
            node.compute();

            node.color = this.color;
            node.lineColor = this.lineColor;
            node.lineWidth = this.lineWidth;
            return node;
        }
    }
);
