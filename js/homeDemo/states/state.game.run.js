/**
 * Created with JetBrains WebStorm.
 * @author Gwen
 * @project CatchTheFlowers
 * @filename state.game.run
 * @date 25/07/12
 * @time 14:05
 * @purpose
 *
 */

var StateGameRun = Object.extend(
	{
		initialize : function(context, parent) {
			this.context = context;
			this.image = null;

			this.game = parent;

			this.createEnvironment();
		},

		/**
		 * called each time this state is activated
		 */
		run : function() {
			this.initGame();

			for (var c = 0; c < this.maxClouds; c++) {
				this.clouds[c].start();
			}

			for (var b = 0; b < this.maxBees; b++) {
				this.bees[b].setImage(this.image);
			}

			this.updateScore(this.score);
		},

		/**
		 * called each frame, just before the rendering process
		 */
		onRenderStartHandler : function() {
			if (this.nbBees < this.maxBees && (cgsgCurrentFrame % 900) == 0) {
				//this.items.addChild(this.bees[this.nbBees]);
				this.bees[this.nbBees].start();
				this.nbBees++;
			}

			if (this.isRunning === true && this.nbFlowers < this.maxFlowers && (cgsgCurrentFrame % 500) == 0) {
				var flower = this.flowers[this.nbFlowers];
				flower.isVisible = true;
				flower.start();
				this.nbFlowers++;
			}

			currentColorLerp += 0.001;
			if (currentColorLerp >= 1) {
				currentColorLerp = 0;
				currentColorIndex = (currentColorIndex + 1) % 4;
			}
		},

		setImage : function(image) {
			this.image = image;
		},

		createEnvironment : function() {
			this.rootNode = new SkyNode(0, 0, canvasWidth, canvasHeight, this.context);

			var floor = new FloorNode(0, 0, 1, 1);
			this.rootNode.addChild(floor);

			this.scoreNode = new ScorePanelNode(0, 0, 103, 18);
			this.rootNode.addChild(this.scoreNode);

			this.liveNode = new LivePanelNode(canvasWidth - 135, 0, 135, 18);
			this.rootNode.addChild(this.liveNode);

			this.items = new CGSGNode(0, 0, 1, 1);
			this.rootNode.addChild(this.items);

			this.looseItems = new CGSGNode(0, 0, 1, 1);
			this.rootNode.addChild(this.looseItems);

			//create the particle system instance
			this.particlesSystem =
			new CGSGParticleSystem(CGSGMath.fixedPoint(canvasWidth / 2), CGSGMath.fixedPoint(canvasHeight / 2)); //x, y
			//create an emitter, "simulating a fountain", and add it to the particle system
			this.createFountainEmitter();
			this.looseItems.addChild(this.particlesSystem);

			//Button "Go Back"
			var wButton = 130;
			var hButton = 40;
			this.buttonGoBack =
			new ButtonNode(CGSGMath.fixedPoint((canvasWidth - wButton - 10) / 2.0),
			               CGSGMath.fixedPoint((canvasHeight - hButton) / 1.5), wButton, hButton, 10);
			this.looseItems.addChild(this.buttonGoBack);

			var textGoBack = new CGSGNodeText(28, 18, "Go Home");
			textGoBack.color = "#6a7a89";
			textGoBack.isClickable = false;
			this.buttonGoBack.addChild(textGoBack);
			var bindOnButtonGoBackClick = this.onButtonGoBackClick.bind(this);
			this.buttonGoBack.onClick = bindOnButtonGoBackClick;

			var textGoLoose = new CGSGNodeText(123, 120, "You Loose !");
			textGoLoose.color = "white";
			textGoLoose.setSize(32);
			this.looseItems.addChild(textGoLoose);
		},

		renderLoose : function() {
			if (this.isRunning) {
				this.isRunning = false;
				this.rootNode.detachChild(this.items);
				this.emitter.start();
				this.rootNode.addChild(this.looseItems);
			}
		},

		onButtonGoBackClick : function() {
			this.game.changeGameState(GAME_STATE.HOME);
		},

		createFountainEmitter : function() {
			//create the new emitter
			this.emitter = this.particlesSystem.addEmitter(
				new CGSGNodeSquare(0, 0, 5, 5) //node as a particle
				, new CGSGRegion(0, 0, 8, 8) //emission area
				, 40                                   //nbParticlesMax
				, new CGSGVector2D(0.0, 1.0)            //initial velocity of a particle
				, Math.PI / 4.0                         //angle area to rotate the direction vector
				, 5.0       //speed
				, 1.0       //random pour le speed
				, 1         //outflow
			);

			this.emitter.onInitParticle = function(event) {
				event.particle.node.globalAlpha = 1.0;
				event.particle.node.color = "#B5D2FF";
				event.particle.node.lineColor = event.particle.node.color;
				event.particle.initTTL(180 + Math.random() * 240);
			};

			this.emitter.onUpdateParticleEnd = function(particle) {
				particle.node.globalAlpha = 1.0 - (particle.age / particle.ttl);
			};
		},

		/**
		 * init a new game
		 * @param level
		 */
		initGame : function() {
			this.rootNode.detachChild(this.looseItems);
			this.rootNode.addChild(this.items);
			this.items.removeAll();
			this.score = 0;
			this.nbLive = maxLive;
			this.speed = 1;

			this.nbBees = 0;
			this.maxBees = 10;
			this.bees = [];
			this.maxClouds = 5;
			this.clouds = [];

			this.flowers = [];
			this.maxFlowers = 20;
			this.nbFlowers = 0;

			this.rootNode.reStartAnim();
			currentColorLerp = 0;
			currentColorIndex = 0;
			this.isRunning = true;
			this.emitter.stop();

			//init clouds
			for (var c = 0; c < this.maxClouds; c++) {
				var cloud = new CloudNode(0, 0, 200, 200);
				this.clouds.push(cloud);
				this.items.addChild(cloud);
			}

			var bindKillBee = this.killBee.bind(this);
			//init bees
			for (var b = 0; b < this.maxBees; b++) {
				var bee = new BeeNode(-30, Math.random() * 200, this.context, this, b);
				bee.onClick = bindKillBee;
				this.bees.push(bee);
				this.items.addChild(bee);
			}

			var type = 0;
			var bindCatchFlower = this.catchFlower.bind(this);
			for (var f = 0; f < this.maxFlowers; f++) {
				type = 0;
				if (f > 10) {
					type = CGSGMath.fixedPoint(Math.random() * 2);
				}
				else if (f > 5) {
					type = CGSGMath.fixedPoint(Math.random());
				}

				var flower = new FlowerNode(this, type, true);
				flower.onClick = bindCatchFlower;
				flower.isVisible = false;
				this.flowers.push(flower);
				this.items.addChild(flower);
			}

			this.updateScore();
			this.liveNode.reinit();
		},

		onKeyDown : function(event) {
			var keynum = (window.event) ? event.keyCode : event.which;

			switch (keynum) {
				case 32 : //Space
					break;
				case 37: //left
					break;
				case 38: //up
					break;
				case 39: //right
					break;
				case 40: //down
					break;
			}

			return keynum;
		},

		onKeyUp : function(event) {
			var keynum = (window.event) ? event.keyCode : event.which;

			return keynum;
		},

		killBee : function(event) {
			event.node.reStartAnim();
			this.nbLive = Math.max(0, this.nbLive - 1);
			this.updateLive();
		},

		killFlower : function() {
			this.nbLive = Math.max(0, this.nbLive - 1);
			this.updateLive();
		},

		catchFlower : function(event) {
			this.score += event.node.points;
			this.nbLive = Math.min(this.nbLive + event.node.live, maxLive);

			sceneGraph.animate(event.node, "globalAlpha", 10, 1.0, 0.0, "linear", 0, true);
			sceneGraph.getTimeline(event.node, "globalAlpha").onAnimationEnd = function(event) {
				event.node.reStartAnim(1);
			}

			this.updateScore();
			this.updateLive();
		},

		updateScore : function() {
			this.scoreNode.setScore(this.score);
		},

		updateLive : function() {
			while (this.nbLive <= maxLive && this.nbLive > this.liveNode.nbLive) {
				this.liveNode.addLive();
			}

			while (this.nbLive >= 0 && this.nbLive < this.liveNode.nbLive) {
				this.liveNode.removeLive();
			}

			if (this.nbLive <= 0) {
				this.renderLoose();
			}
		}
	}
);