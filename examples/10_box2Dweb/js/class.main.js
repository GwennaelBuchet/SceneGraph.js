/*
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
 */

// global aliases to Box2D entities
var b2Vec2 = Box2D.Common.Math.b2Vec2
    , b2BodyDef = Box2D.Dynamics.b2BodyDef
    , b2Body = Box2D.Dynamics.b2Body
    , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
    , b2Fixture = Box2D.Dynamics.b2Fixture
    , b2World = Box2D.Dynamics.b2World
    , b2MassData = Box2D.Collision.Shapes.b2MassData
    , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
    , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
    , b2DebugDraw = Box2D.Dynamics.b2DebugDraw
    ;


var CGMain = CGSGView.extend(
        {
            initialize: function (canvas) {
                this._super(canvas);

                this.initializeCanvas();

                this.initBox2D();
                this.createScene();

                this.startPlaying();
            },

            initializeCanvas: function () {
                this.viewDimension = cgsgGetRealViewportDimension();
                this.setCanvasDimension(this.viewDimension);
            },


            /**
             * Initialize the Box2D world and events related
             * @method initBox2D
             */
            initBox2D: function () {
                this.world = new b2World(
                    new b2Vec2(0, 10)    //gravity
                    , true              //allow sleep
                );

                this.worldScale = 30;

                //force refresh of Box2D world before each frame
                this.onRenderStart = this.updateWorld.bind(this);
            },

            /**
             * Initrialize the nodes of the scene
             * @method createScene
             */
            createScene: function () {
                this.rootNode = new CGSGNode(0, 0, 0, 0);
                this.sceneGraph.addNode(this.rootNode, null);

                var that = this;

                //create ground
                this.ground = new CGSGNodeSquare(20, 400, 500, 10);
                this.ground.color = "#11EF22";
                this.ground.lineWidth = 0;
                this.ground.isResizable = true;
                this.ground.isDraggable = true;
                this.rootNode.addChild(this.ground);
                this.addPhysicsToNode(this.ground, "box", false);

                //add star
                var star = new CGSGNodeStar(10, 10, 11, 40, 60);
                star.translateTo(200, 0);
                this.rootNode.addChild(star);
                this.addPhysicsToNode(star, "box", true);
                star.isDraggable = true;
                star.isResizable = true;

                //add cube


                //add polygon
                var points1 = [
                    new CGSGPosition(60, 140),
                    new CGSGPosition(100, 180),
                    new CGSGPosition(140, 140),
                    new CGSGPosition(180, 180),
                    new CGSGPosition(220, 140),
                    new CGSGPosition(260, 180)
                ];

                //centerX, centerY, radius, angle, clockwise
                var poly = new CGSGNodePolygon(points1);
                poly.isDraggable = true;
                poly.isResizable = true;
                //this.rootNode.addChild(poly);
                //this.addPhysicsToNode(poly, "polygon", true);


                //add image
                var imgNode = new CGSGNodeImage(
                    30,     //x
                    10,     //y
                    "images/bear.png");
                this.rootNode.addChild(imgNode);
                imgNode.onLoadEnd = function () {
                    that.addPhysicsToNode(imgNode, "box", true);
                }
                imgNode.isDraggable = true;

                //add button
                var buttonNormal = new CGSGNodeButton(10, 140, "Normal");
                buttonNormal.name = "True Button";
                buttonNormal.onClick = function (event) {
                    alert(event.node.name);
                };
                this.rootNode.addChild(buttonNormal);
                this.addPhysicsToNode(buttonNormal, "box", true);


            },

            addPhysicsToNode: function (node, type, isDynamic) {
                var bodyDef = new b2BodyDef;
                bodyDef.type = isDynamic ? b2Body.b2_dynamicBody : b2Body.b2_staticBody;
                bodyDef.position.Set(node.getAbsolutePosition().x / this.worldScale, node.getAbsolutePosition().y / this.worldScale);
                bodyDef.userData = node;
                var shape;
                if (type == "box") {
                    shape = new b2PolygonShape;
                    shape.SetAsBox(node.getAbsoluteWidth() / 2 / this.worldScale, node.getAbsoluteHeight() / 2 / this.worldScale);
                }
                else if (type == "circle") {
                    shape = new b2CircleShape;
                    shape.m_radius = node.getAbsoluteWidth();
                }
                else if (type == "polygon") {
                    shape = new b2PolygonShape;
                    shape.Set(node._points, node._numPoints);
                }
                var fixtureDef = new b2FixtureDef;
                fixtureDef.density = 1.0;
                fixtureDef.friction = 0.5;
                fixtureDef.restitution = 0.5;
                fixtureDef.shape = shape;
                var body = this.world.CreateBody(bodyDef);
                body.CreateFixture(fixtureDef);
            },

            /**
             * @method updateWorld
             * Called each frame,just before rendering
             */
            updateWorld: function () {
                this.world.Step(
                    1 / 60   //frame-rate
                    , 10       //velocity iterations
                    , 10       //position iterations
                );
                this.world.DrawDebugData();

                var node;
                for (var b = this.world.m_bodyList; b != null; b = b.m_next) {
                    if (node = b.GetUserData()) {
                        node.translateTo(b.GetPosition().x * this.worldScale, b.GetPosition().y * this.worldScale, true);
                        node.rotateTo(b.GetAngle());
                        //context.drawImage(b.GetUserData(),-b.GetUserData().width/2,-b.GetUserData().height/2);
                    }
                }


                this.world.ClearForces();
            }

        }
    )
    ;
