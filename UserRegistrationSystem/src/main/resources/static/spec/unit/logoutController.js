describe('Given logout controller to serve loggin out from the system', function() {
	var scope, rootScope, location, deferred, logoutFactory;
	beforeEach(function() {
		inject(function($controller, _$rootScope_, _$location_, _$q_, _logoutFactory_) {
			rootScope = _$rootScope_;
			scope = rootScope.$new();
			location = _$location_;
			deferred = _$q_.defer();
			logoutFactory = _logoutFactory_;

			spyOn(logoutFactory, 'logout').and.returnValue(deferred.promise);
			spyOn(location, 'path');

			$controller('LogoutController', {
				$scope: scope,
				$rootScope: rootScope,
				logoutFactory: LogoutFactory
			});

		});
	});

	it('', function() {

	});

});
