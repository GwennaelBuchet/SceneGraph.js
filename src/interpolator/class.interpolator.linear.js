/*
 * Copyright (c) 2013  Capgemini Technology Services (hereinafter “Capgemini”)
 *
 * License/Terms of Use
 *
 * Permission is hereby granted, free of charge and for the term of intellectual property rights on the Software, to any
 * person obtaining a copy of this software and associated documentation files (the "Software"), to use, copy, modify
 * and propagate free of charge, anywhere in the world, all or part of the Software subject to the following mandatory
 * conditions:
 *
 *   •    The above copyright notice and this permission notice shall be included in all copies or substantial portions
 *   of the Software.
 *
 *  Any failure to comply with the above shall automatically terminate the license and be construed as a breach of these
 *  Terms of Use causing significant harm to Capgemini.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 *  Except as contained in this notice, the name of Capgemini shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Capgemini.
 *
 *  These Terms of Use are subject to French law.
 */

/**
 * Linear intepolation
 * @module Animation
 * @class CGSGInterpolatorLinear
 * @extends {CGSGInterpolator}
 * @constructor
 * @author Gwennael buchet (gwennael.buchet@gmail.com)
 */
var CGSGInterpolatorLinear = CGSGInterpolator.extend(
    {
        initialize: function () {
        },


        /**
         * @method compute
         * @param keys {Array} Array of all the animation keys
         * @param steps {Array} Array of steps between 2 keys. steps.length = keys.length - 1.
         * @return {Array} Array of {x, y} object corresponding to all the points in the curve
         */
        compute: function (keys, steps) {
            var k, s, lenk = keys.length, lens, frame, key, nextKey, stepX, stepY;
            var values = [];

            for (k = 0; k < lenk - 1; k++) {
                key = keys[k];
                nextKey = keys[k + 1];
                lens = steps[k];
                stepX = (nextKey.value.x - key.value.x) / steps[k];
                stepY = (nextKey.value.y - key.value.y) / steps[k];

                for (s = 0; s < lens; s++) {
                    frame = s;
                    if (frame === key.frame) {
                        values.push({x: key.value.x, y: key.value.y});
                    }
                    else if (frame === nextKey.frame) {
                        values.push({x: nextKey.value.x, y: nextKey.value.y});
                    }
                    else {
                        values.push({x: keys[k].value.x + s * stepX, y: keys[k].value.y + s*stepY});
                    }
                }
            }

            var lk = keys[lenk - 1];
            values.push({x: lk.value.x, y: lk.value.y});

            return values;
        }

    }
);