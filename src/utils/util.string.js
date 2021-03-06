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

/**
 * Return same String without string in parameter
 * @method String.prototype.without
 * @param t {String}
 * @return {String}
 */
String.prototype.without = function (t) {
    return this.replace(t, "");
};

/**
 * Return same String by replacing space, dot and minus by the following letter uppercased
 * @method String.prototype.collapse
 * @return {String}
 */
String.prototype.collapse = function () {
    var w = this.split("-");
    var s = w[0];
    for (var i = 1, l = w.length; i < l; i++) {
        s += w[i].capitalize();
    }

    return s;
};

/**
 * Add a dot ('.') as first character if it's not already a dot
 * @method String.prototype.addFirstDot
 * @return {String} A String with the first '.'
 */
String.prototype.addFirstDot = function () {
    if (this.indexOf(".") !== 0) {
        return "." + this;
    }

    return this;
};

/**
 * Capitalize first letter of the String
 * @method String.prototype.capitalize
 * @param lower {boolean} if true, all other letters will be lowercased
 * @return {string}
 */
String.prototype.capitalize = function (lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
    });
};


