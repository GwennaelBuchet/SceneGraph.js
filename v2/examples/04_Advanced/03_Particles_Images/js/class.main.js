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
 * particles example
 * */

var CGMain = CGSGView.extend(
	{
		initialize : function(canvas) {

			this._super(canvas);

			////// INITIALIZATION /////////

			this.initializeCanvas();
			this.createScene();

			this.startPlaying();
		},

		initializeCanvas : function() {
			var dim = cgsgGetRealViewportDimension();//new CGSGDimension(600, 480);
			this.setCanvasDimension(dim);
		},

		/**
		 * create a random scene with some nodes
		 *
		 */
		createScene : function() {
			//create and add a root node to the scene, with arbitrary dimension
			this.rootNode = new CGSGNode(0, 0);
			CGSG.sceneGraph.addNode(this.rootNode, null);

			//first add a background
			var skyNode = new SkyNode();
			this.rootNode.addChild(skyNode);

			//create the particle system instance
			this.particlesSystem = new CGSGParticleSystem(0, 0); //x, y

			//load images that will be used for particles
			this.imgs = [];
			this._loadCounter = 0;

			this.imgs[0] = new Image();
			this.imgs[0].onload = this.onImageLoaded.bind(this);
			this.imgs[0].src = "images/flocon1.png";

			this.imgs[1] = new Image();
			this.imgs[1].onload = this.onImageLoaded.bind(this);
			this.imgs[1].src = "images/flocon2.png";

			this.imgs[2] = new Image();
			this.imgs[2].onload = this.onImageLoaded.bind(this);
			this.imgs[2].src = "images/flocon3.png";


			//finally, add the particle system into the scenegraph
			this.rootNode.addChild(this.particlesSystem);
		},

		/**
		 * Fired when the image loading is complete.
		 * Set the image object (img) to our image nodes
		 */
		onImageLoaded : function() {
			this._loadCounter++;
			if (this._loadCounter == 3) {
				//create an emitter, "simulating a fountain", and add it to the particle system
				this.createFountainEmitter();
			}
		},

		/**
		 * Called by the particles system to initialize a particle (not called to re-initialize it)
		 * @returns {CGSGNode}
		 */
		createParticle : function() {
			var imgNode = new CGSGNodeImage(0, 0, null);

			imgNode.setImage(this.imgs[CGSGMath.fixedPoint(Math.random() * 2)]);
			return imgNode;
		},

		createFountainEmitter : function() {
			//var imgNode = new CGSGNodeImage(0, 0, null);
			//imgNode.setImage(this.img);

			//create the new emitter
			var emitter = this.particlesSystem.addEmitter(
				//imgNode.copy.bind(imgNode) //node as a particle
				this.createParticle.bind(this)
				, new CGSGRegion(0, -20, CGSG.canvas.width, 5)//emission area
				, 200                           //nbParticlesMax
				, new CGSGVector2D(0.0, -1.0)    //initial velocity of a particle
				, Math.PI / 4.0                 //angle area to rotate the direction vector
				, 5.0                           //speed
				, 1.0                           //random pour le speed
				, 20                            //outflow
			);

			var data;
			emitter.onInitParticle = function(event) {
				data = event.data.particle;
				data.node.globalAlpha = 0.3 + Math.random()*0.7;
				data.checkCTL = function(particle) {
					return particle.position.y <= CGSG.canvas.height;
				};
			};

			//add a force representing the wind
			//emitter.addForce(new CGSGVector2D(5, 0.0), null); //force vector, ttl
			emitter.addForce(new CGSGVector2D(0, -8), null); //force vector, ttl

			emitter.onUpdateParticleEnd = function(event) {
				data = event.data.particle;
				data.node.rotateWith(-0.02 + CGSGMath.fixedPoint(Math.random() * 0.06));
				//data.node.globalAlpha = 1.0 - (data.age / data.userData.ttl);
			};

			//launch the emitters
			emitter.start();
		}
	}
);
