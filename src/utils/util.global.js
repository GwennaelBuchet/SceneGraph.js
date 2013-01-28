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
 * Global methods
 *
 * @class GLOBAL_METHODS
 * @module Util
 * @static
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */

/**
 * @method cgsgExist
 * @param object {Object}
 * @return {boolean} true if the parameter !== null && !== undefined
 */
function cgsgExist(object) {
	return (object !== null && object !== undefined);
}

/**
 * @method cgsgDetectCurrentExplorer
 */
function cgsgDetectCurrentExplorer() {
	//noinspection JSUndeclaredVariable
	cgsgCurrentExplorer = cgsgExplorerParams.UNKNOWN;

	var userAgent = navigator.userAgent;
	var browserName = navigator.appName;
	var fullVersion = '' + parseFloat(navigator.appVersion);
	var nameOffset, versionOffset;

	if ((versionOffset = userAgent.indexOf("Opera")) != -1) {
		//noinspection JSUndeclaredVariable
		cgsgCurrentExplorer = cgsgExplorerParams.OPERA;
		fullVersion = userAgent.substring(versionOffset + 6);
		if ((versionOffset = userAgent.indexOf("Version")) != -1) {
			fullVersion = userAgent.substring(versionOffset + 8);
		}
	}
	else if ((versionOffset = userAgent.indexOf("MSIE")) != -1) {
		browserName = "Microsoft Internet Explorer";
		//noinspection JSUndeclaredVariable
		cgsgCurrentExplorer = cgsgExplorerParams.IE9;
		fullVersion = userAgent.substring(versionOffset + 5);
		if (parseInt(fullVersion) >= 10) {
			//noinspection JSUndeclaredVariable
			cgsgCurrentExplorer = cgsgExplorerParams.IE10;
		}
	}
	else if ((versionOffset = userAgent.indexOf("Chrome")) != -1) {
		//noinspection JSUndeclaredVariable
		cgsgCurrentExplorer = cgsgExplorerParams.CHROME;
		fullVersion = userAgent.substring(versionOffset + 7);
	}
	else if ((versionOffset = userAgent.indexOf("Safari")) != -1) {
		//noinspection JSUndeclaredVariable
		cgsgCurrentExplorer = cgsgExplorerParams.SAFARI;
		fullVersion = userAgent.substring(versionOffset + 7);
		if ((versionOffset = userAgent.indexOf("Version")) != -1) {
			fullVersion = userAgent.substring(versionOffset + 8);
		}
	}
	else if ((versionOffset = userAgent.indexOf("Firefox")) != -1) {
		//noinspection JSUndeclaredVariable
		cgsgCurrentExplorer = cgsgExplorerParams.FIREFOX;
		fullVersion = userAgent.substring(versionOffset + 8);
	}
	else if ((nameOffset = userAgent.lastIndexOf(' ') + 1) <
			 (versionOffset = userAgent.lastIndexOf('/'))) {
		browserName = userAgent.substring(nameOffset, versionOffset);
		fullVersion = userAgent.substring(versionOffset + 1);
		if (browserName.toLowerCase() == browserName.toUpperCase()) {
			browserName = navigator.appName;
		}
	}

	cgsgCurrentExplorer.fullVersion = fullVersion;
	cgsgCurrentExplorer.browserName = browserName;

	//Now, check for support for webworker
	cgsgCurrentExplorer.webworker = typeof(Worker) !== "undefined";
}

/*
 * Load asynchronously an external page and return the content (or null)
 *
 * @method cgsgLoadExternalDoc
 * @async
 * @beta
 * @param url {String} Page to load
 * @param successCallback {function} an function handler to call on success. The function must take the content ({String} as parameter)
 * @param errorCallback {function} an function handler to call on error
 */
/*function cgsgLoadExternalDoc (url, successCallback, errorCallback) {
 var xhr;
 if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
 xhr = new XMLHttpRequest();
 }
 else {// code for IE6, IE5
 try {
 xhr = new ActiveXObject("Msxml2.XMLHTTP");
 }
 catch (e) {
 xhr = new ActiveXObject("Microsoft.XMLHTTP");
 }
 }
 xhr.onreadystatechange = function () {
 if (xhr.readyState == 4 && xhr.status == 200) {
 successCallback(xhr.responseText);
 }
 else {
 errorCallback(xhr.responseText);
 }
 };
 xhr.open("GET", url, true);
 xhr.send();
 }*/

