/*
 * Purpose :
 * A CGSGObject object with inheritance.
 * Usage:
 *  var Locomotion = CGSGObject.extend({
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
(function () {
	var initializing = false, fnTest = /xyz/.test(function () {
		xyz;
	}) ? /\b_super\b/ : /.*/;
	// The base CGSGObject implementation (does nothing)
	this.CGSGObject = function () {
	};

	// Create a new CGSGObject that inherits from this class
	CGSGObject.extend = function (prop) {
		var _super = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (var name in prop) {
			// Check if we're overwriting an existing function
			//noinspection JSUnfilteredForInLoop
			prototype[name] = typeof prop[name] == "function" &&
							  typeof _super[name] == "function" && fnTest.test(prop[name]) ?
							  (function (name, fn) {
								  return function () {
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
		function CGSGObject() {
			// All construction is actually done in the initialize method
			if (!initializing && this.initialize) {
				this.initialize.apply(this, arguments);
			}
		}

		// Populate our constructed prototype object
		CGSGObject.prototype = prototype;

		// Enforce the constructor to be what we expect
		CGSGObject.prototype.constructor = CGSGObject;

		// And make this class extendable
		CGSGObject.extend = arguments.callee;

		return CGSGObject;
	};
})();
