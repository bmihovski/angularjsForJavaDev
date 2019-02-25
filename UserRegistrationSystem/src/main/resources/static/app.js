var app = angular.module('userregistrationsystem', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/list-all-users', {
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
	.otherwise({
		redirectTo: '/home',
		templateUrl: '/home/home.html'
	});

}]);

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
}]);