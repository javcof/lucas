(function() {
	Lucas.ui = {};
	
	Lucas.ui.GUID = 0;
	Lucas.ui.tooltip = function (elements) {
		for (var i = 0; i < elements.length; i++) {
			var ele = elements[i];
			$.bind(ele, 'mouseover', function(e) {
				var title = this.getAttribute('title'), 
					target = e.target,
					ui = document.createElement('div');

				this.setAttribute('title', '');
				this.setAttribute('tooltip', title);
				this.setAttribute('ui-tooltip-id', 'ui-tooltip-' + Lucas.ui.GUID++);
				
				ui.setAttribute('id', this.getAttribute('ui-tooltip-id'));
				ui.className = 'tooltip';
				ui.style.top = target.offsetTop + 24 + 'px';
				ui.style.left = target.offsetLeft + 'px';
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
})();