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
);