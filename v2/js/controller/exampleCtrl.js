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
		 $scope.jsfile = "";
		 $scope.indexfile = "";

		 examplesSrv.load($scope, $http, loadExample);
		 var canvasElt = null;
		 var sample = null;
		 var _currentDim = null;

		 function loadExample() {
			 $scope.example = examplesSrv.find(target);

			 //dynamic loading of JS file for example
			 $scope.jsfile = "examples/" + $scope.example.link + "/js/class.main.js";
			 $scope.indexfile = "examples/" + $scope.example.link + "/index.html";
			 var a = [];
			 //todo: au lieu de charer via requiresj, charger via JS standard
			 if ($scope.example.files != "")
				 a.push($scope.example.files);
			 a.push($scope.jsfile);
			 loadScript(a);
		 }

		 // Load the remote JS file.
		 function loadScript(files) {
			 $scope.require(
				 files/*[ file ]*/,
				 function() {
					 canvasElt = document.getElementById('divScene');

					 var canvasScene = document.getElementById("scene");
					 sample = new CGMain(canvasScene);

					 initCanvas();

					 //add an handler on the window resize event
					 window.onresize = resizeCanvas;
				 }
			 );
		 }

		 function initCanvas() {
			 _currentDim = new CGSGDimension(canvasElt.offsetWidth, canvasElt.offsetHeight);
			 sample.setCanvasDimension(_currentDim);
		 }

		 function resizeCanvas() {
			 _currentDim = new CGSGDimension(canvasElt.offsetWidth, canvasElt.offsetHeight);
			 if (_currentDim.width < 1170) {
				 _currentDim.height = _currentDim.width / 2.4375;

				 sample.setCanvasDimension(_currentDim);

				 var sw = _currentDim.width / 1024;
				 var sh = _currentDim.height / 480;

				 var displayRatio = new CGSGScale(sw, sh);
				 sample.setDisplayRatio(displayRatio);
			 }
		 }
	 }
	]
);