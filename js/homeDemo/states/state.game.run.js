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
		initialize : function(context) {
			this.context = context;
			this.image = null;

			this.createEnvironment();
		},

		/**
		 * called each time this state is activated
		 */
		run : function() {
			this.initGame(/*currentLevel*/);

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
				this.rootNode.addChild(this.bees[this.nbBees]);
				this.bees[this.nbBees].start();
				this.nbBees++;
			}

			if ((cgsgCurrentFrame % 900) == 0) {
				var flower = new FlowerNode();
				flower.start();
				var bindCatchFlower = this.catchFlower.bind(this);
				flower.onClick = bindCatchFlower;
				this.rootNode.addChild(flower);
			}
		},

		setImage : function(image) {
			this.image = image;
		},

		createEnvironment : function() {
			this.rootNode = new SkyNode(0, 0, canvasWidth, canvasHeight, this.context);

			var floor = new FloorNode(0, 0, 1, 1);
			this.rootNode.addChild(floor);

			this.scoreNode = new ScoreNode(0, 0, 103, 18);
			this.rootNode.addChild(this.scoreNode);

			this.liveNode = new LiveNode(canvasWidth - 135, 0, 135, 18);
			this.rootNode.addChild(this.liveNode);
		},

		/**
		 * init a new game
		 * @param level a PingmineLevel
		 */
		initGame : function(level) {
			this.score = 0;
			this.nbLive = 6;
			this.speed = 1;

			this.nbBees = 0;
			this.maxBees = 10;
			this.bees = [];
			this.maxClouds = 5;
			this.clouds = [];

			//init clouds
			for (var c = 0; c < this.maxClouds; c++) {
				var cloud = new CloudNode(0, 0, 200, 200);
				this.clouds.push(cloud);
				this.rootNode.addChild(cloud);
			}

			var bindKillBee = this.killBee.bind(this);
			//init bees
			for (var b = 0; b < this.maxBees; b++) {
				var bee = new BeeNode(-30, Math.random() * 200, this.context, this, b);
				bee.onClick = bindKillBee;
				this.bees.push(bee);
			}

			this.updateScore();
			this.updateLive();
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
			this.nbLive--;

			event.node.reStartAnim();
		},

		catchFlower : function(flower) {
			this.score += flower.points;
			this.nbLive += flower.live;

			this.updateScore();
		},

		updateScore : function() {
			this.scoreNode.setScore(this.score);
		},

		updateLive : function() {
		}
	}
);