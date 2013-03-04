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

var StateHome = CGSGObject.extend(
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

		},

		/**
		 * called each frame, just before the rendering process
		 */
		onRenderStartHandler: function () {
			currentColorLerp += 0.001;
			if (currentColorLerp >= 1) {
				currentColorLerp = 0;
				currentColorIndex = (currentColorIndex + 1) % 4;
			}
		},

		setImage: function (image) {
			this.image = image;
		},

		_createEnvironment: function () {
			this.rootNode = new SkyNode(0, 0, cgsgCanvas.width, cgsgCanvas.height, this.context);
			this.rootNode.isClickable = false;

			this.maxClouds = 5;
			this.clouds = [];
			this.clouds.clear();

			//init clouds
			for (var c = 0; c < this.maxClouds; c++) {
				var cloud = new CloudNode(0, 0, 200, 200);
				this.clouds.push(cloud);
				this.rootNode.addChild(cloud);
			}

			for (var c = 0; c < this.maxClouds; c++) {
				this.clouds[c].start();
			}

			var floor = new FloorNode(0, 0, 1, 1);
			this.rootNode.addChild(floor);
			floor.isClickable = false;

			//button "Go"
			var wButton = 250;
			var hButton = 50;
			this.buttonGo =
			new ButtonNode(CGSGMath.fixedPoint((cgsgCanvas.width - wButton - 10) / 2.0),
						   CGSGMath.fixedPoint((cgsgCanvas.height - hButton) / 2.5), wButton, hButton, 10);
			this.rootNode.addChild(this.buttonGo);

			var textGo = new CGSGNodeText(22, 22, "Let's Catch Flowers !");
			textGo.isClickable = false;
			textGo.color = "#6a7a89";
			this.buttonGo.addChild(textGo);
			var bindOnButtonGoClick = this.onButtonGoClick.bind(this);
			this.buttonGo.onClick = bindOnButtonGoClick;

			//Button "About"
			wButton = 100;
			hButton = 40;
			this.buttonAbout =
			new ButtonNode(CGSGMath.fixedPoint((cgsgCanvas.width - wButton - 10) / 2.0),
						   CGSGMath.fixedPoint((cgsgCanvas.height - hButton) / 1.25), wButton, hButton, 10);
			this.rootNode.addChild(this.buttonAbout);

			var textAbout = new CGSGNodeText(28, 18, "About");
			textAbout.color = "#6a7a89";
			textAbout.isClickable = false;
			this.buttonAbout.addChild(textAbout);
			var bindOnButtonAboutClick = this.onButtonAboutClick.bind(this);
			this.buttonAbout.onClick = bindOnButtonAboutClick;
		},

		onButtonGoClick: function () {
			this.game.changeGameState(GAME_STATE.PLAY_RUN);
		},

		onButtonAboutClick: function () {
			this.game.changeGameState(GAME_STATE.ABOUT);
		},

		/**
		 * init a new game
		 * @param level
		 */
		initGame: function (level) {
			this.rootNode.reStartAnim();
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
		}
	}
);