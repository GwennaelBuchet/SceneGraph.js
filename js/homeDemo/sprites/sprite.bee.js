/**
 * Created with JetBrains WebStorm.
 * User: Gwen
 * @project CatchTheFlowers
 * Date: 25/07/12
 * Time: 11:52
 * To change this template use File | Settings | File Templates.
 */
var Bee = CGSGNodeAnimatedSprite.extend(
    {
        initialize:function (x, y, context, parentState, id) {
            this._super(x, y, null, context);

            this.speed = 200.0;

            this.parentState = parentState;
            this.id = id;

            //name, speed, frames, sliceX, sliceY, width, height, framesPerLine
            this.addAnimation("fly", 4, 3, 0, 0, 16, 16, 1);
            var scope = this;
            this.onClick = scope.onClickHandler;

            this.initPosAndSpeed();
        },


        start:function () {
            this.play("fly", null);
            sceneGraph.animate(this, "position.x", this.speed, this.position.x, canvasWidth + 20, "linear", 0, true);

            var scope = this;
            sceneGraph.getTimeline(this, "position.x").onAnimationEnd = function (event) {
                scope.initPosAndSpeed();
            };
        },

        onClickHandler:function (event) {
            this.parentState.killBee(this);
        },

        initPosAndSpeed:function () {
            this.currentPos = 0;
            this.translateTo(-50 + Math.random() * 20, Math.random() * canvasWidth);
            this.speed = 150 + Math.random() * 100;
            sceneGraph.animate(this, "position.x", this.speed, this.position.x, canvasWidth + 20, "linear", 0, true);
        }
    }
);