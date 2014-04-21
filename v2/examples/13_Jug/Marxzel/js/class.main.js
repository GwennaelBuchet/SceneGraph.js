//this is how to create a class with cgSceneGraph.
//The main class need to inherit from CGSGView.
var CGMain = CGSGView.extend(
{
    /**
     * this id the constructor of our class
     * @param canvas : a handler to the canvas tag
     * */
    initialize : function (canvas) {
        // call the constructor of the parent
        this._super(canvas);
			
        //initialize our scene
        this.createScene();
		
        //tell the framework to start playing
        this.startPlaying();
    },

    /**
     * Just create 2 nodes: 
     *     1 empty node that will be our root node of the graph
     *     1 single square node as child of the root
     */
    createScene : function () {
    	//create a node that will be the root of our scene
        this.rootNode = new CGSGNode(0, 0);
        //add the node in the graph
        CGSG.sceneGraph.addNode(this.rootNode, null); //null means it has no parent

        //start by creating and adding a simple square node
        this.squareNode = new CGSGNodeSquare(60, 20, 200, 200); //x, y, w, h
        //set some attributes from the framework
        this.squareNode.isResizable = true;
        this.squareNode.isDraggable = true;
        
        //add the square as child of the root node
        this.rootNode.addChild(this.squareNode);
    }

});
