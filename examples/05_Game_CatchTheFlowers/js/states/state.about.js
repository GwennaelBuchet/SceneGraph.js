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

var StateAbout = CGSGObject.extend(
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
		},

		onRenderStartHandler: function () {
		},

		setImage: function (image) {
			this.image = image;
			this.bee.setImage(image);
		},

		_createEnvironment: function () {
			this.rootNode = new SkyNode(0, 0, cgsgCanvas.width, cgsgCanvas.height, this.context);
			this.rootNode.isClickable = false;

			var floor = new FloorNode(0, 0, 1, 1);
			this.rootNode.addChild(floor);

			var bck = new CGSGNodeSquare(75, 35, 345, 215);
			bck.color = 'white';
			bck.lineWidth = 0;
			bck.lineColor = "white";
			bck.globalAlpha = 0.6;
			this.rootNode.addChild(bck);

			var textTitle = new CGSGNodeText(33, 6, "Catch all Flowers\nbefore they hit the ground");
			textTitle.setTextAlign("center");
			textTitle.setLineHeight(24);
			textTitle.setSize(18);
			textTitle.color = "#28323c";
			bck.addChild(textTitle);

			for (var f = 0; f < FLOWER_TYPE.length; f++) {
				var t = "fe";
				if (FLOWER_TYPE[f].live > 1) {
					t = "ves";
				}
				var textFlower = new CGSGNodeText(70, 70 + f * 26,
												  ": " + FLOWER_TYPE[f].live + " li" + t + " + " + FLOWER_TYPE[f].points
													  + " Points");
				textFlower.setSize(12);
				textFlower.color = "#28323c";
				bck.addChild(textFlower);

				var flower = new FlowerNode(this, f, false);
				flower.translateTo(45, 70 + f * 26);
				bck.addChild(flower);
			}

			var textBees = new CGSGNodeText(70, 155, ": Take you 1 life. Avoid them !");
			textBees.setSize(12);
			textBees.color = "#28323c";
			bck.addChild(textBees);

			this.bee = new BeeNode(45, 155, this.context, this, 1);
			this.bee.play("fly", null);
			bck.addChild(this.bee);

			var textSceneGraph = new CGSGNodeText(3, 198, "cgSceneGraph");
			textSceneGraph.setSize(10);
			textSceneGraph.color = "#cb23ad";
			bck.addChild(textSceneGraph);

			var textEmail = new CGSGNodeText(143, 198, "gwennael.buchet@capgemini.com");
			textEmail.setSize(10);
			textEmail.color = "#5a166e";
			bck.addChild(textEmail);

			//Button "Go Back"
			var wButton = 130;
			var hButton = 40;
			this.buttonGoBack =
			new ButtonNode(CGSGMath.fixedPoint((cgsgCanvas.width - wButton - 10) / 2.0),
						   cgsgCanvas.height - 65, wButton, hButton, 10);
			this.rootNode.addChild(this.buttonGoBack);

			var textGoBack = new CGSGNodeText(30, 18, "Go Back");
			textGoBack.color = "#6a7a89";
			textGoBack.isClickable = false;
			this.buttonGoBack.addChild(textGoBack);
			var bindOnButtonGoBackClick = this.onButtonGoBackClick.bind(this);
			this.buttonGoBack.onClick = bindOnButtonGoBackClick;
		},

		onButtonGoBackClick: function () {
			this.game.changeGameState(GAME_STATE.HOME);
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