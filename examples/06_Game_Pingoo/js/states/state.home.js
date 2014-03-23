/**
 * Created with JetBrains WebStorm.
 * @author Gwen
 * @project cgPingMine
 * @filename state.loading
 * @date 25/07/12
 * @time 14:03
 * @purpose
 *
 */
var StateHome = CGSGObject.extend(
	{
		initialize: function (context, parent) {
			this.rootNode = new CGSGNode(0, 0, 1, 1);

			var bkg = new CGSGNodeSquare(0, 0, cgsgCanvas.width, cgsgCanvas.height);
			bkg.color = "#CCD6FF";
			this.rootNode.addChild(bkg);

			var textTitle = new CGSGNodeText(20, 10, "Ping Mine");
			textTitle.color = "#3322DE";
			this.rootNode.addChild(textTitle);
			textTitle.translateTo((cgsgCanvas.width - textTitle.getWidth()) / 2, 10);

			var textLevel = new CGSGNodeText(0, 100, "Choose your level :");
			textLevel.color = "#3322DE";
			this.rootNode.addChild(textLevel);

			this.choosedLevel = PingmineLevel.EASY;

			this.textDescr = new CGSGNodeText(0, 360, "");
			this.textDescr.color = "#AA2222";
			this.textDescr.translateTo((cgsgCanvas.width - this.textDescr.getWidth()) / 2, 360);
			this.textDescr.setMaxWidth(cgsgCanvas.width - 130, false);
			this.textDescr.setTextAlign("center", false);
			this.textDescr.setLineHeight(36, false);
			this.textDescr.setWrapMode(CGSGWrapMode.WORD, true);
			this.rootNode.addChild(this.textDescr);

			this.buttonsLevel = [];
			this.addButtonLevel(200, 140, PingmineLevel.EASY);
			this.addButtonLevel(45, 180, PingmineLevel.NORMAL);
			this.addButtonLevel(50, 220, PingmineLevel.HARD);
			this.addButtonLevel(35, 260, PingmineLevel.IMPOSSIBLE);

			var textGo = new CGSGNodeText(0, 500, "Let' Go !");
			textGo.color = "#3322DE";
			textGo.computeRealDimension();
			textGo.translateTo((cgsgCanvas.width - textGo.getWidth()) / 2, 500);
			textGo.pickNodeMethod = CGSGPickNodeMethod.REGION;
			this.rootNode.addChild(textGo);
			var that = this;
			textGo.onClick = function (event) {
				currentLevel = that.choosedLevel;
				parent.changeGameState(GAME_STATE.PLAY);
			}

			this.selectLevel(PingmineLevel.NORMAL);

			this.initializeSnow();
		},

		addButtonLevel: function (x, y, level) {
			var textLevel = new CGSGNodeText(x, y, level.name);
			textLevel.color = "#5871F0";
			textLevel.translateTo((cgsgCanvas.width - textLevel.getWidth()) / 2, y);
			textLevel.pickNodeMethod = CGSGPickNodeMethod.REGION;

			var that = this;
			textLevel.onClick = function (event) {
				that.selectLevel(level);
			}

			textLevel.onMouseOver = function (event) {
				that.selectLevel(level);
			}

			this.rootNode.addChild(textLevel);
			this.buttonsLevel[level] = textLevel;
		},

		setLevelDescription: function (level) {
			this.textDescr.setText(level.desc);
			this.textDescr.translateTo((cgsgCanvas.width - this.textDescr.getWidth()) / 2, 360);
		},

		/**
		 * @method selectLevel
		 * @param {PingmineLevel} level
		 */
		selectLevel: function (level) {
			this.choosedLevel = level;
			this.setLevelDescription(level);

			//todo : add a marker around the name of the selected level
			//this.buttonsLevel[level].
		},

		/**
		 * Initialize the particles for the falling snow
		 * @method initializeSnow
		 */
		initializeSnow: function () {
			//create the particle system instance
			this.particlesSystem = new CGSGParticleSystem(0, 0); //x, y

			//first create and add an this.snowEmitter to the particle system
			this.snowEmitter = this.particlesSystem.addEmitter(
				new CGSGNodeCircle(0, 0, 10)
				, new CGSGRegion(0, 30, cgsgCanvas.width, 0)     //emission area
				, 90                               //nbParticlesMax
				, new CGSGVector2D(0.0, -1.0)        //initial velocity of a particle
				, 0.0                     //angle area to rotate the direction vector
				, 1                                  //speed of animation (1.0 = normal and slow speed)
				, 0.4                               //random range to apply to the speed of each particle
				, 10                               //outflow
			);

			//tell the this.snowEmitter how to init a particle.
			//be sure to call this BEFORE the initParticles function
			this.snowEmitter.onInitParticle = function (event) {
				event.particle.node.globalAlpha = 0.3 + Math.random() * 0.4;
				event.particle.node.color = "white";
				event.particle.checkCTL = function (particle) {
					return particle.position.y <= cgsgCanvas.height + 40;
				};

				event.particle.node.resizeTo(5 + Math.random() * 5, 5 + Math.random() * 5);

				//add some custom info to the particles
				event.particle.userData = {
					amplitude: 18 + Math.random() * 10,
					period   : 0.005 + Math.random() * 0.02
				};
			};

			//add an update handler, fired each time a particle position was updated by the this.snowEmitter
			this.snowEmitter.onUpdateParticleEnd = function (particle) {
				//apply a sinusoidal movement on X
				particle.node.translateWith(Math.sin(particle.age * particle.userData.period)
												* particle.userData.amplitude, 0);
			};

			//finally, add the particle system into the scenegraph
			this.rootNode.addChild(this.particlesSystem);
		},

		/**
		 * Start this state by starting animations, counters, ...
		 * @method run
		 */
		start: function () {
			//start the snow animation
			this.snowEmitter.start();
		},

		/**
		 * Stop this state by stopping animations, counters, ...
		 * @method stop
		 */
		stop: function () {
			//stop the snow animation
			this.snowEmitter.stop();
		},

		onKeyDown: function (event) {
			var keynum = (window.event) ? event.keyCode : event.which;
		},

		onKeyUp: function (event) {

		},

		setImage: function (image) {
			//this.pingoo.setImage(image);
		}
	}
);