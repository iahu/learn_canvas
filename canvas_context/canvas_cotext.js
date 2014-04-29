function getContext2D(el) {
	if ( typeof el === 'string') {
		el = document.getElementById(el);
	}

	if (el && el.getContext) {
		return el.getContext('2d');
	} else {
		return el;
	}
}