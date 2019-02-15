app.factory('listDeleteUserFactory', ['$http', '$q', 'API_URL', function($http, $q, API_URL) {
		var deferred = $q.defer();
		var listUsersRemote = function() {
			$http({
				method: 'GET',
				url: API_URL
			})
			.then(function(response) {
				deferred.resolve(response);
			});

			return deferred.promise;
		};
		var deleteUserRemote = function(userId) {
			$http({
				method: 'DELETE',
				url: API_URL + userId
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
		listUsers: listUsersRemote,
		deleteUser: deleteUserRemote
	};
}]);