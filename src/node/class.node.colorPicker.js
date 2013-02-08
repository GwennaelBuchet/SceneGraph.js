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

var CGSG_COLORPICKER_WIDTH = 256;
var CGSG_COLORPICKER_HEIGHT = 384;

/**
 * A color Picker
 * @class CGSGNodeColorPicker
 * @constructor
 * @param {Number} x X Position
 * @param {Number} y Y Position
 * @type {CGSGNodeColorPicker}
 */
var CGSGNodeColorPicker = CGSGNode.extend(
    {
        initialize:function (x, y) {
            this._super(x, y, CGSG_COLORPICKER_WIDTH, CGSG_COLORPICKER_HEIGHT);

            /**
             * @property _imgData
             * @type {ImageData}
             * @private
             */
            this._imgData = null;

            //fake canvas to pre-render static display
            this._tmpCanvas = null;
            this._initShape();

            var that = this;
            this.onMouseOver = function (event) {
                that._onMouseOverHandler(event);
            };
			this.onMouseUp = function (event) {
				that._onClickHandler(event);
			};
            this.onClick = function (event) {
                that._onClickHandler(event);
            };

            /**
             * Event fired when the mice cursor move over the color picker. Return a {r, g, b} Object.
             * @property onOverColor
             * @default null
             * @type {Function}
             */
            this.onOverColor = null;
            /**
             * Event fired when the user click on the color picker. Return a {r, g, b} Object.
             * @property onClickColor
             * @default null
             * @type {Function}
             */
            this.onClickColor = null;
        },

        /**
         * Pre-render the node into a temp canvas to optimize the perfs
         * @method _initShape
         * @private
         */
        _initShape:function () {
            this._tmpCanvas = document.createElement('canvas');
            this._tmpCanvas.width = this.dimension.width + 2;
            this._tmpCanvas.height = this.dimension.height + 2;
            var tmpContext = this._tmpCanvas.getContext('2d');

            this._imgData = tmpContext.createImageData(this.getWidth(), this.getHeight());

            //draw the colors panel
            var x, y, intensity = 1, stepX, currentPixel = 0;
            var rgb = [255, 0, 0], clr = 0, delta, value, tmpClr;
            var widthGray = CGSGMath.fixedPoint(Math.min(this.getWidth() * 0.1, 20));
            var width = this.getWidth() - widthGray;
            var steps = [
                {index:1, sens:1},
                {index:0, sens:-1},
                {index:2, sens:1},
                {index:1, sens:-1},
                {index:0, sens:1},
                {index:2, sens:-1}
            ];
            //A color is divided in 256 values (from 0 to 255).
            //ALl these 256 values won't be displayed because a lack of space in the screen (limited to this.getWidth().
            //Also, there are 6 steps in the colorpicker : red, yellow, green, cyan, blue, violet
            // So, stepX is the step between 2 computed values, depending of the width of the node
            stepX = 256 / (width / 6);
            var halfH = this.getHeight() / 2;

            //the white to black column
            for (x=0; x<widthGray; x++) {
                for (y = 0; y < this.getHeight(); y++) {
                    //current pixel in the linear table
                    currentPixel = (y * this.getWidth() + x) * 4; // 4 because 4 values per pixel : RGBA

                    intensity = 1 - (y / this.getHeight());

                    this._imgData.data[currentPixel + 0] = 255 * intensity;
                    this._imgData.data[currentPixel + 1] = 255 * intensity;
                    this._imgData.data[currentPixel + 2] = 255 * intensity;
                    this._imgData.data[currentPixel + 3] = 255;
                }
            }

            //the colors columns
            for (x = widthGray; x < this.getWidth(); x++) {
                intensity = 1;
                for (y = 0; y < this.getHeight(); y++) {
                    //current pixel in the linear table
                    currentPixel = (y * this.getWidth() + x) * 4; // 4 because 4 values per pixel : RGBA

                    //from white to current color
                    if (y < halfH) {
                        intensity = 2 - (y / halfH);
                        tmpClr = CGSGColor.litRGB(rgb[0], rgb[1], rgb[2], intensity);
                    }
                    //from current color to black
                    else {
                        intensity = 1 - ((y - halfH) / halfH);
                        tmpClr = CGSGColor.darkenRGB(rgb[0], rgb[1], rgb[2], intensity);
                    }

                    this._imgData.data[currentPixel + 0] = tmpClr.r;
                    this._imgData.data[currentPixel + 1] = tmpClr.g;
                    this._imgData.data[currentPixel + 2] = tmpClr.b;
                    this._imgData.data[currentPixel + 3] = 255;
                }
                delta = stepX * steps[clr].sens;
                value = rgb[steps[clr].index] + delta;
                rgb[steps[clr].index] = value;
                if (value <= 0 || value >= 255) {
                    rgb[steps[clr].index] = Math.min(Math.max(value, 0), 255);
                    clr++;
                }
            }

            tmpContext.putImageData(this._imgData, 0, 0);
        },

        /**
         * Override the parent method.
         * @method resizeTo
         * @param {Number} x
         * @param {Number} y
         */
        resizeTo:function (x, y) {
            this._super(x, y);
            this._initShape();
        },

        /**
         * Override the parent method.
         * @method resizeWith
         * @param {Number} w
         * @param {Number} h
         */
        resizeWith:function (w, h) {
            this._super(w, h);
            this._initShape();
        },

        /**
         * Override the parent method.
         * @method resizeBy
         * @param {Number} w
         * @param {Number} h
         */
        resizeBy:function (w, h) {
            this._super(w, h);
            this._initShape();
        },

        /**
         * @method _onMouseOverHandler
         * @param {Event} event
         * @private
         */
        _onMouseOverHandler:function (event) {
            if (cgsgExist(this.onOverColor)) {
                var rgb = this.getColorAt(event.position[0]);

                this.onOverColor(rgb);
            }
        },

        /**
         * @method _onClickHandler
         * @param {Event} event
         * @private
         */
        _onClickHandler:function (event) {
            if (cgsgExist(this.onClickColor)) {
                var rgb = this.getColorAt(event.position[0]);

                this.onClickColor(rgb);
            }
        },

        /**
         * @method getColorAt
         * @param {CGSGPosition} absolutePosition position of the cursor inside the colorPicker
         * @return {Object} Object with {r:x, g:x, b:x} value
         */
        getColorAt:function (absolutePosition) {
            var ap = this._absolutePosition;//getAbsolutePosition();
            var aw = this.getAbsoluteWidth();
            //get the color under the mice
            var data = this._imgData.data;
            //get cursor position under the colorPicker
			//todo : still need to fix the scale (will be done in v2.0 with the matrix class)
            var x =  CGSGMath.fixedPoint((absolutePosition.x - ap.x) /*/ this.getAbsoluteScale().x*/);
            var y =  CGSGMath.fixedPoint((absolutePosition.y - ap.y) /*/ this.getAbsoluteScale().y*/);

            return {r:data[((aw * y) + x) * 4],
                g:data[((aw * y) + x) * 4 + 1],
                b:data[((aw * y) + x) * 4 + 2]};
        },

        /**
         * Custom rendering. Must be defined to allow the traverser to render this node
         * @method render
         * @protected
         * @param {CanvasRenderingContext2D} context the context into render the node
         * */
        render:function (context) {
            //call this before your custom rendering
            this.beforeRender(context);

            context.globalAlpha = this.globalAlpha;

            //render the pre-rendered canvas
            context.drawImage(this._tmpCanvas, 0, 0);

            //call this after your custom rendering
            this.afterRender(context);
        }

    }
);