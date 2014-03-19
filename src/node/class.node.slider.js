/**
 * A CGSGNodeSliderHandle represent a slider handle
 *
 * @class CGSGNodeSliderHandle
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} handleWidth width of the handle
 * @type {CGSGNodeSliderHandle}
 * @author Jeremie (jeremie.lussiez@capgemini.com)
 */
var CGSGNodeSliderHandle = CGSGNode.extend(
	{

		initialize : function(handleWidth) {
			this._super(0, 0);
			this.resizeTo(handleWidth, handleWidth);
			//this.color = "#CCCCCC";
			this.rotationCenter = new CGSGPosition(0.5, 0.5);
			this.handleWidth = handleWidth;
			this.isDraggable = true;
			this.onDrag = this.onSlide;
		},

		/**
		 * Get parent slider
		 *
		 * @method getParentSlider
		 * @public
		 * @return {CGSGNodeSlider} parent slider
		 */
		getParentSlider : function() {
			return this._parentNode;
		},

		/**
		 * Restrain movement to x axis
		 *
		 * @method onSlide
		 * @protected
		 */
		onSlide : function() {
			this.handleWidth =
			Math.min(this._parentNode.getHeight(), this._parentNode.getWidth()) *
			2;
			var halfWidth = this.handleWidth / 2;
			var x = this.position.x;
			if (x < -halfWidth) {
				x = -halfWidth;
			}
			else if (x > this._parentNode.getWidth() - halfWidth) {
				x = this._parentNode.getWidth() - halfWidth;
			}
			this.translateTo(x, -this.handleWidth / 4);
			var range = this._parentNode.max - this._parentNode.min;
			this._parentNode.value =
			(this.position.x + halfWidth) *
			(range / this._parentNode.getWidth()) + this._parentNode.min;
		},

		/**
		 * Default handle rendering (A rounded square with some "volume" effect)
		 *
		 * @method render
		 * @protected
		 * @param c {CanvasRenderingContext2D} context the context into render the node
		 */
		render : function(c) {

			this.handleWidth =
			Math.min(this._parentNode.getHeight(), this._parentNode.getWidth()) *
			2;

			var borderRadius = this.handleWidth / 10;

			c.lineWidth = 2;
			c.strokeStyle = CGSGColor.darkenHex(this.color, 0.7);

			var gradient = c.createLinearGradient(this.handleWidth, 0,
												  this.handleWidth,
												  this.handleWidth);
			gradient.addColorStop(0.3, this.color);
			gradient.addColorStop(1, CGSGColor.darkenHex(this.color, 0.7));

			c.fillStyle = gradient;
			c.beginPath();
			c.arc(borderRadius, borderRadius, borderRadius, Math.PI,
				  -Math.PI / 2, false);
			c.lineTo(this.handleWidth - borderRadius, 0);
			c.arc(this.handleWidth - borderRadius, borderRadius, borderRadius,
				  -Math.PI / 2, 0, false);
			c.lineTo(this.handleWidth, this.handleWidth - borderRadius);
			c.arc(this.handleWidth - borderRadius,
				  this.handleWidth - borderRadius, borderRadius, 0, Math.PI / 2,
				  false);
			c.lineTo(borderRadius, this.handleWidth);
			c.arc(borderRadius, this.handleWidth - borderRadius, borderRadius,
				  Math.PI / 2, Math.PI, false);
			c.closePath();

			c.fill();
			c.stroke();

		}

	}
);

/**
 * A CGSGNodeSlider represent a slider
 *
 * @class CGSGNodeSlider
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @type {CGSGNodeSlider}
 * @author Jeremie (jeremie.lussiez@capgemini.com)
 */
