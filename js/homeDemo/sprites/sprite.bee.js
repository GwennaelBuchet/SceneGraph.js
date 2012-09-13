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
		initialize : function(x, y, context, parentState, id) {
			this._super(x, y, null, context);

			this.speed = 200.0;

			this.parentState = parentState;
			this.id = id;

			//name, speed, frames, sliceX, sliceY, width, height, framesPerLine
			this.addAnimation("fly", 4, 3, 0, 0, 16, 16, 1);
			//var scope = this;
			//this.onClick = scope.onClickHandler;


		},


		start : function() {
			this.initPosAndSpeed();

			this.play("fly", null);
			//sceneGraph.animate(this, "position.x", this.speed, this.position.x, canvasWidth + 20, "linear", 0, true);
		},

		/*onClickHandler : function(event) {
			this.parentState.killBee(this);
		},*/

		initPosAndSpeed : function() {
			this.currentPos = 0;
			var x = CGSGMath.fixedPoint(50 + Math.random() * 20);
			var y = CGSGMath.fixedPoint(Math.random() * canvasWidth);
			this.translateTo(x, y);
			this.speed = CGSGMath.fixedPoint(150 + Math.random() * 100);
			sceneGraph.animate(this, "position.x", this.speed, x,
			                   canvasWidth + 20, "linear", 0, true);

			var bindInitPosAndSpeed = this.initPosAndSpeed.bind(this);
			sceneGraph.getTimeline(this, "position.x").onAnimationEnd = bindInitPosAndSpeed;
		}
	}
);