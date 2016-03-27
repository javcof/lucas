(function($) {
	$.ui = {};
	
	$.ui.GUID = 0;
	$.ui.tooltip = function (elements, options) {
		var settings = {
			offset: 24
		};
		$.extend(settings, options);
		for (var i = 0; i < elements.length; i++) {
			var ele = elements[i];
			$.bind(ele, 'mouseover', function(e) {
				var title = this.getAttribute('title'), 
					target = e.target
					targetOffset = $.offset(target),
					ui = document.createElement('div');

				this.setAttribute('title', '');
				this.setAttribute('tooltip', title);
				this.setAttribute('ui-tooltip-id', 'ui-tooltip-' + Lucas.ui.GUID++);
				
				ui.setAttribute('id', this.getAttribute('ui-tooltip-id'));
				ui.className = 'tooltip';
				ui.style.top = targetOffset.top + settings.offset + 'px';
				ui.style.left = targetOffset.left + 'px';
				ui.appendChild(document.createTextNode(title));
				
				document.body.appendChild(ui);
				console.log('element offset(top, left) = (' + target.offsetTop +', ' + target.offsetLeft + ')');
			});
			$.bind(ele, 'mouseout', function(e) {
				var title = this.getAttribute('tooltip'), 
					target = e.target,
					ui = document.getElementById(this.getAttribute('ui-tooltip-id'));
				
				this.setAttribute('title', title);
				document.body.removeChild(ui);
			});
		}
	}
	
	$.ui.tabs = function (elements, options) {
		var settings = {
			event: 'click',
			activate: function(e) {
				e.preventDefault();
				if (e.target && 
					e.target.nodeName === 'A' && 
					e.target.hash) {
					var panel = document.getElementById(e.target.hash.slice(1));
					if (panel) {
						$.hide($.siblings(e.currentTarget));
						$.show([panel]);
					}
				}
				console.log('event: ' + this.nodeName + ', event.target: ' + e.target.nodeName + ', event.currentTarget: ' + e.currentTarget.nodeName + '');
			}
		};
		$.extend(settings, options);
		for (var i = 0; i < elements.length; i++) {
			var tab = elements[i], 
				list = tab.firstElementChild,
				panels = $.siblings(list);
			if (list) {
				list.setAttribute('ui-tabs-role', 'tablist');
				$.bind(list, settings.event, settings.activate);
			}
			$.hide(panels);
		}
	}
})(Lucas);