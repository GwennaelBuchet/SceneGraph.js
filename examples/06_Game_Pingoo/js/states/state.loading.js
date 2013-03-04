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
var StateLoading = CGSGObject.extend(
	{
		initialize : function(context) {
			this.rootNode = new CGSGNode(0, 0, 1, 1);

			this.text = new CGSGNodeText(0, 0, "LOADING...");
			this.text.setTextAlign("center");
			this.text.setMaxWidth(476);
			this.text.color = "#3322DE";

			this.bkg = new CGSGNodeSquare(0, 0, CGSG.canvas.width, CGSG.canvas.height);
			this.bkg.color = "EEEEFE";

			this.rootNode.addChild(this.bkg);
			this.rootNode.addChild(this.text);
		},

		/**
		 * Start this state by starting animations, counters, ...
		 * @method run
		 */
		start : function() {

		},

		/**
		 * Stop this state by stopping animations, counters, ...
		 * @method stop
		 */
		stop : function() {

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