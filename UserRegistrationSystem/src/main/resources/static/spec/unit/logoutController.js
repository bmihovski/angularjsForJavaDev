describe('Given logout controller to serve loggin out from the system', function() {
	var scope, rootScope, location, deferred, logoutFactory;
	beforeEach(function() {
		module('userregistrationsystem');
		inject(function($controller, _$rootScope_, _$location_, _$q_, _logoutFactory_) {
			rootScope = _$rootScope_;
			scope = rootScope.$new();
			location = _$location_;
			deferred = _$q_.defer();
			logoutFactory = _logoutFactory_;
			
			expect(logoutFactory.logOut).toBeDefined();
			
			spyOn(logoutFactory, 'logOut').and.returnValue(deferred.promise);
			spyOn(location, 'path');

			$controller('LogoutController', {
				$scope: scope,
				$rootScope: rootScope,
				logoutFactory: logoutFactory
			});

		});
	});

	it('When user logout from the system, Then the user is logged out', function() {
		logoutFactory.logOut();
		
		deferred.resolve();
		
		scope.$apply();
		
		expect(scope.authenticated).toEqual(false);
		expect(location.path).toHaveBeenCalledWith('/');
		
	});

});
