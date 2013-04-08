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
        initialize: function() {
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
        apply : function(node) {
            // Remember keys for event bound to the node in order to unbound it...
            this._keyEvents.addOrReplace(node, {
                prepareKey : CGSG.eventManager.bindHandler(node, this._prepareEvent, this._bindEventAdapter),
                finalizeKey : CGSG.eventManager.bindHandler(node, this._finalizeEvent, this._bindEventAdapter)
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
        _internalApply : function(node) {

        },

        /**
         * Removes this mask from a node.
         *
         * @method remove
         * @param node CGSGNode the node
         */
        remove : function(node) {
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
        _internalRemove : function(node) {

        },

        /**
         * Observer method which catches key events to apply the mask.
         *
         * @method _eventAdapter
         * @param event {CGSGEvent} the event
         * @private
         */
        _eventAdapter : function(event) {
            switch (event.type) {
                case this._prepareEvent :
                    var ctx = this.prepare(event.observable, event.data.context);
                    event.data.context = ctx;

                    break;
                case this._finalizeEvent :
                    var ctx = this.finalize(event.observable, event.data.context);
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
        prepare : function(node, context) {
            // do nothing
        },

        /**
         * Method to override to finish the mask rendering.
         *
         * @method finalize
         * @param node {CGSGNode} the observed node
         * @param context {CanvasRenderingContext2D} the context
         */
        finalize : function(node, context) {
            // do nothing
        }
    }
);
