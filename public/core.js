var app = angular.module('sample_app', []);
function sampleController($scope, $http) {
	$http.get("http://localhost/api/sample").success(function(response) 
		alert(response.records);
		$scope.data = response.records;
	});
});