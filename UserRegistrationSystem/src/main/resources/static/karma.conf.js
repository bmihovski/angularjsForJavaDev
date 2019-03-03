// Karma configuration
// Generated on Tue Dec 11 2018 16:28:24 GMT+0200 (Eastern European Standard Time)

module.exports = function(config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files,
		// exclude)
		basePath : '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks : [ 'jasmine' ],

		// list of files / patterns to load in the browser
		files : [
				'./node_modules/angular/angular.js',
		    	'./node_modules/angular-mocks/angular-mocks.js',
		    	'./node_modules/angular-route/angular-route.js',
		    	'./node_modules/angular-resource/angular-resource.js',
		    	'./js/app.js',
		    	'./js/userRegConst.js',
				'./js/userRegistrationService.js',
				'./js/userRegistrationController.js',
				'./js/listDeleteUserService.js',
				'./js/listDeleteUserController.js',
				'./js/userUpdateService.js',
				'./js/userUpdateController.js',
		    	'./spec/userRegDataBuilder.js',
		    	'./js/homeController.js',
		    	'./js/loginService.js',
		    	'./js/loginController.js',
		    	'./js/logoutService.js',
		    	'./js/logoutController.js',
				'./spec/unit/**/*.js' ],

		// list of files / patterns to exclude
		exclude : [],

		// preprocess matching files before serving them to the browser
		// available preprocessors:
		// https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors : {},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters : [ 'progress' ],

		// web server port
		port : 9876,

		// enable / disable colors in the output (reporters and logs)
		colors : true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR ||
		// config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel : config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file
		// changes
		autoWatch : true,

		// start these browsers
		// available browser launchers:
		// https://npmjs.org/browse/keyword/karma-launcher
		browsers : [ 'Chrome' ],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun : false,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency : Infinity
	})
}
