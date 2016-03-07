(function() {
	var Lucas = {};
	var html = document.documentElement;
	var readyState = false, readyFn = [];
	
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', fireReady, false);
	} else {
		if (html.doScroll) {
			doScroll();
		}
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
		if (context.querySelector) {
			return context.querySelector(selectors);
		}
		return null;
	}
	
	Lucas.queryAll = function(selectors, context) {
		context = context || document;
		if (context.querySelectorAll) {
			return context.querySelectorAll(selectors);
		}
		return null;
	}
	
	Lucas.bind = function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			// SD9011: 事件模型在各浏览器中存在差异
			// http://www.w3help.org/zh-cn/causes/SD9011
			element.attachEvent('on' + type, function(e) {
				e = e || window.event;
				// https://developer.mozilla.org/zh-CN/docs/Web/API/Event/target
				// 在 IE6-8 中，事件模型与标准不同。
				// 使用非标准的 element.attachEvent() 方法绑定时间监听器。
				// 在该模型中，事件对象有一个 srcElement 属性，等价于target 属性。
				e.target = e.srcElement;
				e.preventDefault = function() {
					this.returnValue = false;
				}
				e.stopPropagation = function() {
					this.cancelBubble = true;
				}				
				handler.call(element, e);
			});
		} else {
			element['on' + type] = handler;
		}
	}
	
	Lucas.extend = function(target, source) {
		for (var key in source) {
			target[key] = source[key];
		}
	}
	
	window.$ = window.Lucas = Lucas;
})();