var CGSGNodeSlider = CGSGNode.extend(
	{

		initialize : function(x, y, width, height) {
			this._super(x, y);
			this.resizeTo(width, height);
			this.backgroundColor = "#EEEEEE";
			this.valueColor = "#50479E";
			this.min = -10;
			this.max = 10;
			this.value = 5;
			this.rotationCenter = new CGSGPosition(0.5, 0.5);

			this.onResize = this.updateSliderHandle;

			this.setHandle();
		},

		/**
		 * Custom rendering
		 *
		 * @method render
		 * @protected
		 * @param c {CanvasRenderingContext2D} context the context into render the node
		 */
		render : function(c) {
			c.save();
			this.outlineShape(c);
			this.renderBackground(c);
			this.renderValue(c);
			c.restore();
		},

		/**
		 * Shape context to allow easy inner shadow and value rendering.
		 *
		 * @method outlineShape
		 * @private
		 * @param c {CanvasRenderingContext2D} context the context into render the node
		 */
		outlineShape : function(c) {
			var borderRadius = Math.min(this.getWidth(), this.getHeight()) / 2;
			var width = this.getWidth();
			c.beginPath();
			c.arc(borderRadius, borderRadius, borderRadius, Math.PI / 2, -Math.PI / 2,
				  false);
			c.lineTo(width - borderRadius, 0);
			c.arc(width - borderRadius, borderRadius, borderRadius, -Math.PI / 2,
				  Math.PI / 2, false);
			c.lineTo(borderRadius, borderRadius * 2);
			c.closePath();
			c.clip();
		},

		/**
		 * Render slider background.
		 *
		 * @method renderBackground
		 * @private
		 * @param c {CanvasRenderingContext2D} context the context into render the node
		 */
		renderBackground : function(c) {

			c.fillStyle = this.backgroundColor;
			c.strokeStyle = CGSGColor.darkenHex(this.backgroundColor, 0.8);
			c.lineWidth = 4;

			var borderRadius = Math.min(this.getWidth(), this.getHeight()) / 2;
			var width = this.getWidth();

			c.beginPath();
			c.arc(borderRadius, borderRadius, borderRadius, Math.PI / 2, -Math.PI / 2,
				  false);
			c.lineTo(width - borderRadius, 0);
			c.arc(width - borderRadius, borderRadius, borderRadius, -Math.PI / 2,
				  Math.PI / 2, false);
			c.lineTo(borderRadius, borderRadius * 2);
			c.closePath();

			c.fill();
			c.stroke();

			c.shadowColor = 'black';
			c.shadowBlur = 15;
			c.shadowOffsetX = 0;
			c.shadowOffsetY = 0;

			c.beginPath();
			c.rect(0, -this.getHeight(), this.getWidth(), this.getHeight());
			c.closePath();

			c.fill();

		},

		/**
		 * Render slider value (Fills background with color).
		 *
		 * @method renderBackground
		 * @private
		 * @param c {CanvasRenderingContext2D} context the context into render the node
		 */
		renderValue : function(c) {

			var fillEnd = this.getWidth() / Math.abs(this.max - this.min) *
						  Math.abs(this.value - this.min);

			var gradient = c.createLinearGradient(fillEnd, 0, fillEnd,
												  this.getHeight());
			gradient.addColorStop(0.7, CGSGColor.darkenHex(this.valueColor, 1.5));
			gradient.addColorStop(1, this.valueColor);

			c.fillStyle = gradient;

			c.beginPath();
			c.rect(0, 0, fillEnd, this.getHeight());
			c.closePath();
			c.fill();

		},

		/**
		 * Render slider value (Fills background with color).
		 *
		 * @method updateSliderHandle
		 * @protected
		 */
		updateSliderHandle : function() {
			var handleWidth = Math.min(this.getWidth(), this.getHeight()) * 2;
			var valuePosition = this.getWidth() / Math.abs(this.max - this.min) *
								Math.abs(this.value - this.min);
			this.handle.resizeTo(handleWidth, handleWidth);
			this.handle.translateTo(valuePosition - handleWidth / 2, -handleWidth / 4);
		},

		/**
		 * Set default or custom handle for this slider
		 *
		 * @method setHandle
		 * @public
		 * @param {CGSGNode} [handle] slider's handle
		 */
		setHandle : function(handle) {
			this.handle = handle;
			var handleWidth = Math.min(this.getWidth(), this.getHeight()) * 2;
			if (handle == undefined) {
				this.handle = new CGSGNodeSliderHandle(handleWidth);
				this.handle.color = this.backgroundColor;
			}
			this.addChild(this.handle);

			var valuePosition = this.getWidth() / Math.abs(this.max - this.min) *
								Math.abs(this.value - this.min);
			this.handle.translateTo(valuePosition - handleWidth / 4, -handleWidth / 4);
		},

		/**
		 * Get this slider's handle
		 *
		 * @method getHandle
		 * @public
		 * @return {CGSGNodeSliderHandle} [handle] slider's handle
		 */
		getHandle : function() {
			return this.handle;
		},

		/**
		 * Set lower bound of this slider and recompute handle position
		 *
		 * @method addHandle
		 * @public
		 * @param {Number} min lower bound of this slider
		 */
		setMin : function(min) {
			if (min != null && min != this.min && min < this.max) {
				this.min = min;
				this.updateSliderHandle();
			}
		},

		/**
		 * Set upper bound of this slider and recompute handle position
		 *
		 * @method setMax
		 * @public
		 * @param {Number} max upper bound of this slider
		 */
		setMax : function(max) {
			if (max != null && max != this.max && max > this.min) {
				this.max = max;
				this.updateSliderHandle();
			}
		},

		/**
		 * Set value of this slider and recompute handle position
		 *
		 * @method setValue
		 * @public
		 * @param {Number} value of this slider
		 */
		setValue : function(value) {
			if (value >= this.min && value <= this.max) {
				this.value = value;
				this.updateSliderHandle();
			}
		},

		/**
		 * Get value of this slider handle position in [0-1] range
		 *
		 * @method getValueAsRangeRatio
		 * @public
		 * @return {Number} handle position in [0-1] range
		 */
		getValueAsRangeRatio : function() {
			return 1 - Math.abs((this.value + this.min) / (this.max - this.min));
		}

	}
);
