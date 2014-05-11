var main = null;

app.controller(
	'ecosystemCtrl',
	['$scope',
	 '$http',
	 '$location',
	 'EcosystemSrv',
	 'require',
	 function ($scope, $http, $location, examplesSrv, require) {

		 var target = examplesSrv.getURLParameter("e");
		 $scope.require = require;
		 $scope.jsfile = "";
		 $scope.indexfile = "";

		 examplesSrv.load($scope, $http, loadExample);
		 var divParent = null;
		 var canvasScene = null;

		 var _currentDim = null;

		 function loadExample() {
			 $scope.example = examplesSrv.find(target);

			 //dynamic loading of JS file for example
			 $scope.jsfile = "examples/" + $scope.example.folder + "/js/" + ($scope.example.mainjs || "class.main.js");
			 $scope.indexfile = "examples/" + $scope.example.folder + "/index.html";
			 $scope.version = "js/sg/" + ($scope.example.version || "scenegraph_2.1.0-snapshot.min.js");

			 var $details = $("#details");
			 $details.append($.parseHTML($scope.example.details));

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
			 if ($scope.example.addedJS !== undefined) {
				 for (var s = 0, len = $scope.example.addedJS.length; s < len; s++) {
					 a.push("examples/" + $scope.example.folder + "/js/" + $scope.example.addedJS[s]);
				 }
			 }

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
				 function () {
					 divParent = document.getElementById('divScene');
					 canvasScene = document.getElementById("scene");

					 if ($scope.example.height !== undefined || $scope.example.width !== undefined) {
						 setCanvasSize();
					 }

					 //start the sample
					 main = new CGMain(canvasScene);
					 //main.setCanvasDimension(new CGSGDimension(divParent.width, divParent.height));

					 //CGSG.cssManager.dontUseCSSFile("https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800");
					 //CGSG.cssManager.dontUseCSSFile("assets/plugins/bootstrap/css/bootstrap.min.css");
					 //CGSG.cssManager.dontUseCSSFile("assets/css/font-awesome.css");
					 //CGSG.cssManager.dontUseCSSFile("assets/css/essentials.css");
					 //CGSG.cssManager.dontUseCSSFile("assets/css/layout.css");
					 //CGSG.cssManager.dontUseCSSFile("assets/css/layout-responsive.css");
					 //CGSG.cssManager.dontUseCSSFile("assets/css/color_scheme/green.css");
				 }
			 );
		 }

		 function setCanvasSize() {
			 var w, h;
			 //h = $scope.exheight; //$scope.example.height !== undefined) ? $scope.example.height : $scope.exheight;
			 h =
			 ($scope.example.height !== undefined) ? $scope.example.height :
			 Math.max($scope.exheight, divParent.offsetWidth / $scope.ratio);

			 //w = $scope.exwidth;
			 w = ($scope.example.width !== undefined) ? $scope.example.width : divParent.offsetWidth;

			 divParent.style.height = h + 'px';
			 divParent.style.width = w + 'px';
			 divParent.height = h;
			 divParent.width = w;

			 canvasScene.style.height = h + 'px';
			 canvasScene.style.width = w + 'px';
			 canvasScene.height = h;
			 canvasScene.width = w;
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
			 loadFwk($scope.version);
		 }
	 }
	]
);