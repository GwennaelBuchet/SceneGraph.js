/*
 * Copyright (c) 2013  Capgemini Technology Services (hereinafter “Capgemini”)
 *
 * License/Terms of Use
 *
 * Permission is hereby granted, free of charge and for the term of intellectual property rights on the Software, to any
 * person obtaining a copy of this software and associated documentation files (the "Software"), to use, copy, modify
 * and propagate free of charge, anywhere in the world, all or part of the Software subject to the following mandatory
 * conditions:
 *
 *   •    The above copyright notice and this permission notice shall be included in all copies or substantial portions
 *   of the Software.
 *
 *  Any failure to comply with the above shall automatically terminate the license and be construed as a breach of these
 *  Terms of Use causing significant harm to Capgemini.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 *  Except as contained in this notice, the name of Capgemini shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Capgemini.
 *
 *  These Terms of Use are subject to French law.
 */

"use strict";

/**
 * @module Animation
 * @submodule ParticleSystem
 * @class CGSGParticle
 * @constructor
 * @param node {CGSGNode}
 * @type {CGSGParticle}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGParticle = CGSGObject.extend(
	{
		initialize : function (node) {
			/**
			 * @property node
			 * @type {CGSGNode}
			 */
			this.node = node;

			this.node.isClickable = false;
			this.node.isResizable = false;
			this.node.isDraggable = false;

			/**
			 * A void* property to let the developer store whatever he needs (new properties, ...)
			 * @property userdata
			 * @type {*}
			 * @default null
			 */
			this.userdata = null;

			this.init();
		},

		/**
		 * Initialize attributes of this particle
		 * @public
		 * @method init
		 */
		init : function () {
			//this.direction = new CGSGVector2D(1, 0);
			this.position = new CGSGPosition(0.0, 0.0);
			this.mass = 1000;
			this.initVelocity(new CGSGVector2D(1.0, 1.0));
			this.checkCTL = null;
			this.isAlive = true;
			this.age = 0;

			//this._gravity = new CGSGVector2D(0.0, 0.0);
			//this._forceTotal = new CGSGVector2D(0.0, 0.0);
			this._acceleration = new CGSGVector2D(0.0, 0.0);

			this.speedThreshold = 0.0;
		},

		/**
		 * @public
		 * @method initPosition
		 * @param {Number} x
		 * @param {Number} y
		 */
		initPosition : function (x, y) {
			this.position.x = x;
			this.position.y = y;
			this.node.translateTo(x, y);
		},

		/**
		 * @public
		 * @method initVelocity
		 * @param {CGSGVector2D} velocity
		 */
		initVelocity : function (velocity) {
			this.velocity = velocity.copy();
			this.velocity.normalize();
		},

		/**
		 * @public
		 * @method initSpeedThreshold
		 * @param {Number} st
		 */
		initSpeedThreshold : function (st) {
			this.speedThreshold = st;
		},

		/**
		 * update the particle position with an Euler integration
		 * TODO : externalize the process to choose between RK4 and Euler integration
		 * @public
		 * @method updatePosition
		 * @param {Number} deltaTime
		 * @param {Number} acceleration
		 * @return {*}
		 */
		updatePosition : function (deltaTime, acceleration) {
			if (isNaN(deltaTime)) {
				deltaTime = 1.0;
			}

			deltaTime += this.speedThreshold;

			this._acceleration.x = acceleration.x / this.mass;
			this._acceleration.y = acceleration.y / this.mass;

			this.velocity.x += this._acceleration.x * deltaTime;
			this.velocity.y += this._acceleration.y * deltaTime;

			this.position.x += this.velocity.x * deltaTime;
			this.position.y += this.velocity.y * deltaTime;

			if (this.node !== null) {
				this.node.translateTo(this.position.x, this.position.y);
			}

			//increment age of the particle
			this.age += deltaTime;

			//check the viablity of the particle
			if (cgsgExist(this.checkCTL)) {
				this.isAlive = this.checkCTL(this);
			}
			return this.isAlive;
		}
	}
);

