/**
 * A CGSGNodeStar represent a basic star.
 * By default, the pickNodeMethod used to detect the node under the mice is CGSGPickNodeMethod.GHOST.
 * If you don't need precision on detection on your circles, just change the property to pickNodeMethod.REGION.
 *
 * @class CGSGNodeStar
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} numPoints number of Points on star
 * @param {Number} innerRadius Valleys of star
 * @param {Number} outerRadius Peaks of star
 * @type {CGSGNodeStar}
 * @author Paul Todd
 */
var CGSGNodeStar = CGSGNode.extend(
	{
		initialize: function (x, y, numPoints, innerRadius, outerRadius) {

			/**
			 * @property numPoints
			 * @type {Number}
			 * @private
			 */
			this._numPoints = numPoints;
						/**
			 * @property innerRadius
			 * @type {Number}
			 * @private
			 */
			this._innerRadius = innerRadius;
			/**
			 * @property outerRadius
			 * @type {Number}
			 * @private
			 */
			this._outerRadius = outerRadius;
			
			this._super(x, y, this._outerRadius * 2.0, this._outerRadius * 2.0);

			/**
			 * Color  to fill the star
			 * @property color
			 * @default "#444444"
			 * @type {String}
			 */
			this.color = "#444444";
			/**
			 * Color to stroke the star
			 * @property lineColor
			 * @default "#222222"
			 * @type {String}
			 */
			this.lineColor = "#222222";
			/**
			 * Width of the line that stroke the star.
			 * Let 0 if you don't want to stroke the star.
			 * @property lineWidth
			 * @default 0
			 * @type {Number}
			 */
			this.lineWidth = 0;

			this.pickNodeMethod = CGSGPickNodeMethod.GHOST;
			this.isProportionalResize = true;

			/**
			 * @property classType
			 * @readonly
			 * @type {String}
			 */
			this.classType = "CGSGNodeStar";
		},

		/**
		 * Set the new inner radius
		 * @method setInnerRadius
		 * @param {Number} radius
		 */
		setInnerRadius: function (radius) {
			this._innerRadius = radius;
		},

		/**
		 * Set the new outer radius and compute new dimension of the star
		 * @method setOuterRadius
		 * @param {Number} radius
		 */
		setOuterRadius: function (radius) {
			this._outerRadius = radius;
			this.dimension.width = this._outerRadius * 2.0;
			this.dimension.height = this.dimension.width;
		},
		
		/**
		 * Set the number of points
		 * @method setNumPoints
		 * @param {Number} numPoints
		 */
		setNumPoints: function (numPoints) {
			this._numPoints = numPoints;
		},
		
		/**
		 * Get the inner radius
		 * @method getInnerRadius
		 */
		getInnerRadius: function () {
			return this._innerRadius;
		},

		/**
		 * Get the outer radius
		 * @method getOuterRadius

		 */
		getOuterRadius: function () {
			return this._outerRadius;
		},
		
		/**
		 * Get the number of points
		 * @method getNumPoints
		 */
		getNumPoints: function () {
			return this._numPoints;
		},
		
		/**
		 * Custom rendering
		 * @method render
		 * @protected
		 * @param {CanvasRenderingContext2D} context the context into render the node
		 * */
		render: function (context) {
			//save current state
			this.beforeRender(context);

			this.doRenderLogic(context);

			//restore state
			this.afterRender(context);
		},
		
		/**
         * Render the star
         * @public
         * @method doRenderLogic
         * @param {CanvasRenderingContext2D} context the context into render the node
        */	
		doRenderLogic: function (context) {
			context.beginPath();
			context.globalAlpha = this.globalAlpha;
			
			context.moveTo(0 + this._outerRadius, 0);
			for(var i = 1; i < this._numPoints * 2; i++) {
				var radius = i % 2 === 0 ? this._outerRadius : this._innerRadius;
				var x = radius * Math.sin(i * Math.PI / this._numPoints);
				var y = -1 * radius * Math.cos(i * Math.PI / this._numPoints);
				context.lineTo(x + this._outerRadius, y + this._outerRadius);
			}
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
			if(this.getWidth() > 0 && this.getHeight() > 0){
				var scale = (Math.min(this.dimension.width, this.dimension.height) / 2.0) / this._outerRadius;
				this._outerRadius *= scale;
				this._innerRadius *= scale;
			}
		},

		/**
		 * @method renderGhost
		 * @param {CanvasRenderingContext2D} ghostContext the context into render the node
		 */
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
		 * @return {CGSGNodeStar} a copy of this node
		 */
		copy: function () {
			var node = new CGSGNodeStar(this._numPoints, this._innerRadius, this._outerRadius);
			//call the super method
			node = this._super(node);

			node.color = this.color;
			node.lineColor = this.lineColor;
			node.lineWidth = this.lineWidth;
			return node;
		}
	}
);
