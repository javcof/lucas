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
			// console.log('html.doScroll');
			html.doScroll('left');
			fireReady();
		} catch(e) {
			setTimeout(function() {
				doScroll();
			}, 50);
		}
	}

	function fireReady() {
		try {
			for (var i = 0; i < readyFn.length; i++) {
				readyFn[i].call(null);
			}
		} catch(e) {
			console.log(e.message);
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
		var elem = null;
		context = context || document;
		if (context.querySelector) {
			elem = context.querySelector(selectors);
		}
		return elem;
	}

	Lucas.queryAll = function(selectors, context) {
		var eles = [];
		context = context || document;
		if (context.querySelectorAll) {
			return context.querySelectorAll(selectors);
		} else if (Leia) {
			eles = Leia(selectors, context);
		}
		return eles;
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
				// 使用非标准的 element.attachEvent() 方法绑定事件监听器。
				// 在该模型中，事件对象有一个 srcElement 属性，等价于target 属性。
				e.target = e.srcElement;

				// https://developer.mozilla.org/zh-CN/docs/Web/API/event.relatedTarget
				// https://developer.mozilla.org/en-US/docs/Web/Events/mouseenter
				// how to use mouseover to simulate the principle of event delegation for the mouseenter event.
				if (type === 'mouseover') {
					e.relatedTarget = e.fromElement;
				} else if (type === 'mouseout') {
					e.relatedTarget = e.toElement;
				}

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

	Lucas.extend(Lucas, {
		show: function(elements) {
			for (var i = 0; i < elements.length; i++) {
				elements[i].style.display = 'block';
			}
		},
		hide: function(elements) {
			for (var i = 0; i < elements.length; i++) {
				elements[i].style.display = 'none';
			}
		},
		siblings: function(element) {
			var prev = element.previousSibling,
				next = element.nextSibling,
				eles = [];
			while (prev) {
				if (prev.nodeType === 1) {
					eles.unshift(prev);
				}
				prev = prev.previousSibling;
			}
			while (next) {
				if (next.nodeType === 1) {
					eles.push(next);
				}
				next = next.nextSibling;
			}
			return eles;
		},
		contains: function(parent, node) {
			if (parent === node) return true;
			if (parent.contains) {
				// 如果parent节点和node节点是同一个节点，返回 true。
				// https://developer.mozilla.org/zh-CN/docs/Web/API/Node/contains
				return parent.contains(node);
			} else if (parent.compareDocumentPosition) {
				// 如果parent节点和node节点是同一个节点，返回 0。
				// https://developer.mozilla.org/zh-CN/docs/Web/API/Node/compareDocumentPosition
				return !!(parent.compareDocumentPosition(node) & 16);
			}
			return false;
		},
		offset: function(element) {
			var pos = {
				top: element.offsetTop,
				left: element.offsetLeft
			};
			// https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent
			// HTMLElement.offsetParent 是一个只读属性，返回一个指向最近的（closest，指包含层级上的最近）包含该元素的定位元素。
			var parent = element.offsetParent;
			while (parent) {
				pos.top += parent.offsetTop;
				pos.left += parent.offsetLeft;
				parent = parent.offsetParent;
			}
			return pos;
		}
	});

	Lucas.extend(Lucas, {
		trim: function(str) {
			// Polyfill
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
			var re = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
			return str.trim ? str.trim(str) : str.replace(re, '');
		}
	});

	window.$ = window.Lucas = Lucas;
})();
