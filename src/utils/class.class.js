/*
 * Purpose :
 * A Class object with inheritance.
 * Usage:
 *  var Locomotion = Object.extend({
 *      initialize: function(name){
 *          this.name = name;
 *      },
 *
 *      sayHello : function() {
 *          return ("hello " + this.name);
 *      }
 *  });
 *
 *  var Car = Locomotion.extend({
 *      initialize: function(name) {
 *          this._super(name);
 *          this.power = 100;
 *      }
 *  });
 *
 * From documentation by John Resig (http://ejohn.org/)
 */
(function() {
	var initializing = false, fnTest = /xyz/.test(function() {
		xyz;
	}) ? /\b_super\b/ : /.*/;
	// The base Class implementation (does nothing)
	this.Object = function() {
	};

	// Create a new Class that inherits from this class
	Object.extend = function(prop) {
		var _super = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (var name in prop) {
			// Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] == "function" &&
			                  typeof _super[name] == "function" && fnTest.test(prop[name]) ?
			                  (function(name, fn) {
				                  return function() {
					                  var tmp = this._super;

					                  // Add a new ._super() method that is the same method
					                  // but on the super-class
					                  this._super = _super[name];

					                  // The method only need to be bound temporarily, so we
					                  // remove it when we're done executing
					                  var ret = fn.apply(this, arguments);
					                  this._super = tmp;

					                  return ret;
				                  };
			                  })(name, prop[name]) :
			                  prop[name];
		}

		// The dummy class constructor
		function Object() {
			// All construction is actually done in the initialize method
			if (!initializing && this.initialize) {
				this.initialize.apply(this, arguments);
			}
		}

		// Populate our constructed prototype object
		Object.prototype = prototype;

		// Enforce the constructor to be what we expect
		Object.prototype.constructor = Object;

		// And make this class extendable
		Object.extend = arguments.callee;

		return Object;
	};
})();
