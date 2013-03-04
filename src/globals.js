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
 */

/**
 * List the methods to check the pick on a node
 * @class CGSGPickNodeMethod
 * @type {Object}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
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
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
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
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
 var CGSG = {

    /**
     * Current version of the framework
     * @property cgsgVersion
     * @static
     * @type {String}
     */
    version : "2.0.0-SNAPSHOT",

    /**
     * Current display ratio
     * @property displayRatio
     * @static
     * @type {CGSGScale}
     */
    displayRatio : CGSG_DEFAULT_DISPLAYRATIO,

    /**
     * Default threshold to detect the handle boxes on a resizable node
     * @property resizeHandleThreshold
     * @static
     * @type {Number}
     */
    resizeHandleThreshold : CGSG_DEFAULT_SELECTED_RESIZEHANDLE_THRESHOLD,

    /**
     * The current frame in hte global timeline
     * @property currentFrame
     * @readonly
     * @type {Number}
     */
    currentFrame : 0,

    /**
     * The canvas container for this scene
     * @property canvas
     * @readonly
     * @type {HTMLElement}
     */
    canvas : null,

    /**
     * The main rendering 2D context for this scene
     * @property context
     * @type {CanvasRenderingContext2D}
     */
    context : null,

    /**
     * The global ghost context for fake rendering
     * @property ghostContext
     * @readonly
     * @type {CanvasRenderingContext2D}
     */
    ghostContext : null,

    /**
     * the color used for the ghost mode rendering
     * @property ghostColor
     * @type {String}
     * @public
     */
    ghostColor : "#FF0000",

    /**
     * Number of frames to average the FPS.
     * Reduce this number to get more accurate FPS
     * @property framerateDelay
     * @default CGSG_DEFAULT_FRAMERATE_DELAY
     * @type {Number}
     */
    framerateDelay : CGSG_DEFAULT_FRAMERATE_DELAY,

    /**
     * Maximum number of frames per second. Set it if you want your application to slow down.
     * @property maxFramerate
     * @default CGSG_DEFAULT_MAX_FRAMERATE
     * @type {Number}
     * @example
     *     //limit the fps of the application to 30
     *     CGSG.maxFramerate : 30,
     */
    maxFramerate : CGSG_DEFAULT_MAX_FRAMERATE,

    /**
     * Instance of CollisionTesterFactory
     * @property collisionTestFactory
     * @type {CGSGCollisionTesterFactory}
     */
    collisionManager : new CGSGCollisionManager(),

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
    performanceKeys : {
        _collisionMethod: CGSGCollisionMethod.REGION,

        _cgsgCollisionTesterFactory: new CGSGCollisionTesterFactory(),

        collisionTester: new CGSGCollisionRegionTester(),

        /**
         * Redefines the collision method
         * @method setCollisionMethod
         * @param method
         */
        setCollisionMethod: function (method) {
            this._collisionMethod = method,
            this.collisionTester = this._cgsgCollisionTesterFactory.getCollisionTester(this._collisionMethod);
        }
    }
};

