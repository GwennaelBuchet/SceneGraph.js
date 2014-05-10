var app = angular.module('cgsgApp', [/*'ngLoadScript'*/]);

app.controller('MainCtrl', ['$scope', function ($scope) {
	$scope.project = {
		"name":"SceneGraph.js",
		"currentVersion": "v2.1.0",
		"github":"https://github.com/GwennaelBuchet/cgSceneGraph",
		"contact":{
			"firstName":"Gwennaël",
			"lastName":"Buchet",
			"email":"gwennael.buchet@gmail.com"
		}
	};
}]);


