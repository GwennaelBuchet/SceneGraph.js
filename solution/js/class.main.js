var CGMain = CGSGView.extend(
    {
        initialize: function (canvas) {

            this._super(canvas);

            ////// INITIALIZATION /////////
            this.initializeCanvas();
            this.createScene();
            this.startPlaying();
        },

        /**
         * Initialize canvas dimension to fit browser's viewport
         */
        initializeCanvas: function () {
            //resize the canvas to fulfill the viewport
            this.viewDimension = cgsgGetRealViewportDimension();
            this.setCanvasDimension(this.viewDimension);
        },

        /**
         *
         *
         */
        createScene: function () {

            //first create a root node with an arbitrary position
            this.rootNode = new CGSGNode(0, 0);
            CGSG.sceneGraph.addNode(this.rootNode, null);

            var W = 10, H = 10;
            var startX = 20, startY = 20;

            var NB_COLS = 70;
            var NB_ROWS = 25;

            var state = 1;
            var intensity = 1;
            var R = 255, G = 0, B = 0;
            var step = 255 / (NB_COLS / 6);


            //X, Y, WIDTH, HEIGHT
            for (var col = 0; col < NB_COLS; col++) {

                if (state === 1) {
                    G += step;
                    if (G >= 255) state++;
                }
                else if (state === 2) {
                    R -= step;
                    if (R <= 0) state++;
                }
                else if (state === 3) {
                    B += step;
                    if (B >= 255) state++;
                }
                else if (state === 4) {
                    G -= step;
                    if (G <= 0) state++;
                }
                else if (state === 5) {
                    R += step;
                    if (R >= 255) state++;
                }
                else if (state === 6) {
                    B -= step;
                    if (B <= 0) state++;
                }

                for (var row = 0; row < NB_ROWS; row++) {
                    intensity = 1 - row / NB_ROWS;

                    var square = new CGSGNodeSquare(startX + col * W, startY + row * H, W, H);
                    square.isDraggable = true;
                    square.isResizable = true;
                    square.lineWidth = 0;
                    square.bkgcolors = [CGSGColor.rgb2hex(R * intensity, G * intensity, B * intensity)];
                    this.rootNode.addChild(square);
                }


            }

        }
    }
);