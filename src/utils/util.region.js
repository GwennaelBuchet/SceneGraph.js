/**
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
 * @date 20/08/2012
 *
 * Purpose:
 * Global design parameters used for a best mouse position tracking
 */
cgsgStylePaddingLeft = 0;
cgsgStylePaddingTop = 0;
cgsgStyleBorderLeft = 0;
cgsgStyleBorderTop = 0;

/**
 * @return a CGSGDimension as the real viewport dimension
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
 * @return a CGSGDimension as the viewport region
 */
function cgsgGetDisplayedViewportDimension() {
	var realDim = cgsgGetRealViewportDimension();
	return new CGSGDimension(Math.round(realDim.width / cgsgDisplayRatio.x),
							 Math.round(realDim.height / cgsgDisplayRatio.y));
}

/**
 * @return true if the point is inside the region or around this one in a distance of threshold
 * @param point a CGSGPosition
 * @param targetRegion a CGSGRegion
 * @param threshold an integer
 */
function cgsgPointIsInRegion(point, targetRegion, threshold) {
	if (point.x >= (targetRegion.position.x - threshold) &&
		point.y >= (targetRegion.position.y - threshold) &&
		point.x <= (targetRegion.position.x + targetRegion.dimension.width + threshold) &&
		point.y <= (targetRegion.position.y + targetRegion.dimension.height + threshold)) {
		return true;
	}

	return false;
}

/**
 * @return true if the point is inside the region or around this one in a distance of threshold
 * @param region a CGSGRegion
 * @param targetRegion a CGSGRegion
 * @param threshold an integer
 */
function cgsgRegionIsInRegion(region, targetRegion, threshold) {
	if (region.position.x >= (targetRegion.position.x - threshold) &&
		region.position.y >= (targetRegion.position.y - threshold) &&
		(region.position.x + region.dimension.width) <=
		(targetRegion.position.x + targetRegion.dimension.width + threshold) &&
		(region.position.y + region.dimension.height) <=
		(targetRegion.position.y + targetRegion.dimension.height + threshold)) {
		return true;
	}

	return false;
}

/**
 * Return the mouse or touch position relative to the canvas
 * @param event a touch or mouse Event
 * @param canvas a handler to the Canvas element
 * @return A CGSGPosition object
 */
function cgsgGetCursorPosition(event, canvas) {
	var element = canvas, offsetX = 0, offsetY = 0, posX = 0, posY = 0;

	var touch;
	if (event.targetTouches) {
		touch = event.targetTouches[0];
	}

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

	return new CGSGPosition((event.pageX - offsetX) / cgsgDisplayRatio.x, (event.pageY - offsetY) / cgsgDisplayRatio.y);
}

