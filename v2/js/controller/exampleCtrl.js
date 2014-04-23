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

			 if ($scope.example.addedCSS != "") {
				 loadCSSFile($scope.example.addedCSS);
			 }
			 else {
				 var a = [];
				 if ($scope.example.addedJS != "")
					 a.push("examples/" + $scope.example.link + "/js/" + $scope.example.addedJS);

				 a.push($scope.jsfile);
				 loadScript(a);
			 }
		 }

		 function loadCSSFile(url) {
			 var headID = document.getElementsByTagName("head")[0];
			 var cssNode = document.createElement('link');

			 cssNode.onload = _createDelegate(this, _onFileLoaded);

			 cssNode.type = 'text/css';
			 cssNode.rel = 'stylesheet';
			 cssNode.media = 'screen';
			 cssNode.href = url;
			 headID.appendChild(cssNode);
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

		 /**
		  * used to call delegate method when the css file is finally loaded
		  * @private
		  * @method _createDelegate
		  * @param objectContext
		  * @param delegateMethod
		  * @return {Function}
		  */
		 function _createDelegate(objectContext, delegateMethod) {
			 return function () {
				 return delegateMethod.call(objectContext);
			 }
		 }

		 /**
		  * fired when the css file is loaded.
		  * @private
		  * @method _onFileLoaded
		  * @param event {Event}
		  */
		 function _onFileLoaded(event) {
			 var a = [];
			 if ($scope.example.addedJS != "")
				 a.push("examples/" + $scope.example.link + "/js/" + $scope.example.addedJS);

			 a.push($scope.jsfile);
			 loadScript(a);
		 }
	 }
	]
);