cgsgStylePaddingLeft = 0;
cgsgStylePaddingTop = 0;
cgsgStyleBorderLeft = 0;
cgsgStyleBorderTop = 0;

/**
 * @method cgsgGetRealViewportDimension
 * @return {CGSGDimension} a CGSGDimension as the real viewport dimension
 */
function cgsgGetRealViewportDimension() {
	var e = window, a = 'inner';
	if (!( 'innerWidth' in window )) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return new CGSGDimension(e[a + 'Width'], e[a + 'Height']);
}

/**
 * @method cgsgGetDisplayedViewportDimension
 * @return {CGSGDimension} a CGSGDimension as the viewport region
 */
function cgsgGetDisplayedViewportDimension() {
	var realDim = cgsgGetRealViewportDimension();
	return new CGSGDimension(Math.round(realDim.width / cgsgDisplayRatio.x),
							 Math.round(realDim.height / cgsgDisplayRatio.y));
}

/**
 * @method cgsgPointIsInRegion
 * @return {Boolean} true if the point is inside the region or around this one in a distance of threshold
 * @param point a CGSGPosition
 * @param targetRegion a CGSGRegion
 * @param threshold an integer
 */
function cgsgPointIsInRegion(point, targetRegion, threshold) {
	return point.x >= (targetRegion.position.x - threshold) &&
		   point.y >= (targetRegion.position.y - threshold) &&
		   point.x <= (targetRegion.position.x + targetRegion.dimension.width + threshold) &&
		   point.y <= (targetRegion.position.y + targetRegion.dimension.height + threshold);
}

/**
 * @method cgsgRegionIsInRegion
 * @return {Boolean} true if the point is inside the region or around this one in a distance of threshold
 * @param region a CGSGRegion
 * @param targetRegion a CGSGRegion
 * @param threshold an integer
 */
function cgsgRegionIsInRegion(region, targetRegion, threshold) {
	return region.position.x >= (targetRegion.position.x - threshold) &&
		   region.position.y >= (targetRegion.position.y - threshold) &&
		   (region.position.x + region.dimension.width) <=
		   (targetRegion.position.x + targetRegion.dimension.width + threshold) &&
		   (region.position.y + region.dimension.height) <=
		   (targetRegion.position.y + targetRegion.dimension.height + threshold);
}

/**
 * Return the mouse or touch positions relative to the canvas
 * @method cgsgGetCursorPositions
 * @param {Event} event a touch or mouse Event
 * @param {HTMLElement} canvas a handler to the Canvas element
 * @return {Array} Array of CGSGPosition object
 */
function cgsgGetCursorPositions(event, canvas) {
	var element = canvas, offsetX = 0, offsetY = 0, positions = [];

	if (element.offsetParent) {
		do {
			offsetX += element.offsetLeft;
			offsetY += element.offsetTop;
		} while ((element = element.offsetParent));
	}

	// Add padding and border style widths to offset
	offsetX += cgsgStylePaddingLeft;
	offsetY += cgsgStylePaddingTop;

	offsetX += cgsgStyleBorderLeft;
	offsetY += cgsgStyleBorderTop;

	var touch = event;
	//if multi-touch, get all the positions
	if (event.targetTouches) { // or changedTouches
		var touchPoints = (typeof event.targetTouches !== 'undefined') ? event.targetTouches : [event];
		for (var i = 0; i < touchPoints.length; i++) {
			touch = touchPoints[i];

			positions.push(new CGSGPosition((touch.pageX - offsetX) / cgsgDisplayRatio.x,
											(touch.pageY - offsetY) / cgsgDisplayRatio.y));
		}
	}
	else {
		positions.push(new CGSGPosition((touch.pageX - offsetX) / cgsgDisplayRatio.x,
										(touch.pageY - offsetY) / cgsgDisplayRatio.y));
	}

	return positions;
}

/**
 * Wipes the canvas context
 * @private
 * @method cgsgClearContext
 * @param {CanvasRenderingContext2D} context context to render on
 * */
function cgsgClearContext(context) {
	context.setTransform(1, 0, 0, 1, 0, 0);
	// Will always clear the right space
	context.clearRect(0, 0, cgsgCanvas.width, cgsgCanvas.height);
}

/**
 * @method cgsgFree
 * @param {*} object
 */
function cgsgFree(object) {
	object = null;
}