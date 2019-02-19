describe('Given a controller for update user', function() {
	var scope, route, location, deferred, getUserAndEditFactory;
	var user = {data: {
		id: 1,
        name: "Boyan",
        address: "Sofia, Mladost",
        email: "mag@gmail.com",
        errorMessage: null
		}
	};
	beforeEach(function() {
		module('userregistrationsystem');
		inject(function($controller, _$route_, _$location_, _$rootScope_, _$q_, _getUserAndEditFactory_) {
			scope = _$rootScope_.$new();
			route = _$route_;
			location = _$location_;
			deferred = _$q_.defer();
			getUserAndEditFactory = _getUserAndEditFactory_;

			spyOn(getUserAndEditFactory, 'getUser').and.returnValue(deferred.promise);
			spyOn(getUserAndEditFactory, 'editUser').and.returnValue(deferred.promise);
			spyOn(location, 'path');
			spyOn(route, 'reload');

			$controller('UsersDetailsController', {
				$scope: scope,
				getUserAndEditFactory: getUserAndEditFactory
			});
		});
	});
	it('When user is selected to edit, then the user information is present', function() {
		getUserAndEditFactory.getUser(user.data.id);

		expect(getUserAndEditFactory.getUser).toHaveBeenCalled();

		deferred.resolve(user);

		scope.$apply();

	    expect(scope.user).not.toBe(undefined);

	});

	it('When user is edited, then the information is send back to server', function() {
		scope.submitUserForm();

		expect(getUserAndEditFactory.editUser).toHaveBeenCalled();

		deferred.resolve(user);

		scope.$apply();

	    expect(location.path).toHaveBeenCalledWith('/list-all-users');
	    expect(route.reload).toHaveBeenCalled();

	});

});