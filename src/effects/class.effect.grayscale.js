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

/*
 * Effect to be applied to a CGSGImage or a CGSGAnimatedSprite.
 * @class CGSGEffectGrayScale
 * @module Effect
 * @extends CGSGEffect
 * @constructor
 * @beta
 * @type {CGSGEffectGrayScale}
 */
var CGSGEffectGrayScale = CGSGEffect.extend(
    {
        initialize: function () {
            this._super();
        },

        /**
         *  This function must be filled by the inherited classes.
         *  @method render
         *  @param {CanvasRenderingContext2D} context context containing the image
         *  @param {Number} width width for the image to be modified
         *  @param {Number} height height for the image to be modified
         */
        render: function (context, width, height) {
            try {
                var imageData = context.getImageData(0, 0, width, height);
                var data = imageData.data;

                for (var i = 0; i < data.length; i += 4) {
                    var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];

                    data[i] = brightness; // red
                    data[i + 1] = brightness; // green
                    data[i + 2] = brightness; // blue
                    // i+3 = alpha
                }

                // overwrite original image
                context.putImageData(imageData, 0, 0);
            }
            catch (err) {
                //the image is not on the same domain or not on a server
            }
        }
    }
);
