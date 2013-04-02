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

"use strict";

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
	    replaceHandler : function(key, handler) {
			var obs = key._observable;

		    // Direct access
		    if (!key._isAdditional) {
				obs[key._attributeName] = handler;
		    } else {
			    // Search through the array
			    var old = this._table.getValue(key);
			    var idx = obs[key._attributeName].indexOf(old);

			    if (idx !== -1) {
				    obs[key._attributeName][idx] = handler;
			    }
		    }

		    this._table.addOrReplace(key, handler)
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
        bindHandler : function(observable, eventName, handler) {
	        var additional = cgsgExist(observable[eventName]);
			var attributeName;

            // Bind member named with eventName first and then additional handlers are stored to an array
            if (additional) {
                attributeName = this._getHandlerPropertyName(eventName);

                // Array does not already exist
                if (!cgsgExist(observable[attributeName])) {
                    observable[attributeName] = [handler];
                } else {
                    observable[attributeName].push(handler);
                }
            } else {
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
        dispatch : function(observable, eventName, event) {
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
                    cgsgIterate(handler, function(i, handler) {
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
        unbindHandler : function(observable, eventName, handler) {
            var i, len, entry;

            // Handler to remove is the one corresponding to the attribute named with the eventName
            if (observable[eventName] === handler) {
                observable[eventName] = null;
            } else {
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
        unbindAll : function(observable, eventName) {
            // Attribute named with eventName is deleted
            observable[eventName] = null;

            var handlerProperty = this._getHandlerPropertyName(eventName);

            // Then delete additional handlers if they exist
            if (cgsgExist(observable[handlerProperty])) {
                var handlerProperty = this._getHandlerPropertyName(eventName);

                if (cgsgExist(observable[handlerProperty])) {
                    observable[handlerProperty].splice(0, observable[handlerProperty].length - 1);
                }
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
        _getHandlerPropertyName : function(eventName) {
            return this._handlerPropertyPrefix + eventName;
        }
    }
);