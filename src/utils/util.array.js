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

'use script';

/**
 * Utils methods extending the Array prototype
 *
 * @class UTIL_ARRAY
 * @module Util
 * @static
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */

/**
 * @method cgsgIsArray
 * @param {Object} value
 * @return {Boolean}
 */
function cgsgIsArray(value) {
    return (Object.prototype.toString.call(value) === '[object Array]');
}

/**
 * Return first item of this array, or null if there is no item
 * @method Array.prototype.first
 */
Array.prototype.first = function () {
    return (this.length > 0) ? this[0] : null;
};

/**
 * Return last item of this array
 * @method Array.prototype.last
 */
Array.prototype.last = function () {
    return (this.length > 0) ? this[this.length - 1] : null;
};

/**
 * Remove all the occurrences of the item from the array
 * @method Array.prototype.without
 * @param item
 */
Array.prototype.without = function (item) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === item) {
            this.splice(i, 1);
            //break;
        }
    }
};

/**
 * Remove the item at the end of this array
 * @method Array.prototype.pop
 */
Array.prototype.pop = function () {
    this.splice(this.length - 1, 1);
};

/**
 * Empty the array
 * @method Array.prototype.clear
 */
Array.prototype.clear = function () {
    this.length = 0;
};

/**
 * Check if the array is empty
 * @method Array.prototype.isEmpty
 * @return {Boolean} true if the array is empty
 */
Array.prototype.isEmpty = function () {
    return this.length === 0;
};

/**
 * Return a clone of this array.
 * All references will be passed as is. So a change on an object of the cloned array will also visible on this one.
 * @method Array.prototype.clone
 * @return {Array}
 */
Array.prototype.clone = function () {
    return this.slice(0);
};

/**
 * Return a copy of the array.
 * If an item on this object encapsulates the "copy" method, this one will be called to avoid references issues
 * @method Array.prototype.copy
 * @return {Array}
 */
Array.prototype.copy = function () {
    var a = [];
    for (var i = 0; i < this.length; i++) {
        if (this[i].copy) {
            a.push(this[i].copy());
        }
        else {
            a.push(this[i]);
        }
    }

    return a;
};

/**
 * Checks whether the specified elements exists in the array or not
 * @method Array.prototype.contains
 * @param item
 * @return {Boolean}
 */
Array.prototype.contains = function (item) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === item) {
            return true;
        }
    }
    return false;
};

/**
 *  Removes doubles elements from the array
 *  @method Array.prototype.unique
 *  @return {Array}
 */
Array.prototype.unique = function () {
    var tmp = [], i;
    this.sort();
    for (i = 0; i < this.length; i++) {
        if (this[i] !== this[i + 1]) {
            tmp[tmp.length] = this[i];
        }
    }

    return tmp;
};

/**
 * Compute and return the sum of all elements in this array
 * @method Array.prototype.sum
 * @return {Number}
 */
Array.prototype.sum = function () {
    var sum = 0;
    for (var i = 0; i < this.length; i++) {
        sum += parseInt(this[i]);
    }

    return sum;
};

/**
 * Compute and return the average of all the elements in this array
 * @method Array.prototype.average
 * @return {Number}
 */
Array.prototype.average = function () {
    return this.sum() / this.length;
};

