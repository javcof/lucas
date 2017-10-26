/*
 * Leia CSS Selector Engine
 * Copyright 2017, jeffreyzhang
 */

(function() {
	var i = 0,
		chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
		slice = function(obj) {
			var arr = [];
			try {
				// NodeLists are host objects, using the Array.prototype.slice method on host objects is not guaranteed to work.
				// https://stackoverflow.com/questions/13317752/array-prototype-slice-this-is-not-a-javascript-object-error-in-ie8
				// https://stackoverflow.com/questions/2735067/how-to-convert-a-dom-node-list-to-an-array-in-javascript
				arr = [].slice.apply(obj);
			} catch (e) {
				for (var i = 0, len = obj.length; i < len; i++) {
					arr.push(obj[i]);
				}
			}
			return arr;
		},
		sortOrder = function(node, otherNode) {
			var ret = 0;
			if (node.compareDocumentPosition) {
				// https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
				ret = (node.compareDocumentPosition(otherNode) & 4) ? -1 : 1;
			} else if (node.sourceIndex && otherNode.sourceIndex) {
				ret = node.sourceIndex - otherNode.sourceIndex;
			}
			return ret;
		};

	var Leia = function(selector, context, results) {
		var elem, eles, m, match, set, pop, extra, combinator = '', parts = [];
		
		context = context || document;
		results = results || [];
	 
		// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
		if (context.nodeType !== 1 && context.nodeType !== 9) {
			return results;
		}
		
		if (!selector || typeof selector !== 'string') {
			return results;
		}

		// reset regexp index
		// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex
		chunker.lastIndex = 0;
		while (m = chunker.exec(selector)) {
			parts.push(m[1]);
			
			if (m[2]) {
				extra = RegExp.rightContext;
				break;
			}
		}
		
		if (false && (parts.length > 1)) {
			
		} else {
			var ret = Leia.find(parts.pop(), context);
			set = Leia.filter(ret.expr, ret.set);
			
			if (parts.length > 0) {
				pop = parts.pop();
				if (!Leia.selectors.relative[pop]) {
					combinator = ' ';
				} else {
					combinator = pop;
					pop = parts.pop();
				}
				
				Leia.selectors.relative[combinator](set, pop);
			}
		}
		
		if (set) {
			for (var i = 0, len = set.length; i < len; i++) {
				if (set[i]) {
					results.push(set[i]);
				}
			}
		}
		
		if (extra) {
			Leia(extra, context, results);
		}
		
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
		results.sort(sortOrder);
		for (var i = 1; i < results.length; i++) {
			if (results[i - 1] === results[i]) {
				results.splice(i, 1);
			}
		}
		
		return results;
	}
	
	Leia.find = function(expr, context) {
		var type, set;
		for (var i = 0, len = Leia.selectors.order.length; i < len; i++) {
			type = Leia.selectors.order[i];
			if ((match = Leia.selectors.match[type].exec(expr))) {
				set = Leia.selectors.find[type](match, context);
				
				if (set) {
					expr = expr.replace(Leia.selectors.match[type], '');
					break;
				}
			}
		}
		
		if (!set) {
			set = slice(context.getElementsByTagName('*'));
		}
		
		return { expr: expr, set: set };
	}
	
	Leia.filter = function(expr, set) {
		var expr2 = expr, match, bingo, item, results = [];
		while (expr && set.length) {
			for (var type in Leia.selectors.filter) {
				if ((match = Leia.selectors.match[type].exec(expr))) {
					if((item = set.shift())) {
						bingo = Leia.selectors.filter[type](item, match);
						if (bingo) {
							results.push(item);
							expr = expr.replace(Leia.selectors.match[type], '');
							break;
						}
					}			
				}
			}
		}
		
		return expr === expr2 ? set : results;
	}
	
	Leia.selectors = {
		order: ['ID', 'NAME', 'TAG'],
		match: {
			ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
			CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
			NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,
			ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
			TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,
			CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
			POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
			PSEUDO: /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
		},
		find: {
			ID: function(match) {
				var elem = document.getElementById(match[1]);
				return elem ? [elem]: [];
			},
			TAG: function(match, context) {
				var eles = context.getElementsByTagName(match[1]);
				return slice(eles);
			}
		},
		filter: {
			ID: function(elem, match) {
				return elem.id === match[1];
			},
			TAG: function(elem, match) {
				return (elem.nodeType === 1 && match[1] === '*') || elem.nodeName === match[1].toUpperCase();
			},
			CLASS: function(elem, match) {
				return (' ' + elem.className + ' ').indexOf(' ' + match[1] + ' ') !== -1;
			}
		},
		relative: {
			// 后代选择器
			// http://www.w3school.com.cn/css/css_selector_descendant.asp
			// http://www.w3.org/TR/css3-selectors/#descendant-combinators
			' ': function(set, expr) {
				for (var i = 0, len = set.length; i < len; i++) {
					var elem = set[i], 
						parent = elem.parentNode;
					while (parent) {
						var _set = Leia.filter(expr, [parent]);
						if (_set.length === 1) {
							break;
						}
						parent = parent.parentNode;
						if (!parent) {
							set[i] = false;
						}
					}
				}
			},
			// 父子选择器
			// http://www.w3school.com.cn/css/css_selector_child.asp
			// http://www.w3.org/TR/css3-selectors/#child-combinators
			'>': function() {
				
			}
		}
	}

	window.Leia = Leia;
 })();