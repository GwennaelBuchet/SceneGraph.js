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
var CGSGNodeScrollBarHandle = CGSGNode.extend({

    initialize: function (handleWidth) {
        this._super(0, 0);
        this.resizeTo(handleWidth, handleWidth);
        this.color = "#cdcdcd";
        this.isDraggable = true;
        this.onDrag = this.onSlide;
        this.selectionLineColor = 'rgba(0,0,0,0)';
        this.selectionHandleColor = 'rgba(0,0,0,0)';
    },

    /**
     * Restrain movement to x axis
     *
     * @method onSlide
     * @protected
     */
    onSlide: function () {
        var halfWidth = Math.max(this.getWidth(), this.getHeight()),
            width = this._parentNode.getWidth(),
            height = this._parentNode.getHeight();

        if (width > height) {
            var x = this.position.x;
            if (x < 0) {
                x = 0;
            } else if (x > width - halfWidth) {
                x = width - halfWidth;
            }
            this.translateTo(x, 0);
            var range = this._parentNode.max - this._parentNode.min;
            this._parentNode.value = this.position.x * (range / (width - this.getWidth())) + this._parentNode.min;
        } else {
            var y = this.position.y;
            if (y < 0) {
                y = 0;
            } else if (y > height - halfWidth) {
                y = height - halfWidth;
            }
            this.translateTo(0, y);
            var range = this._parentNode.max - this._parentNode.min;
            this._parentNode.value = this.position.y * (range / (height - this.getHeight())) + this._parentNode.min;
        }
    },

    /**
     * Default handle rendering (A rounded square with some "volume" effect)
     *
     * @method render
     * @protected
     * @param {CanvasRenderingContext2D} context the context into render the node
     */
    render: function (context) {
        context.save();
        context.fillStyle = this.color;
        context.fillRect(0,0, this.getWidth(), this.getHeight());
        context.restore();

    }
});

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
var CGSGNodeScrollBar = CGSGNode.extend({

    initialize: function (x, y, width, height) {
        this._super(x, y);
        this.resizeTo(width, height);
        this.backgroundColor = "#f1f1f1";
        this.min = -10;
        this.max = 10;
        this.value = 5;

        this.setHandle();
    },

    /**
     * Set default or custom handle for this slider
     *
     * @method setHandle
     * @public
     * @param {CGSGNode} [handle] slider's handle
     */
    setHandle: function (handle) {
        this.removeAll();
        this.handle = handle;
        var handleWidth = Math.min(this.getWidth(), this.getHeight());
        if (!cgsgExist(this.handle)) {
            this.handle = new CGSGNodeScrollBarHandle(handleWidth);
        }
        this.addChild(this.handle);
    },

    /**
     * Set lower bound of this slider and recompute handle position
     *
     * @method addHandle
     * @public
     * @param {Number} min lower bound of this slider
     */
    setMin: function (min) {
        if (min != null && min != this.min && min < this.max) {
            this.min = min;
        }
    },

    /**
     * Set upper bound of this slider and recompute handle position
     *
     * @method setMax
     * @public
     * @param {Number} max upper bound of this slider
     */
    setMax: function (max) {
        if (max != null && max != this.max && max > this.min) {
            this.max = max;
        }
    },

    /**
     * Set value of this slider and recompute handle position
     *
     * @method setValue
     * @public
     * @param {Number} value of this slider
     */
    setValue: function (value) {
        if (value >= this.min && value <= this.max) {
            this.value = value;
        }
    },

    render: function (ctx) {
        ctx.save();
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.getWidth(), this.getHeight());
        ctx.restore();
    }

});
