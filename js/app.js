var app = angular.module('cgsgApp', [/*'ngLoadScript'*/]);

app.controller('MainCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.project = {
		"name"           : "SceneGraph.js",
		"currentVersion" : "v2.1.0",
		"currentMaster"  : "v2.2.0-Snapshot",
		"github"         : "https://github.com/GwennaelBuchet/SceneGraph.js",
		"contact"        : {
			"firstName" : "Gwennaël",
			"lastName"  : "Buchet",
			"email"     : "gwennael.buchet@gmail.com"
		}
	};

	$scope.isActive = function(route) {
		var host = $location.protocol() + "://" + $location.host() + "/SceneGraph.js/";
		var url = $location.absUrl();
		return url.substr(host.length, url.length) == route;
	};
}]);


