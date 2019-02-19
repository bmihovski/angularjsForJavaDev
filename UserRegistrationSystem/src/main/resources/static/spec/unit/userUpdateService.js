describe('Given user which will be edited', function() {
	var route, httpBackend, getUserAndEditFactory, API_URL, location, errorMessage;
	var user = [
		{
		id: 1,
        name: "Boyan",
        address: "Sofia, Mladost",
        email: "mag@gmail.com",
        errorMessage: null
		}
	];
	beforeEach(function() {
		module('userregistrationsystem');
		inject(function ($controller, _$route_, _getUserAndEditFactory_, _API_URL_, _$location_, _$httpBackend_) {
			route = _$route_;
			getUserAndEditFactory = _getUserAndEditFactory_;
			API_URL = _API_URL_;
			location = _$location_;
			httpBackend = _$httpBackend_;
			//spyOn(route, 'reload');
		});

	});
	it('When user is selected to edit, then user details are displayed', function() {
		httpBackend.when('GET', API_URL + user[0].id).respond(200, user);
		httpBackend.expectGET(API_URL + user[0].id);
		getUserAndEditFactory.getUser(user[0].id).then(function(d) {
			expect(d.data).toEqual(user);
		});
		httpBackend.flush();
	});

	it('When user details are changed, then the data is sent to server', function() {
		httpBackend.when('PUT', API_URL + user[0].id, user)
		.respond(200, true);
		httpBackend.expectPUT(API_URL + user[0].id, user);
		getUserAndEditFactory.editUser(user).then(function(data) {
			expect(data).toBe(undefined);
		});
		httpBackend.flush();
	});
	it('When user details are wrong, then a message from backend is return', function() {
		errorMessage = {data: {errorMessage: "ERROR"}};
		httpBackend.when('PUT', API_URL + user[0].id, user)
		.respond(400, errorMessage);
		httpBackend.expectPOST(API_URL + user[0].id, user);
		getUserAndEditFactory.editUser(user).then(function(data) {
			expect(data).toBe(undefined);
		})
		.catch(function(data) {
			expect(data.errorMessage).toBe("ERROR");
		});
		httpBackend.flush();
	})

});