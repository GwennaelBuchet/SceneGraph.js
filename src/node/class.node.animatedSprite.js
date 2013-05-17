/*
 * Copyright (c) 2013  Capgemini Technology Services (hereinafter “Capgemini”)
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
 * A CGSGNodeSprite represent an animated sprite, with all animations in the image
 *
 * @class CGSGNodeSprite
 * @extends CGSGNode
 * @module Node
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {String} urlImage URL of the image. Can be null to be set later
 * @type {CGSGNodeSprite}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGNodeSprite = CGSGNode.extend(
    {
        initialize : function (x, y, urlImage) {
            this._super(x, y);

            /**
             * @property classType
             * @type {String}
             */
            this.classType = "CGSGNodeSprite";

            /**
             * array of animations
             * @property listAnimations
             * @type {Array}
             */
            this.listAnimations = [];
            /**
             * @property currentAnimation
             * @default null
             * @type {Object}
             */
            this.currentAnimation = null;
            /**
             * @property isProportionalResize
             * @default true
             * @type {Boolean}
             */
            this.isProportionalResize = true;

            /**
             * Current animated frame
             * @property _currentFrame
             * @private
             * @type {Number}
             */
            this._currentFrame = 0;
            /**
             * Whether the sprite is being animated or not
             * @property _isPlaying
             * @private
             * @readonly
             * @type {Boolean}
             */
            this._isPlaying = false;

            /**
             * Number of loops for the current animation. if -1 then it's an infinite loop.
             * @property _numberOfLoops
             * @private
             * @type {Number}
             */
            this._numberOfLoops = 1;
            /**
             * Current loop number
             * @property _currentLoop
             * @private
             * @type {Number}
             */
            this._currentLoop = 0;

            /**
             * URL of the image
             * @property _urlImage
             * @type {String}
             * @private
             */
            this._urlImage = urlImage;
            /**
             * The image object itself
             * @property _img
             * @type {Image}
             * @private
             */
            this._img = new Image();

            /**
             * @property _isLoaded
             * @type {Boolean}
             * @private
             */
            this._isLoaded = false;

            /**
             * Handler function fired when the image is loaded
             * @property onLoadEnd
             * @default null
             * @type {Function}
             */
            this.onLoadEnd = null;
            /**
             * Handler function fired after an animation loop is ended
             * @property onAnimationEnd
             * @default null
             * @type {Function}
             */
            this.onAnimationEnd = null;
            /**
             * Handler function fired before an animation loop start
             * @property onAnimationStart
             * @default null
             * @type {Function}
             */
            this.onAnimationStart = null;

            ///// INITIALIZATION //////
            //finally load the image
            if (this._urlImage !== null && this._urlImage != "") {
                this._img.onload = this._createDelegate(this, this._onImageLoaded);
                this._img.src = this._urlImage;
            }
        },

        /**
         * Used to call delegate method when the image is finally loaded
         * @private
         * @method _createDelegate
         * @param objectContext
         * @param delegateMethod
         * @return {Function}
         */
        _createDelegate : function (objectContext, delegateMethod) {
            return function () {
                return delegateMethod.call(objectContext);
            }
        },

        /**
         * fired when the image is loaded.
         * Check the dimension of the image and fired the onLoadEnd event
         * @protected
         * @method _onImageLoaded
         */
        _onImageLoaded : function () {
            this.checkDimension();
            this._isLoaded = true;
            //this._initShape();
            if (this.onLoadEnd !== null) {
                this.onLoadEnd();
            }
            this.invalidate();
        },

        /**
         * To be overrided when the image failed to load
         * @method _onImageError
         * @protected
         */
        _onImageError : function () {
            console.log("Error while loading image : " + this._urlImage);
        },

        /**
         * Check the true dimension of the image and fill the this.dimension property with it,
         * only if dimension is not already defined in the constructor
         * @method checkDimension
         */
        checkDimension : function () {
            //if no width or height are specified in the constructor
            if (this.dimension.width <= 0 && this.dimension.height <= 0) {
                this.dimension.width = this._img.width;
                this.dimension.height = this._img.height;
            }
        },

        /**
         * Set the image for this animated sprite.
         * @example
         *
         * this.pingoo = new CGSGNodeSprite(60, 60, null, this.context);
         * this.pingoo.isDraggable = true;
         * //name, speed, frames, sliceX, sliceY, width, height, framesPerLine
         * this.pingoo.addAnimation("front", 6, 4, 476, 0, 34, 34, 4);
         * this.pingoo.play("front", null);
         *
         * //now, load the image containing the sprite sheet.
         * //The affectation to the sprite will be done in the loaded handler function
         * this.spriteSheet = new Image();
         * this.spriteSheet.onload = this.onImageLoaded();
         * this.spriteSheet.src = "images/board.png";
         *
         * onImageLoaded : function () {
		 *	 this.pingoo.setImage(this.spriteSheet);
		 *	 this.numbers.setImage(this.spriteSheet);
         *   this.water.setImage(this.spriteSheet);
		 * }
         *
         * @method setImage
         * @param {Image} newImage new Image object. Must be an already loaded one
         */
        setImage : function (newImage) {
            this._img = newImage;
            if (cgsgExist(this._img)) {
                this._urlImage = this._img.src;
                this._isLoaded = true;
                this.invalidate();
            }
        },

        /**
         * Go to the next frame of the current animation
         * @public
         * @method goToNextFrame
         */
        goToNextFrame : function () {
            this._currentFrame += 1.0 / this.currentAnimation.speed;
            var isEndOfLoop = false;
            if (this._currentFrame >= this.currentAnimation.frames) {
                isEndOfLoop = true;
            }

            //end of animation if the previous modulo returns to frame 0
            if (isEndOfLoop) {
                //if this is the end ("... my only friend.. la la...") of the loop, stop it
                if (this._numberOfLoops < 0 || this._currentLoop < this._numberOfLoops) {
                    this._currentLoop++;
                    this.goToFirstFrame();
                }
                else {
                    this.goToLastFrame();
                    this.stop();
                }
            }

            this.invalidate();
        },

        /**
         * Go to the previous frame of the current animation
         * @public
         * @method goToPreviousFrame
         */
        goToPreviousFrame : function () {
            this._currentFrame -= this.currentAnimation.speed;
            var isStartOfLoop = false;
            if (this._currentFrame < 0) {
                isStartOfLoop = true;
            }

            //end of animation if the previous modulo returns to frame 0
            if (isStartOfLoop) {
                //if this is the end ("... my only friend.. la la...") of the loop, stop it
                if (this._numberOfLoops <= 0 || this._currentLoop >= 0) {
                    this._currentLoop--;
                    this.goToLastFrame();
                }
                else {
                    this.goToFirstFrame();
                    this.stop();
                }
            }

            this.invalidate();
        },

        /**
         * Go to the first frame of the current loop
         * @public
         * @method goToFirstFrame
         */
        goToFirstFrame : function () {
            this._currentFrame = 0;
            this.invalidate();
        },

        /**
         * Go to the last frame of the current loop
         * @public
         * @method goToLastFrame
         */
        goToLastFrame : function () {
            this._currentFrame = this.currentAnimation.frames - 1;
            this.invalidate();
        },

        /**
         * Must be defined to allow the scene graph to render the image nodes
         * @protected
         * @param {CanvasRenderingContext2D} context the context to render on
         * @method render
         * */
        render : function (context) {
            if (this._isLoaded && this._img.src != "") {

                //compute the current slice of the current sprite
                if (cgsgExist(this.currentAnimation)) {
                    context.globalAlpha = this.globalAlpha;

                    var slice = this.currentAnimation.slices[Math.floor(this._currentFrame)];

                    context.drawImage(
                        this._img, // image
                        slice.x,
                        slice.y, // start position on the image
                        this.currentAnimation.width,
                        this.currentAnimation.height, // dimension of the sprite
                        0,
                        0,
                        // position on the screen. let it to [0,0] because the 'beforeRender' function will translate the image
                        this.dimension.width,
                        this.dimension.height
                    );

                    //go to next frame
                    if (this._isPlaying) {
                        this.goToNextFrame();
                        this.invalidate();
                    }
                }
            }
        },

        /**
         * Return position x and y in the image for the slice of the animation and frame passed in parameter.
         * @private
         * @method _getSlice
         * @param {Number} frame
         * @param {Object} animation
         * @return {Object}
         */
        _getSlice : function (frame, animation) {
            var frameX = frame % animation.framesPerLine;
            var frameY = Math.floor(frame / animation.framesPerLine);

            var x = animation.sliceX + frameX * animation.width;
            var y = animation.sliceY + frameY * animation.height;

            return {x : x, y : y};
        },

        /**
         * Add an animation for this sprite
         * @public
         * @method addAnimation
         * @param {String} name Name for this animation
         * @param {Number} speed Number of frames between 2 steps
         * @param {Number} frames Number of frame for this animation
         * @param {Number} sliceX slice position inside the image for this animation
         * @param {Number} sliceY slice position inside the image for this animation
         * @param {Number} width width of 1 frame
         * @param {Number} height height of 1 frame
         * @param {Number} framesPerLine Number of frames per line in the image
         */
        addAnimation : function (name, speed, frames, sliceX, sliceY, width, height, framesPerLine) {
            var animation = {
                name          : name,
                speed         : speed,
                frames        : frames,
                sliceX        : sliceX,
                sliceY        : sliceY,
                width         : width,
                height        : height,
                framesPerLine : framesPerLine,
                slices        : []
            };

            for (var f = 0; f < frames; f++) {
                animation.slices.push(this._getSlice(f, animation));
            }

            this.listAnimations.push(animation);
            if (this.listAnimations.length == 1) {
                this.currentAnimation = animation;
            }

            this.dimension.width = width;
            this.dimension.height = height;
        },

        /**
         * Start an animation
         * @public
         * @method play
         * @param {String} animationName Name of the animation to start
         * @param {Number} loop number of animation loop. Can be null or negative to set infinite loop
         * @return {Boolean} true if the animation exists; false otherwise
         */
        play : function (animationName, loop) {
            if (loop === undefined || loop === null) {
                loop = -1;
            }

            this.currentAnimation = null;
            for (var i = 0; i < this.listAnimations.length; i++) {
                if (this.listAnimations[i].name === animationName) {
                    this.currentAnimation = this.listAnimations[i];
                    this.dimension.width = this.currentAnimation.width;
                    this.dimension.height = this.currentAnimation.height;
                    this.reset();
                    this._numberOfLoops = loop;
                    this._isPlaying = true;
                    this.resizeTo(this.currentAnimation.width, this.currentAnimation.height);
                    if (this.onAnimationStart !== null) {
                        this.onAnimationStart({animationName : animationName, loop : loop});
                    }
                    return true;
                }
            }
            return false;
        },

        /**
         * Stop the current animation and stay on the current frame
         * @public
         * @method stop
         */
        stop : function () {
            this._isPlaying = false;
            if (this.onAnimationEnd !== null) {
                this.onAnimationEnd({animationName : this.currentAnimation.name, loop : this._currentLoop, frame : this._currentFrame});
            }
            this.invalidate();
        },

        /**
         * return to the first frame of the first loop of the current animation
         * @public
         * @method reset
         */
        reset : function () {
            this._currentFrame = 0;
            this._currentLoop = 1;
            this.invalidate();
        },

        /**
         * @public
         * @method copy
         * @return {CGSGNodeSprite} a copy of this node
         */
        copy : function () {
            var node = new CGSGNodeSprite(this.position.x, this.position.y, this._urlImage);
            //call the super method
            node = this._super(node);

            node.listAnimations = [];
            for (var a = 0; a < this.listAnimations.length; a++) {
                node.addAnimation(this.listAnimations[a].name, this.listAnimations[a].speed,
                    this.listAnimations[a].frames, this.listAnimations[a].sliceX,
                    this.listAnimations[a].sliceY, this.listAnimations[a].width,
                    this.listAnimations[a].height, this.listAnimations[a].framesPerLine);
            }

            node.currentAnimation = this.currentAnimation;
            node.isProportionalResize = this.isProportionalResize;

            node._currentFrame = this._currentFrame;
            node._isPlaying = this._isPlaying;
            node._numberOfLoops = this._numberOfLoops;
            node._currentLoop = this._currentLoop;
            node._img = this._img;
            node._isLoaded = this._isLoaded;

            node.onLoadEnd = this.onLoadEnd;
            node.onAnimationEnd = this.onAnimationEnd;
            node.onAnimationStart = this.onAnimationStart;

            if (this._urlImage !== null && this._urlImage != "") {
                node._img.onload = node._createDelegate(node, node._onImageLoaded, node.context);
                node._img.src = node._urlImage;
            }

            return node;
        }
    }
);
