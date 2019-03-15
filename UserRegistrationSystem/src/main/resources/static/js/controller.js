
//app.controller('listUserController', ['$scope', '$http', '$location', '$route', function($scope, $http, $location, $route) {
//	$http({
//		method: 'GET',
//		url: 'http://localhost:8080/api/user/'
//	}).then(function(response) {
//		$scope.users = response.data;
//	});
//	$scope.editUser = function(userId) {
//		$location.path("/update-user/" + userId);
//	};
//	$scope.deleteUser = function(userId) {
//		$http({
//			method: 'DELETE',
//			url: 'http://localhost:8080/api/user/' + userId
//		}).then(function(response) {
//			$location.path('/list-all-users');
//			$route.reload();
//		});
//	};
//
//}]);

app.controller('usersDetailsController', ['$scope', '$http', '$location', '$route', '$routeParams', function($scope, $http, $location,
		$route, $routeParams) {
		$scope.userId = $routeParams.id

		$http({
			method: 'GET',
			url: 'http://localhost:8080/api/user/' + $scope.userId
		}).then(function(response) {
			$scope.user = response.data;
		});

		$scope.submitUserForm = function() {
			$http({
				method: 'POST',
				url: 'http://localhost:8080/api/user/',
				data: $scope.user
			})
			.then(function(response) {
				$location.path('/list-all-users');
				$route.reload();
			},
			function(errResponse) {
				$scope.errorMessage = 'Error while updating User - Error Message: ' +
					errResponse.data.error_detail;
			});
		};
		$scope.resetForm = function() {
			$scope.user = null;
		};
}]);