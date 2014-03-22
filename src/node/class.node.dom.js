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

"use strict";

/**
 * Wraps inside a CGSGNode a DOM element to display it in the scene. Note that the element will be on top of canvas
 * element so it will be over any node rendered in this element.
 *
 * @class CGSGNodeDomElement
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @param {HTMLElement} el the DOM element do be wrapped
 * @type {CGSGNodeWebview}
 */
var CGSGNodeDomElement = CGSGNode.extend(
    {
        initialize : function (x, y, width, height, el) {
            this._super(x, y);

            this.resizeTo(CGSGMath.fixedPoint(width), CGSGMath.fixedPoint(height));

            /**
             * Size of the area around the element
             * @property threshold
             * @default 20
             * @type {Number}
             */
            this.threshold = 20;

            /**
             * @property classType
             * @type {String}
             */
            this.classType = "CGSGNodeDomElement";

            /**
             * A HTML tag that contains the element
             * @property _htmlElement
             * @type {HTMLElement}
             * @private
             */
            this._htmlElement = el;

            // We work in absolute position
            this._htmlElement.style.position = "absolute";
            this.updateCssRegion();

            // Listen
        },

        /**
         * Updates the styles of the wrapped DOM element to change its position and size inside the scene.
         */
        updateCssRegion: function() {
            if (cgsgExist(this._htmlElement)) {
                this._htmlElement.style.left = (this.getAbsLeft() + this.threshold) + "px";
                this._htmlElement.style.top = (this.getAbsTop() + this.threshold) + "px";
                this._htmlElement.style.width = (this.getAbsWidth() - this.threshold * 2) + "px";
                this._htmlElement.style.height = (this.getAbsHeight() - this.threshold * 2) + "px";
            }
        },

        /**
         * @protected
         * @method render
         * Custom rendering
         * */
        render : function (context) {
            context.fillStyle = this.color;
            context.strokeStyle = this.lineColor;
            context.lineWidth = this.lineWidth;

            //we draw the rect at (0,0) because we have already translated the context to the correct position
            context.fillRect(0, 0, this.getWidth(), this.getHeight());
            context.strokeRect(0, 0, this.getWidth(), this.getHeight());

            this.updateCssRegion();
        },

        /**
         * Return the copy of this node
         * @method copy
         * @return {CGSGNodeDomElement}
         */
        copy : function () {
            var node = new CGSGNodeDomElement(this.position.x, this.position.y, this.dimension.width,
                this.dimension.height, this._htmlElement);
            //call the super method
            node = this._super(node);

            node.threshold = this.threshold;
            node.color = this.color;
            node.lineColor = this.lineColor;

            return node;
        }
    }
);
