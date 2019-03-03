app.controller('HomeController', ['$rootScope', '$scope',
	'$location', function($rootScope, $scope, $location) {
		if ($rootScope.authenticated) {
			$location.path('/');
			$scope.loginError = false;
		} else {
			$location.path('/login');
			$scope.loginError = true;
		};
}]);