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
 * A 2D vector object
 * @module Math
 * @class CGSGVector2D
 * @extends {Object}
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @type {CGSGVector2D}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGVector2D = CGSGObject.extend(
    {
        initialize : function (x, y) {
            /**
             * @property x
             * @type {Number}
             */
            this.x = x;
            /**
             * @property y
             * @type {Number}
             */
            this.y = y;
        },

        /**
         * @public
         * @method copy
         * @return {CGSGVector2D} a new CGSGVector2D, clone of this one
         */
        copy : function () {
            return new CGSGVector2D(this.x, this.y);
        },

        /**
         * returns a new vector added to the value passed in parameter
         * @public
         * @method add
         * @param {CGSGVector2D} vector
         */
        add: function (vector) {
            return new CGSGVector2D(this.x + vector.x, this.y + vector.y);
        },

        /**
         * add to this vector, the value passed in parameter
         * @public
         * @method addEquals
         * @param {CGSGVector2D} vector
         */
        addEquals: function (vector) {
            this.x += vector.x;
            this.y += vector.y;
        },

        /**
         * returns a new vector subtracted from the value passed in parameter
         * @public
         * @method subtract
         * @param {CGSGVector2D} vector
         */
        subtract: function (vector) {
            return new CGSGVector2D(this.x - vector.x, this.y - vector.y);
        },

        /**
         * subtract to this vector, the value passed in parameter
         * @public
         * @method subtractEquals
         * @param {CGSGVector2D} vector
         */
        subtractEquals: function(vector) {
            this.x -= vector.x;
            this.y -= vector.y;
        },

        /**
         * returns a new vector multiplied to the value passed in parameter
         * @public
         * @method multiply
         * @param {CGSGVector2D} vector
         */
        multiply: function (vector) {
            return new CGSGVector2D(this.x * vector.x, this.y * vector.y);
        },

        /**
         * multiply to this vector, the value passed in parameter
         * @public
         * @method multiplyEquals
         * @param {CGSGVector2D} vector
         */
        multiplyEquals: function (vector) {
            this.x *= vector.x;
            this.y *= vector.y;
        },

        /**
         * return a new vector divided by the value passed in parameter
         * @public
         * @method divide
         * @param {CGSGVector2D} vector
         */
        divide: function(vector) {
            return new CGSGVector2D(this.x / vector.x, this.y / vector.y);
        },

        /**
         * divide to this vector, the value passed in parameter
         * @public
         * @method divideEquals
         * @param {CGSGVector2D} vector
         */
        divideEquals: function (vector) {
            this.x /= vector.x;
            this.y /= vector.y;
        },

        /**
         * Multiply x and y by f
         * @public
         * @method multiplyByFloat
         * @param {Number} f
         */
        multiplyByFloat: function (f) {
            return new CGSGVector2D(this.x * f, this.y * f);
        },

        /**
         * Multiply x and y by f
         * @public
         * @method multiplyByFloatEquals
         * @param {Number} f
         */
        multiplyByFloatEquals: function (f) {
            this.x *= f;
            this.y *= f;
        },

        /**
         * Divide x and y by f
         * @public
         * @method divideByFloat
         * @param {Number} f
         */
        divideByFloat: function (f) {
            return new CGSGVector2D(this.x / f, this.y / f);
        },

        /**
         * Divide x and y by f
         * @public
         * @method divideByFloatEquals
         * @param {Number} f
         */
        divideByFloatEquals: function (f) {
            this.x /= f;
            this.y /= f;
        },

        /**
         * Compute the euclidian distance between this vector and the one passe in parameter
         * @public
         * @method getDistance
         * @param {CGSGVector2D} vector
         * @return {Number}
         */
        getDistance: function (vector) {
            return Math.sqrt(
                Math.pow(this.x - vector.x, 2) +
                    Math.pow(this.y - vector.y, 2)
            );
        },

        /**
         * rotate this vector around its origin
         * @public
         * @method rotate
         * @param {Number} angle
         */
        rotate: function (angle) {
            var ca = Math.cos(angle);
            var sa = Math.sin(angle);
            this.x = this.x * ca + this.y * sa;
            this.y = this.x * sa - this.y * ca;
        },

        /**
         * @public
         * @method getLength
         * @return {Number}
         */
        getLength: function () {
            return Math.sqrt((this.x * this.x) + (this.y * this.y));
        },

        /**
         * @public
         * @method getSquaredLength
         * @return {Number}
         */
        getSquaredLength: function () {
            return (this.x * this.x) + (this.y * this.y);
        },

        /**
         * Normalize this vector
         * @public
         * @method normalize
         */
        normalize: function () {
            var scalefactor;
            var length = this.getLength();

            //return if length is 1 or 0
            if (length == 1 || length == 0) {
                return;
            }

            scalefactor = 1.0 / length;
            this.x *= scalefactor;
            this.y *= scalefactor;
        },

        /**
         * Determines if a given vector is to the right or left of this vector.
         * @public
         * @method sign
         */
        sign: function(vector) {
            var perpVector = this.perp();

            return perpVector.dot(vector) < 0 ? -1 : 1;
        },

        /**
         * Get dot product of this vector and another vector
         * @public
         * @method dot
         */
        dot: function(vector) {
            return this.x*vector.x + this.y*vector.y;
        },

        /**
         * Get cross product of this vector and another vector
         * @public
         * @method cross
         */
        cross: function(vector) {
            return this.x*vector.y - this.y*vector.x;
        },

        /**
         * Get unit vector of this vector and another vector
         * @public
         * @method unit
         */
        unit: function() {
            return this.divide(this.getLength());
        },

        /**
         * Get approximation of unit vector of this vector and another vector
         * @public
         * @method unitFast
         */
        unitFast: function() {
            var ax = Math.abs(this.x);
            var ay = Math.abs(this.y);

            // Create a ratio
            var ratio = 1 / Math.max(ax, ay)
            ratio = ratio * (1.29289 - (ax + ay) * ratio * 0.29289)

            // Multiply by ratio
            return this.multiplyByFloat(ratio);
        },

        /**
         * Get unit vector of this vector and another vector
         * @public
         * @method unitEquals
         */
        unitEquals: function() {
            this.divideEquals(this.getLength());
        },

        /**
         * Get a perpendicular vector of this vector
         * @public
         * @method perp
         */
        perp: function() {
            return new CGSGVector2D(-this.y, this.x);
        },

        /**
         * Get a vector perpendicular to this vector and another vector
         * @public
         * @method perpendicular
         */
        perpendicular: function(vector) {
            return this.subtract(this.project(vector));
        },

        /**
         * Get a projected vector of this vector and another vector
         * @public
         * @method project
         */
        project: function(vector) {
            var percent = this.dot(vector) / vector.dot(vector);

            return vector.multiply(percent);
        },

        /**
         * Get a string representing this vector
         * @public
         * @method toString
         */
        toString: function() {
            return this.x + "," + this.y;
        }
    }
);

