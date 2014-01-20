/*
 * Copyright (c) 2013  Capgemini Technology Services (hereinafter “Capgemini”)
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

/**
 * Webview in action
 * @class CGSGView
 * @type {Object}
 * @author Corentin Azelart (corentin.azelart@capgemini.com)
 */
var CGMain = CGSGView.extend(
    {
        /**
         * Initialize the view.
         * @param canvas is the main canvas
         * @function
         * @public
         */
        initialize: function (canvas) {
            this._super(canvas);

            this.createScene();
            this.build();
            this.startPlaying();
        },

        /**
         * Create the scene.
         * @function
         * @private
         */
        createScene: function () {
            this.rootNode = new CGSGNodeSquare(0, 0, CGSG.canvas.width, CGSG.canvas.height);
            this.rootNode.color = "#6699aa";
            this.rootNode.isTraversable = true;
            CGSG.sceneGraph.addNode(this.rootNode, null);
        },

        /**
         * Build the node.
         * @function
         * @private
         */
        build: function () {
            // Create Webview
            this.webView = new CGSGNodeWebview(30, 30, 530, 500, "http://geek-and-poke.com/");
            this.webView.color = '#447799';
            this.webView.setPreviewURL("images/gap.png");
            this.rootNode.addChild(this.webView);

            // Create Switch button
            var switchButton = new CGSGNodeButton(this.rootNode.getWidth() - 160, this.rootNode.getHeight() - 50, "SWITCH MODE");
            CGSG.eventManager.bindHandler(switchButton, cgsgEventTypes.ON_CLICK, this.switchMode.bind(this));
            this.rootNode.addChild(switchButton);

            // Create state info
            this.switchMessage = new CGSGNodeText(30, this.rootNode.getHeight() - 41, "MODE : ");
            this.switchMessage.color = '#fff';
            this.switchMessage._size = 12;
            this.rootNode.addChild(this.switchMessage);

            // We display mode
            this.switchMessage.setText("MODE : LIVE", false);
        },

        /**
         * Switch the mode of webview, we have :
         * - LIVE
         * - PREVIEW
         * @function
         * @private
         */
        switchMode: function() {
            // We switch webview mode
            if(this.webView.getCurrentMode() === CGSGWEBVIEWMODE.LIVE) {
                this.webView.switchMode(CGSGWEBVIEWMODE.PREVIEW);
                this.switchMessage.setText("MODE : PREVIEW", false);
            } else {
                this.webView.switchMode(CGSGWEBVIEWMODE.LIVE);
                this.switchMessage.setText("MODE : LIVE", false);
            }
        }
    }
);
