define([
    './core'
], function(Lucas) {
    var $$guid = Lucas.$$guid;

    // http://dean.edwards.name/weblog/2005/10/add-event/
	Lucas.event = {
		add: function(elem, type, handler) {
			var handlers;
			if (!handler.$$guid) {
				handler.$$guid = $$guid++;
			}
			if (!elem.events) {
				elem.events = {};
			}
			if (!(handlers = elem.events[type])) {
				handlers = elem.events[type] = {};

				if (elem['on' + type]) {
					handlers[0] = elem['on' + type];
				}
			}

			handlers[handler.$$guid] = handler;
			elem['on' + type] = this.handle;
		},
		remove: function(elem, type, handler) {
			if (elem.events && elem.events[type]) {
				delete elem.events[type][handler.$$guid];
			}
		},
		handle: function(e) {

			// SD9011: 事件模型在各浏览器中存在差异
			// http://www.w3help.org/zh-cn/causes/SD9011
			e = e || window.event;

			// https://developer.mozilla.org/zh-CN/docs/Web/API/Event/target
			// 在 IE6-8 中，事件模型与标准不同。
			// 使用非标准的 element.attachEvent() 方法绑定事件监听器。
			// 在该模型中，事件对象有一个 srcElement 属性，等价于target 属性。
			e.target = e.target || e.srcElement;

			var handlers = this.events[e.type];
			for (var i in handlers) {
				handlers[i](e);
			}
		}
	};

    // Lucas events system
	Lucas.extend(Lucas, {
		on: function(elem, types, handler) {
			var type;
			// Types can be a map of types/handlers
			if (typeof types === 'object') {
				for (type in types) {
					Lucas.on(elem, type, types[type]);
				}
			} else {
				Lucas.event.add(elem, types, handler);
			}

		},
		off: function(elem, type, handler) {
			if (arguments.length === 1) {
				if (support.deleteExpando) {
					delete elem.events;
			 	} else {
					elem.events = undefined;
				}
				elem['on' + type] = null;
				return;
			}
			if (arguments.length === 2) {
				delete elem.events[type];
				elem['on' + type] = null;
				return;
			}
			Lucas.event.remove(elem, type, handler);
		},
		trigger: function(elem, type, extra) {
			var handlers = elem.events[type];
			if (handlers) {
				for (var i in handlers) {
					// IE6-8 apply second paramenter can't be a array-like type.
					// Starting with ECMAScript 5 these arguments can be a generic array-like object instead of an array.
					// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
					// https://www.cnblogs.com/snandy/archive/2011/03/21/1989743.html
					handlers[i].apply(elem, extra || []);
				}
			}
		}
	});

    // TODO: Deprecated, replace by on method
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
});
