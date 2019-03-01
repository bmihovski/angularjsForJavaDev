app.controller('LogoutController', ['$scope', '$rootScope',
	'logoutFactory', '$location', function($scope, $rootScope, logoutFactory, $location) {
	
	logoutFactory.logOut()
		.finally(function() {
			$rootScope.authenticated = false;
			$location.path('/');
		});
}]);