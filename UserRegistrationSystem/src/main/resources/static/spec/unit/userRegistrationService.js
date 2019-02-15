describe('Testing user registration service', function() {
	var $location, $httpBackend, userRegistrationFactory;
	beforeEach(function(){
		module('userregistrationsystem');
		inject(function(_$httpBackend_, _$location_, _userRegistrationFactory_){
			$httpBackend = _$httpBackend_;
			$location = _$location_;
			userRegistrationFactory = _userRegistrationFactory_;
			spyOn($location, 'path');
		});
	});

		  it('should have true returned for proper sendPost and redirected to /home', function() {
			  var user = {name: "Boyan", address:"Sofia", email: "test@gmail.com"};
			  var postUser = {name: "Boyan", address:"Sofia", email: "test@gmail.com"};
			  $httpBackend.when('POST', 'http://localhost:8080/api/user/',
			      function(user) {
			          jsonData = JSON.parse(user);
			          expect(jsonData.name).toBe(postUser.name);
			          expect(jsonData.address).toBe(postUser.address);
			          expect(jsonData.email).toBe(postUser.email);
			          return true;
			      }
			  ).respond(200, true );

			  userRegistrationFactory.regUser(postUser).then(function(d) {
			      expect(d).toBe(undefined);
			  });
			  $httpBackend.flush();
			});
});
