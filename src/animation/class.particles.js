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
 * @date 18/08/12
 *
 * Purpose :
 *
 */

var CGSGParticle = Object.extend(
	{
		initialize : function (node) {
			this.node = node;

			this.node.isClickable = false;
			this.node.isResizable = false;
			this.node.isDraggable = false;

			this.init();
		},

		init : function () {
			//this.direction = new CGSGVector2D(1, 0);
			this.position = new CGSGPosition(0.0, 0.0);
			this.mass = 1000;
			this.initVelocity(new CGSGVector2D(1.0, 1.0));
			this.initTTL(50 + Math.random() * 160);
			this.isAlive = true;

			this._gravity = new CGSGVector2D(0.0, 0.0);
			this._forceTotal = new CGSGVector2D(0.0, 0.0);
			this._acceleration = new CGSGVector2D(0.0, 0.0);

			this.speedThreshold = 0.0;
		},

		initTTL : function (ttl) {
			this.age = 0;
			this.ttl = ttl;
		},

		initPosition : function (x, y) {
			this.position.x = x;
			this.position.y = y;
			this.node.translateTo(x, y);
		},

		initVelocity : function (velocity) {
			this.velocity = velocity.copy();
			this.velocity.normalize();
		},

		initSpeedThreshold : function (st) {
			this.speedThreshold = st;
		},

		/**
		 * update the particle position with an Euler integration
		 * TODO : externalize the process to choose between RK4 and Euler integration
		 * @param emitterForce
		 * @param gravity
		 * @param deltaTime
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

			this.age += deltaTime;
			if (this.age >= this.ttl) {
				this.isAlive = false;
			}

			return this.isAlive;
		}
	}
);

/**
 * A particle emitter for the cgSceneGraph Particle System
 * @type {*}
 */
var CGSGParticleEmitter = CGSGNode.extend(
	{
		/**
		 * Constructor
		 * @param region a CGSGRegion
		 * @param force a CGSGVector2D
		 * @param nbParticlesMax
		 */
		initialize : function (region, nbParticlesMax, velocity, angle, speed, speedThreshold) {
			this._super(region.position.x, region.position.y, region.dimension.width, region.dimension.height);

			//the region from where the particles are emitted
			this.region = region;
			//number max of particles out of the emitter on 1 frame
			this.nbParticlesMax = nbParticlesMax;
			this.velocity = new CGSGVector2D(0.0, 0.0);
			if (cgsgExist(velocity)) {
				this.velocity = velocity;
			}
			//angle range of emission. a particle is emitted in the this.direction vector + or - this.angle/2 angle.
			this.angle = Math.PI / 5.0;
			if (cgsgExist(angle)) {
				this.angle = angle;
			}

			this.speed = 1.0;
			if (cgsgExist(speed)) {
				this.speed = speed;
			}
			this.speedThreshold = 1.0;
			if (cgsgExist(speedThreshold)) {
				this.speedThreshold = speedThreshold;
			}

			//list of the particles
			this._particles = [];
			this._isPlaying = false;
			this._node = null;
			this._forces = [];
			this._acceleration = new CGSGVector2D(0.0, 0.0);

			this.gravity = this.addForce(new CGSGVector2D(0.0, 9.81), null);

			//events
			this.onUpdateParticleEnd = null;
			this.onInitParticle = null;
			this.onInitParticlesEnd = null;
		},

		/**
		 * start the animation
		 */
		start : function () {
			this._isPlaying = true;
		},

		/**
		 * stop the animation
		 */
		stop : function () {
			this._isPlaying = false;
		},

		/**
		 * reset the animation
		 */
		reset : function () {
			this.initParticles(this._node);
		},

		render : function (context) {
			this.beforeRender(context);

			//update the acceleration of the particles, based on the current forces
			this._acceleration.initialize(0.0, 0.0);
			for (var f = this._forces.length - 1; f >= 0; f--) {
				this._acceleration.x += this._forces[f].vector.x;
				this._acceleration.y += this._forces[f].vector.y;

				if (this._forces[f].ttl !== null) {
					this._forces[f].age++;
					if (this._forces[f].age >= this._forces[f].ttl) {
						this.removeForce(this._forces[f]);
					}
				}
			}

			//updates all particles
			for (var p = 0; p < this._particles.length; p++) {
				if (this._isPlaying) {
					if (!this.updateParticle(this._particles[p])) {
						this.initParticle(this._particles[p], p);
					}
				}

				this._particles[p].node.render(context);
			}

			//restore state
			//this.afterRender(context);
			context.restore();
		},

		updateParticle : function (particle) {
			//first, update the position of the particle node
			var isAlive = particle.updatePosition(this.speed, this._acceleration);

			//finally, call the update method of the particle node to apply extra animations
			if (this.onUpdateParticleEnd !== null) {
				this.onUpdateParticleEnd(particle);
			}

			return isAlive;
		},

		initParticles : function (node) {
			this._node = node;
			//free the memory
			for (var p = this._particles.length - 1; p >= 0; p--) {
				this.removeChild(this._particles[p].node);
				delete(this._particles[p]);
			}
			this._particles.clear();

			//build new particles
			for (var i = 0; i < this.nbParticlesMax; i++) {
				var particle = new CGSGParticle(this._node.copy());
				this.initParticle(particle, i);
				this.addChild(particle.node);
				this._particles.push(particle);
			}

			if (this.onInitParticlesEnd !== null) {
				this.onInitParticlesEnd();
			}
		},

		/**
		 *
		 * @param particle a CGSGNodeParticle
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
				this.onInitParticle({index : index, particle : particle});
			}
		},

		addForce : function (vector, ttl) {
			var force = {vector : vector, ttl : ttl, age : 0};
			this._forces.push(force);
			return force;
		},

		removeForce : function (force) {
			this._forces.without(force);
		},

		addImpulse : function (point, force, ttl) {
			for (var p = 0; p < this._particles.length; p++) {
				this._particles[p].addImpulse(point, force, ttl);
			}
		}
	}
);

var CGSGParticleSystem = CGSGNode.extend(
	{
		initialize : function (x, y) {
			this._super(x, y, 1, 1);

			this.classType = "CGSGParticleSystem";

			this.emitters = [];
			this.attractors = [];
			this.repulsors = [];

			this.isClickable = false;
			this.isResizable = false;
			this.isDraggable = false;
			this.isTraversable = false;

			//factory pattern
			//this.integrator = new CGSGParticleIntegratorEuler();
			//this.integrator = new CGSGParticleIntegratorRK4();
		},

		addForce : function (vector) {
			for (var e = 0; e < this.emitters.length; e++) {
				this.emitters[e].addForce(vector);
			}
		},

		addImpulse : function (point, force, ttl) {
			for (var e = 0; e < this.emitters.length; e++) {
				this.emitters[e].addImpulse(point, force, ttl);
			}
		},

		/**
		 *
		 * @param region
		 * @param nbParticlesMax
		 * @return the new created emitter (a CGSGParticleEmitter object)
		 */
		addEmitter : function (region, nbParticlesMax, velocity, angle, speed, speedThreshold) {
			var emitter = new CGSGParticleEmitter(region, nbParticlesMax, velocity, angle, speed, speedThreshold);
			this.addChild(emitter);
			this.emitters.push(emitter);
			return emitter;
		},

		/**
		 * Remove the emitter passed in parameter
		 * @param emitter
		 */
		removeEmitter : function (emitter) {
			this.emitters.without(emitter);
			this.removeChild(emitter);
		},

		/**
		 *
		 * @param position
		 * @param strength
		 * @param distance
		 */
		addAttractor : function (position, strength, distance) {
			var attractor = {
				position : position,
				strength : strength,
				distance : distance
			};
			this.attractors.push(attractor);
		},

		removeAttractor : function (attractor) {
			this.attractors.without(attractor);
		},

		/**
		 *
		 * @param position
		 * @param strength
		 * @param distance
		 */
		addRepulsor : function (position, strength, distance) {
			var repulsor = {
				position : position,
				strength : strength,
				distance : distance
			};
			this.repulsors.push(repulsor);
		},

		removRepulsor : function (repulsor) {
			this.repulsors.without(repulsor);
		},

		/**
		 * @private
		 * override the CGSGNode 'pickNode' method to return null due to performance
		 * @param mousePosition
		 * @param absoluteScale
		 * @param ghostContext
		 * @param recursively
		 * @param canvasWidth
		 * @param canvasHeight
		 * @param condition
		 * @return {*}
		 */
		pickNode : function (mousePosition, absoluteScale, ghostContext, recursively, canvasWidth, canvasHeight,
							 condition) {
			return null;
		},

		copy : function () {
			var node = new CGSGParticleSystem();
		}
	}
);