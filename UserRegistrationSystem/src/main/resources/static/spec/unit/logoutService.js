describe('Given logout service to logout user from the server', function() {
	var scope, rootScope, httpBackend, logoutFactory, location;
	beforeEach(function() {
		module('userregistrationsystem');
		inject(function(_$httpBackend_, _logoutFactory_, _$location_, _$rootScope_) {
			rootScope = _$rootScope_;
			scope = rootScope.$new();
			location = _$location_;
			logoutFactory = _logoutFactory_;
			httpBackend = _$httpBackend_;

			expect(logoutFactory.logOut).toBeDefined();

			spyOn(location, 'path');

		})

	});

	it('When user try to logout, Then user is logged out successfully', function() {
		httpBackend('POST', 'logout', {}).respond(200, true);
		httpBackendExpectPOST('logout');

		logoutFactory.logOut().finally(function(data) {
			expect(data).toBe(undefined);
		});

		httpBackend.flush();
	});
});