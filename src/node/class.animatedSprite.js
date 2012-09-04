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
 * @date 29/08/2012
 *
 * Purpose:
 * Subclassing CGSGNode and reprenseting an animated sprite.
 * @param x
 * @param y
 * @param urlImage can be null.
 * @param context
 *
 * A CGSGAnimatedSprite represent an animated sprite, with all animations in the image
 *
 * Usage:
 *   var player = new CGSGAnimatedSprite(0, 0, "http://server.com/monimage.fr", this.context);
 * or
 *   var player = new CGSGAnimatedSprite(0, 0, null, this.context);
 *   player.setImage(mySharedImage); //to load 1 image with all sprites inside
 *
 *   //addAnimation(name, speed, number of frames, posX of first frame, posY of first frame,
 *                  width of a sprite, height of a sprite, number of frame on one line in the image)
 *   player.addAnimation( { name:"walk", speed:0.2, frames:6, sliceX:0, sliceY:0, width:32, height:32, framesPerLine } );
 *
 *   player.play("walk"); //("name of the animation"); if no 2nd parameter, will be played infinitely
 *   player.play("walk", null); //("name of the animation", number of loops;null for infinite);
 *   player.play("walk", -1); //("name of the animation", number of loops;-1 for infinite);
 *   player.play("jump", 1); //("name of the animation", number of loops;-1 for infinite);
 */
