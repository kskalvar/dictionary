var app = angular.module('sampleApp', []);
app.controller('sampleCtrl', function($scope, $http) {
	$scope.formData = {};
	
	$http.get('/api/sample').success(function(response){
		$scope.sampleData = response;
	}).error(function(response) {
		alert("Error: " + response);
	});
	
	$scope.createSample = function() {
		$http.post('/api/sample', $scope.formData)
		.success(function(data){
			$scope.formData = {};
			$scope.sampleData = data;
			console.log(data);
		})
		.error(function(data) {
			console.error('Error: ' + data);
		});
	}
});