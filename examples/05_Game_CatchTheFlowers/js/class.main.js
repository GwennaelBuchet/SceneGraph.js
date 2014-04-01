/**
 * Copyright (c) 2014 Gwennael Buchet
 *
 * License/Terms of Use
 *
 * Permission is hereby granted, free of charge and for the term of intellectual property rights on the Software, to any
 * person obtaining a copy of this software and associated documentation files (the "Software"), to use, copy, modify
 * and propagate free of charge, anywhere in the world, all or part of the Software subject to the following mandatory conditions:
 *
 *   •    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 *  Any failure to comply with the above shall automatically terminate the license and be construed as a breach of these
 *  Terms of Use causing significant harm to Gwennael Buchet.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  Except as contained in this notice, the name of Gwennael Buchet shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Gwennael Buchet.
 *
 *  These Terms of Use are subject to French law.
 *
 * @author Gwennael Buchet (gwennael.buchet@gmail.com)
 * @date 10/08/2012
 *
 * Purpose :
 * Template project
 * */

/**
 * The different states of the games
 * @type {Object}
 */
var GAME_STATE = {
	LOADING : { instance: null },
	HOME    : { instance: null },
	ABOUT   : { instance: null },
	PLAY_RUN: { instance: null }
};

var CGMain = CGSGScene.extend(
	{
		initialize: function (canvas) {

			this._super(canvas);

			this.gameState = GAME_STATE.LOADING;

			sceneGraph = this.sceneGraph;
			this.createScene();

			//keyboard events handler
			var scope = this;
			document.onkeydown = function (event) {
				scope.onKeyDown(event);
			};
			document.onkeyup = function (event) {
				scope.onKeyUp(event);
			};

			this.onRenderStart = scope.onRenderStartHandler;

			this.startPlaying();
		},

		/**
		 * Just create a single node (a square node)
		 *
		 */
		createScene: function () {
			this.rootNode = new CGSGNode(0, 0, 1, 1);
			this.sceneGraph.addNode(this.rootNode);

			GAME_STATE.LOADING.instance = new StateLoading(this.context);
			GAME_STATE.HOME.instance = new StateHome(this.context, this);
			GAME_STATE.PLAY_RUN.instance = new StateGameRun(this.context, this);
			GAME_STATE.ABOUT.instance = new StateAbout(this.context, this);

			this.changeGameState(GAME_STATE.LOADING);

			//now, load the image containing the sprite sheet.
			//The affectation to the sprite will be done in the loaded handler function
			this.spriteSheet = new Image();
			var that = this;
			this.spriteSheet.onload = that.onItemsImageLoaded();
			this.spriteSheet.src = "js/img/bee.png";
		},

		/**
		 * once the image is loaded, set it to the sprites
		 */
		onItemsImageLoaded: function () {
			GAME_STATE.ABOUT.instance.setImage(this.spriteSheet);
			GAME_STATE.PLAY_RUN.instance.setImage(this.spriteSheet);

			this.changeGameState(GAME_STATE.HOME);
		},

		/**
		 *
		 * @param newState
		 */
		changeGameState: function (newState) {
			this.rootNode.detachChild(this.gameState.instance.rootNode);

			this.gameState = newState;
			this.rootNode.addChild(this.gameState.instance.rootNode);
			this.gameState.instance.run();
		},

		onRenderStartHandler: function () {
			this.gameState.instance.onRenderStartHandler();
		},

		onKeyDown: function (event) {
			this.gameState.instance.onKeyDown(event);
			//call the parent handler
			return this.onKeyDownHandler(event);
		},

		onKeyUp: function (event) {
			this.gameState.instance.onKeyUp(event);
			//call the parent handler
			this.onKeyUpHandler(event);
		}

	}
);
