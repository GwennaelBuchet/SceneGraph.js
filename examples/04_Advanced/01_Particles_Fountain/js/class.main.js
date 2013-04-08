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
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
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

var CGMain = CGSGView.extend(
	{
		initialize : function (canvas) {

			this._super(canvas);

			////// INITIALIZATION /////////

			this.initializeCanvas();
			this.createScene();

			this.startPlaying();
		},

		initializeCanvas : function () {
            var dim = new CGSGDimension(600, 480);
			this.setCanvasDimension(dim);
		},

		/**
		 * create a random scene with some nodes
		 *
		 */
		createScene : function () {

			//create and add a root node to the scene, with arbitrary dimension
			this.rootNode = new CGSGNode(0, 0);
			CGSG.sceneGraph.addNode(this.rootNode, null);

            this.textNode = new CGSGNodeText(10, 10, "Click on the scene to add a temporary force on Y.");
            this.textNode.setSize(14);
            this.rootNode.addChild(this.textNode);

			//create the particle system instance
			this.particlesSystem = new CGSGParticleSystem(0, 100); //x, y

			//create an emitter, "simulating a fountain", and add it to the particle system
			this.createFountainEmitter();

			//finally, add the particle system into the scenegraph
			this.rootNode.addChild(this.particlesSystem);
		},

		createFountainEmitter : function() {
			var colors = ["#FFF9AA", "#FFDB61", "#FBC22D", "#E98523", "#E65D0C", "#E3681B", "#D43B11", "#D23910",
						  "#C51E0C"];

			//create the new emitter
			var emitter = this.particlesSystem.addEmitter(
                new CGSGNodeSquare(0, 0, 5, 5) //node as a particle
                , new CGSGRegion(300, 200, 8, 8) //emission area
				, 100                                   //nbParticlesMax
				, new CGSGVector2D(0.0, 1.0)            //initial velocity of a particle
				, Math.PI / 4.0                         //angle area to rotate the direction vector
				, 5.0       //speed
				, 1.0       //random pour le speed
                , 1         //outflow
			);

            var data;

			emitter.onInitParticle = function (event) {
                data = event.data.particle;
				data.node.globalAlpha = 1.0;
				data.node.color = "#B5D2FF";
				data.node.lineColor = data.node.color;
				data.userdata = {ttl : 180 + Math.random() * 240};
				data.checkCTL = function(particle) {
					return particle.age <= particle.userdata.ttl;
				};
			};

			//add a force  representing the wind
			//emitter.addForce(new CGSGVector2D(5, 0.0), null); //force vector, ttl

			emitter.onUpdateParticleEnd = function (event) {
                data = event.data.particle;
                data.node.globalAlpha = 1.0 - (data.age / data.userdata.ttl);
			};

			//add a force vector on the mouse click
			var scope = this;
			CGSG.canvas.onmousedown = function (event) {
				var force = emitter.addForce(new CGSGVector2D(0.0, -12), 30); //force of -12 on Y (up direction), for 30 frames
				//scope._super(event);
			};

			//launch the emitters
			emitter.start();
		}
	}
);
