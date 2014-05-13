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

		var gl = null;
		try {
			this.gl = gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		} catch(e) {
			throw new Error('WebGL may not be supported.');
		}
		if (gl) {
			gl.clearColor(0.0,0.0,0.0,1.0);
			gl.enable(gl.DEPTH_TEST);
		}
	};


	return Cgl;

}());