var app = angular.module('dictionary', []);
app.controller('dictionaryController', function($scope, $http) {
	$scope.formData = {};
	$scope.name = "";
	$scope.comment = "";
	$scope.date = new Date();
	$scope.deleteRecord = function(id) {
		$http.delete('/api/atrb/' + id)
		.success(function(response) {
			$scope.appData = response;
		});
	}
	$scope.insertRecord = function() {
		$scope.date = new Date();
		$http.post('api/atrb/', {name:$scope.name, comment: $scope.comment, date: $scope.date})
		.success(function(response) {
			console.log($scope.name)
			$scope.formData = {}
			$scope.appData = response;	
			//console.log(response);	
		});
	}
	$("title").html($scope.date);
	$scope.appData = '';
	$http.get('/api/atrb/')
	.success(function(response) {
		$scope.appData = response;
	});
});
