/**
 * A CGSGNodeWedge represent a basic Wedge.
 * By default, the pickNodeMethod used to detect the node under the mice is CGSGPickNodeMethod.GHOST.
 * If you don't need precision on detection on your circles, just change the property to pickNodeMethod.REGION.
 *
 * @class CGSGNodeWedge
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} centerX of Wedge
 * @param {Number} centerY of Wedge
 * @param {Number} radius of wedge
 * @param {Number} angle radians of wedge
 * @param {Boolean} clockwise direction of draw
 * @type {CGSGNodeWedge}
 * @author Paul Todd
 */
var CGSGNodeWedge = CGSGNode.extend(
	{
		initialize: function (centerX, centerY, radius, angle, clockwise) {

			this._radius = radius;
			this._clockwise = clockwise;
			this._angle = angle;
			this._center = new CGSGPosition(centerX, centerY);

			this._super(0, 0, radius * 2.0, radius * 2.0);
			this.translateTo(centerX - radius, centerY - radius);

			this.color = "#444444";
			this.lineColor = "#222222";
			this.lineWidth = 0;

			this.pickNodeMethod = CGSGPickNodeMethod.GHOST;
			this.isProportionalResize = true;

			this.classType = "CGSGNodeWedge";
		},

		setRadius: function (radius) {
			this._radius = radius;
			this.dimension.width = this._radius * 2.0;
			this.dimension.height = this.dimension.width;
		},

		setAngle: function (angle) {
			this._angle = angle;
		},

		setCenter: function (center) {
			this._center = center;
			this.position.x = this._center.x - this._radius;
			this.position.y = this._center.y - this._radius;
		},

		render: function (context) {
			//save current state
			this.beforeRender(context);

			this.doRenderLogic(context);

			//restore state
			this.afterRender(context);
		},

		/**
         * Render the wedge
         * @public
         * @method doRenderLogic
         * @param {CanvasRenderingContext2D} context the context into render the node
        */	
		doRenderLogic: function (context) {
           	context.beginPath();
			context.globalAlpha = this.globalAlpha;
			
           	context.arc(this._radius, this._radius, this._radius, 0, this._angle, this._clockwise);
           	context.lineTo(this._radius, this._radius);
           	context.closePath();
           	
			context.fillStyle = this.color;
			context.fill();

			if (this.lineWidth > 0) {
				context.lineWidth = this.lineWidth;
				context.strokeStyle = this.lineColor;
				context.stroke();
			}	
		},
		/**
		 * Replace current dimension by these new ones and compute new radius
		 * @method resizeTo
		 * @param {Number} newWidth
		 * @param {Number} newHeight
		 * */
		resizeTo: function (newWidth, newHeight) {
			this.dimension.resizeTo(newWidth, newHeight);

			this._computeResizedRadius();
		},

		/**
		 * Multiply current dimension by these new ones
		 * @method resizeTBy
		 * @param {Number} widthFactor
		 * @param {Number} heightFactor
		 * */
		resizeBy: function (widthFactor, heightFactor) {
			this.dimension.resizeBy(widthFactor, heightFactor);

			this._computeResizedRadius();
		},

		/**
		 * Increase/decrease current dimension with adding values
		 * @method resizeWith
		 * @param {Number} width
		 * @param {Number} height
		 * */
		resizeWith: function (width, height) {
			this.dimension.resizeWith(width, height);

			this._computeResizedRadius();
		},

		/**
		 * @method _computeResizedRadius
		 * @private
		 */
		_computeResizedRadius: function () {
			var r = this._radius;
			this._radius = Math.min(this.dimension.width, this.dimension.height)/ 2.0;
			r = -2.0 * (r - this._radius);
			this._center.x += r;
			this._center.y += r;
		},

		renderGhost: function (ghostContext) {
			//save current state
			this.beforeRenderGhost(ghostContext);

			if (this.globalAlpha > 0) {
				this.doRenderLogic(ghostContext);
			}

			//restore state
			this.afterRenderGhost(ghostContext);
		},

		/**
		 * @method copy
		 * @return {CGSGNodeWedge} a copy of this node
		 */
		copy: function () {
			var node = new CGSGNodeWedge(this._center.x, this._center.y, this._radius, this._angle, this._clockwise);
			//call the super method
			node = this._super(node);

			node.color = this.color;
			node.lineColor = this.lineColor;
			node.lineWidth = this.lineWidth;
			return node;
		}

	}
);
