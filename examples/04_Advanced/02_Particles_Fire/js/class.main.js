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
 * @date 10/08/2012
 *
 * Purpose :
 * particles example
 * */

var CGMain = CGSGScene.extend(
	{
		initialize : function(canvas) {

			this._super(canvas);

			////// INITIALIZATION /////////

			this.initializeCanvas();
			this.createScene();

			this.startPlaying();
		},

		initializeCanvas : function() {
			var dim = new CGSGDimension(600, 480);
			this.setCanvasDimension(dim);
		},

		/**
		 * create a random scene with some nodes
		 *
		 */
		createScene : function() {
			//create and add a root node to the scene, with arbitrary dimension
			this.rootNode = new CGSGNode(0, 0, 1, 1);
			this.sceneGraph.addNode(this.rootNode, null);

			//create the particle system instance
			this.particlesSystem = new CGSGParticleSystem(0, 100); //x, y

			//create an emitter, "simulating a fire", and add it to the particle system
			this.createFireEmitter();

			//finally, add the particle system into the scenegraph
			this.rootNode.addChild(this.particlesSystem);
		},

		/**
		 * create an emitter simulating fire (well, not really a simulation, just a simple example)
		 */
		createFireEmitter : function() {
			//first create and add an emitter to the particle system
			var emitter = this.particlesSystem.addEmitter(
				new CGSGNodeSquare(0, 0, 3, 3)
				, new CGSGRegion(100, 200, 25, 8)     //emission area
				, 200                               //nbParticlesMax
				, new CGSGVector2D(0.0, 1.0)        //initial velocity of a particle
				, Math.PI / 8.0                     //angle area to rotate the direction vector
				, 2.5                                  //speed of animation (1.0 = normal and slow speed)
				, 1.0                               //random range to apply to the speed of each particle
				, 0                               //outflow
			);

			//tell the emitter how to init a particle.
			//be sure to call this BEFORE the initParticles function
			emitter.onInitParticle = function(event) {
				var colors = ["#FFF9AA", "#FFDB61", "#FBC22D", "#E98523", "#E65D0C", "#E3681B", "#D43B11", "#D23910",
				              "#C51E0C"];
				event.particle.node.globalAlpha = 1.0;
				event.particle.node.color = colors[Math.floor(Math.random() * colors.length)];
				event.particle.node.lineColor = event.particle.node.color;
				event.particle.initTTL(50 + Math.random() * 40);

				//event.particle.node.scaleTo(1.0, 1.0);
				//event.particle.node.scaleBy(0.8 + Math.random()/1.6, 0.8 + Math.random()/1.6);
				event.particle.node.resizeTo(3 + Math.random() * 3, 3 + Math.random() * 3);

				var rgb = CGSGColor.hex2rgb(event.particle.node.color);
				event.particle.initColor = rgb;
			};

			//remove the gravity of this emitter.
			//the gravity is just a force, encapsulated by the class
			emitter.removeForce(emitter.gravity);

			//tell the system how to render the particles for emitter (can be different for another emitter on the same system)
			//emitter.initParticles(new CGSGNodeSquare(0, 0, 3, 3));

			//add an update handler, fired each time a particle position was updated by the emitter
			emitter.onUpdateParticleEnd = function(particle) {
				var a = 1.0 - (particle.age / particle.ttl);
				particle.node.globalAlpha = a;
				var rgb = CGSGColor.hex2rgb(particle.node.color);
				rgb.r = particle.initColor.r * a;
				rgb.g = particle.initColor.g * a;
				rgb.b = particle.initColor.b * a;
				particle.node.color = CGSGColor.rgb2hex(rgb.r, rgb.g, rgb.b);
				particle.node.lineColor = particle.node.color;
				//particle.node.rotateWith(emitter.speed * Math.random() / 10.0);
			};

			//finally, start the emission
			emitter.start();
		}
	}
);
