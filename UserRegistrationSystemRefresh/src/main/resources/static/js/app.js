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
	}).when('/', {
		templateUrl: '/template/home.html',
		controller: 'HomeController'
	}).when('/login', {
		templateUrl: '/login/login.html',
		controller: 'LoginController'
	}).when('/logout', {
		templateUrl: '/login/login.html',
		controller: 'LogoutController'
	}).otherwise({
		redirectTo: '/login'
	});
}]);

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
	}]);