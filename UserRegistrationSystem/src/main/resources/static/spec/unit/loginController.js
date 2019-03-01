describe('Given login controller', function() {
	var scope, deferred, rootScope, location, loginFactory, ctrl;
	beforeEach(function() {
		module('userregistrationsystem');
		inject(function($controller, _$rootScope_, _$q_, _$location_, _loginFactory_) {
			deferred = _$q_.defer();
			rootScope = _$rootScope_;
			scope = rootScope.$new();
			location = _$location_;
			loginFactory = _loginFactory_;
			spyOn(loginFactory, 'auth').and.returnValue(deferred.promise);
			spyOn(location, 'path');
			ctrl = $controller('LoginController', {
					$scope: scope,
					$rootScope: rootScope,
					loginFactory: loginFactory
			});
		});
	});
	it('When authenticate request is sent, then reset form function should be defined', function() {
		expect(scope.resetForm).toBeDefined();
		scope.resetForm();
		expect(scope.credentials).toBe(null);
	})
	it('When user is authenticated, then the login is successful', function() {
		var user = {data: userRegDataBuilder().build()};
		ctrl.headers = { 'Authorization': 'Basic' };
		scope.loginUser();
		expect(loginFactory.auth).toHaveBeenCalled();

		deferred.resolve(user);
		scope.$apply();
		expect(rootScope.authenticated).toEqual(true);

		expect(scope.loginError).toEqual(false);
	    expect(location.path).toHaveBeenCalledWith('/');

	});

	it('When user is not found, then the login is not successful', function() {
		var user = {data: {fake: 'test'}};
		// define controller local variable
		ctrl.headers = { 'Authorization': 'Basic' };
		scope.loginUser();

		expect(loginFactory.auth).toHaveBeenCalled();

		deferred.resolve(user);
		scope.$apply();

		expect(rootScope.authenticated).toEqual(false);

		expect(scope.loginError).toEqual(true);
		expect(location.path).toHaveBeenCalledWith('/login');

	});

	it('When user is not authenticated, then the login is not successful', function() {
		ctrl.headers = { 'Authorization': 'Basic' };
		scope.loginUser();

		expect(loginFactory.auth).toHaveBeenCalled();

		deferred.reject();
		scope.$apply();

		expect(rootScope.authenticated).toEqual(false);
		expect(location.path).toHaveBeenCalledWith('/login');
		expect(scope.loginError).toEqual(false);

	});

})