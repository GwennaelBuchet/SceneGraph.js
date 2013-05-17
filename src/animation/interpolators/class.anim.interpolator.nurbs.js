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
 * @class CGSGAnimInterpolatorCubicSpline
 * @extends {CGSGAnimInterpolator}
 * @constructor
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGAnimInterpolatorCubicSpline = CGSGAnimInterpolator.extend(
    {
        initialize: function () {

        },

        /**
         * Compute the value for the specified frame
         * @method computeValue
         * @param {number} frame current frame to compute the value
         * @param {number} keyIndex index of animation key just before the frame
         * @param {Array} listKeys list of the animation keys
         * @param {number} currentStep number of steps (frames) between the animation key before the frame and frame
         * @param {number} nbSteps number of frame between the 2 animation keys around the frame
         * @return {number} the computed value
         */
        computeValue:function(frame, keyIndex, listKeys, currentStep, nbSteps) {
            return currentStep * nbSteps + listKeys[keyIndex].value;
        }

    }
);