app.service('ExamplesSrv', /*['$scope', '$http',*/ function() {

	this.examples = [];

	this.load = function(scope, http, callback) {
		var that = this;
		http.get("data/examples.json", { cache : true })
			.then(function(results) {
					  that.examples = results.data;
					  scope.examples = results.data;
					  if (callback)
						  callback();
				  }, function(results) {
					  //error
					  console.log("Error while loading 'examples.json' file. No examples will be loaded...");
				  }
		)
	},

		this.find = function(name) {
			for (var i in this.examples) {
				if (this.examples[i].name === name) {
					return this.examples[i];
				}
			}
		}
}/*]*/);