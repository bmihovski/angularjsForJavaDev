app.factory('getUserAndEdit', ['$http', 'API_URL', '$q', function($http, API_URL, $q) {
	var getUserDetails = function(userId) {
		var listUserDeferred = $q.defer();
		$http({
			method: 'GET',
			url: API_URL + userId
		})
		.then(function(response) {
			listUserDeferred.resolve(response);
		});
		return listUserDeferred.promise;
	};

	var editUserDetails = function(userData) {
		var editUserDeferred = $q.defer();
		$http({
			method: 'POST',
			url: API_URL,
			data: userData
		})
		.then(function() {
			editUserDeferred.resolve();
		})
		.catch(function(response) {
			editUserDeferred.reject(response);
		});
		return editUserDeferred.promise;
	};
	return {
		getUser: getUserDetails,
		editUser: editUserDetails
	}
}])