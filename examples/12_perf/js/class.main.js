/*
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
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  Except as contained in this notice, the name of Capgemini shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Capgemini.
 *
 *  These Terms of Use are subject to French law.
 */

var total = 1000;
var delta = 25;
var blobs = [];
var maxx, maxy;
var msg;
var myfps = 60;


var CGMain = CGSGView.extend(
    {
        initialize: function (canvas) {
            this._super(canvas);

            this.createScene();

            this.startPlaying();
        },


        createScene: function () {
            this.rootNode = new CGSGNodeSquare(0, 0, CGSG.canvas.width, CGSG.canvas.height);
            this.rootNode.color = "#000000";
            this.rootNode.isTraversable = false;
            this.sceneGraph.addNode(this.rootNode, null);

            this.mousePosition = new CGSGPosition();
            maxx = CGSG.canvas.width - delta;
            maxy = CGSG.canvas.height - delta;

            // Blob
            this.blobSrc = new Image();

            // Load
            this.blobSrc.src = 'http://www.as-flash.com/ne_brisi/canvas/blob.png';
            this.blobSrc.name = 'blob';
            this.blobSrc.onload = this.onLoaded.bind(this);

        },

        onLoaded: function () {
            for (var i = 0; i < total; i++) {
                blobs[i] = new CGSGNodeImageEx(0, 0);
                blobs[i].setImage(this.blobSrc);
                //blobs[i] = new CGSGNodeSquare(0, 0, 10, 10);
                //blobs[i].setPrecomputed(true);
                blobs[i].isTraversable = false;
                blobs[i].vx = 0;
                blobs[i].vy = 0;
            }

            this.build();
        },

        // build
        build: function () {
            for (var i = 0; i < total; i++) {
                blobs[i].translateTo(Math.random() * maxx,  Math.random() * maxy);
                this.rootNode.addChild(blobs[i]);
            }

            var title = new CGSGNodeText(10, 20, "HTML5 Canvas, cgSceneGraph, " + total + " particles");
            title.setSize(12, true);
            title.color = "#ffffff";
            title.isTraversable = false;
            this.rootNode.addChild(title);
            title.setPrecomputed(true);

            msg = new CGSGNodeText(10, 40, "FPS: ");
            msg.setSize(12, true);
            msg.color = "#ffffff";
            msg.isTraversable = false;
            this.rootNode.addChild(msg);
            msg.setPrecomputed(true);

            // TICKER
            CGSG.maxFramerate = myfps;

            this.onRenderEnd = this.tick.bind(this);
        },

        onMouseMove: function (event) {
            this.mousePosition = cgsgGetCursorPositions(event, CGSG.canvas)[0];
        },

        tick: function () {
            for (var i = 0; i < total; i++) {
                var blob = blobs[i];
                var dx = blob.position.x - this.mousePosition.x;
                var dy = blob.position.y -  this.mousePosition.y;
                var vx = blob.vx;
                var vy = blob.vy;
                if (dx * dx + dy * dy <= 10000) {
                    vx += dx * 0.01;
                    vy += dy * 0.01;
                }
                vx *= 0.95;
                vy *= 0.95;

                vx += Math.random() - 0.5;
                vy += Math.random() - 0.5;

                var x = blob.position.x/* += vx*/;
                var y = blob.position.y/* += vy*/;
                blob.translateWith(vx, vy, false);

                if (x < 0 || x > maxx || y < 0 || y > maxy) {
                    var r = Math.atan2(y - maxy / 2, x - maxx / 2);
                    vx = -Math.cos(r);
                    vy = -Math.sin(r);
                }

                blob.vx = vx;
                blob.vy = vy;
            }

            msg.setText("FPS: " + Math.round(CGSG.fps) + " / " + myfps);
        }


    }
);