var CGSGNodeAnimatedSprite = CGSGNode.extend(
	{
		initialize : function (x, y, urlImage, context) {
			this._super(x, y, 1, 1);

			///// @public //////
			this.classType = "CGSGNodeAnimatedSprite";

			//array of animations
			this.listAnimations = [];
			this.currentAnimation = null;
			this.isProportionalResize = true;

			//current animated frame
			this.currentFrame = 0;
			this.isPlaying = false;
			//number of loops for the current animation. if -1 then it's an infinite loop.
			this.numberOfLoops = 1;
			this.currentLoop = 0;

			//url of the image
			this.urlImage = urlImage;
			//the image object itself
			this.img = new Image();
			///// @private //////
			this._isLoaded = false;
			this._context = context;

			this.onLoadEnd = null;
			this.onAnimationEnd = null;
			this.onAnimationStart = null;

			///// INITIALIZATION //////
			//finally load the image
			if (this.urlImage !== null && this.urlImage != "") {
				this.img.onload = this.createDelegate(this, this._onImageLoaded, context);
				this.img.src = this.urlImage;
			}
		},

		/**
		 * @private
		 * @param contextObject
		 * @param delegateMethod
		 * @return {Function}
		 */
		createDelegate : function (objectContext, delegateMethod, renderContext) {
			return function () {
				return delegateMethod.call(objectContext, renderContext);
			}
		},

		/**
		 * @private
		 * fired when the image is loaded
		 */
		_onImageLoaded : function (context) {
			this._checkDimension();
			this._isLoaded = true;
			if (this.onLoadEnd !== null) {
				this.onLoadEnd();
			}
			this.render(this._context);
		},

		/**
		 * @private
		 */
		_checkDimension : function () {
			//if no width or height are specified in the constructor
			if (this.dimension.width <= 0 && this.dimension.height <= 0) {
				this.dimension.width = this.img.width;
				this.dimension.height = this.img.height;
			}
		},

		/**
		 * @public
		 * @param newImage new Image object. Must be an already loaded one
		 */
		setImage : function (newImage) {
			this.img = newImage;
			this._isLoaded = true;
		},

		/**
		 * @public
		 * go to the next frame of the current animation
		 */
		goToNextFrame : function () {
			this.currentFrame += 1.0 / this.currentAnimation.speed;
			var isEndOfLoop = false;
			if (this.currentFrame >= this.currentAnimation.frames) {
				isEndOfLoop = true;
			}

			//end of animation if the previous modulo returns to frame 0
			if (isEndOfLoop) {
				//if this is the end ("... my only friend.. la la...") of the loop, stop it
				if (this.numberOfLoops < 0 || this.currentLoop < this.numberOfLoops) {
					this.currentLoop++;
					this.goToFirstFrame();
					;
				}
				else {
					this.goToLastFrame();
					this.stop();
				}
			}
		},

		/**
		 * @public
		 * go to the previous frame of the current animation
		 */
		goToPreviousFrame : function () {
			this.currentFrame -= this.currentAnimation.speed;
			var isStartOfLoop = false;
			if (this.currentFrame < 0) {
				isStartOfLoop = true;
			}

			//end of animation if the previous modulo returns to frame 0
			if (isStartOfLoop) {
				//if this is the end ("... my only friend.. la la...") of the loop, stop it
				if (this.numberOfLoops <= 0 || this.currentLoop >= 0) {
					this.currentLoop--;
					this.goToLastFrame();
				}
				else {
					this.goToFirstFrame();
					this.stop();
				}
			}
		},

		/**
		 * @public
		 * Go to the first frame of the current loop;
		 */
		goToFirstFrame : function () {
			this.currentFrame = 0;
		},

		/**
		 * @public
		 * Go to the last frame of the current loop
		 */
		goToLastFrame : function () {
			this.currentFrame = this.currentAnimation.frames - 1;
		},

		/**
		 * @override
		 * Must be defined to allow the scene graph to render the image nodes
		 * */
		render : function (context) {
			if (this._isLoaded && this.img.src != "") {
				//save current state
				this.beforeRender(context);

				//compute the current slice of the current sprite
				var slice = this.currentAnimation.slices[Math.floor(this.currentFrame)];
				if (this.currentAnimation !== null) {
					context.drawImage(
						this.img, // image
						slice.x, slice.y, // start position on the image
						this.currentAnimation.width, this.currentAnimation.height, // dimension of the sprite
						0, 0,
						// position on the screen. let it to [0,0] because the 'beforeRender' function will translate the image
						this.dimension.width, this.dimension.height
						//this.currentAnimation.width, this.currentAnimation.height  // dimension on the screen
					);

					//go to next frame
					if (this.isPlaying) {
						this.goToNextFrame();
					}
				}

				//restore state
				this.afterRender(context);
			}
		},

		/**
		 * @private
		 * @param frame
		 * @return {Object}
		 */
		getSlice : function (frame, animation) {
			var frameX = frame % animation.framesPerLine;
			var frameY = Math.floor(frame / animation.framesPerLine);

			var x = animation.sliceX + frameX * animation.width;
			var y = animation.sliceY + frameY * animation.height;

			return {x : x, y : y};
		},

		/**
		 *
		 * @param name
		 * @param speed
		 * @param frames
		 * @param sliceX
		 * @param sliceY
		 * @param width
		 * @param height
		 * @param framesPerLine
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
				animation.slices.push(this.getSlice(f, animation));
			}

			this.listAnimations.push(animation);
			if (this.listAnimations.length == 1) {
				this.currentAnimation = animation;
			}
		},

		/**
		 * @public
		 * @param animationName
		 * @param loop number of animation loop. Can be null or negative to set infinite loop
		 * @return true if the animation exists; false otherwise
		 */
		play : function (animationName, loop) {
			if (loop === undefined || loop === null) {
				loop = -1;
			}

			this.currentAnimation = null;
			for (var i = 0; i < this.listAnimations.length; i++) {
				if (this.listAnimations[i].name === animationName) {
					this.currentAnimation = this.listAnimations[i];
					this.reset();
					this.numberOfLoops = loop;
					this.isPlaying = true;
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
		 * @public
		 * Stop the current animation and stay on the current frame
		 */
		stop : function () {
			this.isPlaying = false;
			if (this.onAnimationEnd !== null) {
				this.onAnimationEnd({animationName : this.currentAnimation.name, loop : this.currentLoop, frame : this.currentFrame});
			}
		},

		/**
		 * @public
		 */
		reset : function () {
			this.currentFrame = 0;
			this.currentLoop = 1;
		},

		/**
		 *
		 * @return a copy of this node
		 */
		copy : function () {
			var node = new CGSGNodeAnimatedSprite(this.position.x, this.position.y, this.urlImage, this._context);
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

			node.currentFrame = this.currentFrame;
			node.isPlaying = this.isPlaying;
			node.numberOfLoops = this.numberOfLoops;
			node.currentLoop = this.currentLoop;
			node.img = this.img;
			node._isLoaded = this._isLoaded;

			node.onLoadEnd = this.onLoadEnd;
			node.onAnimationEnd = this.onAnimationEnd;
			node.onAnimationStart = this.onAnimationStart;

			if (this.urlImage !== null && this.urlImage != "") {
				node.img.onload = node.createDelegate(node, node._onImageLoaded, node.context);
				node.img.src = node.urlImage;
			}

			return node;
		}
	}
);
