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
		 var divParent = null;
		 var main = null;
		 var _currentDim = null;

		 function loadExample() {
			 $scope.example = examplesSrv.find(target);

			 //dynamic loading of JS file for example
			 $scope.jsfile = "examples/" + $scope.example.folder + "/js/" + ($scope.example.mainjs || "class.main.js");
			 $scope.indexfile = "examples/" + $scope.example.folder + "/index.html";
			 $scope.version = "js/sg/" + ($scope.example.version || "scenegraph_2.1.0-snapshot.min.js");

			 $scope.exwidth = $scope.example.width || 1170;
			 $scope.exheight = $scope.example.height || 480;
			 $scope.ratio = $scope.exwidth / $scope.exheight;

			 if ($scope.example.addedCSS !== undefined) {
				 loadCSSFile($scope.example.addedCSS);
			 }
			 else {
				 loadFwk($scope.version);
			 }
		 }

		 function loadFwk(version) {
			 $scope.require(
				 [ version ],
				 loadJSFiles
			 );
		 }

		 function loadJSFiles() {
			 var a = [];
			 if ($scope.example.addedJS !== undefined)
				 a.push("examples/" + $scope.example.folder + "/js/" + $scope.example.addedJS);

			 a.push($scope.jsfile);
			 loadScripts(a);
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
		 function loadScripts(files) {
			 $scope.require(
				 files/*[ file ]*/,
				 function() {
					 divParent = document.getElementById('divScene');

					 var canvasScene = document.getElementById("scene");
					 main = new CGMain(canvasScene);

					 //add an handler on the window resize event
					 //window.onresize = resizeCanvas;

					 initCanvas();
				 }
			 );
		 }

		 function initCanvas() {
			 divParent.height =
			 ($scope.example.height !== undefined) ?
			 $scope.example.height :
			 Math.max($scope.exheight, divParent.offsetWidth / $scope.ratio);

			 divParent.width = ($scope.example.width !== undefined) ? $scope.example.width : divParent.offsetWidth;

			 _currentDim = new CGSGDimension(divParent.width, divParent.height);

			 main.setCanvasDimension(_currentDim);
		 }

		 function resizeCanvas() {
			 divParent.height = divParent.offsetWidth / $scope.ratio;

			 _currentDim = new CGSGDimension(divParent.offsetWidth, divParent.height);

			 main.setCanvasDimension(_currentDim);

			 if (_currentDim.width < $scope.exwidth) {
				 var sw = _currentDim.width / $scope.exwidth;
				 var sh = _currentDim.height / $scope.exheight;

				 var displayRatio = new CGSGScale(sw, sh);
				 main.setDisplayRatio(displayRatio);
			 }
			 else {
				 main.setDisplayRatio(new CGSGScale(1, 1));
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
			 return function() {
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
			 loadFwk($scope.version);
		 }
	 }
	]
);