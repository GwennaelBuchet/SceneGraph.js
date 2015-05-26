'use strict';
// Source: src/utils/util.array.js
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

// Source: src/utils/util.string.js
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


// Source: src/utils/class.class.js
/*
 * Purpose :
 * A CGSGObject object with inheritance.
 * Usage:
 *  var Locomotion = CGSGObject.extend({
 *      initialize: function(name){
 *          this.name = name;
 *      },
 *
 *      sayHello : function() {
 *          return ("hello " + this.name);
 *      }
 *  });
 *
 *  var Car = Locomotion.extend({
 *      initialize: function(name) {
 *          this._super(name);
 *          this.power = 100;
 *      }
 *  });
 *
 * From documentation by John Resig (http://ejohn.org/)
 */
/* jshint ignore:start */
(function () {
    // The base CGSGObject implementation (does nothing)
    this.CGSGObject = null;
    this.CGSGObject = function () {
    };

    var initializing = false;
    var fnTest = /xyz/.test(function () {
        xyz;
    }) ? /\b_super\b/ : /.*/;


    // Create a new CGSGObject that inherits from this class
    CGSGObject.extend = function (prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            //noinspection JSUnfilteredForInLoop
            prototype[name] = typeof prop[name] === "function" &&
            typeof _super[name] === "function" && fnTest.test(prop[name]) ?
                (function (name, fn) {
                    return function () {
                        var tmp = this._super;

                        // Add a new ._super() method that is the same method
                        // but on the super-class
                        this._super = _super[name];

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
        }

        // The dummy class constructor
        function CGSGObject() {
            // All construction is actually done in the initialize method
            if (!initializing && this.initialize) {
                this.initialize.apply(this, arguments);
            }
        }

        // Populate our constructed prototype object
        CGSGObject.prototype = prototype;

        // Enforce the constructor to be what we expect
        CGSGObject.prototype.constructor = CGSGObject;

        // And make this class extendable
        CGSGObject.extend = arguments.callee;

        return CGSGObject;
    };
})();
/* jshint ignore:end */
// Source: src/utils/class.map.js
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
 * */

/**
 * A Hashmap class.
 *
 * @class CGSGMap
 * @module Util
 * @constructor
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGMap = CGSGObject.extend(
    {
        initialize: function () {
this._map = {};

            this._map.keys = [];
            this._map.values = [];
        },

        /**
         * @method getAt
         * @param {Number} index
         * @return {Object} {key, value}
         */
        getAt: function (index) {
            return {key: this._map.keys[index], value: this._map.values[index]};
        },

        /**
         * @method getValue
         * @param {Object} key
         * @return {Object} the corresponding value or null if the key does not exist
         */
        getValue: function (key) {
            var i = this.getKeyIndex(key);
            if (i < 0) {
                return null;
            }

            return this._map.values[i];
        },

        /**
         * @method getValues
         * @return {Array}
         */
        getValues: function () {
            return this._map.values.copy();
        },

        /**
         * Add or replace the key in the map with the value.
         * @method addOrReplace
         * @param {Object} key
         * @param {Object} value
         * @return the index of the key in the map
         */
        addOrReplace: function (key, value) {
            var i = this.getKeyIndex(key);

            if (i >= 0) {
                this._map.values[i] = value;
            }
            else {
                this._map.keys.push(key);
                this._map.values.push(value);
                i = this.getLength();
            }

            return i;
        },

        /**
         * @method remove
         * @param {Object} key
         */
        remove: function (key) {
            if (this.containsKey(key)) {
                var index = this.getKeyIndex(key);
                this._map.keys.splice(index, 1);
                this._map.values.splice(index, 1);
            }
        },

        /**
         * Remove all keys in the map
         * @method removeAll
         */
        removeAll: function () {
            this._map.keys.clear();
            this._map.values.clear();
        },

        /**
         * @method clone
         * @return {CGSGMap}
         */
        clone: function () {
            var newMap = new CGSGMap();
            newMap._map.keys = this._map.keys.clone();
            newMap._map.values = this._map.value.clone();

            return newMap;
        },

        /**
         * Return true if the key already exists in the map
         * @method containsKey
         * @param key
         * @return {Boolean}
         */
        containsKey: function (key) {
            return this._map.keys.contains(key);
        },

        /**
         * Return the number of keys in the map
         * @method getLength
         * @return {Number}
         */
        getLength: function () {
            return this._map.keys.length;
        },

        /**
         * @method getKeyIndex
         * @param {Object} key
         * @return {Number} The key index or -1 if not exists
         */
        getKeyIndex: function (key) {
            var index;

            for (index = 0; index < this.getLength(); index++) {
                if (this._map.keys[index] === key) {
                    return index;
                }
            }

            return -1;
        }

    }
);
// Source: src/utils/util.color.js
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
 * Some utils methods extending the Array prototype
 *
 * @class CGSGColor
 * @module Util
 * @static
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGColor = {
    /**
     * Convert R, G and B value to an hexadecimal code
     * @method rgb2hex
     * @static
     * @param {String} r red value. from 0 to 255.
     * @param {String} g green value. from 0 to 255.
     * @param {String} b blue value. from 0 to 255.
     * @return {String} an hexadecimal value for the color, starting with a sharp (#)
     */
    rgb2hex: function (r, g, b) {
        return "#" + this._toHex(r) + this._toHex(g) + this._toHex(b);
    },

    /**
     * Convert an hexadecimal code for color to R, G and B
     * @method hex2rgb
     * @static
     * @param {String} hex an hexadecimal code, with or without the starting sharp (#)
     * @return {Object} an object encapsulating r, g and b values (from 0 to 255)
     */
    hex2rgb: function (hex) {
        hex = this._withoutSharp(hex);
        return {
            r: parseInt(hex.substring(0, 2), 16),
            g: parseInt(hex.substring(2, 4), 16),
            b: parseInt(hex.substring(4, 6), 16)
        };
    },

    _withoutSharp: function (hex) {
        if (cgsgExist(hex)) {
            return (hex.charAt(0) === "#") ? hex.substring(1, hex.length) : hex;
        }
        return "000000";
    },

    /**
     * @method _toHex
     * @param {String} n String or Number representation of a number between 0 and 255
     * @return {String} Example "A6"
     * @private
     */
    _toHex: function (n) {
        var m = parseInt(n, 10);
        if (isNaN(m)) {
            return "00";
        }
        m = Math.max(0, Math.min(m, 255));
        return "0123456789ABCDEF".charAt((m - m % 16) / 16) + "0123456789ABCDEF".charAt(m % 16);
    },

    /**
     * Convert a String to an {r,g, b} object.
     * @method fromString
     * @param rgb {String}
     * @return {*}
     * @example
     *    CGSGColor.fromString("rgb(121, 333, 444)"); returns {r:121, b:333, c:444};
     */
    fromString: function (rgb) {
        var p1 = rgb.indexOf('(') + 1;
        var p2 = rgb.lastIndexOf(')');

        var cl = rgb.substring(p1, p2);
        var cls = cl.split(",");
        return {
            r: parseInt(cls[0]),
            g: parseInt(cls[1]),
            b: parseInt(cls[2])
        };
    },

    /**
     * Linear interpolation between 2 colors
     * @method lerp
     * @static
     * @param {String} colorFrom a hex color
     * @param {String} colorTo a hex color
     * @param {Number} weight
     * @return {String} a heh value for the interpolated color
     */
    lerp: function (colorFrom, colorTo, weight) {
        var rgbColorFrom = this.hex2rgb(colorFrom);
        var rgbColorTo = this.hex2rgb(colorTo);

        var rgb = [];
        rgb[0] = rgbColorFrom.r + (rgbColorTo.r - rgbColorFrom.r) * weight;
        rgb[1] = rgbColorFrom.g + (rgbColorTo.g - rgbColorFrom.g) * weight;
        rgb[2] = rgbColorFrom.b + (rgbColorTo.b - rgbColorFrom.b) * weight;

        return this.rgb2hex(rgb[0], rgb[1], rgb[2]);
    },

    /**
     *
     * @method darkenHex
     * @param {String} hex Hexadecimal value of a color (with or without the started '#'
     * @param {Number} factor If >0 : lighten. If <0 : darken
     * @return {String}
     */
    darkenHex: function (hex, factor) {
        var rgb = this.hex2rgb(hex);

        rgb.r = this.multiplyComponent(rgb.r, factor);
        rgb.g = this.multiplyComponent(rgb.g, factor);
        rgb.b = this.multiplyComponent(rgb.b, factor);

        return this.rgb2hex(rgb.r, rgb.g, rgb.b);
    },

    /**
     *
     * @method darkenRGB
     * @param {Number} r Red value between 0 and 255
     * @param {Number} g Green value between 0 and 255
     * @param {Number} b Blue value between 0 and 255
     * @param {Number} factor If >0 : lighten. If <0 : darken
     * @return {Object} An {r, g, b} object
     */
    darkenRGB: function (r, g, b, factor) {
        return {
            r: this.multiplyComponent(r, factor),
            g: this.multiplyComponent(g, factor),
            b: this.multiplyComponent(b, factor)
        };
    },

    litRGB: function (r, g, b, factor) {
        var hsl = this.rgb2hsl(r, g, b);

        hsl.l *= factor;

        return this.hsl2rgb(hsl.h, hsl.s, hsl.l);
    },

    /**
     * @method multiplyComponent
     * @param {Number} c color component between 0 and 25(
     * @param {Number} factor
     * @return {Number} The multiplied value, between 0 and 255
     */
    multiplyComponent: function (c, factor) {
        return Math.max(Math.min(255, c * factor), 0);
    },

    /**
     * RGB to HSV converter.
     * Adapted from http://en.wikipedia.org/wiki/HSV_color_space
     * @method rgb2hsv
     * @param {Number} r
     * @param {Number} g
     * @param {Number} b
     * @return {Object} An {h, s, v} object
     */
    rgb2hsv: function (r, g, b) {
        var min, max;

        //normalize the 3 components
        r /= 255;
        g /= 255;
        b /= 255;
        min = Math.min(b, Math.min(r, g));
        max = Math.max(b, Math.max(r, g));

        //min == max ? so the 3 values are the same, we got a gray color.
        //just return the lightness
        if (max === min) {
            return {h: 0, s: 0, v: min};
        }

        var d = (r === min) ? g - b : ((b === min) ? r - g : b - r);
        var h = (r === min) ? 3 : ((b === min) ? 1 : 5);

        var dM = max - min;
        return {
            h: 60 * (h - d / dM),
            s: dM / max,
            v: max
        };
    },

    /**
     * RGB to HSL converter.
     * Adapted from http://en.wikipedia.org/wiki/HSL_color_space
     * @method rgb2hsl
     * @param {Number} r
     * @param {Number} g
     * @param {Number} b
     * @return {Object}
     */
    rgb2hsl: function (r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        }
        else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return {h: h, s: s, l: l};
    },

    /**
     * HSL to RGB converter.
     * Adapted from http://en.wikipedia.org/wiki/HSL_color_space
     * @method hsl2rgb
     * @param {Number} h The hue
     * @param {Number} s The saturation
     * @param {Number} l the lightness
     * @return {Object} A {r, g, b} object
     */
    hsl2rgb: function (h, s, l) {
        var r, g, b;

        if (s === 0) {
            r = g = b = l;
        }
        else {

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = this.hue2rgb(p, q, h + 1 / 3);
            g = this.hue2rgb(p, q, h);
            b = this.hue2rgb(p, q, h - 1 / 3);
        }

        return {r: r * 255, g: g * 255, b: b * 255};
    },

    /**
     * @method hue2rgb
     * @param p
     * @param q
     * @param t
     * @return {*}
     */
    hue2rgb: function (p, q, t) {
        if (t < 0) {
            t += 1;
        }
        if (t > 1) {
            t -= 1;
        }
        if (t < 1 / 6) {
            return p + (q - p) * 6 * t;
        }
        if (t < 1 / 2) {
            return q;
        }
        if (t < 2 / 3) {
            return p + (q - p) * (2 / 3 - t) * 6;
        }
        return p;
    },

    /**
     * HSV to RGB converter.
     * Adapted from http://en.wikipedia.org/wiki/HSV_color_space
     * @method hsv2rgb
     * @param {Number} h The hue
     * @param {Number} s The saturation
     * @param {Number} v the value
     * @return {Object} A {r, g, b} object
     */
    hsv2rgb: function (h, s, v) {
        var r, g, b;

        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
        }

        return {r: r * 255, g: g * 255, b: b * 255};
    }

};// Source: src/utils/math/class.vector2D.js
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
 * A 2D vector object
 * @module Math
 * @class CGSGVector2D
 * @extends {Object}
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @type {CGSGVector2D}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGVector2D = CGSGObject.extend(
    {
        initialize: function (x, y) {
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
        copy: function () {
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
        subtractEquals: function (vector) {
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
        divide: function (vector) {
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
            if (length === 1 || length === 0) {
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
        sign: function (vector) {
            var perpVector = this.perp();

            return perpVector.dot(vector) < 0 ? -1 : 1;
        },

        /**
         * Get dot product of this vector and another vector
         * @public
         * @method dot
         */
        dot: function (vector) {
            return this.x * vector.x + this.y * vector.y;
        },

        /**
         * Get cross product of this vector and another vector
         * @public
         * @method cross
         */
        cross: function (vector) {
            return this.x * vector.y - this.y * vector.x;
        },

        /**
         * Get unit vector of this vector and another vector
         * @public
         * @method unit
         */
        unit: function () {
            return this.divide(this.getLength());
        },

        /**
         * Get approximation of unit vector of this vector and another vector
         * @public
         * @method unitFast
         */
        unitFast: function () {
            var ax = Math.abs(this.x);
            var ay = Math.abs(this.y);

            // Create a ratio
            var ratio = 1 / Math.max(ax, ay);
            ratio = ratio * (1.29289 - (ax + ay) * ratio * 0.29289);

            // Multiply by ratio
            return this.multiplyByFloat(ratio);
        },

        /**
         * Get unit vector of this vector and another vector
         * @public
         * @method unitEquals
         */
        unitEquals: function () {
            this.divideEquals(this.getLength());
        },

        /**
         * Get a perpendicular vector of this vector
         * @public
         * @method perp
         */
        perp: function () {
            return new CGSGVector2D(-this.y, this.x);
        },

        /**
         * Get a vector perpendicular to this vector and another vector
         * @public
         * @method perpendicular
         */
        perpendicular: function (vector) {
            return this.subtract(this.project(vector));
        },

        /**
         * Get a projected vector of this vector and another vector
         * @public
         * @method project
         */
        project: function (vector) {
            var percent = this.dot(vector) / vector.dot(vector);

            return vector.multiply(percent);
        },

        /**
         * Get a string representing this vector
         * @public
         * @method toString
         */
        toString: function () {
            return this.x + "," + this.y;
        }
    }
);

// Source: src/utils/class.region.js
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
 * */

/**
 * A Position object
 * @class CGSGPosition
 * @extends CGSGVector2D
 * @constructor
 * @param {Number} x X value
 * @param {Number} y Y value
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 * @type {CGSGPosition}
 */
var CGSGPosition = CGSGVector2D.extend(
    {
        initialize: function (x, y) {
this._super(x, y);
        },

        /**
         * Indicates if this position meaningfully equals to the given position.
         * @public
         * @method equalsTo
         * @param position {CGSGPosition} the position to compare to this position
         * @return {Boolean} true if given position exists and has same coordinates as this position, false otherwise
         */
        equalsTo: function (position) {
            return cgsgExist(position) && position.x === this.x && position.y === this.y;
        },

        /**
         * return a new object with these attributesgetAbsoluteWidth
         * @public
         * @method copy
         * @return {CGSGPosition}
         */
        copy: function () {
            return new CGSGPosition(this.x, this.y);
        },

        /**
         * Replace current relative position by this new one
         * @method translateTo
         * @param {Number} newX
         * @param {Number} newY
         */
        translateTo: function (newX, newY) {
            this.x = newX;
            this.y = newY;
        },

        /**
         * Add new coordinate to the current relative one
         * @public
         * @method translateWith
         * @param {Number} x
         * @param {Number} y
         */
        translateWith: function (x, y) {
            this.x += x;
            this.y += y;
        },

        /**
         * Add new coordinate to the current relative one
         * @public
         * @method translateBy
         * @param {Number} x
         * @param {Number} y
         */
        translateBy: function (x, y) {
            this.x *= x;
            this.y *= y;
        },

        /**
         * Return true if x<0 || y<0
         * @method isNegative
         * @return {boolean}
         */
        isNegative: function () {
            return (this.x < 0 || this.y < 0);
        }
    }
);

/**
 * A Scale object
 * @class CGSGScale
 * @extends CGSGPosition
 * @constructor
 * @param {Number} x X value
 * @param {Number} y Y value
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 * @type {CGSGScale}
 */
var CGSGScale = CGSGPosition.extend(
    {
        initialize: function (x, y) {
            this._super(x, y);
        }
    }
);

/**
 * A Rotation object
 * @class CGSGRotation
 * @extends Object
 * @constructor
 * @param {Number} angle Angle value
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 * @type {CGSGRotation}
 */
var CGSGRotation = CGSGObject.extend(
    {
        initialize: function (angle) {
            this.angle = angle;
        },

        /**
         * return a new object with these attributes
         * @public
         * @method copy
         * @return {CGSGRotation}
         */
        copy: function () {
            return new CGSGRotation(this.angle);
        },

        /**
         * Replace current angle by this new one
         * @public
         * @method rotateTo
         * @param {Number} newAngle
         */
        rotateTo: function (newAngle) {
            this.angle = newAngle;
        },

        /**
         * Multiply this angle by this factor
         * @public
         * @method rotateBy
         * @param {Number} rotateFactor
         */
        rotateBy: function (rotateFactor) {
            this.multiplyEquals(rotateFactor);
        },

        /**
         * Add this angle to the current one
         * @public
         * @method rotateWith
         * @param {Number} angle
         */
        rotateWith: function (angle) {
            this.addEquals(angle);
        },

        /**
         * Add this angle to the current one
         * @public
         * @method add
         * @param {Number} angle
         */
        addEquals: function (angle) {
            this.angle += angle;
        },

        /**
         * Subtract this angle to the current one
         * @public
         * @method substract
         * @param {Number} angle
         */
        subtractEquals: function (angle) {
            this.angle -= angle;
        },

        /**
         * Multiply this angle to the current one
         * @public
         * @method multiply
         * @param {Number} angle
         */
        multiplyEquals: function (angle) {
            this.angle *= angle;
        }
    }
);

/**
 * A Dimension object
 * @class CGSGDimension
 * @extends CGSGVector2D
 * @constructor
 * @param {Number} width
 * @param {Number} height
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 * @type {CGSGDimension}
 */
var CGSGDimension = CGSGVector2D.extend(
    {
        initialize: function (width, height) {

            this._super(width, height);

            /**
             * Alias to the x attribute
             * @property width
             * @type {Number}
             */
            this.width = this.x;
            /**
             * Alias to the y attribute
             * @property height
             * @type {Number}
             */
            this.height = this.y;
        },

        /**
         * Return a new object with these attributes
         * @method copy
         * @return {CGSGDimension}
         */
        copy: function () {
            return new CGSGDimension(this.width, this.height);
        },

        /**
         * Replace current dimension by these new ones
         * @method resizeTo
         * @param {Number} newWidth
         * @param {Number} newHeight
         * */
        resizeTo: function (newWidth, newHeight) {
            if (newWidth >= 0) {
                this.width = newWidth;
            }
            if (newHeight >= 0) {
                this.height = newHeight;
            }
        },

        /**
         * Multiply current dimension by these new ones
         * @method resizeBy
         * @param {Number} widthFactor
         * @param {Number} heightFactor
         * */
        resizeBy: function (widthFactor, heightFactor) {
            if (widthFactor >= 0) {
                this.width *= widthFactor;
            }
            if (heightFactor >= 0) {
                this.height *= heightFactor;
            }
        },

        /**
         * Increase/decrease current dimension with adding values
         * @method resizeWith
         * @param {Number} width
         * @param {Number} height
         * */
        resizeWith: function (width, height) {
            if (this.width + width >= 0) {
                this.width += width;
            }
            if (this.height + height >= 0) {
                this.height += height;
            }
        },

        /**
         * Return true if no pixels are inside the dimension
         * @method isEmpty
         * @return {boolean}
         */
        isEmpty: function () {
            return (this.width <= 0 || this.height <= 0);
        }
    }
);

/**
 * A Region object encapsulates a CGSGPosition and a CGSGDimension
 * @class CGSGRegion
 * @extends Object
 * @constructor
 * @param {Number} x Position on X
 * @param {Number} y Position on Y
 * @param {Number} width Dimension on Width
 * @param {Number} height Dimension on Height
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 * @type {CGSGRegion}
 */
var CGSGRegion = CGSGObject.extend(
    {
        initialize: function (x, y, width, height) {
            /**
             * @property position
             * @type {CGSGPosition}
             */
            this.position = new CGSGPosition(x, y);
            /**
             * @property dimension
             * @type {CGSGDimension}
             */
            this.dimension = new CGSGDimension(width, height);
        },

        /**
         * @method copy
         * @return {CGSGRegion}
         */
        copy: function () {
            return new CGSGRegion(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
        },

        /**
         * @method add
         * @param region {CGSGRegion}
         */
        addEquals: function (region) {
            this.position.translateWith(region.position.x, region.position.y);
            this.dimension.resizeWith(region.dimension.width, region.dimension.height);
        },

        /**
         * @method subtract
         * @param {CGSGRegion} region
         */
        subtractEquals: function (region) {
            this.position.translateWith(-region.position.x, -region.position.y);
            this.dimension.resizeWith(-region.dimension.width, -region.dimension.height);
        },

        /**
         * Return true if no pixels are inside the region
         * @method isEmpty
         * @return {boolean}
         */
        isEmpty: function () {
            return this.dimension.isEmpty();
        },

        /**
         * Return true if dimension is Empty or position is negative
         * @method isNegative
         * @return {boolean}
         */
        isNegative: function () {
            return (this.isEmpty() || this.position.isNegative());
        }
    }
);

// Source: src/constants.js
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
 * Global constants used by the framework
 *
 * @class GLOBAL_CONSTANTS
 * @module Util
 * @static
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */

/*
 * Default framerate for the rendering
 * @property CGSG_DEFAULT_FRAMERATE
 * @default 60
 * @type {Number}
 */
//var CGSG_DEFAULT_FRAMERATE = 60;

/**
 * Default ratio value for the display
 * @property CGSG_DEFAULT_DISPLAYRATIO
 * @default CGSGScale(1.0, 1.0)
 * @type {CGSGScale}
 */
var CGSG_DEFAULT_DISPLAYRATIO = new CGSGScale(1.0, 1.0);

/**
 * Default fill color for the drag selection selection rectangle
 * @property CGSG_DEFAULT_SELECTED_STROKE_COLOR
 * @default "#C0C0C0"
 * @type {String}
 */
var CGSG_DEFAULT_DRAG_SELECT_FILL_COLOR = "#C0C0C0";

/**
 * Default stroke color for the drag selection rectangle
 * @property CGSG_DEFAULT_DRAG_SELECT_STROKE_COLOR
 * @default "#808080"
 * @type {String}
 */
var CGSG_DEFAULT_DRAG_SELECT_STROKE_COLOR = "#808080";

/**
 * Default alpha value for the drag selection rectangle
 * @property CGSG_DEFAULT_DRAG_SELECT_ALPHA
 * @default 0.6
 * @type {Number}
 */
var CGSG_DEFAULT_DRAG_SELECT_ALPHA = 0.6;

/**
 * Default threshold to detect the handle boxes on a resizable node
 * @property CGSG_DEFAULT_SELECTED_RESIZEHANDLE_THRESHOLD
 * @default 3
 * @type {Number}
 */
var CGSG_DEFAULT_SELECTED_RESIZEHANDLE_THRESHOLD = 3;

/**
 * Default number of frames to average the FPS.
 * The current FPS will be the average of the "CGSG_DEFAULT_FRAMERATE_DELAY" frames.
 * @property CGSG_DEFAULT_FRAMERATE_DELAY
 * @default 20 (ie: each 20 frames)
 * @type {Number}
 */
var CGSG_DEFAULT_FRAMERATE_DELAY = 20;

/**
 * Default maximum number of frames per second.
 * @property CGSG_DEFAULT_MAX_FRAMERATE
 * @default NaN
 * @type {Number}
 */
var CGSG_DEFAULT_MAX_FRAMERATE = NaN;

/**
 * Default value for the double touch detection.
 * This property is the delay between 2 touches to be considered as a dbl touch event.
 * @property CGSG_DEFAULT_DBLTOUCH_DELAY
 * @default 250
 * @type {Number}
 */
var CGSG_DEFAULT_DBLTOUCH_DELAY = 250;
// Source: src/utils/class.traverser.js
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
 * A Traverser is an utility class that traverse the scene graph and return a list of node, depending on conditions you fixed
 * @class CGSGTraverser
 * @extends Object
 * @constructor
 * @type {CGSGTraverser}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGTraverser = CGSGObject.extend(
    {
        initialize: function () {
            /**
             * Last results provided by the last check
             * @property lastResults
             * @type {Array}
             */
            this.lastResults = [];
        },

        /**
         * @public
         * @method traverse
         *
         * @param {CGSGNode} rootNode
         * @param {Function} condition. can be null
         * @param {Array} excludedNodes Array of CGSGNode
         * @return {Array} the list of nodes recursively under 'rootNode', accepting the 'condition' and not in 'excludedNodes'
         *
         * @example
         *  var condition = function(node) {
					return node.color == "yellow";
				};

         var traverser = new CGSGTraverser();
         var listSquares = traverser.traverse(this.rootNode, condition, null);
         for (var s = 0; s < listSquares.length; s++) {
					...
				}
         */
        traverse: function (rootNode, condition, excludedNodes) {
            this.lastResults.clear();

            if (cgsgExist(condition)) {
                this._check(rootNode, condition, excludedNodes);
            }

            return this.lastResults;
        },

        /**
         * @private
         * @method _check
         * @param {CGSGNode} rootNode
         * @param {Function} condition
         * @param {Array} excludedNodes
         */
        _check: function (rootNode, condition, excludedNodes) {
            if (rootNode.isTraversable === true) {
                var exclusionExist = cgsgExist(excludedNodes) && excludedNodes.length > 0;

                if (!(exclusionExist && excludedNodes.contains(rootNode)) && condition(rootNode) === true) {
                    this.lastResults.push(rootNode);
                }

                for (var i = rootNode.children.length - 1; i >= 0; --i) {
                    var childNode = rootNode.children[i];
                    this._check(childNode, condition, excludedNodes);
                }
            }
        }
    }
);// Source: src/utils/class.imgManager.js
/*
 * Copyright (c) 2014 Gwennael Buchet
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
 *  Terms of Use causing significant harm to Gwennael Buchet.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 *  Except as contained in this notice, the name of Gwennael Buchet shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Gwennael Buchet.
 *
 *  These Terms of Use are subject to French law.
 */

/**
 * An Image manager.
 * The target is to load only once an image which is used for several nodes
 *
 * @class CGSGImgManager
 * @module Util
 * @constructor
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGImgManager = CGSGObject.extend(
    {
        initialize: function () {
            /**
             * @property _mapURL
             * @type {CGSGMap} [URL; Image]
             */
            this._mapURL = new CGSGMap();
        },

        /**
         * @method get
         * @param url {String}
         * @return {Image} or null if doesn't exist yet
         */
        get: function (url) {
            return this._mapURL.getValue(url);
        },

        /**
         * @method set
         * @param url {String}
         * @param img {Image}
         */
        set: function (url, img) {
            this._mapURL.addOrReplace(url, img);
        }

    }
);

var cgsgImgManager = new CGSGImgManager();// Source: src/event/class.event.js
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
 * */

/**
 * This class represents an event fired by observable (through event manager) to observers (the handlers) functions.
 *
 * @class CGSGEvent
 * @extends CGSGObject
 * @constructor
 * @param {Object} trigger the object which has triggered the event (could be different from the observable object)
 * @param {Object} data an object of any type
 * @author Guillaume Drouet (guidrouet@gmail.com)
 * @type {CGSGEvent}
 */

var CGSGEvent = CGSGObject.extend(
    {
        initialize: function (trigger, data) {
/**
             * Object which has created this event
             * @property trigger
             * @type {Object} the trigger
             */
            this.trigger = trigger;

            /**
             * Data wrapped in this event
             * @property data
             * @type {Object} the wrapped data
             */
            this.data = data;

            /**
             * Fields that should be filled by object which triggers this event
             * @property observable
             * @default null
             * @type {Object} the observable object
             */
            this.observable = null;

            /**
             * Fields that should be filled by object which triggers this event
             * @property type
             * @default null
             * @type {String} the type of event
             */
            this.type = null;

            /**
             * Flags which indicates if events which are going to be dispatched should be ignored
             * @property propagate
             * @default true
             * @type {boolean} true if next events should be dispatched, false otherwise
             */
            this.propagate = true;
        }
    }
);
// Source: src/event/class.eventmanager.js
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
 * */

/**
 * Represents an entry of the internal table of the {CGSGEventManager} which keeps in memory all bound events.
 *
 * @class CGSGBindEntry
 * @extends CGSGObject
 * @author Guillaume Drouet (guidrouet@gmail.com)
 * @type {CGSGBindEntry}
 * @param observable {Object} the observable object
 * @param attributeName {String} the observable attribute the handler is bound to
 * @param isAdditional {Boolean} flag which indicates if the handler is stored in the additional array
 */

var CGSGBindEntry = CGSGObject.extend(
    {
        initialize: function (observable, attributeName, isAdditional) {
            this._observable = observable;
            this._attributeName = attributeName;
            this._isAdditional = isAdditional;
        }
    }
);

/**
 * This class manages the association of handler for a particular event which can occurs on a particular object.
 * After an handler is bound to an event, it can be fire thanks to this manager too.
 *
 * @class CGSGEventManager
 * @extends CGSGObject
 * @author Guillaume Drouet (guidrouet@gmail.com)
 * @type {CGSGEventManager}
 */

var CGSGEventManager = CGSGObject.extend(
    {
        initialize: function () {
            this._handlerPropertyPrefix = "cgsgEventManager_" + new Date().getTime() + "_";
            this._table = new CGSGMap();
        },

        /**
         * Replaces the handler associated to the given key by the new specified handler.
         *
         * @method replaceHandler
         * @param key {CGSGBindEntry} the key
         * @param handler {Function} the new handler
         */
        replaceHandler: function (key, handler) {
            var obs = key._observable;

            // Direct access
            if (!key._isAdditional) {
                obs[key._attributeName] = handler;
            }
            else {
                // Search through the array
                var old = this._table.getValue(key);
                var idx = obs[key._attributeName].indexOf(old);

                if (idx !== -1) {
                    obs[key._attributeName][idx] = handler;
                }
            }

            this._table.addOrReplace(key, handler);
        },

        /**
         * Binds an handler function for an event which can occurs on a given observable object.
         *
         * @method bindHandler
         * @param observable {Object} the observable object
         * @param eventName {String} The event's name
         * @param handler {Function} the handler
         * @return {CGSGBindEntry} the ID of the binding
         */
        bindHandler: function (observable, eventName, handler) {
            //check if the same event was already bound via a simple command (ex: "this.xxx.onClick = function() {...}")
            var additional = cgsgExist(observable[eventName]);
            var attributeName;

            // Bind member named with eventName first and then additional handlers are stored to an array
            if (additional) {
                attributeName = this._getHandlerPropertyName(eventName);

                // Array does not already exist
                if (!cgsgExist(observable[attributeName])) {
                    observable[attributeName] = [handler];
                }
                else {
                    observable[attributeName].push(handler);
                }
            }
            else {
                attributeName = eventName;
                observable[eventName] = handler;
            }

            var entry = new CGSGBindEntry(observable, attributeName, additional);
            this._table.addOrReplace(entry, handler);
            return entry;
        },

        /**
         * Notifies an event to all handlers bound to the given event on the given observable object. For performance
         * reasons, this method must not be called if no handler is bound to the observable. Consequently, for instance,
         * if you have an event 'onClick' that you want to dispatch, wrap the call in an if statement like this
         * (otherwise the execution will fail) :
         * if (this.onClick) {
         *     CGSG.eventManager.dispatch(...);
         * }
         *
         * @method dispatch
         * @param observable {Object} the observable object
         * @param eventName {String} The event's name
         * @param event {CGSGEvent} the event to notify
         */
        dispatch: function (observable, eventName, event) {
            // Member with event name must exist
            event.observable = observable;
            event.type = eventName;

            if (!cgsgExist(observable[eventName])) {
                console.log(eventName);
            }

            observable[eventName](event);

            // Continue only if propagation is enabled
            if (event.propagate) {
                var handlerProperty = this._getHandlerPropertyName(eventName);
                var handler = observable[handlerProperty];

                // Additional handlers should be notified too
                if (cgsgExist(handler)) {
                    cgsgIterate(handler, function (i, handler) {
                        handler(event);

                        // Loop will be broken if propagate flag has been set to false by the handler
                        return event.propagate;
                    });
                }
            }
        },

        /**
         * Unbind an handler registered for an event on an object.
         *
         * @method unbindHandler
         * @param observable {Object} the observable object
         * @param eventName {String} The event's name
         * @param handler {Function} the handler
         */
        unbindHandler: function (observable, eventName, handler) {
            var i, len, entry;

            // Handler to remove is the one corresponding to the attribute named with the eventName
            if (observable[eventName] === handler) {
                observable[eventName] = null;
            }
            else {
                // Look for the handler
                var handlerProperty = this._getHandlerPropertyName(eventName);

                i = observable[handlerProperty].indexOf(handler);

                if (i !== -1) {
                    observable[handlerProperty].slice(i, 1);
                }
            }

            // Purge table
            for (i = 0, len = this._table.getLength(); i < len; i++) {
                entry = this._table.getAt(i);

                if (entry.value === handler) {
                    this._table.remove(entry.key);
                    break;
                }
            }
        },

        /**
         * Unbinds all handlers registered for an event on a given object.
         *
         * @method unbindAll
         * @param observable {Object} the observable object
         * @param eventName {String} The event's name
         */
        unbindAll: function (observable, eventName) {
            // Attribute named with eventName is deleted
            observable[eventName] = null;

            var handlerProperty = this._getHandlerPropertyName(eventName);

            // Then delete additional handlers if they exist
            if (cgsgExist(observable[handlerProperty])) {
                //handlerProperty = this._getHandlerPropertyName(eventName);

                //if (cgsgExist(observable[handlerProperty])) {
                observable[handlerProperty].splice(0, observable[handlerProperty].length - 1);
                //}
            }
        },

        /**
         * Returns the name of a property to create on an object to store additional handlers.
         *
         * @method  _getHandlerPropertyName
         * @param eventName String the event name
         * @return {String} the attribute name
         * @private
         */
        _getHandlerPropertyName: function (eventName) {
            return this._handlerPropertyPrefix + eventName;
        }
    }
);// Source: src/theme/class.CSSManager.js
/*
 * Copyright (c) 2014 Gwennael Buchet
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
 *  Terms of Use causing significant harm to Gwennael Buchet.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 *  Except as contained in this notice, the name of Gwennael Buchet shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Gwennael Buchet.
 *
 *  These Terms of Use are subject to French law.
 */

/**
 * A CGSGCSSManager represent a basic circle
 *
 * @class CGSGCSSManager
 * @module Util
 * @extends CGSGObject
 * @constructor
 * @type {CGSGCSSManager}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGCSSManager = CGSGObject.extend(
    {
        initialize: function () {
            /**
             * @property _isLoaded
             * @type {Boolean}
             * @private
             */
            this.isLoaded = false;

            /**
             * Event Fired when the css file is finally loaded
             * @property onLoadEnd
             * @default null
             * @type {Function} {node:this}
             */
            this.onLoadEnd = null;
            /**
             * Event Fired when the css file failed to load
             * @property onLoadError
             * @default null
             * @type {Function} {node:this}
             */
            this.onLoadError = null;
            /**
             * Event Fired when the css file loading is aborted
             * @property onLoadAbort
             * @default null
             * @type {Function} {node:this}
             */
            this.onLoadAbort = null;

            /**
             * All css classes loaded for the current HTML document.
             * [selectorText {String}, style {CSSStyleDeclaration}]
             * @property _classes
             * @type {Array}
             * @private
             */
            this._classes = new CGSGMap();

            /**
             * List of CSS files to be ignored
             * @property _blacklist
             * @type {Array}
             * @private
             */
            this._blacklist = [];

        },

        /**
         * Return the value for the attribute of the class passed as parameters
         * @method getAttr
         * @param cls {String} Name of the CSS class
         * @param attr {String} Name of the attribute
         * @return {string}
         */
        getAttr: function (cls, attr) {
            cls = cls.addFirstDot();
            var style = this._classes.getValue(cls);

            if (cgsgExist(style)) {
                var s = style[attr.collapse()];
                if (cgsgExist(s) && s.length > 0) {
                    return s;
                }
            }

            return null;
        },

        /**
         * Return the value for the latest attribute of the classes passed as parameters
         * @method getAttrInArray
         * @param clss {Array} list of CSS classes
         * @param attr {String} name of the CSS attribute
         * @return {string} value for the CSS attribute
         */
        getAttrInArray: function (clss, attr) {
            var i, cls, r, len = clss.length;
            for (i = len - 1; i >= 0; --i) {
                cls = clss[i];

                r = this.getAttr(cls, attr);
                if (cgsgExist(r)) {
                    return r;
                }
            }

            return null;
        },

        /**
         * @method getCls
         * @param cls {String} Name of the CSS class
         * @return {Array} Array of attributes
         */
        getCls: function (cls) {
            cls = cls.addFirstDot();
            return this._classes.getValue(cls);
        },

        /**
         * Extract the number from an attribute's value.
         * For example getNumber("8px"); will return 8.
         * @method getNumber
         * @param attr {String}
         * @return {Number}
         */
        getURL: function (attr) {
            if (!cgsgExist(attr) || attr.length === 0) {
                return null;
            }

            //remove first "url("
            var url = attr.without("url(");

            //remove latest right parenthesis ")"
            url = url.without(")");

            return url;
        },

        /**
         * Extract the number from an attribute's value.
         * For example getNumber("8px"); will return 8.
         * @method getNumber
         * @param attr {String}
         * @return {Number}
         */
        getNumber: function (attr) {
            if (!cgsgExist(attr) || attr.length === 0) {
                return NaN;
            }

            attr = this._cleanAttr(attr);

            return parseInt(attr);
        },

        /**
         * Extract the number from an attribute's value.
         * For example getFloat("0.6px"); will return 0.6.
         * @method getFloat
         * @param attr {String}
         * @return {Float}
         */
        getFloat: function (attr) {
            if (!cgsgExist(attr) || attr.length === 0) {
                return null;
            }

            attr = this._cleanAttr(attr);

            return parseFloat(attr);
        },

        _cleanAttr: function (attr) {
            //remove "px", "pt", ...
            var reg = /px|pt/gi;
            attr = attr.replace(reg, "");

            //remove spaces
            attr.trim();

            return attr;
        },

        /**
         * Read content of all CSS files loaded and update its cache
         * @method invalidateCache
         *
         */
        invalidateCache: function () {
            this._classes.removeAll();
            var len, x, nbStyles = document.styleSheets.length;
            //read all documents
            for (var s = 0; s < nbStyles; s++) {
                //ignore blacklisted files
                if (!this._blacklist.contains(document.styleSheets[s].href)) {
                    var classes = document.styleSheets[s].rules || document.styleSheets[s].cssRules;
                    if (cgsgExist(classes)) {
                        for (x = 0, len = classes.length; x < len; x++) {
                            this._classes.addOrReplace(classes[x].selectorText, classes[x].style);
                        }
                    }
                    else {
                        console.log("WARNING: '" +
                                    document.styleSheets[s].href +
                                    "' file without class. Be sure application is running under a web server and CSS file is correctly loaded.");
                    }
                }
            }
        },

        /**
         * Store CSS attributes form the file in memory
         * @method loadCSSFile
         * @param url {String}
         */
        loadCSSFile: function (url) {
            this.isLoaded = false;
            this._url = url;

            var headID = document.getElementsByTagName("head")[0];
            var cssNode = document.createElement('link');

            cssNode.onload = this._createDelegate(this, this._onFileLoaded);
            cssNode.onerror = this._createDelegate(this, this._onFileError);
            cssNode.onabort = this._createDelegate(this, this._onFileAbort);

            cssNode.type = 'text/css';
            cssNode.rel = 'stylesheet';
            cssNode.media = 'screen';
            cssNode.href = url;
            headID.appendChild(cssNode);
        },

        /**
         * Unload CSS file from current HTML page.
         * Cache need to be invalidated after by calling {invalidateCache} method
         * @method unloadCSSFile
         * @param filename {String}
         */
        unloadCSSFile: function (filename) {
            var href = "href";

            var cssFiles = document.getElementsByTagName("link");
            for (var i = cssFiles.length; i >= 0; i--) {
                if (cssFiles[i] && cssFiles[i].getAttribute(href) !== null &&
                    cssFiles[i].getAttribute(href).indexOf(filename) !== -1) {
                    cssFiles[i].parentNode.removeChild(cssFiles[i]);
                }
            }
        },

        /**
         * Blacklist this file.
         * Cache need to be invalidated after by calling {invalidateCache} method
         * @method ignoreCSSFile
         * @param href {String} Must be full href path and filename
         */
        ignoreCSSFile: function (href) {
            this._blacklist.push(href);
        },

        /**
         * used to call delegate method when the css file is finally loaded
         * @private
         * @method _createDelegate
         * @param objectContext
         * @param delegateMethod
         * @return {Function}
         */
        _createDelegate: function (objectContext, delegateMethod) {
            return function () {
                return delegateMethod.call(objectContext);
            };
        },

        /**
         * fired when the css file is loaded.
         * @private
         * @method _onFileLoaded
         * @param event {Event}
         */
        _onFileLoaded: function (event) {
            this.invalidateCache();
            this.isLoaded = true;

            if (this.onLoadEnd !== null) {
                this.onLoadEnd({event: event});
            }
        },

        /**
         * To be overrided when the css file failed to load
         * @method _onFileError
         * @protected
         * @param event {Event}
         */
        _onFileError: function (event) {
            if (this.onLoadError !== null) {
                this.onLoadError({event: event});
            }
        },
        /**
         * To be overrided when the css file loading is aborted
         * @method _onFileAbort
         * @protected
         * @param event {Event}
         */
        _onFileAbort: function (event) {
            if (this.onLoadAbort !== null) {
                this.onLoadAbort({event: event});
            }
        }

    }
);// Source: src/animation/class.keyframe.js
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
 * @module Animation
 * @class CGSGKeyFrame
 * @extends {Object}
 * @constructor
 * @param {Number} frame number for this key. Must be an integer value.
 * @param {object} value for this key. For example : {x:10, y:30}; {x:10}
 * @type {CGSGKeyFrame}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGKeyFrame = CGSGObject.extend(
    {
        initialize: function (frame, value) {
            /**
             * @property frame
             * @type {Number}
             */
            this.frame = frame;
            /**
             * @property value
             * @type {*}
             * @example {x:10, y:30}; {x:10}
             */
            this.value = value;

            /**
             * Incoming tangent for this key
             * @property inTangent
             * @default (0, 0)
             * @type {CGSGVector2D}
             */
            this.inTangent = new CGSGVector2D(0, 0);

            /**
             * Outgoing tangent for this key
             * @property outTangent
             * @default (0, 0)
             * @type {CGSGVector2D}
             */
            this.outTangent = new CGSGVector2D(0, 0);

            /**
             * can be fulfilled by the developer to put in whatever he needs
             * @property userData
             * @default null
             * @type {*}
             */
            this.userData = null;
        }
    }
);
// Source: src/interpolator/class.interpolator.js
/*
 * Copyright (c) 2014 Gwennael Buchet
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
 *  Terms of Use causing significant harm to Gwennael Buchet.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 *  Except as contained in this notice, the name of Gwennael Buchet shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Gwennael Buchet.
 *
 *  These Terms of Use are subject to French law.
 */

/**
 * @module
 * @class CGSGInterpolator
 * @extends {CGSGObject}
 * @constructor
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGInterpolator = CGSGObject.extend(
    {
        initialize: function () {
        },

        /**
         * @method computeInterpolations
         * @param keys {Array} Array of all the animation keys
         * @param steps {Array} Array of steps between 2 keys. steps.length = keys.length - 1.
         * @return {Array} Array of {x, y} object corresponding to all the points in the curve
         */
        compute: function (keys, steps) {
        },

        /**
         * return the length between the keys, by peer
         * @method getLengths
         */
        getLengths: function () {
        }
    }
);// Source: src/interpolator/class.interpolator.linear.js
/*
 * Copyright (c) 2014 Gwennael Buchet
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
 *  Terms of Use causing significant harm to Gwennael Buchet.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 *  Except as contained in this notice, the name of Gwennael Buchet shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Gwennael Buchet.
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
                        values.push({x: keys[k].value.x + s * stepX, y: keys[k].value.y + s * stepY});
                    }
                }
            }

            var lk = keys[lenk - 1];
            values.push({x: lk.value.x, y: lk.value.y});

            return values;
        }

    }
);// Source: src/interpolator/class.interpolator.TCB.js
/*
 * Copyright (c) 2014 Gwennael Buchet
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
 *  Terms of Use causing significant harm to Gwennael Buchet.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 *  Except as contained in this notice, the name of Gwennael Buchet shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Gwennael Buchet.
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
                if (i === 0) {
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

                TDix =
                (1 - t) * (1 + c) * (1 + b) * (t2.x - t1.x) / 2.0 + (1 - t) * (1 - c) * (1 - b) * (t3.x - t2.x) / 2.0;
                TDiy =
                (1 - t) * (1 + c) * (1 + b) * (t2.y - t1.y) / 2.0 + (1 - t) * (1 - c) * (1 - b) * (t3.y - t2.y) / 2.0;

                TSix =
                (1 - t) * (1 - c) * (1 + b) * (t3.x - t2.x) / 2.0 + (1 - t) * (1 + c) * (1 - b) * (t4.x - t3.x) / 2.0;
                TSiy =
                (1 - t) * (1 - c) * (1 + b) * (t3.y - t2.y) / 2.0 + (1 - t) * (1 + c) * (1 - b) * (t4.y - t3.y) / 2;

                ppx = h1 * t2.x + h2 * t3.x + h3 * TDix + h4 * TSix;
                ppy = h1 * t2.y + h2 * t3.y + h3 * TDiy + h4 * TSiy;

                values.push({x: ppx, y: ppy});
                px = ppx;
                py = ppy;
            }

            return values;
        }

    }
);// Source: src/animation/class.anim.timeline.js
/*
 * Copyright (c) 2014 Gwennael Buchet
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
 *  Terms of Use causing significant harm to Gwennael Buchet.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 *  Except as contained in this notice, the name of Gwennael Buchet shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Gwennael Buchet.
 *
 *  These Terms of Use are subject to French law.
 */



/**
 * @module Animation
 * @class CGSGTimeline
 * @extends {Object}
 * @constructor
 * @param {CGSGNode} parentNode
 * @param {string} attribute string representing the attribute to be animated (eg: "position.x", "rotation.angle", ...)
 * @param {string} method A string representing the interpolation method = "linear"
 * @type {CGSGTimeline}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGTimeline = CGSGObject.extend(
    {
        initialize: function (parentNode, attribute) {

            /**
             * The animated nodes
             * @property parentNode
             * @type {CGSGNode}
             */
            this.parentNode = parentNode;

            /**
             * A string representing the attribute to be animated (eg: "position.x", "rotation.angle", "color.g", ...)
             * The attribute must be a numeric property
             * @property attribute
             * @type {String}
             */
            this.attribute = attribute;

            /**
             * @property _method
             * @type {CGSGInterpolator}
             * @default {CGSGInterpolatorLinear} CGSGAnimationMethod.LINEAR
             * @private
             */
            this._method = CGSGAnimationMethod.LINEAR;

            /**
             * list of the [frame, value] pairs for the animation
             * the index of the list begins at 0, not at the first key frame
             *
             * @property listValues
             * @type {Array}
             */
            this.listValues = [];

            //List of the animation keys
            this._listKeys = [];
            //precomputed values for animation since first key to latest-1.
            //Each  cell contains the step, in pixel, from the previous key to the next one
            this._numberOfFrameBetweenKeys = [];
            //list of interpolation keys used to compute the values between all frames
            this._listErpKeys = [];

            /**
             * Callback on animation start event
             * @property onAnimationStart
             * @type {Function}
             */
            this.onAnimationStart = null;
            /**
             * Callback on animation end event
             * @property onAnimationEnd
             * @type {Function}
             */
            this.onAnimationEnd = null;
            /**
             * Callback on animation event
             * @property onAnimate
             * @type {Function}
             */
            this.onAnimate = null;
        },

        /**
         * Add a new animation key frame to the timeline and sort the timeline by frame number
         * @public
         * @method addKey
         * @param {Number} frame. Must be an integer value.
         * @param {Number} value
         */
        addKey: function (frame, value) {
            this._listKeys.push(new CGSGKeyFrame(frame, {x: value, y: 0}));
            this.sortByFrame(this._listKeys);

            this.listValues.clear();

            //by default, create 1 interpolation key for every animation key
            this.addInterpolationKey(frame, value);
        },

        /**
         * Remove the key at the specified frame
         * @method removeKey
         * @param frame {Number} Must be an integer value.
         */
        removeKey: function (frame) {
            this._removeKeyToList(frame, this._listKeys);
            this._removeKeyToList(frame, this._listErpKeys);

            if (this.getNbKeys() > 1) {
                this._computeNumberOfFrameBetweenKeys();
            }
            this.listValues.clear();
        },

        /**
         * @method removeKeysBetween
         * @param frame1 {number}
         * @param frame2 {number}
         */
        removeKeysBetween: function (frame1, frame2) {
            var k;
            for (k = this._listKeys.length - 1; k >= 0; k--) {
                if (this._listKeys[k].frame >= frame1 && this._listKeys[k].frame <= frame2) {
                    this._listKeys.without(this._listKeys[k]);
                }
            }

            for (k = this._listErpKeys.length - 1; k >= 0; k--) {
                if (this._listErpKeys[k].frame >= frame1 && this._listErpKeys[k].frame <= frame2) {
                    this._listErpKeys.without(this._listErpKeys[k]);
                }
            }

            this.listValues.clear();
        },

        addInterpolationKey: function (frame, value) {
            this._removeKeyToList(frame, this._listErpKeys);
            this._listErpKeys.push(new CGSGKeyFrame(frame, {x: value, y: 0}));
            this.sortByFrame(this._listErpKeys);
        },

        removeInterpolationKey: function (frame) {
            this._removeKeyToList(frame, this._listErpKeys);
        },

        _removeKeyToList: function (frame, list) {
            var key = null, k = 0;
            for (k; k < list.length - 1; k++) {
                if (list[k].frame === frame) {
                    key = list[k];
                    break;
                }
            }
            list.without(key);
        },

        /**
         * Remove all keys and values
         * @public
         * @method removeAll
         */
        removeAll: function () {
            this.listValues.clear();
            this._listKeys.clear();
            this._listErpKeys.clear();
            this._numberOfFrameBetweenKeys.clear();
        },

        /**
         * Compute the number of steps between all keys, 2 by 2
         * @private
         * @method _computeNumberOfFrameBetweenKeys
         */
        _computeNumberOfFrameBetweenKeys: function () {
            this._numberOfFrameBetweenKeys.clear();
            var nbFrameInSection = 0, k = 0;
            for (k; k < this._listErpKeys.length - 1; k++) {
                nbFrameInSection = this._listErpKeys[k + 1].frame - this._listErpKeys[k].frame;
                this._numberOfFrameBetweenKeys.push(nbFrameInSection);
            }
        },

        /**
         * @public
         * @method getNbKeys
         * @return {Number} the number of keys in this timeline. Must be an integer value.
         */
        getNbKeys: function () {
            return this._listKeys.length;
        },

        /**
         * Sort the list of keys by frame number
         * @public
         * @method sortByFrame
         */
        sortByFrame: function (list) {
            list.sort(function (a, b) {
                return a.frame - b.frame;
            });
        },

        /**
         * Compute all the values (steps) for the animation of this timeline
         * @public
         * @method compute
         */
        compute: function () {
            //empty the list of values
            this.listValues.clear();
            if (this.getNbKeys() < 1) {
                return;
            }

            this._computeNumberOfFrameBetweenKeys();
            this.listValues = this._method.compute(this._listErpKeys, this._numberOfFrameBetweenKeys);
        },

        /**
         * @method getFirstKey
         * @return {CGSGKeyFrame} the first key frame of this timeline
         */
        getFirstKey: function () {
            if (this.getNbKeys() === 0) {
                return null;
            }

            return this._listKeys[0];
        },

        /**
         * @method getLastKey
         * @return {CGSGKeyFrame} the last key frame of this timeline
         */
        getLastKey: function () {
            if (this.getNbKeys() === 0) {
                return null;
            }

            return this._listKeys[this.getNbKeys() - 1];
        },

        /**
         * Get the value for the frame number passed in parameter
         * @public
         * @method getValue
         * @param {Number} frame the frame bound with the returned value. Must be an integer value.
         * @return {*} Object with 2 properties : frame and value, or undefined
         * If no key is defined, return undefined
         * If there is only one key, returns it's value
         * If the frame is before the first key, returns the first key value
         * If the frame is after the last key, returns the last key value
         */
        getValue: function (frame) {
            var nbKeys = this.getNbKeys();

            //if no keys : no animation
            if (nbKeys === 0 && this.listValues.isEmpty()) {
                return undefined;
            }

            //I have keys, but no precomputed values, so compute values
            if (this.listValues.isEmpty()) {
                if (frame < this._listKeys[0].frame) {
                    return undefined;
                }
                return this.compute();
            }

            //Here, I have precomputed values

            //if frame < first frame, return no value
            if (frame < this._listKeys[0].frame) {
                return undefined;
            }

            //if frame > last frame (ie last key), return last value
            if (frame >= this._listKeys[this._listKeys.length - 1].frame) {
                return this.listValues[this.listValues.length - 1].x;
            }

            return this.listValues[frame - this._listKeys[0].frame].x;
        },

        /**
         * Return the precomputed array of values for this timeline
         * @method exportValues
         * @return {Array}
         */
        exportValues: function () {
            if (this.listValues.length === 0) {
                this.compute();
            }

            var values = [], i;
            for (i = 0; i < this.listValues.length; i++) {
                values.push(this.listValues[i]);
            }
            return values;
        },

        /**
         * Import new precomputed values for this timeline.
         * The number of values must match the number of frame defined by the keys of this timeline
         * @method importValues
         * @param newValues {Array} of new values
         * @param startFrame {Number} Must be an integer value.
         */
        importValues: function (newValues, startFrame) {
            this.addKey(startFrame, newValues[0]);
            this.addKey(startFrame + newValues.length - 1, newValues[newValues.length - 1]);
            var i;
            for (i = 0; i < newValues.length; i++) {
                this.listValues.push(newValues[i]);
            }
        }
    }
);
// Source: src/animation/class.animmanager.js
/*
 * Copyright (c) 2014 Gwennael Buchet
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
 *  Terms of Use causing significant harm to Gwennael Buchet.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 *  Except as contained in this notice, the name of Gwennael Buchet shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Gwennael Buchet.
 *
 *  These Terms of Use are subject to French law.
 */

/**
 * List the interpolation methods to compute the values between 2 animation keys
 * @class CGSGAnimationMethod
 * @type {Object}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGAnimationMethod = {
    /**
     * @property LINEAR
     * @type {CGSGInterpolatorLinear}

     */
    LINEAR      : new CGSGInterpolatorLinear(),
    /**
     * @property NURBS
     * @type {CGSGInterpolatorTCB}
     */
    CUBIC_SPLINE: new CGSGInterpolatorTCB()
};

/**
 * @module Animation
 * @class CGSGAnimationManager
 * @extends {Object}
 * @constructor
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGAnimationManager = CGSGObject.extend(
    {
        initialize: function () {
            /**
             * List of the timelines for the animations.
             * A timeline consists of a list of animation keys for 1 attribute of 1 node
             * @property listTimelines
             * @type {Array}
             */
            this.listTimelines = [];
        },

        /**
         * Add a key
         * @method addAnimationKey
         * @param {CGSGTimeline} timeline handler to the timeline to animate
         * @param {Number} frame the date for the key
         * @param {Number} value value for the attribute at the frame
         *
         * @example this.sceneGraph.addAnimation(imgNode, "position.x", 2000, 200, "linear", true);
         */
        addAnimationKey: function (timeline, frame, value) {
            //add the new key to the timeline
            timeline.addKey(CGSGMath.fixedPoint(frame), value);
        },

        /**
         * @method removeAnimationKey
         * @param timeline {CGSGTimeline}
         * @param frame {Number} the date for the key
         */
        removeAnimationKey: function (timeline, frame) {
            //add the new key to the timeline
            timeline.removeKey(CGSGMath.fixedPoint(frame));
        },

        /**
         * Animate an attribute of a nodes
         * @method animate
         * @param {CGSGNode} node Handler to the nodes to animate
         * @param {String} attribute String representing the attribute to animate ("position.y", "rotation.angle", "fill", ...)
         * @param {Number} duration Duration of the animation, in frame
         * @param {Number} from Start value
         * @param {Number} to End value
         * @param {Number} delay Delay before start the animation, in frames
         * @return {CGSGTimeline} the timeline on which tha the animation was added
         * @example CGSG.animationManager.animate(imgNode, "position.x", 700, 0, 200, 0, true);
         */
        animate: function (node, attribute, duration, from, to, delay) {
            var timeline = this.getTimeline(node, attribute);
            var d1 = CGSG.currentFrame + CGSGMath.fixedPoint(delay);
            var d2 = CGSG.currentFrame + CGSGMath.fixedPoint(delay + duration);
            timeline.removeKeysBetween(d1, d2);
            this.addAnimationKey(timeline, d1, from);
            this.addAnimationKey(timeline, d2, to);
            this.compute(timeline);
            return timeline;
        },

        compute: function (timeline) {
            timeline.compute();
        },

        /**
         * @method stillHaveAnimation
         * @return {Boolean} true if there is still animation key after the current frame
         */
        stillHaveAnimation: function () {
            if (this.listTimelines.length === 0) {
                return false;
            }
            else {
                for (var i = 0, len = this.listTimelines.length; i < len; ++i) {
                    if (this.listTimelines[i].getLastKey() !== null &&
                        this.listTimelines[i].getLastKey().frame <= CGSG.currentFrame) {
                        return true;
                    }
                }
            }

            return false;
        },

        /**
         * Return the timeline corresponding with the nodes and attribute. Create it if does not exists yet
         * @method getTimeline
         * @param {CGSGNode} node Handle to the nodes
         * @param {String} attribute String. the attribute name
         * @return {CGSGTimeline}
         */
        getTimeline: function (node, attribute) {
            for (var i = 0, len = this.listTimelines.length; i < len; ++i) {
                if (this.listTimelines[i].parentNode === node && this.listTimelines[i].attribute === attribute) {
                    return this.listTimelines[i];
                }
            }

            //no timeline yet, create a new one
            return this._createTimeline(node, attribute);
        },

        /**
         * Create a new timeline
         * @private
         * @method createTimeline
         * @param node {CGSGNode} Handle to the nodes
         * @param attribute {String} the attribute name
         * @return {CGSGTimeline}
         */
        _createTimeline: function (node, attribute) {
            var timeline = new CGSGTimeline(node, attribute);
            this.listTimelines.push(timeline);
            return timeline;
        }
    }
);
// Source: src/collision/enum.collision.method.js
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
 * List the methods to check the collision on two nodes
 * @module Collision
 * @class CGSGCollisionMethod
 * @extends {Object}
 * @constructor
 * @type {Object}
 * @author Vincent Vanghelle (vincent.vanghelle@capgemini.com)
 */
var CGSGCollisionMethod = {
    /**
     * @property GHOSTONDEMAND
     */
    GHOSTONDEMAND: "ghostOnDemand",

    /**
     * @property REGION
     */
    REGION: "region"
};

// Source: src/collision/class.collision.tester.region.js
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
 * @module Collision
 * @class CGSGCollisionRegionTester
 * @extends {Object}
 * @constructor
 * @type {CGSGCollisionRegionTester}
 * @author Vincent Vanghelle (vincent.vanghelle@capgemini.com)
 */
var CGSGCollisionRegionTester = CGSGObject.extend(
    {
        initialize: function () {
            this.classType = "CGSGCollisionRegionTester";
        },

        /**
         * Indicate if two nodes are colliding
         * @method isColliding
         * @param currentNode
         * @param testedNode
         * @param threshold
         * @return {boolean} true if nodes are colliding
         */
        isColliding: function (currentNode, testedNode, threshold) {
            if (threshold === null) {
                threshold = 0;
            }
            var curNodeLeft = currentNode.getAbsLeft();
            var curNodeRight = currentNode.getAbsRight();
            var curNodeBottom = currentNode.getAbsBottom();
            var testedNodeLeft = testedNode.getAbsLeft();
            var testedNodeRight = testedNode.getAbsRight();
            var testedNodeBottom = testedNode.getAbsBottom();

            if ((curNodeLeft <= testedNodeRight + threshold &&
                 curNodeRight >= testedNodeLeft - threshold) ||
                (curNodeRight >= testedNodeLeft - threshold &&
                 curNodeLeft <= testedNodeRight + threshold)) {

                if (currentNode.getAbsTop() <= testedNodeBottom + threshold &&
                    curNodeBottom >= testedNode.getAbsTop() - threshold) {
                    return true;
                }
            }

            return false;
        }
    }
);
// Source: src/collision/class.collision.tester.ghost.ondemand.js
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
 * @module Collision
 * @class CGSGCollisionGhostOnDemandTester
 * @extends {Object}
 * @constructor
 * @type {CGSGCollisionGhostOnDemandTester}
 * @author Vincent Vanghelle (vincent.vanghelle@capgemini.com)
 */
var CGSGCollisionGhostOnDemandTester = CGSGObject.extend(
    {
        initialize: function () {
            this.classType = "CGSGCollisionGhostOnDemandTester";
        },

        /**
         * Indicate if two nodes are colliding
         * @method isColliding
         * @param cn {CGSGNode} currentNode
         * @param tn {CGSGNode} testedNode
         * @param t {Number} threshold
         * @return {boolean} true if nodes are colliding
         */
        isColliding: function (cn, tn, t) {
            // get deltas to run through minimum pixels (only union of both nodes)
            var deltaX = tn.getAbsLeft() - cn.getAbsLeft();
            var deltaY = tn.getAbsTop() - cn.getAbsTop();

            // with delta, calculate the start and end (length) of x and y
            var lengthX = (deltaX >= 0) ?
                          Math.min(cn.getAbsWidth() - deltaX, tn.getAbsWidth()) :
                          Math.min(tn.getAbsWidth() + deltaX, cn.getAbsWidth());

            var lengthY = (deltaY >= 0) ?
                          Math.min(cn.getAbsHeight() - deltaY, tn.getAbsHeight()) :
                          Math.min(tn.getAbsHeight() + deltaY, cn.getAbsHeight());

            if ((lengthX <= 0) || (lengthY <= 0)) {
                return false;
            }

            var startX = (deltaX >= 0) ? deltaX : 0;
            var startY = (deltaY >= 0) ? deltaY : 0;

            // draw 1st
            var tmpCanvas = document.createElement('canvas');
            tmpCanvas.width = cn.getAbsWidth();
            tmpCanvas.height = cn.getAbsHeight();
            var ctx = tmpCanvas.getContext("2d");
            //ctx.scale(cn.getAbsScale().x, cn.getAbsScale().y);
            ctx.scale(cn._absSca.x, cn._absSca.y);

            // draw 1st at 0x0; (backup position, render, restore position)
            var backupPosition = cn.position;
            cn.position = new CGSGPosition(0, 0);
            cn.render(ctx);
            cn.position = backupPosition;

            // draw node : canvas
            var tmpCanvas2 = document.createElement('canvas');
            tmpCanvas2.width = tn.getAbsWidth();
            tmpCanvas2.height = tn.getAbsHeight();
            var ctx2 = tmpCanvas2.getContext("2d");

            // draw node  (backup position, render, restore position)
            backupPosition = tn.position;
            tn.position = new CGSGPosition(0, 0);
            tn.render(ctx2);
            tn.position = backupPosition;

            // compute both with mask at deltas
            ctx.globalCompositeOperation = "destination-in";
            //ctx.drawImage(tmpCanvas2, deltaX / cn.getAbsScale().x, deltaY / cn.getAbsScale().y);
            ctx.drawImage(tmpCanvas2, deltaX / cn._absSca.x, deltaY / cn._absSca.y);

            // WARN : security exception with chrome when calling .html directly (no apache server)
            var canvasData = ctx.getImageData(startX, startY, lengthX, lengthY);
            //run through data canvas, in the common zone
            for (var x = 0; x < canvasData.width; x++) {
                for (var y = 0; y < canvasData.height; y++) {
                    var idx = ((x) + (y) * canvasData.width) * 4;
                    // check alpha
                    if (canvasData.data[idx + 3] > 0) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
);
// Source: src/collision/class.collision.tester.factory.js
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
 * @module Collision
 * @class CGSGCollisionTesterFactory
 * @extends {Object}
 * @constructor
 * @type {CGSGCollisionTesterFactory}
 * @author Vincent Vanghelle (vincent.vanghelle@capgemini.com)
 */
var CGSGCollisionTesterFactory = CGSGObject.extend(
    {
        initialize: function () {
this.collisionTesters = new CGSGMap();

            // initialize collision testers
            this.collisionTesters.addOrReplace(CGSGCollisionMethod.REGION, new CGSGCollisionRegionTester());
            this.collisionTesters.addOrReplace(CGSGCollisionMethod.GHOSTONDEMAND,
                                               new CGSGCollisionGhostOnDemandTester());
        },

        /**
         * Return a collision tester depending on the collision method
         * @method getCollisionTester
         * @param collisionMethod
         * @return {Object}
         */
        getCollisionTester: function (collisionMethod) {
            return this.collisionTesters.getValue(collisionMethod);
        }
    }
);

// Source: src/collision/class.collision.manager.js
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

//noinspection JSHint
/**
 * @module Collision
 * @class CGSGCollisionManager
 * @extends {Object}
 * @constructor
 * @type {CGSGCollisionManager}
 * @author Vincent Vanghelle (vincent.vanghelle@capgemini.com)
 */
var CGSGCollisionManager = CGSGObject.extend(
    {
        initialize: function () {
},

        /**
         * Indicate if two nodes are colliding
         * @method isColliding
         * @param currentNode
         * @param testedNode
         * @param threshold
         * @return {boolean} true if nodes are colliding
         */
        isColliding: function (currentNode, testedNode, threshold) {
            if (currentNode.isCollisionManaged && testedNode.isCollisionManaged) {
                if (cgsgExist(CGSG.performanceKeys)) {
                    return CGSG.performanceKeys.collisionTester.isColliding(currentNode, testedNode, threshold);
                }
            }
            return false;
        },

        /**
         * Defines a node as managed by the collision manager
         * @method manageNode
         * @param node
         */
        manageNode: function (node) {
            node.isCollisionManaged = true;
        },

        /**
         * Defines a node as not managed by the collision manager
         * @method unManageNode
         * @param node
         */
        unManageNode: function (node) {
            node.isCollisionManaged = false;
        }
    }
);

// Source: src/globals.js
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
 * List the methods to check the pick on a node
 * @class CGSGPickNodeMethod
 * @type {Object}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGPickNodeMethod = {
    /**
     * @property GHOST
     */
    GHOST: "ghost",
    /**
     * @property REGION
     */
    REGION: "region"
};

/**
 * Global properties of the framework
 *
 * @class GLOBAL_PROPERTIES
 * @module Util
 * @static
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */

/**
 * List of the parameters of different browsers
 * @property cgsgExplorerParams
 * @type {Object}
 */
var cgsgExplorerParams = {
    IE10: {name: "IE 10 or above", browserName: "", fullVersion: "", textDecalYTop: 4.3, textDecalYBottom: 1.26, textDecalYMiddle: 1.87, textDecalYAlpha: 0.983, webworker: false},
    IE9: {name: "IE 9", browserName: "", fullVersion: "", textDecalYTop: 4.3, textDecalYBottom: 1.26, textDecalYMiddle: 1.87, textDecalYAlpha: 0.983, webworker: false},
    SAFARI: {name: "Safari", browserName: "", fullVersion: "", textDecalYTop: 4.0, textDecalYBottom: 1.27, textDecalYMiddle: 1.77, textDecalYAlpha: 0.983, webworker: false},
    CHROME: {name: "Chrome", browserName: "", fullVersion: "", textDecalYTop: 3.3, textDecalYBottom: 1.268, textDecalYMiddle: 2.09, textDecalYAlpha: 0.983, webworker: false},
    OPERA: {name: "Opera", browserName: "", fullVersion: "", textDecalYTop: 3.5, textDecalYBottom: 1.28, textDecalYMiddle: 2.0, textDecalYAlpha: 0.995, webworker: false},
    FIREFOX: {name: "Firefox", browserName: "", fullVersion: "", textDecalYTop: 10, textDecalYBottom: 1.23, textDecalYMiddle: 1.77, textDecalYAlpha: 0.983, webworker: false},
    KONQUEROR: {name: "Konqueror", browserName: "", fullVersion: "", textDecalYTop: 10, textDecalYBottom: 1.23, textDecalYMiddle: 1.77, textDecalYAlpha: 0.983, webworker: false},
    UNKNOWN: {name: "Unknown", browserName: "", fullVersion: "", textDecalYTop: 10, textDecalYBottom: 1.23, textDecalYMiddle: 1.77, textDecalYAlpha: 0.983, webworker: false}
};

/**
 * Current version of the browser. The framework check the browser at the start and fill this property.
 * @property cgsgCurrentExplorer
 * @readonly
 * @default cgsgExplorerParams.UNKNOWN
 * @type {Object}
 */
var cgsgCurrentExplorer = cgsgExplorerParams.UNKNOWN;

/**
 * Global properties for the current scene
 *
 * @class CGSG
 * @module Util
 * @static
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSG = {

    /**
     * Current version of the framework
     * @property version
     * @static
     * @type {String}
     */
    version: "2.2.0",

    /**
     * The scene graph itself
     * @property sceneGraph
     * @default null
     * @type {CGSGSceneGraph}
     */
    sceneGraph: null,

    /**
     * Current display ratio
     * @property displayRatio
     * @static
     * @type {CGSGScale}
     */
    displayRatio: CGSG_DEFAULT_DISPLAYRATIO,

    /**
     * Default threshold to detect the handle boxes on a resizable node
     * @property resizeHandleThreshold
     * @static
     * @type {Number}
     */
    resizeHandleThreshold: CGSG_DEFAULT_SELECTED_RESIZEHANDLE_THRESHOLD,

    /**
     * The current frame in hte global timeline
     * @property currentFrame
     * @readonly
     * @type {Number}
     */
    currentFrame: 0,

    /**
     * The canvas container for this scene
     * @property canvas
     * @readonly
     * @type {HTMLElement}
     */
    canvas: null,

    /**
     * The main rendering 2D context for this scene
     * @property context
     * @type {CanvasRenderingContext2D}
     */
    context: null,

    /**
     * The global ghost context for fake rendering
     * @property ghostContext
     * @readonly
     * @type {CanvasRenderingContext2D}
     */
    ghostContext: null,

    /**
     * the color used for the ghost mode rendering
     * @property ghostColor
     * @type {String}
     * @public
     */
    ghostColor: "#FF0000",

    /**
     * List of the current selected nodes in the scenegraph.
     * @property selectedNodes
     * @type {Array}
     */
    selectedNodes: [],

    /**
     * List of the timelines for the animations.
     * A timeline consists of a list of animation keys for 1 attribute of 1 node
     * @property listTimelines
     * @type {Array}
     * @private
     */
    listTimelines: [],

    /**
     * Number of frames to average the FPS.
     * Reduce this number to get more accurate FPS
     * @property framerateDelay
     * @default CGSG_DEFAULT_FRAMERATE_DELAY
     * @type {Number}
     */
    framerateDelay: CGSG_DEFAULT_FRAMERATE_DELAY,

    /**
     * Maximum number of frames per second. Set it if you want your application to slow down.
     * @property maxFramerate
     * @default CGSG_DEFAULT_MAX_FRAMERATE
     * @type {Number}
     * @example
     *     //limit the fps of the application to 30
     *     CGSG.maxFramerate : 30,
     */
    maxFramerate: CGSG_DEFAULT_MAX_FRAMERATE,

    /**
     * Current framerate of the application
     * @property fps
     * @type {Number}
     */
    fps: 0,

    /**
     * If set to true, the bounding boxes for selected nodes will be rendered on top of the scene
     * If set to false, the bounding boxes for selected nodes will be rendered on top of the node
     * @property isBoundingBoxOnTop
     * @default true
     * @type {Boolean}
     */
    isBoundingBoxOnTop: true,

    /**
     * Instance of CollisionTesterFactory
     * @property collisionTestFactory
     * @type {CGSGCollisionTesterFactory}
     */
    collisionManager: new CGSGCollisionManager(),

    cssManager: new CGSGCSSManager(),

    /**
     * Object that defines the performance keys.
     * Change values to adapt your project.
     *
     * CGSG.performanceKeys._collisionMethod :
     *                Key to specify collision detection mod
     *                Use setCollisionMethod to modify value,
     *                Default : CGSGCollisionMethod.REGION
     *
     * CGSG.performanceKeys.collisionTester :
     *                Collision tester depending on _collisionMethod,
     *                Default : CGSGCollisionRegionTester
     *
     * @property performanceKeys
     * @type {Object}
     */
    performanceKeys: {
        _collisionMethod: CGSGCollisionMethod.REGION,

        _cgsgCollisionTesterFactory: new CGSGCollisionTesterFactory(),

        collisionTester: new CGSGCollisionRegionTester(),

        /**
         * Redefines the collision method
         * @method setCollisionMethod
         * @param method
         */
        setCollisionMethod: function (method) {
            this._collisionMethod = method;
            this.collisionTester = this._cgsgCollisionTesterFactory.getCollisionTester(this._collisionMethod);
        }
    },

    /**
     * Animation manager
     * @property animationManager
     * @type {CGSGAnimationManager}
     */
    animationManager: new CGSGAnimationManager(),

    /**
     * Event manager to use to bind events to objects.
     *
     * @property eventManager
     * @type {CGSGEventManager}
     */
    eventManager: new CGSGEventManager(),

    /**
     * Default threshold apply to all new nodes when detecting selection.
     *
     * @property globalDetectSelectionThreshold
     * @type {Number}
     */
    globalDetectSelectionThreshold: 0
};

/**
 * All kinds of events defined by the CGSceneGraph framework.
 *
 * @property cgsgEventTypes
 * @type {Object}
 */
var cgsgEventTypes = {

    // Nodes rendering
    ON_BEFORE_RENDER: "onBeforeRender",
    ON_AFTER_RENDER: "onAfterRender",
    //ON_BEGIN_RENDER: "onBeginRender",
    //ON_FINISH_RENDER: "onFinishRender",
    BEFORE_RENDER_END: "onBeforeRenderEnd",
    AFTER_RENDER_START: "onAfterRenderStart",

    // Node SRT
    ON_TRANSLATE: "onTranslate",
    ON_ROTATE: "onRotate",
    ON_SCALE: "onScale",
    ON_RESIZE: "onResize",
    ON_RESIZE_END: "onResizeEnd",

    // Node mouse event
    ON_MOUSE_UP: "onMouseUp",
    ON_MOUSE_OVER: "onMouseOver",
    ON_MOUSE_OUT: "onMouseOut",
    ON_MOUSE_ENTER: "onMouseEnter",
    ON_CLICK: "onClick",
    ON_CLICK_START: "onClickStart",
    ON_DBL_CLICK: "onDblClick",
    ON_DRAG: "onDrag",
    ON_DRAG_END: "onDragEnd",

    // Node state event
    ON_CHILD_ADD: "onChildAdd",
    ON_CHILD_REMOVED: "onChildRemove",
    ON_SELECT: "onSelect",
    ON_DESELECT: "onDeselect",
    ON_FREE: "onFreeEvent",
    ON_LOAD_END: "onLoadEnd",
    ON_LOAD_ERROR: "onLoadError",
    ON_LOAD_ABORT: "onLoadAbort",

    // Scene
    ON_RENDER_START: "onRenderStart",
    ON_RENDER_END: "onRenderEnd",
    ON_SCENE_DBL_CLICK_START: "onSceneDblClickStart",
    ON_SCENE_DBL_CLICK_END: "onSceneDblClickEnd",
    ON_SCENE_CLICK_START: "onSceneClickStart",
    ON_SCENE_CLICK_END: "onSceneClickEnd",
    ON_SCENE_AVERAGE_FPS_CHANGED: "onSceneAverageFpsChanged",

    // Timeline
    ON_ANIMATE: "onAnimate",
    ON_ANIMATION_START: "onAnimationStart",
    ON_ANIMATION_END: "onAnimationEnd",

    // Particle
    ON_UPDATE_PARTICLE_END: "onUpdateParticleEnd",
    ON_INIT_PARTICLE: "onInitParticle",

    // Tab
    ON_TAB_CHANGED: "onTabChanged"
};

// Source: src/utils/util.global.js
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
 * Global methods
 *
 * @class GLOBAL_METHODS
 * @module Util
 * @static
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */

/**
 * @method cgsgExist
 * @param o {Object}
 * @return {boolean} true if the parameter !== null && !== undefined && (!isNaN(o) && isFinite(o))
 */
function cgsgExist(o) {
    if (typeof o === 'number') {
        return !isNaN(o) && isFinite(o);
    }

    return (o !== null && o !== undefined);
}

/**
 * @method cgsgDetectCurrentExplorer
 */
function cgsgDetectCurrentExplorer() {
    //noinspection JSUndeclaredVariable
    cgsgCurrentExplorer = cgsgExplorerParams.UNKNOWN;

    var userAgent = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var nameOffset, versionOffset;

    if ((versionOffset = userAgent.indexOf("Opera")) !== -1) {
        //noinspection JSUndeclaredVariable
        cgsgCurrentExplorer = cgsgExplorerParams.OPERA;
        fullVersion = userAgent.substring(versionOffset + 6);
        if ((versionOffset = userAgent.indexOf("Version")) !== -1) {
            fullVersion = userAgent.substring(versionOffset + 8);
        }
    }
    else if ((versionOffset = userAgent.indexOf("MSIE")) !== -1) {
        browserName = "Microsoft Internet Explorer";
        //noinspection JSUndeclaredVariable
        cgsgCurrentExplorer = cgsgExplorerParams.IE9;
        fullVersion = userAgent.substring(versionOffset + 5);
        if (parseInt(fullVersion) >= 10) {
            //noinspection JSUndeclaredVariable
            cgsgCurrentExplorer = cgsgExplorerParams.IE10;
        }
    }
    else if ((versionOffset = userAgent.indexOf("Chrome")) !== -1) {
        //noinspection JSUndeclaredVariable
        cgsgCurrentExplorer = cgsgExplorerParams.CHROME;
        fullVersion = userAgent.substring(versionOffset + 7);
    }
    else if ((versionOffset = userAgent.indexOf("Safari")) !== -1) {
        //noinspection JSUndeclaredVariable
        cgsgCurrentExplorer = cgsgExplorerParams.SAFARI;
        fullVersion = userAgent.substring(versionOffset + 7);
        if ((versionOffset = userAgent.indexOf("Version")) !== -1) {
            fullVersion = userAgent.substring(versionOffset + 8);
        }
    }
    else if ((versionOffset = userAgent.indexOf("Firefox")) !== -1) {
        //noinspection JSUndeclaredVariable
        cgsgCurrentExplorer = cgsgExplorerParams.FIREFOX;
        fullVersion = userAgent.substring(versionOffset + 8);
    }
    else if ((nameOffset = userAgent.lastIndexOf(' ') + 1) <
             (versionOffset = userAgent.lastIndexOf('/'))) {
        browserName = userAgent.substring(nameOffset, versionOffset);
        fullVersion = userAgent.substring(versionOffset + 1);
        if (browserName.toLowerCase() === browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }

    cgsgCurrentExplorer.fullVersion = fullVersion;
    cgsgCurrentExplorer.browserName = browserName;

    //Now, check for support for webworker
    cgsgCurrentExplorer.webworker = typeof(Worker) !== "undefined";
}

var cgsgStylePaddingLeft = 0;
var cgsgStylePaddingTop = 0;
var cgsgStyleBorderLeft = 0;
var cgsgStyleBorderTop = 0;

/**
 * @method cgsgGetRealViewportDimension
 * @return {CGSGDimension} a CGSGDimension as the real viewport dimension
 */
function cgsgGetRealViewportDimension() {
    var e = window, a = 'inner';
    if (!( 'innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return new CGSGDimension(e[a + 'Width'], e[a + 'Height']);
}

/**
 * @method cgsgGetDisplayedViewportDimension
 * @return {CGSGDimension} a CGSGDimension as the viewport region
 */
function cgsgGetDisplayedViewportDimension() {
    var realDim = cgsgGetRealViewportDimension();
    return new CGSGDimension(Math.round(realDim.width / CGSG.displayRatio.x),
                             Math.round(realDim.height / CGSG.displayRatio.y));
}

/**
 * @method cgsgPointIsInRegion
 * @return {Boolean} true if the point is inside the region or around this one in a distance of threshold
 * @param point a CGSGPosition
 * @param targetRegion a CGSGRegion
 * @param threshold an integer
 */
function cgsgPointIsInRegion(point, targetRegion, threshold) {
    return point.x >= (targetRegion.position.x - threshold) &&
           point.y >= (targetRegion.position.y - threshold) &&
           point.x <= (targetRegion.position.x + targetRegion.dimension.width + threshold) &&
           point.y <= (targetRegion.position.y + targetRegion.dimension.height + threshold);
}

/**
 * @method cgsgRegionIsInRegion
 * @return {Boolean} true if the point is inside the region or around this one in a distance of threshold
 * @param region a CGSGRegion
 * @param targetRegion a CGSGRegion
 * @param threshold an integer
 */
function cgsgRegionIsInRegion(region, targetRegion, threshold) {
    return region.position.x >= (targetRegion.position.x - threshold) &&
           region.position.y >= (targetRegion.position.y - threshold) &&
           (region.position.x + region.dimension.width) <=
           (targetRegion.position.x + targetRegion.dimension.width + threshold) &&
           (region.position.y + region.dimension.height) <=
           (targetRegion.position.y + targetRegion.dimension.height + threshold);
}

/**
 * Return the mouse or touch positions relative to the canvas
 * @method cgsgGetCursorPositions
 * @param {Event} event a touch or mouse Event
 * @param {HTMLElement} canvas a handler to the Canvas element
 * @return {Array} Array of CGSGPosition object
 */
function cgsgGetCursorPositions(event, canvas) {
    var element = canvas, offsetX = 0, offsetY = 0, positions = [];

    if (element.offsetParent) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }

    // Add padding and border style widths to offset
    offsetX += cgsgStylePaddingLeft;
    offsetY += cgsgStylePaddingTop;

    offsetX += cgsgStyleBorderLeft;
    offsetY += cgsgStyleBorderTop;

    var touch = event;
    //if multi-touch, get all the positions
    if (event.targetTouches) { // or changedTouches
        var touchPoints = (typeof event.targetTouches !== 'undefined') ? event.targetTouches : [event];
        for (var i = 0; i < touchPoints.length; i++) {
            touch = touchPoints[i];

            positions.push(new CGSGPosition((touch.pageX - offsetX) / CGSG.displayRatio.x,
                                            (touch.pageY - offsetY) / CGSG.displayRatio.y));
        }
    }
    else {
        positions.push(new CGSGPosition((touch.pageX - offsetX) / CGSG.displayRatio.x,
                                        (touch.pageY - offsetY) / CGSG.displayRatio.y));
    }

    return positions;
}

/**
 * Wipes the canvas context
 * @method cgsgClearContext
 * @param {CanvasRenderingContext2D} context context to render on
 * */
function cgsgClearContext(context) {
    context.setTransform(1, 0, 0, 1, 0, 0);
    // Will always clear the right space
    context.clearRect(0, 0, CGSG.canvas.width, CGSG.canvas.height);
}

/* jshint -W035 */
/**
 * Iterates the given array and, at each iteration, calls the given callback function. The loop stops if the callback
 * function returns false.
 *
 * Optimized loop is used here and should be prefer to other approaches, especially on old browser versions and IE.
 *
 * @method cgsgIterate
 * @param array {Array} the array
 * @param callback {Function} the callback
 */
function cgsgIterate(array, callback) {
    var i = 0, len = array.length;


    for (; i < len && callback(i, array[i++]) !== false;) {
    }

}
/* jshint +W035 */

/**
 * Iterates the given array from the end to the beginning of the array. The loop stops if the callback function returns
 * false.
 *
 * Prefer to use this method for the same reasons than cgsgIterate.
 *
 * @method cgsgIterateReverse
 * @param array {Array} the array
 * @param callback {Function} the callback
 */
function cgsgIterateReverse(array, callback) {
    var i = array.length - 1;

    /* jshint -W035 */
    for (; i >= 0 && callback(i, array[i--]) !== false;) {
    }
    /* jshint +W035 */
}

/**
 * Free the given object and notify listeners with appropriate event.
 *
 * @method cgsgFree
 * @param {*} object
 */
function cgsgFree(object) {
    if (cgsgExist(object.onFreeEvent)) {
        CGSG.eventManager.dispatch(object, cgsgEventTypes.ON_FREE, new CGSGEvent(this, null));
    }
    object = null;
}// Source: src/mask/class.mask.js
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
 * */

/**
 * Utility class which represents a mask to apply on several nodes. The class should be sub-classed to define
 * particular rendering. This class actually does not any rendering. However, when its 'apply' method is called,
 * it begins to observe the given node and calls rendering methods which should be overridden.
 *
 * Two key methods are provided here :
 * - prepare which is called before the node and its children is rendered
 * - finalize which is called once the rendering of the node has been done
 *
 * @class CGSGMask
 * @extends CGSGObject
 * @constructor
 * @author Guillaume Drouet (guidrouet@gmail.com)
 * @type {CGSGMask}
 */
var CGSGMask = CGSGObject.extend(
    {
        initialize: function () {
            this._prepareEvent = cgsgEventTypes.ON_BEFORE_RENDER;
            this._finalizeEvent = cgsgEventTypes.ON_AFTER_RENDER;

            this._keyEvents = new CGSGMap();
            this._bindEventAdapter = this._eventAdapter.bind(this);
        },

        /**
         * Apply this mask to the given node.
         *
         * @method apply
         * @param node {CGSGNode} the node
         */
        apply: function (node) {
            // Remember keys for event bound to the node in order to unbound it...
            this._keyEvents.addOrReplace(node, {
                prepareKey : CGSG.eventManager.bindHandler(node, this._prepareEvent, this._bindEventAdapter),
                finalizeKey: CGSG.eventManager.bindHandler(node, this._finalizeEvent, this._bindEventAdapter)
            });

            this._internalApply(node);
        },

        /**
         * Override this method to perform custom additional stuff when applying this mask.
         *
         * @method _internalApply
         * @private
         * @param node {CGSGNode} the node
         */
        _internalApply: function (node) {

        },

        /**
         * Removes this mask from a node.
         *
         * @method remove
         * @param node CGSGNode the node
         */
        remove: function (node) {
            var key = this._keyEvents.getValue(node);

            if (cgsgExist(key)) {
                CGSG.eventManager.unbindHandler(node, this._prepareEvent, this._bindEventAdapter);
                CGSG.eventManager.unbindHandler(node, this._finalizeEvent, this._bindEventAdapter);
            }

            this._internalRemove(node);
        },

        /**
         * Override this method to perform custom additional stuff when removing this mask.
         *
         * @method _internalRemove
         * @private
         * @param node {CGSGNode} the node
         */
        _internalRemove: function (node) {

        },

        /**
         * Observer method which catches key events to apply the mask.
         *
         * @method _eventAdapter
         * @param event {CGSGEvent} the event
         * @private
         */
        _eventAdapter: function (event) {
            var ctx;
            switch (event.type) {
                case this._prepareEvent :
                    ctx = this.prepare(event.observable, event.data.context);
                    event.data.context = ctx;

                    break;
                case this._finalizeEvent :
                    ctx = this.finalize(event.observable, event.data.context);
                    event.data.context = ctx;
                    break;
            }
        },

        /**
         * Method to override to prepare the given context to render.
         *
         * @method prepare
         * @param node {CGSGNode} the observed node
         * @param context {CanvasRenderingContext2D} the context
         */
        prepare: function (node, context) {
            // do nothing
        },

        /**
         * Method to override to finish the mask rendering.
         *
         * @method finalize
         * @param node {CGSGNode} the observed node
         * @param context {CanvasRenderingContext2D} the context
         */
        finalize: function (node, context) {
            // do nothing
        }
    }
);
// Source: src/mask/class.mask.clip.js
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
 * */

/**
 * This class clips a region of a given node (including its children) according to a specified dimension. Internally,
 * a fake context is created and then desired data are retrieved from it and drawn to the original context.
 *
 * @class CGSGMaskClip
 * @extends CGSGMask parent class here
 * @constructor
 * @param {CGSGRegion} clipRegion the region to clip
 * @author Guillaume Drouet (guidrouet@gmail.com)
 * @type {CGSGMaskClip}
 */

var CGSGMaskClip = CGSGMask.extend(
    {
        initialize: function (clipRegion) {
            this._super();
            this._maskRegion = clipRegion;

            this._saveContext = null;

            this.canvas = document.createElement('canvas');
            this.canvas.width = 10;
            this.canvas.height = 10;
            this._renderContext = this.canvas.getContext('2d');
            this.autoRefresh = true;
            this.refreshOnNextFrame = false;
        },

        /**
         * Prepare the rendering of the node by saving the given context and returning a temporary context where the
         * node and its children should rendered.
         *
         * @method prepare
         * @param node {CGSGNode} the node
         * @param context {CanvasRenderingContext2D} the context where the region will be clipped
         * @return {CanvasRenderingContext2D} the context to use
         */
        prepare: function (node, context) {
            this._saveContext = context;
            this.canDrawImage = true;

            if (this.autoRefresh || this.refreshOnNextFrame) {
                this._renderContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.refreshOnNextFrame = false;

                // Get mask region
                var pMask = this._maskRegion.position;
                var dMask = this._maskRegion.dimension;
                var x = pMask.x;
                var y = pMask.y;

                // Get node region according to its scale and mask constraints
                var nodePos = node.position;
                var nodeDimension = node.dimension;
                var nodeWidth = nodeDimension.width - x;
                var nodeHeight = nodeDimension.height - y;

                // Decide if the mask or the node region should be applied
                var w = dMask.width;
                var h = dMask.height;

                if (w > nodeWidth) {
                    w = nodeWidth <= 0 ? 0 : nodeWidth;
                }

                if (h > nodeHeight) {
                    h = nodeHeight <= 0 ? 0 : nodeHeight;
                }

                // Get image data only if necessary...
                if (w > 0 && h > 0) {
                    var rX = nodePos.x + x;
                    var rY = nodePos.y + y;

                    // Define slices according to the part of the node out of the window
                    var sX, sY, sW, sH;

                    if (rX < 0) {
                        sX = 0;
                        sW = w + rX;
                    }
                    else {
                        sX = node.position.x + x;
                        sW = w;
                    }

                    if (rY < 0) {
                        sY = 0;
                        sH = h + rY;
                    }
                    else {
                        sY = node.position.y + y;
                        sH = h;
                    }

                    // Experimental, reduce definition in memory to work on non-retina IPad (< 4)
                    //sH *= 0.5;
                    //sY *= 0.5;
                    //node.scaleTo(0.5, 0.5, true);

                    this.canvas.width = (sX + sW + 1);
                    this.canvas.height = (sY + sH + 1);
                    this.sliceX = sX;
                    this.sliceY = sY;
                    this.sliceWidth = sW;
                    this.sliceHeight = sH;
                }
                else {
                    this.canDrawImage = false;
                }

                this._renderContext.save();
                return this._renderContext;
            }

            return null;
        },

        /**
         * Finalize this mask by adding to the saved context the image data corresponding to the mask region.
         *
         * @method finalize
         * @param node {CGSGNode} the node
         * @param context {CanvasRenderingContext2D} the context returned by prepare()
         * @return {CanvasRenderingContext2D} the context that was used to invoke prepare()
         */
        finalize: function (node, context) {

            if (this.canDrawImage) {
                //node.scaleTo(1, 1, true);
                this._saveContext.drawImage(this.canvas, this.sliceX, this.sliceY, this.sliceWidth, this.sliceHeight,
                                            this.sliceX, this.sliceY, this.sliceWidth /* 2*/, this.sliceHeight /* 2*/);
                this._renderContext.restore();
            }

            return this._saveContext;
        }
    }
);
// Source: src/utils/math/math.js
/*
 * Copyright (c) 2014 Gwennael Buchet
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
 *  Terms of Use causing significant harm to Gwennael Buchet.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 *  Except as contained in this notice, the name of Gwennael Buchet shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Gwennael Buchet.
 *
 *  These Terms of Use are subject to French law.
 */

/**
 * Static class that encapsulates some useful methods.
 * @module Math
 * @main Math
 * @static
 * @class CGSGMath
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGMath = {
    /**
     * PI x 2
     * @static
     * @property PI2
     */
    PI2: 6.28318530718, //Math.PI * 2.0,

    /**
     * Convert degree to radian
     * @method deg2rad
     * @static
     * @param {Number} angle
     * @return {Number} The radian value
     */
    deg2rad: function (angle) {
        return (angle / 180.0) * Math.PI;
    },

    /**
     * Convert radian to degree
     * @method rad2deg
     * @static
     * @param {Number} angle
     * @return {Number} The degree value
     */
    rad2deg: function (angle) {
        return angle * 57.29577951308232;
    },

    /**
     * Compute the rounded integer of n
     * @method fixedPoint
     * @static
     * @param {Number} n
     * @return {Number} The integer value
     */
    fixedPoint: function (n) {
        /*jshint -W016 */
        return (0.5 + n) << 0;
        /*jshint +W016 */
    },

    /**
     * Linear interpolation between 'from' and 'to'
     * @method lerp
     * @static
     * @param {Number} from
     * @param {Number} to
     * @param {Number} weight Percentage to apply to the first value
     * @return {Number} The interpolated value
     */
    lerp: function (from, to, weight) {
        return from + (to - from) * weight;
    }
};
// Source: src/utils/class.handlebox.js
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
 * A Tiny box on selected square borders
 * @class CGSGHandleBox
 * @extends {Object}
 * @constructor
 * @param {CGSGNode} parentNode
 * @param {Number} size
 * @param {String} fillColor
 * @param {String} strokeColor
 * @param {Number} lineWidth
 * @param {Number} x
 * @param {Number} y
 * @type {CGSGHandleBox}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGHandleBox = CGSGObject.extend(
    {
        initialize: function (parentNode, size, fillColor, strokeColor, lineWidth, x, y) {
            /**
             * @property fillColor
             * @type {String}
             */
            this.fillColor = fillColor;

            /**
             * @property strokeColor
             * @type {String}
             */
            this.strokeColor = strokeColor;

            /**
             * @property lineWidth
             * @type {Number}
             */
            this.lineWidth = lineWidth;

            /**
             * @property size
             * @type {Number}
             */
            this.size = size;

            /**
             * @property isVisible
             * @type {boolean}
             */
            this.isVisible = true;

            /**
             * @property _parentNode
             * @type {CGSGNode}
             * @private
             */
            this._parentNode = parentNode;
            /**
             * @property _position
             * @type {CGSGPosition}
             * @private
             */
            this._position = new CGSGPosition(x, y);
        },

        /**
         * @method render
         * @param {CanvasRenderingContext2D} context the context into render the handle box
         */
        render: function (context) {
            if (this.isVisible) {
                context.lineWidth = this.lineWidth;
                context.strokeStyle = this.strokeColor;
                context.fillStyle = this.fillColor;

                if (cgsgExist(this.lineWidth) && this.lineWidth > 0) {
                    context.strokeRect(this._position.x,
                                       this._position.y,
                                       this.size / this._parentNode._absSca.x,
                                       this.size / this._parentNode._absSca.y);
                }
                context.fillRect(this._position.x,
                                 this._position.y,
                                 this.size / this._parentNode._absSca.x,
                                 this.size / this._parentNode._absSca.y);
            }
        },

        /**
         * Return true if this handleBox is under the coordinate of the mouse.
         * @method checkIfSelected
         * @param {CGSGPosition} mousePosition
         * @param {Number} threshold Threshold of detection around the box
         * @return {Boolean}
         */
        checkIfSelected: function (mousePosition, threshold) {
            return (mousePosition.x >=
                    this._parentNode._absPos.x + (this._position.x * this._parentNode._absSca.x) -
                    threshold &&
                    mousePosition.x <=
                    this._parentNode._absPos.x + (this._position.x * this._parentNode._absSca.x) +
                    this.size + threshold &&
                    mousePosition.y >=
                    this._parentNode._absPos.y + (this._position.y * this._parentNode._absSca.y) -
                    threshold &&
                    mousePosition.y <=
                    this._parentNode._absPos.y + (this._position.y * this._parentNode._absSca.y) +
                    this.size + threshold);
        },

        /**
         * @method translateTo
         * @param {Number} newRelativeX
         * @param {Number} newRelativeY
         */
        translateTo: function (newRelativeX, newRelativeY) {
            this._position.x = newRelativeX;
            this._position.y = newRelativeY;
        }
    }
);
	// Source: src/node/class.node.js
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
 * Base class for a Node in the Scene Graph.
 * Each node encapsulates its position, dimension, scale and rotation, ...
 * @class CGSGNode
 * @extends CGSGObject
 * @module Node
 * @main Node
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @type {CGSGNode}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGNode = CGSGObject.extend(
        {
            initialize: function (x, y) {

                /**
                 * The name of this nodes. Should be unique, but no control is done.
                 * @property name
                 * @default ""
                 * @type {String}
                 */
                this.name = "";
                /**
                 * Indicate whether this node is selected or not.
                 * Use CGSGView::scenegraph.selectNode(nodeToSelect) to select a node
                 * @property isSelected
                 * @readonly
                 * @default false
                 * @type {Boolean}
                 */
                this.isSelected = false;
                /**
                 * The type of this class. Must be redefined by inherited classes
                 * @property classType
                 * @readonly
                 * @type {String}
                 */
                this.classType = "CGSGNODE";

                /**
                 * The 8 handleboxes that will be the resize handles
                 * the resize handles will be in this order:
                 *  0  1  2
                 *  3     4
                 *  5  6  7
                 * @property handles
                 * @readonly
                 * @type {Array}
                 */
                this.handles = [];

                /**
                 * Level of transparency of the node.
                 * @default 1.0
                 * @property globalAlpha
                 * @type {Number}
                 */
                this.globalAlpha = 1.0;
                /**
                 * Indicate if the node is visible (and so selectable) or not
                 * @property isVisible
                 * @default true
                 * @type {Boolean}
                 */
                this.isVisible = true;

                /**
                 * If true, the node will be proportionally resized
                 * @property isProportionalResize
                 * @type {Boolean}
                 */
                this.isProportionalResize = false;

                /**
                 * Set to true if the node can't be resized only in height or width
                 * @property isProportionalResizeOnly
                 * @default false
                 * @type {boolean}
                 */
                this.isProportionalResizeOnly = false;

                /**
                 * Define the method the detection (or "pick") method will be used for this node.
                 * Possible values CGSGPickNodeMethod.REGION and CGSGPickNodeMethod.GHOST.
                 *
                 * <ul>
                 *     <li>REGION : the detection returns true if the mouse cursor is inside the bounding box of the node</li>
                 *     <li>GHOST : the detection will use the "renderGhost" method of the node to achieve a more accurate detection</li>
                 * </ul>
                 *
                 * @property pickNodeMethod
                 * @default CGSGPickNodeMethod.REGION
                 * @type {CGSGPickNodeMethod}
                 */
                this.pickNodeMethod = CGSGPickNodeMethod.REGION;

                /**
                 * List of the children (empty if this nodes is a leaf)
                 * @property children
                 * @readonly
                 * @type {Array}
                 */
                this.children = [];

                /**
                 * The constraint region when moving the node
                 * @property regionConstraint
                 * @default null
                 * @type {null}
                 */
                this.regionConstraint = null;

                /**
                 * Node defining constraint region when moving the node
                 * @property nodeConstraint
                 * @default null
                 * @type {null}
                 */
                this.nodeConstraint = null;
                /**
                 * List of nodes which are constraint to the region of this one
                 * @property _followers
                 * @type {Array}
                 * @private
                 */
                this._followers = [];

                /**
                 * Pivot point to apply a rotation.
                 * The point is a value between [0, 0] and [1, 1].
                 * [0, 0] is the top left corner of the bounding box and [1, 1] the bottom right corner.
                 * @property rotationCenter
                 * @default null
                 * @type {CGSGPosition}
                 */
                this.rotationCenter = new CGSGPosition(0.5, 0.5);

                /**
                 * can be fulfilled by the developer to put in whatever he needs
                 * @property userData
                 * @default {} Empty object
                 * @type {*}
                 */
                this.userData = {};

                /**
                 * selection attributes
                 * If true, this node is clickable and so will be checked by the pickNode function
                 * @property isClickable
                 * @default true
                 * @type {Boolean}
                 */
                this.isClickable = true;
                /**
                 * If true, this node can be resized by the user. In that case, the dimension property will be affected, not the scale one.
                 * @property isResizable
                 * @default false
                 * @type {Boolean}
                 */
                this.isResizable = false;
                /**
                 * If true, the node can be dragged by the user
                 * @property isDraggable
                 * @default false
                 * @type {Boolean}
                 */
                this.isDraggable = false;

                /**
                 * If true, the absolute matrix will be recomputed after each movement (and so in animation).
                 * Set it to false to gain performance if you don't need to keep trace of absolute position (no need to collision, picknode, ...)
                 * @property needToKeepAbsoluteMatrix
                 * @default true
                 * @type {Boolean}
                 */
                this.needToKeepAbsoluteMatrix = true;

                /**
                 * Color for the line around this node when selected
                 * @property selectionLineColor
                 * @default "#FF6890"
                 * @type {String}
                 */
                this.selectionLineColor = null;
                /**
                 * Width for the line around this node when selected
                 * @property selectionLineWidth
                 * @default 2
                 * @type {Number}
                 */
                this.selectionLineWidth = null;
                /**
                 * Color for the handle boxes around this node when selected
                 * @property handleSize
                 * @type {Number}
                 */
                this.handleSize = null;
                /**
                 * Color for the handle boxes around this node when selected
                 * @property handleColor
                 * @type {String}
                 */
                this.handleColor = null;

                /**
                 * Updated by the scene itself. Don't update it manually.
                 * True if the mice is over the node, false otherwise
                 * @property isMouseOver
                 * @readonly
                 * @type {Boolean}
                 */
                this.isMouseOver = false;
                /**
                 * Updated by the scene itself. Don't update it manually.
                 * True if the node is being moved manually, false otherwise
                 * @property isMoving
                 * @readonly
                 * @type {Boolean}
                 */
                this.isMoving = false;
                /**
                 * Updated by the scene itself. Don't update it manually.
                 * True if the node is being resized manually, false otherwise
                 * @property isResizing
                 * @readonly
                 * @type {Boolean}
                 */
                this.isResizing = false;

                /**
                 * ID for the node. Should be filled by the developer. The framework will never use it.
                 * @property _id
                 * @type {Number}
                 * @private
                 */
                this._id = 0;
                /**
                 * parent of this node
                 * @property _parentNode
                 * @type {CGSGNode}
                 * @private
                 */
                this._parentNode = null;

                this._isCached = false;
                //fake canvas to pre-render static display
                this._cacheCanvas = null;
                this._cacheCtx = null;

                /**
                 * @property shadowOffsetX
                 * @default 0
                 * @type {number}
                 */
                this.shadowOffsetX = 0;
                /**
                 * @property shadowOffsetY
                 * @default 0
                 * @type {number}
                 */
                this.shadowOffsetY = 0;
                /**
                 * @property shadowBlur
                 * @default 0
                 * @type {number}
                 */
                this.shadowBlur = 0;
                /**
                 * @property shadowColor
                 * @default "#333333"
                 * @type {string}
                 */
                this.shadowColor = "#333333";

                /**
                 * Relative position of this nodes on the canvas container, relatively to the position of its parent node.
                 * Never use it to move the node, use translateBy/translateWith/translateTo instead
                 * @readonly
                 * @property position
                 * @default CGSGPosition(0, 0)
                 * @type {CGSGPosition}
                 */
                this.position = new CGSGPosition(0, 0);
                /**
                 * Absolute position of this nodes on the canvas container. Generated value. Don't modify it manually
                 * Never use it to move the node, use translateBy/translateWith/translateTo instead
                 * @readonly
                 * @property _absPos
                 * @private
                 * @type {CGSGPosition}
                 */
                this._absPos = new CGSGPosition(0, 0);
                /**
                 * Dimension of this nodes on the canvas container
                 * Never use it to resize the node, use resizeBy/resizeWith/resizeTo instead
                 * @readonly
                 * @property dimension
                 * @default CGSGDimension(0, 0)
                 * @type {CGSGDimension}
                 */
                this.dimension = new CGSGDimension(0, 0);
                /**
                 * Relative scale of this nodes on the canvas container, relatively to the scale of its parent node.
                 * Never use it to scale or resize the node, use scaleBy/scaleWith/scaleTo instead
                 * @readonly
                 * @property scale
                 * @default CGSGScale(1, 1)
                 * @type {CGSGScale}
                 */
                this.scale = new CGSGScale(1, 1);
                /**
                 * Absolute scale of this nodes on the canvas container. Generated value. Don't modify it manually
                 * Never use it to scale the node, use scaleBy/scaleWith/scaleTo instead
                 * @readonly
                 * @property _absSca
                 * @private
                 * @type {CGSGScale}
                 */
                this._absSca = new CGSGScale(1, 1);
                /**
                 * Relative rotation of this nodes on the canvas container, relatively to the rotation of its parent node.
                 * Never use it to rotate or resize the node, use rotateBy/rotateWith/rotateTo instead
                 * @readonly
                 * @property rotation
                 * @default CGSGRotation(0)
                 * @type {CGSGRotation}
                 */
                this.rotation = new CGSGRotation(0);
                /**
                 * Absolute rotation of this nodes on the canvas container. Generated value. Don't modify it manually
                 * Never use it to rotate or resize the node, use rotateBy/rotateWith/rotateTo instead
                 * @readonly
                 * @private
                 * @property _absRot
                 * @type {CGSGRotation}
                 */
                this._absRot = new CGSGRotation(0);

                /**
                 * @property _isDrag
                 * @type {Boolean}
                 * @private
                 */
                this._isDrag = false;

                /**
                 * true if this node is traversable (recursively) (ie : by the picknode, a traverser, ...)
                 * @property isTraversable
                 * @type {Boolean}
                 */
                this.isTraversable = true;

                /**
                 * Indicate if this node is managed by the collision manager
                 * @property isCollisionManaged
                 * @type {Boolean}
                 */
                this.isCollisionManaged = false;

                /**
                 * Callback on mouse over the node
                 * @property onMouseOver
                 * @default null
                 * @type {function}
                 *
                 * @example
                 *  this.onMouseOver = function (event) {
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
			 *  }
                 */
                this.onMouseOver = null;
                /**
                 * Callback on mouse enter on the node
                 * @property onMouseEnter
                 * @default null
                 * @type {function}
                 *
                 * @example
                 *  this.onMouseEnter = function (event) {
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
			 *  }
                 */
                this.onMouseEnter = null;
                /**
                 * Callback on mouse out
                 * @property onMouseOut
                 * @default null
                 * @type {function}
                 *
                 * @example
                 *  this.onMouseOut = function (event) {
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
			 *  }
                 */
                this.onMouseOut = null;
                /**
                 * Callback on mouse up
                 * @property onMouseUp
                 * @default null
                 * @type {function}
                 *
                 * @example
                 *  this.onMouseUp = function (event) {
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
			 *  }
                 */
                this.onMouseUp = null;
                /**
                 * Callback on mouse or touch click
                 * @property onClick
                 * @default null
                 * @type {function}
                 *
                 * @example
                 *  this.onClick = function (event) {
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
			 *  }
                 */
                this.onClick = null;
                /**
                 * Callback on mouse or touch double click
                 * @property onDblClick
                 * @default null
                 * @type {function}
                 *
                 * @example
                 *  this.onDblClick = function (event) {
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
			 *  }
                 */
                this.onDblClick = null;
                /**
                 * Callback on drag this node
                 * @property onDrag
                 * @default null
                 * @type {function}
                 *
                 * @example
                 *  this.onDrag = function (event) {
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
			 *  }
                 */
                this.onDrag = null;
                /**
                 * Callback on end of drag this node
                 * @property onDragEnd
                 * @default null
                 * @type {function}
                 *
                 * @example
                 *  this.onDragEnd = function (event) {
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
			 *  }
                 */
                this.onDragEnd = null;
                /**
                 * Callback on resize this node
                 * @property onResize
                 * @default null
                 * @type {function}
                 *
                 * @example
                 *  this.onResize = function (event) {
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
			 *  }
                 */
                this.onResize = null;
                /**
                 * Callback on end resize this node
                 * @property onResizeEnd
                 * @default null
                 * @type {function}
                 *
                 * @example
                 *  this.onResizeEnd = function (event) {
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
			 *  }
                 */
                this.onResizeEnd = null;
                /**
                 * Callback on select this node
                 * @property onSelect
                 * @default null
                 * @type {function}
                 *
                 * @example
                 *  this.onSelect = function (event) {
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
			 *  }
                 */
                this.onSelect = null;

                /**
                 * Callback on deselect this node
                 * @property onDeselect
                 * @default null
                 * @type {function}
                 *
                 * @example
                 *  this.onDeselect = function (event) {
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
			 *  }
                 */
                this.onDeselect = null;

                /**
                 * Callback on when a child is removed
                 * @property onChildRemove
                 * @default null
                 * @type {function}
                 *
                 * @example
                 *  this.onDeselect = function (event) {
			 *      event.data.node; //CGSGNode
			 *      event.data.position; //Array of CGSGPosition
			 *      event.data.nativeEvent; //Event
			 *  }
                 */
                this.onChildRemove = null;

                /**
                 * Callback before the node is rendered, children included
                 * @property onBeforeRender
                 * @default null
                 * @type {function}
                 * */
                this.onBeforeRender = null;
                /**
                 * Callback after the scene is rendered
                 * @property onAfterRender
                 * @default null
                 * @type {function}
                 * */
                this.onAfterRender = null;
                /**
                 * @property onAfterRenderStart
                 * @default null
                 * @type {function}
                 * */
                this.onAfterRenderStart = null;
                /**
                 * Callback fired while translating
                 * @property onTranslate
                 * @default null
                 * @type {function}
                 * */
                this.onTranslate = null;

                /**
                 * Threshold applied when detecting selection. Defalt value is picked from CGSG.globalDetectSelectionThreshold.
                 * Value could be changed after.
                 *
                 * @property detectSelectionThreshold
                 * @type {Number}
                 * @example
                 * var n = new CGSGNode(10, 10);
                 * n.detectSelectionThreshold = 10; // node will be picked in an area [0, 0, 30, 30] (x, y, w, h)
                 */
                this.detectSelectionThreshold = CGSG.globalDetectSelectionThreshold;

                /**
                 * Array of colors to fill the background of the node. Will be overrided with CSS content.
                 * CGSGNode extensions should (but not mandatory) use this attribute
                 *
                 * CSS managed.
                 * @property bkgcolors
                 * @type {Array}
                 */
                this.bkgcolors = [];

                /**
                 * Color to stroke the node. Will be overrided with CSS content
                 * CGSGNode extensions should (but not mandatory) use this attribute as the stroke color for their node
                 *
                 * CSS managed.
                 * @property lineColor
                 * @type {String}
                 */
                this.lineColor = null;
                /**
                 * Width of the line that stroke the node. Will be overrided with CSS content.
                 * CGSGNode extensions should (but not mandatory) use this attribute as the strokeWidth for their node
                 * Let 0 if you don't want to stroke the node.
                 *
                 * CSS managed.
                 * @property lineWidth
                 * @default 0
                 * @type {Number}
                 */
                this.lineWidth = 0;

                /**
                 * Corner radius. Used by only few official nodes and maybe by some community's nodes.
                 *
                 * CSS managed.
                 *
                 * @property borderRadius
                 * @type {number}
                 * @default 0
                 */
                this.borderRadius = 0;

                this._cls = [];
                this._clsBBox = null;
                this.setClass("cgsgnode");
                this.setClassBBox("cgsgnode-bbox");

                //initialize the position and dimension
                this.translateTo(x, y, true);
                this.dimension.width = 0;
                this.dimension.height = 0;

                /**
                 * Set to true if dimension of the node is not the original one anymore
                 * @property _isDimensionChanged
                 * @default false
                 * @private
                 */
                this._isDimensionChanged = false;

                // initialize the selection handleBoxes
                for (var i = 0; i < 8; i++) {
                    var handleBox = new CGSGHandleBox(this, this.handleSize, this.handleColor,
                        this.selectionLineColor, this.selectionLineWidth, 0, 0);
                    this.handles.push(handleBox);
                }

                this.computeAbsoluteMatrix(true);
            },

            /**
             * @method moveLocalZIndex
             * @param s {Number} step
             */
            moveLocalZIndex: function (s) {
                var i = this.getLocalZIndex();

                if (!isNaN(i)) {
                    this.setLocalZIndex(this.getLocalZIndex() + s);
                }
            },

            /**
             * @method setLocalZIndex
             * @param i {Number} index
             */
            setLocalZIndex: function (i) {
                if (cgsgExist(this._parentNode)) {
                    i = Math.max(0, Math.min(CGSGMath.fixedPoint(i), this._parentNode.children.length - 1));

                    var n = this.getLocalZIndex();
                    var p = this._parentNode;

                    if (i !== n) {
                        p.detachChild(this);
                        p.addChildAt(this, i);
                    }
                }
            },

            setLocalZIndexToLast: function () {
                this.setLocalZIndex(this._parentNode.children.length - 1);
            },

            getLocalZIndex: function () {
                if (!cgsgExist(this._parentNode)) {
                    return NaN;
                }

                return this._parentNode.children.indexOf(this);
            },

            /**
             * return the relative region of this node
             * @public
             * @method getRegion
             * @return {CGSGRegion}
             */
            getRegion: function () {
                return new CGSGRegion(this.position.x, this.position.y, this.getWidth(), this.getHeight());
            },

            /**
             * return the absolute region of this node
             * @public
             * @method getAbsoluteRegion
             * @return {CGSGRegion}
             */
            getAbsoluteRegion: function () {
                return new CGSGRegion(this.getAbsLeft(), this.getAbsTop(), this.getAbsWidth(),
                    this.getAbsHeight());
            },

            //// RENDERING MANIPULATION //////

            /**
             * Wipes the canvas context
             * @method _clearContext
             * @param c {?} context
             * @param w {Number} canvasWidth
             * @param h {Number} canvasHeight
             * @private
             */
            _clearContext: function (c, w, h) {
                c.clearRect(0, 0, w, h);
            },

            /**
             * Use this method to make the node precomputed or not.
             * If it's precomputed, it won't be redraw every frame, but only when the "invalidate" method is called.
             * @method setPrecomputed
             * @param p {Boolean} isPrecomputed
             */
            setPrecomputed: function (p) {
                this._isCached = p;
                this.invalidate();
            },

            /**
             * Force the redraw of the node if it's precomputed
             * @method invalidate
             */
            invalidate: function () {
                if (this._isCached) {
                    this._preCompute();
                }
            },

            /**
             * Reload theme (colors, ...) from loaded CSS file
             * To be overrided
             * @method invalidateTheme
             *
             */
            invalidateTheme: function () {

                //Use of "this._cls" class names which define the current CSS classes used by this object.
                var fs = CGSG.cssManager.getAttrInArray(this._cls, "background");//"background-color");
                var lw = CGSG.cssManager.getAttrInArray(this._cls, "border-width");
                var ss = CGSG.cssManager.getAttrInArray(this._cls, "border-color");
                var a = CGSG.cssManager.getFloat(CGSG.cssManager.getAttrInArray(this._cls, "opacity"));
                var r = CGSG.cssManager.getNumber(CGSG.cssManager.getAttrInArray(this._cls, "border-radius"));

                if (cgsgExist(r)) {
                    this.borderRadius = r;
                }

                var rgb;

                if (cgsgExist(fs)) {
                    //value is given as "rgb(xx, yy, zz)". Let's convert it to hex
                    rgb = CGSGColor.fromString(fs);
                    if (cgsgExist(rgb.r) && cgsgExist(rgb.g) && cgsgExist(rgb.b)) {
                        this.bkgcolors[0] = CGSGColor.rgb2hex(rgb.r, rgb.g, rgb.b);
                    }
                    else {
                        //value is given as "linear-gradient(rgb(150, 150, 150), rgb(127, 127, 127))".
                        // Let's convert it to 2 hex.
                        var srgb1 = fs.substring(fs.indexOf("rgb"), fs.indexOf(")") + 1);
                        var srgb2 = fs.substring(fs.lastIndexOf("rgb"), fs.lastIndexOf(")"));
                        var rgb1 = CGSGColor.fromString(srgb1);
                        var rgb2 = CGSGColor.fromString(srgb2);
                        this.bkgcolors[0] = CGSGColor.rgb2hex(rgb1.r, rgb1.g, rgb1.b);
                        this.bkgcolors[1] = CGSGColor.rgb2hex(rgb2.r, rgb2.g, rgb2.b);
                    }

                }
                if (cgsgExist(lw)) {
                    this.lineWidth = CGSG.cssManager.getNumber(lw);
                }
                if (cgsgExist(ss)) {
                    this.lineColor = ss;
                }

                //avoid to override previous value if no one was defined
                if (cgsgExist(a)) {
                    this.globalAlpha = a;
                }

                if (cgsgExist(this._clsBBox)) {
                    var sc = CGSG.cssManager.getAttr(this._clsBBox, "background-color");
                    var sw = CGSG.cssManager.getNumber(CGSG.cssManager.getAttr(this._clsBBox, "border-width"));
                    var slc = CGSG.cssManager.getAttr(this._clsBBox, "outline-color");
                    var slw = CGSG.cssManager.getNumber(CGSG.cssManager.getAttr(this._clsBBox, "outline-width"));

                    if (cgsgExist(sc)) {
                        this.handleColor = sc;
                    }
                    if (cgsgExist(sw)) {
                        this.handleSize = sw;
                    }
                    if (cgsgExist(slc)) {
                        this.selectionLineColor = slc;
                    }
                    if (cgsgExist(slw)) {
                        this.selectionLineWidth = slw;
                    }
                }
            },

            /**
             * Set CSS class for this node (not for bounding box, use 'setClassBBox' instead).
             * CSS class must define attributes used by this node.
             * @method setClass
             * @param {String} cls
             */
            setClass: function (cls) {
                this._cls = [];
                this._cls.push(cls);
                this.invalidateTheme();

                //todo for v2.1: load only attribute from this class instead of reloading everything
            },

            /**
             * Add CSS class for this node (not for bounding box, use 'setClassBBox' instead).
             * CSS class must define attributes used by this node.
             * @method addClass
             * @param {String} cls
             */
            addClass: function (cls) {
                this._cls.push(cls);
                this.invalidateTheme();
            },

            /**
             * remove CSS class for this node (not for bounding box, use 'setClassBBox' instead).
             * @method removeClass
             * @param {String} cls
             */
            removeClass: function (cls) {
                this._cls = this._cls.without(cls);
                this.invalidateTheme();
            },

            /**
             * Set CSS class for the bounding box of this node (not for node itself, use 'setClass' instead).
             * CSS class must define attributes used by BBox.
             * @method setClassBBox
             * @param {String} cls
             */
            setClassBBox: function (cls) {
                this._clsBBox = cls;
                this.invalidateTheme();
            },

            /**
             * @method _applyShadow
             * @param c {CanvasRenderingContext2D}
             * @private
             */
            _applyShadow: function (c) {
                if (this.shadowOffsetX !== 0 || this.shadowOffsetY !== 0) {
                    c.shadowOffsetX = this.shadowOffsetX;
                    c.shadowOffsetY = this.shadowOffsetY;
                    c.shadowBlur = this.shadowBlur;
                    c.shadowColor = this.shadowColor;
                }
            },

            /**
             * @method _preCompute
             * @private
             */
            _preCompute: function () {
                if (!cgsgExist(this._cacheCanvas)) {
                    this._cacheCanvas = document.createElement('canvas');
                    this._cacheCtx = this._cacheCanvas.getContext('2d');
                }
                //this._cacheCanvas.width = this.getWidth() + this.shadowOffsetX; //CGSG.canvas.width;
                //this._cacheCanvas.height = this.getHeight() + this.shadowOffsetY; //CGSG.canvas.height;
                cgsgClearContext(this._cacheCtx);

                this._applyShadow(this._cacheCtx);
                this.render(this._cacheCtx);
            },

            /**
             * internal method of the framework that encapsulate all the work aroud the rendering method
             * @method doRender
             * @param c {CanvasRenderingContext2D} context
             * @param t {Boolean} isThemeInvalidated
             */
            doRender: function (c, t) {
                if (t) {
                    this.invalidateTheme();
                }

                var ctx = c;

                var startEvt = new CGSGEvent(this, {context: c, node: this});

                if (cgsgExist(this.onBeforeRender)) {
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_BEFORE_RENDER, startEvt);
                    ctx = startEvt.data.context;
                    //this.onBeforeRender({context: context});
                }

                //save current state
                this.beforeRender(ctx);

                if (this.globalAlpha > 0) {
                    ctx.globalAlpha = this.globalAlpha;

                    //todo, if this node is constraint to another one, so check if this bbox is inside constraint node
                    /*if (cgsgExist(this.nodeConstraint)) {
                     //compute delta on left, right, top, bottom
                     var dL = this.getAbsLeft() - this.nodeConstraint.getAbsLeft(); //must be >= 0
                     if (dL < 0)
                     this.translateWith(-dL, 0, true);
                     var dT = this.getAbsTop() - this.nodeConstraint.getAbsTop(); //must be >= 0
                     if (dT < 0)
                     this.translateWith(0, -dT, true);
                     var dR = this.nodeConstraint.getAbsRight() - this.getAbsRight(); //must be >= 0
                     if (dR < 0)
                     this.resizeWith(-dR, 0);
                     var dB = this.nodeConstraint.getAbsBottom() - this.getAbsBottom(); //must be >= 0
                     if (dB < 0)
                     this.resizeWith(0, -dB);
                     }*/

                    if (this._isCached) {
                        //render the pre-rendered canvas
                        ctx.drawImage(this._cacheCanvas, 0, 0);
                    }
                    else {
                        if (!cgsgExist(this.bkgcolors[1])) {
                            ctx.fillStyle = this.bkgcolors[0];
                        }
                        else {
                            var gradient = ctx.createLinearGradient(0, 0, 0, this.dimension.height);
                            for (var i = 0, len = this.bkgcolors.length; i < len; i++) {
                                gradient.addColorStop(i, this.bkgcolors[i]);
                            }
                            ctx.fillStyle = gradient;
                        }

                        if (this.lineWidth > 0) {
                            ctx.strokeStyle = this.lineColor;
                            ctx.lineWidth = this.lineWidth;
                        }

                        this._applyShadow(ctx);
                        this.render(ctx);
                    }
                }

                if (!CGSG.isBoundingBoxOnTop && this.isSelected) {
                    this.renderBoundingBox(ctx);
                }

                var endEvt = new CGSGEvent(this, {context: ctx, node: this});

                //restore state
                this.afterRender(endEvt.data.context, t);

                if (cgsgExist(this.onAfterRender)) {
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_AFTER_RENDER, endEvt);
                    ctx = endEvt.data.context;
                    //this.onAfterRender({context: c});
                }

            },

            /**
             * Empty rendering function. Must be overrided by the inherited classes
             * @method render
             * @param {CanvasRenderingContext2D} context the context into render the node
             * */
            render: function (context) {
            },

            /**
             * internal method of the framework that encapsulate all the work around the ghost rendering method
             * @method doRenderGhost
             * @param c {CanvasRenderingContext2D} ghost Context
             */
            doRenderGhost: function (c) {
//save current state
                this.beforeRenderGhost(c);

                if (this.globalAlpha > 0) {
                    if (this._isCached) {
                        //render the pre-rendered canvas
                        c.drawImage(this._cacheCanvas, 0, 0);
                    }
                    else {
                        c.fillStyle = "#FF0000"; //this.bkgcolors[0];

                        if (this.lineWidth > 0) {
                            c.strokeStyle = "#FF0000"; //this.lineColor;
                            c.lineWidth = this.lineWidth;
                        }

                        this.renderGhost(c);
                    }
                }

                //restore state
                this.afterRenderGhost(c);
            },

            /**
             * Empty ghost rendering function.
             * Render here your custom nodes with a single color (CGSG.ghostColor).
             * This will be used by the SceneGraph to know if the mouse cursor is over this nodes.
             *
             * @method renderGhost
             * @param ghostCtx {CanvasRenderingContext2D} The context for the ghost rendering
             */
            renderGhost: function (ghostCtx) {
                this.render(ghostCtx);
            },

            /**
             * Render the selection box and handle boxes around the bounding box of this node when selected
             * @protected
             * @method renderBoundingBox
             * @param c {CanvasRenderingContext2D} context the context into render the node
             * */
            renderBoundingBox: function (c) {
                //this.computeAbsoluteMatrix(true);

                var w = this.getWidth(), h = this.getHeight();

                if (cgsgExist(this.selectionLineWidth) && this.selectionLineWidth > 0) {
                    c.strokeStyle = this.selectionLineColor;

                    c.lineWidth = this.selectionLineWidth / this._absSca.y;
                    c.beginPath();
                    //top line
                    c.moveTo(0, 0);
                    c.lineTo(w, 0);
                    //bottom line
                    c.moveTo(0, h);
                    c.lineTo(w, h);
                    c.stroke();
                    c.closePath();

                    c.lineWidth = this.selectionLineWidth / this._absSca.x;
                    c.beginPath();
                    //left line
                    c.moveTo(0, 0);
                    c.lineTo(0, h);
                    //right line
                    c.moveTo(w, 0);
                    c.lineTo(w, h);
                    c.stroke();
                    c.closePath();
                }

                //draw the resize handles
                if (this.isResizable) {
                    // draw the handle boxes
                    var hx = this.handleSize / (2 * this._absSca.x);
                    var hy = this.handleSize / (2 * this._absSca.y);

                    // 0  1  2
                    // 3     4
                    // 5  6  7

                    // top left, middle, right
                    this.handles[0].translateTo(-hx, -hy);
                    this.handles[1].translateTo(w / 2 - hx, -hy);
                    this.handles[2].translateTo(w - hx, -hy);

                    // middle left
                    this.handles[3].translateTo(-hx, h / 2 - hy);

                    // middle right
                    this.handles[4].translateTo(w - hx, h / 2 - hy);

                    // bottom left, middle, right
                    this.handles[6].translateTo(w / 2 - hx, h - hy);
                    this.handles[5].translateTo(-hx, h - hy);
                    this.handles[7].translateTo(w - hx, h - hy);

                    if (this.isProportionalResizeOnly) {
                        this.handles[1].isVisible = false;
                        this.handles[3].isVisible = false;
                        this.handles[4].isVisible = false;
                        this.handles[6].isVisible = false;
                    }

                    var i;
                    for (i = 0; i < 8; i++) {
                        this.handles[i].size = this.handleSize;
                        this.handles[i].fillColor = this.handleColor;
                        this.handles[i].strokeColor = this.selectionLineColor;
                        this.handles[i].lineWidth = this.selectionLineWidth;
                        this.handles[i].render(c);
                    }
                }
            },

            /**
             * Must be called before to start the rendering of the nodes
             * @protected
             * @method beforeRender
             * @param c {CanvasRenderingContext2D} context the context into render the nodes
             * */
            beforeRender: function (c) {
                //first save the current c state
                c.save();

                //move the c to the nodes's relative position
                c.translate(this.position.x, this.position.y);
                c.scale(this.scale.x, this.scale.y);

                // translate c to center of canvas
                if (cgsgExist(this.rotationCenter)) {
                    c.translate(this.dimension.width * this.rotationCenter.x,
                        this.dimension.height * this.rotationCenter.y);
                    c.rotate(this.rotation.angle);
                    c.translate(-this.dimension.width * this.rotationCenter.x,
                        -this.dimension.height * this.rotationCenter.y);
                }
                else {
                    c.rotate(this.rotation.angle);
                }

                if (this.onBeforeRenderEnd) {
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.BEFORE_RENDER_END,
                        new CGSGEvent(this, {c: c, node: this}));
                }
            },

            /**
             * Must be called after a render
             * @protected
             * @method afterRender
             * @param c {CanvasRenderingContext2D} The context into render the nodes
             * @param t {Boolean} isThemeInvalidated true if you need to reload theme for children of this node
             * */
            afterRender: function (c, t) {
                if (cgsgExist(this.onAfterRenderStart)) {
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.AFTER_RENDER_START,
                        new CGSGEvent(this, {context: c, node: this}));
                }

                //render all children
                if (!this.isALeaf()) {
                    //draw children
                    for (var i = 0, len = this.children.length; i < len; ++i) {
                        var childNode = this.children[i];
                        if (childNode.isVisible) {
                            childNode.doRender(c, t);
                        }
                    }
                }

                //restore the context state
                c.restore();
            },

            /**
             * Must be called before begin to render the nodes in GHOST mode
             * @protected
             * @method beforeRenderGhost
             * @param c {CanvasRenderingContext2D} context the context into render the nodes
             */
            beforeRenderGhost: function (c) {
                //first save the current context state
                /*c.save();
                //move the context to the nodes's relative position
                c.translate(this._absPos.x, this._absPos.y);
                c.rotate(this._absRot.angle);
                c.scale(this._absSca.x, this._absSca.y);*/




                //first save the current c state
                c.save();

                //move the c to the nodes's relative position
                c.translate(this._absPos.x, this._absPos.y);
                c.scale(this._absSca.x, this._absSca.y);

                // translate c to center of canvas
                if (cgsgExist(this.rotationCenter)) {
                    //var _w = this.getAbsoluteWidth();
                    //var _h = this.getAbsoluteHeight();
                    c.translate(this.dimension.width * this.rotationCenter.x,
                        this.dimension.height * this.rotationCenter.y);
                    c.rotate(this._absRot.angle);
                    c.translate(-this.dimension.width * this.rotationCenter.x,
                        -this.dimension.height * this.rotationCenter.y);
                }
                else {
                    c.rotate(this._absRot.angle);
                }

            },

            /**
             * Must be called before begin to render
             * @protected
             * @method afterRenderGhost
             * @param c {CanvasRenderingContext2D} context the context into render the nodes
             * */
            afterRenderGhost: function (c) {
                //restore the context state
                c.restore();
            },

            /**
             * Mark this nodes as selected
             * @method setSelected
             * @param s {Boolean} is Selected
             * */
            setSelected: function (s) {
                this.isSelected = s;
                this._isDrag = true;

                if (s && this.onSelect !== null) {
                    //this.onSelect({node: this});
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SELECT, new CGSGEvent(this, {node: this}));
                }
                else if (this.onDeselect !== null) {
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_DESELECT, new CGSGEvent(this, {node: this}));
                    //this.onDeselect({node: this});
                }
            },

            /**
             * Returns a region which represents the total surface covered by this node and its children too.
             * @protected
             * @method getCompleteRegion
             * @return {CGSGRegion}
             */
            getCompleteRegion: function () {
                return new CGSGRegion(this.getMinAbsoluteLeft(), this.getMinAbsoluteTop(), this.getMaxAbsoluteRight(),
                    this.getMaxAbsoluteBottom());
            },

            /**
             * Returns a position which represents the lowest position covered between this node and its children too.
             * @protected
             * @method getCompletePosition
             * @return {CGSGPosition}
             */
            getCompletePosition: function () {
                return new CGSGPosition(this.getMinAbsoluteLeft(), this.getMinAbsoluteTop());
            },

            /**
             * Returns a position which represents the highest dimension covered between this node and its children too.
             * @protected
             * @method getCompleteDimension
             * @return {CGSGDimension}
             */
            getCompleteDimension: function () {
                return new CGSGDimension(this.getMaxAbsoluteRight(), this.getMaxAbsoluteBottom());
            },

            /**
             * return this if this nodes is under the mice cursor
             * Can be overrided by inherited klass to optimize this perform.
             * This default function used the ghost rendering method
             * @protected
             * @method detectSelection
             * @param pos {CGSGPosition} mousePosition A CGSGPosition object
             * @param c {CanvasRenderingContext2D} ghost Context
             * @param s {CGSGScale} absoluteScale
             */
            detectSelection: function (pos, c, s) {
                if (this.pickNodeMethod === CGSGPickNodeMethod.REGION) {
                    if (pos.x >= this._absPos.x - this.detectSelectionThreshold &&
                        pos.x < this._absPos.x + this.detectSelectionThreshold + this.getWidth() * s.x &&
                        pos.y >= this._absPos.y - this.detectSelectionThreshold &&
                        pos.y < this._absPos.y + this.detectSelectionThreshold + this.getHeight() * s.y) {
                        return this;
                    }
                }
                else /*if (this.pickNodeMethod == CGSGPickNodeMethod.GHOST)*/ {

                    //todo: is this node is in cache, so check if there is a painted pixel at x,y from getImageData()


                    // draw shape onto ghost context
                    this.doRenderGhost(c);

                    // get image data at the mouse x,y pixel
                    var id = c.getImageData(pos.x, pos.y, 1, 1);


                    cgsgClearContext(c);

                    // if the mouse pixel exists, select this nodes
                    if (id.data[0] !== 0 || id.data[1] !== 0 || id.data[2] !== 0) {
                        return this;
                    }
                }

                return null;
            },

            /**
             * return this if this nodes is under the region
             * Can be overrided by inherited klass to optimize this perform.
             * This default function used the ghost rendering method
             * @protected
             * @method detectSelectionInRegion
             * @param rg {CGSGRegion} region The region to check
             * @param c {CanvasRenderingContext2D} ghostContext
             */
            detectSelectionInRegion: function (rg, c) {

                //if (this.pickNodeMethod == CGSGPickNodeMethod.REGION) {

                var us = this.getAbsoluteRegion();
                //select this node only if it is totally inside the region
                if (cgsgRegionIsInRegion(us, rg, 0)) {
                    return this;
                }

                /*}
                 else { //if (this.pickNodeMethod == CGSGPickNodeMethod.GHOST) {
                 // draw shape onto ghost context
                 this.doRenderGhost(c);

                 // get image data at the mouse x,y pixel
                 if (!rg.isEmpty()) {
                 var id = c.getImageData(rg.position.x, rg.position.y, rg.dimension.width, rg.dimension.height);

                 cgsgClearContext(c);

                 var len = id.data.length;
                 var count = 0;
                 // if the a pixel exists in the region then, select this node
                 for (var i = 0 ; i < len ; i += 4) {
                 if (id.data[i] != 0 || id.data[i + 1] != 0 || id.data[i + 2] != 0) {
                 count += 4;
                 //return this;
                 }
                 }
                 if (count >= len)
                 return this;
                 }
                 }*/

                return null;
            },

            /**
             * Check if this nodes is under the cursor position.
             * @public
             * @method pickNode
             * @param pos {CGSGPosition} mousePosition position of the mouse on the canvas
             * @param absSca {CGSGScale} absoluteScale a CGSGScale absolute relativeScale of all parents
             * @param c {CanvasRenderingContext2D} ghostContext a copy of the canvas context
             * @param {Boolean} recursively if false, don't traverse the children of this nodes
             * @param {Function} condition Condition to be picked
             * ie: "color=='yellow'" or "classType=='CGSGNodeImage' && this.globalAlpha>0.5"
             */
            pickNode: function (pos, absSca, c, recursively, condition) {
                var selectedNode = null;
                var childAbsoluteScale = null;
                if (cgsgExist(absSca)) {
                    childAbsoluteScale = absSca.multiply(this.scale);
                }
                else {
                    childAbsoluteScale = this.getAbsScale(false);
                }

                if (this.isTraversable && (this.isClickable || this.isResizable || this.isDraggable)) {
                    if (!cgsgExist(condition) || condition(this) === true) {
                        this.computeAbsoluteMatrix(false);

                        // First of all, try to to see if resize handler has been picked
                        if (this.isSelected && this.isResizable) {
                            for (var h = 0; h < 8; h++) {
                                var selectionHandle = this.handles[h];

                                if (selectionHandle.checkIfSelected(pos, CGSG.resizeHandleThreshold)) {
                                    return this;
                                }
                            }
                        }

                        selectedNode =
                            this.detectSelection(pos, c, childAbsoluteScale);
                    }
                }

                //traverse the children if asked
                if (this.isTraversable && recursively && !this.isALeaf()) {
                    for (var i = this.children.length - 1; i >= 0; --i) {
                        var childNode = this.children[i];
                        var selectedChild = childNode.pickNode(pos,
                            childAbsoluteScale, c,
                            recursively, condition);
                        if (cgsgExist(selectedChild)) {
                            selectedNode = selectedChild;
                            break;
                        }
                    }

                    childAbsoluteScale = null;
                }

                return selectedNode;
            },

            /**
             * Return all nodes (Array) in the given region
             * @public
             * @method pickNodes
             * @param {CGSGRegion} region of the canvas to check
             * @param {CGSGScale} absoluteScale a CGSGScale absolute relativeScale of all parents
             * @param {CanvasRenderingContext2D} ghostContext a copy of the canvas context
             * @param {Boolean} recursively if false, don't traverse the children of this nodes
             * @param {Function} condition Condition to be picked
             * ie: "color=='yellow'" or "classType=='CGSGNodeImage' && this.globalAlpha>0.5"
             */
            pickNodes: function (region, absoluteScale, ghostContext, recursively, condition) {
                var selectedNodes = [];

                //if (region.dimension.width == 0 && region.dimension.height == 0)
                if (region.isEmpty()) {
                    return selectedNodes;
                }

                var childAbsoluteScale = null;
                if (cgsgExist(absoluteScale)) {
                    childAbsoluteScale = absoluteScale.multiply(this.scale);
                }
                else {
                    childAbsoluteScale = this.getAbsScale(false);
                }

                if (this.isTraversable && (/*this.isClickable ||*/ this.isResizable || this.isDraggable)) {
                    if (!cgsgExist(condition) || condition(this) === true) {
                        this.computeAbsoluteMatrix(false);
                        var selected = this.detectSelectionInRegion(region, ghostContext);
                        if (cgsgExist(selected)) {
                            selectedNodes.push(selected);
                        }
                    }
                }

                //traverse the children if asked
                if (this.isTraversable && recursively && !this.isALeaf()) {
                    for (var i = this.children.length - 1; i >= 0; --i) {
                        var childNode = this.children[i];
                        var selectedChildren = childNode.pickNodes(region,
                            childAbsoluteScale, ghostContext,
                            recursively, condition);
                        if (selectedChildren !== null && selectedChildren !== undefined) {
                            selectedNodes = selectedNodes.concat(selectedChildren);
                        }
                    }

                    childAbsoluteScale = null;
                }

                return selectedNodes;
            },

            /**
             * Return true if this nodes has no child
             * @method isALeaf
             * */
            isALeaf: function () {
                return this.children.length <= 0;
            },

            //// TRANSFORMATION MANIPULATION //////

            _applyContraintsToFollowers: function () {
                cgsgIterate(this._followers, (function (i, node) {
                    //compute delta on left, top, right, bottom
                    var dL = node.getAbsLeft() - this.getAbsLeft(); //must be >= 0
                    if (dL < 0) {
                        node.translateWith(-dL, 0, true);
                    }
                    var dT = node.getAbsTop() - this.getAbsTop(); //must be >= 0
                    if (dT < 0) {
                        node.translateWith(0, -dT, true);
                    }

                    var dR = this.getAbsRight() - node.getAbsRight(); //must be >= 0
                    if (dR < 0) {
                        //first translate, then resize
                        dL = node.getAbsWidth() - this.getAbsWidth();
                        if (dL > 0) {
                            node.resizeWith(-dL, 0);
                        }
                        else {
                            node.translateWith(dR, 0, true);
                        }

                    }
                    var dB = this.getAbsBottom() - node.getAbsBottom(); //must be >= 0
                    if (dB < 0) {
                        //first translate, then resize
                        dR = node.getAbsHeight() - this.getAbsHeight();
                        if (dR > 0) {
                            node.resizeTo(this.getAbsWidth(), node.getHeight());
                        }
                        else {
                            node.translateWith(0, dB, true);
                        }
                    }
                }).bind(this));
            },

            /**
             * Replace current relative position by this new one
             * @method translateTo
             * @param {Number} x
             * @param {Number} y
             * @param {Boolean} computeAbsoluteValue (default: true)
             */
            translateTo: function (x, y, computeAbsoluteValue) {
                this.position.translateTo(x, y);
                if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
                    this._absPos = this.getAbsPosition(true);
                }
                this._applyContraintsToFollowers();

                if (cgsgExist(this.onTranslate)) {
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_TRANSLATE, new CGSGEvent(this, {node: this}));
                }
            },

            /**
             * Add new coordinate to the current relative one
             * @method translateWith
             * @param {Number} x
             * @param {Number} y
             * @param {Boolean} computeAbsoluteValue (default: true)
             * */
            translateWith: function (x, y, computeAbsoluteValue) {
                this.position.translateWith(x, y);
                if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
                    this._absPos = this.getAbsPosition(true);
                }

                this._applyContraintsToFollowers();
                if (cgsgExist(this.onTranslate)) {
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_TRANSLATE, new CGSGEvent(this, {node: this}));
                }
            },

            /**
             * Add new coordinate to the current relative one
             * @method translateBy
             * @param {Number} x
             * @param {Number} y
             * @param {Boolean} computeAbsoluteValue (default: true)
             * */
            translateBy: function (x, y, computeAbsoluteValue) {
                this.position.translateBy(x, y);
                if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
                    this._absPos = this.getAbsPosition(true);
                }

                this._applyContraintsToFollowers();
                if (cgsgExist(this.onTranslate)) {
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_TRANSLATE, new CGSGEvent(this, {node: this}));
                }
            },

            /**
             * Replace current dimension by these new ones
             * @method resizeTo
             * @param {Number} w
             * @param {Number} h
             * */
            resizeTo: function (w, h) {
                this.dimension.resizeTo(w, h);
                this._applyContraintsToFollowers();
                this._endResize();
            },

            /**
             * Multiply current dimension by these new ones
             * @method resizeTBy
             * @param {Number} wf
             * @param {Number} hf
             * */
            resizeBy: function (wf, hf) {
                this.dimension.resizeBy(wf, hf);
                this._applyContraintsToFollowers();
                this._endResize();
            },

            /**
             * Increase/decrease current dimension with adding values
             * @method resizeWith
             * @param {Number} w
             * @param {Number} h
             * */
            resizeWith: function (w, h) {
                this.dimension.resizeWith(w, h);
                this._applyContraintsToFollowers();
                this._endResize();
            },

            _endResize: function () {
                this._isDimensionChanged = true;
                this.invalidate();
                if (cgsgExist(this.onResize)) {
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_RESIZE, new CGSGEvent(this, {node: this}));
                }
            },

            /**
             * Replace current relative relativeScale by this new one
             * @method scaleTo
             * @param {Number} sx
             * @param {Number} sy
             * @param {Boolean} computeAbsoluteValue (default: true)
             * */
            scaleTo: function (sx, sy, computeAbsoluteValue) {
                this.scale.x = sx;
                this.scale.y = sy;
                if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
                    this._absSca = this.getAbsScale(true);
                }

                this._applyContraintsToFollowers();

                if (cgsgExist(this.onScale)) {
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SCALE, new CGSGEvent(this, {node: this}));
                }
            },

            /**
             * Multiply this relativeScale factor by the current relative relativeScale
             * @method scaleBy
             * @param {Number} sfx
             * @param {Number} sfy
             * @param {Boolean} computeAbsoluteValue (default: true)
             * */
            scaleBy: function (sfx, sfy, computeAbsoluteValue) {
                this.scale.x *= sfx;
                this.scale.y *= sfy;
                if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
                    this._absSca = this.getAbsScale(true);
                }
                this._applyContraintsToFollowers();

                if (cgsgExist(this.onScale)) {
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SCALE, new CGSGEvent(this, {node: this}));
                }
            },

            /**
             * Add to the current relative Scale
             * @method scaleWith
             * @param {Number} x
             * @param {Number} y
             * @param {Boolean} computeAbsoluteValue (default: true)
             * */
            scaleWith: function (x, y, computeAbsoluteValue) {
                this.scale.x += x;
                this.scale.y += y;
                if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
                    this._absSca = this.getAbsScale(true);
                }
                this._applyContraintsToFollowers();

                if (cgsgExist(this.onScale)) {
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SCALE, new CGSGEvent(this, {node: this}));
                }
            },

            /**
             * Replace current relative relativeRotation by this new oneScale
             * @method rotateTo
             * @param {Number} a
             * @param {Boolean} computeAbsoluteValue (default: true)
             *
             * */
            rotateTo: function (a, computeAbsoluteValue) {
                this.rotation.rotateTo(a);
                if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
                    this._absRot = this.getAbsRotation(true);
                }
                this._applyContraintsToFollowers();

                if (cgsgExist(this.onRotate)) {
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_ROTATE, new CGSGEvent(this, {node: this}));
                }
            },

            /**
             * Multiply this relativeScale factor by the current relative relativeScale
             * @method rotateBy
             * @param {Number} af
             * @param {Boolean} computeAbsoluteValue (default: true)
             * */
            rotateBy: function (af, computeAbsoluteValue) {
                this.rotation.rotateBy(af);
                if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
                    this._absRot = this.getAbsRotation(true);
                }
                this._applyContraintsToFollowers();

                if (cgsgExist(this.onRotate)) {
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_ROTATE, new CGSGEvent(this, {node: this}));
                }
            },

            /**
             * Add this angle to the current relative relativeRotation
             * @method rotateWith
             * @param {Number} a
             * @param {Boolean} computeAbsoluteValue (default: true)
             * */
            rotateWith: function (a, computeAbsoluteValue) {
                this.rotation.rotateWith(a);
                if (this.needToKeepAbsoluteMatrix && computeAbsoluteValue !== false) {
                    this._absRot = this.getAbsRotation(true);
                }

                this._applyContraintsToFollowers();
                if (cgsgExist(this.onRotate)) {
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_ROTATE, new CGSGEvent(this, {node: this}));
                }
            },

            //// CHILDREN MANIPULATION //////

            /**
             * Add a new nodes into this one, at the end of the list
             * @method addChild
             * @param {CGSGNode} newNode the nodes to add as a child
             * */
            addChild: function (newNode) {
                newNode._parentNode = this;
                this.children[this.children.length] = newNode;
            },

            /**
             * Add a new nodes at a particular index in the list of children.
             * If the index is too large, the nodes will be inserted at the end of the list
             * @method addChildAt
             * @param {CGSGNode} newNode the nodes to insert as a child
             * @param index {Number} index the position of the new child in the list
             * */
            addChildAt: function (newNode, i) {
                if (i > this.children.length) {
                    i = this.children.length;
                }

                for (var j = this.children.length; j >= i; --j) {
                    this.children[j] = this.children[j - 1];
                }

                newNode._parentNode = this;
                this.children[i] = newNode;

                if (cgsgExist(this.onChildAdd)) {
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_CHILD_ADD, new CGSGEvent(this, {node: this}));
                }
            },

            /**
             * Remove the child passed in parameter and delete it
             * @method removeChild
             * @param {CGSGNode} node the nodes to remove
             * @param {Boolean} searchRecursively if true, search the nodes on all the tree from this nodes
             * @return {Boolean} true if the child was correctly removed or false if the nodes was not found.
             * */
            removeChild: function (node, searchRecursively) {
                var index = this.children.indexOf(node);

                if (index >= 0) {
                    this.children.without(node);

                    if (cgsgExist(this.onChildRemove)) {
                        CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_CHILD_REMOVED,
                            new CGSGEvent(this, {node: this}));
                    }
                    node.free();

                    return true;
                }

                if (searchRecursively) {
                    for (var i = 0, len = this.children.length; i < len; ++i) {
                        var childNode = this.children[i];
                        if (childNode.removeChild(node, true)) {
                            return true;
                        }
                    }
                }

                return false;
            },

            /**
             * remove all children, delete them and reset the current parameters
             * @method removeAll
             * */
            removeAll: function () {
                /*for (var i = this.children.length; i >=0; --i) {
                 var childNode = this.children[i];
                 childNode.removeAll();
                 this.removeChild(childNode, true);
                 }*/

                this.free();
            },

            /**
             * Detach the nodes in index 'index' without delete it. So it's not a child anymore
             * @method detachChildAt
             * @param i {Number} index
             */
            detachChildAt: function (i) {
                if (i >= 0 && i < this.children.length) {
                    this.detachChild(this.children[i]);
                }
            },

            /**
             * Detach the nodes without delete it. So it's not a child anymore
             * @method detachChild
             * @param {CGSGNode} childNode
             */
            detachChild: function (childNode) {
                if (cgsgExist(childNode)) {
                    childNode._parentNode = null;
                    /*this.children = */
                    this.children.without(childNode);
                }
            },

            /**
             * Execute/Eval the script passed in parameter in "this" scope.
             * Used to set new value to an attribute of a node
             * @method evalSet
             * @param a {String} attribute The attribute to be changed
             * @param v {*} value The new value for the attribute
             *
             * @example node.evalSet("position.y", 12);
             */
            evalSet: function (a, v) {
                var rgb;
                //check for common properties to optimize performances
                if (a === "position.x") {
                    this.translateTo(v, this.position.y, this.needToKeepAbsoluteMatrix);
                }
                else if (a === "position.y") {
                    this.translateTo(this.position.x, v, this.needToKeepAbsoluteMatrix);
                }
                else if (a === "dimension.width") {
                    this.resizeTo(v, this.dimension.height);
                }
                else if (a === "dimension.height") {
                    this.resizeTo(this.dimension.width, v);
                }
                else if (a === "scale.x") {
                    this.scaleTo(v, this.scale.y, this.needToKeepAbsoluteMatrix);
                }
                else if (a === "scale.y") {
                    this.scaleTo(this.scale.x, v, this.needToKeepAbsoluteMatrix);
                }
                else if (a === "rotation" || a === "rotation.angle") {
                    this.rotateTo(v, this.needToKeepAbsoluteMatrix);
                }
                else if (a === "globalAlpha" || a === "opacity") {
                    this.globalAlpha = v;
                    this.invalidate();
                }
                else if (a === "isVisible") {
                    this.isVisible = v;
                }
                else if (a === "rotationCenter.x") {
                    this.rotationCenter.x = v;
                }
                else if (a === "rotationCenter.y") {
                    this.rotationCenter.y = v;
                }
                else if (a === "bkgcolors[0].r") {
                    rgb = CGSGColor.hex2rgb(this.bkgcolors[0]);
                    this.bkgcolors[0] = CGSGColor.rgb2hex(v, rgb.g, rgb.b);
                    this.invalidate();
                }
                else if (a === "bkgcolors[0].g") {
                    rgb = CGSGColor.hex2rgb(this.bkgcolors[0]);
                    this.bkgcolors[0] = CGSGColor.rgb2hex(rgb.r, v, rgb.b);
                    this.invalidate();
                }
                else if (a === "bkgcolors[0].b") {
                    rgb = CGSGColor.hex2rgb(this.bkgcolors[0]);
                    this.bkgcolors[0] = CGSGColor.rgb2hex(rgb.r, rgb.g, v);
                    this.invalidate();
                }
                else if (a === "fillStyle.r") {
                    this.fillStyle.r = v;
                    this.invalidate();
                }
                else if (a === "fillStyle.g") {
                    this.fillStyle.g = v;
                    this.invalidate();
                }
                else if (a === "fillStyle.b") {
                    this.fillStyle.b = v;
                    this.invalidate();
                }

                //generic property
                else {
                    eval("this." + a + "=" + v);
                    this.invalidate();
                }

                /*if (this.needToKeepAbsoluteMatrix) {
                 if (a.indexOf("position") === 0) {
                 this._absPos = this.getAbsPosition(true);
                 }
                 else if (a.indexOf("rotation") === 0) {
                 this._absRot = this.getAbsRotation(true);
                 }
                 else if (a.indexOf("scale") === 0) {
                 this._absSca = this.getAbsScale(true);
                 }
                 }*/
            },

            /**
             * Set the region inside which one this node ca be placed an can move
             * @public
             * @method setRegionConstraint
             * @param {CGSGRegion} region a CGSGRegion relatively to this parent region. Can be null.
             */
            setRegionConstraint: function (region) {
                this.setNodeRegionConstraint(null);
                this.regionConstraint = region;
            },

            /**
             * Set the region inside which one this node ca be placed an can move
             * @public
             * @method setNodeRegionConstraint
             * @param node {CGSGNode} a CGSGNode relatively to this parent region. Can be null.
             */
            setNodeRegionConstraint: function (node) {
                this.regionConstraint = null;
                if (cgsgExist(node)) {
                    if (!node._followers.contains(this)) {
                        node._followers.push(this);
                    }
                }
                else if (cgsgExist(this.nodeConstraint)) {
                    this.nodeConstraint._followers.without(this);
                }

                this.nodeConstraint = node;
            },

            /**
             * @public
             * @method getAbsPosition
             * @param {boolean} recursive flag indicating if computation should be recusive or not
             * @return {CGSGPosition} the absolute positions of this node
             */
            getAbsPosition: function (recursive) {
                var n = this;
                var translation = this.position.copy();
                while (n._parentNode !== null) {
                    translation.multiplyEquals(n._parentNode.scale);
                    n = n._parentNode;
                }

                if (this._parentNode !== null) {
                    translation.addEquals(this._parentNode.getAbsPosition(false));
                }

                if (recursive !== false) {
                    for (var c = 0; c < this.children.length; c++) {
                        if (cgsgExist(this.children[c])) {
                            this.children[c]._absPos = this.children[c].getAbsPosition(recursive);
                        }
                    }
                }

                return translation;
            },

            /**
             * @public
             * @method getAbsScale
             * @param {boolean} recursive flag indicating if computation should be recusive or not
             * @return {CGSGScale} the absolute scale of this node
             */
            getAbsScale: function (recursive) {
                var n = this;
                var s = this.scale.copy();
                while (n._parentNode !== null) {
                    s.multiplyEquals(n._parentNode.scale);
                    n = n._parentNode;
                }

                if (recursive !== false) {
                    for (var c = 0; c < this.children.length; c++) {
                        if (cgsgExist(this.children[c])) {
                            this.children[c]._absSca = this.children[c].getAbsScale(recursive);
                        }
                    }
                }
                return s;
            },

            /**
             * @public
             * @method getAbsRotation
             * @param {boolean} recursive flag indicating if computation should be recusive or not
             * @return {CGSGRotation} the absolute rotation of this node
             */
            getAbsRotation: function (recursive) {
                var n = this;
                var r = this.rotation.copy();
                while (n._parentNode !== null) {
                    r.addEquals(n._parentNode.rotation.angle);
                    n = n._parentNode;
                }

                if (recursive !== false) {
                    for (var c = 0; c < this.children.length; c++) {
                        if (cgsgExist(this.children[c])) {
                            this.children[c]._absRot = this.children[c].getAbsRotation(recursive);
                        }
                    }
                }

                return r;
            },

            /**
             * Compute the absolute position, rotation and scale in the canvas container
             * @public
             * @method computeAbsoluteMatrix
             * @param {Boolean} recursive if !== false, compute recursively
             * */
            computeAbsoluteMatrix: function (recursive) {
                this._absPos = this.getAbsPosition(false);
                this._absSca = this.getAbsScale(false);
                this._absRot = this.getAbsRotation(false);

                if (recursive !== false) {
                    //for (var c = 0; c < this.children.length; c++) {
                    cgsgIterate(this.children, (function (i, child) {
                        if (cgsgExist(child)) {
                            child.computeAbsoluteMatrix(recursive);
                        }
                    }).bind(this));
                    //}
                }
            },

            /**
             * Returns the x position with the lowest value between this node and its children.
             *
             * @method getMinAbsoluteLeft
             * @return {Number}
             */
            getMinAbsoluteLeft: function () {
                var retval = this._absPos.x;

                if (this.children.length > 0) {
                    cgsgIterate(this.children.length, (function (i, child) {
                        if (retval < child._absPos.x) {
                            retval = child._absPos.x;
                        }
                    }).bind(this));
                }

                return retval;
            },

            /**
             * Returns the right border's position with the highest value between this node and its children.
             *
             * @method getMostAbsoluteRight
             * @return {Number}
             */
            getMaxAbsoluteRight: function () {
                var retval = this._absPos.x + (this.getWidth() * this._absSca.x);

                if (this.children.length > 0) {
                    cgsgIterate(this.children.length, (function (i, child) {
                        var absRight = this._absPos.x + (this.getWidth() * this._absSca.x);
                        if (retval < absRight) {
                            retval = absRight;
                        }
                    }).bind(this));
                }

                return retval;
            },

            /**
             * Returns the y position with the lowest value between this node and its children.
             *
             * @method getMinAbsoluteTop
             * @return {Number}
             */
            getMinAbsoluteTop: function () {
                var retval = this._absPos.y;

                if (this.children.length > 0) {
                    cgsgIterate(this.children.length, (function (i, child) {
                        if (retval < child._absPos.y) {
                            retval = child._absPos.y;
                        }
                    }).bind(this));
                }

                return retval;
            },

            /**
             * Returns the bottom border's position with the highest value between this node and its children.
             *
             * @method getAbsBottom
             * @return {Number}
             */
            getMaxAbsoluteBottom: function () {
                var retval = this._absPos.y + (this.getHeight() * this._absSca.y);

                if (this.children.length > 0) {
                    cgsgIterate(this.children.length, (function (i, child) {
                        var absRight = this._absPos.y + (this.getHeight() * this._absSca.y);
                        if (retval < absRight) {
                            retval = absRight;
                        }
                    }).bind(this));
                }

                return retval;
            },
            /**
             *
             * @method getAbsLeft
             * @return {Number}
             */
            getAbsLeft: function () {
                return this._absPos.x;
            },

            /**
             * @method getAbsRight
             * @return {Number}
             */
            getAbsRight: function () {
                return this._absPos.x + this.getAbsWidth();
            },

            /**
             * @method getAbsTop
             * @return {Number}
             */
            getAbsTop: function () {
                return this._absPos.y;
            },

            /**
             * @method getAbsBottom
             * @return {Number}
             */
            getAbsBottom: function () {
                return this._absPos.y + this.getAbsHeight();
            },

            /**
             * @method getAbsWidth
             * @return {Number}
             */
            getAbsWidth: function () {
                return this.getWidth() * this._absSca.x;
            },

            /**
             * @method getAbsHeight
             * @return {Number}
             */
            getAbsHeight: function () {
                return this.getHeight() * this._absSca.y;
            },

            /**
             * @method getWidth
             * @return {Number}
             */
            getWidth: function () {
                return this.dimension.width;
            },

            /**
             * @method getHeight
             * @return {Number}
             */
            getHeight: function () {
                return this.dimension.height;
            },

            /**
             * Return center of the node, based on its position and dimension
             * @method getCenter
             * @return {CGSGPosition}
             */
            getCenter: function () {
                var x = this.position.x + (this.getWidth() / 2);
                var y = this.position.y + (this.getHeight() / 2);

                return new CGSGPosition(x, y);
            },

            /**
             * Test if this node is colliding the node in parameter. Don't forget to add nodes to CGSGCollisionManager.
             *
             * @public
             * @method isColliding
             * @return {Boolean} true if the 2 nodes are colliding. They are colliding if the distance between them is minus than the threshold parameter
             * @param {CGSGNode} node a CGSGNode
             * @param {Number} threshold space between the 2 nodes before considering they are colliding
             */
            isColliding: function (node, threshold) {
                return CGSG.collisionManager.isColliding(this, node, threshold);
            },

            /**
             * @public
             * @method getListOfCollidingBrothers
             * @return {Array} a Array of nodes this one is colliding with (can be empty)
             * @param {Number} threshold space between the 2 nodes before considering they are colliding
             */
            getListOfCollidingBrothers: function (threshold) {
                var listOfCollidingNodes = [];
                var brother = null;
                //for (var n = 0; n < this._parentNode.children.length; n++) {
                cgsgIterate(this._parentNode.children, (function (i, brother) {
                    if (brother !== this && this.isColliding(brother, threshold)) {
                        listOfCollidingNodes.push(brother);
                    }
                }).bind(this));
                //}

                return listOfCollidingNodes;
            },

            /**
             * @public
             * @method isCollidingABrother
             * @param {Number} threshold space between the 2 nodes before considering they are colliding
             * @return {Boolean} true if this node is colliding one of the other children of its parent node
             */
            isCollidingABrother: function (threshold) {
                var retval = false;

                cgsgIterate(this._parentNode.children, (function (i, brother) {
                    if (brother !== this && this.isColliding(brother, threshold)) {
                        retval = true;

                        return retval; // break the loop
                    }
                    return false;
                }).bind(this));

                return retval;
            },

            /*
             * TODO : to be completed
             * Return the list of lines going joigning nodes' peaks
             * param onlyBrothers a Boolean. Default = true
             * param threshold distance from which the detectection is done
             * return an array of CGSGVector2D (can be empty)
             */
            /*getMagneticLines : function(onlyBrothers, threshold) {
             if (!cgsgExist(onlyBrothers)) {
             onlyBrothers = true;
             }

             //compute vectors
             var topVector = this.getAbsTop();
             var bottomVector = this.getAbsBottom();
             var leftVector = this.getAbsLeft();
             var rightVector = this.getAbsRight();

             //line = a point and a normalized CGSGVector2D (ie : [0, 1] or [1, 0])
             var listOfLines = [];

             var brother = null;
             for (var n = 0; n < this._parentNode.children.length; n++) {
             brother = this._parentNode.children[n];

             //vectors v & v' are colinear if and only if xy’ - yx’ = 0.

             }

             return listOfLines;
             },*/

            /**
             * Must be overrided by inherited classes
             * @method copy
             * @param {CGSGNode} node
             * @return {CGSGNode} a copy of this node
             */
            copy: function (node) {
                if (node === null || node === undefined) {
                    node = new CGSGNode(this.position.x, this.position.y);
                    node.resizeTo(this.dimension.width, this.dimension.height);
                }
                node.classType = this.classType;
                node.name = this.name;
                node.globalAlpha = this.globalAlpha;
                node.bkgcolors = this.bkgcolors;
                node.lineColor = this.lineColor;
                node.lineWidth = this.lineWidth;
                node.isVisible = this.isVisible;
                node.isProportionalResize = this.isProportionalResize;
                node.pickNodeMethod = this.pickNodeMethod;
                node.needToKeepAbsoluteMatrix = this.needToKeepAbsoluteMatrix;

                //list of the children (empty if this nodes is a leaf)
                //this.children = [];

                if (this.regionConstraint !== null) {
                    node.regionConstraint = this.regionConstraint.copy();
                }
                node.nodeConstraint = this.nodeConstraint;

                //can be fulfilled by the developer to put in whatever he needs
                node.userData = this.userData;

                //selection attributes
                //if true, this nodes is clickable and so will be checked by the pickNode function
                node.isClickable = this.isClickable;
                //if true, this nodes can be selected and so can be transformed (dimension)
                node.isResizable = this.isResizable;
                node.isDraggable = this.isDraggable;
                node.isTraversable = this.isTraversable;

                node.selectionLineColor = this.selectionLineColor;
                node.selectionLineWidth = this.selectionLineWidth;
                node.handleSize = this.handleSize;
                node.handleColor = this.handleColor;
                node._id = this._id;
                node.translateTo(this.position.x, this.position.y);
                node.resizeTo(this.dimension.width, this.dimension.height);
                node.scaleTo(this.scale.x, this.scale.y);
                node.rotateTo(this.rotation.angle);

                //node.selectableZone =
                //new CGSGRegion(node.position.x, node.position.y, node.dimension.width, node.dimension.height);

                //all the events for the node
                node.onMouseOver = this.onMouseOver;
                node.onMouseOut = this.onMouseOut;
                node.onClick = this.onClick;
                node.onDblClick = this.onDblClick;
                node.onDrag = this.onDrag;
                node.onDragEnd = this.onDragEnd;
                node.onResize = this.onResize;
                node.onResizeEnd = this.onResizeEnd;
                node.onSelect = this.onSelect;
                node.onDeselect = this.onDeselect;

                node.computeAbsoluteMatrix(true);

                return node;
            },

            /**
             * free memory taken by this object and it's children.
             * The 'userData' property won't be freed
             * @method free
             */
            free: function () {
                for (var c = this.children.length - 1; c >= 0; c--) {
                    this.children[c].free();
                }

                this.children.clear();

                cgsgFree(this);
            }
        }
    )
    ;// Source: src/node/class.node.dom.js
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
 * Wraps inside a CGSGNode a DOM element to display it in the scene. Note that the element will be on top of canvas
 * element so it will be over any node rendered in this element.
 *
 * @class CGSGNodeDomElement
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @param {HTMLElement} el the DOM element do be wrapped
 * @type {CGSGNodeWebview}
 */
var CGSGNodeDomElement = CGSGNode.extend(
    {
        initialize: function (x, y, width, height, el) {
            this._super(x, y);

            this.resizeTo(CGSGMath.fixedPoint(width), CGSGMath.fixedPoint(height));

            /**
             * Size of the area around the element
             * @property threshold
             * @default 20
             * @type {Number}
             */
            this.threshold = 20;

            /**
             * @property classType
             * @type {String}
             */
            this.classType = "CGSGNodeDomElement";

            /**
             * A HTML tag that contains the element
             * @property _htmlElement
             * @type {HTMLElement}
             * @private
             */
            this._htmlElement = el;

            // We work in absolute position
            this._htmlElement.style.position = "absolute";
            this.updateCssRegion();

            // Listen
        },

        /**
         * Updates the styles of the wrapped DOM element to change its position and size inside the scene.
         * @method updateCssRegion
         */
        updateCssRegion: function () {
            if (cgsgExist(this._htmlElement)) {
                this._htmlElement.style.left = (this.getAbsLeft() + this.threshold) + "px";
                this._htmlElement.style.top = (this.getAbsTop() + this.threshold) + "px";
                this._htmlElement.style.width = (this.getAbsWidth() - this.threshold * 2) + "px";
                this._htmlElement.style.height = (this.getAbsHeight() - this.threshold * 2) + "px";
            }
        },

        /**
         * @protected
         * @method render
         * Custom rendering
         * */
        render: function (c) {
            //we draw the rect at (0,0) because we have already translated the context to the correct position
            c.fillRect(0, 0, this.getWidth(), this.getHeight());
            if (this.lineWidth > 0) {
                c.strokeRect(0, 0, this.getWidth(), this.getHeight());
            }

            this.updateCssRegion();
        },

        /**
         * Return the copy of this node
         * @method copy
         * @return {CGSGNodeDomElement}
         */
        copy: function () {
            var node = new CGSGNodeDomElement(this.position.x, this.position.y, this.dimension.width,
                                              this.dimension.height, this._htmlElement);
            //call the super method
            node = this._super(node);

            node.threshold = this.threshold;

            return node;
        }
    }
);
// Source: src/node/class.node.line.js
/**
 * A CGSGNodeLine represent a basic line
 *
 * @class CGSGNodeLine
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Array} points of line  as CGSGPosition
 * @type {CGSGNodeLine}
 * @author Paul Todd
 */
var CGSGNodeLine = CGSGNode.extend(
    {
        initialize: function (pts) {
this._pts = pts.copy();
            this._nbPts = this._pts.length;
            this._minX = 0;
            this._minY = 0;
            this._maxX = 0;
            this._maxY = 0;

            this.updateMinMax();

            this._super(this._minX, this._minY, this._maxX - this._minX, this._maxY - this._minY);

            this.resizeTo(this._maxX - this._minX, this._maxY - this._minY);

            this.pickNodeMethod = CGSGPickNodeMethod.REGION;

            /**
             * @property classType
             * @readonly
             * @type {String}
             */
            this.classType = "CGSGNodeLine";
        },

        /**
         * Custom rendering
         * @method render
         * @protected
         * @param {CanvasRenderingContext2D} c the context into render the node
         * */
        render: function (c) {
            c.beginPath();
            //c.globalAlpha = this.globalAlpha;

            c.moveTo(this._pts[0].x - this._minX, this._pts[0].y - this._minY);

            for (var i = 1; i < this._nbPts; i++) {
                c.lineTo(this._pts[i].x - this._minX, this._pts[i].y - this._minY);
            }

            if (this.lineWidth > 0) {
                c.lineWidth = this.lineWidth;
                c.strokeStyle = this.lineColor;
                c.stroke();
            }
        },

        /**
         * Replace current dimension by these new ones and compute new Points
         * @method resizeTo
         * @param {Number} w
         * @param {Number} h
         * */
        resizeTo: function (w, h) {
            this.dimension.resizeTo(w, h);

            this._computeResizedPoints();
        },

        /**
         * Multiply current dimension by these new ones
         * @method resizeTBy
         * @param wf {Number} width Factor
         * @param hf {Number} height Factor
         * */
        resizeBy: function (wf, hf) {
            this.dimension.resizeBy(wf, hf);

            this._computeResizedPoints();
        },

        /**
         * Increase/decrease current dimension with adding values
         * @method resizeWith
         * @param w {Number} width
         * @param h {Number} height
         * */
        resizeWith: function (w, h) {
            this.dimension.resizeWith(w, h);

            this._computeResizedPoints();
        },

        /**
         * @method _computeResizedPoints
         * @private
         */
        _computeResizedPoints: function () {
            var sx = this.getWidth() / (this._maxX - this._minX);
            var sy = this.getHeight() / (this._maxY - this._minY);
            var c = this.getCenter();

            if (this.getWidth() > 0 && this.getHeight() > 0) {
                for (var i = 0; i < this._nbPts; i++) {
                    this._pts[i].x = (sx * (this._pts[i].x - c.x)) + c.x;
                    this._pts[i].y = (sy * (this._pts[i].y - c.y)) + c.y;
                }
                this.updateMinMax();
            }
        },

        /**
         * Find the center of the Line
         * @public
         * @method getCenter
         */
        getCenter: function () {
            return new CGSGPosition((this._maxX - this._minX) / 2, (this._maxY - this._minY) / 2);
        },

        /**
         * Get the Largest x of the Line
         * @public
         * @method getMaxX
         */
        getMaxX: function () {
            var x = this._pts[0].copy().x, t;

            for (var i = 1; i < this._nbPts; i++) {
                t = this._pts[i].copy().x;
                if (x <= t) {
                    x = t;
                }
            }

            return x;
        },

        /**
         * Get the smallest x of the Line
         * @public
         * @method getMinX
         */
        getMinX: function () {
            var x = this._pts[0].copy().x, t = 0;

            for (var i = 1; i < this._nbPts; i++) {
                t = this._pts[i].copy().x;

                if (x >= t) {
                    x = t;
                }
            }

            return x;
        },

        /**
         * Get the Largets y of the Line
         * @public
         * @method getMaxY
         */
        getMaxY: function () {
            var y = this._pts[0].copy().y, t = 0;

            for (var i = 1; i < this._nbPts; i++) {
                t = this._pts[i].copy().y;

                if (y <= t) {
                    y = t;
                }
            }

            return y;
        },

        /**
         * Get the smallest y of the Line
         * @public
         * @method getMinY
         */
        getMinY: function () {
            var y = this._pts[0].copy().y, t = 0;

            for (var i = 1; i < this._nbPts; i++) {
                t = this._pts[i].copy().y;

                if (y >= t) {
                    y = t;
                }
            }

            return y;
        },

        /**
         * Update the min and max x/y values
         * @method updateMinMax
         */
        updateMinMax: function () {
            this._maxY = this.getMaxY();
            this._minY = this.getMinY();
            this._maxX = this.getMaxX();
            this._minX = this.getMinX();
        },

        /**
         * Set the points of the Line
         * @public
         * @method setPoints
         */
        setPoints: function (points) {
            this._pts = points.copy();
            this._nbPts = this._pts.length;
            this.updateMinMax();
            this.dimension.resizeTo(this._maxX - this._minX, this._maxY - this._minY);

            this.translateTo(this._minX, this._minY);

            /*for (var i = 0 ; i < this._nbPts ; i++) {
             var p = this._pts[i];

             p.x -= this._minX;
             p.y -= this._minY;
             }*/
        },

        /**
         * Get the points of the Line
         * @public
         * @method getPoints
         */
        getPoints: function () {
            return this._pts.copy();
        },

        /**
         * Get a point of the Line at index
         * @public
         * @method getPoint
         * @param i {Number} index
         */
        getPoint: function (i) {
            if (i < this._nbPts && i >= 0) {
                return this._pts.slice(i, i + 1).copy();
            }
            return this._pts.slice(0, 1).copy();
        },

        /**
         * @method copy
         * @return {CGSGNodeLine} a copy of this node
         */
        copy: function () {
            var node = new CGSGNodeLine(this._pts);
            //call the super method
            return this._super(node);
        }

    }
);// Source: src/node/class.node.curveTCB.js
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
 * A CGSGNodeSquare represent a basic square
 *
 * @class CGSGNodeCurveTCB
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @type {CGSGNodeCurveTCB}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGNodeCurveTCB = CGSGNode.extend(
    {
        initialize: function (x, y) {
            this._super(x, y);

            this.resizeTo(300, 300);

            this._interpolator = new CGSGInterpolatorTCB();
            this._keys = [];
            this._nbKeys = 0;
            this._values = [];
            this._nbValues = 0;
            this._steps = [];

            /**
             * @property classType
             * @readonly
             * @type {String}
             */
            this.classType = "CGSGNodeCurveTCB";
        },

        /**
         * @method addKey
         * @param x
         * @param y
         * @param t
         * @param c
         * @param b
         * @return {CGSGKeyFrame}
         */
        addKey: function (x, y, t, c, b) {
            var k = new CGSGKeyFrame(this._nbKeys, {x: x, y: y});
            k.userData = {t: t, c: c, b: b};
            this._keys.push(k);
            this._nbKeys++;

            if (this._nbKeys > 1) {
                this._steps.push(20);
            }

            var s = new CGSGNodeSquare(x - 2, y - 2, 4, 4);
            s.isDraggable = true;
            s.userData = k;
            s.onDrag = this._moveKey.bind(this);
            this.addChild(s);

            return k;
        },

        _moveKey: function (event) {
            event.data.node.userData.value.x = event.data.positions[0].x;
            event.data.node.userData.value.y = event.data.positions[0].y;
            this.compute();
        },

        compute: function () {
            var v = this._interpolator.compute(this._keys, this._steps);
            this._values = v.copy();
            this._nbValues = this._values.length;
        },

        /**
         * Custom rendering
         * @method render
         * @protected
         * @param {CanvasRenderingContext2D} context the context into render the node
         * */
        render: function (context) {
            if (this._nbValues > 0) {

                context.beginPath();

                context.moveTo(this._values[0].x, this._values[0].y);

                for (var i = 1; i < this._nbValues; i++) {
                    context.lineTo(this._values[i].x, this._values[i].y);
                }

                if (this.lineWidth > 0) {
                    context.stroke();
                }
            }
        },

        /**
         * @method copy
         * @return {CGSGNodeCurveTCB} a copy of this node
         */
        copy: function () {
            var node = new CGSGNodeCurveTCB(this.position.x, this.position.y);
            //call the super method
            node = this._super(node);

            var k;
            for (var i = 0; i < this._nbKeys; i++) {
                k = this._keys[i];
                node.addKey(k.value.x, k.value.y, k.userData.t, k.userData.c, k.userData.b);
            }
            node.compute();

            return node;
        }
    }
);
// Source: src/node/class.node.colorPicker.js
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
 * A color Picker
 * @class CGSGNodeColorPicker
 * @constructor
 * @param {Number} x X Position
 * @param {Number} y Y Position
 * @type {CGSGNodeColorPicker}
 */
var CGSGNodeColorPicker = CGSGNode.extend(
    {
        initialize: function (x, y, w, h) {
            this._super(x, y);
            this.resizeTo(w, h);

            /**
             * @property _imgData
             * @type {ImageData}
             * @private
             */
            this._imgData = null;

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

            /**
             * @property classType
             * @readonly
             * @type {String}
             * @default "CGSGNodeButton"
             */
            this.classType = "CGSGNodeColorPicker";

            this.setPrecomputed(true);
        },

        /**
         * @method _onMouseOverHandler
         * @param {Event} event
         * @private
         */
        _onMouseOverHandler: function (event) {
            if (cgsgExist(this.onOverColor)) {
                var rgb = this.getColorAt(event.data.positions[0]);

                this.onOverColor(rgb);
            }
        },

        /**
         * @method _onClickHandler
         * @param {Event} event
         * @private
         */
        _onClickHandler: function (event) {
            if (cgsgExist(this.onClickColor)) {
                var rgb = this.getColorAt(event.data.positions[0]);

                this.onClickColor(rgb);
            }
        },

        /**
         * @method getColorAt
         * @param {CGSGPosition} absolutePosition position of the cursor inside the colorPicker
         * @return {Object} Object with {r:x, g:x, b:x} value
         */
        getColorAt: function (absolutePosition) {
            var ap = this._absPos;//getAbsPosition();
            var aw = this.getAbsWidth();
            //get the color under the mice
            var data = this._imgData.data;
            //get cursor position under the colorPicker
            //todo : still need to fix the scale (will be done in v2.0 with the matrix class)
            var x = CGSGMath.fixedPoint((absolutePosition.x - ap.x) /*/ this.getAbsScale().x*/);
            var y = CGSGMath.fixedPoint((absolutePosition.y - ap.y) /*/ this.getAbsScale().y*/);

            return {r: data[((aw * y) + x) * 4],
                g    : data[((aw * y) + x) * 4 + 1],
                b    : data[((aw * y) + x) * 4 + 2]};
        },

        /**
         * Custom rendering. Must be defined to allow the traverser to render this node
         * @method render
         * @protected
         * @param {CanvasRenderingContext2D} context the context into render the node
         * */
        render: function (context) {
            this._imgData = context.createImageData(this.getWidth(), this.getHeight());

            //draw the colors panel
            var x, y, intensity = 1, stepX, currentPixel = 0;
            var rgb = [255, 0, 0], clr = 0, delta, value, tmpClr;
            var widthGray = CGSGMath.fixedPoint(Math.min(this.getWidth() * 0.1, 20));
            var width = this.getWidth() - widthGray;
            var steps = [
                {index: 1, sens: 1},
                {index: 0, sens: -1},
                {index: 2, sens: 1},
                {index: 1, sens: -1},
                {index: 0, sens: 1},
                {index: 2, sens: -1}
            ];
            //A color is divided in 256 values (from 0 to 255).
            //ALl these 256 values won't be displayed because a lack of space in the screen (limited to this.getWidth().
            //Also, there are 6 steps in the colorpicker : red, yellow, green, cyan, blue, violet
            // So, stepX is the step between 2 computed values, depending of the width of the node
            stepX = 256 / (width / 6);
            var halfH = this.getHeight() / 2;

            //the white to black column
            for (x = 0; x < widthGray; x++) {
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
                if (clr < 6) {
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
            }

            x = 0;
            y = 0;
            if (!this._isCached) {
                x = this._absPos.x;
                y = this._absPos.y;
            }
            context.putImageData(this._imgData, x, y);
        }

    }
);
// Source: src/node/class.node.tabMenu.js
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

var CGSGTABHEIGHT = 35;

/**
 * A tab menu
 * @class CGSGNodeTabMenu
 * @extends CGSGNode
 * @param {Number} x X position
 * @param {Number} y Y position
 * @param {Number} w Width of the tab menu
 * @constructor
 * @type {CGSGNodeTabMenu}
 */
var CGSGNodeTabMenu = CGSGNode.extend(
    {
        initialize: function (x, y, w) {
            //call the constructor of CGSGNode
            this._super(x, y);
            this.resizeTo(w, CGSGTABHEIGHT);

            /**
             * Define the class type.
             * Not mandatory but very useful, as Javascript does not have a mechanism to manage the type of class
             * @property classType
             * @type {String}
             */
            this.classType = "CGSGNodeTabMenu";

            this._buttonRadius = 4;

            this._tabsContainer = new CGSGNode(0, 0);
            this._tabsContainer.resizeTo(w, 0);
            this._tabsContainer.color = "#A0A0A0";
            this._tabsContainer.lineWidth = 0;
            this.addChild(this._tabsContainer);

            var sep1 = new CGSGNodeSquare(0, CGSGTABHEIGHT - this._buttonRadius + 1, w, this._buttonRadius);
            sep1.bkgcolors[0] = "white";
            sep1.lineWidth = 0;
            this.addChild(sep1);
            var sep2 = new CGSGNodeSquare(0, CGSGTABHEIGHT - this._buttonRadius, w, 1);
            sep2.bkgcolors[0] = "#A0A0A0";
            sep2.lineWidth = 0;
            this.addChild(sep2);

            this.hideUnderline = new CGSGNodeSquare(0, CGSGTABHEIGHT - this._buttonRadius, w, 1);
            this.hideUnderline.bkgcolors[0] = "white";
            this.hideUnderline.lineWidth = 0;
            this.addChild(this.hideUnderline);

            this._tabsBaseline = new CGSGNode(0, CGSGTABHEIGHT - this._buttonRadius + 1);
            this._tabsBaseline.resizeTo(w, 0);
            this.addChild(this._tabsBaseline);

            /**
             * Array of the buttons in the menu
             * @property buttons
             * @type {Array} array of CGSGNodeButtons
             */
            this.tabs = [];

            /**
             * Event
             * @property onTabChanged
             * @default null
             * @type {Function}
             */
            this.onTabChanged = null;

            this._selectedTab = null;
        },

        /**
         * @method addButton
         * @param {String} text the text on the tab
         * @param {CGSGNode} view the root node for the view to show when is that is activated
         * @return {Object} The new created tab
         */
        addTab: function (text, view) {
            var button = new CGSGNodeButton(0, 0, text);
            //button.setHorizontalPadding(10);
            //button.setVerticalPadding(8);
            //button.setTextSizes([10, 10, 10]);
            //button.setFirstColors(["#EAEAEA", "white", "white"]);
            //button.setLastColors(["#EAEAEA", "white", "white"]);
            //button.setTextColors(["#999999", "#000000", "#000000"]);

            button.setTextClasses(["custom-normal", "custom-over", "custom-deactivated", "custom-selected"]);
            button.setClasses(["custom-normal", "custom-over", "custom-deactivated", "custom-selected"]);

            //button.lineWidth = 1;
            //button.strokeColor = "#A0A0A0";
            //button.setRadiuses([this._buttonRadius, this._buttonRadius, this._buttonRadius]);
            //button._initShapes();

            var tab = {button: button, view: view};
            this.tabs.push(tab);

            var that = this;
            button.onClick = function (event) {
                that.selectTab(tab);
            };

            this._tabsContainer.addChild(button);

            this._recomputeButtonsWidth();

            if (!cgsgExist(this._selectedTab)) {
                this.selectTab(tab);
            }

            return tab;
        },

        /**
         * Select the tab passed in parameter
         * @method selectTab
         * @param {Object} tab
         * @return {Object} the selected tab
         */
        selectTab: function (tab) {
            if (cgsgExist(this._selectedTab)) {
                if (cgsgExist(this._selectedTab.view)) {
                    this._selectedTab.view.isVisible = true;
                    this._selectedTab.view.isTraversable = true;
                }
                this._tabsBaseline.detachChild(this._selectedTab.view);
            }
            this._tabsBaseline.addChild(tab.view);
            this._selectedTab = tab;

            for (var i = 0; i < this.tabs.length; i++) {
                this.tabs[i].view.isVisible = false;
                this.tabs[i].view.isTraversable = false;
                this.tabs[i].button.setMode(CGSGButtonMode.NORMAL);
            }

            if (cgsgExist(tab.view)) {
                tab.view.isVisible = true;
                tab.view.isTraversable = true;
            }
            tab.button.setMode(CGSGButtonMode.SELECTED);
            this.hideUnderline.translateTo(tab.button.position.x, this.hideUnderline.position.y);
            this.hideUnderline.resizeTo(tab.button.getWidth(), 1);

            if (cgsgExist(this.onTabChanged)) {
                this.onTabChanged({tab: tab});
            }

            return tab;
        },

        /**
         * @method selectTabByIndex
         * @param {Number} index
         * @return {Object} the selected tab
         */
        selectTabByIndex: function (index) {
            return this.selectTab(this.tabs[index]);
        },

        /**
         * Recompute width for all buttons
         * @method _recomputeButtonsWidth
         * @private
         */
        _recomputeButtonsWidth: function () {
            var totalWidth = 0;
            var i;
            var bw = 0; //biggest width
            for (i = 0; i < this.tabs.length; i++) {
                var w = this.tabs[i].button.getWidth();
                totalWidth += w;
                bw = Math.max(bw, w);
            }

            //each button get the same width:
            //whether the width of the biggest button, or the width of the tab / number of buttons
            if (totalWidth > this.getWidth() || this.tabs.length * bw > this.getWidth()) {
                //common width
                var cw = this.getWidth() / this.tabs.length;

                for (i = 0; i < this.tabs.length; i++) {
                    this.tabs[i].button.setFixedSize(new CGSGDimension(cw, CGSGTABHEIGHT));
                    this.tabs[i].button.translateTo(i * cw, 0);
                }
            }
            else {
                for (i = 0; i < this.tabs.length; i++) {
                    this.tabs[i].button.setFixedSize(new CGSGDimension(bw, CGSGTABHEIGHT));
                    this.tabs[i].button.translateTo(i * bw, 0);
                }
            }

        }
    }
);
// Source: src/node/class.node.text.js
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
 * List the methods to wrap the text. Used by {CGSGNodeText} Node.
 * @class CGSGWrapMode
 * @type {Object}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 * @example
 *      myTextNode.setWrapMode(CGSGWrapMode.WORD, true);
 */
var CGSGWrapMode = {
    /**
     * @property WORD
     */
    WORD    : {space: " "},
    /**
     * @property LETTER
     */
    LETTER  : {space: ""},
    /**
     * @property SENTENCE
     */
    SENTENCE: {space: "."}
};

/**
 * A CGSGNodeText represent a basic circle
 *
 * @class CGSGNodeText
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {String} text Text to display
 * @type {CGSGNodeText}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGNodeText = CGSGNode.extend(
    {
        //noinspection BadExpressionStatementJS
        initialize: function (x, y, text, mustRecomputeDimension) {
            this._super(x, y);

            /**
             * @property _text
             * @type {String}
             * @private
             */
            this._text = "";
            /**
             * Size of the text, in pt
             * @property _size
             * @default 18
             * @type {Number}
             * @private
             */
            this._size = 0;
            /**
             * Possible values : "left", "right", "center"
             * @property _align
             * @default "left"
             * @type {String}
             * @private
             */
            this._align = null;
            /**
             * Possible values : "top", "hanging", "middle", "alphabetic", "ideographic", "bottom"
             * @property _textBaseline
             * @default "top"
             * @type {String}
             * @private
             */
            this._textBaseline = "top";
            /**
             * @property _strokeColor
             * @type {String}
             * @private
             */
            this._strokeColor = null;

            /**
             * @property crossed
             * @default false
             * @type {Boolean}
             * @private
             */
            this.crossed = false;

            /**
             * @property _style
             * @default ""
             * @type {String}
             * @private
             */
            this._style = "";
            /**
             * @property _typo
             * @default "Arial"
             * @type {String}
             * @private
             */
            this._typo = null;

            this._sizeT=NaN;
            this._variant=null;
            this._weight=NaN;

            this._transform=null;
            /**
             * Max width for the text. If -1, so no max will be used
             * @property _maxWidth
             * @type {Number}
             * @private
             */
            this._maxWidth = -1;
            /**
             * Line height when wrap the text.
             * A line height is the size between 2 tops of line
             * @property _lineHeight
             * @default this._size
             * @type {Number}
             * @private
             */
            this._lineHeight = this._size;
            this._userModifMaxW = false;
            /**
             * @property _wrapMode
             * @default CGSGWrapMode.LETTER
             * @type {Object}
             * @private
             */
            this._wrapMode = CGSGWrapMode.LETTER;

            /**
             * List of sections in the text. a section is delimited by a Carriage Return
             * @property _sections
             * @type {Array}
             * @private
             */
            this._sections = [];

            /**
             * The string to replace the tabulation characters
             * @property _tabulation
             * @type {String}
             * @private
             */
            this._tabulation = "    ";

            /**
             * Method to select the text
             * @property pickNodeMethod
             * @type {Object}
             */
            this.pickNodeMethod = CGSGPickNodeMethod.GHOST;

            /**
             * Metrics of the text.
             * Computed each frame it is rendered. Contains only width.
             * Use getWidth() and getHeight() methods to get correct values
             * @readonly
             * @property metrics
             * @type {Object}
             */
            this.metrics = {width: 1};

            /**
             * number of lines in the text
             * @property _nbLines
             * @type {Number}
             * @private
             */
            this._nbLines = 1;

            /**
             * @property classType
             * @type {String}
             */
            this.classType = "CGSGNodeText";

            this.setText(text, mustRecomputeDimension !== false);

            this.setClass("cgsg-p");
            this.resizeTo(this.getWidth(), this.getHeight());
        },

        /**
         * Reload theme (colors, ...) from loaded CSS file
         * @method invalidateTheme
         */
        invalidateTheme: function () {
            this._super();

            var cl = CGSG.cssManager.getAttrInArray(this._cls, "color");
            var style = CGSG.cssManager.getAttrInArray(this._cls, "font-style");
            var variant = CGSG.cssManager.getAttrInArray(this._cls, "font-variant");
            var weight = CGSG.cssManager.getAttrInArray(this._cls, "font-weight");
            var size = CGSG.cssManager.getAttrInArray(this._cls, "font-size");
            var family = CGSG.cssManager.getAttrInArray(this._cls, "font-family");
            var height = CGSG.cssManager.getAttrInArray(this._cls, "line-height");
            var align = CGSG.cssManager.getAttrInArray(this._cls, "text-align");
            var transform = CGSG.cssManager.getAttrInArray(this._cls, "text-transform");
            var strokeWidth = CGSG.cssManager.getAttrInArray(this._cls, "-webkit-text-stroke-width");
            if (!cgsgExist(strokeWidth)) {
                strokeWidth = CGSG.cssManager.getAttrInArray(this._cls, "text-stroke-width");
            }
            var strokeColor = CGSG.cssManager.getAttrInArray(this._cls, "-webkit-text-stroke-color");
            if (!cgsgExist(strokeColor)) {
                strokeColor = CGSG.cssManager.getAttrInArray(this._cls, "text-stroke-color");
            }

            if (cgsgExist(cl)) {
                //value is given as "rgb(xx, yy, zz)". Let's convert it to hex
                var rgb = CGSGColor.fromString(cl);
                this.color = CGSGColor.rgb2hex(rgb.r, rgb.g, rgb.b);
            }
            if (cgsgExist(style)) {
                this._style = style;
            }
            if (cgsgExist(variant)) {
                this._variant = variant;
            }
            if (cgsgExist(weight)) {
                this._weight = weight;
            }
            if (cgsgExist(size)) {
                this._sizeT = size;
                this._size = CGSG.cssManager.getNumber(size);
                this._lineHeight = this._size;
            }
            if (cgsgExist(family)) {
                this._typo = family;
            }
            if (cgsgExist(height)) {
                this._lineHeight = height;
            }
            if (cgsgExist(align)) {
                this._align = align;
            }
            if (cgsgExist(transform)) {
                this._transform = transform;
            }
            if (cgsgExist(strokeWidth)) {
                this.lineWidth = strokeWidth;
            }
            if (cgsgExist(strokeColor)) {
                this.lineColor = strokeColor;
            }

            this._invalidateFont();

            if (!this._userModifMaxW && cgsgExist(this.metrics)) {
                this._maxWidth = NaN;
                this.computeRealDimension();
                //this._setMaxW(this.getWidth() + 1, true);
            }
        },

        setPrecomputed: function (p) {
            //nop
        },

        _invalidateFont: function () {
            var st = (cgsgExist(this._style) && this._style.length > 0) ? (this._style + ' ') : "";
            var va = (cgsgExist(this._variant) && this._variant.length > 0) ? (this._variant + ' ') : "";
            var we = (cgsgExist(this._weight) && this._weight.length > 0) ? (this._weight + ' ') : "";
            var si = (cgsgExist(this._sizeT)) ? (this._sizeT + ' ') : "";
            var ty = (cgsgExist(this._typo) && this._typo.length > 0) ? (this._typo + ' ') : "";

            this._fullfont = st + va + we + si + ty;
        },

        /**
         * Set the wrap mode for the text if maxWidth > 0
         * @method setWrapMode
         * @param {Object} mode a CGSGWrapMode (CGSGWrapMode.WORD, CGSGWrapMode.LETTER)
         * @param {Boolean} mustRecomputeDimension (default : true)
         * @example
         *      myTextNode.setWrapMode(CGSGWrapMode.WORD, true);
         */
        setWrapMode: function (mode, mustRecomputeDimension) {
            this._wrapMode = mode;
            this.invalidate();
            if (mustRecomputeDimension !== false) {
                this.computeRealDimension();
            }
        },

        /**
         * Set the string to replace the tabulation characters
         * @method setTabulationString
         * @param {String} tab TExt to replace tabulation (ie: 4 spaces, ...)
         * @param {Boolean} mustRecomputeDimension (default : true)
         */
        setTabulationString: function (tab, mustRecomputeDimension) {
            this._tabulation = tab;
            this._text = this._text.replace(/(\t)/g, this._tabulation);
            this.invalidate();
            if (mustRecomputeDimension !== false) {
                this.computeRealDimension();
            }
        },

        /**
         * @method setText
         * @param {String} t the new text
         * @param {Boolean} mustRecomputeDimension (default : true)
         */
        setText: function (t, mustRecomputeDimension) {
            this._text = t;
            this._text = this._text.replace(/(\r\n|\n\r|\r|\n)/g, "\n");
            this._text = this._text.replace(/(\t)/g, this._tabulation);
            this._sections = this._text.split("\n");

            if (mustRecomputeDimension !== false) {
                this.computeRealDimension();
            }

            //if no maxWidth is already defined, then set it now with current width + 1
            //if ((!cgsgExist(this._maxWidth) || this._maxWidth <= 0) && this.getWidth() > 0) {
            if (!this._userModifMaxW) {
                this._maxWidth = NaN;
                //this._setMaxW(this.getWidth() + 1, true);
            }

            this.invalidate();
        },

        /**
         * @method setTextBaseline
         * @param {String} b A String (Possible values : "top", "hanging", "middle", "alphabetic", "ideographic", "bottom")
         * @param {Boolean} mustRecomputeDimension (default : true)
         */
        setTextBaseline: function (b, mustRecomputeDimension) {
            this._textBaseline = b;
            this.invalidate();
            if (mustRecomputeDimension !== false) {
                this.computeRealDimension();
            }
        },

        /**
         * @method setStyle
         * @param {String} s "" by default
         * @param {Boolean} mustRecomputeDimension (default : true)
         */
        setStyle: function (s, mustRecomputeDimension) {
            this._style = s;
            this._invalidateFont();
            this.invalidate();
            if (mustRecomputeDimension !== false) {
                this.computeRealDimension();
            }
        },

        /**
         * Line height when wrap the text.
         * A line height is the size between 2 tops of line
         * @method setLineHeight
         * @param {Number} l height of a line
         * @param {Boolean} mustRecomputeDimension (default : true)
         */
        setLineHeight: function (l, mustRecomputeDimension) {
            this._lineHeight = l;
            this.invalidate();
            if (mustRecomputeDimension !== false) {
                this.computeRealDimension();
            }
        },

        /**
         * @method setSize
         * @param {Number} s the new size (an integer)
         * @param {Boolean} mustRecomputeDimension (default : true)
         */
        setSize: function (s, mustRecomputeDimension) {
            this._size = s;
            this._invalidateFont();
            this.invalidate();
            if (mustRecomputeDimension !== false) {
                this.computeRealDimension();
            }
        },

        /**
         * @method setTypo
         * @param {String} t "Arial" by default
         * @param {Boolean} mustRecomputeDimension (default : true)
         */
        setTypo: function (t, mustRecomputeDimension) {
            this._typo = t;
            this._invalidateFont();
            this.invalidate();
            if (mustRecomputeDimension !== false) {
                this.computeRealDimension();
            }
        },

        /**
         * @method setWeight
         * @param w
         */
        setWeight: function (w) {
            this._weight = w;
            this._invalidateFont();
            this.invalidate();
        },

        /**
         * @method setVariant
         * @param v
         */
        setVariant: function (v) {
            this._variant = v;
            this._invalidateFont();
            this.invalidate();
        },

        /**
         * @method setTextAlign
         * @param {String} a A String (Possible values : "left", "right", "center")
         */
        setTextAlign: function (a) {
            this._align = a;
            this.invalidate();
        },

        /**
         * compute the real dimension of the text
         * @method computeRealDimension
         */
        computeRealDimension: function () {
            this.metrics.width = 0;
            var fakeCanvas = document.createElement('canvas');
            var fakeContext = fakeCanvas.getContext('2d');

            this._doRender(fakeContext, false);

            fakeCanvas.width = 0;
            fakeCanvas.height = 0;
            fakeCanvas = null;
        },

        /**
         * @method _setMaxW
         * @param {Number} m Max Width for the text
         * @param {Boolean} invalidDim (default : true)
         * @private
         */
        _setMaxW: function (m, invalidDim) {
            this._maxWidth = m;
            if (this._maxWidth > 0) {
                this.dimension.width = m;
                if (invalidDim !== false) {
                    this.computeRealDimension();
                }
            }
        },

        /**
         * @method setMaxWidth
         * @param {Number} m Max Width for the text
         * @param {Boolean} invalidDim (default : true)
         */
        setMaxWidth:function(m, invalidDim) {
          this._userModifMaxW = true;
            this._setMaxW(m, invalidDim);
        },

        /**
         * Increase/decrease current dimension with adding values
         * @method resizeWith
         * @param {Number} w
         * @param {Number} h
         * */
        resizeWith: function (w, h) {
            if (this._maxWidth + w > 0) {
                this._afterResize(this._maxWidth + w);
            }
        },

        _afterResize: function (m) {
            var w = this.getWidth();
            this._maxWidth = m;
            //this.dimension.width = m;//Math.max(m, this.dimension.width);
            this.computeRealDimension();

            if (this._nbLines === 1 && this.getWidth() <= w) {
                this._maxWidth = this.getWidth() + 1;
            }

            this._applyContraintsToFollowers();
            this._endResize();
        },

        /**
         * Custom rendering
         * @method render
         * @protected
         * @param {CanvasRenderingContext2D} context the context into render the node
         * */
        render: function (context) {
            context.fillStyle = this.color || this.bkgcolors[0];

            this._doRender(context, false);
        },

        /**
         * Do the effective render
         * @method _doRender
         * @param {CanvasRenderingContext2D} context the context into render the node
         * @param {Boolean} isGhostmode. If true a square will be rendered instead of the text.
         * @private
         */
        _doRender: function (context, isGhostmode) {
            context.font = this._fullfont;

            context.textAlign = this._align;
            context.textBaseline = this._textBaseline;

            var s = 0, textW = 0, posX = 0, posY = 0, mt;
            if (this.crossed) {
                context.save();
                context.strokeStyle = "grey";
                context.moveTo(this.getWidth(), 3);
                context.lineTo(0, this.getHeight() + 3);
                context.stroke();
                context.restore();
            }
            if (!cgsgExist(this._maxWidth) || this._maxWidth <= 0) {
                posX = this._computeDecalX(this.getWidth());
                for (s = 0; s < this._sections.length; s++) {
                    textW = context.measureText(this._sections[s]).width;
                    this._drawText(this._sections[s], posX, posY, context, isGhostmode, textW);
                    posY += this._lineHeight;
                }
                this._nbLines = this._sections.length;
            }
            else { //if (this._maxWidth > 0
                this._nbLines = 0;

                for (s = 0; s < this._sections.length; s++) {
                    var words = this._sections[s].split(this._wrapMode.space);
                    var nbWords = 0;
                    var testLine = "";
                    posY = 0;
                    textW = 0;
                    if (words.length === 1) {
                        textW = context.measureText(testLine).width;
                        posY = this._nbLines * this._lineHeight;
                        posX = this._computeDecalX(this.getWidth());
                        this._drawText(testLine, posX, posY, context, isGhostmode, textW);
                        this._nbLines++;
                    }
                    else {
                        while (nbWords < words.length) {

                            testLine = words[nbWords];
                            mt = context.measureText(testLine + this._wrapMode.space + words[nbWords + 1]);
                            while (mt.width < (this._maxWidth /*- 5*/) &&
                                   nbWords < words.length - 1
                                ) {
                                if (testLine !== "") {
                                    testLine += this._wrapMode.space;
                                }
                                testLine += words[++nbWords];
                                mt = context.measureText(testLine + this._wrapMode.space + words[nbWords + 1]);
                            }

                            textW = context.measureText(testLine).width;
                            posY = this._nbLines * this._lineHeight;
                            posX = this._computeDecalX(this.getWidth());
                            this._drawText(testLine, posX, posY, context, isGhostmode, textW);
                            this._nbLines++;

                            ++nbWords;
                        }
                    }
                }

            }

            //region constraint

            var rgc;
            if (this.nodeConstraint !== null) {
                rgc = this.nodeConstraint.getAbsoluteRegion();
            }
            else {
                rgc = this.regionConstraint;
            }
            if (rgc !== null) {
                var r = this.getAbsoluteRegion();
                var d = this.getAbsBottom() - (rgc.position.x + rgc.dimension.height);
                if (d > 0) {
                    this.translateWith(0, -d);
                }
            }
        },

        /**
         * @method _drawText
         * @param {String} text
         * @param {Number} x
         * @param {Number} y
         * @param {CanvasRenderingContext2D} context the context into render the node
         * @param {Boolean} isGhostmode
         * @param {Number} width
         * @private
         */
        _drawText: function (text, x, y, context, isGhostmode, width) {
            if (cgsgExist(this._transform)) {
                if (this._transform === "capitalize") {
                    text = text.capitalize();
                }
                if (this._transform === "lowercase") {
                    text = text.toLowerCase();
                }
                if (this._transform === "uppercase") {
                    text = text.toUpperCase();
                }
            }

            if (isGhostmode) {
                this._drawSquare(x, y, width, context);
                return;
            }
            //uncomment this to debug
            //context.fillStyle = "red";
            //this._drawSquare(x, y, width, context);
            //context.fillStyle = this.color;

            if (cgsgExist(this.lineWidth) && this.lineWidth > 0) {
                context.strokeText(text, x, y);
            }

            if (cgsgExist(context.fillStyle) && this.globalAlpha > 0) {
                context.fillText(text, x, y);
            }

            var mt = context.measureText(text);
            if (mt.width > this.metrics.width) {
                this.metrics.width = mt.width;
            }
        },

        /**
         * @method _drawSquare
         * @param {Number} x
         * @param {Number} y
         * @param {Number} width
         * @param {CanvasRenderingContext2D} context the context into render the node
         * @private
         */
        _drawSquare: function (x, y, width, context) {
            context.fillRect(x - this._computeDecalX(width), y + this._computeDecalY(), width, this._size);
        },

        /**
         * @method getHeight
         * @return {Number}
         */
        getHeight: function () {
            if (this._nbLines === 0) {
                return this._nbLines;
            }

            return ((this._nbLines - 1) * this._lineHeight) + this._size;
        },

        /**
         * @method getWidth
         * @return {Number}
         */
        getWidth: function () {
            return this.metrics.width;
        },

        /**
         * @private
         * @method _computeDecalX
         * @return {Number}
         */
        _computeDecalX: function (width) {
            var decalX = 0;
            if (this._align === "start" || this._align === "left") {
                decalX = 0.0;
            }
            else if (this._align === "center") {
                decalX = width / 2.0;
            }
            else if (this._align === "end" || this._align === "right") {
                decalX = width;
            }

            return decalX;
        },

        /**
         * Browsers don't render the text in the exact same way.
         * It can be few pixels of difference in Y position
         * @private
         * @method _computeDecalY
         * @return {Number}
         */
        _computeDecalY: function () {
            var decalY = 0;
            if (this._textBaseline === "top" || this._textBaseline === "hanging") {
                decalY = this._size / cgsgCurrentExplorer.textDecalYTop;
            }
            else if (this._textBaseline === "middle") {
                decalY = -this._size / cgsgCurrentExplorer.textDecalYMiddle;
            }
            else if (this._textBaseline === "alphabetic" || this._textBaseline === "ideographic") {
                decalY = -this._size * cgsgCurrentExplorer.textDecalYAlpha;
            }
            else if (this._textBaseline === "bottom") {
                decalY = -this._size * cgsgCurrentExplorer.textDecalYBottom;
            }

            return decalY;
        },

        /**
         * Override ghost "do rendering" function.
         *
         * @method doRenderGhost
         * @protected
         * @param {CanvasRenderingContext2D} ghostContext The context for the ghost rendering
         */
        doRenderGhost: function (ghostContext) {
            //save current state
            this.beforeRenderGhost(ghostContext);

            if (this.globalAlpha > 0) {
                this.renderGhost(ghostContext);
                ghostContext.fillStyle = CGSG.ghostColor;

                this._doRender(ghostContext, true);
            }

            //restore state
            this.afterRenderGhost(ghostContext);
        },

        /**
         * Render the resize handler
         * @protected
         * @method renderBoundingBox
         * @param {CanvasRenderingContext2D} context the context into render the node
         */
        renderBoundingBox: function (c) {
            var decalX = 0;
            var decalY = this._computeDecalY();

            //this._absPos = this.getAbsPosition(false);
            //this._absSca = this.getAbsScale(false);

            var height = this.getHeight();
            var width = this.getWidth();

            if (cgsgExist(this.selectionLineWidth) && this.selectionLineWidth > 0) {
                c.strokeStyle = this.selectionLineColor;

                c.lineWidth = this.selectionLineWidth / this._absSca.y;
                c.beginPath();
                //top line
                c.moveTo(decalX, decalY);
                c.lineTo(width, decalY);
                //bottom line
                c.moveTo(decalX, decalY + height);
                c.lineTo(width, decalY + height);
                c.stroke();
                c.closePath();

                c.lineWidth = this.selectionLineWidth / this._absSca.x;
                c.beginPath();
                //left line
                c.moveTo(decalX, decalY);
                c.lineTo(decalX, decalY + height);
                //right line
                c.moveTo(decalX + width, decalY);
                c.lineTo(decalX + width, decalY + height);
                c.stroke();
                c.closePath();
            }

            //draw the resize handles
            if (this.isResizable) {
                // draw the handle boxes
                var halfX = this.handleSize / (2 * this._absSca.x);
                var halfY = this.handleSize / (2 * this._absSca.y);

                // 0  1  2
                // 3     4
                // 5  6  7

                // top left, middle, right
                this.handles[0].translateTo(-halfX, -halfY + decalY);
                this.handles[1].translateTo(width / 2 - halfX, -halfY + decalY);
                this.handles[2].translateTo(width - halfX, -halfY + decalY);

                // middle left
                this.handles[3].translateTo(-halfX, height / 2 - halfY + decalY);

                // middle right
                this.handles[4].translateTo(width - halfX,
                                            height / 2 - halfY + decalY);

                // bottom left, middle, right
                this.handles[6].translateTo(width / 2 - halfX,
                                            height - halfY + decalY);
                this.handles[5].translateTo(-halfX, height - halfY + decalY);
                this.handles[7].translateTo(width - halfX,
                                            height - halfY + decalY);

                for (var i = 0; i < 8; i++) {
                    this.handles[i].size = this.handleSize;
                    this.handles[i].fillColor = this.handleColor;
                    this.handles[i].strokeColor = this.selectionLineColor;
                    this.handles[i].lineWidth = this.selectionLineWidth;
                    this.handles[i].render(c);
                }
            }
        },

        /**
         * @method copy
         * @return {CGSGNodeText} a copy of this node
         */
        copy: function () {
            var node = new CGSGNodeText(this.position.x, this.position.y, this._text);
            //call the super method
            node = this._super(node);

            node.setSize(this._size, false);
            node.setTextAlign(this._align, false);
            node.setTextBaseline(this._textBaseline, false);
            node.setStroke(this.lineWidth, false);
            node.setTypo(this._typo, false);
            node._setMaxW(this._maxWidth, false);
            node.setLineHeight(this._lineHeight, false);
            node.setWrapMode(this._wrapMode, false);
            node.setTabulationString(this._tabulation, false);
            node.pickNodeMethod = this.pickNodeMethod;

            this.setText(this._text, true);
            this.resizeTo(this.getWidth(), this.getHeight());
            return node;
        }
    }
);
// Source: src/node/class.node.webview.js
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
 * The different rendering mode
 * @class CGSGWEBVIEWMODE
 * @type {Object}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGWEBVIEWMODE = {
    /**
     * @property LIVE
     */
    LIVE   : 0,
    /**
     * @property PREVIEW
     */
    PREVIEW: 1
};

/*
 * TODO :
 * - When resize or drag : switch to PREVIEW mode to allow mouse over the webview
 * - load a page in AJAX and make an image from it to assign to the PREVIEW mode
 */

/**
 * @class CGSGNodeWebview
 * @module Node
 * @extends CGSGNodeDomElement
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @param {String} url URL of the webpage
 * @type {CGSGNodeWebview}
 */
var CGSGNodeWebview = CGSGNodeDomElement.extend(
    {
        initialize: function (x, y, width, height, url) {
            this._super(x, y, width, height, document.createElement("iframe"));

            this.resizeTo(CGSGMath.fixedPoint(width), CGSGMath.fixedPoint(height));

            /**
             * Size of the area around the webview in LIVE mode
             * @property threshold
             * @default 20
             * @type {Number}
             */
            this.threshold = 20;

            /**
             * @property classType
             * @type {String}
             */
            this.classType = "CGSGNodeWebview";

            /**
             * A CGSGNodeImage rendering the preview of the webpage
             * @property _previewContainer
             * @type {CGSGNodeImage}
             * @private
             */
            this._previewContainer = null;

            /**
             * URL of the web page
             * @property _url
             * @type {String}
             * @private
             */
            this._url = url;

            /**
             * URL for the preview mode
             * @property _previewURL
             * @private
             * @type {String}
             */
            this._previewURL = null;

            this._createLiveContainer();
            this._createPreviewContainer();

            this.switchMode(CGSGWEBVIEWMODE.LIVE);
        },

        /**
         * Initialize and add the live container to the HTML body
         * @method _initLiveContainer
         * @private
         */
        _initLiveContainer: function () {
            if (!cgsgExist(this._htmlElement)) {
                this._createLiveContainer();
            }

            document.body.appendChild(this._htmlElement);
        },

        /**
         * Initialize and add the CGSGNodeImage
         * @method _initPreviewContainer
         * @private
         */
        _initPreviewContainer: function () {
            if (!cgsgExist(this._previewContainer)) {
                this._createPreviewContainer();
            }

            this.addChild(this._previewContainer);

            //load the webcontent via Ajax
            //this._loadPageAsync();
        },

        /**
         * Create an IFRAME tag in the _liveContainer property
         * @method _createLiveContainer
         * @private
         */
        _createLiveContainer: function () {
            var uri = "";
            if (cgsgExist(this._url)) {
                uri = this._url;
            }

            this._htmlElement.style.position = "absolute";
            this._htmlElement.setAttribute("src", uri);
        },

        /**
         * Create the CGSGNodeImage to contain the preview
         * @method _createPreviewContainer
         * @private
         */
        _createPreviewContainer: function () {
            this._previewContainer =
            new CGSGNodeImage(0, 0, this._previewURL);

            this._previewContainer.isTraversable = false;
        },

        /*
         *
         * @private
         * @method _loadPageAsync
         */
        /*_loadPageAsync : function () {

         },*/

        /**
         * @method setURL
         * @param {String} url
         */
        setURL: function (url) {
            this._url = url;

            if (cgsgExist(this._htmlElement)) {
                this._htmlElement.setAttribute("src", this._url);
            }
        },

        /**
         * Get a String representing the URL
         * @method getURL
         * @return {string}
         */
        getURL: function () {
            return this._url;
        },

        /**
         * Set the URL of the image for the preview mode (CGSGWEBVIEWMODE.PREVIEW)
         * @method setPreviewURL
         * @param {String} imageURL
         */
        setPreviewURL: function (imageURL) {
            this._previewURL = imageURL;
            this._previewContainer.setURL(this._previewURL);
        },

        /**
         * Switch between rendering mode
         * @method switchMode
         * @param {Number} mode a CGSGWEBVIEWMODE enum : LIVE or PREVIEW
         */
        switchMode: function (mode) {
            if (mode === CGSGWEBVIEWMODE.LIVE) {
                this.detachChild(this._previewContainer);
                this._initLiveContainer();
            }
            else {
                //Initially, there is no mode, so we cannot remove the child from the Body
                if (this._mode === CGSGWEBVIEWMODE.LIVE) {
                    document.body.removeChild(this._htmlElement);
                }
                this._initPreviewContainer();
            }

            this._mode = mode;
        },

        /**
         * @method getCurrentMode
         * @return {CGSGWEBVIEWMODE} the current mode
         */
        getCurrentMode: function () {
            return this._mode;
        },

        /**
         * @protected
         * @method render
         * Custom rendering
         * */
        render: function (context) {
            if (this._mode === CGSGWEBVIEWMODE.LIVE) {
                //context.fillStyle = this.bkgcolors[0];
                //context.strokeStyle = this.lineColor;
                //context.lineWidth = this.lineWidth;

                //we draw the rect at (0,0) because we have already translated the context to the correct position
                context.fillRect(0, 0, this.dimension.width, this.dimension.height);

                context.strokeRect(0, 0, this.dimension.width, this.dimension.height);

                context.strokeRect(this.threshold - 2, this.threshold - 2,
                                   8 + this.dimension.width - this.threshold * 2,
                                   8 + this.dimension.height - this.threshold * 2);

                if (cgsgExist(this._htmlElement)) {
                    this._htmlElement.style.left = (this.getAbsLeft() + this.threshold) + "px";
                    this._htmlElement.style.top = (this.getAbsTop() + this.threshold) + "px";
                    this._htmlElement.style.width = (this.getAbsWidth() - this.threshold * 2) + "px";
                    this._htmlElement.style.height = (this.getAbsHeight() - this.threshold * 2) + "px";
                }
            }
            else {
                this._previewContainer.resizeTo(this.getWidth(), this.getHeight());

                //draw this zone
                //context.fillStyle = this.bkgcolors[0];

                //we draw the rect at (0,0) because we have already translated the context to the correct position
                context.fillRect(0, 0, this.getWidth(), this.getHeight());
            }
        },

        /**
         * Free the memory taken by this node
         * @method free
         */
        free: function () {
            if (cgsgExist(this._htmlElement)) {
                CGSG.canvas.removeChild(this._htmlElement);
                delete (this._htmlElement);
            }

            this._super();
        },

        /**
         * Return the copy of this node
         * @method copy
         * @return {CGSGNodeWebview}
         */
        copy: function () {
            var node = new CGSGNodeWebview(this.position.x, this.position.y, this.dimension.width,
                                           this.dimension.height, this.url);
            //call the super method
            node = this._super(node);

            node.threshold = this.threshold;

            node.switchMode(this.mode);

            return node;
        }
    }
);
// Source: src/node/class.node.square.js
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
 * A CGSGNodeSquare represent a basic square
 *
 * @class CGSGNodeSquare
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @type {CGSGNodeSquare}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGNodeSquare = CGSGNode.extend(
    {
        initialize: function (x, y, width, height) {
            this._super(x, y);

            this.resizeTo(width, height);

            /**
             * @property classType
             * @readonly
             * @type {String}
             */
            this.classType = "CGSGNodeSquare";
        },

        /**
         * Custom rendering
         * @method render
         * @protected
         * @param c {CanvasRenderingContext2D} the context into render the node
         * */
        render: function (c) {
            //Next lines are already managed by CGSGNode.
            //I let it here just to provide an example

            //draw this zone
            //c.fillStyle = this.bkgcolors[0];

            //if (this.lineWidth > 0) {
            //	c.strokeStyle = this.lineColor;
            //	c.lineWidth = this.lineWidth;
            //}

            //we draw the rect at (0,0) because we have already translated the c to the correct position
            if (!cgsgExist(this.borderRadius) || this.borderRadius <= 0) {
                c.fillRect(0, 0, this.dimension.width, this.dimension.height);
                if (this.lineWidth > 0) {
                    c.strokeRect(0, 0, this.dimension.width, this.dimension.height);
                }
            }
            else {
                c.save();
                var r = this.borderRadius;
                var w = this.dimension.width;
                var h = this.dimension.height;
                var rw = r + w;
                var rh = r + h;

                c.translate(-r, -r);

                c.beginPath();
                c.moveTo(2 * r, r);
                c.lineTo(w, r);
                c.quadraticCurveTo(rw, r, rw, r + r);
                c.lineTo(rw, h);
                c.quadraticCurveTo(rw, rh, w, rh);
                c.lineTo(r + r, rh);
                c.quadraticCurveTo(r, rh, r, h);
                c.lineTo(r, r + r);
                c.quadraticCurveTo(r, r, r + r, r);
                c.closePath();

                c.fill();
                if (this.lineWidth > 0) {
                    c.stroke();
                }

                c.restore();
            }
        },

        /**
         * @method copy
         * @return {CGSGNodeSquare} a copy of this node
         */
        copy: function () {
            var node = new CGSGNodeSquare(this.position.x, this.position.y, this.dimension.width,
                                          this.dimension.height);
            //call the super method
            return this._super(node);
        }
    }
);
// Source: src/node/class.node.slider.js
/**
 * A CGSGNodeSliderHandle represent a slider handle
 *
 * @class CGSGNodeSliderHandle
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} handleWidth width of the handle
 * @type {CGSGNodeSliderHandle}
 * @author Jeremie (jeremie.lussiez@capgemini.com)
 */
var CGSGNodeSliderHandle = CGSGNode.extend(
    {

        initialize: function (handleWidth) {
this._super(0, 0);
            this.resizeTo(handleWidth, handleWidth);
            this.bkgcolors = ["#CCCCCC"];
            this.rotationCenter = new CGSGPosition(0.5, 0.5);
            this.handleWidth = handleWidth;
            this.isDraggable = true;
            this.onDrag = this.onSlide;
        },

        /**
         * Get parent slider
         *
         * @method getParentSlider
         * @public
         * @return {CGSGNodeSlider} parent slider
         */
        getParentSlider: function () {
            return this._parentNode;
        },

        /**
         * Restrain movement to x axis
         *
         * @method onSlide
         * @protected
         */
        onSlide: function () {
            this.handleWidth =
            Math.min(this._parentNode.getHeight(), this._parentNode.getWidth()) *
            2;
            var halfWidth = this.handleWidth / 2;
            var x = this.position.x;
            if (x < -halfWidth) {
                x = -halfWidth;
            }
            else if (x > this._parentNode.getWidth() - halfWidth) {
                x = this._parentNode.getWidth() - halfWidth;
            }
            this.translateTo(x, -this.handleWidth / 4);
            var range = this._parentNode.max - this._parentNode.min;
            this._parentNode.value =
            (this.position.x + halfWidth) *
            (range / this._parentNode.getWidth()) + this._parentNode.min;
        },

        /**
         * Default handle rendering (A rounded square with some "volume" effect)
         *
         * @method render
         * @protected
         * @param c {CanvasRenderingContext2D} context the context into render the node
         */
        render: function (c) {

            this.handleWidth =
            Math.min(this._parentNode.getHeight(), this._parentNode.getWidth()) *
            2;

            var borderRadius = this.handleWidth / 10;

            c.lineWidth = 2;
            c.strokeStyle = CGSGColor.darkenHex(this.bkgcolors[0], 0.7);

            var gradient = c.createLinearGradient(this.handleWidth, 0,
                                                  this.handleWidth,
                                                  this.handleWidth);
            gradient.addColorStop(0.3, this.bkgcolors[0]);
            gradient.addColorStop(1, CGSGColor.darkenHex(this.bkgcolors[0], 0.7));

            c.fillStyle = gradient;
            c.beginPath();
            c.arc(borderRadius, borderRadius, borderRadius, Math.PI,
                  -Math.PI / 2, false);
            c.lineTo(this.handleWidth - borderRadius, 0);
            c.arc(this.handleWidth - borderRadius, borderRadius, borderRadius,
                  -Math.PI / 2, 0, false);
            c.lineTo(this.handleWidth, this.handleWidth - borderRadius);
            c.arc(this.handleWidth - borderRadius,
                  this.handleWidth - borderRadius, borderRadius, 0, Math.PI / 2,
                  false);
            c.lineTo(borderRadius, this.handleWidth);
            c.arc(borderRadius, this.handleWidth - borderRadius, borderRadius,
                  Math.PI / 2, Math.PI, false);
            c.closePath();

            c.fill();
            c.stroke();

        }

    }
);

/**
 * A CGSGNodeSlider represent a slider
 *
 * @class CGSGNodeSlider
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @type {CGSGNodeSlider}
 * @author Jeremie (jeremie.lussiez@capgemini.com)
 */
var CGSGNodeSlider = CGSGNode.extend(
    {

        initialize: function (x, y, width, height) {
            this._super(x, y);
            this.resizeTo(width, height);
            this.backgroundColor = "#EEEEEE";
            this.valueColor = "#50479E";
            this.min = -10;
            this.max = 10;
            this.value = 5;
            this.rotationCenter = new CGSGPosition(0.5, 0.5);

            this.onResize = this.updateSliderHandle;

            this.setHandle();
        },

        /**
         * Custom rendering
         *
         * @method render
         * @protected
         * @param c {CanvasRenderingContext2D} context the context into render the node
         */
        render: function (c) {
            c.save();
            this.outlineShape(c);
            this.renderBackground(c);
            this.renderValue(c);
            c.restore();
        },

        /**
         * Shape context to allow easy inner shadow and value rendering.
         *
         * @method outlineShape
         * @private
         * @param c {CanvasRenderingContext2D} context the context into render the node
         */
        outlineShape: function (c) {
            var borderRadius = Math.min(this.getWidth(), this.getHeight()) / 2;
            var width = this.getWidth();
            c.beginPath();
            c.arc(borderRadius, borderRadius, borderRadius, Math.PI / 2, -Math.PI / 2,
                  false);
            c.lineTo(width - borderRadius, 0);
            c.arc(width - borderRadius, borderRadius, borderRadius, -Math.PI / 2,
                  Math.PI / 2, false);
            c.lineTo(borderRadius, borderRadius * 2);
            c.closePath();
            c.clip();
        },

        /**
         * Render slider background.
         *
         * @method renderBackground
         * @private
         * @param c {CanvasRenderingContext2D} context the context into render the node
         */
        renderBackground: function (c) {

            c.fillStyle = this.backgroundColor;
            c.strokeStyle = CGSGColor.darkenHex(this.backgroundColor, 0.8);
            c.lineWidth = 4;

            var borderRadius = Math.min(this.getWidth(), this.getHeight()) / 2;
            var width = this.getWidth();

            c.beginPath();
            c.arc(borderRadius, borderRadius, borderRadius, Math.PI / 2, -Math.PI / 2,
                  false);
            c.lineTo(width - borderRadius, 0);
            c.arc(width - borderRadius, borderRadius, borderRadius, -Math.PI / 2,
                  Math.PI / 2, false);
            c.lineTo(borderRadius, borderRadius * 2);
            c.closePath();

            c.fill();
            c.stroke();

            c.shadowColor = 'black';
            c.shadowBlur = 15;
            c.shadowOffsetX = 0;
            c.shadowOffsetY = 0;

            c.beginPath();
            c.rect(0, -this.getHeight(), this.getWidth(), this.getHeight());
            c.closePath();

            c.fill();

        },

        /**
         * Render slider value (Fills background with color).
         *
         * @method renderBackground
         * @private
         * @param c {CanvasRenderingContext2D} context the context into render the node
         */
        renderValue: function (c) {

            var fillEnd = this.getWidth() / Math.abs(this.max - this.min) *
                          Math.abs(this.value - this.min);

            var gradient = c.createLinearGradient(fillEnd, 0, fillEnd,
                                                  this.getHeight());
            gradient.addColorStop(0.7, CGSGColor.darkenHex(this.valueColor, 1.5));
            gradient.addColorStop(1, this.valueColor);

            c.fillStyle = gradient;

            c.beginPath();
            c.rect(0, 0, fillEnd, this.getHeight());
            c.closePath();
            c.fill();

        },

        /**
         * Render slider value (Fills background with color).
         *
         * @method updateSliderHandle
         * @protected
         */
        updateSliderHandle: function () {
            var handleWidth = Math.min(this.getWidth(), this.getHeight()) * 2;
            var valuePosition = this.getWidth() / Math.abs(this.max - this.min) *
                                Math.abs(this.value - this.min);
            this.handle.resizeTo(handleWidth, handleWidth);
            this.handle.translateTo(valuePosition - handleWidth / 2, -handleWidth / 4);
        },

        /**
         * Set default or custom handle for this slider
         *
         * @method setHandle
         * @public
         * @param {CGSGNode} [handle] slider's handle
         */
        setHandle: function (handle) {
            this.handle = handle;
            var handleWidth = Math.min(this.getWidth(), this.getHeight()) * 2;
            if (handle === undefined) {
                this.handle = new CGSGNodeSliderHandle(handleWidth);
                this.handle.color = this.backgroundColor;
            }
            this.addChild(this.handle);

            var valuePosition = this.getWidth() / Math.abs(this.max - this.min) *
                                Math.abs(this.value - this.min);
            this.handle.translateTo(valuePosition - handleWidth / 4, -handleWidth / 4);
        },

        /**
         * Get this slider's handle
         *
         * @method getHandle
         * @public
         * @return {CGSGNodeSliderHandle} [handle] slider's handle
         */
        getHandle: function () {
            return this.handle;
        },

        /**
         * Set lower bound of this slider and recompute handle position
         *
         * @method addHandle
         * @public
         * @param {Number} min lower bound of this slider
         */
        setMin: function (min) {
            if (min !== null && min !== this.min && min < this.max) {
                this.min = min;
                this.updateSliderHandle();
            }
        },

        /**
         * Set upper bound of this slider and recompute handle position
         *
         * @method setMax
         * @public
         * @param {Number} max upper bound of this slider
         */
        setMax: function (max) {
            if (max !== null && max !== this.max && max > this.min) {
                this.max = max;
                this.updateSliderHandle();
            }
        },

        /**
         * Set value of this slider and recompute handle position
         *
         * @method setValue
         * @public
         * @param {Number} value of this slider
         */
        setValue: function (value) {
            if (value >= this.min && value <= this.max) {
                this.value = value;
                this.updateSliderHandle();
            }
        },

        /**
         * Get value of this slider handle position in [0-1] range
         *
         * @method getValueAsRangeRatio
         * @public
         * @return {Number} handle position in [0-1] range
         */
        getValueAsRangeRatio: function () {
            return 1 - Math.abs((this.value + this.min) / (this.max - this.min));
        }

    }
);
// Source: src/node/class.node.circle.js
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
 * A CGSGNodeCircle represent a basic circle.
 * By default, the pickNodeMethod used to detect the node under the mice is CGSGPickNodeMethod.GHOST.
 * If you don't need precision on detection on your circles, just change the property to pickNodeMethod.REGION.
 *
 * @class CGSGNodeCircle
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} centerX Relative position
 * @param {Number} centerY Relative position
 * @param {Number} radius Radius
 * @type {CGSGNodeCircle}
 * @author xymostech (Emily Eisenberg)
 */
var CGSGNodeCircle = CGSGNode.extend(
    {
        initialize: function (x, y, radius) {

            /**
             * @property classType
             * @readonly
             * @type {String}
             */
            this.classType = "CGSGNodeCircle";

            /**
             * @property radius
             * @type {Number}
             */
            this.radius = radius;
            this._center = new CGSGPosition(x + radius, y + radius);

            this._super(x, y);
            this.resizeTo(radius * 2.0, radius * 2.0);

            this.isProportionalResizeOnly = true;

            //this.translateTo(centerX - radius, centerY - radius);
        },

        render: function (c) {
            c.save();
            //c.translate(this.radius, this.radius);
            c.beginPath();
            c.arc(this.radius, this.radius, this.radius, 0, 2 * Math.PI, false);
            //Next line is already managed by CGSGNode.
            //I let it here just to provide an example
            //context.fillStyle = this.bkgcolors[0];
            c.fill();

            if (this.lineWidth > 0) {
                //Next lines are already managed by CGSGNode.
                //I let it here just to provide an example
                //context.lineWidth = this.lineWidth;
                //context.strokeStyle = this.lineColor;
                c.stroke();
            }
            c.restore();
        },

        /**
         * @method _resize
         * @private
         */
        _resize: function () {
            this.radius = CGSGMath.fixedPoint(this.dimension.width / 2);
            this._isDimensionChanged = true;
            this.invalidate();
            if (cgsgExist(this.onResize)) {
                CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_RESIZE, new CGSGEvent(this, {node: this}));
            }
        },

        resizeTo: function (w, h) {
            var r = Math.min(w, h);
            this.dimension.resizeTo(r, r);
            this._resize();
        },

        resizeBy: function (w, h) {
            var mw = w * this.dimension.width;
            var mh = h * this.dimension.height;
            var r = (mw < mh) ? w : h;
            this.dimension.resizeBy(r, r);
            this._resize();
        },

        resizeWith: function (w, h) {
            var mw = w + this.dimension.width;
            var mh = h + this.dimension.height;
            var r = (mw < mh) ? w : h;
            this.dimension.resizeWith(r, r);
            this._resize();
        },

        /**
         * @method copy
         * @return {CGSGNodeCircle} a copy of this node
         */
        copy: function () {
            var node = new CGSGNodeCircle(this.position.x, this.position.y, this.radius);
            //call the super method
            return this._super(node);
        }
    }
);
// Source: src/node/class.node.ellipse.js
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
 * A CGSGNodeEllipse represent a basic ellipse.
 * By default, the pickNodeMethod used to detect the node under the mice is CGSGPickNodeMethod.GHOST.
 * If you don't need precision on detection on your ellipses, just change the property to pickNodeMethod.REGION.
 *
 * @class CGSGNodeEllipse
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @type {CGSGNodeEllipse}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGNodeEllipse = CGSGNode.extend(
    {
        initialize: function (x, y, width, height) {
            this._super(x, y);
            this.resizeTo(width, height);

            this._f = 1.16666666;
            this._mf = 1 - this._f;
            this._w = 0;
            this._mw = 0;

            this._computeWmW();

            /**
             * @property classType
             * @readonly
             * @type {String}
             */
            this.classType = "CGSGNodeEllipse";

            this.pickNodeMethod = CGSGPickNodeMethod.GHOST;
        },

        /**
         * Custom rendering
         * @method render
         * @protected
         * @param c {CanvasRenderingContext2D} the context into render the node
         * */
        render: function (c) {
            var centerX = this.dimension.width / 2;

            c.beginPath();

            c.moveTo(centerX, 0);

            c.bezierCurveTo(
                this._w, 0,
                this._w, this.dimension.height,
                centerX, this.dimension.height);

            c.bezierCurveTo(
                this._mw, this.dimension.height,
                this._mw, 0,
                centerX, 0);

            c.fill();
            if (this.lineWidth > 0) {
                c.stroke();
            }

            c.closePath();
        },

        _computeWmW: function () {
            this._w = this.dimension.width * this._f;
            this._mw = this.dimension.width * this._mf;
        },

        /**
         * Replace current dimension by these new ones and compute new Points
         * @method resizeTo
         * @param {Number} w
         * @param {Number} h
         * */
        resizeTo: function (w, h) {
            this._super(w, h);

            this._computeWmW();
        },

        /**
         * Multiply current dimension by these new ones
         * @method resizeTBy
         * @param wf {Number} width Factor
         * @param hf {Number} height Factor
         * */
        resizeBy: function (wf, hf) {
            this._super(wf, hf);

            this._computeWmW();
        },

        /**
         * Increase/decrease current dimension with adding values
         * @method resizeWith
         * @param w {Number} width
         * @param h {Number} height
         * */
        resizeWith: function (w, h) {
            this._super(w, h);

            this._computeWmW();
        },

        /**
         * @method copy
         * @return {CGSGNodeEllipse} a copy of this node
         */
        copy: function () {
            var node = new CGSGNodeEllipse(this.position.x, this.position.y, this.dimension.width,
                                           this.dimension.height);
            //call the super method
            return this._super(node);
        }
    }
);
// Source: src/node/class.node.image.js
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
 * A CGSGNodeImage represent an image node
 *
 * @class CGSGNodeImage
 * @extends CGSGNode
 * @module Node
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {String} urlImage URL of the src image. Can be null tobe loaded later.
 * @type {CGSGNodeImage}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGNodeImage = CGSGNode.extend(
    {
        initialize: function (x, y, urlImage) {
            this._super(x, y);

            /**
             * @property classType
             * @type {String}
             */
            this.classType = "CGSGNodeImage";

            /**
             * the selected effect to be applied
             * @property effect
             * @default null
             * @type {CGSGEffect}
             */
            this.effect = null;
            /**
             * URL of the image
             * @property _urlImage
             * @type {String}
             * @private
             */
            this._urlImage = urlImage;

            /**
             * @property isProportionalResize
             * @default true
             * @type {Boolean}
             */
            this.isProportionalResize = true;
            /**
             * the image object itself
             * @property _img
             * @type {Image}
             * @private
             */
            this._img = new Image();
            /**
             * the region on the image to render
             * @property slice
             * @type {CGSGRegion}
             */
            this.slice = new CGSGRegion(0, 0, 0, 0);

            /**
             * @property _isLoaded
             * @type {Boolean}
             * @private
             */
            this.isLoaded = false;

            /**
             * Event Fired when the image is finally loaded
             * @property onLoadEnd
             * @default null
             * @type {Function} {node:this}
             */
            this.onLoadEnd = null;
            /**
             * Event Fired when the image failed to load
             * @property onLoadError
             * @default null
             * @type {Function} {node:this}
             */
            this.onLoadError = null;
            /**
             * Event Fired when the image loading is aborted
             * @property onLoadAbort
             * @default null
             * @type {Function} {node:this}
             */
            this.onLoadAbort = null;

            ///// INITIALIZATION //////
            //finally load the image
            if (cgsgExist(this._urlImage) && this._urlImage !== "") {
                this.setURL(urlImage);
            }
        },

        /**
         * used to call delegate method when the image is finally loaded
         * @private
         * @method _createDelegate
         * @param objectContext
         * @param delegateMethod
         * @return {Function}
         */
        _createDelegate: function (objectContext, delegateMethod) {
            return function () {
                return delegateMethod.call(objectContext);
            };
        },

        /**
         * fired when the image is loaded.
         * Check the dimension of the image and fired the onLoadEnd event
         * @private
         * @method _onImageLoaded
         * @param event {Event}
         */
        _onImageLoaded: function (event) {
            this.checkDimension();
            this.isLoaded = true;

            if (cgsgExist(event)) {
                cgsgImgManager.set(this._urlImage, this.img);
            }

            if (cgsgExist(this.onLoadEnd)) {
                CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_LOAD_END, new CGSGEvent(this, {node: this}));
            }
            this.invalidate();
        },

        /**
         * To be overrided when the image failed to load
         * @method _onImageError
         * @protected
         * @param event {Event}
         */
        _onImageError: function (event) {
            if (this.onLoadError !== null) {
                CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_LOAD_ERROR, new CGSGEvent(this, {node: this}));
            }
        },

        /**
         * To be overrided when the image loading is aborted
         * @method _onImageAbort
         * @protected
         * @param event {Event}
         */
        _onImageAbort: function (event) {
            if (this.onLoadAbort !== null) {
                CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_LOAD_ABORT, new CGSGEvent(this, {node: this}));
            }
        },

        /**
         * Check the true dimension of the image and fill the this.dimension property with it,
         * only if dimension is not already defined in the constructor
         * @method checkDimension
         */
        checkDimension: function () {
            if (!this._isDimensionChanged) {
                //if no width or height are specified in the constructor
                if (this.dimension.width <= 0 && this.dimension.height <= 0) {
                    this.dimension.width = this._img.width;
                    this.dimension.height = this._img.height;
                }
            }

            //if no slice was specified, adjust it with the full image
            if (this.slice.dimension.width <= 0 || this.slice.dimension.height <= 0) {
                this.slice.dimension.width = this._img.width;
                this.slice.dimension.height = this._img.height;
            }
        },

        /**
         * Set the slice into the image
         * @method setSlice
         * @param {Number} x
         * @param {Number} y
         * @param {Number} w
         * @param {Number} h
         * @param {Boolean} updateDimension If true, the dimension will be set with the dimension of the slice
         */
        setSlice: function (x, y, w, h, updateDimension) {
            this.slice.position.x = x;
            this.slice.position.y = y;
            this.slice.dimension.width = w;
            this.slice.dimension.height = h;

            if (updateDimension) {
                this.resizeTo(w, h);
            }

            this.invalidate();
        },

        /**
         * @public
         * @method setImage
         * @param img {Image} new Image object. Must be already loaded before
         */
        setImage: function (img) {
            this._img = img;
            if (cgsgExist(this._img)) {
                this._setUrl(this._img.src);
            }
            else {
                this._urlImage = null;
                this.isLoaded = false;
                this.invalidate();
            }
        },

        /**
         * Set a new URL for the image of the node
         * @method setURL
         * @param {String} url
         */
        setURL: function (url) {
            this._urlImage = url;

            //first, check if the image was not already downloaded elsewhere in the application
            this._img = cgsgImgManager.get(url);
            if (cgsgExist(this._img)) {
                this._onImageLoaded(null);
            }
            else {
                delete(this._img);
                this.isLoaded = false;
                this._img = new Image();

                this._img.onload = this._createDelegate(this, this._onImageLoaded);
                this._img.onerror = this._createDelegate(this, this._onImageError);
                this._img.onabort = this._createDelegate(this, this._onImageAbort);
                this._img.src = this._urlImage;
            }
        },

        _setUrl: function (url) {
            this._urlImage = url;
            this.isLoaded = true;
            this.checkDimension();
            this.invalidate();
        },

        /**
         * return the Javascript image encapsulated in this node
         * @method getImage
         * @return {Image}
         */
        getImage: function () {
            return this._img;
        },

        /**
         * Must be defined to allow the scene graph to render the image nodes
         * @protected
         * @method render
         * @param {CanvasRenderingContext2D} context the context to render on
         * */
        render: function (context) {
            if (this.isLoaded && this._img.src !== "" && !this.slice.isEmpty()) {
                context.drawImage(
                    this._img, // image
                    this.slice.position.x,
                    this.slice.position.y, // start position on the image
                    this.slice.dimension.width,
                    this.slice.dimension.height, // dimension on the image
                    0,
                    0,
                    // position on the screen. let it to [0,0] because the 'beforeRender' function will translate the image
                    this.getWidth(),
                    this.getHeight()                // dimension on the screen
                );
            }
        },

        /**
         * @public
         * @method setEffect
         * @param {CGSGEffect} effect
         */
        setEffect: function (effect) {
            this.effect = effect;
        },

        /**
         * @public
         * @method copy
         * @return {CGSGNodeImage} a copy of this node
         */
        copy: function (node) {
            if (!cgsgExist(node)) {
                node = new CGSGNodeImage(this.position.x, this.position.y, null);
            }
            //call the super method
            node = this._super(node);

            node._urlImage = this._urlImage;

            node.effect = this.effect;
            node.isProportionalResize = this.isProportionalResize;
            node._isLoaded = this.isLoaded;

            //the image object itself
            node.setImage(this._img);

            node.setSlice(this.slice.position.x, this.slice.position.y, this.slice.dimension.width,
                          this.slice.dimension.height, true);
            node.resizeTo(this.dimension.width, this.dimension.height);

            node.onLoadEnd = this.onLoadEnd;

            return node;
        }
    }
);
// Source: src/node/class.node.animatedSprite.js
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
 * A CGSGNodeSprite represent an animated sprite, with all animations in the image
 *
 * @class CGSGNodeSprite
 * @extends CGSGNode
 * @module Node
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {String} urlImage URL of the image. Can be null to be set later
 * @type {CGSGNodeSprite}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGNodeSprite = CGSGNode.extend(
    {
        initialize: function (x, y, urlImage) {
            this._super(x, y);

            /**
             * @property classType
             * @type {String}
             */
            this.classType = "CGSGNodeSprite";

            /**
             * array of animations
             * @property listAnimations
             * @type {Array}
             */
            this.listAnimations = [];
            /**
             * @property currentAnimation
             * @default null
             * @type {Object}
             */
            this.currentAnimation = null;
            /**
             * @property isProportionalResize
             * @default true
             * @type {Boolean}
             */
            this.isProportionalResize = true;

            /**
             * Current animated frame
             * @property _currentFrame
             * @private
             * @type {Number}
             */
            this._currentFrame = 0;
            /**
             * Whether the sprite is being animated or not
             * @property _isPlaying
             * @private
             * @readonly
             * @type {Boolean}
             */
            this._isPlaying = false;

            /**
             * Number of loops for the current animation. if -1 then it's an infinite loop.
             * @property _numberOfLoops
             * @private
             * @type {Number}
             */
            this._numberOfLoops = 1;
            /**
             * Current loop number
             * @property _currentLoop
             * @private
             * @type {Number}
             */
            this._currentLoop = 0;

            /**
             * URL of the image
             * @property _urlImage
             * @type {String}
             * @private
             */
            this._urlImage = urlImage;
            /**
             * The image object itself
             * @property _img
             * @type {Image}
             * @private
             */
            this._img = new Image();

            /**
             * @property _isLoaded
             * @type {Boolean}
             * @private
             */
            this._isLoaded = false;

            /**
             * Handler function fired when the image is loaded
             * @property onLoadEnd
             * @default null
             * @type {Function}
             */
            this.onLoadEnd = null;
            /**
             * Handler function fired after an animation loop is ended
             * @property onAnimationEnd
             * @default null
             * @type {Function}
             */
            this.onAnimationEnd = null;
            /**
             * Handler function fired before an animation loop start
             * @property onAnimationStart
             * @default null
             * @type {Function}
             */
            this.onAnimationStart = null;

            ///// INITIALIZATION //////
            //finally load the image
            if (this._urlImage !== null && this._urlImage !== "") {
                this._img.onload = this._createDelegate(this, this._onImageLoaded);
                this._img.src = this._urlImage;
            }
        },

        /**
         * Used to call delegate method when the image is finally loaded
         * @private
         * @method _createDelegate
         * @param objectContext
         * @param delegateMethod
         * @return {Function}
         */
        _createDelegate: function (objectContext, delegateMethod) {
            return function () {
                return delegateMethod.call(objectContext);
            };
        },

        /**
         * fired when the image is loaded.
         * Check the dimension of the image and fired the onLoadEnd event
         * @protected
         * @method _onImageLoaded
         */
        _onImageLoaded: function () {
            this.checkDimension();
            this._isLoaded = true;
            //this._initShape();
            if (this.onLoadEnd !== null) {
                CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_LOAD_END, new CGSGEvent(this, {node: this}));
            }
            this.invalidate();
        },

        /**
         * To be overrided when the image failed to load
         * @method _onImageError
         * @protected
         */
        _onImageError: function () {
            console.log("Error while loading image : " + this._urlImage);
        },

        /**
         * Check the true dimension of the image and fill the this.dimension property with it,
         * only if dimension is not already defined in the constructor
         * @method checkDimension
         */
        checkDimension: function () {
            //if no width or height are specified in the constructor
            if (this.dimension.width <= 0 && this.dimension.height <= 0) {
                this.dimension.width = this._img.width;
                this.dimension.height = this._img.height;
            }
        },

        /**
         * Set the image for this animated sprite.
         * @example
         *
         * this.pingoo = new CGSGNodeSprite(60, 60, null, this.context);
         * this.pingoo.isDraggable = true;
         * //name, speed, frames, sliceX, sliceY, width, height, framesPerLine
         * this.pingoo.addAnimation("front", 6, 4, 476, 0, 34, 34, 4);
         * this.pingoo.play("front", null);
         *
         * //now, load the image containing the sprite sheet.
         * //The affectation to the sprite will be done in the loaded handler function
         * this.spriteSheet = new Image();
         * this.spriteSheet.onload = this.onImageLoaded();
         * this.spriteSheet.src = "images/board.png";
         *
         * onImageLoaded : function () {
		 *	 this.pingoo.setImage(this.spriteSheet);
		 *	 this.numbers.setImage(this.spriteSheet);
         *   this.water.setImage(this.spriteSheet);
		 * }
         *
         * @method setImage
         * @param {Image} newImage new Image object. Must be an already loaded one
         */
        setImage: function (newImage) {
            this._img = newImage;
            if (cgsgExist(this._img)) {
                this._urlImage = this._img.src;
                this._isLoaded = true;
                this.invalidate();
            }
        },

        /**
         * Go to the next frame of the current animation
         * @public
         * @method goToNextFrame
         */
        goToNextFrame: function () {
            this._currentFrame += 1.0 / this.currentAnimation.speed;
            var isEndOfLoop = false;
            if (this._currentFrame >= this.currentAnimation.frames) {
                isEndOfLoop = true;
            }

            //end of animation if the previous modulo returns to frame 0
            if (isEndOfLoop) {
                //if this is the end ("... my only friend.. la la...") of the loop, stop it
                if (this._numberOfLoops < 0 || this._currentLoop < this._numberOfLoops) {
                    this._currentLoop++;
                    this.goToFirstFrame();
                }
                else {
                    this.goToLastFrame();
                    this.stop();
                }
            }

            this.invalidate();
        },

        /**
         * Go to the previous frame of the current animation
         * @public
         * @method goToPreviousFrame
         */
        goToPreviousFrame: function () {
            this._currentFrame -= this.currentAnimation.speed;
            var isStartOfLoop = false;
            if (this._currentFrame < 0) {
                isStartOfLoop = true;
            }

            //end of animation if the previous modulo returns to frame 0
            if (isStartOfLoop) {
                //if this is the end ("... my only friend.. la la...") of the loop, stop it
                if (this._numberOfLoops <= 0 || this._currentLoop >= 0) {
                    this._currentLoop--;
                    this.goToLastFrame();
                }
                else {
                    this.goToFirstFrame();
                    this.stop();
                }
            }

            this.invalidate();
        },

        /**
         * Go to the first frame of the current loop
         * @public
         * @method goToFirstFrame
         */
        goToFirstFrame: function () {
            this._currentFrame = 0;
            this.invalidate();
        },

        /**
         * Go to the last frame of the current loop
         * @public
         * @method goToLastFrame
         */
        goToLastFrame: function () {
            this._currentFrame = this.currentAnimation.frames - 1;
            this.invalidate();
        },

        /**
         * Must be defined to allow the scene graph to render the image nodes
         * @protected
         * @param c {CanvasRenderingContext2D} The context to render on
         * @method render
         * */
        render: function (c) {
            if (this._isLoaded && this._img.src !== "") {

                //compute the current slice of the current sprite
                if (cgsgExist(this.currentAnimation)) {
                    c.globalAlpha = this.globalAlpha;

                    var slice = this.currentAnimation.slices[Math.floor(this._currentFrame)];

                    c.drawImage(
                        this._img, // image
                        slice.x,
                        slice.y, // start position on the image
                        this.currentAnimation.width,
                        this.currentAnimation.height, // dimension of the sprite
                        0,
                        0,
                        // position on the screen. let it to [0,0] because the 'beforeRender' function will translate the image
                        this.dimension.width,
                        this.dimension.height
                    );

                    if (this.lineWidth > 0) {
                        //Next lines are already managed by CGSGNode.
                        //I let it here just to provide an example
                        //context.lineWidth = this.lineWidth;
                        //context.strokeStyle = this.lineColor;
                        c.stroke();
                    }

                    //go to next frame
                    if (this._isPlaying) {
                        this.goToNextFrame();
                        this.invalidate();
                    }
                }
            }
        },

        /**
         * Return position x and y in the image for the slice of the animation and frame passed in parameter.
         * @private
         * @method _getSlice
         * @param {Number} frame
         * @param {Object} animation
         * @return {Object}
         */
        _getSlice: function (frame, animation) {
            var frameX = frame % animation.framesPerLine;
            var frameY = Math.floor(frame / animation.framesPerLine);

            var x = animation.sliceX + frameX * animation.width;
            var y = animation.sliceY + frameY * animation.height;

            return {x: x, y: y};
        },

        /**
         * Add an animation for this sprite
         * @public
         * @method addAnimation
         * @param {String} name Name for this animation
         * @param {Number} speed Number of frames between 2 steps
         * @param {Number} frames Number of frame for this animation
         * @param {Number} sliceX slice position inside the image for this animation
         * @param {Number} sliceY slice position inside the image for this animation
         * @param {Number} width width of 1 frame
         * @param {Number} height height of 1 frame
         * @param {Number} framesPerLine Number of frames per line in the image
         */
        addAnimation: function (name, speed, frames, sliceX, sliceY, width, height, framesPerLine) {
            var animation = {
                name         : name,
                speed        : speed,
                frames       : frames,
                sliceX       : sliceX,
                sliceY       : sliceY,
                width        : width,
                height       : height,
                framesPerLine: framesPerLine,
                slices       : []
            };

            for (var f = 0; f < frames; f++) {
                animation.slices.push(this._getSlice(f, animation));
            }

            this.listAnimations.push(animation);
            if (this.listAnimations.length === 1) {
                this.currentAnimation = animation;
            }

            this.dimension.width = width;
            this.dimension.height = height;
        },

        /**
         * Start an animation
         * @public
         * @method play
         * @param {String} animationName Name of the animation to start
         * @param {Number} loop number of animation loop. Can be null or negative to set infinite loop
         * @return {Boolean} true if the animation exists; false otherwise
         */
        play: function (animationName, loop) {
            if (loop === undefined || loop === null) {
                loop = -1;
            }

            this.currentAnimation = null;
            for (var i = 0; i < this.listAnimations.length; i++) {
                if (this.listAnimations[i].name === animationName) {
                    this.currentAnimation = this.listAnimations[i];
                    this.dimension.width = this.currentAnimation.width;
                    this.dimension.height = this.currentAnimation.height;
                    this.reset();
                    this._numberOfLoops = loop;
                    this._isPlaying = true;
                    this.resizeTo(this.currentAnimation.width, this.currentAnimation.height);
                    if (this.onAnimationStart !== null) {
                        CGSG.eventManager.dispatch(this,
                                                   cgsgEventTypes.ON_ANIMATION_START,
                                                   new CGSGEvent(this,
                                                                 {node: this, animationName: animationName, loop: loop}));
                        //this.onAnimationStart({animationName : animationName, loop : loop});
                    }
                    return true;
                }
            }
            return false;
        },

        /**
         * Stop the current animation and stay on the current frame
         * @public
         * @method stop
         */
        stop: function () {
            this._isPlaying = false;
            if (this.onAnimationEnd !== null) {
                CGSG.eventManager.dispatch(this,
                                           cgsgEventTypes.ON_ANIMATION_END,
                                           new CGSGEvent(this,
                                                         {node: this, animationName: this.currentAnimation.name, loop: this._currentLoop, frame: this._currentFrame}));
                this.onAnimationEnd({animationName: this.currentAnimation.name, loop: this._currentLoop, frame: this._currentFrame});
            }
            this.invalidate();
        },

        /**
         * return to the first frame of the first loop of the current animation
         * @public
         * @method reset
         */
        reset: function () {
            this._currentFrame = 0;
            this._currentLoop = 1;
            this.invalidate();
        },

        /**
         * @public
         * @method copy
         * @return {CGSGNodeSprite} a copy of this node
         */
        copy: function () {
            var node = new CGSGNodeSprite(this.position.x, this.position.y, this._urlImage);
            //call the super method
            node = this._super(node);

            node.listAnimations = [];
            for (var a = 0; a < this.listAnimations.length; a++) {
                node.addAnimation(this.listAnimations[a].name, this.listAnimations[a].speed,
                                  this.listAnimations[a].frames, this.listAnimations[a].sliceX,
                                  this.listAnimations[a].sliceY, this.listAnimations[a].width,
                                  this.listAnimations[a].height, this.listAnimations[a].framesPerLine);
            }

            node.currentAnimation = this.currentAnimation;
            node.isProportionalResize = this.isProportionalResize;

            node._currentFrame = this._currentFrame;
            node._isPlaying = this._isPlaying;
            node._numberOfLoops = this._numberOfLoops;
            node._currentLoop = this._currentLoop;
            node._img = this._img;
            node._isLoaded = this._isLoaded;

            node.onLoadEnd = this.onLoadEnd;
            node.onAnimationEnd = this.onAnimationEnd;
            node.onAnimationStart = this.onAnimationStart;

            if (this._urlImage !== null && this._urlImage !== "") {
                node._img.onload = node._createDelegate(node, node._onImageLoaded, node.context);
                node._img.src = node._urlImage;
            }

            return node;
        }
    }
);
// Source: src/node/class.node.button.js
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

var CGSGNodeButtonProps = CGSGObject.extend(
    {
        initialize: function () {
this.cls = [];
            this.firstColor = "";
            this.lastColor = "";
            this.shadowColor = "";
            this.radius = 0;

            this.lineWidth = 0;
            this.lineColor = "";
            this.paddingV = 10;
            this.paddingH = 10;

            /**
             * @property txtNode
             * @type {CGSGNodeText}
             */
            this.txtNode = new CGSGNodeText(0, 0, "");
            /**
             * Slice in the image for the icon
             * @property slice
             * @type {CGSGRegion}
             * @default null
             */
            this.slice = null;
            /**
             * @property icon
             * @type {CGSGNodeImage}
             * @default null
             */
            this.icon = null;
            /**
             * Computed dimensions of the button in the 3 modes.
             * Do not edit manually!
             * @property _dimensions
             * @type {Array}
             * @private
             */
            this.dimension = new CGSGDimension(10, 10);

            this._invalSize = true;
        }

    }
);

/**
 * List the modes for a button : NORMAL, OVER, DEACTIVATED, SELECTED.
 * @class CGSGButtonMode
 * @type {Object}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 * @example
 *      myTextNode.setMode(CGSGButtonMode.DEACTIVATED);
 */
var CGSGButtonMode = {
    /**
     * @property NORMAL
     */
    NORMAL: {
        id: 0,
        isClickable: true
    },
    /**
     * @property OVER
     */
    OVER: {
        id: 1,
        isClickable: true
    },
    /**
     * @property DEACTIVATED
     */
    DEACTIVATED: {
        id: 2,
        isClickable: false
    },

    /**
     * @property SELECTED
     */
    SELECTED: {
        id: 3,
        isClickable: true
    }
};

var CGSGPositionMode = {
    /**
     * @property TOP
     */
    TOP: {index: 0, decalX: 0, decalY: -1, dt: 1, dy: 1,
        computeWidth: function (item1, item2) {
            return Math.max(item1, item2);
        },
        computeHeight: function (item1, item2) {
            return 0;
        }},

    /**
     * @property BOTTOM
     */
    BOTTOM: {index: 1, decalX: 0, decalY: 1, dt: 0, dy: 1,
        computeWidth: function (item1, item2) {
            return Math.max(item1, item2);
        },
        computeHeight: function (item1, item2) {
            return 0;
        }},
    /**
     * @property LEFT
     */
    LEFT: {index: 2, decalX: -1, decalY: 0, dt: 0, dy: 0,
        computeWidth: function (item1, item2) {
            return 0;
        },
        computeHeight: function (item1, item2) {
            return Math.max(item1, item2);
        }},
    /**
     * @property RIGHT
     */
    RIGHT: {index: 3, decalX: 1, decalY: 0, dt: 1, dy: 0,
        computeWidth: function (item1, item2) {
            return 0;
        },
        computeHeight: function (item1, item2) {
            return Math.max(item1, item2);
        }}
};

/**
 * A CGSGNodeButton represent a basic square
 *
 * @class CGSGNodeButton
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {String} text
 * @type {CGSGNodeButton}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGNodeButton = CGSGNode.extend(
    {
        initialize: function (x, y, text) {
            /**
             * A properties group for each mode.
             * Index in this array corresponds to the id of the mode
             * @property _props
             * @type {CGSGNodeButtonProps[]}
             * @private
             */
            this._props = [
                new CGSGNodeButtonProps(),
                new CGSGNodeButtonProps(),
                new CGSGNodeButtonProps(),
                new CGSGNodeButtonProps()
            ];

            this._super(x, y);

            this._needRedraw = false;

            /**
             * @property _pictoPosition
             * @default CGSGPositionMode.LEFT
             * @type {CGSGPositionMode}
             * @private
             */
            this._pictoPosition = CGSGPositionMode.LEFT;

            /**
             * Distance between the picto and the text
             * @property _distancePictoText
             * @default 10
             * @type {Number}
             * @private
             */
            this._distancePictoText = 10;

            /**
             * Fake canvases to pre-render static display
             * @property _tmpCanvas
             * @type {Array}
             * @private
             */
            this._tmpCanvases = [document.createElement('canvas'),
                document.createElement('canvas'),
                document.createElement('canvas'),
                document.createElement('canvas')];

            /**
             * @property classType
             * @readonly
             * @type {String}
             * @default "CGSGNodeButton"
             */
            this.classType = "CGSGNodeButton";

            /**
             * Current mode of the button
             * @property _currentMode
             * @type {CGSGButtonMode}
             * @default CGSGButtonMode.NORMAL
             * @private
             */
            this._currentMode = CGSGButtonMode.NORMAL;

            this.setMode(this._currentMode);

            this.setClassFor("cgsg-button", CGSGButtonMode.NORMAL);
            this.setClassFor("cgsg-button-over", CGSGButtonMode.OVER);
            this.setClassFor("cgsg-button-deactivated", CGSGButtonMode.DEACTIVATED);
            this.setClassFor("cgsg-button-selected", CGSGButtonMode.SELECTED);
            this._props[0].txtNode.addClass("cgsg-button-text");
            this._props[1].txtNode.addClass("cgsg-button-over-text");
            this._props[2].txtNode.addClass("cgsg-button-deactivated-text");
            this._props[3].txtNode.addClass("cgsg-button-selected-text");

            this.setTexts(text);

            var that = this;
            this.onMouseOver = function (e) {
                if (that.getMode() === CGSGButtonMode.NORMAL) {
                    that.setMode(CGSGButtonMode.OVER);
                }
            };

            this.onMouseOut = function (e) {
                if (that.getMode() === CGSGButtonMode.OVER) {
                    that.setMode(CGSGButtonMode.NORMAL);
                }
            };

            /*CGSG.eventManager.bindHandler(this, cgsgEventTypes.ON_FREE, (function(e) {
             this.setMode(CGSGButtonMode.SELECTED);
             }).bind(this));*/

            this._isInitialized = true;
        },

        /**
         * Change the position of the picto : CGSGPositionMode.LEFT, CGSGPositionMode.TOP, CGSGPositionMode.RIGHT, CGSGPositionMode.BOTTOM
         * @method setPictoPosition
         * @param {CGSGPositionMode} p
         */
        setPictoPosition: function (p) {
            this._pictoPosition = p;
            this.forceRedraw();
        },

        /**
         * Because a button got 4 modes it also got 4 CSS management
         * @method setClassFor
         * @param cls {String}
         * @param mode {CGSGButtonMode}
         */
        setClassFor: function (cls, mode) {
            this._props[mode.id].cls = [];
            this._props[mode.id].cls.push(cls);

            this._props[mode.id]._invalSize = false;
            this._needRedraw = false;
            this._loadAttrs(mode);
            this._initShape(mode);
        },

        /**
         * Set the same CSS class for all 4 modes
         * @method setClass
         * @param cls {String}
         */
        setClass: function (cls) {
            this._clearAllCls();
            this._props[CGSGButtonMode.NORMAL.id].cls.push(cls);
            this._props[CGSGButtonMode.OVER.id].cls.push(cls);
            this._props[CGSGButtonMode.DEACTIVATED.id].cls.push(cls);
            this._props[CGSGButtonMode.SELECTED.id].cls.push(cls);

            this.invalidateTheme();
        },

        /**
         * @method setClasses
         * @param clss {Array} Array of CSS class name
         */
        setClasses: function (clss) {
            this._clearAllCls();
            this._props[CGSGButtonMode.NORMAL.id].cls.push(clss[0]);
            this._props[CGSGButtonMode.OVER.id].cls.push(clss[1]);
            this._props[CGSGButtonMode.DEACTIVATED.id].cls.push(clss[2]);
            this._props[CGSGButtonMode.SELECTED.id].cls.push(clss[3]);
            this.invalidateTheme();
        },

        _clearAllCls: function () {
            this._props[CGSGButtonMode.NORMAL.id].cls = [];
            this._props[CGSGButtonMode.OVER.id].cls = [];
            this._props[CGSGButtonMode.DEACTIVATED.id].cls = [];
            this._props[CGSGButtonMode.SELECTED.id].cls = [];
        },

        /**
         * Add CSS class for this node and for this mode only (not for bounding box, use 'setClassBBox' instead).
         * CSS class must define attributes used by this node.
         * @method addClassFor
         * @param {String} cls
         * @param mode {CGSGButtonMode}
         */
        addClassFor: function (cls, mode) {
            this._props[mode.id].cls.push(cls);

            this._props[mode.id]._invalSize = false;
            this._needRedraw = false;
            this._loadAttrs(mode);
            this._initShape(mode);
        },

        /**
         * Add CSS class for this node for all 4 modes (not for bounding box, use 'setClassBBox' instead).
         * CSS class must define attributes used by this node.
         * @method addClass
         * @param {String} cls
         */
        addClass: function (cls) {
            this._props[CGSGButtonMode.NORMAL.id].cls.push(cls);
            this._props[CGSGButtonMode.OVER.id].cls.push(cls);
            this._props[CGSGButtonMode.DEACTIVATED.id].cls.push(cls);
            this._props[CGSGButtonMode.SELECTED.id].cls.push(cls);

            this.invalidateTheme();
        },

        /**
         * Add CSS class for this node for all 4 modes (not for bounding box, use 'setClassBBox' instead).
         * CSS class must define attributes used by this node.
         * @method addClasses
         * @param {Array} clss
         */
        addClasses: function (clss) {
            this._props[CGSGButtonMode.NORMAL.id].cls.push(clss[0]);
            this._props[CGSGButtonMode.OVER.id].cls.push(clss[1]);
            this._props[CGSGButtonMode.DEACTIVATED.id].cls.push(clss[2]);
            this._props[CGSGButtonMode.SELECTED.id].cls.push(clss[3]);

            this.invalidateTheme();
        },

        /**
         * remove CSS class for this node and for this mode only (not for bounding box, use 'setClassBBox' instead).
         * @method removeClassFor
         * @param {String} cls
         * @param {CGSGButtonMode} mode
         */
        removeClassFor: function (cls, mode) {
            this._props[mode.id].cls = this._props[mode.id].cls.without(cls);
            this.forceRedraw();
            this._loadAttrs(mode);
            this._initShape(mode);
        },

        /**
         * remove CSS class for this node for all 4 modes (not for bounding box, use 'setClassBBox' instead).
         * @method removeClass
         * @param {String} cls
         */
        removeClass: function (cls) {
            this._props[CGSGButtonMode.NORMAL.id].cls = this._props[CGSGButtonMode.NORMAL.id].without(cls);
            this._props[CGSGButtonMode.OVER.id].cls = this._props[CGSGButtonMode.OVER.id].without(cls);
            this._props[CGSGButtonMode.DEACTIVATED.id].cls = this._props[CGSGButtonMode.DEACTIVATED.id].without(cls);
            this._props[CGSGButtonMode.SELECTED.id].cls = this._props[CGSGButtonMode.SELECTED.id].without(cls);

            this.invalidateTheme();
        },

        /**
         * @method setImageFor
         * @param img {Image}
         * @param mode {CGSGButtonMode}
         */
        setImageFor: function (img, mode) {
            this._props[mode.id].icon.setImage(img);
        },

        /**
         * Set the image for the picto
         * @method setImage
         * @param {Image} img
         */
        setImage: function (img) {
            this._checkIcon();

            this.setImageFor(img, CGSGButtonMode.NORMAL);
            this.setImageFor(img, CGSGButtonMode.OVER);
            this.setImageFor(img, CGSGButtonMode.DEACTIVATED);
            this.setImageFor(img, CGSGButtonMode.SELECTED);

            this._needRedraw = true;
        },

        /**
         * Set the URL for the icon for all modes
         * @method setImageURL
         * @param url
         */
        setImageURL: function (url) {
            this._checkIcon();

            this._props[CGSGButtonMode.NORMAL.id].icon.onLoadEnd = this._onLoadImageEndAll.bind(this);
            this._props[CGSGButtonMode.NORMAL.id].icon.setURL(url);
        },

        /**
         * Set the URL for the icon for all modes
         * @method setImageURL
         * @param url
         * @param mode {CGSGButtonMode}
         */
        setImageURLFor: function (url, mode) {
            this._props[mode.id].icon.onLoadEnd = this._onLoadImageEndFor.bind(this);
            this._props[mode.id].icon.setURL(url);
        },

        _onLoadImageEndFor: function () {
            this.forceRedraw();
        },

        _onLoadImageEndAll: function () {
            var img = this._props[CGSGButtonMode.NORMAL.id].icon.getImage();
            this._props[CGSGButtonMode.OVER.id].icon.setImage(img);
            this._props[CGSGButtonMode.DEACTIVATED.id].icon.setImage(img);
            this._props[CGSGButtonMode.SELECTED.id].icon.setImage(img);

            this.forceRedraw();
        },

        /**
         * Check if icon object already exist for each mode.
         * If not, create them
         * @method _checkIcon
         * @private
         */
        _checkIcon: function () {
            this._checkIconFor(CGSGButtonMode.NORMAL);
            this._checkIconFor(CGSGButtonMode.OVER);
            this._checkIconFor(CGSGButtonMode.DEACTIVATED);
            this._checkIconFor(CGSGButtonMode.SELECTED);
        },

        /**
         * @method _checkIconFor
         * @param mode
         * @private
         */
        _checkIconFor: function (mode) {
            if (!cgsgExist(this._props[mode.id].icon)) {
                this._props[mode.id].icon = new CGSGNodeImage(0, 0, null);
            }
        },

        /**
         * Return the text of the button
         * @method getText
         * @return {Array}
         */
        getTexts: function () {
            return [CGSGButtonMode.NORMAL.props.txtNode._text, CGSGButtonMode.OVER.props.txtNode._text,
                CGSGButtonMode.DEACTIVATED.props.txtNode._text, CGSGButtonMode.SELECTED.props.txtNode._text];
        },

        /**
         * Force this node to be fully recomputed during next frame
         * @method forceRedraw
         */
        forceRedraw: function () {
            this._needRedraw = true;

            this._props[CGSGButtonMode.NORMAL.id]._invalSize = true;
            this._props[CGSGButtonMode.OVER.id]._invalSize = true;
            this._props[CGSGButtonMode.DEACTIVATED.id]._invalSize = true;
            this._props[CGSGButtonMode.SELECTED.id]._invalSize = true;
        },

        /**
         * Set the values for text of the button
         * @method setText
         * @param valuess {Array}
         * @example
         *  button.setText(["normal", "over", "deactivated"]);
         */
        setTexts: function (valuess) {
            //if valuess is not an array, create an array of 4 times this values
            if (!cgsgIsArray(valuess)) {
                var v = valuess.toString();
                valuess = [v, v, v, v];
            }

            this._props[CGSGButtonMode.NORMAL.id].txtNode.setText(valuess[0], true);
            this._props[CGSGButtonMode.OVER.id].txtNode.setText(valuess[1], true);
            this._props[CGSGButtonMode.DEACTIVATED.id].txtNode.setText(valuess[2], true);
            this._props[CGSGButtonMode.SELECTED.id].txtNode.setText(valuess[3], true);

            this.forceRedraw();
        },

        /**
         * @method setTextClass
         * @param cls {String} CSS class name
         */
        setTextClass: function (cls) {
            this._props[CGSGButtonMode.NORMAL.id].txtNode.setClass(cls);
            this._props[CGSGButtonMode.OVER.id].txtNode.setClass(cls);
            this._props[CGSGButtonMode.DEACTIVATED.id].txtNode.setClass(cls);
            this._props[CGSGButtonMode.SELECTED.id].txtNode.setClass(cls);
            this.invalidate();
        },

        /**
         * @method setTextClasses
         * @param clss {Array} Array of CSS class name
         */
        setTextClasses: function (clss) {
            this._props[CGSGButtonMode.NORMAL.id].txtNode.setClass(clss[0]);
            this._props[CGSGButtonMode.OVER.id].txtNode.setClass(clss[1]);
            this._props[CGSGButtonMode.DEACTIVATED.id].txtNode.setClass(clss[2]);
            this._props[CGSGButtonMode.SELECTED.id].txtNode.setClass(clss[3]);
            this.invalidate();
        },

        /**
         * @method setTextClassFor
         * @param mode {CGSGButtonMode}
         * @param cls {String} CSS class name
         */
        setTextClassFor: function (cls, mode) {
            this._props[mode.id].txtNode.setClass(cls);
            this.invalidate();
        },

        /**
         * @method setFixedSize
         * @param {CGSGDimension} dim Can be null to remove fixed size
         */
        setFixedSize: function (dim) {
            this._props[CGSGButtonMode.NORMAL.id].dimension = dim;
            this._props[CGSGButtonMode.OVER.id].dimension = dim;
            this._props[CGSGButtonMode.DEACTIVATED.id].dimension = dim;
            this._props[CGSGButtonMode.SELECTED.id].dimension = dim;

            this._fixedSize = cgsgExist(dim);
            this.forceRedraw();
        },

        /**
         * Set the slices in the image for the 3 modes
         * @method setSlices
         * @param slices {Array} array of region for all 4 modes
         */
        setSlices: function (slices) {
            this._props[CGSGButtonMode.NORMAL.id].slice = slices[0];
            this._props[CGSGButtonMode.OVER.id].slice = slices[1];
            this._props[CGSGButtonMode.DEACTIVATED.id].slice = slices[2];
            this._props[CGSGButtonMode.SELECTED.id].slice = slices[3];
            this.forceRedraw();
        },

        /**
         * @method setSliceFor
         * @param slice {CGSGRegion}
         * @param mode {CGSGButtonMode}
         */
        setSliceFor: function (slice, mode) {
            this._props[mode.id].slice = slice;
            this._props[mode.id]._invalSize = true;

            this._initShape(mode);
        },

        /**
         * Reload theme (colors, ...) from loaded CSS file
         * @method invalidateTheme
         */
        invalidateTheme: function () {
            this._super();

            this._props[CGSGButtonMode.NORMAL.id].txtNode.invalidateTheme();
            this._props[CGSGButtonMode.OVER.id].txtNode.invalidateTheme();
            this._props[CGSGButtonMode.DEACTIVATED.id].txtNode.invalidateTheme();
            this._props[CGSGButtonMode.SELECTED.id].txtNode.invalidateTheme();

            //Use of "this._cls" class name which define the current CSS class used by this object.
            this._loadAttrs(CGSGButtonMode.NORMAL);
            this._loadAttrs(CGSGButtonMode.OVER);
            this._loadAttrs(CGSGButtonMode.DEACTIVATED);
            this._loadAttrs(CGSGButtonMode.SELECTED);

            this.invalidate();
        },

        invalidate: function () {
            if (cgsgExist(this._isInitialized) && this._isInitialized === true) {
                this._initShapes();
            }
        },

        /**
         * @method _loadAttrs
         * @param mode {CGSGButtonMode}
         * @private
         */
        _loadAttrs: function (mode) {
            var cls = this._props[mode.id].cls;
            var id = mode.id;
            var prop = this._props[id];

            var fillStyle = CGSG.cssManager.getAttrInArray(cls, "background");
            var lineWidth = CGSG.cssManager.getAttrInArray(cls, "border-width");
            var lineColor = CGSG.cssManager.getAttrInArray(cls, "border-color");
            var paddingV = CGSG.cssManager.getAttrInArray(cls, "padding-top");
            var paddingH = CGSG.cssManager.getAttrInArray(cls, "padding-left");
            var radius = CGSG.cssManager.getAttrInArray(cls, "border-radius");
            var icon = CGSG.cssManager.getAttrInArray(cls, "icon");
            if (!cgsgExist(icon)) {
                icon = CGSG.cssManager.getAttrInArray(cls, "list-style-image");
            }

            //Avoid to override previous value if no one is defined now. So check existence of new one first.
            if (cgsgExist(fillStyle)) {
                //value is given as "linear-gradient(rgb(150, 150, 150), rgb(127, 127, 127))".
                // Let's convert it to 2 hex.
                var srgb1 = fillStyle.substring(fillStyle.indexOf("rgb"), fillStyle.indexOf(")") + 1);
                var srgb2 = fillStyle.substring(fillStyle.lastIndexOf("rgb"), fillStyle.lastIndexOf(")"));
                var rgb1 = CGSGColor.fromString(srgb1);
                var rgb2 = CGSGColor.fromString(srgb2);
                prop.firstColor = CGSGColor.rgb2hex(rgb1.r, rgb1.g, rgb1.b);
                prop.lastColor = CGSGColor.rgb2hex(rgb2.r, rgb2.g, rgb2.b);
            }

            if (cgsgExist(lineColor)) {
                prop.lineColor = lineColor;
            }

            if (cgsgExist(radius)) {
                prop.radius = CGSG.cssManager.getNumber(radius);
            }

            if (cgsgExist(lineWidth)) {
                prop.lineWidth = CGSG.cssManager.getNumber(lineWidth);
            }

            if (cgsgExist(lineColor)) {
                prop.lineColor = lineColor;
            }

            if (cgsgExist(paddingV)) {
                prop.paddingV = CGSG.cssManager.getNumber(paddingV);
            }
            if (cgsgExist(paddingH)) {
                prop.paddingH = CGSG.cssManager.getNumber(paddingH);
            }

            if (cgsgExist(icon)) {
                this._checkIconFor(mode);
                this.setImageURLFor(CGSG.cssManager.getURL(icon), mode);
            }
        },

        /**
         * Increase/decrease current dimension with adding values
         * @method resizeWith
         * @param {Number} width
         * @param {Number} height
         * */
        resizeWith: function (width, height) {
            this._needRedraw = true;

            this._super(width, height);
        },

        /**
         * Pre-render the button into a temp canvas to optimize the perfs
         * @method _initShape
         * @private
         */
        _initShapes: function () {
            this._initShape(CGSGButtonMode.NORMAL);
            this._initShape(CGSGButtonMode.OVER);
            this._initShape(CGSGButtonMode.DEACTIVATED);
            this._initShape(CGSGButtonMode.SELECTED);
            this._needRedraw = false;
        },

        /**
         * Pre-render the shape for normal rendering
         * @method _initShape
         * @param mode
         * @private
         */
        _initShape: function (mode) {
            var id = mode.id;
            var prop = this._props[id];
            var txtNode = prop.txtNode;
            var tW = txtNode.getWidth(), tH = txtNode.getHeight();

            var dPT = this._distancePictoText;
            if (prop.text === "") {
                dPT = 0;
            }

            var decalPictoX = 0, decalPictoY = 0;
            var wImg = 0;
            var hImg = 0;
            if (cgsgExist(prop.icon) && prop.icon.isLoaded) {
                if (cgsgExist(prop.slice)) {
                    prop.icon.setSlice(prop.slice.position.x, prop.slice.position.y,
                        prop.slice.dimension.width, prop.slice.dimension.height,
                        true);
                }

                wImg = prop.icon.slice.dimension.width;
                hImg = prop.icon.slice.dimension.height;

                decalPictoX = (wImg + dPT) * Math.abs(this._pictoPosition.decalX);
                decalPictoY = (hImg + dPT) * Math.abs(this._pictoPosition.decalY);
            }

            if (prop._invalSize) {
                if (this._fixedSize) {
                    this.dimension.resizeTo(prop.dimension.width, prop.dimension.height);
                }
                else {
                    this.dimension.resizeTo(
                            (2 * prop.paddingH) + decalPictoX +
                            tW * Math.abs(this._pictoPosition.decalX) +
                            this._pictoPosition.computeWidth(tW, wImg),
                            (2 * prop.paddingV) + decalPictoY +
                            tH * Math.abs(this._pictoPosition.decalY) +
                            this._pictoPosition.computeHeight(tH, hImg));
                }
                prop._invalSize = false;
                this._isDimensionChanged = true;
            }
            prop.dimension = this.dimension.copy();

            this._tmpCanvases[id].width = this.dimension.width + 2 * prop.radius;
            this._tmpCanvases[id].height = this.dimension.height + 2 * prop.radius;
            var tmpContext = this._tmpCanvases[id].getContext('2d');

            cgsgClearContext(tmpContext);

            //render the panel
            tmpContext.save();
            {
                var r = prop.radius;
                tmpContext.translate(-r, -r);
                tmpContext.beginPath();

                tmpContext.moveTo(2 * r, r);
                tmpContext.lineTo(r + this.dimension.width - r, r);
                tmpContext.quadraticCurveTo(r + this.dimension.width,
                    r,
                        r + this.dimension.width,
                        r + r);
                tmpContext.lineTo(r + this.dimension.width,
                        r + this.dimension.height - r);
                tmpContext.quadraticCurveTo(r + this.dimension.width,
                        r + this.dimension.height,
                        r + this.dimension.width - r,
                        r + this.dimension.height);
                tmpContext.lineTo(r + r,
                        r + this.dimension.height);
                tmpContext.quadraticCurveTo(r,
                        r + this.dimension.height,
                    r,
                        r + this.dimension.height - r);
                tmpContext.lineTo(r, r + r);
                tmpContext.quadraticCurveTo(r, r,
                        r + r,
                    r);
                tmpContext.closePath();

                /*var gradient = tmpContext.createLinearGradient(0, 0, 0, this.dimension.height);
                 gradient.addColorStop(0, prop.firstColor);
                 gradient.addColorStop(1, prop.lastColor);
                 tmpContext.fillStyle = gradient;*/
                if (!cgsgExist(prop.lastColor)) {
                    tmpContext.fillStyle = prop.firstColor;
                }
                else {
                    var gradient = tmpContext.createLinearGradient(0, 0, 0, this.dimension.height);
                    gradient.addColorStop(0, prop.firstColor);
                    gradient.addColorStop(1, prop.lastColor);
                    tmpContext.fillStyle = gradient;
                }

                if (cgsgExist(prop.shadowColor)) {
                    tmpContext.shadowColor = prop.shadowColor;
                    tmpContext.shadowBlur = 10;
                    tmpContext.shadowOffsetX = 0;
                    tmpContext.shadowOffsetY = 0;
                }

                tmpContext.fill();

                if (cgsgExist(prop.lineColor) && prop.lineColor > 0) {
                    tmpContext.strokeStyle = prop.lineColor;
                    tmpContext.lineWidth = prop.lineWidth;
                    tmpContext.stroke();
                }
            }
            tmpContext.restore();

            var textX = (-this._pictoPosition.decalX * decalPictoX + this.getWidth() - tW) / 2;
            var textY = (-this._pictoPosition.decalY * decalPictoY + this.getHeight() - tH) / 2;

            if (cgsgExist(prop.icon) && prop.icon.isLoaded) {
                var ctX = tW / 2;

                prop.icon.translateTo(
                        textX + ctX + this._pictoPosition.decalX * (ctX + dPT + (1 - this._pictoPosition.dt) * wImg) -
                        this._pictoPosition.dy * wImg / 2,
                        (1 - this._pictoPosition.dy) * (textY + (tH - hImg) / 2) +
                        this._pictoPosition.dy * (textY - txtNode._size / 2 -
                        this._pictoPosition.dt * (dPT + hImg) +
                        (1 - this._pictoPosition.dt) * (tH + dPT))
                );

                prop.icon.doRender(tmpContext);
            }

            txtNode.translateTo(textX, textY, false);
            txtNode.doRender(tmpContext);
        },

        /**
         * Switch current mode
         * @method setMode
         * @param mode
         */
        setMode: function (mode) {
            this._currentMode = mode;
            this.isClickable = mode.isClickable;
            this.dimension.resizeTo(this._props[mode.id].dimension.width, this._props[mode.id].dimension.height);
            this._isDimensionChanged = true;
        },

        /**
         * @method getMode
         * @return {CGSGButtonMode}
         */
        getMode: function () {
            return this._currentMode;
        },

        /**
         * Custom rendering
         * @method render
         * @protected
         * @param {CanvasRenderingContext2D} context the context into render the node
         * */
        render: function (context) {
            if (this._needRedraw) {
                this._initShapes();
            }

            //render the pre-rendered canvas
            context.drawImage(this._tmpCanvases[this._currentMode.id], 0, 0);
        },

        /**
         * @method copy
         * @return {CGSGNodeSquare} a copy of this node
         */
        copy: function () {
            var node = new CGSGNodeSquare(this.position.x, this.position.y, this.dimension.width,
                this.dimension.height);
            //call the super method
            node = this._super(node);

            node.bkgcolors = this.bkgcolors;
            node.lineColor = this.lineColor;
            node.lineWidth = this.lineWidth;
            return node;
        }
    }
);
// Source: src/node/class.particles.js
/*
 * Copyright (c) 2014 Gwennael Buchet
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
 *  Terms of Use causing significant harm to Gwennael Buchet.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 *  Except as contained in this notice, the name of Gwennael Buchet shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Gwennael Buchet.
 *
 *  These Terms of Use are subject to French law.
 */


/**
 * @module Animation
 * @submodule ParticleSystem
 * @class CGSGParticle
 * @constructor
 * @param node {CGSGNode}
 * @type {CGSGParticle}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGParticle = CGSGObject.extend(
    {
        initialize: function (node) {
            /**
             * @property node
             * @type {CGSGNode}
             */
            this.node = node;

            this.node.isClickable = false;
            this.node.isResizable = false;
            this.node.isDraggable = false;

            /**
             * A void* property to let the developer store whatever he needs (new properties, ...)
             * @property userData
             * @type {*}
             * @default null
             */
            this.userData = null;

            this.init();
        },

        /**
         * Initialize attributes of this particle
         * @public
         * @method init
         */
        init: function () {
            //this.direction = new CGSGVector2D(1, 0);
            this.position = new CGSGPosition(0.0, 0.0);
            this.mass = 1000;
            this.initVelocity(new CGSGVector2D(1.0, 1.0));
            this.checkCTL = null;
            this.isAlive = true;
            this.age = 0;

            //this._gravity = new CGSGVector2D(0.0, 0.0);
            //this._forceTotal = new CGSGVector2D(0.0, 0.0);
            this._acceleration = new CGSGVector2D(0.0, 0.0);

            this.speedThreshold = 0.0;
        },

        /**
         * @public
         * @method initPosition
         * @param {Number} x
         * @param {Number} y
         */
        initPosition: function (x, y) {
            this.position.x = x;
            this.position.y = y;
            this.node.translateTo(x, y);
        },

        /**
         * @public
         * @method initVelocity
         * @param {CGSGVector2D} velocity
         */
        initVelocity: function (velocity) {
            this.velocity = velocity.copy();
            this.velocity.normalize();
        },

        /**
         * @public
         * @method initSpeedThreshold
         * @param {Number} st
         */
        initSpeedThreshold: function (st) {
            this.speedThreshold = st;
        },

        /**
         * update the particle position with an Euler integration
         * TODO : externalize the process to choose between RK4 and Euler integration
         * @public
         * @method updatePosition
         * @param {Number} deltaTime
         * @param {Number} acceleration
         * @return {*}
         */
        updatePosition: function (deltaTime, acceleration) {
            if (isNaN(deltaTime)) {
                deltaTime = 1.0;
            }

            deltaTime += this.speedThreshold;

            this._acceleration.x = acceleration.x / this.mass;
            this._acceleration.y = acceleration.y / this.mass;

            this.velocity.x += this._acceleration.x * deltaTime;
            this.velocity.y += this._acceleration.y * deltaTime;

            this.position.x += this.velocity.x * deltaTime;
            this.position.y += this.velocity.y * deltaTime;

            if (this.node !== null) {
                this.node.translateTo(this.position.x, this.position.y);
            }

            //increment age of the particle
            this.age += deltaTime;

            //check the viablity of the particle
            if (cgsgExist(this.checkCTL)) {
                this.isAlive = this.checkCTL(this);
            }
            return this.isAlive;
        }
    }
);

/**
 * A particle emitter for the cgSceneGraph Particle System
 * @class CGSGParticleEmitter
 * @extends {CGSGNode}
 * @module Animation
 * @submodule ParticleSystem
 * @constructor
 * @param {Function} nodeConstructor
 * @param {CGSGRegion} region
 * @param {Number} nbParticlesMax
 * @param {Number} velocity
 * @param {Number} angle
 * @param {Number} speed
 * @param {Number} speedThreshold
 * @param {Number} outflow
 * @type {CGSGParticleEmitter}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGParticleEmitter = CGSGNode.extend(
    {
        initialize: function (nodeConstructor, region, nbParticlesMax, velocity, angle, speed, speedThreshold, outflow) {
            this._super(region.position.x, region.position.y);
            this.resizeTo(region.dimension.width, region.dimension.height);

            /**
             * @property classType
             * @type {String}
             */
            this.classType = "CGSGParticleEmitter";

            this._nodeContructor = nodeConstructor;
            /**
             * the region from where the particles are emitted
             * @property region
             * @type {CGSGRegion}
             */
            this.region = region;
            /**
             * number max of particles out of the emitter on 1 frame
             * @property nbParticlesMax
             * @type {Number}
             */
            this.nbParticlesMax = nbParticlesMax;
            /**
             * @property velocity
             * @type {CGSGVector2D}
             */
            this.velocity = new CGSGVector2D(0.0, 0.0);
            if (cgsgExist(velocity)) {
                this.velocity = velocity;
            }
            /**
             * angle range of emission. a particle is emitted in the this.direction vector + or - this.angle/2 angle.
             * @property angle
             * @type {Number}
             */
            this.angle = Math.PI / 5.0;
            if (cgsgExist(angle)) {
                this.angle = angle;
            }

            /**
             * speed of a particle
             * @property speed
             * @type {Number}
             */
            this.speed = 1.0;
            if (cgsgExist(speed)) {
                this.speed = speed;
            }
            /**
             * threshold to randomize and add to the speed of a particle
             * @property speedThreshold
             * @type {Number}
             */
            this.speedThreshold = 1.0;
            if (cgsgExist(speedThreshold)) {
                this.speedThreshold = speedThreshold;
            }

            /**
             * @property outflow
             * @type {Number}
             */
            this.outflow = 0;
            if (cgsgExist(outflow)) {
                this.outflow = outflow;
            }

            this._currentFrame = this.outflow;

            //list of the particles
            this._particles = [];
            this._isPlaying = false;
            this._forces = [];
            this._acceleration = new CGSGVector2D(0.0, 0.0);

            /**
             * Gravity Force added by default with the addForce method
             * @property gravity
             * @type {Object}
             */
            this.gravity = this.addForce(new CGSGVector2D(0.0, 9.81), null);

            /**
             * Callback on end of update for 1 particle
             * @property onUpdateParticleEnd
             * @default null
             * @type {function}
             */
            this.onUpdateParticleEnd = null;
            /**
             * Callback when reinit for 1 particle
             * @property onInitParticle
             * @default null
             * @type {function}
             */
            this.onInitParticle = null;
            /**
             * Callback when reinit all particles is done
             * @property onInitParticlesEnd
             * @default null
             * @type {function}
             */
            this.onInitParticlesEnd = null;
        },

        /**
         * start the animation
         * @public
         * @method start
         */
        start: function () {
            this._isPlaying = true;
        },

        /**
         * stop the animation
         * @public
         * @method stop
         */
        stop: function () {
            this._isPlaying = false;
        },

        /**
         * reset the animation
         * @public
         * @method reset
         */
        reset: function () {
            var p;
            this._currentFrame = 0;
            //free the memory
            for (p = this._particles.length - 1; p >= 0; p--) {
                this.removeChild(this._particles[p].node, true);
                delete (this._particles[p]);
            }
            this._particles.clear();
        },

        /**
         * @public
         * @method render
         * @param context
         */
        render: function (context) {
            var f, p;
            this.beforeRender(context);

            //update the acceleration of the particles, based on the current forces
            this._acceleration.initialize(0.0, 0.0);
            for (f = this._forces.length - 1; f >= 0; f--) {
                this._acceleration.x += this._forces[f].vector.x;
                this._acceleration.y += this._forces[f].vector.y;

                if (this._forces[f].ctl !== null) {
                    this._forces[f].age++;
                    if (this._forces[f].age >= this._forces[f].ctl) {
                        this.removeForce(this._forces[f]);
                    }
                }
            }

            //updates all particles
            for (p = 0; p < this._particles.length; p++) {
                if (this._isPlaying) {
                    if (!this._particles[p].isAlive || !this.updateParticle(this._particles[p])) {
                        this.initParticle(this._particles[p], p);
                    }
                }

                this._particles[p].node.render(context);
            }

            //if not all of the particles are out
            if (this._particles.length < this.nbParticlesMax) {
                this._currentFrame++;
                if (this._currentFrame >= this.outflow) {
                    this._currentFrame = 0;
                    this._createParticle(this._particles.length);
                }
            }

            //restore state
            //this.afterRender(context);
            context.restore();
        },

        /**
         * create a new particle, and add it to the emitter
         * @private
         * @method _createParticle
         * @param {Number} index
         */
        _createParticle: function (index) {
            var node = this._nodeContructor();
            var particle = new CGSGParticle(node);
            this.initParticle(particle, index);
            this.addChild(particle.node);
            this._particles.push(particle);
        },

        /**
         * @public
         * @method initParticle
         * @param {CGSGParticle} particle
         * @param {Number} index
         */
        initParticle: function (particle, index) {
            particle.init();
            //set a random position inside the region of this emitter
            particle.initPosition(Math.random() * this.region.dimension.width,
                    Math.random() * this.region.dimension.height);

            //set a random direction inside the angle
            var velocity = this.velocity.copy();
            var halfAngle = this.angle / 2.0;
            velocity.rotate(-halfAngle + Math.random() * this.angle);
            particle.initVelocity(velocity);

            particle.initSpeedThreshold(-this.speedThreshold + Math.random() * this.speedThreshold * 2.0);

            if (this.onInitParticle !== null) {
                CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_INIT_PARTICLE,
                    new CGSGEvent(this, {index: index, particle: particle}));
                //this.onInitParticle({index : index, particle : particle});
                //this.onInitParticle({data :{index : index, particle : particle}});
            }
        },

        /**
         * @public
         * @method updateParticle
         * @param {CGSGParticle} particle
         * @return {Boolean}
         */
        updateParticle: function (particle) {
            //first, update the position of the particle node
            var isAlive = particle.updatePosition(this.speed, this._acceleration);

            //finally, call the update method of the particle node to apply extra animations
            //if (this.onUpdateParticleEnd !== null) {
            this.onUpdateParticleEnd &&
            CGSG.eventManager.dispatch(this,
                cgsgEventTypes.ON_UPDATE_PARTICLE_END,
                new CGSGEvent(this, {particle: particle}));
            //this.onUpdateParticleEnd(particle);
            //this.onUpdateParticleEnd({data:{particle : particle}});
            //}

            return isAlive;
        },

        /**
         * Add a force to the emitter
         * @public
         * @method addForce
         * @param {CGSGVector2D} vector
         * @param {Number} ttl time to live of the force
         * @return {Object}
         */
        addForce: function (vector, ttl) {
            var force = {vector: vector, ctl: ttl, age: 0};
            this._forces.push(force);
            return force;
        },

        /**
         * Remove a previously added force
         * @public
         * @method removeForce
         * @param {Object} force
         */
        removeForce: function (force) {
            this._forces.without(force);
        }/*,

     addImpulse : function(point, force, ttl) {
     for (var p = 0; p < this._particles.length; p++) {
     this._particles[p].addImpulse(point, force, ttl);
     }
     }*/
    }
);

/**
 * A particle System object.
 * @class CGSGParticleSystem
 * @extends {CGSGNode}
 * @module Animation
 * @submodule ParticleSystem
 * @type {CGSGParticleSystem}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGParticleSystem = CGSGNode.extend(
    {
        initialize: function (x, y) {
            this._super(x, y);

            /**
             * @property classType
             * @type {String}
             */
            this.classType = "CGSGParticleSystem";

            /**
             * list of emitters
             * @property emitters
             * @type {Array}
             */
            this.emitters = [];
            /**
             * list of attractors
             * @property attractors
             * @type {Array}
             */
            this.attractors = [];
            /**
             * list of repulsors
             * @property repulsors
             * @type {Array}
             */
            this.repulsors = [];

            this.isClickable = false;
            this.isResizable = false;
            this.isDraggable = false;
            this.isTraversable = false;

            //factory pattern
            //this.integrator = new CGSGParticleIntegratorEuler();
            //this.integrator = new CGSGParticleIntegratorRK4();
        },

        /**
         * Add a force to all emitters
         * @public
         * @method addForce
         * @param {CGSGVector2D} vector
         */
        addForce: function (vector) {
            for (var e = 0; e < this.emitters.length; e++) {
                this.emitters[e].addForce(vector);
            }
        },

        /*addImpulse : function(point, force, ttl) {
         for (var e = 0; e < this.emitters.length; e++) {
         this.emitters[e].addImpulse(point, force, ttl);
         }
         },*/

        /**
         * Create a new emitter and return it
         * @public
         * @method addEmitter
         * @param {CGSGNode} node
         * @param {CGSGRegion} region
         * @param {Number} nbParticlesMax
         * @param {Number} velocity
         * @param {Number} angle
         * @param {Number} speed
         * @param {Number} speedThreshold
         * @param {Number} outflow
         * @return {CGSGParticleEmitter}
         */
        addEmitter: function (node, region, nbParticlesMax, velocity, angle, speed, speedThreshold, outflow) {
            var emitter = new CGSGParticleEmitter(node, region, nbParticlesMax, velocity, angle, speed, speedThreshold,
                outflow);
            this.addChild(emitter);
            this.emitters.push(emitter);
            return emitter;
        },

        /**
         * Remove the emitter passed in parameter
         * @public
         * @method removeEmitter
         * @param {CGSGParticleEmitter} emitter
         */
        removeEmitter: function (emitter) {
            this.emitters.without(emitter);
            this.removeChild(emitter, true);
        },

        /**
         * @public
         * @method addAttractor
         * @param {CGSGPosition} position
         * @param {Number} strength
         * @param {Number} distance
         * @return {Object}
         */
        addAttractor: function (position, strength, distance) {
            var attractor = {
                position: position,
                strength: strength,
                distance: distance
            };
            this.attractors.push(attractor);
            return attractor;
        },

        /**
         * @public
         * @method removeAttractor
         * @param {Object} attractor
         */
        removeAttractor: function (attractor) {
            this.attractors.without(attractor);
        },

        /**
         * @public
         * @method addRepulsor
         * @param {CGSGPosition} position
         * @param {Number} strength
         * @param {Number} distance
         * @return {Object}
         */
        addRepulsor: function (position, strength, distance) {
            var repulsor = {
                position: position,
                strength: strength,
                distance: distance
            };
            this.repulsors.push(repulsor);
            return repulsor;
        },

        /**
         * @public
         * @method removeRepulsor
         * @param {Object} repulsor
         */
        removeRepulsor: function (repulsor) {
            this.repulsors.without(repulsor);
        },

        /**
         * override the CGSGNode 'pickNode' method to return null due to performance
         * @protected
         * @method pickNode
         * @param mousePosition
         * @param absoluteScale
         * @param ghostContext
         * @param recursively
         * @param condition
         * @return {*}
         */
        pickNode: function (mousePosition, absoluteScale, ghostContext, recursively, condition) {
            return null;
        },

        /**
         * @public
         * @method copy
         * @todo : fill the method
         * @return {CGSGParticleSystem}
         */
        copy: function () {
            var node = new CGSGParticleSystem();
            node = this._super(node);

            return node;
        }
    }
);// Source: src/class.scenegraph.js
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
 * Represent the scene graph it self.
 *
 * @class CGSGSceneGraph
 * @module Scene
 * @constructor
 * @extends {Object}
 * @param {HTMLElement} canvas a handler to the canvas HTML element
 * @param {CanvasRenderingContext2D} context context to render on
 * @type {CGSGSceneGraph}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGSceneGraph = CGSGObject.extend(
    {
        initialize: function (canvas, context) {

            /**
             * Root node of the graph
             * @property root
             * @type {CGSGNode}
             */
            this.root = null;

            /**
             * @property context
             * @type {CanvasRenderingContext2D}
             */
            this.context = context;

            /**
             *
             * @property _nextNodeID
             * @type {Number}
             * @private
             */
            this._nextNodeID = 1;

            ///// INITIALIZATION //////

            /**
             * Initialize a ghost canvas used to determine which nodes are selected by the user
             * @property ghostCanvas
             * @type {HTMLElement}
             */
            this.ghostCanvas = document.createElement('canvas');
            this.initializeGhost(canvas.width, canvas.height);

            //fixes a problem where double clicking causes text to get selected on the canvas
            CGSG.canvas.onselectstart = function () {
                return false;
            };
        },

        /**
         * Initialize the ghost rendering, used by the PickNode function
         * @private
         * @method initializeGhost
         * @param w {Number} width The width for the canvas. Must be the same as the rendering canvas
         * @param h {Number} height The height for the canvas. Must be the same as the rendering canvas
         * */
        initializeGhost: function (w, h) {
            this.ghostCanvas.height = h;
            this.ghostCanvas.width = w;
            //noinspection JSUndeclaredVariable
            CGSG.ghostContext = this.ghostCanvas.getContext('2d');
        },

        /**
         * Used to enforce theme invalidation for each node during next rendering loop
         * @method invalidateTheme
         */
        invalidateTheme: function () {
            this._invalidateThemeRecursive(this.root);
        },

        /**
         * @method _invalidateThemeRecursive
         * @param n
         * @private
         */
        _invalidateThemeRecursive: function (n) {
            if (cgsgExist(n)) {
                n.invalidateTheme();

                for (var i = 0, len = n.children.length; i < len; ++i) {
                    this._invalidateThemeRecursive(n.children[i]);
                }
            }
        },

        /**
         * Render the SceneGraph
         * @public
         * @method render
         * */
        render: function () {
            //erase previous rendering
            cgsgClearContext(this.context);
            var i, node;

            if (cgsgExist(this.root)) {
                var evt, key = null;
                //set the new values for all the animated nodes
                if (CGSG.animationManager.listTimelines.length > 0) {
                    node = null;
                    var value, tl; //tl = timeline
                    for (i = CGSG.animationManager.listTimelines.length - 1; i >= 0; --i) {
                        tl = CGSG.animationManager.listTimelines[i];
                        node = tl.parentNode;

                        if (node.isVisible) {
                            value = tl.getValue(CGSG.currentFrame);
                            if (value !== undefined) {
                                node.evalSet(tl.attribute, value);
                                if (tl.onAnimate !== null) {
                                    CGSG.eventManager.dispatch(tl, cgsgEventTypes.ON_ANIMATE,
                                                               new CGSGEvent(this,
                                                                             {node: node, attribute: tl.attribute, value: value}));
                                }
                            }

                            //fire event if this is the first animation key for this tl
                            key = tl.getFirstKey();
                            if (key !== null && key.frame === CGSG.currentFrame &&
                                tl.onAnimationStart !== null) {
                                evt = new CGSGEvent(this, {node: node});
                                evt.node = node;
                                CGSG.eventManager.dispatch(tl, cgsgEventTypes.ON_ANIMATION_START, evt);
                            }

                            //fire event if this is the last animation key for this tl
                            key = tl.getLastKey();
                            if (key !== null && key.frame === CGSG.currentFrame) {
                                tl.removeAll();
                                if (tl.onAnimationEnd !== null) {
                                    evt = new CGSGEvent(this, {node: node});
                                    evt.node = node;
                                    evt.attribute = tl.attribute;
                                    CGSG.eventManager.dispatch(tl, cgsgEventTypes.ON_ANIMATION_END, evt);
                                }
                            }
                        }
                    }
                }

                //run the rendering traverser
                this.context.save();
                this.context.scale(CGSG.displayRatio.x, CGSG.displayRatio.y);
                if (this.root.isVisible) {
                    this.root.doRender(this.context);
                }
                this.context.restore();
            }

            //draw the selection markers around the selected nodes
            if (CGSG.isBoundingBoxOnTop && CGSG.selectedNodes.length > 0) {
                for (i = CGSG.selectedNodes.length - 1; i >= 0; i--) {
                    node = CGSG.selectedNodes[i];
                    if (node.isVisible) {
                        //todo valider l'interet de calculer la matrice absolue
                        node.computeAbsoluteMatrix(true);

                        this.context.save();
                        this.context.scale(CGSG.displayRatio.x, CGSG.displayRatio.y);

                        var t = node.getAbsPosition();

                        this.context.translate(t.x, t.y);

                        if (cgsgExist(node.rotationCenter)) {

                            this.context.translate(node.dimension.width * node.rotationCenter.x,
                                                   node.dimension.height * node.rotationCenter.y);
                            this.context.rotate(node.rotation.angle);
                            this.context.translate(-node.dimension.width * node.rotationCenter.x,
                                                   -node.dimension.height * node.rotationCenter.y);
                        }
                        else {
                            this.context.rotate(node.rotation.angle);
                        }
                        this.context.scale(node._absSca.x, node._absSca.y);

                        node.renderBoundingBox(this.context);
                        this.context.restore();
                    }
                }
            }

            CGSG.currentFrame++;
        },

        /**
         * Change the dimension of the canvas.
         * Does not really change the dimension of the rendering canvas container,
         *  but is used for different computations
         * @method setCanvasDimension
         * @param {CGSGDimension} newDimension
         * */
        setCanvasDimension: function (newDimension) {
            this.initializeGhost(newDimension.width, newDimension.height);
        },

        /**
         * Mark the nodes as selected so the select marker (also called selectedHandlers)
         *  will be shown and the SceneGraph will manage the moving and resizing of the selected objects.
         * @method selectNode
         * @param nodeToSelect The CGSGNode to be selected
         * */
        selectNode: function (nodeToSelect) {
            if (!nodeToSelect.isSelected) {
                nodeToSelect.setSelected(true);
                nodeToSelect.computeAbsoluteMatrix(false);
                CGSG.selectedNodes[CGSG.selectedNodes.length] = nodeToSelect;
            }
        },

        /**
         * Mark the nodes as not selected
         * @method deselectNode
         * @param {CGSGNode} nodeToDeselect
         * */
        deselectNode: function (nodeToDeselect) {
            nodeToDeselect.setSelected(false);
            /*CGSG.selectedNodes = */
            CGSG.selectedNodes.without(nodeToDeselect);
        },

        /**
         * Mark all nodes as not selected
         * @method deselectAll
         * @param {Array} excludedArray CGSGNodes to not deselect
         * */
        deselectAll: function (excludedArray) {
            var node = null;
            for (var i = CGSG.selectedNodes.length - 1; i >= 0; i--) {
                node = CGSG.selectedNodes[i];
                if (!cgsgExist(excludedArray) || !excludedArray.contains(node)) {
                    this.deselectNode(node);
                }
            }

            //just to be sure
            CGSG.selectedNodes.clear();
        },

        /**
         * Recursively traverse the nodes and return the one who is under the mouse coordinates
         * @method pickNode
         * @param {CGSGPosition} mousePosition
         * @param {String} condition
         * @return {CGSGNode}
         * @example
         *  this.scenegraph.picknode(mousePosition, 'position.x > 100'); <br/>
         *  this.scenegraph.picknode(mousePosition, 'position.x > 100 && this.position.y > 100');
         */
        pickNode: function (mousePosition, condition) {
            //empty the current selection first
            //CGSG.selectedNodes = new Array();
            cgsgClearContext(CGSG.ghostContext);
            //recursively traverse the nodes to get the selected nodes
            if (!cgsgExist(this.root)) {
                return null;
            }
            else {
                return this.root.pickNode(
                    mousePosition.copy(), //position of the cursor on the viewport
                    new CGSGScale(1, 1), //absolute scale for the nodes
                    CGSG.ghostContext, //context for the ghost rendering
                    true, //recursively ?
                    //CGSG.canvas.width / CGSG.displayRatio.x, CGSG.canvas.height / CGSG.displayRatio.y,
                    //dimension of the canvas container
                    condition);  // condition to the picknode be executed
            }
        },

        /**
         * Recursively traverse the nodes and return the ones who are under the mouse coordinates
         * @method pickNodes
         * @param {CGSGRegion} region
         * @param {String} condition
         * @return {Array}
         * @example
         *  this.scenegraph.picknodes(region, 'position.x > 100'); <br/>
         *  this.scenegraph.picknodes(region, 'position.x > 100 && this.position.y > 100');
         */
        pickNodes: function (region, condition) {
            //empty the current selection first
            //CGSG.selectedNodes = new Array();
            cgsgClearContext(CGSG.ghostContext);
            //recursively traverse the nodes to get the selected nodes
            if (!cgsgExist(this.root)) {
                return null;
            }
            else {
                return this.root.pickNodes(
                    region.copy(), //position of the cursor on the viewport
                    new CGSGScale(1, 1), //absolute scale for the nodes
                    CGSG.ghostContext, //context for the ghost rendering
                    true, //recursively ?
                    //CGSG.canvas.width / CGSG.displayRatio.x, CGSG.canvas.height / CGSG.displayRatio.y,
                    //dimension of the canvas container
                    condition);  // condition to the picknode be executed
            }
        },

        /**
         * Remove the child nodes passed in parameter, from the root nodes
         * @method removeNode
         * @param {CGSGNode} node the nodes to remove
         * @return {Boolean} true if the nodes was found and removed
         * */
        removeNode: function (node) {
            if (cgsgExist(node)) {
                this.deselectNode(node);
                if (this.root !== null) {
                    return this.root.removeChild(node, true);
                }
            }
            return false;
        },

        /**
         * Add a node on the scene.
         * If the root does not already exist, this node will be used as root
         * @method addNode
         * @param {CGSGNode} node the node to add
         * @param {CGSGNode} parent the parent node of the new one. If it's null, the node will be the root.
         * */
        addNode: function (node, parent) {
            node._id = this._nextNodeID++;
            if (this.root === null) {
                this.root = node;
            }
            else {
                if (parent === null) {
                    parent = this.root;
                }
                parent.addChild(node);
            }
        }
    }
);
// Source: src/class.view.js
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
 * */



/**
 * Provides requestAnimationFrame in a cross browser way.
 * @property cgsgGlobalRenderingTimer
 * @private
 * @type {Number}
 */
var cgsgGlobalRenderingTimer = null;
//var cgsgGlobalFramerate = CGSG_DEFAULT_FRAMERATE;
(function () {
var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
        window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 17 - (currTime - lastTime)); //1000/60 = 16.667
            cgsgGlobalRenderingTimer = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            //return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}());

/**
 * Represent the scene of the application.
 * It encapsulates the scene graph itself and several methods to track mouse and touch events, ...
 *
 * @class CGSGView
 * @constructor
 * @module Scene
 * @main Scene
 * @extends {Object}
 * @param {HTMLElement} canvas a handler to the canvas HTML element
 * @type {CGSGView}
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 */
var CGSGView = CGSGObject.extend(
    {
        initialize: function (canvas) {

            //detect the current explorer to apply correct parameters
            cgsgDetectCurrentExplorer();

            //for IE10 on Win8 : disable the default touch actions
            if (typeof canvas.style.msTouchAction !== 'undefined') {
                canvas.style.msTouchAction = "none";
            }

            //noinspection JSUndeclaredVariable
            CGSG.canvas = canvas;
            //noinspection JSUndeclaredVariable
            CGSG.context = CGSG.canvas.getContext("2d");

            /**
             * Multiselection boolean.
             * @property allowMultiSelect
             * @default true
             * @type {Boolean}
             */
            this.allowMultiSelect = true;

            /**
             * Fill color for the drag selection selection rectangle
             * @property dragSelectFillColor
             * @type {String}
             */
            this.dragSelectFillColor = null;

            /**
             * Stroke color for the drag selection selection rectangle
             * @property dragSelectStrokeColor
             * @type {String}
             */
            this.dragSelectStrokeColor = null;

            /**
             * Stroke width for the drag selection selection rectangle
             * @property dragSelectStrokeWidth
             * @type {String}
             */
            this.dragSelectStrokeWidth = null;

            /**
             * Alpha value for the drag selection rectangle
             * @property dragSelectAlpha
             * @default 0.6
             * @type {Number}
             */
            this.dragSelectAlpha = CGSG_DEFAULT_DRAG_SELECT_ALPHA;

            //noinspection JSUndeclaredVariable
            this.dblBuffer = true;
            if (this.dblBuffer) {
                this._updateDblBuffer();
                CGSG.sceneGraph = new CGSGSceneGraph(CGSG.canvas, this._cacheCtx);
            }
            else {
                CGSG.sceneGraph = new CGSGSceneGraph(CGSG.canvas, CGSG.context);
            }

            /*
             * If true, framework will take care of multi-touch : NOT EFFECTIVE YET
             * @property multitouch
             * @default false
             * @type {Boolean}
             */
            //this.multitouch = false;

            ////// @private /////////
            /**
             * @property _isRunning
             * @type {Boolean}
             * @private
             */
            this._isRunning = false;
            // when set to true, the canvas will redraw everything
            // invalidateTransformation() just sets this to false right now
            // we want to call invalidateTransformation() whenever we make a change
            this._needRedraw = true;

            /**
             * @property _frameContainer Handler to the HTML Element displaying the FPS
             * @type {HTMLElement}
             * @private
             */
            this._frameContainer = null;

            /**
             * True if the [CTRL} key is being pressed
             * @property _keyDownedCtrl
             * @default false
             * @type {Boolean}
             * @private
             */
            this._keyDownedCtrl = false;

            /**
             * @property _timerDblTouch
             * @default null
             * @type {Number}
             * @private
             */
            this._timerDblTouch = null;

            /**
             * The delay between 2 touches to be considered as a dbl touch event.
             * To remove the double touch, just set it to 0
             * @property dblTouchDelay
             * @default CGSG_DEFAULT_DBLTOUCH_DELAY
             * @type {Number}
             */
            this.dblTouchDelay = CGSG_DEFAULT_DBLTOUCH_DELAY;

            /**
             * Current positions of the mouse or touch (Array of CGSGPosition)
             * @property _mousePos
             * @type {Array}
             * @private
             */
            this._mousePos = [];
            this._mouseOldPosition = [];
            this._dragStartPos = [];
            this._dragEndPos = [];
            this._isDrag = false;
            this._isResizeDrag = false;
            this._isDragSelect = false;
            this._resizingDirection = -1;
            this._isDblClick = false;
            this._mouseUpCount = 0; // counter used to identify dbl click action
            this._timeoutDblClick = null;
            this._isPressing = false;
            //this._frameRatio = 0;

            /**
             * @property _listCursors List of the names for the cursor when overring a handlebox
             * @type {Array}
             * @private
             */
            this._listCursors =
            ['nw-resize', 'n-resize', 'ne-resize', 'w-resize', 'e-resize', 'sw-resize',
             's-resize', 'se-resize'];
            this._offsetX = 0;
            this._offsetY = 0;
            /**
             * @property _selectedNode The current last selected node
             * @type {null}
             * @private
             */
            this._selectedNode = null;

            //Experimental : double-buffer for the temporary rendering
            /*this._dblCanvas = document.createElement('canvas');
             this._dblContext = null;*/

            ////// INITIALIZATION /////////

            //use an external variable to define the scope of the processes
            var scope = this;
            CGSG.canvas.onmouseout = function (e) {
                scope.onMouseOutHandler(e);
            };

            CGSG.canvas.onmousedown = function (e) {
                scope.onMouseDown(e);
            };
            CGSG.canvas.onmouseup = function (e) {
                scope.onMouseUp(e);
            };
            CGSG.canvas.ondblclick = function (e) {
                scope.onMouseDblClick(e);
            };
            CGSG.canvas.onmousemove = function (e) {
                scope.onMouseMove(e);
            };
            document.onkeydown = function (e) {
                scope.onKeyDownHandler(e);
            };
            document.onkeyup = function (e) {
                scope.onKeyUpHandler(e);
            };
            CGSG.canvas.addEventListener('touchstart', function (e) {
                scope.onTouchStart(e);
            }, false);
            CGSG.canvas.addEventListener('touchmove', function (e) {
                scope.onTouchMove(e);
            }, false);
            CGSG.canvas.addEventListener('touchend', function (e) {
                scope.onTouchEnd(e);
            }, false);

            CGSG.canvas.addEventListener('MSPointerDown', function (e) {
                scope.onTouchStart(e);
            }, false);
            CGSG.canvas.addEventListener("MSPointerMove", function (e) {
                scope.onTouchMove(e);
            }, false);
            CGSG.canvas.addEventListener('MSPointerUp', function (e) {
                scope.onTouchEnd(e);
            }, false);

            this._lastUpdate = new Date().getTime();

            this._nodeMouseOver = null;

            /**
             * Callback on click down on scene event.
             * @property onSceneClickStart
             * @default null
             * @type {Function}
             * @example
             *  this.onSceneClickStart = function (event) {
			 *      event.position; //Array of CGSGPosition
			 *      event.event; //Event
			 *  }
             */
            this.onSceneClickStart = null;
            /**
             * Callback on click up on scene event
             * @property onSceneClickEnd
             * @default null
             * @type {Function}
             * @example
             *  this.onSceneClickEnd = function (event) {
			 *      event.position; //Array of CGSGPosition
			 *      event.event; //Event
			 *  }
             */
            this.onSceneClickEnd = null;
            /**
             * Callback on double click start on scene event
             * @property onSceneDblClickStart
             * @default null
             * @type {Function}
             * @example
             *  this.onSceneDblClickStart = function (event) {
			 *      event.position; //Array of CGSGPosition
			 *      event.event; //Event
			 *  }
             */
            this.onSceneDblClickStart = null;
            /**
             * Callback on double click up on scene event
             * @property onSceneDblClickEnd
             * @default null
             * @type {Function}
             * @example
             *  this.onSceneDblClickEnd = function (event) {
			 *      event.position; //Array of CGSGPosition
			 *      event.event; //Event
			 *  }
             */
            this.onSceneDblClickEnd = null;
            /**
             * Callback on start rendering event
             * @property onRenderStart
             * @default null
             * @type {Function}
             * @example
             *  this.onSceneClickStart = function () {
			 *      //...
			 *  }
             */
            this.onRenderStart = null;
            /**
             * Callback on end rendering event
             * @property onRenderEnd
             * @default null
             * @type {Function}
             * @example
             *  this.onRenderEnd = function () {
			 *      //...
			 *  }
             */
            this.onRenderEnd = null;
            /**
             * Callback on frame average changed event.
             * @property onSceneAverageFtpChanged
             * @default null
             * @type {Function}
             * @example
             *  this.onSceneAverageFtsChanged = function (event) {
			 *      event.fps; // The average FPS  }
             */
            this.onSceneAverageFpsChanged = null;

            //initialize the current frame to 0
            //noinspection JSUndeclaredVariable
            CGSG.currentFrame = 0;
            this._fpss = null;

            this._r = {x: 0, y: 0};
            this._d = {dW: 0, dH: 0};

            //if CSS files was declared in <head> tag of index.html file, so we have to ask the framework
            // to load all components in cache
            this.invalidateTheme();
        },

        /**
         * @method _updateDblBuffer
         * @private
         */
        _updateDblBuffer: function () {
            if (!cgsgExist(this._cacheCanvas)) {
                this._cacheCanvas = document.createElement('canvas');
                this._cacheCtx = this._cacheCanvas.getContext('2d');
            }
            this._cacheCanvas.width = CGSG.canvas.width;
            this._cacheCanvas.height = CGSG.canvas.height;
            cgsgClearContext(this._cacheCtx);
        },

        /**
         * Change the dimension of the canvas.
         * Does not really change the dimension of the rendering canvas container,
         *  but is used by the different computations
         * @method setCanvasDimension
         * @param d{CGSGDimension} newDimension
         * */
        setCanvasDimension: function (d) {
            CGSG.canvas.width = d.width;
            CGSG.canvas.height = d.height;
            CGSG.sceneGraph.setCanvasDimension(d);
            this._updateDblBuffer();

            //Experimental
            /*this._dblCanvas.width = newDimension.x;
             this._dblCanvas.height = newDimension.y;
             this._dblContext = this._dblCanvas.getContext('2d');*/
        },

        /**
         * Remove the nodes selected in the scene graph
         * @method deleteSelected
         */
        deleteSelected: function () {
            if (CGSG.selectedNodes.length > 0) {
                //for (var i = CGSG.selectedNodes.length - 1; i >= 0; i--) {
                cgsgIterateReverse(CGSG.selectedNodes, (function (i, node) {
                    this._selectedNode = CGSG.selectedNodes[i];
                    CGSG.sceneGraph.removeNode(this._selectedNode, true);
                }).bind(this));
            }
        },

        /**
         * Deselect all nodes
         * @public
         * @method deselectAll
         * @param {Array} excludedArray CGSGNodes not to deselect
         */
        deselectAll: function (excludedArray) {
            this._isDrag = false;
            this._isResizeDrag = false;
            this._resizingDirection = -1;
            //CGSG.canvas.style.cursor = 'auto';
            CGSG.sceneGraph.deselectAll(excludedArray);
            this.invalidateTransformation();
        },

        /**
         * the main rendering loop
         * @protected
         * @method render
         */
        render: function () {
            if (this._isRunning && this._needRedraw) {
                if (this.onRenderStart !== null) {
                    var evt = new CGSGEvent(this, null);
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_RENDER_START, evt);
                    //this.onRenderStart();
                }

                if (this.dblBuffer) {
                    cgsgClearContext(CGSG.context);
                    CGSG.context.drawImage(this._cacheCanvas, 0, 0);
                }

                CGSG.sceneGraph.render();

                //render the drag selection box directly onto the scene graph on top of everything else
                if (this._dragStartPos.length > 0 && this._dragEndPos.length > 0) {

                    var p1 = this._dragStartPos[0];
                    var p2 = this._dragEndPos[0];

                    var dx = p2.x - p1.x, dy = p2.y - p1.y;

                    CGSG.sceneGraph.context.save();

                    CGSG.sceneGraph.context.scale(CGSG.displayRatio.x, CGSG.displayRatio.y);
                    CGSG.sceneGraph.context.strokeStyle = this.dragSelectStrokeColor;
                    CGSG.sceneGraph.context.fillStyle = this.dragSelectFillColor;
                    CGSG.sceneGraph.context.lineWidth = this.dragSelectStrokeWidth;
                    CGSG.sceneGraph.context.globalAlpha = this.dragSelectAlpha;
                    CGSG.sceneGraph.context.fillRect(p1.x, p1.y, dx, dy);
                    CGSG.sceneGraph.context.strokeRect(p1.x, p1.y, dx, dy);

                    CGSG.sceneGraph.context.restore();
                }

                if (this.onRenderEnd !== null) {
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_RENDER_END, new CGSGEvent(this, null));
                    //this.onRenderEnd();
                }

            }

            //if (!CGSG.sceneGraph.stillHaveAnimation()) {
            //	this._needRedraw = false;
            //}

            this._updateFramerate();
            this._updateFramerateContainer();
        },

        /**
         * Call this to start the update of the scene
         * @public
         * @method startPlaying
         */
        startPlaying: function () {
            //we want the callback of the requestAnimationFrame function to be this one.
            //however, the scope of 'this' won't be the same on the requestAnimationFrame function (scope = window)
            // and this one (scope = this). So we bind this function to this scope
            var bindStartPlaying = this.startPlaying.bind(this);
            window.requestAnimationFrame(bindStartPlaying);
            this._isRunning = true;
            this.render();
        },

        /**
         * Call this to stop the rendering (and so animation) update
         * @public
         * @method stopPlaying
         */
        stopPlaying: function () {
            window.cancelAnimationFrame(cgsgGlobalRenderingTimer);
            this._isRunning = false;
        },

        /**
         * Inform the SceneGraph that a new render is needed
         * @public
         * @method invalidateTransformation
         */
        invalidateTransformation: function () {
            this._needRedraw = true;
        },

        /**
         * Inform the SceneGraph that all nodes must be updated with the current theme
         * @method invalidateTheme
         */
        invalidateTheme: function () {
            CGSG.cssManager.invalidateCache();

            this.dragSelectFillColor = CGSG.cssManager.getAttr("cgsg-selectionBox", "background-color");
            this.dragSelectStrokeColor = CGSG.cssManager.getAttr("cgsg-selectionBox", "border-color");
            this.dragSelectStrokeWidth = CGSG.cssManager.getAttr("cgsg-selectionBox", "border-width");
            this.dragSelectAlpha = CGSG.cssManager.getAttr("cgsg-selectionBox", "opacity");

            //invalidateTransformation theme for all objects
            CGSG.sceneGraph.invalidateTheme();
        },

        /**
         * Update the current framerate
         * @method _updateFramerate
         * @private
         */
        _updateFramerate: function () {
            if (!cgsgExist(this._fpss)) {
                this._fpss = [];
                this.currentFps = 0;
            }

            var now = new Date().getTime();
            var delta = (now - this._lastUpdate);

            if (!isNaN(CGSG.maxFramerate)) {
                while ((1000.0 / delta) > CGSG.maxFramerate) {
                    now = new Date().getTime();
                    delta = (now - this._lastUpdate);
                }
            }

            this._fpss[this.currentFps++] = 1000.0 / delta;

            if (this.currentFps === CGSG.framerateDelay) {
                this.currentFps = 0;
                CGSG.fps = this._fpss.average();
                if (this.onSceneAverageFpsChanged !== null) {
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SCENE_AVERAGE_FPS_CHANGED,
                                               new CGSGEvent(this, {fps: CGSG.fps}));
                }
            }

            /*if (this._frameRatio === 0) {
             this._frameRatio = CGSG.fps;
             } else {
             this._frameRatio = ((this._frameRatio * (CGSG.currentFrame - 1)) + CGSG.fps) / CGSG.currentFrame;
             }*/

            this._lastUpdate = now;
        },

        /**
         * Update the innerHTML of the HTMLElement passed as parameter of the "showFPS" function
         * @method _updateFramerateContainer
         * @private
         */
        _updateFramerateContainer: function () {
            if (this._frameContainer !== null) {
                this._frameContainer.innerHTML = Math.round(CGSG.fps)/*.toString() + " | ~" + (this._frameRatio)*/;
            }
        },

        /**
         * @public
         * @method showFPS
         * @param {HTMLElement} elt an HTML element to receive the FPS. Can be null if you want to remove the framerate
         */
        showFPS: function (elt) {
            this._frameContainer = elt;
        },

        /**
         * Set the new value for the display ratio.
         * The display ratio is used to resize all the elements on the graph to be adapted to the screen,
         * depending on the reference screen size.
         * You can compute the ratio like this: x = canvas.width/reference.width ; y = canvas.height/reference.height
         * @public
         * @method setDisplayRatio
         * @param ratio {CGSGScale} a CGSGScale value
         */
        setDisplayRatio: function (ratio) {
            //noinspection JSUndeclaredVariable
            CGSG.displayRatio = ratio;
            CGSG.sceneGraph.initializeGhost(CGSG.canvas.width / CGSG.displayRatio.x,
                                            CGSG.canvas.height / CGSG.displayRatio.y);
        },

        /**
         * Detects when the mouse leaves the canvas.
         * @method onMouseOutHandler
         * @param e {MouseEvent} the event
         */
        onMouseOutHandler: function (e) {
            this._isPressing = false;
        },

        /**
         * click mouse Event handler function
         * @protected
         * @method onMouseDown
         * @param e {MouseEvent} event
         */
        onMouseDown: function (e) {
            this.onTouchStart(e);
        },

        /**
         * touch down Event handler function
         * @protected
         * @method onTouchStart
         * @param e {Event} event
         */
        onTouchStart: function (e) {
            this._isPressing = true;
            if (cgsgExist(this._mousePos)) {
                this._mouseOldPosition = this._mousePos.copy();
            }

            this._mousePos = cgsgGetCursorPositions(e, CGSG.canvas);
            this._selectedNode = CGSG.sceneGraph.pickNode(this._mousePos[0], null);
            if (cgsgExist(this._selectedNode)) {
                if (this._selectedNode.onClickStart) {
                    CGSG.eventManager.dispatch(this._selectedNode, cgsgEventTypes.ON_CLICK_START,
                                               new CGSGEvent(this,
                                                             {nativeEvent: e, position: this._mousePos}));
                }

                this._mouseOldPosition = this._mousePos.copy();
            }

            this._updateSelection(e);
        },

        /**
         * Updates the current selection according to the given event.
         *
         * @method _updateSelection
         * @param e {Event} the event
         * @private
         */
        _updateSelection: function (e) {
            //if a node is under the cursor, select it if it is (clickable || resizable || draggable)
            //s = selectable
            var s = cgsgExist(this._selectedNode) &&
                    (this._selectedNode.isClickable || this._selectedNode.isDraggable ||
                     this._selectedNode.isResizable);

            if (s) {
                if (this._selectedNode.isDraggable || this._selectedNode.isResizable) {
                    //if multiselection is activated
                    if (this.allowMultiSelect && this._keyDownedCtrl) {
                        if (!this._selectedNode.isSelected) {
                            CGSG.sceneGraph.selectNode(this._selectedNode);
                        }
                        else {
                            CGSG.sceneGraph.deselectNode(this._selectedNode);
                        }
                    }
                    //no multiselection
                    else {
                        //if node not already selected
                        if (!this._selectedNode.isSelected) {
                            this.deselectAll(null);
                            CGSG.sceneGraph.selectNode(this._selectedNode);
                        }
                    }

                    this._isDrag = !this._detectResizeMode(this._mousePos[0]);

                    //ask for redraw
                    this.invalidateTransformation();
                }
            }
            //else if no nodes was clicked
            else {
                this.deselectAll(null);
            }

            // Check if we can start drag selection
            var canStartDragSelection = this._canStartDragSelection(e);

            // if the _canStartDragSelection has not been sub classed : apply this rule :
            // if no nodes were hit (that were clickable,resizeable or draggable) lets start a drag selection if we are allowed
            if (!cgsgExist(canStartDragSelection)) {
                canStartDragSelection = !s;
            }

            if (this.allowMultiSelect && canStartDragSelection) {
                var p = cgsgGetCursorPositions(e, CGSG.canvas);
                this._isDragSelect = true;
                this._dragStartPos = p;
                this._dragEndPos = p;
                this.deselectAll(null);
            }
        },

        /**
         * This method indicates if, according to the current state of the scene, a drag selection could starts. Called
         * when a touchStart event triggered. Could be overridden to specify different behaviour.
         *
         * @method _canStartDragSelection
         * @protected
         * @param e {Event} the event
         * @return {Boolean} true if drag selection could starts, false otherwise
         */
        _canStartDragSelection: function (e) {
            // tells the caller to use default behaviour by returning nothing (undefined)
        },

        /**
         * Dispatch a 'click' event and for any selected node which is clickable and and only if 'this._isDblClick' == false.
         *
         * @method _dispatchClick
         * @param e {CGSGEvent} the event to dispatch
         * @private
         */
        _dispatchClick: function (e) {
            //execute the action bound with the click e
            if (cgsgExist(this._selectedNode) && this._selectedNode.isClickable) {
                if (!this._isDblClick && cgsgExist(this._selectedNode.onClick)) {
                    e.data.node = this._selectedNode;
                    e.data.positions = this._mousePos.copy();
                    CGSG.eventManager.dispatch(this._selectedNode, cgsgEventTypes.ON_CLICK, e);
                    //this._selectedNode.onClick({node: this._selectedNode, positions: this._mousePos.copy(), e: e});
                }
                //deselect all node except the new _selectedNode
                if (this._selectedNode.isDraggable === false && this._selectedNode.isResizable === false) {
                    this.deselectAll([this._selectedNode]);
                }
            }
        },

        /**
         * Click on the scene
         *
         * @private
         * @method _clickOnScene
         * @param e {CGSGEvent} wrapper of MouseEvent or TouchEvent
         * @param {Boolean} pickNode
         */
        _clickOnScene: function (e, pickNode) {
            this._mousePos = cgsgGetCursorPositions(e.data.nativeEvent, CGSG.canvas);

            if (this.onSceneClickStart !== null) {
                CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SCENE_CLICK_START, new CGSGEvent(this,
                                                                                                    {nativeEvent: e, positions: this._mousePos}));
                //this.onSceneClickStart({positions: this._mousePos.copy(), e: e});
            }

            //try to pick up the nodes under the cursor
            if (pickNode) {
                this._selectedNode = CGSG.sceneGraph.pickNode(this._mousePos[0], function (node) {
                    return (node.isTraversable === true && (node.isClickable === true ||
                        node.isDraggable === true || node.isResizable === true));
                });
            }

            //this._updateSelection(e);
            this._dispatchClick(e);

            if (this.onSceneClickEnd !== null) {
                CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SCENE_CLICK_END, new CGSGEvent(this,
                                                                                                  {nativeEvent: e, positions: this._mousePos}));
                //this.onSceneClickEnd({positions: this._mousePos.copy(), e: e});
            }

            //this._mouseOldPosition = this._mousePos.copy();
        },

        /**
         * mouse move Event handler function
         * @protected
         * @method onMouseMove
         * @param e {MouseEvent} event
         */
        onMouseMove: function (e) {
            this._moveOnScene(e);
        },

        /**
         * touch move Event handler function
         * @protected
         * @method onTouchMove
         * @param {Event} e
         */
        onTouchMove: function (e) {
            if (e.preventManipulation) {
                e.preventManipulation();
            }
            e.preventDefault();
            e.stopPropagation();
            this._moveOnScene(e);
        },

        /**
         * @private
         * @method _moveOnScene
         * @param e {Event} MouseEvent or TouchEvent
         */
        _moveOnScene: function (e) {
            var i, offX, offY, evt, mp, mop;
            this._mousePos = cgsgGetCursorPositions(e, CGSG.canvas);
            var selN = this._selectedNode;
            this._selectedNode = null;

            if (this._isPressing && this._isDrag) {
                if (CGSG.selectedNodes.length > 0) {
                    mp = this._mousePos[0];
                    mop = this._mouseOldPosition[0];
                    this._offsetX = mp.x - mop.x;
                    this._offsetY = mp.y - mop.y;
                    for (i = CGSG.selectedNodes.length - 1; i >= 0; i--) {
                        this._selectedNode = CGSG.selectedNodes[i];
                        if (this._selectedNode !== null && this._selectedNode.isDraggable) {
                            this._selectedNode.isMoving = true;
                            //TODO : appliquer aussi l'opposée de la rotation
                            offX = this._offsetX /
                                   (this._selectedNode._absSca.x / this._selectedNode.scale.x);
                            offY = this._offsetY /
                                   (this._selectedNode._absSca.y / this._selectedNode.scale.y);

                            //check for the region constraint

                            if (this._canMove(this._selectedNode, offX, offY, 0, 0)) {
                                this._selectedNode.translateWith(offX, offY);
                                if (this._selectedNode.onDrag !== null) {
                                    evt = new CGSGEvent(this,
                                                            {node: this._selectedNode, positions: this._mousePos.copy(), nativeEvent: e});
                                    CGSG.eventManager.dispatch(this._selectedNode, cgsgEventTypes.ON_DRAG, evt);
                                    //this._selectedNode.onDrag({node: this._selectedNode, positions: this._mousePos.copy(), e: e});
                                }
                            }
                        }
                    }

                    this._mouseOldPosition = this._mousePos.copy();

                    // something is changing position so we better invalidateTransformation the canvas!
                    this.invalidateTransformation();
                }
            }
            else if (this._isPressing && this._isResizeDrag) {
                if (CGSG.selectedNodes.length > 0) {
                    mp = this._mousePos[0];
                    mop = this._mouseOldPosition[0];
                    this._offsetX = mp.x - mop.x;
                    this._offsetY = mp.y - mop.y;

                    //for (i = CGSG.selectedNodes.length - 1; i >= 0; i--) {
                    cgsgIterateReverse(CGSG.selectedNodes, (function (i, node) {
                        this._selectedNode = node;//CGSG.selectedNodes[i];

                        if (this._selectedNode.isResizable) {
                            this._selectedNode.isResizing = true;
                            //TODO : appliquer aussi l'opposée de la rotation
                            offX = this._offsetX / this._selectedNode._absSca.x;
                            offY = this._offsetY / this._selectedNode._absSca.y;

                            var delta = Math.max(offX, offY);
                            if (delta === 0) {
                                delta = Math.min(offX, offY);
                            }
                            var realDimX = this._selectedNode.getWidth() * //this._selectedNode.dimension.width *
                                           this._selectedNode._absSca.x;
                            var realDimY = this._selectedNode.getHeight() * //this._selectedNode.dimension.height *
                                           this._selectedNode._absSca.y;

                            // 0  1  2
                            // 3     4
                            // 5  6  7
                            switch (this._resizingDirection) {
                                case 0:
                                    if (this._selectedNode.isProportionalResize) {
                                        this._d = this._getDeltaOnMove(delta, offX, offY, realDimX,
                                                                       realDimY,
                                                                       -1, -1);
                                        this._r.x = this._d.dW;
                                        this._r.y = this._d.dH;
                                        this._d.dW = -this._d.dW;
                                        this._d.dH = -this._d.dH;
                                    }
                                    else {
                                        this._d.dW = offX * this._selectedNode.scale.x;
                                        this._d.dH = offY * this._selectedNode.scale.y;
                                        this._r.x = -offX;
                                        this._r.y = -offY;
                                    }
                                    break;
                                case 1:
                                    this._d.dW = 0;
                                    this._d.dH = offY * this._selectedNode.scale.y;
                                    this._r.x = 0;
                                    this._r.y = -offY;
                                    break;
                                case 2:
                                    if (this._selectedNode.isProportionalResize) {
                                        this._d = this._getDeltaOnMove(delta, offX, offY, realDimX,
                                                                       realDimY,
                                                                       1, -1);

                                        this._r.x = this._d.dW;
                                        this._r.y = this._d.dH;
                                        this._d.dW = 0;
                                        this._d.dH = -this._d.dH;
                                    }
                                    else {

                                        this._d.dW = 0;
                                        this._d.dH = offY * this._selectedNode.scale.y;
                                        this._r.x = offX;
                                        this._r.y = -offY;
                                    }
                                    break;
                                case 3:

                                    this._d.dW = offX * this._selectedNode.scale.x;
                                    this._d.dH = 0;
                                    this._r.x = -offX;
                                    this._r.y = 0;
                                    break;
                                case 4:
                                    this._d.dW = 0;
                                    this._d.dH = 0;
                                    this._r.x = offX;
                                    this._r.y = 0;
                                    break;
                                case 5:
                                    if (this._selectedNode.isProportionalResize) {
                                        this._d = this._getDeltaOnMove(delta, offX, offY, realDimX,
                                                                       realDimY,
                                                                       1, -1);
                                        this._r.x = -this._d.dW;
                                        this._r.y = -this._d.dH;
                                        this._d.dH = 0;
                                    }
                                    else {

                                        this._d.dW = offX * this._selectedNode.scale.x;
                                        this._d.dH = 0;
                                        this._r.x = -offX;
                                        this._r.y = offY;
                                    }
                                    break;
                                case 6:
                                    this._d.dW = 0;
                                    this._d.dH = 0;
                                    this._r.x = 0;
                                    this._r.y = offY;
                                    break;
                                case 7:
                                    if (this._selectedNode.isProportionalResize) {
                                        this._d = this._getDeltaOnMove(delta, offX, offY, realDimX,
                                                                       realDimY,
                                                                       1, 1);

                                        this._r.x = this._d.dW;
                                        this._r.y = this._d.dH;
                                        this._d.dW = 0;
                                        this._d.dH = 0;
                                    }
                                    else {
                                        this._d.dW = 0;
                                        this._d.dH = 0;
                                        this._r.x = offX;
                                        this._r.y = offY;
                                    }
                                    break;
                            }

                            if (this._canMove(this._selectedNode, this._d.dW, this._d.dH, this._r.x, this._r.y)) {
                                this._selectedNode.translateWith(this._d.dW, this._d.dH, false);
                                this._selectedNode.resizeWith(this._r.x, this._r.y, false);

                                this._selectedNode.computeAbsoluteMatrix(false);
                                if (this._selectedNode.onResize !== null) {
                                    var evt = new CGSGEvent(this,
                                                            {node: this._selectedNode, positions: this._mousePos.copy(), e: e});
                                    CGSG.eventManager.dispatch(this._selectedNode, cgsgEventTypes.ON_RESIZE, evt);
                                }
                            }
                        }

                    }).bind(this));
                }
                this._mouseOldPosition = this._mousePos.copy();

                this.invalidateTransformation();
            }
            // if there's a selection, see if we grabbed one of the resize handles
            else if (CGSG.selectedNodes.length > 0/* && this._isResizeDrag == false*/) {
                if (this._detectResizeMode(this._mousePos[0])) {
                    return;
                }
                else {
                    // not over a selection box, return to normal
                    //this._isResizeDrag = false;
                    this._resizingDirection = -1;
                    CGSG.canvas.style.cursor = 'auto';

                    //ask for redraw
                    this.invalidateTransformation();
                }
            }
            //if we are drag selecting
            else if (this._isDragSelect) {
                this._dragEndPos = this._mousePos.copy();

                //ask to redraw for the selection box
                this.invalidateTransformation();
            }

            //mouse over a node ?
            if (!this._isDrag && !this._isResizeDrag) {
                var n = null;
                //first test the mouse over the current _nodeMouseOver. If it's ok, no need to traverse other
                if (cgsgExist(this._nodeMouseOver)) {
                    n = this._nodeMouseOver.pickNode(this._mousePos[0], null, CGSG.ghostContext, false, null);

                    if (n === null) {
                        this._nodeMouseOver.isMouseOver = false;
                        if (cgsgExist(this._nodeMouseOver.onMouseOut)) {
                            evt = new CGSGEvent(this,
                                                    {node: this._nodeMouseOver, positions: this._mousePos.copy(), e: e});
                            CGSG.eventManager.dispatch(this._nodeMouseOver, cgsgEventTypes.ON_MOUSE_OUT, evt);
                            //this._nodeMouseOver.onMouseOut({node: this._nodeMouseOver, positions: this._mousePos.copy(), e: e});
                        }
                        this._nodeMouseOver = null;
                    }
                    else if (n === this._nodeMouseOver) {
                        if (cgsgExist(this._nodeMouseOver.onMouseOver)) {
                            evt = new CGSGEvent(this,
                                                    {node: this._nodeMouseOver, positions: this._mousePos.copy(), e: e});
                            CGSG.eventManager.dispatch(this._nodeMouseOver, cgsgEventTypes.ON_MOUSE_OVER, evt);
                            //this._nodeMouseOver.onMouseOver({node: this._nodeMouseOver, positions: this._mousePos.copy(), e: e});
                        }
                    }
                }

                //if the previous node under the mouse is no more under the mouse, test the other nodes
                if (n === null) {
                    if ((n = CGSG.sceneGraph.pickNode(this._mousePos[0], function (node) {
                        return (node.onMouseEnter !== null || node.onMouseOver !== null);
                    })) !== null) {
                        n.isMouseOver = true;
                        this._nodeMouseOver = n;
                        this._nodeMouseOver.isMouseOver = true;
                        if (cgsgExist(this._nodeMouseOver.onMouseEnter)) {
                            evt = new CGSGEvent(this,
                                                    {node: this._nodeMouseOver, positions: this._mousePos.copy(), e: e});
                            CGSG.eventManager.dispatch(this._nodeMouseOver, cgsgEventTypes.ON_MOUSE_ENTER, evt);
                            //this._nodeMouseOver.onMouseEnter({node: this._nodeMouseOver, positions: this._mousePos.copy(), e: e})
                        }
                    }
                }
            }

            this._selectedNode = selN;
        },

        _canMove: function (node, dX, dY, dW, dH) {
            var rgc;
            if (node.nodeConstraint !== null) {
                rgc = node.nodeConstraint.getAbsoluteRegion();
            }
            else {
                rgc = node.regionConstraint;
            }
            if (rgc !== null) {
                var reg = node.getAbsoluteRegion();
                reg.position.x += dX;
                reg.position.y += dY;
                reg.dimension.width += dW;
                reg.dimension.height += dH;
                if (!cgsgRegionIsInRegion(reg, rgc, 0)) {
                    return false;
                }
            }
            return true;
        },

        /**
         * Detects if the mouse if over the handle box of a selected node.
         *
         * @method _detectResizeMode
         * @param pos {CGSGPosition} the cursor position
         * @return {Boolean} true if we resize, false otherwise
         * @private
         */
        _detectResizeMode: function (pos) {
            var sel = this._selectedNode;

            cgsgIterateReverse(CGSG.selectedNodes, (function (i, node) {
                this._selectedNode = node;
                if (this._selectedNode.isResizable) {
                    for (var h = 0; h < 8; h++) {
                        if (node.isProportionalResizeOnly && (h === 1 || h === 3 || h === 4 || h === 6)) {
                            continue;
                        }
                        var selectionHandle = this._selectedNode.handles[h];
                        this._isResizeDrag = selectionHandle.checkIfSelected(pos, CGSG.resizeHandleThreshold);

                        // resize handles will always be rectangles
                        if (this._isResizeDrag) {
                            // we found one!
                            this._resizingDirection = h;

                            //draw the correct cursor
                            CGSG.canvas.style.cursor = this._listCursors[h];

                            //if the mouse cursor is over a handle box (ie: a resize marker)
                            // if (this._resizingDirection !== -1) {
                            //     this._isResizeDrag = true;
                            //}

                            return false;
                        }
                    }
                }
            }).bind(this));

            this._selectedNode = sel;
            return this._isResizeDrag;
        },

        /**
         * @method _getDeltaOnMove
         * @param delta {Number}
         * @param offX {Number} nodeOffsetX
         * @param offY {Number} nodeOffsetY
         * @param w {Number}
         * @param h {Number}
         * @param signeX {Number}
         * @param signeY {Number}
         * @return {Object}
         * @private
         */
        _getDeltaOnMove: function (delta, offX, offY, w, h, signeX, signeY) {
            var dW = offX, dH = offY;
            var r = 1.0;
            if (delta === offX) {
                r = (w + signeX * delta) / w;
                dW = signeX * delta;
                dH = (r - 1.0) * h;
            }
            else {
                r = (h + signeY * delta) / h;
                dH = signeY * delta;
                dW = (r - 1.0) * w;
            }

            return {dW: dW, dH: dH};
        },

        /**
         * mouse up Event handler function
         * @protected
         * @method onMouseUp
         * @param {MouseEvent} e
         */
        onMouseUp: function (e) {
            this.onTouchEnd(e);
        },

        /**
         * touch up Event handler function
         * @protected
         * @method onTouchEnd
         * @param {Event} e
         */
        onTouchEnd: function (e) {
            if (e.preventManipulation) {
                e.preventManipulation();
            }
            e.preventDefault();
            e.stopPropagation();

            this._isPressing = false;
            this._mouseUpCount++;

            //if the touch was over a node with the onDblClick method defined, check whether it's a dbl touch or not
            if (cgsgExist(this._selectedNode) && cgsgExist(this._selectedNode.onDblClick)) {

                //if the timer exists, then it's a dbl touch
                if (this._mouseUpCount > 1) {
                    clearTimeout(this._timeoutDblClick);
                    this._upAndDblClick(e);
                }
                else {
                    this._timeoutDblClick = setTimeout((function () {
                        this._upAndClick(e);
                    }).bind(this), this.dblTouchDelay);
                }
            }
            else {
                // not a touch on a node with the onDblClick e defined,
                // so it's a single touch, just call the _clickOnScene method usually
                this._upAndClick(e);
            }
        },

        /**
         * Creates the custom event by calling _upOnScene and then call _clickOnScene.
         *
         * @method _upAndClick
         * @param {Event} e the event
         * @private
         */
        _upAndClick: function (e) {
            this._mouseUpCount = 0;
            var ed = this._upOnScene(e);
            ed.nativeEvent = e;
            this._clickOnScene(new CGSGEvent(this, ed), false);
        },

        /**
         * Creates the custom event by calling _upOnScene and then call _dblClickOnScene.
         *
         * @method _upAndDblClick
         * @param {Event} e the event
         * @private
         */
        _upAndDblClick: function (e) {
            this._mouseUpCount = 0;
            var eventData = this._upOnScene(e);
            eventData.nativeEvent = e;
            this._dblClickOnScene(new CGSGEvent(this, eventData), false);
        },

        /**
         * @method _upOnScene
         * @param {Event} e MouseEvent or TouchEvent
         * @return {Object} a structure indicating is the node has been moved or resize
         * @private
         */
        _upOnScene: function (e) {
            var sel = this._selectedNode;
            var i = 0;
            var retval = {};
            retval.nativeEvent = e;

            var exist = cgsgExist(sel);
            retval.hasMoved = exist && sel.isMoving;
            retval.hasResize = exist && sel.isResizing;

            //if current action was to drag nodes
            if (this._isDrag) {
                cgsgIterateReverse(CGSG.selectedNodes, (function (i, node) {
                    //for (i = CGSG.selectedNodes.length - 1; i >= 0; i--) {
                    //    this._selectedNode = CGSG.selectedNodes[i];
                    this._selectedNode = node;

                    if (this._selectedNode.isMoving) {
                        this._selectedNode.isMoving = false;
                        this._selectedNode.computeAbsoluteMatrix(true);

                        if (this._selectedNode.onDragEnd !== null) {
                            var evt = new CGSGEvent(this,
                                                    {node: this._selectedNode, positions: this._mousePos.copy(), nativeEvent: e});
                            CGSG.eventManager.dispatch(this._selectedNode, cgsgEventTypes.ON_DRAG_END, evt);
                            //    this._selectedNode.onDragEnd({node: this._selectedNode, positions: this._mousePos.copy(), e: e});
                        }
                    }
                    //}
                }).bind(this));

                this._isDrag = false;
            }

            //else if current action was to resize nodes
            else if (this._isResizeDrag) {
                cgsgIterateReverse(CGSG.selectedNodes, (function (i, node) {
                    //for (i = CGSG.selectedNodes.length - 1; i >= 0; i--) {
                    //this._selectedNode = CGSG.selectedNodes[i];
                    this._selectedNode = node;

                    if (this._selectedNode.isResizing) {
                        this._selectedNode.isResizing = false;
                        this._selectedNode.computeAbsoluteMatrix(true);

                        if (this._selectedNode.onResizeEnd !== null) {
                            var evt = new CGSGEvent(this,
                                                    {node: this._selectedNode, positions: this._mousePos.copy(), nativeEvent: e});
                            CGSG.eventManager.dispatch(this._selectedNode, cgsgEventTypes.ON_RESIZE_END, evt);
                            //this._selectedNode.onResizeEnd({node: this._selectedNode, positions: this._mousePos.copy(), e: e});
                        }
                    }
                    //}
                }).bind(this));

                this._isResizeDrag = false;
            }
            //else if this is a drag select
            else if (this._isDragSelect) {
                this._isDragSelect = false;
                this._doDragSelect();
                this._dragStartPos = [];
                this._dragEndPos = [];

                //request a re-render for the drag select rect to be killed with
                this.invalidateTransformation();
            }

            //else if just up the mice of nodes
            else {
                this._selectedNode = CGSG.selectedNodes[CGSG.selectedNodes.length - 1];
                if (cgsgExist(this._selectedNode) && this._selectedNode.onMouseUp !== null) {
                    var evt = new CGSGEvent(this,
                                            {node: this._selectedNode, positions: this._mousePos.copy(), e: e});
                    CGSG.eventManager.dispatch(this._selectedNode, cgsgEventTypes.ON_MOUSE_UP, evt);
                    //this._selectedNode.onMouseUp({node: this._selectedNode, positions: this._mousePos.copy(), e: e});
                }
            }

            this._resizingDirection = -1;
            this._selectedNode = sel;
            return retval;
        },

        /**
         * Select the nodes under the drag select rectangle
         * @protected
         * @method _doDragSelect
         */
        _doDragSelect  : function () {

            var p1 = this._dragStartPos[0];
            var p2 = this._dragEndPos[0];

            var dx = p2.x - p1.x, dy = p2.y - p1.y;

            if (dx < 0) {
                dx = Math.abs(dx);
                p1.x -= dx;
            }

            if (dy < 0) {
                dy = Math.abs(dy);
                p1.y -= dy;
            }

            var region = new CGSGRegion(p1.x, p1.y, dx, dy);
            var newSelections = CGSG.sceneGraph.pickNodes(region, function (node) {
                return (node.isTraversable === true && (/*node.isClickable === true ||*/ node.isDraggable === true ||
                    node.isResizable === true));
            });

            for (var i = 0, len = newSelections.length; i < len; ++i) {
                CGSG.sceneGraph.selectNode(newSelections[i]);
            }
        },
        /**
         * mouse double click Event handler function
         * @protected
         * @method onMouseDblClick
         * @param {MouseEvent} e
         */
        onMouseDblClick: function (e) {
            //this._dblClickOnScene(event);
            e.preventDefault();
            e.stopPropagation();
        },

        /**
         * @protected
         * @method _dblClickOnScene
         * @param {CGSGEvent} e wrapping the native event
         * @param {Boolean} mustPickNode
         * @return {CGSGNode} the node that was double-clicked
         * @private
         */
        _dblClickOnScene: function (e, mustPickNode) {
            //this._updateSelection(e);

            if (this.onSceneDblClickStart !== null) {
                CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SCENE_DBL_CLICK_START, e);
                //this.onSceneDblClickStart(e);
            }

            if (mustPickNode) {
                //this._mousePos = cgsgGetCursorPositions(e, CGSG.canvas);
                this._selectedNode = CGSG.sceneGraph.pickNode(this._mousePos[0], function (node) {
                    return true;
                });
            }

            if (cgsgExist(this._selectedNode) && this._selectedNode.onDblClick !== null) {
                e.data.node = this._selectedNode;
                e.data.positions = this._mousePos.copy();
                CGSG.eventManager.dispatch(this._selectedNode, cgsgEventTypes.ON_DBL_CLICK, e);
                //this._selectedNode.onDblClick({node: this._selectedNode, positions: this._mousePos.copy(), e: e});
            }
            else if (this.onSceneDblClickEnd !== null) {
                CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SCENE_DBL_CLICK_END, e);
                //this.onSceneDblClickEnd({positions: this._mousePos.copy(), e: e});
            }
            return this._selectedNode;
        },

        /**
         * @method onKeyDownHandler
         * @protected
         * @param {KeyboardEvent} e
         * @return {Number}
         */
        onKeyDownHandler: function (e) {
            var keynum = (window.e) ? e.keyCode : e.which;

            switch (keynum) {
                case 17:
                    this._keyDownedCtrl = true;
                    break;
            }

            return keynum;
        },

        /**
         * @method onKeyUpHandler
         * @protected
         * @param {KeyboardEvent} ee
         * @return {Number}
         */
        onKeyUpHandler: function (e) {
            var keynum = (window.e) ? e.keyCode : e.which;

            switch (keynum) {
                case 17:
                    this._keyDownedCtrl = false;
                    break;
            }

            return keynum;
        }
    }
);
