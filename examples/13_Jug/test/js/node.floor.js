var FloorNode = CGSGNodeImage.extend({
    initialize: function (urlImage) {
        this._super(0, 0, urlImage);

        this.isTraversable = false;

        this.onLoadEnd = this.onLoadEndHandler.bind(this);
    },

    onLoadEndHandler:function(event) {
        this.translateTo(0, CGSG.canvas.height - this.getHeight());
        //CGSG.animationManager.animate(this, "position.x", 3000, 0, -2000, 0, false);
    }
});
