var CGMain = CGSGView.extend(
	{
		initialize : function (canvas) {

			this._super(canvas);

			////// INITIALIZATION /////////
			this.initializeCanvas();
			this.createScene();
			this.startPlaying();
		},

		/**
		 * Initialize canvas dimension to fit browser's viewport
		 */
		initializeCanvas : function () {
			//resize the canvas to fulfill the viewport
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},

		/**
		 *
		 *
		 */
		createScene : function () {

            //first create a root node with an arbitrary position
            this.rootNode = new CGSGNode(0, 0);
            CGSG.sceneGraph.addNode(this.rootNode, null);

			//X, Y, WIDTH, HEIGHT
			var square = new CGSGNodeSquare(20, 20, 10, 10);
			square.isDraggable = true;
			square.isResizable = true;
			square.lineWidth = 0;
			square.bkgcolors = [ CGSGColor.rgb2hex(255, 0, 0) ];
            this.rootNode.addChild(square);


			//todo : loop to construct a wall of colors (like the color selector from Photoshop)

		}
	}
);