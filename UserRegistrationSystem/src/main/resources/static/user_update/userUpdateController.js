app.controller('UsersDetailsController', ['$scope', '$location', '$route', 'getUserAndEditFactory', '$routeParams',
	function($scope, $location, $route, getUserAndEditFactory, $routeParams) {
		$scope.userId = $routeParams.id;
		getUserAndEditFactory.getUser($scope.userId)
		.then(function(response) {
			$scope.user = response.data;
		});
		$scope.submitUserForm = function() {
			getUserAndEditFactory.editUser($scope.user)
			.then(function() {
				$location.path('/list-all-users');
				$route.reload();
			})
			.catch(function(errResponse) {
				$scope.errorMessage = 'Error while updating User - Error Message: ' +
					errResponse.data.errorMessage;
			});
		};
		$scope.resetForm = function() {
			$scope.user = null;
		};
}]);