/**
 * @author xymostech (Emily Eisenberg)
 */


var CGSGNodeRealCircle = CGSGNode.extend({
    initialize: function (centerX, centerY, radius) {

        this._radius = radius;
        this._center = new CGSGPosition(centerX, centerY);

        this._super(0, 0, radius * 2.0, radius * 2.0);
        this.translateTo(centerX - radius, centerY - radius);

        this.color = "#444444";
        this.lineColor = "#222222";
        this.lineWidth = 0;
    },

    render: function (context) {
        this.beforeRender(context);

        context.globalAlpha = this.globalAlpha;

        context.beginPath();
        context.arc(this._radius, this._radius, this._radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        if (this.lineWidth > 0) {
            context.lineWidth = this.lineWidth;
            context.strokeStyle = this.lineColor;
            context.stroke();
        }

        this.afterRender(context);
    }

});

