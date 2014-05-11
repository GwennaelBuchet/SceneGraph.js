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

            var i,
                itemSize = 40,
                padding = 5,
                column = 11,
                core = new CGSGNodeSquare(0, 0, 500, 500),
                item;

            //create and add a root node to the scene, with arbitrary dimension
            this.rootNode = new CGSGNode(0, 0);
            CGSG.sceneGraph.addNode(this.rootNode, null);

            //Build hte scrollPane
            this.viewport = new CGSGNodeScrollPane(15, 15, 200, 200);


            //Create a content for the ScrollPane
            core.color = "yellow";
            for (i = 0; i < 121; i++) {
                item = new CGSGNodeSquare(Math.floor(i % column) * (itemSize + padding) + padding,
                                            Math.floor(i / column) * (itemSize + padding) + padding, itemSize, itemSize);

                core.addChild(item);
            }

            //add the content to the viewPort of the scrollPane
            this.viewport.addToViewPort(core);
            this.rootNode.addChild(this.viewport);

            //The ScrollPane manage the resize
            this.viewport.isDraggable = true;
            this.viewport.isResizable = true;

            this.viewport._viewport.isTraversable = true;
            this.viewport.contained.isTraversable = false;
        }
    }
);