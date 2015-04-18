var app = angular.module('dictionary', []);
app.controller('dictionaryController', function($scope, $http) {
	$scope.formData = {};
	$scope.date = new Date();
	$("title").html($scope.date);
	$scope.appData = '';
	$http.get('/api/atrb')
	.success(function(response) {
		$scope.appData = response;
	});
});