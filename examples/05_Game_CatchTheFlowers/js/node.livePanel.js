/**
 * Created with JetBrains WebStorm.
 * User: Gwen
 * @project CatchTheFlowers
 * Date: 25/07/12
 * Time: 11:52
 * To change this template use File | Settings | File Templates.
 */
var LivePanelNode = CGSGNodeSquare.extend(
	{
		initialize: function (x, y, w, h) {
			this._super(x, y, w, h);

			this.color = "#dfcfff";
			this.lineColor = "#ab7cb0";
			this.lineWidth = 1;

			this.textNode = new CGSGNodeText(5, 14, "Live:");
			this.addChild(this.textNode);
			this.textNode.color = "#ab7cb0";
			this.textNode.setSize(11, false);
			this.textNode.setTextBaseline("alphabetic");

			this.initShape();
			this.nbLive = maxLive;
			this.live = [];
			this.createLive();
			this.reinit();
		},

		/**
		 * Pre-render the flower into a temp canvas to optimize the perfs
		 */
		initShape: function () {
			this._tmpCanvas = document.createElement('canvas');
			this._tmpCanvas.width = 400;
			this._tmpCanvas.height = 300;
			var tmpContext = this._tmpCanvas.getContext('2d');

			var scale = 0.7;

			tmpContext.save();
			tmpContext.scale(scale, scale);
			tmpContext.beginPath();
			tmpContext.moveTo(13.0, 3.76);
			tmpContext.bezierCurveTo(12.60, -8.3, 5.63, -1.66, 4.74, 3.76);
			tmpContext.bezierCurveTo(-0.14, 3.30, -1.70, 9.37, 2.19, 11.56);
			tmpContext.bezierCurveTo(0.56, 15.87, 5.50, 19.27, 8.88, 16.23);
			tmpContext.bezierCurveTo(11.93, 19.14, 17.23, 16.20, 15.57, 11.57);
			tmpContext.bezierCurveTo(19.20, 9.84, 18.36, 3.37, 13.03, 3.76);
			tmpContext.closePath();
			tmpContext.fillStyle = "#e77418";

			tmpContext.fill();

			var centerX = 8.8;
			var centerY = 9.0;
			var radius = 3.0;

			tmpContext.beginPath();
			tmpContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			tmpContext.fillStyle = "#f6e9a4";
			tmpContext.fill();
			tmpContext.lineWidth = 1;
			tmpContext.strokeStyle = "#78614f";
			tmpContext.stroke();

			tmpContext.restore();
		},

		createLive: function () {
			for (var l = 0; l < maxLive; l++) {
				var live = new LiveNode(this.getWidth() - (maxLive - l) * 16, 2);
				live._tmpCanvas = this._tmpCanvas;
				this.live.push(live);

				this.addChild(live);
			}
		},

		reinit: function () {
			for (var l = 0; l < maxLive; l++) {
				var live = this.live[l];
				sceneGraph.getTimeline(live, "globalAlpha").removeAll();
				live.globalAlpha = 1;
			}
			this.nbLive = maxLive;
		},

		addLive: function () {
			if (this.nbLive < maxLive) {
				var live = this.live[this.nbLive];
				sceneGraph.getTimeline(live, "globalAlpha").removeAll();
				sceneGraph.animate(live, "globalAlpha", 30, live.globalAlpha,
								   1.0, "linear", 0, true);

				this.nbLive++;
			}
		},

		removeLive: function () {
			if (this.nbLive > 0) {
				var live = this.live[this.nbLive - 1];
				sceneGraph.getTimeline(live, "globalAlpha").removeAll();
				sceneGraph.animate(live, "globalAlpha", 30, live.globalAlpha,
								   0.0, "linear", 0, true);

				this.nbLive--;
			}
		}

	}
);