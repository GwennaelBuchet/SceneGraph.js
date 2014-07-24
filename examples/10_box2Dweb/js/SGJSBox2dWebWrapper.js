/*
 * Copyright (c) 2014  Gwennaël Buchet
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
 *  Terms of Use causing significant harm to Gwennaël Buchet.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 *  Except as contained in this notice, the name of Gwennaël Buchet shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Gwennaël Buchet.
 *
 *  These Terms of Use are subject to French law.
 */

// global aliases to Box2D entities
var b2Vec2 = Box2D.Common.Math.b2Vec2,
	b2BodyDef = Box2D.Dynamics.b2BodyDef,
	b2Body = Box2D.Dynamics.b2Body,
	b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
	b2Fixture = Box2D.Dynamics.b2Fixture,
	b2World = Box2D.Dynamics.b2World,
	b2MassData = Box2D.Collision.Shapes.b2MassData,
	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
	b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
	b2AABB = Box2D.Collision.b2AABB,
	b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;


var SGJSBox2dWebType = {
	/**
	 * @property BOX
	 */
	BOX     : "box",
	/**
	 * @property CIRCLE
	 */
	CIRCLE  : "circle",
	/**
	 * @property POLYGON
	 */
	POLYGON : "polygon"
};

/**
 * Wrapper class for Box2dWeb (https://code.google.com/p/box2dweb/).
 * This class allow to use Box2DWeb 2.1.a.3 with SceneGraph.js on a very easy way.
 * It does not wrap all features of Box2dWeb but most used of them and it's still possible to combine this wrapper with direct calls to Box2dWeb
 *
 * @class SGJSBox2dWrapper
 */
