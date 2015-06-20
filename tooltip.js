var tooltip = function(ele, options) {
	var box = document.getElementById('box');
	var show = function(top, left) {
		box.style.display = 'block';
		box.style.top = top;
		box.style.left = left;
	}
	var hide = function(ele) {
		box.style.display = 'none';
	}
	
	EventUtil.addHandler(ele, 'mouseenter', function(e) {
		var event = EventUtil.getEvent(e);
		
		var top = event.pageY + 10 + 'px';
		var left = event.pageX + 10 + 'px';
		show(top, left);

		box.innerHTML = ele._title = ele.title;
		ele.title = '';
	});
	
	EventUtil.addHandler(ele, 'mousemove', function(e) {
		var event = EventUtil.getEvent(e);
		
		var top = event.pageY + 10 + 'px';
		var left = event.pageX + 10 + 'px';
		show(top, left);
	});
	
	EventUtil.addHandler(ele, 'mouseleave', function(e) {
		ele.title = ele._title;
		hide();
	});
}