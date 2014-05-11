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

/**
 * This make a spinner component which is composed of a minus button, plus button and a counter screen.
 *
 * @class CGSGSpinnerNode
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x relative position
 * @param {Number} y relative position
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @param {Integer} size The size of the counter
 * @param {Integer} step The step value to increase or decrease
 * @param {Integer} start The starting value of the spinner.
 * @param {Integer} min The min value that is possible to reach
 * @param {Integer} max The max value that is possible to reach
 * @type {CGSGSpinnerNode}
 * @author jeremy vanlerberghe
 */
var CGSGSpinnerNode = CGSGNode.extend(
    {
        initialize:function (x, y, w, h, size, step, start, min, max) {

            //call the constructor of CGSGNode
            this._super(x, y, w, h);

            this.padding = 1; // this is the padding between button.

            /**
             * Define the class type.
             * Not mandatory but very useful, as Javascript does not have a mechanism to manage the type of class
             * @type {String}
             */
            this.classType = "SpinnerNode";

            this.isDraggable = false;

            // create spinner button and counter screen
            this.minusButton = new CGSGSpinnerButtonNode(size, "");
            this.counter = new CGSGCounterNode(size, step, start, min, max);
            this.plusButton = new CGSGSpinnerButtonNode(size, "+");

            this.counter.translateTo(size + this.padding, 0);
            this.plusButton.translateTo(2 * (size + this.padding), 0);

            // define click event on spinner button
            this.minusButton.onClick = function() {

                this.counter.remove();
                if (this.counter.value == this.counter.minValue) {
                    this.minusButton.globalAlpha = 0.5;
                } else if (this.counter.value > this.counter.minValue) {
                    this.plusButton.globalAlpha = 1;
                }

            }.bind(this);

            this.plusButton.onClick = function() {
                this.counter.add();

                if (this.counter.value == this.counter.maxValue) {
                    this.plusButton.globalAlpha = 0.5;
                } else if (this.counter.value < this.counter.maxValue){
                    this.minusButton.globalAlpha = 1;
                }
            }.bind(this);

            this.addChild(this.minusButton);
            this.addChild(this.counter);
            this.addChild(this.plusButton);


            //fake canvas to pre-render static display
            this._tmpCanvas = null;
            this._initShape();

        },

        /**
         * This function return the counter value.
         * @return {String} value
         */
        getCurrentValue : function() {
            return this.counter.value;
        },

        /**
         * Pre-render the cloud into a temp canvas to optimize the perfs
         * @method initShape
         * @private
         */
        _initShape:function () {
            this._tmpCanvas = document.createElement('canvas');
            this._tmpCanvas.width = this.dimension.width;
            this._tmpCanvas.height = this.dimension.height;
            var tmpContext = this._tmpCanvas.getContext('2d');

            tmpContext.stroke();
        },

        /**
         * Custom rendering. Must be defined to allow the traverser to render this node
         * @method render
         * @protected
         * @override
         * @param {context}  context into render the node
         * */
        render:function (context) {
            //call this before your custom rendering
            this.beforeRender(context);

            //render the pre-rendered canvas
            context.drawImage(this._tmpCanvas, 0, 0);

            //call this after your custom rendering
            this.afterRender(context);
        }
    }
);


/**
 * This class define a spinner button.
 *
 * @class CGSGSpinnerButtonNode
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Integer} size The size of the button
 * @param {String} sign The button sign (+ if we want to create plus button, minus button otherwise)
 * @type {CGSGSpinnerButtonNode}
 * @author jeremy vanlerberghe
 */
