var Cgl = (function() {
	'use strict';

	function Cgl(canvas) {
		// enforces new
		if (!(this instanceof Cgl)) {
			return new Cgl(canvas);
		}
		this.init.call(this, canvas);
	}

	Cgl.prototype.init = function(canvas) {
		if (!canvas) {
			return null;
		}
		if (typeof canvas === 'string') {
			canvas = document.getElementById('cvs');
		}

		var gl = this.gl = null;
		try {
			gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		} catch(e) {}

		if (!gl) {
			alert('Unable to initialize WebGL. Your browser may not support it.');
		}

		gl.clearColor(0.0,0.0,0.0,1.0);
		gl.enable(gl.DEPTH_TEST);
	};


	return Cgl;

}());