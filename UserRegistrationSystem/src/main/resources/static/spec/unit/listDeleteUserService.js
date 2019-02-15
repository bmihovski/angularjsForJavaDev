describe('Given a services for listing and deleting users', function() {
	var route, httpBackend, listDeleteUserFactory, API_URL, location;
	beforeEach(function() {
		module('userregistrationsystem');
		inject(function(_$httpBackend_, _$route_,
				_listDeleteUserFactory_, _API_URL_, _$location_) {
				httpBackend = _$httpBackend_;
				route = _$route_;
				location = _$location_;
				listDeleteUserFactory = _listDeleteUserFactory_;
				API_URL = _API_URL_;
				spyOn(route, 'reload');
				spyOn(location, 'path');
		});
	});
	it('When api is called then list of users is returned', function() {
		var user = [
			{
			id: 1,
	        name: "Boyan",
	        address: "Sofia, Mladost",
	        email: "mag@gmail.com",
	        errorMessage: null
			}
		];

		httpBackend.when('GET', API_URL).respond(200, user);
		httpBackend.expectGET(API_URL);
		listDeleteUserFactory.listUsers().then(function(d) {
		      expect(d.data).toEqual(user);
		  });

		httpBackend.flush();
		//expect(location.path).toBe('/home/');
		//expect(scope.results[0]).toEqual(testProduct);

	});

	it('When user is deleted then the action is completed ', function() {

		httpBackend.when('DELETE', API_URL).respond(204, true);
		listDeleteUserFactory.deleteUser('1').then(function(data) {
			expect(data).toBe(undefined);
		});
	});

	it('When unexisting user is deleted, then error message is returned', function() {
		var notExistingUserMsg = "Unable to delete! The user with id 1 not exit.";
		httpBackend.when('DELETE', API_URL).respond(404, notExistingUserMsg);
		listDeleteUserFactory.deleteUser('1').catch(function(data) {
			expect(data).not.toBe(undefined);
		});
	})
});