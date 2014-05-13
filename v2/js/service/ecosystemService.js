app.service('EcosystemSrv', /*['$scope', '$http',*/ function() {

	this.allExts = [];

	this.load = function(scope, http, callback) {
		var that = this;
		http.get("data/ecosystem.json", { cache : true })
			.then(function(results) {
					  that.allExts = results.data;
					  scope.allExts = results.data;
					  if (callback)
						  callback();
				  }, function(results) {
					  //error
					  console.log("Error while loading 'ecosystem.json' file. No examples will be loaded...");
				  }
		)
	},

		this.find = function(code) {
			for (var i in this.allExts) {
				if (this.allExts[i].code === code) {
					return this.allExts[i];
				}
			}
		},

		this.getURLParameter = function(name) {
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) ||
									   [,
										   ""])[1].replace(/\+/g, '%20')) || null
		}
}/*]*/);
