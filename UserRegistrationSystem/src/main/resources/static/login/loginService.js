app.factory('loginFactory', ['$http', '$q', function($http, $q) {
	var authenticate = function(headers) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			headers: headers,
			url: 'user'
		})
		.then(function(response) {
			deferred.resolve(response);
		})
		.catch(function() {
			deferred.reject();
		});
		return deferred.promise;
	};

	return {
		auth: authenticate
		};
}]);