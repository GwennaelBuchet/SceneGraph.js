app.controller('ecosystemCtrl', ['$scope', '$http', 'EcosystemSrv', function($scope, $http, ecosystemSrv) {

	$scope.extensions = [];
	$scope.demos = [];

	ecosystemSrv.load($scope, $http, filterData);

	function filterData() {
		var i, len = $scope.allExts.length, item, c;
		for (i = 0 ; i < len ; i++) {
			item = $scope.allExts[i];
			c = $.parseHTML(item.comment);
			//item.comment = c;
			if (item.type === "extension") {
				$scope.extensions.push(item);
			}
			else { //if (item.type === "demo") {
				$scope.demos.push(item);
			}
		}
	}
}]);