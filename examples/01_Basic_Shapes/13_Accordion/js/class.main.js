/**
 * This class represents the main class.
 *
 * @author $Author$
 */
var CGMain = CGSGView.extend(
    {
        initialize: function (canvas) {

            this._super(canvas);

            ////// INITIALIZATION /////////
            this.initializeCanvas();
            this.createScene();
            this.startPlaying();
        },

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

            //simple accordion
            var accordion = new CGSGAccordion(0, 0 ,50, 500, 265, 40);

            //the contents of the sections
            var squareChildBlue = new CGSGNodeSquare(0, 0, 250, 100);
            squareChildBlue.color = "blue";

            var squareChildRed = new CGSGNodeSquare(0, 0, 250, 300);
            squareChildRed.color = "red";

            var squareChildGreen = new CGSGNodeSquare(0, 0, 250, 200);
            squareChildGreen.color = "green";

            var squareChildYellow = new CGSGNodeSquare(0, 0, 250, 200);
            squareChildYellow.color = "yellow";

            //add the content
            accordion.buildAndAddSection("Section 1", squareChildBlue);
            accordion.buildAndAddSection("Section 2" , squareChildYellow);
            accordion.buildAndAddSection("Section 3", squareChildRed);
            accordion.buildAndAddSection("Section 4", squareChildGreen);

            var section = accordion.buildAndAddSection("Section 5", squareChildBlue);
            section.setBackgroundColor("blue");

            section = accordion.buildAndAddSection("Section 6", squareChildRed);
            section.setBackgroundColor("cyan");

            section = accordion.buildAndAddSection("Section 7", squareChildGreen);
            section.setBackgroundColor("pink");
            //Custom Custom section

            this.rootNode.addChild(accordion);

        }
    }
);