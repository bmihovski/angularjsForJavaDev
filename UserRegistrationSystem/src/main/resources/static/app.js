var app = angular.module('userregistrationsystem', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/list-all-users', {
		templateUrl: '/list_all_users/listuser.html',
		controller: 'ListDeleteUserController'
	})
	.when('/register-new-user', {
		templateUrl: '/userregistration/userregistration.html',
		controller: 'RegisterUserController'
	})
	.when('/update-user/:id', {
		templateUrl: '/template/userupdation.html',
		controller: 'usersDetailsController'
	})
	.otherwise({
		redirectTo: '/home',
		templateUrl: '/home/home.html'
	});

}]);