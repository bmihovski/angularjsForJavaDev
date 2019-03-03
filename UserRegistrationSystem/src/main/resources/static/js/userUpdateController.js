app.controller('UsersDetailsController', ['$scope', '$location', '$route', 'getUserAndEditFactory', '$routeParams',
	function($scope, $location, $route, getUserAndEditFactory, $routeParams) {
		$scope.userId = $routeParams.id;
		getUserAndEditFactory.getUser($scope.userId)
		.then(function(response) {
			$scope.userUpdate = response.data;
		});
		$scope.submitUserEditForm = function() {
			getUserAndEditFactory.editUser($scope.userUpdate)
			.then(function() {
				$location.path('/list-all-users');
				$route.reload();
			})
			.catch(function(errResponse) {
				$scope.errorMessageUpdate = 'Error while updating User - Error Message: ' +
					errResponse.data.errorMessage;
			});
		};
		$scope.resetForm = function() {
			$scope.userUpdate = null;
		};
}]);