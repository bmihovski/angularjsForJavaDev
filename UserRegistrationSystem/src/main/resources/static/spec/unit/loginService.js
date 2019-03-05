describe('Given a service for authentication with autorization headers', function() {
	var httpBackend, loginFactory, location;
	var headers = { 'Authorization': 'Basic' };
	beforeEach(function() {
		module('userregistrationsystem');
		inject(function(_$httpBackend_, _loginFactory_, _$location_) {
			httpBackend = _$httpBackend_;
			loginFactory = _loginFactory_;
			location = _$location_;
			spyOn(location, 'path');
		})
	});

	it('When user try to authorize, then the request is successful', function() {
		var user = userRegDataBuilder().build();

		httpBackend.when('GET', 'user', { headers: headers }).respond(200, user);
		httpBackend.expectGET('user');
		loginFactory.auth(headers).then(function(d) {
		      expect(d.data).toEqual(user);
		  });

		httpBackend.flush();
	});

	it('When user try to authorize whith wrong cred, then the request is rejected', function() {
		httpBackend.when('GET', 'user', { headers: headers }).respond(404);
		httpBackend.expectGET('user');
		loginFactory.auth(headers).catch(function(data) {
			expect(data).toBe(undefined);
		});

		httpBackend.flush();
	});

});