var SGJSBox2dWebWrapper = CGSGObject.extend(
	{
		initialize : function() {
			this.world = new b2World(
				new b2Vec2(0, 10)    //gravity
				, true              //allow sleep
			);

			this.worldScale = 30;

			this._isRunning = false;
			this._view = undefined;

			this._bodiesToRemove = [];
		},

		/**
		 * Start physics engine
		 * @method start
		 * @param view {CGSGView}
		 */
		start : function(view) {
			this._view = view;
			//force refresh of Box2D world before each frame
			CGSG.eventManager.bindHandler(view, cgsgEventTypes.ON_RENDER_START, this._updateWorld.bind(this));
			this._isRunning = true;
		},

		/**
		 * Stop physics engine
		 * @method stop
		 * @param view {CGSGView}
		 */
		stop : function(view) {
			if (!cgsgExist(view))
				view = this._view;
			CGSG.eventManager.unbindHandler(view, cgsgEventTypes.ON_RENDER_START, this._updateWorld);
			this._isRunning = false;
		},

		toggle : function(view) {
			if (!cgsgExist(view))
				view = this._view;
			this._isRunning ? this.stop(view) : this.start(view);
		},

		/**
		 * @method _removeBodies
		 * @private
		 */
		_removeBodies : function() {
			for (var i = 0 , l = this._bodiesToRemove.length ; i < l ; i++) {
				var n = this._bodiesToRemove[i];

				if (cgsgExist(n.userData.physics)) {
					this.world.DestroyBody(n.userData.physics.m_body);
					n.userData.physics = undefined;
					delete(n.userData.physics);
				}
			}
			this._bodiesToRemove.clear();
		},

		/**
		 * @method _updateWorld
		 * @private
		 * Called each frame, just before rendering
		 */
		_updateWorld : function() {
			//remove physics to body
			this._removeBodies();

			this.world.Step(
					1 / 60,   //frame-rate
					10,       //velocity iterations
					10       //position iterations
			);

			var node, p;
			for (var b = this.world.m_bodyList ; b != null ; b = b.m_next) {
				if (node = b.GetUserData()) {
					p = b.GetPosition();
					node.translateTo((p.x * this.worldScale) - node.getAbsWidth() / 2,
									 (p.y * this.worldScale) - node.getAbsHeight() / 2,
									 true);
					node.rotateTo(b.GetAngle());
				}
			}

			this.world.ClearForces();
		},

		/**
		 * Helper method which create a simple square node and add physics to it
		 * @method createBox
		 * @param x {Number} Position.x of the generated square
		 * @param y {Number} Position.y of the generated square
		 * @param w {Number} Width of the generated square
		 * @param h {Number} Height of the generated square
		 * @param isStatic {Boolean}
		 * @return {CGSGNodeSquare} The generated square
		 */
		createBox : function(x, y, w, h, isStatic) {
			var s = new CGSGNodeSquare(x, y, w, h);

			this.addPhysics(s, SGJSBox2dWebType.BOX, isStatic);
			return s;
		},

		/**
		 * Helper method which create a simple circle node and add physics to it
		 * @method createCircle
		 * @param x {Number} Position.x of the generated square
		 * @param y {Number} Position.y of the generated square
		 * @param r {Number} Radius of the generated square
		 * @param isStatic {Boolean}
		 * @return {CGSGNodeCircle} The generated square
		 */
		createCircle : function(x, y, r, isStatic) {
			var c = new CGSGNodeCircle(x, y, r);

			this.addPhysics(c, SGJSBox2dWebType.CIRCLE, isStatic);

			return c;
		},

		/**
		 * @method addPhysicsToNode
		 * @param node {CGSGNode}
		 * @param type {SGJSBox2dWebType}
		 * @param isStatic {Boolean}
		 * @returns {*}
		 */
		addPhysics : function(node, type, isStatic) {
			var bindUpdate = this.updateNode.bind(this);
			CGSG.eventManager.bindHandler(node, cgsgEventTypes.ON_RESIZE, function(e) {
				bindUpdate(e.data.node)
			});
			//CGSG.eventManager.bindHandler(node, cgsgEventTypes.ON_TRANSLATE, function(e) {
			//	bindUpdate(e.data.node)
			//});
			CGSG.eventManager.bindHandler(node, cgsgEventTypes.ON_ANIMATE, function(e) {
				bindUpdate(e.data.node)
			});
			CGSG.eventManager.bindHandler(node, cgsgEventTypes.ON_DRAG, function(e) {
				bindUpdate(e.data.node)
			});

			var r = node.getAbsoluteRegion();
			node.userData.physics = this._createBody(node,
													 type,
													 r.position.x,
													 r.position.y,
													 r.dimension.width,
													 r.dimension.height,
													 node.radius,
													 isStatic);
		},

		/**
		 * @method removePhysicsToNode
		 * @param node {CGSGNode}
		 */
		removePhysics : function(node) {
			this._bodiesToRemove.push(node);

		},

		/**
		 * Update physics engine with new attribute of the node: dimension, position, rotation
		 * @method updateNode
		 * @param node {CGSGNode}
		 */
		updateNode : function(node) {
			var p = node.userData.physics;
			if (cgsgExist(p)) {

			}
		},

		/**
		 * Add a joint between 2 nodes
		 * @method addJoint
		 * @param node1 {CGSGNode}
		 * @param node2 {CGSGNode}
		 */
		addJoint    : function(node1, node2) {
			/*var revJointDef = new b2RevoluteJointDef;
			 revJointDef.bodyA = node1;
			 revJointDef.bodyB = node2;
			 revJointDef.anchor = new b2Vec2(399.65 / drawScale, 464.8 / drawScale);
			 revJointDef.collideConnected = true;

			 revJointDef.maxMotorTorque = 5.0;
			 revJointDef.motorSpeed = 0.0;
			 revJointDef.enableMotor = true;*/
		},
		/**
		 * @method _createBody
		 * @param node {CGSGNode} node to attach to this physical item
		 * @param type {SGJSBox2dWebType}
		 * @param x {Number} Initial absolute position.x
		 * @param y {Number} Initial absolute position.y
		 * @param w {Number} Absolute width of the node (if not circle)
		 * @param h {Number} Absolute height of the node (if not circle)
		 * @param r {Number} Radius of the node (if circle)
		 * @param isStatic {Boolean} Define whether the node will be static or not
		 * @return {*}
		 */
		_createBody : function(node, type, x, y, w, h, r, isStatic) {
			if (!cgsgExist(isStatic)) {
				isStatic = true;
			}

			var c = {x : x + (w / 2), y : y + (h / 2)};
			console.log(c);

			// Créer l'élément Fixture
			var fixDef = new b2FixtureDef();
			fixDef.userData = node;
			switch (type) {
				case SGJSBox2dWebType.BOX:
					fixDef.shape = new b2PolygonShape();
					fixDef.shape.SetAsBox(w / 2 / this.worldScale, h / 2 / this.worldScale);
					break;
				case SGJSBox2dWebType.CIRCLE:
					fixDef.shape = new b2CircleShape(r / this.worldScale);
					break;
				case SGJSBox2dWebType.POLYGON:
					fixDef.shape = new b2PolygonShape();
					fixDef.shape.Set(node._points, node._numPoints);
					break;
			}

			var bodyDef = new b2BodyDef();
			//position = center point of the node
			bodyDef.position.x = c.x / this.worldScale;
			bodyDef.position.y = c.y / this.worldScale;
			bodyDef.userData = node;
			if (isStatic) {
				bodyDef.type = b2Body.b2_staticBody;
			}
			else {
				bodyDef.type = b2Body.b2_dynamicBody;
				fixDef.density = 1.0;
				fixDef.restitution = 0.5;
			}

			return this.world.CreateBody(bodyDef).CreateFixture(fixDef);
		}

	}
);