var FloorNode = CGSGNodeImage.extend({
    initialize: function (urlImage) {
        this._super(0, 0, urlImage);

        this.isTraversable = false;

        this.onLoad = this.onLoadHandler.bind(this);
    },

    onLoadHandler:function(event) {
        this.translateTo(0, CGSG.canvas.height - this.getHeight());
        CGSG.animationManager
    }
});
