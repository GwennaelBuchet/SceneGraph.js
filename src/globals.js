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
    GHOST : "ghost",
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
 * Current version of the framework
 * @property cgsgVersion
 * @static
 * @type {String}
 */
var cgsgVersion = "1.4.2";

/**
 * Current display ratio
 * @property cgsgDisplayRatio
 * @static
 * @type {CGSGScale}
 */
var cgsgDisplayRatio = CGSG_DEFAULT_DISPLAYRATIO;

/**
 * Default threshold to detect the handle boxes on a resizable node
 * @property cgsgResizeHandleThreshold
 * @static
 * @type {Number}
 */
var cgsgResizeHandleThreshold = CGSG_DEFAULT_SELECTED_RESIZEHANDLE_THRESHOLD;

/**
 * List of the parameters of different browsers
 * @property cgsgExplorerParams
 * @type {Object}
 */
var cgsgExplorerParams = {
    IE10      : {name : "IE 10 or above", browserName : "", fullVersion : "", textDecalYTop : 4.3, textDecalYBottom : 1.26, textDecalYMiddle : 1.87, textDecalYAlpha : 0.983, webworker : false},
    IE9       : {name : "IE 9", browserName : "", fullVersion : "", textDecalYTop : 4.3, textDecalYBottom : 1.26, textDecalYMiddle : 1.87, textDecalYAlpha : 0.983, webworker : false},
    SAFARI    : {name : "Safari", browserName : "", fullVersion : "", textDecalYTop : 4.0, textDecalYBottom : 1.27, textDecalYMiddle : 1.77, textDecalYAlpha : 0.983, webworker : false},
    CHROME    : {name : "Chrome", browserName : "", fullVersion : "", textDecalYTop : 3.3, textDecalYBottom : 1.268, textDecalYMiddle : 2.09, textDecalYAlpha : 0.983, webworker : false},
    OPERA     : {name : "Opera", browserName : "", fullVersion : "", textDecalYTop : 3.5, textDecalYBottom : 1.28, textDecalYMiddle : 2.0, textDecalYAlpha : 0.995, webworker : false},
    FIREFOX   : {name : "Firefox", browserName : "", fullVersion : "", textDecalYTop : 10, textDecalYBottom : 1.23, textDecalYMiddle : 1.77, textDecalYAlpha : 0.983, webworker : false},
    KONQUEROR : {name : "Konqueror", browserName : "", fullVersion : "", textDecalYTop : 10, textDecalYBottom : 1.23, textDecalYMiddle : 1.77, textDecalYAlpha : 0.983, webworker : false},
    UNKNOWN   : {name : "Unknown", browserName : "", fullVersion : "", textDecalYTop : 10, textDecalYBottom : 1.23, textDecalYMiddle : 1.77, textDecalYAlpha : 0.983, webworker : false}
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
 * The global ghost context for fake rendering
 * @property cgsgGhostContext
 * @readonly
 * @type {CanvasRenderingContext2D}
 */
var cgsgGhostContext = null;

/**
 * The current frame in hte global timeline
 * @property cgsgCurrentFrame
 * @readonly
 * @type {Number}
 */
var cgsgCurrentFrame = 0;

/**
 * The canvas container for this scene graph
 * @property cgsgCanvas
 * @readonly
 * @type {HTMLElement}
 */
var cgsgCanvas = null;

/**
 * the color used for the ghost mode rendering
 * @property _ghostColor
 * @type {String}
 * @public
 */
var cgsgGhostColor = "#FF0000";

/**
 * Number of frames to average the FPS.
 * Reduce this number to get more accurate FPS
 * @property cgsgFramerateDelay
 * @default CGSG_DEFAULT_FRAMERATE_DELAY
 * @type {Number}
 */
var cgsgFramerateDelay = CGSG_DEFAULT_FRAMERATE_DELAY;

/**
 * Maximum number of frames per second. Set it if you want your application to slow down.
 * @property cgsgMaxFramerate
 * @default CGSG_DEFAULT_MAX_FRAMERATE
 * @type {Number}
 * @example
 *     //limit the fps of the application to 30
 *     cgsgMaxFramerate = 30;
 */
var cgsgMaxFramerate = CGSG_DEFAULT_MAX_FRAMERATE;

/**
 * Instance of CollisionTesterFactory
 * @property cgsgCollisionTestFactory
 * @type {CGSGCollisionTesterFactory}
 */
var cgsgCollisionManager = new CGSGCollisionManager();

/**
 * Object that defines the performance keys.
 * Change values to adapt your project.
 *
 * cgsgPerformanceKeys._collisionMethod =
 * 	   		Key to specify collision detection mod
 * 	   	    Use setCollisionMethod to modify value;
 * 	   		Default : CGSGCollisionMethod.REGION
 *
 * cgsgPerformanceKeys.collisionTester =
 * 	   		Collision tester depending on _collisionMethod;
 * 	   		Default : CGSGCollisionRegionTester
 *
 * @property cgsgPerformanceKeys
 * @type {Object}
 */
var cgsgPerformanceKeys = {
    _collisionMethod : CGSGCollisionMethod.REGION,

    _cgsgCollisionTesterFactory : new CGSGCollisionTesterFactory(),

    collisionTester : new CGSGCollisionRegionTester(),

    /**
     * Redefines the collision method
	 * @method setCollisionMethod
     * @param method
     */
    setCollisionMethod : function(method){
        this._collisionMethod = method;
        this.collisionTester =  this._cgsgCollisionTesterFactory.getCollisionTester(this._collisionMethod);
    }
};

