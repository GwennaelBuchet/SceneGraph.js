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
 * Global constants used by the framework
 *
 * @class GLOBAL_CONSTANTS
 * @module Util
 * @static
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */

/*
 * Default framerate for the rendering
 * @property CGSG_DEFAULT_FRAMERATE
 * @default 60
 * @type {Number}
 */
//var CGSG_DEFAULT_FRAMERATE = 60;

/**
 * Default ratio value for the display
 * @property CGSG_DEFAULT_DISPLAYRATIO
 * @default CGSGScale(1.0, 1.0)
 * @type {CGSGScale}
 */
var CGSG_DEFAULT_DISPLAYRATIO = new CGSGScale(1.0, 1.0);

/**
 * Default fill color for the drag selection selection rectangle
 * @property CGSG_DEFAULT_SELECTED_STROKE_COLOR
 * @default "#C0C0C0"
 * @type {String}
 */
var CGSG_DEFAULT_DRAG_SELECT_FILL_COLOR = "#C0C0C0";

/**
 * Default stroke color for the drag selection rectangle
 * @property CGSG_DEFAULT_DRAG_SELECT_STROKE_COLOR
 * @default "#808080"
 * @type {String}
 */
var CGSG_DEFAULT_DRAG_SELECT_STROKE_COLOR = "#808080";

/**
 * Default alpha value for the drag selection rectangle
 * @property CGSG_DEFAULT_DRAG_SELECT_ALPHA
 * @default 0.6
 * @type {Number}
 */
var CGSG_DEFAULT_DRAG_SELECT_ALPHA = 0.6;

/**
 * Default color for the selection stroke
 * @property CGSG_DEFAULT_SELECTED_STROKE_COLOR
 * @default "#FF6890"
 * @type {String}
 */
var CGSG_DEFAULT_SELECTED_STROKE_COLOR = "#FF6890";
/**
 * Default size for the selection stroke
 * @property CGSG_DEFAULT_SELECTED_STROKE_SIZE
 * @default 2
 * @type {Number}
 */
var CGSG_DEFAULT_SELECTED_STROKE_SIZE = 2;
/**
 * Default size for the resize handles at the corners of a selected node
 * @property CGSG_DEFAULT_SELECTED_RESIZEHANDLE_SIZE
 * @default 6
 * @type {Number}
 */
var CGSG_DEFAULT_SELECTED_RESIZEHANDLE_SIZE = 6;
/**
 * Default size for the resize handles at the corners of a selected node
 * @property CGSG_DEFAULT_SELECTED_RESIZEHANDLE_COLOR
 * @default "#9068FF"
 * @type {String}
 */
var CGSG_DEFAULT_SELECTED_RESIZEHANDLE_COLOR = "#9068FF";

/**
 * Default threshold to detect the handle boxes on a resizable node
 * @property CGSG_DEFAULT_SELECTED_RESIZEHANDLE_THRESHOLD
 * @default 3
 * @type {Number}
 */
var CGSG_DEFAULT_SELECTED_RESIZEHANDLE_THRESHOLD = 3;

/**
 * Default number of frames to average the FPS
 * @property CGSG_DEFAULT_FRAMERATE_DELAY
 * @default 30 (ie: each 30 frames)
 * @type {Number}
 */
var CGSG_DEFAULT_FRAMERATE_DELAY = 30;

/**
 * Default maximum number of frames per second.
 * @property CGSG_DEFAULT_MAX_FRAMERATE
 * @default NaN
 * @type {Number}
 */
var CGSG_DEFAULT_MAX_FRAMERATE = NaN;

/**
 * Default value for the double touch detection.
 * This property is the delay between 2 touches to be considered as a dbl touch event.
 * @property CGSG_DEFAULT_DBLTOUCH_DELAY
 * @default 250
 * @type {Number}
 */
var CGSG_DEFAULT_DBLTOUCH_DELAY = 250;