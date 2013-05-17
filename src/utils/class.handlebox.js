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
 * A Tiny box on selected square borders
 * @class CGSGHandleBox
 * @extends {Object}
 * @constructor
 * @param {CGSGNode} parentNode
 * @param {Number} size
 * @param {String} fillColor
 * @param {String} strokeColor
 * @param {Number} lineWidth
 * @param {Number} x
 * @param {Number} y
 * @type {CGSGHandleBox}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGHandleBox = CGSGObject.extend(
    {
        initialize: function (parentNode, size, fillColor, strokeColor, lineWidth, x, y) {
            /**
             * @property fillColor
             * @type {String}
             */
            this.fillColor = fillColor;

            /**
             * @property strokeColor
             * @type {String}
             */
            this.strokeColor = strokeColor;

            /**
             * @property lineWidth
             * @type {Number}
             */
            this.lineWidth = lineWidth;

            /**
             * @property size
             * @type {Number}
             */
            this.size = size;

            /**
             * @property isVisible
             * @type {boolean}
             */
            this.isVisible = true;

            /**
             * @property _parentNode
             * @type {CGSGNode}
             * @private
             */
            this._parentNode = parentNode;
            /**
             * @property _position
             * @type {CGSGPosition}
             * @private
             */
            this._position = new CGSGPosition(x, y);
        },

        /**
         * @method render
         * @param {CanvasRenderingContext2D} context the context into render the handle box
         */
        render: function (context) {
            if (this.isVisible) {
                context.lineWidth = this.lineWidth;
                context.strokeStyle = this.strokeColor;
                context.fillStyle = this.fillColor;
                context.strokeRect(this._position.x,
                    this._position.y,
                    this.size / this._parentNode._absoluteScale.x,
                    this.size / this._parentNode._absoluteScale.y);
                context.fillRect(this._position.x,
                    this._position.y,
                    this.size / this._parentNode._absoluteScale.x,
                    this.size / this._parentNode._absoluteScale.y);
            }
        },

        /**
         * Return true if this handleBox is under the coordinate of the mouse.
         * @method checkIfSelected
         * @param {CGSGPosition} mousePosition
         * @param {Number} threshold Threshold of detection around the box
         * @return {Boolean}
         */
        checkIfSelected: function (mousePosition, threshold) {
            return (mousePosition.x >=
                this._parentNode._absolutePosition.x + (this._position.x * this._parentNode._absoluteScale.x) -
                    threshold &&
                mousePosition.x <=
                    this._parentNode._absolutePosition.x + (this._position.x * this._parentNode._absoluteScale.x) +
                        this.size + threshold &&
                mousePosition.y >=
                    this._parentNode._absolutePosition.y + (this._position.y * this._parentNode._absoluteScale.y) -
                        threshold &&
                mousePosition.y <=
                    this._parentNode._absolutePosition.y + (this._position.y * this._parentNode._absoluteScale.y) +
                        this.size + threshold);
        },

        /**
         * @method translateTo
         * @param {Number} newRelativeX
         * @param {Number} newRelativeY
         */
        translateTo: function (newRelativeX, newRelativeY) {
            this._position.x = newRelativeX;
            this._position.y = newRelativeY;
        }
    }
);
	