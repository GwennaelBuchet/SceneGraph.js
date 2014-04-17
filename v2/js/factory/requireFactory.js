// the Require service that proxies the global RequireJS
// reference and helps it integrate into the AngularJS workflow.
app.factory(
	"require",
	function($rootScope) {

		// Since the callbacks in the RequireJS module will
		// take the control-flow outside of the normal
		// AngularJS context, we need to create a proxy that
		// will automatically alert AngularJS to the execution
		// of the callback. Plus, this gives us an opportunity
		// to add some error handling.
		function requireProxy(dependencies, successCallback, errorCallback) {

			// Make sure the callbacks are defined - this makes
			// the logic easier down below.
			successCallback = ( successCallback || angular.noop );
			errorCallback = ( errorCallback || angular.noop );

			// NOTE: This "require" reference is the core,
			// global reference to RequireJS.
			require(
				( dependencies || [] ),
				function successCallbackProxy() {
					var args = arguments;

					$rootScope.$apply(
						function() {
							successCallback.apply(this, args);
						}
					);

				},
				function errorCallbackProxy() {
					var args = arguments;

					$rootScope.$apply(
						function() {
							errorCallback.apply(this, args);
						}
					);
				}
			);
		}

		return( requireProxy );
	}
);