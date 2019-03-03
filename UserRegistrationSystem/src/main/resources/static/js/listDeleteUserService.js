app.factory('listDeleteUserFactory', ['$http', '$q', 'API_URL', function($http, $q, API_URL) {

		var listUsersRemote = function() {
			var listDeferred = $q.defer();
			$http({
				method: 'GET',
				url: API_URL
			})
			.then(function(response) {
				listDeferred.resolve(response);
			});

			return listDeferred.promise;
		};
		var deleteUserRemote = function(userId) {
			var deleteDeferred = $q.defer();
			$http({
				method: 'DELETE',
				url: API_URL + userId
			})
			.then(function() {
				deleteDeferred.resolve();
			})
			.catch(function(response) {
				deleteDeferred.reject(response);
			});

			return deleteDeferred.promise;
		};
	return {
		listUsers: listUsersRemote,
		deleteUser: deleteUserRemote
	};
}]);