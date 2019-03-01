app.factory('logoutFactory', ['$http', '$q', function($http, $q) {

	var logOutUser = function() {
		var deferred = $q.defer();

		$http({
			method: 'POST',
			url: 'logout',
			data: {}
		})
		.finally(function() {
			deferred.finally();
		});

		return deferred.promise;
	};

	return {
		logOut: logOutUser
	};
}]);