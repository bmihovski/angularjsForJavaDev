app.controller('ListDeleteUserController', ['$scope', '$http', '$location',
	'$route', 'listDeleteUserFactory', function($scope, $http, $location, $route, listDeleteUserFactory) {
		// call the service to retrieve users
//		listDeleteUserFactory.listUsers()
//		.then(function(response) {
//				$scope.users = response.data;
//		});
	$http({
	method: 'GET',
	url: 'http://localhost:8080/api/user/'
}).then(function(response) {
	$scope.users = response.data;
});
		// call the service to delete a user
		$scope.deleteUser = function(userId) {
			listDeleteUserFactory.deleteUser(userId)
				.then(function() {
					$location.path('/list-all-users');
					$route.reload();
				});
		};
		// call the service to edit user
		$scope.editUser = function(userId) {
		$location.path("/update-user/" + userId);
	};
}]);