/**
 * A particle emitter for the cgSceneGraph Particle System
 * @class CGSGParticleEmitter
 * @extends {CGSGNode}
 * @module Animation
 * @submodule ParticleSystem
 * @constructor
 * @param {CGSGNode} node
 * @param {CGSGRegion} region
 * @param {Number} nbParticlesMax
 * @param {Number} velocity
 * @param {Number} angle
 * @param {Number} speed
 * @param {Number} speedThreshold
 * @param {Number} outflow
 * @type {CGSGParticleEmitter}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGParticleEmitter = CGSGNode.extend(
	{
		initialize : function (node, region, nbParticlesMax, velocity, angle, speed, speedThreshold, outflow) {
			this._super(region.position.x, region.position.y);
            this.resizeTo(region.dimension.width, region.dimension.height);

			/**
			 * @property classType
			 * @type {String}
			 */
			this.classType = "CGSGParticleEmitter";

			this._node = node;
			/**
			 * the region from where the particles are emitted
			 * @property region
			 * @type {CGSGRegion}
			 */
			this.region = region;
			/**
			 * number max of particles out of the emitter on 1 frame
			 * @property nbParticlesMax
			 * @type {Number}
			 */
			this.nbParticlesMax = nbParticlesMax;
			/**
			 * @property velocity
			 * @type {CGSGVector2D}
			 */
			this.velocity = new CGSGVector2D(0.0, 0.0);
			if (cgsgExist(velocity)) {
				this.velocity = velocity;
			}
			/**
			 * angle range of emission. a particle is emitted in the this.direction vector + or - this.angle/2 angle.
			 * @property angle
			 * @type {Number}
			 */
			this.angle = Math.PI / 5.0;
			if (cgsgExist(angle)) {
				this.angle = angle;
			}

			/**
			 * speed of a particle
			 * @property speed
			 * @type {Number}
			 */
			this.speed = 1.0;
			if (cgsgExist(speed)) {
				this.speed = speed;
			}
			/**
			 * threshold to randomize and add to the speed of a particle
			 * @property speedThreshold
			 * @type {Number}
			 */
			this.speedThreshold = 1.0;
			if (cgsgExist(speedThreshold)) {
				this.speedThreshold = speedThreshold;
			}

			/**
			 * @property outflow
			 * @type {Number}
			 */
			this.outflow = 0;
			if (cgsgExist(outflow)) {
				this.outflow = outflow;
			}

			this._currentFrame = this.outflow;

			//list of the particles
			this._particles = [];
			this._isPlaying = false;
			this._forces = [];
			this._acceleration = new CGSGVector2D(0.0, 0.0);

			/**
			 * Gravity Force added by default with the addForce method
			 * @property gravity
			 * @type {Object}
			 */
			this.gravity = this.addForce(new CGSGVector2D(0.0, 9.81), null);

			/**
			 * Callback on end of update for 1 particle
			 * @property onUpdateParticleEnd
			 * @default null
			 * @type {function}
			 */
			this.onUpdateParticleEnd = null;
			/**
			 * Callback when reinit for 1 particle
			 * @property onInitParticle
			 * @default null
			 * @type {function}
			 */
			this.onInitParticle = null;
			/**
			 * Callback when reinit all particles is done
			 * @property onInitParticlesEnd
			 * @default null
			 * @type {function}
			 */
			this.onInitParticlesEnd = null;
		},

		/**
		 * start the animation
		 * @public
		 * @method start
		 */
		start : function () {
			this._isPlaying = true;
		},

		/**
		 * stop the animation
		 * @public
		 * @method stop
		 */
		stop : function () {
			this._isPlaying = false;
		},

		/**
		 * reset the animation
		 * @public
		 * @method reset
		 */
		reset : function () {
			var p;
			this._currentFrame = 0;
			//free the memory
			for (p = this._particles.length - 1; p >= 0; p--) {
				this.removeChild(this._particles[p].node, true);
				delete (this._particles[p]);
			}
			this._particles.clear();

			//this.initParticles(this._node);
		},

		/**
		 * @public
		 * @method render
		 * @param context
		 */
		render : function (context) {
			var f, p;
			this.beforeRender(context);

			//update the acceleration of the particles, based on the current forces
			this._acceleration.initialize(0.0, 0.0);
			for (f = this._forces.length - 1; f >= 0; f--) {
				this._acceleration.x += this._forces[f].vector.x;
				this._acceleration.y += this._forces[f].vector.y;

				if (this._forces[f].ctl !== null) {
					this._forces[f].age++;
					if (this._forces[f].age >= this._forces[f].ctl) {
						this.removeForce(this._forces[f]);
					}
				}
			}

			//updates all particles
			for (p = 0; p < this._particles.length; p++) {
				if (this._isPlaying) {
					if (!this.updateParticle(this._particles[p])) {
						this.initParticle(this._particles[p], p);
					}
				}

				this._particles[p].node.render(context);
			}

			//if not all of the particles are out
			if (this._particles.length < this.nbParticlesMax) {
				this._currentFrame++;
				if (this._currentFrame >= this.outflow) {
					this._currentFrame = 0;
					this._createParticle(this._particles.length);
				}
			}

			//restore state
			//this.afterRender(context);
			context.restore();
		},

		/**
		 * create a new particle, and add it to the emitter
		 * @private
		 * @method _createParticle
		 * @param {Number} index
		 */
		_createParticle : function (index) {
			var particle = new CGSGParticle(this._node.copy());
			this.initParticle(particle, index);
			this.addChild(particle.node);
			this._particles.push(particle);
		},

		/**
		 * @public
		 * @method updateParticle
		 * @param {CGSGParticle} particle
		 * @return {Boolean}
		 */
		updateParticle : function (particle) {
			//first, update the position of the particle node
			var isAlive = particle.updatePosition(this.speed, this._acceleration);

			//finally, call the update method of the particle node to apply extra animations
			//if (this.onUpdateParticleEnd !== null) {
                this.onUpdateParticleEnd && CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_UPDATE_PARTICLE_END, new CGSGEvent(this, {particle : particle}));
				//this.onUpdateParticleEnd(particle);
                //this.onUpdateParticleEnd({data:{particle : particle}});
			//}

			return isAlive;
		},

		/**
		 * @public
		 * @method initParticle
		 * @param {CGSGParticle} particle
		 * @param {Number} index
		 */
		initParticle : function (particle, index) {
			particle.init();
			//set a random position inside the region of this emitter
			particle.initPosition(Math.random() * this.region.dimension.width,
			                      Math.random() * this.region.dimension.height);

			//set a random direction inside the angle
			var velocity = this.velocity.copy();
			var halfAngle = this.angle / 2.0;
			velocity.rotate(-halfAngle + Math.random() * this.angle);
			particle.initVelocity(velocity);

			particle.initSpeedThreshold(-this.speedThreshold + Math.random() * this.speedThreshold * 2.0);

			if (this.onInitParticle !== null) {
                CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_INIT_PARTICLE, new CGSGEvent(this, {index : index, particle : particle}));
				//this.onInitParticle({index : index, particle : particle});
                //this.onInitParticle({data :{index : index, particle : particle}});
			}
		},

		/**
		 * Add a force to the emitter
		 * @public
		 * @method addForce
		 * @param {CGSGVector2D} vector
		 * @param {Number} ttl time to live of the force
		 * @return {Object}
		 */
		addForce : function (vector, ttl) {
			var force = {vector : vector, ctl : ttl, age : 0};
			this._forces.push(force);
			return force;
		},

		/**
		 * Remove a previously added force
		 * @public
		 * @method removeForce
		 * @param {Object} force
		 */
		removeForce : function (force) {
			this._forces.without(force);
		}/*,

	 addImpulse : function(point, force, ttl) {
	 for (var p = 0; p < this._particles.length; p++) {
	 this._particles[p].addImpulse(point, force, ttl);
	 }
	 }*/
	}
);

