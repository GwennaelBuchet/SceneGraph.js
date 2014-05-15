/**
 * Copyright (c) 2014 Gwennael Buchet
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
 *  Terms of Use causing significant harm to Gwennael Buchet.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  Except as contained in this notice, the name of Gwennael Buchet shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Gwennael Buchet.
 *
 *  These Terms of Use are subject to French law.
 *
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 * @date 10/08/2012
 *
 * Purpose :
 * animation example
 * */
var CGMain = CGSGView.extend(
    {
        initialize:function (canvas) {

            this._super(canvas);

            ////// INITIALIZATION /////////

            //this.initializeCanvas();

            this.createScene();

            this.startPlaying();
        },

        initializeCanvas:function () {
            //redimensionnement du canvas pour être full viewport en largeur
            this.viewDimension = cgsgGetRealViewportDimension();
            this.setCanvasDimension(this.viewDimension);
        },

        /**
         *
         *
         */
        createScene:function () {
            //first create a root node with an arbitrary position
            this.rootNode = new CGSGNode(0, 0);
            CGSG.sceneGraph.addNode(this.rootNode, null);

            //add a text node ("click me") with a onClick event
            var buttonNode = new CGSGNodeButton(10, 10, "Click Me.\n" +
                "Animation is precomputed once and played by several nodes.");
            //bind the "this.moveSquare" function to this.
            var bindMoveSquare = this.moveSquares.bind(this);
	        buttonNode.onClick = function (event) {
                bindMoveSquare();
            }
            //add the textNode as child of the root
            this.rootNode.addChild(buttonNode);

            this.squareNode1 = new CGSGNodeSquare(30, 80, 100, 100);
            this.rootNode.addChild(this.squareNode1);

            this.squareNode2 = new CGSGNodeSquare(30, 200, 100, 100);
            this.rootNode.addChild(this.squareNode2);

            this.squareNode3 = new CGSGNodeSquare(30, 320, 100, 100);
            this.rootNode.addChild(this.squareNode3);


            /**
             * The purpose here is to pre-compute values of animation when you need to apply the same animation several
             * times (may be not on several nodes).
             *
             * To achieve this, we will :
             *      - first simulate an animation on an arbitrary node
             *      - export the values computed in the generated timeline
             *      - then import theses values into timelines when need to use them
             */

            //create arbitrary animation on squareNode1
            var timeline = this.addAnimation(this.squareNode1);
            //save animation values into this.animationValues
            this.animationValues = timeline.exportValues();
            //no need to keep animation values or keys in memory. free them
            timeline.removeAll();
        },

        /**
         *
         * @param node
         */
        addAnimation : function(node) {
            var timeline = CGSG.animationManager.getTimeline(node, "position.x");
            CGSG.animationManager.addAnimationKey(timeline, 0, 30);
            CGSG.animationManager.addAnimationKey(timeline, 50, 300); //precompute
            timeline.compute();

            return timeline;

            //we cal also use the helper method which add 2 animation keys ('from' and 'to'):
            //CGSG.animationManager.animate(this.squareNode1, "position.x", 30, 300, 50, true);
        },

        /**
         * The method is called to move the 3 squares, with the same pre-computed animation values.
         */
        moveSquares:function () {
            //import values into the timeline, starting to the current frame (or later if you need)
            CGSG.animationManager.getTimeline(this.squareNode1, "position.x").importValues(this.animationValues, CGSG.currentFrame);
            CGSG.animationManager.getTimeline(this.squareNode2, "position.x").importValues(this.animationValues, CGSG.currentFrame);
            CGSG.animationManager.getTimeline(this.squareNode3, "position.x").importValues(this.animationValues, CGSG.currentFrame);
        }

    }
)
