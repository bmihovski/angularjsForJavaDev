app.controller('RegisterUserController', ['$scope', '$location', '$route', 'userRegistrationFactory',
	function($scope, $location, $route, userRegistrationFactory) {
	$scope.submitUserForm = function() {
		userRegistrationFactory.regUser($scope.user)
		.then(
		function() {
			$location.path('/list-all-users');
			$route.reload();
		})
		.catch(function(response) {
			$scope.errorMessage = response.data.errorMessage;
		});
	};
	$scope.resetForm = function() {
		$scope.user = null;
	};

}]);
