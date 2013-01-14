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
var StateLoading = CGSGObject.extend(
	{
		initialize: function (context) {

			this._createEnvironment();
		},

		_createEnvironment: function () {
			this.rootNode = new SkyNode(0, 0, cgsgCanvas.width, cgsgCanvas.height, this.context);

			var floor = new FloorNode(0, 0, 1, 1);
			this.rootNode.addChild(floor);

			this.text = new CGSGNodeText(0, 0, "LOADING...");
			this.text.color = "#3322DE";
		},

		/**
		 * called each time this state is activated
		 */
		run: function () {

		},

		/**
		 * called each frame
		 */
		onRenderStartHandler: function () {
		},

		onKeyDown: function (event) {
			var keynum = (window.event) ? event.keyCode : event.which;
		},

		onKeyUp: function (event) {

		},

		setImage: function (image) {
		}
	}
);