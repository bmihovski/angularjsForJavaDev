app.controller('LoginController', ['loginFactory', '$scope',
	'$rootScope', '$location', function(loginFactory, $scope, $rootScope, $location) {
		$scope.credentials = {};
		$scope.loginUser = function() {
			var headers = $scope.credentials ? {
				authorization : "Basic "
						+ btoa($scope.credentials.username + ":"
								+ $scope.credentials.password)
			} : {};
			loginFactory.auth(headers)
			.then(function(response) {
				if (response.data.name) {
					$rootScope.authenticated = true;
				} else {
					$rootScope.authenticated = false;
				};
				if ($rootScope.authenticated) {
					$location.path('/');
					$scope.loginError = false;
				} else {
					$location.path('/login');
					$scope.loginError = true;
				}
			})
			.catch(function() {
				$rootScope.authenticated = false;
				$location.path('/login');
				$scope.loginError = false;
			});
		};

		$scope.resetForm = function() {
			$scope.credentials = null;
		}
}]);