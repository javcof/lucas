var whenReady = (function() {
	var funcs = [];
	var ready = false;
	
	function handler(e) {
		if (ready) return;
		
		for (var i = 0; i < funcs.length; i++) {
			funcs[i].call(document);
		}
		
		ready = true;
		funcs = null;
	}
	
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', handler, false);
	}
	return function whenReady(f) {
		if (ready) f.call(document);
		else funcs.push(f);
	}
}());