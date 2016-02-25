(function() {
	var Lucas = {};
	var html = document.documentElement;
	function doScroll(fn) {
		try {
			html.doScroll('left');
			fn();
		} catch(e) {
			setTimeout(function() {
				doScroll(fn);
			}, 50);
		}
	}
	
	Lucas.ready = function(fn) {
		if (document.readyState === 'complete') {
			fn();
			return;
		}
		if (document.addEventListener) {
			document.addEventListener('DOMContentLoaded', fn, false);
		} else {
			doScroll(fn);
		}
	}
	
	window.$ = window.Lucas = Lucas;
})();