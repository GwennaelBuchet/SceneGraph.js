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

/*
 * A CGSGNodeLogger represent a UI logger
 *
 * @class CGSGNodeLogger
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @type {CGSGNodeLogger}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGNodeLogger = CGSGNode.extend(
    {
        initialize : function (x, y) {
            this._super(x, y);

            this.resizeTo(100, 100);

            ///// @public //////
            this.isTraversable = false;
            this.isResizable = false;
            this.isDraggable = true;

            /**
             * background color of the panel
             * @property color
             * @default "#444444"
             * @type {String}
             */
            this.color = "#444444";
            /**
             * Radius of the corners of the panel
             * @property cornerRadius
             * @default 5
             * @type {Number}
             */
            this.cornerRadius = 5;
            /**
             * Color of the line around the panel
             * @property lineColor
             * @default "#222222"
             * @type {String}
             */
            this.lineColor = "#222222";
            /**
             * Width of the line around the panel
             * @property lineWidth
             * @default 2
             * @type {Number}
             */
            this.lineWidth = 2;
            /**
             * Transparency level of the panel (between 0 and 1)
             * @property globalAlpha
             * @default 0.6
             * @type {Number}
             */
            this.globalAlpha = 0.6;
            /**
             * Size of the typo
             * @property textSize
             * @default 12
             * @type {Number}
             */
            this.textSize = 12;
            /**
             * Color for the text
             * @property textColor
             * @default "white"
             * @type {String}
             */
            this.textColor = "white";

            /**
             * List of attributes displayed in the panel
             * @property _attributes
             * @type {Array}
             * @private
             */
            this._attributes = [];

            /**
             * @property classType
             * @type {String}
             */
            this.classType = "CGSGNodeLogger";

            //construct the panel
            this._createPanel();
        },

        /**
         * Create the panel graph that drw the attributes
         * @method _createPanel
         * @private
         */
        _createPanel : function () {

        },

        /**
         * Set a new couple name/value to render onto the logger.
         * If an attribute already exists with that name, just update the value
         * @method set
         * @param {String} name
         * @param {String} value
         */
        set : function (name, value) {
            //if the attribute already exists,just update the value
            var attr = null;
            for (var a = 0; a < this._attributes[a]; a++) {
                if (name === this._attributes[a].name) {
                    attr = this._attributes[a];
                    attr.value = value;
                    attr.nodeValue.setText(value);
                    break;
                }
            }

            //else create it, and add it to the window
            if (attr === null) {
                var tnn = new CGSGNodeText(10, 10, name);
                var tnv = new CGSGNodeText(100, 10, value);
                tnn.setSize(this.textSize);
                tnn.color = this.textColor;
                tnv.setSize(this.textSize);
                tnv.color = this.textColor;
                attr = {name : name, value : value, nodeName : tnn, nodeValue : tnv};
                this._attributes.push(attr);
            }

        },

        /**
         * Custom rendering
         * @method render
         * @protected
         * @param {CanvasRenderingContext2D} context the context into render the node
         * */
        render : function (context) {
            //draw this zone
            context.fillStyle = this.color;
            context.strokeStyle = this.lineColor;
            context.lineWidth = this.lineWidth;

            var rectWidth = 200;
            var rectHeight = 100;
            var rectX = 189;
            var rectY = 50;
            var cornerRadius = 50;

            context.beginPath();
            context.moveTo(rectX, rectY);
            context.lineTo(rectX + rectWidth - cornerRadius, rectY);
            context.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + cornerRadius, cornerRadius);
            context.lineTo(rectX + rectWidth, rectY + rectHeight);
            context.fill();
            context.stroke();
        },

        /**
         * @method copy
         * @return {CGSGNodeLogger} a copy of this node
         */
        copy : function () {
            var node = new CGSGNodeLogger(this.position.x, this.position.y);
            //call the super method
            node = this._super(node);

            node.isTraversable = this.isTraversable;
            node.isResizable = this.isResizable;
            node.isDraggable = this.isDraggable;

            node.color = this.color;
            node.lineColor = this.lineColor;
            node.lineWidth = this.lineWidth;
            node.globalAlpha = this.globalAlpha;

            for (var i = 0; i < this._attributes.length; i++) {
                node.setAttribute(this._attributes[i].name, this._attributes[i].value);
            }

            return node;
        }
    }
);
