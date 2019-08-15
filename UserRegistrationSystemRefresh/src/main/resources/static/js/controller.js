app.controller('RegistrationController', ['$scope', '$http',
	'$location', '$route', 'URI', function($scope, $http, $location, $route, URI) {
	$scope.submitUserForm = function() {
		$http({
			method: 'POST',
			url: URI,
			data: $scope.user
		}).then(function responce(response) {
			$location.path('/list-all-users');
			$route.reload();
		}, function(errResponse) {
			$scope.errorMessage = errResponse.data.errorMessage;
		});
	}
	
	$scope.resetForm = function() {
		$scope.user = null;
	};

}]);

app.controller('ListUserController', ['$scope', '$http', '$location', '$route', 'URI', function($scope, $http, $location, $route, URI) {
		$http({
			method: 'GET',
			url: URI
		}).then(function(response) {
			$scope.users = response.data;
		});
		
		$scope.editUser = function(userId) {
			$location.path("/update-user/" + userId);
		}
		
		$scope.deleteUser = function(userId) {
			$http({
				method: 'DELETE',
				url: URI + userId
			}).then(function(response) {
				$location.path("/list-all-users");
				$route.reload();
			});
		}
}]);

app.controller('UsersDetailsController', ['$scope', '$http', '$location', '$route', 'URI', '$routeParams', function ($scope, $http, $location, $route, URI, $routeParams) {
	$scope.userId = $routeParams.id;
	$http({
		method: 'GET',
		url: URI + $scope.userId
	}).then(function(response) {
		$scope.user = response.data;
	});
	
	$scope.submitUserForm = function() {
		$http({
			method: 'POST',
			uri: URI,
			data: $scope.user
		}).then(function(response) {
			$location.path("/list-all");
			$route.reload();
		}, function(errResponse) {
			$scope.errorResponse = 'Error while updating - Error message: ' +
				errResponse.data.errorMessage;
		});
	}
}]);