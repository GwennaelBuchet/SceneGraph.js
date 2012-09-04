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
 * @date 09/07/12
 *
 * Purpose :
 * To propose some useful functions
 */

/**
 * @param object
 * @return true if the parmaeter !== null && !== undefined
 */
function cgsgExist(object) {
	return (object !== null && object !== undefined);
}

/**
 *
 */
function cgsgDetectCurrentExplorer() {
	cgsgCurrentExplorer = cgsgExplorerParams.UNKNOWN;

	var userAgent = navigator.userAgent;
	var browserName = navigator.appName;
	var fullVersion = '' + parseFloat(navigator.appVersion);
	var nameOffset, versionOffset;

	if ((versionOffset = userAgent.indexOf("Opera")) != -1) {
		cgsgCurrentExplorer = cgsgExplorerParams.OPERA;
		fullVersion = userAgent.substring(versionOffset + 6);
		if ((versionOffset = userAgent.indexOf("Version")) != -1) {
			fullVersion = userAgent.substring(versionOffset + 8);
		}
	}
	else if ((versionOffset = userAgent.indexOf("MSIE")) != -1) {
		browserName = "Microsoft Internet Explorer";
		cgsgCurrentExplorer = cgsgExplorerParams.IE9;
		fullVersion = userAgent.substring(versionOffset + 5);
		if (parseInt(fullVersion) >= 10) {
			cgsgCurrentExplorer = cgsgExplorerParams.IE10;
		}
	}
	else if ((versionOffset = userAgent.indexOf("Chrome")) != -1) {
		cgsgCurrentExplorer = cgsgExplorerParams.CHROME;
		fullVersion = userAgent.substring(versionOffset + 7);
	}
	else if ((versionOffset = userAgent.indexOf("Safari")) != -1) {
		cgsgCurrentExplorer = cgsgExplorerParams.SAFARI;
		fullVersion = userAgent.substring(versionOffset + 7);
		if ((versionOffset = userAgent.indexOf("Version")) != -1) {
			fullVersion = userAgent.substring(versionOffset + 8);
		}
	}
	else if ((versionOffset = userAgent.indexOf("Firefox")) != -1) {
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

	//Now, check for support for webworker
	if (typeof(Worker) !== "undefined") {
		cgsgCurrentExplorer.webworker = true;
	}
	else {
		cgsgCurrentExplorer.webworker = false;
	}
}
