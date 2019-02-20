app.factory('userRegistrationFactory', ['$http', '$q', 'API_URL', function($http, $q, API_URL) {
	var userRegistration = function(regData) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: API_URL,
			data: regData
		})
		.then(function() {
			deferred.resolve();
		})
		.catch(function(response) {
			deferred.reject(response);
		});

		return deferred.promise;
		};

	return {
		regUser: userRegistration
	};
}]);
