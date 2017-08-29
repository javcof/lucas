$.ready(function() {
	
	test01();
	test02();
	test03();
	test04();
	test05();
	
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

