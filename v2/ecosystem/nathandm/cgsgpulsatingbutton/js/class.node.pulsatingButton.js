/**
 * A CGSGPulsatingButton represent a circle button with an aura
 *
 * @class CGSGPulsatingButton
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @type {CGSGPulsatingButton}
 * @author Nathan (nathan.damie@capgemini.com)
 */
var CGSGPulsatingButton = CGSGNodeCircle.extend({

    initialize: function (x, y, radius, iconPath) {
        this._super(x, y, radius);
        this._speed = 0.2;
        this._pulseRange = 0.2;

        CGSG.eventManager.bindHandler(this, cgsgEventTypes.ON_MOUSE_ENTER, (this.onMouseEnterHandler).bind(this));
        CGSG.eventManager.bindHandler(this, cgsgEventTypes.ON_MOUSE_OUT, (this.onMouseLeaveHandler).bind(this));

        this.classType = "CGSGPulsatingButton";

        this._time = 0;

        this._notHoveredColor = "#DDDDDD";
        this._hoveredColor = "green";

        //init first color
        this._color = this._notHoveredColor;

        if (cgsgExist(iconPath)) {
            this.icon = new CGSGNodeImage(0, 0, null);
            this.iconImage = new Image();
            this.iconImage.onload = this.onIconLoaded.bind(this);
            this.iconImage.src = iconPath;
            this.addChild(this.icon);
            this.icon.isTraversable = false;
        }
    },

    onIconLoaded: function () {
        this.icon.setImage(this.iconImage);
        var offset = (this.getWidth() - this.icon.getWidth()) >> 1;
        this.icon.translateTo(offset, offset, false);
    },

    _draw: function (context) {

        context.globalAlpha = 0.3;

        var radius = CGSGMath.fixedPoint((this.getWidth() + ((Math.sin(this._time) + 1) * this.getWidth() * this._pulseRange)) / 2),
            center = this.getWidth() / 2;

        if (this.isMouseOver) {
            this._color = this._hoveredColor;
        } else {
            this._color = this._notHoveredColor;
        }

        //aura
        context.fillStyle = this._color;
        context.beginPath();
        context.arc(center, center, radius, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
        context.globalAlpha = 1;

        //outerCircle
        context.fillStyle = this._notHoveredColor;
        context.beginPath();
        context.arc(center, center, center, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();

        //innerCircle
        var radialGradient = context.createRadialGradient( center, center, center * 2, center, center, 0);
        radialGradient.addColorStop(0, this._notHoveredColor);
        radialGradient.addColorStop(1, this._hoveredColor);
        context.fillStyle = radialGradient;

        radius = center * 0.8;
        context.beginPath();
        context.arc(center, center, radius, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();

        this._time += this._speed;

        if (this._time > Math.PI * 2) {
            this._time = 0;
        }
    },

    onMouseEnterHandler: function (event) {
        this.isMouseOver = true;
    },

    onMouseLeaveHandler: function (event) {
        this.isMouseOver = false;
    },

    render: function (context) {
        this._draw(context);
    }

});