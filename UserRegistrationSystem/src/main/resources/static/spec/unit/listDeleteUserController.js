describe('Given a controller to list created users', function() {
	 var scope, deferred, location, route, listDeleteUserFactory;
    var listedUsers = userRegDataBuilder().build();
    //{data: [{id: 1}, {id: 2}]}

	beforeEach(function() {
		module('userregistrationsystem');
		inject(function($controller, _$rootScope_, _$q_, _$location_, _$route_, _listDeleteUserFactory_) {
			scope = _$rootScope_.$new();
			location = _$location_;
			route = _$route_;
			listDeleteUserFactory = _listDeleteUserFactory_;
		    // We use the $q service to create a mock instance of defer
		    deferred = _$q_.defer();
		    // Use a Jasmine Spy to return the deferred promise and services
		    spyOn(listDeleteUserFactory, 'listUsers').and.returnValue(deferred.promise);
		    spyOn(listDeleteUserFactory, 'deleteUser').and.returnValue(deferred.promise);
		    spyOn(location, 'path');
		    spyOn(route, 'reload');
		    // Init the controller, passing our spy service instance
		    $controller('ListDeleteUserController', {
			   $scope: scope,
			   listDeleteUserFactory: listDeleteUserFactory
		    });

		});

	});
	it('should resolve the promise and return the users', function() {
	    // Setup the data we wish to return for the .then function in the controller
		listDeleteUserFactory.listUsers();
		expect(listDeleteUserFactory.listUsers).toHaveBeenCalled();

		deferred.resolve({data: [{listedUsers}]});

	    // We have to call apply for this to work
	    scope.$apply();
	    // Since we called apply, not we can perform our assertions
	    expect(scope.users).not.toBe(undefined);
	    expect(location.path).not.toHaveBeenCalledWith('/list-all-users');
	    expect(route.reload).not.toHaveBeenCalled();

	});

	it('when user is deleted, then the user is gone', function() {
		scope.deleteUser(listedUsers.id);
		expect(listDeleteUserFactory.deleteUser).toHaveBeenCalled();

		deferred.resolve({data: [{}]});
		scope.$apply();

	    expect(location.path).toHaveBeenCalledWith('/list-all-users');
	    expect(route.reload).toHaveBeenCalled();
	});

});