var cgl = new Cgl('cvs'),
	gl = cgl.gl;

if (!gl) {
	alert('浏览器不支持webgl');
	return;
}

function initShaders() {
	var framgentShader = getShader(gl, 'shader-fs');
	var vertexShader = getShader(gl, 'shader-vs');

	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, framgentShader);
	gl.linkProgram(shaderProgram);

	if ( !gl.getProgramPrameter(shaderProgram, gl.LINK_STATUS) ) {
		alert('Unable to initialize the shader program.');
	}

	gl.useProgram(shaderProgram);

	var vertextPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
	gl.enableVertexAttribArray(vertextPositionAttribute);
}

function getShader(gl, id) {
	var shaderScript, theSource, currentChild, shader;

	shaderScript = document.getElementById(id);

	if (!shaderScript) {
		return null;
	}

	theSource = '';
	currentChild = shaderScript.firstChild;

	while (currentChild) {
		if (currentChild.nodeType === currentChild.TEXT_NODE) {
			theSource += currentChild.innerText || currentChild.textContext;
		}

		currentChild = currentChild.nextSibling;
	}

	if (shaderScript.type === 'x-shader/x-fragment') {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (shaderScript.type === 'x-shader/x-vertex') {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		return null;
	}

	gl.shaderSource(shader, theSource);

	gl.compileShader(shader);
	if ( !gl.getShaderParameter(gl, gl.COMPILE_STATUS) ) {
		return null;
	}
	return shader;
}