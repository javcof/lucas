(function() {
	Lucas.ui = {};
	
	Lucas.ui.tooltip = function (elements) {
		for (var i = 0; i < elements.length; i++) {
			var ele = elements[i];
			$.bind(ele, 'mouseover', function(e) {
				var title = this.getAttribute('title'), 
					target = e.target,
					ui = document.getElementById('ui-tooltip-1');

				this.setAttribute('title', '');
				this.setAttribute('tooltip', title);
				
				ui.appendChild(document.createTextNode(title));
				ui.style.top = target.offsetTop + 24 + 'px';
				ui.style.left = target.offsetLeft + 'px';
				ui.style.display = 'block';

				console.log('element offset(top, left) = (' + target.offsetTop +', ' + target.offsetLeft + ')');
			});
			$.bind(ele, 'mouseout', function(e) {
				var title = this.getAttribute('tooltip'), 
					target = e.target,
					ui = document.getElementById('ui-tooltip-1');
				
				this.setAttribute('title', title);

				ui.removeChild(ui.firstChild);
				ui.removeAttribute('tooltip');
				ui.style.display = 'none';
			});
		}
	}
})();