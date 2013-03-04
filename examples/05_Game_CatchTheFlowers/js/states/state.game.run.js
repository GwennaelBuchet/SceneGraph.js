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

var StateGameRun = CGSGObject.extend(
	{
		initialize: function (context, parent) {
			this.context = context;
			this.image = null;

			this.game = parent;

			this._createEnvironment();
		},

		/**
		 * called each time this state is activated
		 */
		run: function () {
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
		onRenderStartHandler: function () {
			if (this.nbBees < this.maxBees && (cgsgCurrentFrame % 900) == 0) {
				//this.gameNode.addChild(this.bees[this.nbBees]);
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

		setImage: function (image) {
			this.image = image;
		},

		/**
		 * create all the environment elements for the game
		 * @private
		 */
		_createEnvironment: function () {
			this.rootNode = new SkyNode(0, 0, cgsgCanvas.width, cgsgCanvas.height, this.context);

			var floor = new FloorNode(0, 0, 1, 1);
			this.rootNode.addChild(floor);

			this.scoreNode = new ScorePanelNode(0, 0, 103, 18);
			this.rootNode.addChild(this.scoreNode);

			this.liveNode = new LivePanelNode(cgsgCanvas.width - 135, 0, 135, 18);
			this.rootNode.addChild(this.liveNode);

			this._createGameEnvironment();

			this._createLoseEnvironment();
		},

		/**
		 * create gfx elements and node for the game board
		 * @private
		 */
		_createGameEnvironment: function () {
			this.gameNode = new CGSGNode(0, 0, 1, 1);
			this.rootNode.addChild(this.gameNode);

			this.maxClouds = 5;
			this.clouds = [];
			for (var c = 0; c < this.maxClouds; c++) {
				var cloud = new CloudNode(0, 0, 200, 200);
				this.clouds.push(cloud);
				this.gameNode.addChild(cloud);
			}

			this.bees = [];
			this.maxBees = 10;
			var bindKillBee = this.killBee.bind(this);
			//init bees
			for (var b = 0; b < this.maxBees; b++) {
				var bee = new BeeNode(-30, Math.random() * 200, this.context, this, b);
				bee.onClick = bindKillBee;
				this.bees.push(bee);
				this.gameNode.addChild(bee);
			}

			this.flowers = [];
			this.maxFlowers = 20;
			var type = 0;
			var bindCatchFlower = this.catchFlower.bind(this);
			for (var f = 0; f < this.maxFlowers; f++) {
				type = 0;
				if (f > 10) {
					type = Math.round(Math.random() * 2);
				}
				else if (f > 5) {
					type = Math.round(Math.random());
				}

				var flower = new FlowerNode(this, type, true);
				flower.onClick = bindCatchFlower;
				flower.isVisible = false;
				this.flowers.push(flower);
				this.gameNode.addChild(flower);
			}
		},

		/**
		 * create gfx elements and nodes for the "you lose" board
		 * @private
		 */
		_createLoseEnvironment: function () {
			this.loseNode = new CGSGNode(0, 0, 1, 1);
			this.rootNode.addChild(this.loseNode);

			//Button "Go Back"
			var wButton = 130;
			var hButton = 40;
			this.buttonGoBack =
			new ButtonNode(CGSGMath.fixedPoint((cgsgCanvas.width - wButton - 10) / 2.0),
						   CGSGMath.fixedPoint((cgsgCanvas.height - hButton) / 1.5), wButton, hButton, 10);
			this.loseNode.addChild(this.buttonGoBack);

			var textGoBack = new CGSGNodeText(28, 18, "Go Home");
			textGoBack.color = "#6a7a89";
			textGoBack.isClickable = false;
			this.buttonGoBack.addChild(textGoBack);
			var bindOnButtonGoBackClick = this.onButtonGoBackClick.bind(this);
			this.buttonGoBack.onClick = bindOnButtonGoBackClick;

			var textGoLose = new CGSGNodeText(145, 120, "You Lose !");
			textGoLose.color = "white";
			textGoLose.setSize(32);
			this.loseNode.addChild(textGoLose);
		},

		/**
		 * Change replace the game root node with the lose root node
		 */
		renderLose: function () {
			if (this.isRunning) {
				this.isRunning = false;
				this.rootNode.detachChild(this.gameNode);
				this.rootNode.addChild(this.loseNode);
			}
		},

		onButtonGoBackClick: function () {
			this.game.changeGameState(GAME_STATE.HOME);
		},

		/**
		 * init a new game
		 */
		initGame: function () {
			this.rootNode.detachChild(this.loseNode);
			this.rootNode.addChild(this.gameNode);
			this.score = 0;
			this.nbLive = maxLive;
			this.speed = 1;

			this.nbBees = 0;
			this.nbFlowers = 0;

			for (var f = 0; f < this.flowers.length; f++) {
				this.flowers[f].isVisible = false;
			}

			this.rootNode.reStartAnim();
			currentColorLerp = 0;
			currentColorIndex = 0;
			this.isRunning = true;

			this.updateScore();
			this.liveNode.reinit();
		},

		onKeyDown: function (event) {
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

		onKeyUp: function (event) {
			var keynum = (window.event) ? event.keyCode : event.which;

			return keynum;
		},

		/**
		 * called when the player hit a bee
		 * @param event
		 */
		killBee: function (event) {
			event.node.reStartAnim();
			this.nbLive = Math.max(0, this.nbLive - 1);
			this.updateLive();
		},

		/**
		 * called when a flower hit the ground
		 */
		killFlower: function () {
			this.nbLive = Math.max(0, this.nbLive - 1);
			this.updateLive();
		},

		/**
		 * called when the player catch a flower
		 * @param event
		 */
		catchFlower: function (event) {
			this.score += event.node.points;
			this.nbLive = Math.min(this.nbLive + event.node.live, maxLive);

			sceneGraph.animate(event.node, "globalAlpha", 10, 1.0, 0.0, "linear", 0, true);
			sceneGraph.getTimeline(event.node, "globalAlpha").onAnimationEnd = function (event) {
				event.node.reStartAnim(1);
			}

			this.updateScore();
			this.updateLive();
		},

		/**
		 * update the score panel
		 */
		updateScore: function () {
			this.scoreNode.setScore(this.score);
		},

		/**
		 * Update the lives panel
		 */
		updateLive: function () {
			while (this.nbLive <= maxLive && this.nbLive > this.liveNode.nbLive) {
				this.liveNode.addLive();
			}

			while (this.nbLive >= 0 && this.nbLive < this.liveNode.nbLive) {
				this.liveNode.removeLive();
			}

			if (this.nbLive <= 0) {
				this.renderLose();
			}
		}
	}
);