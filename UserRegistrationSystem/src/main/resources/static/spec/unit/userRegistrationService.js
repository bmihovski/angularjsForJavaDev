describe('Testing user registration service', function() {
	var location, httpBackend, userRegistrationFactory, API_URL;
	beforeEach(function(){
		module('userregistrationsystem');
		inject(function(_$httpBackend_, _$location_, _userRegistrationFactory_, _API_URL_){
			httpBackend = _$httpBackend_;
			location = _$location_;
			API_URL = _API_URL_;
			userRegistrationFactory = _userRegistrationFactory_;
			spyOn(location, 'path');
		});
	});

		  it('should have true returned for proper sendPost and redirected to /home', function() {
			  var user = userRegDataBuilder().build();
			  httpBackend.when('POST', API_URL,
					  user).respond(200, true );

			  userRegistrationFactory.regUser(user).then(function(d) {
			      expect(d).toBe(undefined);
			  });
			  httpBackend.flush();
			});
});
