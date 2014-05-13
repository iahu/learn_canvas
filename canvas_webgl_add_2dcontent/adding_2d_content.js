var cgl = new Cgl('cvs'),
	gl = cgl.gl,

	shaderProgram,
	mvMatrix,
	perspectiveMatrix,
	squareVerticesBuffer,
	vertexPositionAttribute;

if (!gl) {
	alert('浏览器不支持webgl');
	return;
}

initShaders();
initBuffers();
setInterval(drawScene, 15);


function initShaders() {
	var framgentShader = getShader(gl, 'shader-fs');
	var vertexShader = getShader(gl, 'shader-vs');

	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, framgentShader);
	gl.linkProgram(shaderProgram);

	if ( !gl.getProgramParameter(shaderProgram, gl.LINK_STATUS) ) {
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
			theSource += currentChild.textContent;
		}

		currentChild = currentChild.nextSibling;
	}

	if (shaderScript.type === 'x-shader/x-fragment') {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (shaderScript.type === 'x-shader/x-vertex') {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
		return null;
	}

	gl.shaderSource(shader, theSource);

	gl.compileShader(shader);
	if ( !gl.getShaderParameter(shader, gl.COMPILE_STATUS) ) {
		return null;
	}
	return shader;
}


var horizAspect = 480.0/640.0;

function initBuffers() {
	squareVerticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

	var vertices = [
		1.0, 1.0, 0.0,
		-1.0, 1.0, 0.0,
		1.0, -1.0, 0.0,
		-1.0, -1.0, 0.0
	];

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW );
}

function drawScene() {
	gl.clear(gl.COLOR_BUFFER | gl.DEPTH_BUFFER_BIT );

	perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0);

	loadIdentity();
	mvTranslate( [-0.0, 0.0, -6.0] );

	gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
	gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0,0);
	setMatrixUniforms();
	gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
}

function loadIdentity() {
	mvMatrix = Matrix.I(4);
}

function multMatrix(m) {
	mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v) {
	multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4() );
}

function setMatrixUniforms() {
	var pUniform = gl.getUniformLocation( shaderProgram, 'uPMatrix' );
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten() ) );

	var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}