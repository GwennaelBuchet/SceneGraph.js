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
 * ALFA VERSION : to be enhanced, essentially for performance reasons.
 *
 * This mask could be applied to a node to cache in memory the rendering of a canvas and its nodes.
 *
 * @class CGSGMaskCache
 * @extends CGSGMask
 * @constructor
 * @author Guillaume Drouet (guidrouet@gmail.com)
 * @type {CGSGMaskCache}
 */

var CGSGMaskCache = CGSGMask.extend(
    {
        initialize: function () {
            this._super();
            this._cacheTable = new CGSGMap();
        },

        /**
         * Asks the mask to refresh the canvas cache for the given node in the next rendering. Automatically called when
         * a node is scaled, resize or translated.
         *
         * @param {CGSGNode} node the node
         * @method invalidate
         */
        invalidate: function (node) {
            this._cacheTable.getValue(node)._needRedraw = true;
        },

        /**
         * @param {CGSGNode} node the npde
         * @method _internalApply
         * @private
         */
        _internalApply: function (node) {
            // Create canvas cache
            var canvas = document.createElement('canvas');
            canvas.width = CGSG.canvas.width;
            canvas.height = CGSG.canvas.height;
            var ctx = canvas.getContext('2d');
            var entry = {
                _canvas    : canvas,
                _context   : ctx,
                _needRedraw: true
            };

            // Remove this mask when the node is free
            CGSG.eventManager.bindHandler(node, cgsgEventTypes.ON_FREE, (function () {
                this.remove(node);
            }).bind(this));

            // Detect changes that need redraw.
            var bindInvalidate = (function (e) {
                console.log(e);
                this.invalidate(node);
            }).bind(this);

            CGSG.eventManager.bindHandler(node, cgsgEventTypes.ON_RESIZE, bindInvalidate);
            CGSG.eventManager.bindHandler(node, cgsgEventTypes.ON_ROTATE, bindInvalidate);
            CGSG.eventManager.bindHandler(node, cgsgEventTypes.ON_TRANSLATE, bindInvalidate);
            CGSG.eventManager.bindHandler(node, cgsgEventTypes.ON_SCALE, bindInvalidate);

            this._cacheTable.addOrReplace(node, entry);
        },

        /**
         * @param {CGSGNode} node the npde
         * @method _internalRemove
         * @private
         */
        _internalRemove: function (node) {
            this._cacheTable.remove(node);
        },

        /**
         * Prepare the rendering of the node by saving the given context and returning the cache context. However, if
         * the cache is already filled, then the function will return null in order to tell the caller to not render
         * the node.
         *
         * @method prepare
         * @param node {CGSGNode} the node
         * @param context {CanvasRenderingContext2D} the context where the node will be drawn
         * @return {CanvasRenderingContext2D} the context to use
         */
        prepare: function (node, context) {
            var entry = this._cacheTable.getValue(node);
            var retval = null;

            // Entry exists, check if we need to redraw
            if (entry._needRedraw) {
                cgsgClearContext(entry._context);
                retval = entry._context;
                entry._needRedraw = false;
            }

            this._saveContext = context;
            this._saveEntry = entry;

            return retval;
        },

        /**
         * Finalize this mask by drawing the memory canvas to the saved context.
         *
         * @method finalize
         * @param node {CGSGNode} the node
         * @param context {CanvasRenderingContext2D} the context returned by prepare()
         * @return {CanvasRenderingContext2D} the context that was used to invoke prepare()
         */
        finalize: function (node, context) {
            this._saveContext.drawImage(this._saveEntry._canvas, 0, 0);
            return this._saveContext;
        }
    }
);
