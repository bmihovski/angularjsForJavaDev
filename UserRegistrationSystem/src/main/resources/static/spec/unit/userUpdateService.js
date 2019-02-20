describe('Given user which will be edited', function() {
	var route, httpBackend, getUserAndEditFactory, API_URL, errorMessage, location;
	var user = userRegDataBuilder().build();
	beforeEach(function() {
		module('userregistrationsystem');
		inject(function (_getUserAndEditFactory_, _API_URL_, _$httpBackend_, _$route_, _$location_) {
			httpBackend = _$httpBackend_;
			getUserAndEditFactory = _getUserAndEditFactory_;
			API_URL = _API_URL_;
			route = _$route_;
			location = _$location_;
			spyOn(route, 'reload');
			spyOn(location, 'path');
		});

	});

	it('When user is selected to edit, then user details are displayed', function() {
		httpBackend.when('GET', API_URL + user.id).respond(200, user);
		httpBackend.expectGET(API_URL + user.id);
		getUserAndEditFactory.getUser(user.id).then(function(d) {
			expect(d.data).toEqual(user);
		});
		httpBackend.flush();
	});

	it('When user details are changed, then the data is sent to server', function() {
		httpBackend.when('PUT', API_URL + user.id, user)
		.respond(200, true);
		httpBackend.expectPUT(API_URL + user.id, user);
		getUserAndEditFactory.editUser(user).then(function(data) {
			expect(data).toBe(undefined);
		});
		httpBackend.flush();
	});
	it('When user details are wrong, then a message from backend is return', function() {
		errorMessage = userRegDataBuilder().withErrorMessage("ERROR").build();
		httpBackend.when('PUT', API_URL + user.id, user)
		.respond(400, errorMessage);
		httpBackend.expectPUT(API_URL + user.id, user);
		getUserAndEditFactory.editUser(user).then(function(data) {
			expect(data).toBe(undefined);
		})
		.catch(function(d) {
			expect(d.data).toEqual(errorMessage);
		});
		httpBackend.flush();
	})

});