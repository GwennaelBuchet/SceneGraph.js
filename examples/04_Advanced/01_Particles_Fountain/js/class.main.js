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
			//var dim = new CGSGDimension(600, 480);
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},

		/**
		 * create a random scene with some nodes
		 *
		 */
		createScene : function() {

			//create and add a root node to the scene, with arbitrary dimension
			this.rootNode = new CGSGNode(0, 0);
			CGSG.sceneGraph.addNode(this.rootNode, null);

			this.textNode = new CGSGNodeText(10, 10, "Click on the scene to add a temporary wind effect.");
			this.textNode.setSize(14);
			this.rootNode.addChild(this.textNode);

			//create the particle system instance
			this.particlesSystem = new CGSGParticleSystem(0, 100); //x, y

			//create an emitter, "simulating a fountain", and add it to the particle system
			this.createFountainEmitter();

			//finally, add the particle system into the scenegraph
			this.rootNode.addChild(this.particlesSystem);
		},

		/**
		 * Called by the particles system to initialize a particle (not called to re-initialize it)
		 * @returns {CGSGNode}
		 */
		createParticle : function() {
			if (Math.random() > 0.8)
				return new CGSGNodeCircle(0, 0, 2 + CGSGMath.fixedPoint(10 * Math.random()));
			else {
				var s = 2 + CGSGMath.fixedPoint(3 * Math.random());
				return new CGSGNodeSquare(0, 0, s, s);
			}
		},

		createFountainEmitter : function() {
			//create the new emitter
			var emitter = this.particlesSystem.addEmitter(
				this.createParticle.bind(this)
				, new CGSGRegion(300, 200, 8, 8) //emission area
				, 200                                   //nbParticlesMax
				, new CGSGVector2D(0.0, 1)            //initial velocity of a particle
				, Math.PI / 4.0                         //angle area to rotate the direction vector
				, 5.0       //speed
				, 1.0       //random pour le speed
				, 1         //outflow
			);

			var data;

			//fired just after a particle is initialized or re-initialized
			emitter.onInitParticle = function(event) {
				data = event.data.particle;
				data.node.globalAlpha = 1.0;
				data.node.bkgcolor = "#B5D2FF";
				data.node.lineColor = "C8E3FF";
				var s = 2 + CGSGMath.fixedPoint(10 * Math.random());
				data.node.resizeTo(s, s);
				data.userData = {ttl : 480 + Math.random() * 240};
				data.checkCTL = function(particle) {
					return particle.age <= particle.userData.ttl;
				};
			};

			//add a force to the top
			emitter.addForce(new CGSGVector2D(0, -6), null); //force vector, time-to-live (null = infinite)

			//fired each frame for each particle, just after its position was updated by the system
			emitter.onUpdateParticleEnd = function(event) {
				data = event.data.particle;
				data.node.globalAlpha = 1.0 - (data.age / 1.4/data.userData.ttl);
			};

			//add a force vector representing the wind on the mouse click
			var scope = this;
			CGSG.canvas.onmousedown = function(event) {
				var force = emitter.addForce(new CGSGVector2D(12, 0), 30); //force of -12 on Y (up direction), for 30 frames
				//scope._super(event);
			};

			//launch the emitters
			emitter.start();
		}
	}
);
