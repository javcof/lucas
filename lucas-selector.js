(function($) {
	var Selector = {
		'T': '',
		'U': '*',
		'A': [],
		'C': [],
		'I': '',
		'P': []
	};
	var result = [];
	$.querySelectorAll = function (selectors, context) {
		var arr = selectors.split(/([#.])/);
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] === '#') {
				Selector['I'] = arr[++i];
				break;
			}
			if (arr[i] === '.') {
				Selector['C'].push(arr[++i]);
				continue;
			}
			Selector['T'] = arr[i];
		}
		if (Selector['I']) {
			result[0] = document.getElementById(Selector['I'])
			return result;
		}
		if (Selector['T']) {
			result = document.getElementsByClassName(Selector['T'].join(' '));
		}
		if (Selector['T'] === '*') {

		} else {
			if (result.length > 0) {
				var _result = [];
				for (var i = 0; i < result.length; i++) {
					var ele = result[i];
					if (ele.tagName === Selector['T'].toUpperCase()) {
						_result.push(result[i]);
					}
				}
				result = _result;
			} else {
				return document.getElementsByTagName(Selector['T']);
			}
		}
		return result;
	}
})(Lucas);