var app = angular.module('userregistrationsystem', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/home/home.html',
		controller: 'HomeController'
	})
	.when('/list-all-users', {
		templateUrl: '/list_all_users/listuser.html',
		controller: 'ListDeleteUserController'
	})
	.when('/register-new-user', {
		templateUrl: '/user_registration/userregistration.html',
		controller: 'RegisterUserController'
	})
	.when('/update-user/:id', {
		templateUrl: '/user_update/userupdation.html',
		controller: 'UsersDetailsController'
	})
	.when('/login', {
		templateUrl: '/login/login.html',
		controller: 'LoginController'
	})
	.when('/logout', {
		templateUrl: '/login/login.html',
		controller: 'LogoutController'
	})
	.otherwise({
		redirectTo: '/login'
	});

}]);

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
}]);


