/*
 * Copyright (c) 2012  Capgemini Technology Services (hereinafter “Capgemini”)
 *
 * License/Terms of Use
 *
 * Permission is hereby granted, free of charge and for the term of intellectual property rights on the Software, to any
 * person obtaining a copy of this software and associated documentation files (the "Software"), to use, copy, modify
 * and propagate free of charge, anywhere in the world, all or part of the Software subject to the following mandatory conditions:
 *
 *   •	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
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


var PRODUCT_TYPE = {
	UNKNOWN : {name : "Unknown"},
	TABLE : {name : "Table"},
	SHELF : {name : "Shelf"},
	TV : {name : "TV"}
};

/**
 * Represent a product
 * @class Product
 * @type {Product}
 */
var Product = Object.extend(
	{
		initialize : function (name, price, type, urlImage) {
			/**
			 * @property name
			 * @type {String}
			 */
			this.name = name;

			/**
			 * Type of the product : PRODUCT_TYPE.TABLE, PRODUCT_TYPE.SHELF, ...
			 * @property type
			 * @default PRODUCT_TYPE.UNKNOWN
			 * @type {PRODUCT_TYPE}
			 */
			this.type = type;

			/**
			 * price for this product
			 * @property price
			 * @type {Number}
			 */
			this.price = price;

			/**
			 * URL of the image representing the product
			 * @property urlImage
			 * @type {String}
			 */
			this.urlImage = urlImage;

			/**
			 * @property children
			 * @type {Array}
			 */
			this.children = [];
		}
	}
);
