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
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  Except as contained in this notice, the name of Capgemini shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Capgemini.
 *
 *  These Terms of Use are subject to French law.
 *
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 * @date 10/08/2012
 *
 * Purpose :
 * animated sprite example
 * */
var CGMain = CGSGScene.extend(
    {
        initialize:function (canvas) {
            this._super(canvas);

            ////// INITIALIZATION /////////

            this.initializeCanvas();
            this.createScene();

            this.startPlaying();
        },

        initializeCanvas:function () {
            //redimensionnement du canvas pour être full viewport en largeur
            this.viewDimension = cgsgGetRealViewportDimension();
            this.setCanvasDimension(this.viewDimension);
        },

        /**
         * Create a complete character with several animations in the same sprite sheet (ie the same image)
         */
        createScene:function () {

			var rootNode = new CGSGNode(0, 0, 0, 0);
			this.sceneGraph.addNode(rootNode, null);



			var before = new Date();
			//cgsgClearContext(this.context);
			this.context.clearRect(0, 0, cgsgCanvas.width, cgsgCanvas.height);

			var s1 = new CGSGNodeSquare(10, 10, 100, 100);
			rootNode.addChild(s1);

			//this.context.scale(0.001, 0.001);
			//this.context.getImageData(0, this.context.wi)

			//var imageDataUrl = cgsgCanvas.toDataURL("image/png");


			var drawn   = null;
			var d       = this.context.getImageData(0, 0, cgsgCanvas.width, cgsgCanvas.height); //image data
			var len     = d.data.length;
			for(var i =0; i< len; i++) {
				if(!d.data[i]) {
					drawn = false;
				}else if(d.data[i]) {
					drawn = true;
					console.log('Canvas not empty');
					break;
				}
			}
			if(!drawn) {
				console.log('Canvas empty');
			}

			var after = new Date();
			console.log("durée = " + (after.getTime() - before.getTime()) / 1000);


			//console.log(imageDataUrl);
		}
    }
);
