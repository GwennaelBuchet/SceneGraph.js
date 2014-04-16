/*app.controller('exampleCtrl', ['$scope', '$http', '$location', 'ExamplesSrv', function($scope, $http, $location, examplesSrv) {
	var searchObject = $location.search();

	examplesSrv.load($scope, $http, loadExample);

	function loadExample() {
		$scope.example = examplesSrv.find(searchObject.e);
	}

}]);*/

app.controller('exampleCtrl', ['$scope', '$http', '$location', 'ExamplesSrv', function($scope, $http, $location, examplesSrv) {
	var searchObject = $location.search();
	console.log(searchObject);
	examplesSrv.load($scope, $http, loadExample);

	function loadExample() {
		//$scope.example = $scope.examples[0];
		$scope.example = examplesSrv.find(searchObject.e);
	}

}]);