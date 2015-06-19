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
}