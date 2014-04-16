app.controller('examplesCtrl', ['$scope', '$http', 'ExamplesSrv', function($scope, $http, examplesSrv) {
	examplesSrv.load($scope, $http, null);
}]);