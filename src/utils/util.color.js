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
 * Some utils methods extending the Array prototype
 *
 * @class CGSGColor
 * @module Util
 * @static
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
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
    rgb2hex:function (r, g, b) {
        return "#" + this._toHex(r) + this._toHex(g) + this._toHex(b);
    },

    /**
     * Convert an hexadecimal code for color to R, G and B
     * @method hex2rgb
     * @static
     * @param {String} hex an hexadecimal code, with or without the starting sharp (#)
     * @return {Object} an object encapsulating r, g and b values (from 0 to 255)
     */
    hex2rgb:function (hex) {
        hex = this._withoutSharp(hex);
        return {
            r:parseInt(hex.substring(0, 2), 16),
            g:parseInt(hex.substring(2, 4), 16),
            b:parseInt(hex.substring(4, 6), 16)};
    },

    _withoutSharp:function (hex) {
        return (hex.charAt(0) == "#") ? hex.substring(1, hex.length) : hex;
    },

    /**
     * @method _toHex
     * @param {String} n String or Number representation of a number between 0 and 255
     * @return {String} Example "A6"
     * @private
     */
    _toHex:function (n) {
        var m = parseInt(n, 10);
        if (isNaN(m)) {
            return "00";
        }
        m = Math.max(0, Math.min(m, 255));
        return "0123456789ABCDEF".charAt((m - m % 16) / 16)
            + "0123456789ABCDEF".charAt(m % 16);
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
    lerp:function (colorFrom, colorTo, weight) {
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
    darkenHex:function (hex, factor) {
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
    darkenRGB:function (r, g, b, factor) {
        return {
            r:this.multiplyComponent(r, factor),
            g:this.multiplyComponent(g, factor),
            b:this.multiplyComponent(b, factor)
        };
    },

    litRGB:function (r, g, b, factor) {
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
    multiplyComponent:function (c, factor) {
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
    rgb2hsv:function (r, g, b) {
        var min, max;

        //normalize the 3 components
        r /= 255;
        g /= 255;
        b /= 255;
        min = Math.min(b, Math.min(r, g));
        max = Math.max(b, Math.max(r, g));

        //min == max ? so the 3 values are the same, we got a gray color.
        //just return the lightness
        if (max == min) {
            return {h:0, s:0, v:min};
        }

        var d = (r == min) ? g - b : ((b == min) ? r - g : b - r);
        var h = (r == min) ? 3 : ((b == min) ? 1 : 5);

        var dM = max - min;
        return {
            h:60 * (h - d / dM),
            s:dM / max,
            v:max
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
    rgb2hsl:function (r, g, b) {
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0;
        } else {
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

        return {h:h, s:s, l:l};
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
    hsl2rgb:function (h, s, l) {
        var r, g, b;

        if (s == 0) {
            r = g = b = l;
        } else {
            function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return {r:r * 255, g:g * 255, b:b * 255};
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
    hsv2rgb:function (h, s, v) {
        var r, g, b;

        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0:
                r = v, g = t, b = p;
                break;
            case 1:
                r = q, g = v, b = p;
                break;
            case 2:
                r = p, g = v, b = t;
                break;
            case 3:
                r = p, g = q, b = v;
                break;
            case 4:
                r = t, g = p, b = v;
                break;
            case 5:
                r = v, g = p, b = q;
                break;
        }

        return {r:r * 255, g:g * 255, b:b * 255};
    }

};