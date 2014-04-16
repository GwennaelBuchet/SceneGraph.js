app.controller('exampleCtrl', ['$scope', '$http', '$location', 'ExamplesSrv', function($scope, $http, $location, examplesSrv) {
	var searchObject = $location.search();

	examplesSrv.load($scope, $http, loadExample);

	function loadExample() {
		$scope.example = examplesSrv.find(searchObject.e);
	}

}]);