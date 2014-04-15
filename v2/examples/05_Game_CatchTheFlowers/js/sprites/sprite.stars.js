/**
 * Created with JetBrains WebStorm.
 * User: Gwen
 * @project CatchTheFlowers
 * Date: 25/07/12
 * Time: 11:52
 * To change this template use File | Settings | File Templates.
 */
var StarsNode = CGSGNode.extend(
	{
		initialize: function () {
			this._super(0, 0, cgsgCanvas.width, cgsgCanvas.height);

			this.initShape();
		},

		/**
		 * Pre-render the flower into a temp canvas to optimize the perfs
		 */
		initShape: function () {
			this._tmpCanvas = document.createElement('canvas');
			this._tmpCanvas.width = cgsgCanvas.width;
			this._tmpCanvas.height = cgsgCanvas.height;
			var tmpContext = this._tmpCanvas.getContext('2d');

			//draw the stars
			var centerX = 0;
			var centerY = 0;
			var radius = 1;
			for (var s = 0; s < 200; s++) {
				centerX = Math.random() * cgsgCanvas.width;
				centerY = Math.random() * (cgsgCanvas.height - 40);
				radius = 0.01 + Math.random() * 1.3;

				tmpContext.beginPath();
				tmpContext.arc(centerX, centerY, radius, 0, CGSGMath.PI2, false);
				tmpContext.fillStyle = 'white';
				tmpContext.fill();
			}

			//draw the moon
			centerX = 110;
			centerY = 80;
			radius = 30;

			tmpContext.beginPath();
			tmpContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			tmpContext.fillStyle = 'white';
			tmpContext.shadowColor = 'white';
			tmpContext.shadowBlur = 70;
			tmpContext.shadowOffsetX = 0;
			tmpContext.shadowOffsetY = 0;
			tmpContext.fill();

			tmpContext.beginPath();
			tmpContext.arc(120, 85, 8, 0, 2 * Math.PI, false);
			tmpContext.fillStyle = '#f8f8f8';
			tmpContext.fill();

			tmpContext.beginPath();
			tmpContext.arc(90, 70, 3, 0, 2 * Math.PI, false);
			tmpContext.fillStyle = '#f8f8f8';
			tmpContext.fill();

			tmpContext.beginPath();
			tmpContext.arc(110, 85, 4, 0, 2 * Math.PI, false);
			tmpContext.fillStyle = '#f8f8f8';
			tmpContext.fill();
		},

		/**
		 * Must be defined to allow the scene graph to render the image nodes
		 * */
		render: function (context) {
			//save current state
			//always call it
			this.beforeRender(context);

			context.globalAlpha = this.globalAlpha;

			//render the pre-rendered canvas
			context.drawImage(this._tmpCanvas, 0, 0);

			//restore state
			//always call it
			this.afterRender(context);
		}
	}
);