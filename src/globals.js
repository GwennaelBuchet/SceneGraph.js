/**
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
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  Except as contained in this notice, the name of Capgemini shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Capgemini.
 *
 *  These Terms of Use are subject to French law.
 *
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 * @date 21/06/2012
 *
 * Purpose:
 * global parameters for the application
 */
//current version of the framework
var cgsgVersion = "0.9.8.0";

//current display ratio
var cgsgDisplayRatio = CGSG_DEFAULT_DISPLAYRATIO;

//default threshold to detect the handle boxes on a resizable node
var cgsgResizeHandleThreshold = CGSG_DEFAULT_SELECTED_RESIZEHANDLE_THRESHOLD;

var cgsgExplorerParams = {
	IE10      : {name : "IE 10 or above", textDecalYTop : 4.3, textDecalYBottom : 1.26, textDecalYMiddle : 1.87, textDecalYAlpha : 0.983, webworker:false},
	IE9       : {name : "IE 9", textDecalYTop : 4.3, textDecalYBottom : 1.26, textDecalYMiddle : 1.87, textDecalYAlpha : 0.983, webworker:false},
	SAFARI    : {name : "Safari", textDecalYTop : 4.0, textDecalYBottom : 1.27, textDecalYMiddle : 1.77, textDecalYAlpha : 0.983, webworker:false},
	CHROME    : {name : "Chrome", textDecalYTop : 3.3, textDecalYBottom : 1.268, textDecalYMiddle : 2.09, textDecalYAlpha : 0.983, webworker:false},
	OPERA     : {name : "Opera", textDecalYTop : 3.5, textDecalYBottom : 1.28, textDecalYMiddle : 2.0, textDecalYAlpha : 0.995, webworker:false},
	FIREFOX   : {name : "Firefox", textDecalYTop : 10, textDecalYBottom : 1.23, textDecalYMiddle : 1.77, textDecalYAlpha : 0.983, webworker:false},
	KONQUEROR : {name : "Konqueror", textDecalYTop : 10, textDecalYBottom : 1.23, textDecalYMiddle : 1.77, textDecalYAlpha : 0.983, webworker:false},
	UNKNOWN   : {name : "Unknown", textDecalYTop : 10, textDecalYBottom : 1.23, textDecalYMiddle : 1.77, textDecalYAlpha : 0.983, webworker:false}
};

var cgsgCurrentExplorer = cgsgExplorerParams.UNKNOWN;

//the global ghost context for fake rendering
var cgsgGhostContext = null;

var cgsgCurrentFrame = 0;
