app.controller(
	'exampleCtrl',
	['$scope',
	 '$http',
	 '$location',
	 'ExamplesSrv',
	 'require',
	 function ($scope, $http, $location, examplesSrv, require) {

		 var target = examplesSrv.getURLParameter("e");
		 $scope.require = require;

		 examplesSrv.load($scope, $http, loadExample);
		 var canvasElt = null;
		 var sample = null;
		 var _viewDimension = null;

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
				 function () {
					 canvasElt = document.getElementById('divScene');

					 //todo: intialize scene
					 var canvasScene = document.getElementById("scene");
					 sample = new CGMain(canvasScene);

					 //add an handler on the window resize event
					 window.onresize = resizeCanvas;

					 resizeCanvas();
				 }
			 );
		 }

		 function resizeCanvas() {
			 _viewDimension = new CGSGDimension(canvasElt.offsetWidth, canvasElt.offsetHeight);
			 sample.setCanvasDimension(_viewDimension);

			 var sw = _viewDimension.width / 1024;
			 var sh = _viewDimension.height / 480;

			 var displayRatio = new CGSGScale(sw, sh);
			 sample.setDisplayRatio(displayRatio);
		 }
	 }
	]
);