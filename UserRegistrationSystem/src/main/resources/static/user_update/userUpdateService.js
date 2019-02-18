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

	var editUserDetails = function() {};
	return {
		getUser: getUserDetails,
		editUser: editUserDetails
	}
}])