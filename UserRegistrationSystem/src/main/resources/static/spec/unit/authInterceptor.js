describe('Given a backend which accepting basic authentification', function() {
	var httpProvider;
	beforeEach(function() {
		module(function (_$httpProvider_) {
            httpProvider = _$httpProvider_;
            spyOn(httpProvider.interceptors, 'push');
        });
       module('userregistrationsystem');
       inject();

	});
	it('When configuration is provided, then basic auth factory service is called', function() {
	      expect(httpProvider.interceptors.push)
	        .toHaveBeenCalledWith('AuthInterceptor');
	});
});