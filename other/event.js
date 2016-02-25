var EventUtil = {
	addHandler: function(ele, type, handler) {
		if (ele.addEventListener) {
			ele.addEventListener(type, handler, false);
		} else if (ele.attachEvent) {
			ele.attachEvent('on' + type, handler);
		} else {
			ele['on' + type] = handler;
		}
	},
	removeHandler: function(ele, type, handler) {
		if (ele.removeEventListener) {
			ele.removeEventListener(type, handler, false);
		} else if (ele.detachEvent) {
			ele.detachEvent('on' + type, handler);
		} else {
			ele['on' + type] = null;
		}
	},
	getEvent: function(e) {
		return e || window.event;
	},
	getTarget: function(e) {
		return e.target || e.srcElement;
	},
	preventDefault: function(e) {
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function(e) {
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	}
	
	
	// BT9017: 只有 IE 支持 mouseenter 和 mouseleave 事件
	// http://www.w3help.org/zh-cn/causes/BT9017
	// http://www.w3help.org/tests/BT9017/mouseenter_and_mouseleave.html
}