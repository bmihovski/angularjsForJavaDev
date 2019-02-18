describe('Given user which will be edited', function() {
	var route, httpBackend, getUserAndEdit, API_URL, location;
	beforeEach(function() {
		module('userregistrationsystem');
		inject(function ($controller, _$route_, _getUserAndEdit_, _API_URL_, _$location_, _$httpBackend_) {
			route = _$route_;
			getUserAndEdit = _getUserAndEdit_;
			API_URL = _API_URL_;
			location = _$location_;
			httpBackend = _$httpBackend_;
			//spyOn(route, 'reload');
		});

	});
	it('When user is selected to edit, then user details are displayed', function() {
		var user = [
			{
			id: 1,
	        name: "Boyan",
	        address: "Sofia, Mladost",
	        email: "mag@gmail.com",
	        errorMessage: null
			}
		];
		httpBackend.when('GET', API_URL + user[0].id).respond(200, user);
		httpBackend.expectGET(API_URL + user[0].id);
		getUserAndEdit.getUser(user[0].id).then(function(d) {
			expect(d.data).toEqual(user);
		});
		httpBackend.flush();
	});
});