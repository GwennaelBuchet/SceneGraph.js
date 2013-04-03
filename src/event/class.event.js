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
        initialize : function(trigger, data) {

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
