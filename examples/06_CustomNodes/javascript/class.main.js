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
 * text example
 * */
var CGMain = CGSGScene.extend(
    {
        initialize:function (canvas) {

            this._super(canvas);

            ////// INITIALIZATION /////////

            this.initializeCanvas();
            this.createScene();

            //add an handler on the window resize event
            var bindInitializeCanvas = this.initializeCanvas.bind(this);
            window.onresize = bindInitializeCanvas;

            this.startPlaying();
        },

        initializeCanvas:function () {
            this.viewDimension = cgsgGetRealViewportDimension();
            this.viewDimension.height -= 150;

            this.setCanvasDimension(this.viewDimension);

            var displayRatio = new CGSGScale(this.viewDimension.width / 1600, this.viewDimension.height / 1200);
            //this.setDisplayRatio(displayRatio);
        },

        /**
         *
         *
         */
        createScene:function () {
            //first create a root node with an arbitrary size and position
            this.rootNode = new CGSGNode(0, 0, 1, 1);
            this.sceneGraph.addNode(this.rootNode, null);

            //First, create a background
            this.skyNode = new SkyNode(0, 0, this.viewDimension.width, this.viewDimension.height);
            this.rootNode.addChild(this.skyNode);

            this.grassNode = new GrassNode(20, this.viewDimension.height-200, this.viewDimension.width, this.viewDimension.height);
            this.rootNode.addChild(this.grassNode);

            this.particlesSystem = new CGSGParticleSystem(0, 0);
            //create 4 clouds
            this.createCloudEmitter();
            this.rootNode.addChild(this.particlesSystem);
        },

        createCloudEmitter:function () {
            //first create and add an emitter to the particle system
            var emitter = this.particlesSystem.addEmitter(
                new CloudNode(0, 0, 0, 0)        //node as particle
                , new CGSGRegion(-400, -80, 0, 180)     //emission area
                , 5                               //nbParticlesMax
                , new CGSGVector2D(1.0, 0.0)        //initial velocity of a particle
                , 0.0                     //angle area to rotate the direction vector
                , 0.3                                  //speed of animation (1.0 = normal and slow speed)
                , 0.02                               //random range to apply to the speed of each particle
                , 500                       //outflow : 1 particle by 'ouflow' frames
            );

            emitter._node = new CloudNode(0, 0, 60, 40);

            //tell the emitter how to init a particle.
            //be sure to call this BEFORE the initParticles function
            emitter.onInitParticle = function (event) {
                event.particle.node.globalAlpha = 0.78 + Math.random() * 0.22;

                event.particle.initTTL(Number.Infinity);

                event.particle.node.scaleTo(0.8 + Math.random() / 1.6, 0.8 + Math.random() / 1.6);
            };

            //remove the gravity of this emitter.
            //the gravity is just a force, encapsulated by the class
            emitter.removeForce(emitter.gravity);

            //tell the system how to render the particles for emitter (can be different for another emitter on the same system)
            //emitter.initParticles(new CloudNode(0, 0, 100, 40));

            //add an update handler, fired each time a particle position was updated by the emitter
            var that = this;
            emitter.onUpdateParticleEnd = function (particle) {
                if (particle.position.x > that.canvas.width + 200)
                    particle.ttl = 0;
            };

            //finally, start the emission
            emitter.start();
        }

    }
);