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
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 * @date 10/08/2012
 *
 * Purpose :
 * particles example
 * */

var CGMain = CGSGScene.extend(
	{
		initialize: function (canvas) {

			this._super(canvas);

			////// INITIALIZATION /////////

			this.initializeCanvas();
			this.createScene();

			this.startPlaying();
		},

		initializeCanvas: function () {
			var dim = new CGSGDimension(600, 480);
			this.setCanvasDimension(dim);
		},

		/**
		 * create a random scene with some nodes
		 *
		 */
		createScene: function () {
			//create and add a root node to the scene, with arbitrary dimension
			this.rootNode = new CGSGNode(0, 0, 1, 1);
			this.sceneGraph.addNode(this.rootNode, null);

			//create the particle system instance
			this.particlesSystem = new CGSGParticleSystem(0, 100); //x, y

			//load images that will be used for particles
			this.img = new Image();
			var bindOnImageLoaded = this.onImageLoaded.bind(this);
			this.img.onload = bindOnImageLoaded;
			this.img.src = "images/pingoo.png";

			//finally, add the particle system into the scenegraph
			this.rootNode.addChild(this.particlesSystem);
		},

		/**
		 * Fired when the image loading is complete.
		 * Set the image object (img) to our image nodes
		 */
		onImageLoaded: function () {
			//create an emitter, "simulating a fountain", and add it to the particle system
			this.createFountainEmitter();
		},

		createFountainEmitter: function () {
			var imgNode = new CGSGNodeImage(0, 0, null);
			imgNode.setImage(this.img);

			//create the new emitter
			var emitter = this.particlesSystem.addEmitter(
				imgNode //node as a particle
				, new CGSGRegion(300, 200, 8, 8)//emission area
				, 100                           //nbParticlesMax
				, new CGSGVector2D(0.0, 1.0)    //initial velocity of a particle
				, Math.PI / 4.0                 //angle area to rotate the direction vector
				, 5.0                           //speed
				, 1.0                           //random pour le speed
				, 10                            //outflow
			);

			emitter.onInitParticle = function (event) {
				event.particle.node.globalAlpha = 1.0;
				event.particle.userdata = {ttl: 280 + Math.random() * 240};
				event.particle.checkCTL = function (particle) {
					return particle.age <= particle.userdata.ttl;
				};
			};

			//add a force representing the wind
			//emitter.addForce(new CGSGVector2D(5, 0.0), null); //force vector, ttl
			emitter.addForce(new CGSGVector2D(0, -8), null); //force vector, ttl

			emitter.onUpdateParticleEnd = function (particle) {
				particle.node.globalAlpha = 1.0 - (particle.age / particle.userdata.ttl);
			};

			//launch the emitters
			emitter.start();
		}
	}
);
