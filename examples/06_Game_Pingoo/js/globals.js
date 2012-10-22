/**
 * Created with JetBrains WebStorm.
 * @author Gwen
 * @project cgPingMine
 * @filename globals
 * @date 25/07/12
 * @time 12:54
 * @purpose
 *
 */
var pingmine_version = 1.0;

var PingmineLevel = {
	EASY       : {nbHoles : 15, nbObstacles : 0, maxNbFishes : 0, name : "Easy", desc : "Don't worry, you cannot lose...\n(you'd be the first one...)"},
	NORMAL     : {nbHoles : 30, nbObstacles : 1, maxNbFishes : 1, name : "Normal", desc : "Like in the true life."},
	HARD       : {nbHoles : 45, nbObstacles : 3, maxNbFishes : 2, name : "Hard", desc : "Just as easy as running up a 13 floors stair..."},
	IMPOSSIBLE : {nbHoles : 60, nbObstacles : 5, maxNbFishes : 3, name : "Impossible", desc : "Don't you want to win today ?"}
};

var currentLevel = PingmineLevel.EASY;

var sceneGraph = null;
var cellWidth = 34;
