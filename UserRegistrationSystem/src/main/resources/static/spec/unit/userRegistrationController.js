describe('Testing a Controller that uses a Promise', function () {
	  var scope;
	  var q;
	  var deferred;
	  var location;
	  var route;
	  var userRegistrationFactory;

	  beforeEach(module('userregistrationsystem'));

	  beforeEach(inject(function($controller, _$rootScope_, _$q_, _$location_, _$route_, _userRegistrationFactory_) {
	    scope = _$rootScope_.$new();
	    location = _$location_;
	    route = _$route_;
	    userRegistrationFactory = _userRegistrationFactory_;

	    // We use the $q service to create a mock instance of defer
	    deferred = _$q_.defer();

	    // Use a Jasmine Spy to return the deferred promise
	    spyOn(userRegistrationFactory, 'regUser').and.returnValue(deferred.promise);
		spyOn(location, 'path');
		spyOn(route, 'reload');
	    // Init the controller, passing our spy service instance
	    $controller('RegisterUserController', {
	      $scope: scope,
	      userRegistrationFactory: userRegistrationFactory
	    });
	  }));

	  it('should resolve promise', function () {
	    // Setup the data we wish to return for the .then function in the controller
		scope.submitUserForm();

		deferred.resolve();

	    // We have to call apply for this to work
	    scope.$apply();

	    // Since we called apply, not we can perform our assertions
	    expect(location.path).toHaveBeenCalledWith('/list-all-users');
	    expect(route.reload).toHaveBeenCalled();
	    expect(scope.errorMessage).toBe(undefined);
	  });

	  it('should reject promise', function () {
		scope.submitUserForm();
	    // This will call the .catch function in the controller
	    deferred.reject({data: {errorMessage: "Unable to create user. User with name Boyan already exist."}});

	    // We have to call apply for this to work
	    scope.$apply();

	    // Since we called apply, not we can perform our assertions
	    //expect(location.path).toNotHaveBeenCalledWith('/home');
	    expect(scope.errorMessage).toBe('Unable to create user. User with name Boyan already exist.');
	  });

	});