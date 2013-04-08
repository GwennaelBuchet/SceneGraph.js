
var CGMain = CGSGView.extend(
	{
		initialize : function (canvas) {

			this._super(canvas);

			this.createScene();

			this.startPlaying();
		},

		/**
		 * Just create a single node (a square node)
		 *
		 */
		createScene : function () {
            this.rootNode = new CGSGNode(0, 0);

			this.squareNode = new CGSGNodeSquare(60, 20, 200, 200);
			this.squareNode.isResizable = true;
			this.squareNode.isDraggable = true;

			CGSG.sceneGraph.addNode(this.squareNode, null);
		}

	}
);
