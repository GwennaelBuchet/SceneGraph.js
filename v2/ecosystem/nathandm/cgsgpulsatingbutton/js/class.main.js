var CGMain = CGSGView.extend(
    {
        initialize : function(canvas) {
            this._super(canvas);

            ////// INITIALIZATION /////////
            this.initializeCanvas();
            this.createScene();

            this.startPlaying();
        },

        initializeCanvas : function() {
            //redimensionnement du canvas pour être full viewport en largeur
            this.viewDimension = cgsgGetRealViewportDimension();
            this.setCanvasDimension(this.viewDimension);
        },

        /**
         * create a random scene with some nodes
         *
         */
        createScene : function() {

            //create and add a root node to the scene, with arbitrary dimension
            this.rootNode = new CGSGNode(0, 0);
            CGSG.sceneGraph.addNode(this.rootNode, null);

            //Build a pulsatingButton
            this.green= new CGSGPulsatingButton(30, 30, 30, null);
            this.green.isDraggable = true;
            this.green.isResizable = true;
            this.green.isClickable= true;
            this.green._hoveredColor = "green";

            this.yellow = new CGSGPulsatingButton(90, 30, 30, null);
            this.yellow._hoveredColor = "#FFFF00";

            this.red = new CGSGPulsatingButton(150, 30, 30, null);
            this.red._hoveredColor = "rgba(255,0,0,1)";

            this.rootNode.addChild(this.green);
            this.rootNode.addChild(this.yellow);
            this.rootNode.addChild(this.red);
        }
    }
);