/**
 * Created with JetBrains WebStorm.
 * @author Gwen
 * @project CatchTheFlowers
 * @date 25/07/12
 * @time 14:03
 * @purpose
 *
 */
var StateHome = Object.extend(
	{
		initialize : function(context, parent) {
			this.rootNode = new SkyNode(0, 0, canvasWidth, canvasHeight);

			var textTitle = new CGSGNodeText(20, 10, "Catch The Flowers");
			textTitle.color = "#3322DE";
			this.rootNode.addChild(textTitle);
			textTitle.translateTo((canvasWidth - textTitle.getWidth()) / 2, 10);


			var textGo = new CGSGNodeText(0, 500, "Let' Go !");
			textGo.color = "#3322DE";
			textGo.computeRealDimension();
			textGo.translateTo((canvasWidth - textGo.getWidth()) / 2, 500);
			this.rootNode.addChild(textGo);
			var that = this;
			textGo.onClick = function(event) {
				//currentLevel = that.choosedLevel;
				parent.changeGameState(GAME_STATE.PLAY_RUN);
			}

		},

		addButtonLevel : function(x, y, level) {
			var textLevel = new CGSGNodeText(x, y, level.name);
			textLevel.color = "#3322DE";
			textLevel.translateTo((canvasWidth - textLevel.getWidth()) / 2, y);

			var that = this;
			textLevel.onClick = function(event) {
				that.setLevelDescription(level);
			}

			textLevel.onMouseOver = function(event) {
				that.setLevelDescription(level);
			}

			this.rootNode.addChild(textLevel);
		},

		run : function() {

		},

		onKeyDown : function(event) {
			var keynum = (window.event) ? event.keyCode : event.which;
		},

		onKeyUp : function(event) {

		},

		setImage : function(image) {
		}
	}
);