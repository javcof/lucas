(function() {
	var Lucas = {};
	var html = document.documentElement;
	var readyState = false, readyFn = [];
	
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', fireReady, false);
	} else {
		doScroll();
	}
	
	function doScroll() {
		try {
			console.log('html.doScroll');
			html.doScroll('left');
			fireReady();
		} catch(e) {
			setTimeout(function() {
				doScroll();
			}, 50);
		}
	}

	function fireReady() {
		for (var i = 0; i < readyFn.length; i++) {
			readyFn[i].call(null);
		}
	}
	
	Lucas.ready = function(fn) {
		if (document.readyState === 'complete') {
			fn();
			return;
		}
		readyFn.push(fn);
	}
	
	Lucas.query = function(selectors, context) {
		context = context || document;
		return context.querySelector(selectors);
	}
	
	Lucas.queryAll = function(selectors, context) {
		context = context || document;
		return context.querySelectorAll(selectors);
	}
	
	window.$ = window.Lucas = Lucas;
})();