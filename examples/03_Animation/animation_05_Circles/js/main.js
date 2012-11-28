var canvasScene = document.getElementById("scene");
var game = new CGSGScene(canvasScene);

//create a scene
createScene();

//start to play !
game.startPlaying();




/**
 * Create 'n' circles
 * @method createScene
 */
function createScene() {
    //create a square node : x, y, width, height
    var rootNode = new CGSGNodeSquare(0, 0, 20, 20);
    //add the square node as the root of the graph
    game.sceneGraph.addNode(rootNode, null);
    rootNode.isDraggable = true;

    for (var i = 0; i < 130; i++) {
        var circle = new CGSGNodeCircle(0, 0, 1);
        circle.isTraversable = false;
        circle.color = CGSGColor.rgb2hex(Math.random() * 255, Math.random() * 255, Math.random() * 255);
        rootNode.addChild(circle);

        resetCircle(circle);
    }

}

/**
 * set the position and animation of a circle
 * @method resetCircle
 * @param {CGSGNode} circle
 */
function resetCircle(circle) {
    circle.translateTo(Math.random() * cgsgCanvas.width, Math.random() * cgsgCanvas.height);

    //animate size and alpha
    var r = 20 + Math.random() * 30;
    var delay = 10 + Math.random() * 40;
    game.sceneGraph.animate(circle, "globalAlpha", delay, 1, 0, "linear", 0, true);
    game.sceneGraph.animate(circle, "scale.x", delay, 1.0, r, "linear", 0, true);
    game.sceneGraph.animate(circle, "scale.y", delay, 1.0, r, "linear", 0, true);

    //at the end of the animation, reset this node
    game.sceneGraph.getTimeline(circle, "globalAlpha").onAnimationEnd = function (event) {
        resetCircle(event.node);
    };
}