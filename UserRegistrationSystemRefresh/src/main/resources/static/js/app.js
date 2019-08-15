var app = angular.module('userregistrationsystem', ['ngRoute', 'ngResource']);

app.constant('URI', 'http://localhost:8080/api/user/');

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/list-all-users', {
		templateUrl: '/template/listuser.html',
		controller: 'ListUserController'
	}).when('/register-new-user', {
		templateUrl: '/template/userregistration.html',
		controller: 'RegistrationController'
	}).when('/update-user/:id', {
		templateUrl: '/template/userupdate.html',
		controller: 'UsersDetailsController'
	}).otherwise({
		templateUrl: '/template/home.html',
		redirectTo: '/home'
	})
}]);