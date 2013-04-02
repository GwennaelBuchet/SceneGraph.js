/**
 * Created with JetBrains WebStorm.
 * User: Gwen
 * Date: 25/07/12
 * Time: 11:52
 * To change this template use File | Settings | File Templates.
 */
var Pingoo = CGSGNodeSprite.extend(
	{
		initialize : function(x, y, context) {
			this._super(x, y, null, context);

			this.coord = new CGSGPosition(5, 0);

			//name, speed, frames, sliceX, sliceY, width, height, framesPerLine
			var speed = 4;
			this.addAnimation("front", speed, 4, 476, 0, cellWidth, cellWidth, 4);
			this.addAnimation("back", speed, 4, 476, 34, cellWidth, cellWidth, 4);
			this.addAnimation("left", speed, 4, 476, 68, cellWidth, cellWidth, 4);
			this.addAnimation("right", speed, 4, 476, 102, cellWidth, cellWidth, 4);
			var scope = this;
			this.onAnimationEnd = function(event) {
				scope.reset();
			};

			this.animations = {
				"left"  : {axe : "x", sens : "position.x", move : -1},
				"right" : {axe : "x", sens : "position.x", move : 1},
				"front" : {axe : "y", sens : "position.y", move : 1},
				"back"  : {axe : "y", sens : "position.y", move : -1}
			};
			this.currentDirection = "front";

			this.setCoord(5, 0);
		},

		/**
		 * @method setCoord
		 * @param x
		 * @param y
		 */
		setCoord : function(x, y) {
			this.coord.x = x;
			this.coord.y = y;
		},

		turn : function(direction) {
			this.currentDirection = direction;
			this.play(direction, 1);
			this.stop();
			this.reset();
		},

		walk : function(direction) {
			this.currentDirection = direction;
			var anim = this.animations[direction];
			var currentPos = this.position[anim.axe];
			var nextPos = currentPos + anim.move * cellWidth;
			sceneGraph.animate(this, anim.sens, 30, currentPos, nextPos, 0, true);
			this.play(direction, 2);

			var x = (anim.axe == "x") ? this.coord.x + anim.move : this.coord.x;
			var y = (anim.axe == "y") ? this.coord.y + anim.move : this.coord.y;
			this.setCoord(x, y);
		},

		fall : function(sceneGraph) {

		}
	}
);