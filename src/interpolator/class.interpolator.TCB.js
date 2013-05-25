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
 * @module
 * @class CGSGInterpolatorTCB
 * @extends {CGSGInterpolator}
 * @constructor
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGInterpolatorTCB = CGSGInterpolator.extend(
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

            //TODO : compute TCB from the in and out tangents
            var len = keys.length - 1;
            var k = new CGSGKeyFrame(len, {x: keys[len].value.x, y: keys[len].value.y});
            k.userData = {t: 0, c: 0, b: 0};
            keys.push(k);
            len = keys.length;

            var i;
            var values = [];
            for (i = 0; i < len - 1; i++) {
                if (i == 0) {
                    values = values.concat(this._interpolate(
                        keys[i],
                        keys[i],
                        keys[i + 1],
                        keys[i + 2],
                        keys[i].userData.t, keys[i].userData.c, keys[i].userData.b,
                        steps[i]
                    ));
                }
                else if (i + 2 < len) {
                    values = values.concat(this._interpolate(
                        keys[i - 1],
                        keys[i],
                        keys[i + 1],
                        keys[i + 2],
                        keys[i].userData.t, keys[i].userData.c, keys[i].userData.b,
                        steps[i]
                    ));
                }
                else if (i + 1 < len) {
                    values = values.concat(this._interpolate(
                        keys[i - 1],
                        keys[i],
                        keys[i + 1],
                        keys[0], //0
                        keys[i].userData.t, keys[i].userData.c, keys[i].userData.b,
                        steps[i]
                    ));
                }
                else {
                    values = values.concat(this._interpolate(
                        keys[i - 1],
                        keys[i],
                        keys[0], //0
                        keys[1], //1
                        keys[i].userData.t, keys[i].userData.c, keys[i].userData.b,
                        steps[i]
                    ));
                }
            }
            var lk = keys[len - 2];
            values.push({x: lk.value.x, y: lk.value.y});
            keys.pop();
            return values;
        },

        /**
         * @method _interpolate
         * @param p1
         * @param p2
         * @param p3
         * @param p4
         * @param t
         * @param c
         * @param b
         * @param steps
         * @private
         * @return {Array}
         */
        _interpolate: function (p1, p2, p3, p4, t, c, b, steps) {
            var t1 = new CGSGVector2D(p1.value.x, p1.value.y);
            var t2 = new CGSGVector2D(p2.value.x, p2.value.y);
            var t3 = new CGSGVector2D(p3.value.x, p3.value.y);
            var t4 = new CGSGVector2D(p4.value.x, p4.value.y);

            var px = p2.value.x, py = p2.value.y;
            var s, h1, h2, h3, h4;
            var TDix, TDiy, TSix, TSiy, ppx, ppy;

            var values = [];

            for (var i = 0; i < steps; i++) {
                s = i / steps;
                h1 = 2 * Math.pow(s, 3.0) - 3 * Math.pow(s, 2.0) + 1;
                h2 = -2 * Math.pow(s, 3.0) + 3 * Math.pow(s, 2);
                h3 = Math.pow(s, 3.0) - 2 * Math.pow(s, 2.0) + s;
                h4 = Math.pow(s, 3.0) - Math.pow(s, 2);

                TDix = (1 - t) * (1 + c) * (1 + b) * (t2.x - t1.x) / 2.0 + (1 - t) * (1 - c) * (1 - b) * (t3.x - t2.x) / 2.0;
                TDiy = (1 - t) * (1 + c) * (1 + b) * (t2.y - t1.y) / 2.0 + (1 - t) * (1 - c) * (1 - b) * (t3.y - t2.y) / 2.0;

                TSix = (1 - t) * (1 - c) * (1 + b) * (t3.x - t2.x) / 2.0 + (1 - t) * (1 + c) * (1 - b) * (t4.x - t3.x) / 2.0;
                TSiy = (1 - t) * (1 - c) * (1 + b) * (t3.y - t2.y) / 2.0 + (1 - t) * (1 + c) * (1 - b) * (t4.y - t3.y) / 2;

                ppx = h1 * t2.x + h2 * t3.x + h3 * TDix + h4 * TSix;
                ppy = h1 * t2.y + h2 * t3.y + h3 * TDiy + h4 * TSiy;

                values.push({x: ppx, y: ppy});
                px = ppx;
                py = ppy;
            }

            return values;
        }

    }
);