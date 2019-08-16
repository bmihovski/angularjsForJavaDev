app.factory('AuthInterceptor', [ function() {
	return {
		'request': function(config) {
			config.headers = config.headers || {};
			var encodedString = btoa("admin:user");
			config.headers.Authorization = 'Basic ' + encodedString;
			return config;
		}
	}
}]);