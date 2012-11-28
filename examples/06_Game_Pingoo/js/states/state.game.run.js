/**
 * Created with JetBrains WebStorm.
 * @author Gwen
 * @project cgPingMine
 * @filename state.game.run
 * @date 25/07/12
 * @time 14:05
 * @purpose
 *
 */

var BOARD_ITEM = {
	NONE    : 0,
	HOLE    : 1,
	SNOWMAN : 2,
	IGLOO   : 3,
	FISH    : 4,
	FLAG    : 5
};

var StateGameRun = CGSGObject.extend(
	{
		initialize : function(context) {
			this.context = context;
			this.boardPosition = new CGSGPosition(cellWidth, cellWidth);
			this.image = null;

			this.nbCols = 12;
			this.nbLines = 15;
			this.matrixBoard = [];
			this.matrixFlags = [];
			this.items = [];

			this.pingoo = new Pingoo(204, 34, context);
			this.board = new CGSGNodeImage(0, 0, null);
            this.board.setSlice(0, 0, 476, 635);
			this.igloo = new CGSGNodeImage(341, 545, null);

			this.pingoo.play("front", -1);
			this.pingoo.stop();
			this.board.addChild(this.pingoo);
			this.board.addChild(this.igloo);
			this.rootNode = this.board;
		},

		/**
		 * Start this state by starting animations, counters, ...
		 * @method run
		 */
		start : function() {
			//currentLevel is a global variable, defined in the "globals.js" file
			this.initGame(currentLevel);
		},

		/**
		 * Stop this state by stopping animations, counters, ...
		 * @method stop
		 */
		stop : function() {

		},

		setImage : function(image) {
			this.image = image;
			this.pingoo.setImage(image);
			this.board.setImage(image);
			this.igloo.setImage(image);

			//for testing purpose only
			for (var i = 0; i < this.items.length; i++) {
				this.items[i].setImage(image);
			}
		},

		/**
		 * init a new game
		 * @param level a PingmineLevel
		 */
		initGame : function(level) {
			do {
				this.initMatrices(level);
			} while (!this.checkExistingPath());

			var pos = this.getPositionOfCell(5, 0);
			this.pingoo.translateTo(pos.x, pos.y);
			this.pingoo.setCoord(5, 0);

			//for testing purpose only
			for (x = 0; x < this.nbCols; x++) {
				for (y = 0; y < this.nbLines; y++) {
					if (this.matrixBoard[x][y] == BOARD_ITEM.HOLE) {
						var hole = new CGSGNodeSprite(this.boardPosition.x + cellWidth * x,
						                                      this.boardPosition.y + cellWidth * y, null,
						                                      this.context);
						hole.setImage(this.image);
						hole.addAnimation("wave", 4, 16, 476, 172, cellWidth, cellWidth, 4);
						this.board.addChildAt(hole, this.board.children.length - 2);
						hole.play("wave", null);
						this.items[this.items.length] = hole;
					}
					else if (this.matrixBoard[x][y] == BOARD_ITEM.SNOWMAN) {
						var snowman = new CGSGNodeImage(this.boardPosition.x + cellWidth * x,
						                                this.boardPosition.y + cellWidth * y, null);
						snowman.setImage(this.image);
						this.board.addChildAt(snowman, this.board.children.length - 2);
						this.items[this.items.length] = snowman;
					}
					else if (this.matrixBoard[x][y] == BOARD_ITEM.FISH) {
						var fish = new CGSGNodeImage(this.boardPosition.x + cellWidth * x,
						                             this.boardPosition.y + cellWidth * y, null);
						fish.setImage(this.image);
						this.board.addChildAt(fish, this.board.children.length - 2);
						this.items[this.items.length] = fish;
					}
				}
			}
		},

		/**
		 * int a new matrixBoard witn new holes
		 * @param level
		 */
		initMatrices : function(level) {
			this.matrixBoard.clear();
			this.matrixFlags.clear();

			var x = 0;
			var y = 0;
			var r = 0.0;

			for (x = 0; x < this.nbCols; x++) {
				this.matrixBoard[x] = [];
				this.matrixFlags[x] = [];
				for (y = 0; y < this.nbLines; y++) {
					this.matrixBoard[x][y] = BOARD_ITEM.NONE;
					this.matrixFlags[x][y] = BOARD_ITEM.NONE;
				}
			}

			//place the igloo
			for (x = 9; x <= 11; x++) {
				for (y = 15; y <= 16; y++) {
					this.matrixBoard[x][y] = BOARD_ITEM.IGLOO;
				}
			}

			//place the holes
			var nbHoles = 0;
			var nbFishes = 0;
			while (nbHoles < level.nbHoles) {
				for (x = 0; x < this.nbCols && nbHoles < level.nbHoles; x++) {
					for (y = 1; y < this.nbLines && nbHoles < level.nbHoles; y++) {
						if (this.matrixBoard[x][y] == BOARD_ITEM.NONE) {
							r = Math.random();
							if (r > 0.9) {
								this.matrixBoard[x][y] = BOARD_ITEM.HOLE;
								nbHoles++;
							}
							//add a bonus (a fish)
							else if (r > 0.895 && nbFishes < level.maxNbFishes) {
								this.matrixBoard[x][y] = BOARD_ITEM.FISH;
								nbFishes++;
							}
						}
					}
				}
			}

			//place the obstacles
			var nbObstacles = 0;
			while (nbObstacles < level.nbObstacles) {
				for (x = 0; x < this.nbCols && nbObstacles < level.nbObstacles; x++) {
					for (y = 3; y < this.nbLines && nbObstacles < level.nbObstacles; y++) {
						if (this.matrixBoard[x][y] == BOARD_ITEM.NONE) {
							r = Math.random();
							if (r > 0.9) {
								this.matrixBoard[x][y] = BOARD_ITEM.SNOWMAN;
								nbObstacles++;
							}
						}
					}
				}
			}
		},

		/**
		 *
		 * @return {Boolean} true if the current matrixBoard has a full path from the start point to the end point.
		 */
		checkExistingPath : function() {
			return true;
		},

		getItemAt : function(x, y) {
			return this.matrixBoard[x][y];
		},

		getPositionOfCell : function(x, y) {
			return ({ x : this.boardPosition.x + cellWidth * x,
				y       : this.boardPosition.y + cellWidth * y });
		},


		/**
		 * @return next cell in the current pingoo direction
		 */
		getNextCell : function() {
			var coord = this.pingoo.coord.copy();
			var m = this.pingoo.animations[this.pingoo.currentDirection].move;
			if (this.pingoo.animations[this.pingoo.currentDirection].axe == "x" && coord.x + m >= 0 && coord.x + m
				< this.nbCols) {
				coord.x += m;
			}
			else if (coord.y + m >= 0 && coord.y + m < this.nbLines) {
				coord.y += m;
			}
			return coord;
		},

		putFlag : function() {
			var coord = this.getNextCell();
			//if the next cell is the same as now (ie on border), don't put a flag
			if (coord.x != this.pingoo.coord.x || coord.y != this.pingoo.coord.y) {
				if (this.matrixFlags[coord.x][coord.y] != BOARD_ITEM.NONE) {
					this.board.removeChild(this.matrixFlags[coord.x][coord.y].node, true);
					this.matrixFlags[coord.x][coord.y] = BOARD_ITEM.NONE;
				}
				else {
					var pos = this.getPositionOfCell(coord.x, coord.y);
					var flag = new CGSGNodeImage(pos.x, pos.y, null);
					flag.setImage(this.image);
					this.board.addChildAt(flag, this.board.children.length - 2);
					this.matrixFlags[coord.x][coord.y] = {item : BOARD_ITEM.FLAG, node : flag};
				}
			}
		},

		moveDown   : function() {
			this.movePingoo("front");
		},
		moveUp     : function() {
			this.movePingoo("back");
		},
		moveLeft   : function() {
			this.movePingoo("left");
		},
		moveRight  : function() {
			this.movePingoo("right");
		},
		movePingoo : function(direction) {
			var oldDirection = this.pingoo.currentDirection;

			this.pingoo.turn(direction);
			if (oldDirection == direction) {
				var coord = this.getNextCell();
				var itemBoard = this.getItemAt(coord.x, coord.y);
				var itemFlag = this.matrixFlags[coord.x][coord.y];

				var canMove = true;
				if (itemFlag != BOARD_ITEM.NONE || itemBoard == BOARD_ITEM.SNOWMAN) {
					canMove = false;
				}
				else if (itemBoard == BOARD_ITEM.HOLE) {
					console.log("perdu !!");
				}
				else if (itemBoard == BOARD_ITEM.IGLOO) {
					console.log("gagné !!");
				}
				else if (itemBoard == BOARD_ITEM.FISH) {
					console.log("Bonus !!");
				}

				if (canMove) {
					this.pingoo.walk(direction);
				}
			}
			this.displayNbHolesAround(this.pingoo.coord.x, this.pingoo.coord.y);
		},

		/**
		 * add to the board, at the current [x, y] index in the matrixBoard, the number of holes around this position
		 * @param x
		 * @param y
		 */
		displayNbHolesAround : function(x, y) {
			var nbHoles = this.checkNbHoles(x, y);
			if (nbHoles > 0) {
				var number = new CGSGNodeImage(0, 0, null);
				number.setImage(this.image);
				var p = this.getPositionOfCell(x, y);
				number.translateTo(p.x, p.y);
				this.board.addChildAt(number, this.board.children.length - 2);
			}
		},

		/**
		 *
		 * @param x
		 * @param y
		 * @return {Number} the number of holes around the position passed in parameter
		 */
		checkNbHoles : function(x, y) {
			var nbHole = 0;

			nbHole += this.getNbHoleAt(x - 1, y - 1);
			nbHole += this.getNbHoleAt(x, y - 1);
			nbHole += this.getNbHoleAt(x + 1, y - 1);
			nbHole += this.getNbHoleAt(x - 1, y);
			nbHole += this.getNbHoleAt(x + 1, y);
			nbHole += this.getNbHoleAt(x - 1, y + 1);
			nbHole += this.getNbHoleAt(x, y + 1);
			nbHole += this.getNbHoleAt(x + 1, y + 1);

			return nbHole;
		},

		/**
		 * return the number of hole in this cell (0 or 1)
		 * @param x
		 * @param y
		 * @return {Number}
		 */
		getNbHoleAt : function(x, y) {
			if (x < 0 || y < 0 || x >= this.nbCols || y >= this.nbLines) {
				return 0;
			}

			if (this.matrixBoard[x][y] == BOARD_ITEM.HOLE) {
				return 1;
			}
			return 0;
		},

		onKeyDown : function(event) {
			var keynum = (window.event) ? event.keyCode : event.which;

			if (!this.pingoo.isPlaying) {
				switch (keynum) {
					case 32 : //Space
						this.putFlag();
						break;
					case 37: //left
						this.moveLeft();
						break;
					case 38: //up
						this.moveUp();
						break;
					case 39: //right
						this.moveRight();
						break;
					case 40: //down
						this.moveDown();
						break;
				}
			}

			return keynum;
		},

		onKeyUp : function(event) {
			var keynum = (window.event) ? event.keyCode : event.which;

			return keynum;
		}
	}
);