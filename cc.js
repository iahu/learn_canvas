var CC = (function() {
	'use strict';

	function CC(args) {
		// enforces new
		if (!(this instanceof CC)) {
			return new CC(args);
		}
		this.init.call(this, args);
	}

	CC.prototype.init = function(args) {
		if (typeof args === 'string') {
			args = document.getElementById(args);
		}
		this.canvas = args;
		this.ctx = args.getContext('2d');
	};

	return CC;

}());