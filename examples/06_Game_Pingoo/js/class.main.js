/**
 * The different states of the games
 * @class GAME_STATE
 * @type {Object}
 */
var GAME_STATE = {
	LOADING: { instance: null },
	HOME   : { instance: null },
	PLAY   : { instance: null }
};

var CGMain = CGSGScene.extend(
	{
		initialize: function (canvas) {

			this._super(canvas);

			this.gameState = GAME_STATE.LOADING;

			sceneGraph = CGSG.sceneGraph;

			//create the different items of the game
			this.createScene();

			//keyboard events handler
			var scope = this;
			document.onkeydown = function (event) {
				scope.onKeyDown(event);
			};
			document.onkeyup = function (event) {
				scope.onKeyUp(event);
			};

			//ask the CGSGScene to start the rendering loop
			this.startPlaying();
		},

		/**
		 * Initialize the states of the game and start loading image
		 * create the background, the character and the items (holes, numbers and fish)
		 * @method createScene
		 */
		createScene: function () {
			//create a root node to the graph, with an arbitrary position and size
			this.rootNode = new CGSGNode(0, 0, 1, 1);
			CGSG.sceneGraph.addNode(this.rootNode);

			//first, initialize the LOADING state and switch to it
			GAME_STATE.LOADING.instance = new StateLoading(this.context);
			this.changeGameState(GAME_STATE.LOADING);

			//then initialize the other states
			GAME_STATE.HOME.instance = new StateHome(this.context, this);
			GAME_STATE.PLAY.instance = new StateGameRun(this.context);

			//now, load the image (a JavaScript Object) containing the sprite sheet.
			//The affectation to the sprite will be done in the loaded handler function
			this.spriteSheet = new Image();
			var that = this;
			this.spriteSheet.onload = that.onItemsImageLoaded();
			this.spriteSheet.src = "images/ss_board.png";
		},

		/**
		 * Once the image is loaded, set it to the sprites
		 * @method onItemsImageLoaded
		 */
		onItemsImageLoaded: function () {
			//set the image to all states that need it.
			GAME_STATE.PLAY.instance.setImage(this.spriteSheet);

			//when all images are loaded (just one here), we can switch from the LOADING state to the HOME state
			this.changeGameState(GAME_STATE.HOME);
		},

		/**
		 * Switch to the new state
		 * @method changeGameState
		 * @param newState
		 */
		changeGameState: function (newState) {
			//stop and detach the current state from the graph
			this.gameState.instance.stop();
			this.rootNode.detachChild(this.gameState.instance.rootNode);

			this.gameState = newState;
			//add selected state to the graph
			this.rootNode.addChild(this.gameState.instance.rootNode);
			//run the state
			this.gameState.instance.start();
		},

		/**
		 * @method onKeyDown
		 * @param event
		 * @return {*}
		 */
		onKeyDown: function (event) {
			this.gameState.instance.onKeyDown(event);
			//call the parent handler
			return this.onKeyDownHandler(event);
		},

		/**
		 * @method onKeyUp
		 * @param event
		 * @return {*}
		 */
		onKeyUp: function (event) {
			this.gameState.instance.onKeyUp(event);
			//call the parent handler
			return this.onKeyUpHandler(event);
		}

	}
);
