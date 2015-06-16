var whenReady = (function() {
	var funcs = [];
	var ready = false;
	
	function handler(e) {
		if (ready) return;
		
		// 模拟 DOMContentLoaded 事件
		// https://developer.mozilla.org/zh-CN/docs/Web/Events/readystatechange
		if (e.type === 'readystatechange' && document.readyState !== 'complete') return;
		
		for (var i = 0; i < funcs.length; i++) {
			funcs[i].call(document);
		}
		
		ready = true;
		funcs = null;
	}
	
	if (document.addEventListener) {
		// https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded
		document.addEventListener('DOMContentLoaded', handler, false);
		document.addEventListener('readystatechange', handler, false);
		window.addEventListener('load', handler, false);
	} else if (document.attachEvent) {
		document.attachEvent('onreadystatechange', handler);
		// https://msdn.microsoft.com/library/ms536343%28v=vs.85%29.aspx
		window.attachEvent('onload', handler);
	}
	
	// https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onload
	window.onload = handler;
	
	return function whenReady(f) {
		if (ready) f.call(document);
		else funcs.push(f);
	}
}());