var SkyNode = CGSGNode.extend({
    initialize: function () {
        this._super(0, 0);
        this.resizeTo(CGSG.canvas.width, CGSG.canvas.height);

        this.isTraversable = false;
        this.setPrecomputed(true);
    },

    render: function (context) {
        var gradient = context.createLinearGradient(0, 0, 0, this.dimension.height);
        gradient.addColorStop(0, "#48A9FF");
        gradient.addColorStop(1, "#FFFFFF");
        context.fillStyle = gradient;

        context.fillRect(0, 0, this.dimension.width, this.dimension.height);
    }
});
