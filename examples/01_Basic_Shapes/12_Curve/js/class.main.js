var CGMain = CGSGView.extend({

	initialize : function(canvas) {
		this._super(canvas);
		this.initializeCanvas();
		this.createScene();
		this.startPlaying();
	},

	initializeCanvas : function() {
		this.viewDimension = cgsgGetRealViewportDimension();
		this.setCanvasDimension(this.viewDimension);
	},

	createScene : function() {

		var root = new CGSGNode(0, 0);
        CGSG.sceneGraph.addNode(root, null);

        var curve = new CGSGNodeCurveTCB(100, 100);
        curve.addKey(0,   50,  -1,  1, -1);
        curve.addKey(100, 0,   -1,  1, -1);
        curve.addKey(200, 0,   -1,  0, 1);
        curve.addKey(100, 100, -1,  0, 0);
        curve.addKey(300, 200, 1,  -1, 0);
        curve.compute();

        root.addChild(curve);
	}

});