/**
 * A particle System object.
 * @class CGSGParticleSystem
 * @extends {CGSGNode}
 * @module Animation
 * @submodule ParticleSystem
 * @type {CGSGParticleSystem}
 * @author Gwennael Buchet (gwennael.buchet@capgemini.com)
 */
var CGSGParticleSystem = CGSGNode.extend(
	{
		initialize : function (x, y) {
			this._super(x, y);

			/**
			 * @property classType
			 * @type {String}
			 */
			this.classType = "CGSGParticleSystem";

			/**
			 * list of emitters
			 * @property emitters
			 * @type {Array}
			 */
			this.emitters = [];
			/**
			 * list of attractors
			 * @property attractors
			 * @type {Array}
			 */
			this.attractors = [];
			/**
			 * list of repulsors
			 * @property repulsors
			 * @type {Array}
			 */
			this.repulsors = [];

			this.isClickable = false;
			this.isResizable = false;
			this.isDraggable = false;
			this.isTraversable = false;

			//factory pattern
			//this.integrator = new CGSGParticleIntegratorEuler();
			//this.integrator = new CGSGParticleIntegratorRK4();
		},

		/**
		 * Add a force to all emitters
		 * @public
		 * @method addForce
		 * @param {CGSGVector2D} vector
		 */
		addForce : function (vector) {
			for (var e = 0; e < this.emitters.length; e++) {
				this.emitters[e].addForce(vector);
			}
		},

		/*addImpulse : function(point, force, ttl) {
		 for (var e = 0; e < this.emitters.length; e++) {
		 this.emitters[e].addImpulse(point, force, ttl);
		 }
		 },*/

		/**
		 * Create a new emitter and return it
		 * @public
		 * @method addEmitter
		 * @param {CGSGNode} node
		 * @param {CGSGRegion} region
		 * @param {Number} nbParticlesMax
		 * @param {Number} velocity
		 * @param {Number} angle
		 * @param {Number} speed
		 * @param {Number} speedThreshold
		 * @param {Number} outflow
		 * @return {CGSGParticleEmitter}
		 */
		addEmitter : function (node, region, nbParticlesMax, velocity, angle, speed, speedThreshold, outflow) {
			var emitter = new CGSGParticleEmitter(node, region, nbParticlesMax, velocity, angle, speed, speedThreshold,
			                                      outflow);
			this.addChild(emitter);
			this.emitters.push(emitter);
			return emitter;
		},

		/**
		 * Remove the emitter passed in parameter
		 * @public
		 * @method removeEmitter
		 * @param {CGSGParticleEmitter} emitter
		 */
		removeEmitter : function (emitter) {
			this.emitters.without(emitter);
			this.removeChild(emitter, true);
		},

		/**
		 * @public
		 * @method addAttractor
		 * @param {CGSGPosition} position
		 * @param {Number} strength
		 * @param {Number} distance
		 * @return {Object}
		 */
		addAttractor : function (position, strength, distance) {
			var attractor = {
				position : position,
				strength : strength,
				distance : distance
			};
			this.attractors.push(attractor);
			return attractor;
		},

		/**
		 * @public
		 * @method removeAttractor
		 * @param {Object} attractor
		 */
		removeAttractor : function (attractor) {
			this.attractors.without(attractor);
		},

		/**
		 * @public
		 * @method addRepulsor
		 * @param {CGSGPosition} position
		 * @param {Number} strength
		 * @param {Number} distance
		 * @return {Object}
		 */
		addRepulsor : function (position, strength, distance) {
			var repulsor = {
				position : position,
				strength : strength,
				distance : distance
			};
			this.repulsors.push(repulsor);
			return repulsor;
		},

		/**
		 * @public
		 * @method removeRepulsor
		 * @param {Object} repulsor
		 */
		removeRepulsor : function (repulsor) {
			this.repulsors.without(repulsor);
		},

		/**
		 * override the CGSGNode 'pickNode' method to return null due to performance
		 * @protected
		 * @method pickNode
		 * @param mousePosition
		 * @param absoluteScale
		 * @param ghostContext
		 * @param recursively
		 * @param condition
		 * @return {*}
		 */
		pickNode : function (mousePosition, absoluteScale, ghostContext, recursively, condition) {
			return null;
		},

		/**
		 * @public
		 * @method copy
		 * @todo : TODO fill the method
		 * @return {CGSGParticleSystem}
		 */
		copy : function () {
			var node = new CGSGParticleSystem();
			node = this._super(node);

			return node;
		}
	}
);