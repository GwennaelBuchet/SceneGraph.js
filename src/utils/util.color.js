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
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
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
CGSGColor = {
	/**
	 * Convert R, G and B value to an hexadecimal code
	 * @method rgb2hex
	 * @static
	 * @param r red value. from 0 to 255.
	 * @param g green value. from 0 to 255.
	 * @param b blue value. from 0 to 255.
	 * @return an hexadecimal value for the color, starting with a sharp (#)
	 */
	rgb2hex : function(r, g, b) {
		return "#" + this._toHex(r) + this._toHex(g) + this._toHex(b);
	},

	/**
	 * Convert an hexadecimal code for color to R, G and B
	 * @method hex2rgb
	 * @static
	 * @param hex an hexadecimal code, with or without the starting sharp (#)
	 * @return an object encapsulating r, g and b values (from 0 to 255)
	 */
	hex2rgb : function(hex) {
		hex = this._withoutSharp(hex);
		return {
			r : parseInt(hex.substring(0, 2), 16),
			g : parseInt(hex.substring(2, 4), 16),
			b : parseInt(hex.substring(4, 6), 16)};
	},

	_withoutSharp : function(hex) {
		return (hex.charAt(0) == "#") ? hex.substring(1, hex.length) : hex;
	},

	_toHex : function(n) {
		n = parseInt(n, 10);
		if (isNaN(n)) {
			return "00";
		}
		n = Math.max(0, Math.min(n, 255));
		return "0123456789ABCDEF".charAt((n - n % 16) / 16)
			+ "0123456789ABCDEF".charAt(n % 16);
	},

	/**
	 * Linear interpolation between 2 colors
	 * @method lerp
	 * @static
	 * @param colorFrom a hex color
	 * @param colorTo a hex color
	 * @param weight
	 * @return a heh value for the interpolated color
	 */
	lerp : function(colorFrom, colorTo, weight) {
		var rgbColorFrom = this.hex2rgb(colorFrom);
		var rgbColorTo = this.hex2rgb(colorTo);

		var rgb = [];
		rgb[0] = rgbColorFrom.r + (rgbColorTo.r - rgbColorFrom.r) * weight;
		rgb[1] = rgbColorFrom.g + (rgbColorTo.g - rgbColorFrom.g) * weight;
		rgb[2] = rgbColorFrom.b + (rgbColorTo.b - rgbColorFrom.b) * weight;

		return this.rgb2hex(rgb[0], rgb[1], rgb[2]);
	}
}