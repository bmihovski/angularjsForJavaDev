describe('Given home page controller which redirecting the user in case authorization', function() {
	var rootScope, scope, location;
	beforeEach(function() {
		module('userregistrationsystem');
		inject(function($controller, _$rootScope_, _$location_, _$route_) {
			scope = _$rootScope_.$new();
			location = _$location_;
			rootScope = _$rootScope_;
		    spyOn(location, 'path');

		    $controller('HomeController', {
		    	$scope: scope,
		    	$rootScope: rootScope
		    });
		});

	});
	it('When the user is authorizated, then is redirected to / route', function() {
		rootScope.authenticated = true;
		console.log(scope.loginError);
		expect(location.path).toHaveBeenCalledWith('/');
		expect(scope.loginError).toEqual(false);
	});

	it('When the user is not authorizated, then is redirected to / route', function() {
		rootScope.authenticated = false;
		expect(location.path).toHaveBeenCalledWith('/login');
		expect(scope.loginError).toEqual(true);
	});
});