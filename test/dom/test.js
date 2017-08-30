/*
** Lucas.getElementsByClassName(names, context)
*/
$.ready(function() {
	prepare();
	
	test01();
	test02();
	test03();
	test04();
	test05();
	
	clear();
	
	function prepare() {
		var body = document.getElementsByTagName('body')[0];
		var html = '';
		html += '<div class="red"></div>';
		html += '<div class="blue"></div>';
		html += '<div class="red blue"></div>';
		html += '<div class="yellow"></div>';
		body.innerHTML = html;
	}
	
	function clear() {
		var body = document.getElementsByTagName('body')[0];
		body.innerHTML = '';
	}
	
	function test01() {
		var flag = false;
		var eles = Lucas.getElementsByClassName('red');
		for (var i = 0; i < eles.length; i++) {
			if (eles[0].className === 'red') {
				flag = true;
			} else {
				flag = false;
				break;
			}
		}
		if (flag) {
			console.log('Test Passed.');
		} else {
			console.log('Test Failed.');
		}
	}
	
	function test02() {
		var flag = false;
		var eles = Lucas.getElementsByClassName('red blue');
		for (var i = 0; i < eles.length; i++) {
			if (eles[0].className === 'red blue') {
				flag = true;
			} else {
				flag = false;
				break;
			}
		}
		if (flag) {
			console.log('Test Passed.');
		} else {
			console.log('Test Failed.');
		}
	}
	
	function test03() {
		var flag = false;
		var eles = Lucas.getElementsByClassName('blue red');
		for (var i = 0; i < eles.length; i++) {
			if (eles[0].className === 'red blue') {
				flag = true;
			} else {
				flag = false;
				break;
			}
		}
		if (flag) {
			console.log('Test Passed.');
		} else {
			console.log('Test Failed.');
		}
	}
	
	function test04() {
		var flag = false;
		var eles = Lucas.getElementsByClassName('');
		if (eles.length === 0) {
			console.log('Test Passed.');
		} else {
			console.log('Test Failed.');
		}
	}
	
	function test05() {
		var flag = false;
		var eles = Lucas.getElementsByClassName('black');
		if (eles.length === 0) {
			console.log('Test Passed.');
		} else {
			console.log('Test Failed.');
		}
	}
});

/*
** Lucas.querySelector(selectors, context)
*/
$.ready(function() {
	prepare();
	
	test01();
	test02();
	test03();
	test04();
	
	clear();
	
	function prepare() {
		var body = document.getElementsByTagName('body')[0];
		var html = '';
		html += '<div id="apple"></div>';
		html += '<div id="pen"></div>';
		html += '<div class="red"></div>';
		html += '<div class="blue"></div>';
		body.innerHTML = html;
	}
	
	function clear() {
		var body = document.getElementsByTagName('body')[0];
		body.innerHTML = '';
	}
	
	function test01() {
		var flag = false;
		var elem = Lucas.querySelector('#apple');
		
		if (elem.id === 'apple') {
			console.log('Test Passed.');
		} else {
			console.log('Test Failed.');
		}
		
		var elem = Lucas.querySelector('#orange');
		if (elem === null) {
			console.log('Test Passed.');
		} else {
			console.log('Test Failed.');
		}
		
		var elem = Lucas.querySelector('#orange, #apple');
		if (elem.id === 'apple') {
			console.log('Test Passed.');
		} else {
			console.log('Test Failed.');
		}
	}

	function test02() {
		var flag = false;
		var elem = Lucas.querySelector('.red');
		
		if (elem.className === 'red') {
			console.log('Test Passed.');
		} else {
			console.log('Test Failed.');
		}
	}
	
	function test03() {
		var flag = false;
		var elem = Lucas.querySelector('.yellow');
		
		if (!elem) {
			console.log('Test Passed.');
		} else {
			console.log('Test Failed.');
		}
	}
	
	function test04() {
		var flag = false;
		var elem = Lucas.querySelector('body');
		
		if (elem.tagName === 'BODY') {
			console.log('Test Passed.');
		} else {
			console.log('Test Failed.');
		}
	}
});

