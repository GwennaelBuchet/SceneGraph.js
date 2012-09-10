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
 * @date 07/07/2012
 *
 * Purpose:
 * Subclassing CGSGNode.
 *
 */
var GrassNode = CGSGNode.extend(
    {
        initialize:function (x, y, width, height) {
            //call the initialize of the parent
            this._super(x, y, width, height);

            //define the classType with the name of the class
            this.classType = "GrassNode";

            //define attributes of your custom node
            this.firstColor = "white";
            this.lastColor = "LightGray";

            //fake canvas to pre-render static display
            this.tmpCanvas = null;
            this.initShape();

            //random values for scaling animation
            this.scaleXSpeed = 8.0 + Math.random() * 8.0;
            this.scaleYSpeed = 16.0 + Math.random() * 2.0;


        },

        initShape:function () {
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCanvas.width = 400;
            this.tmpCanvas.height = 300;
            var tmpContext = this.tmpCanvas.getContext('2d');

            tmpContext.beginPath();

            var startX = 10;
            var startY = 140;

            var h = startY;
            var w = 5;
            var w2 = w * 2;
            var def = w / (-3.0 + Math.random() * 6.0);
            var px = startX;

            tmpContext.moveTo(startX, startY);
            for (var g = 0; g < 10; g++) {
                tmpContext.bezierCurveTo(px + w + def, /*startY - h*/h, px + w + def, /*startY - h*/h, px + w2, startY + 0);

                h = 4.0 + Math.random() * 8.0;
                w = 5;
                w2 = w * 2;
                def = -2.0 + Math.random() * 4.0;

                px += w2;
            }

            tmpContext.lineWidth = 1;
            // line color
            tmpContext.strokeStyle = "black";
            tmpContext.stroke();
            tmpContext.fillStyle = "green";
            tmpContext.fill();
        },

        /**
         * @override
         * Must be defined to allow the scene graph to render the image nodes
         * */
        render:function (context) {
            //save current state
            //always call it
            this.beforeRender(context);

            context.globalAlpha = this.globalAlpha;

            //custom rendering
            var widthScale = Math.sin(cgsgCurrentFrame / this.scaleXSpeed) * 0.01 + 0.99;
            var heightScale = -1 * Math.sin(cgsgCurrentFrame / this.scaleYSpeed) * 0.01 + 0.99;
            context.scale(widthScale, heightScale);
            context.drawImage(this.tmpCanvas, 0, 0);

            //restore state
            //always call it
            this.afterRender(context);
        },

        /**
         *
         * @return a copy of this node
         */
        copy:function () {
            var node = new CloudNode(this.position.x, this.position.y, this.dimension.width,
                this.dimension.height);
            //call the super method
            node = this._super(node);

            //node.color = this.color;
            //node.lineColor = this.lineColor;
            //node.lineWidth = this.lineWidth;

            return node;
        }
    }
);
