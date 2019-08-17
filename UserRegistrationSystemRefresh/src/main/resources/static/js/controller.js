app.controller('RegistrationController', ['$scope', '$http',
	'$location', '$route', 'URI', function($scope, $http, $location, $route, URI) {
	$scope.submitUserForm = function() {
		$http({
			method: 'POST',
			url: URI,
			data: $scope.user
		}).then(function responce(response) {
			$location.path('/list-all-users');
			$route.reload();
		}, function(errResponse) {
			$scope.errorMessage = errResponse.data.errorMessage;
		});
	}
	
	$scope.resetForm = function() {
		$scope.user = null;
	};

}]);

app.controller('ListUserController', ['$scope', '$http', '$location', '$route', 'URI', function($scope, $http, $location, $route, URI) {
		$http({
			method: 'GET',
			url: URI
		}).then(function(response) {
			$scope.users = response.data;
		});
		
		$scope.editUser = function(userId) {
			$location.path("/update-user/" + userId);
		}
		
		$scope.deleteUser = function(userId) {
			$http({
				method: 'DELETE',
				url: URI + userId
			}).then(function(response) {
				$location.path("/list-all-users");
				$route.reload();
			});
		}
}]);

app.controller('UsersDetailsController', ['$scope', '$http', '$location', '$route', 'URI', '$routeParams', function ($scope, $http, $location, $route, URI, $routeParams) {
	$scope.userId = $routeParams.id;
	$http({
		method: 'GET',
		url: URI + $scope.userId
	}).then(function(response) {
		$scope.user = response.data;
	});
	
	$scope.submitUserForm = function() {
		$http({
			method: 'POST',
			uri: URI,
			data: $scope.user
		}).then(function(response) {
			$location.path("/list-all");
			$route.reload();
		}, function(errResponse) {
			$scope.errorResponse = 'Error while updating - Error message: ' +
				errResponse.data.errorMessage;
		});
	}
}]);

app.controller('HomeController', function($rootScope, $scope,
		$http, $location, $route){
		if ($rootScope.authenticated) {
		$location.path("/");
		$scope.loginerror = false;
		} else {
		$location.path("/login");
		$scope.loginerror = true;
		}
		});

app.controller('LoginController', function($rootScope, $scope,
		$http, $location, $route){
		$scope.credentials = {};
		$scope.resetForm = function() {
		$scope.credentials = null;
		}
		var authenticate = function(credentials, callback) {
			var headers = $scope.credentials ? {
			authorization : "Basic "
			+ btoa($scope.credentials.username + ":"
			+ $scope.credentials.password)
			} : {};
			$http.get('user', {
			headers : headers
			}).then(function(response) {
			if (response.data.name) {
			$rootScope.authenticated = true;
			} else {
			$rootScope.authenticated = false;
			}
			callback && callback();
			}, function() {
			$rootScope.authenticated = false;
			callback && callback();
			});
			}
		authenticate();
		$scope.loginUser = function() {
		authenticate($scope.credentials, function() {
		if ($rootScope.authenticated) {
		$location.path("/");
		$scope.loginerror = false;
		} else {
		$location.path("/login");
		$scope.loginerror = true;
		}
		});
		};
		});

app.controller('LogoutController', function($rootScope, $scope,
		$http, $location, $route){
		$http.post('logout', {}).finally(function() {
		$rootScope.authenticated = false;
		$location.path("/");
		});
		});