app.controller(
	'exampleCtrl',
	['$scope',
	 '$http',
	 '$location',
	 'ExamplesSrv',
	 'require',
	 function($scope, $http, $location, examplesSrv, require) {

		 var target = examplesSrv.getURLParameter("e");
		 $scope.require = require;

		 examplesSrv.load($scope, $http, loadExample);

		 function loadExample() {
			 $scope.example = examplesSrv.find(target);

			 //dynamic loading of JS file for example
			 var file = "examples/" + $scope.example.link + "/js/class.main.js";
			 loadScript(file);
		 }

		 // Load the remote JS file.
		 function loadScript(file) {
			 $scope.require(
				 [ file ],
				 function() {
					 //todo: intialize scene
					 var canvasScene = document.getElementById("scene");
					 new CGMain(canvasScene);
				 }
			 );
		 }
	 }
	]
);