var CGSGSpinnerButtonNode = CGSGNode.extend(
    {
        initialize:function (size, sign) {
            //call the constructor of CGSGNode
            this._super(0, 0, size, size);

            this.classType = "CGSGSpinnerButtonNode";

            this.size = size;
            this.sign = sign;

            this.globalAlpha = 1;

            //fake canvas to pre-render static display
            this._tmpCanvas = null;
            this._initShape();
        },

        /**
         * Pre-render the cloud into a temp canvas to optimize the perfs
         * @method initShape
         * @private
         */
        _initShape:function () {
            this._tmpCanvas = document.createElement('canvas');
            this._tmpCanvas.width = this.dimension.width;
            this._tmpCanvas.height = this.dimension.height;
            var tmpContext = this._tmpCanvas.getContext('2d');

            // draw the minus square

            tmpContext.beginPath();
            tmpContext.fillStyle = "#C8CCCE";
            tmpContext.rect(0, 0, this.size, this.size);
            tmpContext.fill();
            tmpContext.closePath();

            // draw the minus sign
            tmpContext.beginPath();
            tmpContext.fillStyle = "#8A8A8A";
            tmpContext.lineTo(this.size / 3,  this.size / 2);
            tmpContext.lineTo(this.size * 2/3,  this.size / 2 );
            tmpContext.stroke();

            if (this.sign === "+") {
                tmpContext.beginPath();
                tmpContext.fillStyle = "#8A8A8A";
                tmpContext.lineTo(this.size / 2,  this.size / 3);
                tmpContext.lineTo(this.size / 2,  this.size * 2/3 );
                tmpContext.stroke();
                tmpContext.closePath();
            }
        },

        render : function(context) {
            //call this before your custom rendering
            this.beforeRender(context);

            context.globalAlpha = this.globalAlpha;

            //render the pre-rendered canvas
            context.drawImage(this._tmpCanvas, 0, 0);

            //call this after your custom rendering
            this.afterRender(context);
        }

    });

/**
 * This class define a counter screen that show the spinner value.
 *
 * @class CGSGCounterNode
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Integer} size The size of the counter
 * @param {Integer} step The step value to increase or decrease
 * @param {Integer} start The starting value of the spinner.
 * @param {Integer} min The min value that is possible to reach
 * @param {Integer} max The max value that is possible to reach
 *
 * @type {CGSGCounterNode}
 * @author jeremy vanlerberghe
 */
var CGSGCounterNode = CGSGNode.extend(
    {
        initialize:function (size, step, start, min, max) {
            //call the constructor of CGSGNode
            this._super(0, 0, size, size);

            this.classType = "CGSGCounterNode";

            this.size = size;
            this.step = cgsgExist(step) ? step : 1;
            this.value = cgsgExist(start) ? start : 0;
            this.minValue = min;
            this.maxValue = max;

            //fake canvas to pre-render static display
            this._tmpCanvas = null;
            this._initShape();
        },

        /**
         * This function increase the counter.
         */
        add : function() {
            if (cgsgExist(this.maxValue) && this.value < this.maxValue) {
                this.value += this.step;
                this._initShape();
            }
        },

        /**
         * This function decrease the counter.
         */
        remove : function() {
            if (cgsgExist(this.minValue) && this.value > this.minValue) {
                this.value -= this.step;
                this._initShape();
            }
        },

        /**
         * Pre-render the cloud into a temp canvas to optimize the perfs
         * @method initShape
         * @private
         */
        _initShape:function () {
            this._tmpCanvas = document.createElement('canvas');
            this._tmpCanvas.width = this.dimension.width;
            this._tmpCanvas.height = this.dimension.height;
            var tmpContext = this._tmpCanvas.getContext('2d');

            // draw the square

            tmpContext.beginPath();
            tmpContext.fillStyle = "white";
            tmpContext.rect(0, 0, this.size, this.size);
            tmpContext.fill();

            tmpContext.strokeStyle = "#8A8A8A";
            tmpContext.stroke();
            tmpContext.closePath();

            // draw the value
            tmpContext.beginPath();
            tmpContext.fillStyle = "#8A8A8A";
            tmpContext.font = "14px sans-serif";
            var textWidth = tmpContext.measureText(this.value).width;
            tmpContext.textBaseline = "middle";
            tmpContext.fillText(this.value, (this.size - textWidth) / 2, this.size / 2);


        },

        render : function(context) {
            //call this before your custom rendering
            this.beforeRender(context);

            //render the pre-rendered canvas
            context.drawImage(this._tmpCanvas, 0, 0);

            //call this after your custom rendering
            this.afterRender(context);
        }

    });


