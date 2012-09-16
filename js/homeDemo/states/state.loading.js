/**
 * Created with JetBrains WebStorm.
 * @author Gwen
 * @project CatchTheFlowers
 * @filename state.loading
 * @date 25/07/12
 * @time 14:03
 * @purpose
 *
 */
var StateLoading = Object.extend(
	{
		initialize : function(context) {
			this.rootNode = new CGSGNode(0, 0, 1, 1);

			this.text = new CGSGNodeText(0, 0, "LOADING...");
			this.text.setTextAlign("center");
			this.text.setMaxWidth(476);
			this.text.color = "#3322DE";

			this.bkg = new CGSGNodeSquare(0, 0, canvasWidth, canvasHeight);
			this.bkg.color = "EEEEFE";

			this.rootNode.addChild(this.bkg);
			this.rootNode.addChild(this.text);
		},

		/**
		 * called each time this state is activated
		 */
		run : function() {

		},

		/**
		 * called each frame
		 */
		onRenderStartHandler : function() {
		},

		onKeyDown : function(event) {
			var keynum = (window.event) ? event.keyCode : event.which;
		},

		onKeyUp : function(event) {

		},

		setImage : function(image) {
			//this.pingoo.setImage(image);
		}
	}
);