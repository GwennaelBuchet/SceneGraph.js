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
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  Except as contained in this notice, the name of Capgemini shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Capgemini.
 *
 *  These Terms of Use are subject to French law.
 * */

/**
 * A Hashmap class.
 *
 * @class CGSGHashmap
 * @module Util
 * @constructor
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGHashmap = CGSGObject.extend(
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
		 * @return {CGSGHashmap}
		 */
		clone: function () {
			var newMap = new CGSGHashmap();
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
