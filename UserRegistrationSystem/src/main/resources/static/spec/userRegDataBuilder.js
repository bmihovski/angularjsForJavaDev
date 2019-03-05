function userRegDataBuilder() {
    return {
        self: this,
        _mockUser: { id: 1,
            		name: "Boyan",
            		address: "Sofia, Mladost",
            		email: "mag@gmail.com",
            		errorMessage: null
    			},
        withId: function (id) {
            this._mockUser.id = id;
            return this;
        },
        withName: function (name) {
            this._mockUser.name = name;
            return this;
        },
        withAddress: function (address) {
            this._mockUser.address = address;
            return this;
        },
        withEmail: function (email) {
            this._mockUser.email = email;
            return this;
        },
        withErrorMessage: function (errorMessage) {
            this._mockUser.errorMessage = errorMessage;
            return this;
        },
        build: function () {
            return this._mockUser;
        }
    };
};