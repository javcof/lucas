$.ready(function() {
	
	QUnit.test('Lucas.show()', function(assert) {
		
		var html = '';
		html += '<div class="red"></div>';
		html += '<div class="red"></div>';
		prepare(html);
		
		var eles;
		eles = Lucas.getElementsByClassName('red');
		
		Lucas.show(eles);
		assert.equal(eles[0].style.display, 'block', '');
		assert.equal(eles[1].style.display, 'block', '');
		
		clear();
	});
	
	QUnit.test('Lucas.hide()', function(assert) {
		
		var html = '';
		html += '<div class="red"></div>';
		html += '<div class="red"></div>';
		prepare(html);
		
		var eles;
		eles = Lucas.getElementsByClassName('red');
		
		Lucas.hide(eles);
		assert.equal(eles[0].style.display, 'none', '');
		assert.equal(eles[1].style.display, 'none', '');
		
		clear();
	});
	
	QUnit.test('Lucas.siblings()', function(assert) {
		
		var one = document.createElement('div');
		one.id = 'one';
		
		var two = document.createElement('div');
		two.id = 'two';
		
		var three = document.createElement('div');
		three.id = 'three';
		
		var four = document.createElement('div');
		four.id = 'four';
		
		var five = document.createElement('div');
		five.id = 'five';

		prepare([one, two, three, four, five]);

		var eles = Lucas.siblings(three);
		assert.deepEqual(eles, [one , two, four, five], '');
		
		clear();
	});
	
	QUnit.test('Lucas.getElementsByClassName()', function(assert) {
		
		var html = '';
		html += '<div class="red"></div>';
		html += '<div class="blue"></div>';
		html += '<div class="red blue"></div>';
		html += '<div class="yellow"></div>';
		html += '<div class="black"><span></span></div>';
		prepare(html);
		
		var eles;
		eles = Lucas.getElementsByClassName('red');
		assert.equal(eles[0].className, 'red', '');
		assert.equal(eles[1].className, 'red blue', '');
		
		eles = Lucas.getElementsByClassName('red blue');
		assert.equal(eles[0].className, 'red blue', '');
		
		eles = Lucas.getElementsByClassName('blue red');
		assert.equal(eles[0].className, 'red blue', '');
		
		eles = Lucas.getElementsByClassName('');
		assert.equal(eles.length, 0, '');
		
		eles = Lucas.getElementsByClassName('');
		assert.equal(eles.length, 0, '');
		
		clear();
	});
	
	QUnit.test('Lucas.querySelector()', function(assert) {
		
		var html = '';
		html += '<div id="apple"></div>';
		html += '<div id="pen"></div>';
		html += '<div class="red"></div>';
		html += '<div class="blue"></div>';
		html += '<div id="color"><div class="blue"></div></div>';
		html += '<div class="color"><div class="blue"></div></div>';
		prepare(html);
		
		var elem;
		elem = Lucas.querySelector('#apple');
		assert.deepEqual(elem.id, 'apple', '');
		
		elem = Lucas.querySelector('#orange');
		assert.equal(elem, null, '');
		
		elem = Lucas.querySelector('#apple,#orange');
		assert.equal(elem.id, 'apple', '');
		
		elem = Lucas.querySelector('#orange,#apple');
		assert.equal(elem.id, 'apple', '');
		
		elem = Lucas.querySelector('.red');
		assert.equal(elem.className, 'red', '');
		
		elem = Lucas.querySelector('.yellow');
		assert.equal(elem, null, '');
		
		elem = Lucas.querySelector('body');
		assert.equal(elem.tagName, 'BODY', '');
		
		elem = Lucas.querySelector('#color .blue');
		assert.equal(elem.parentElement.id, 'color', '');
		assert.equal(elem.className, 'blue', '');
		
		elem = Lucas.querySelector('.color .blue');
		assert.equal(elem.parentElement.className, 'color', '');
		assert.equal(elem.className, 'blue', '');
		
		clear();
	});
	
	function prepare(data) {
		var div = document.getElementById('data');
		if (typeof data === 'string') {
			div.innerHTML = data;
			return;
		}
		
		for (var i = 0; i< data.length; i++) {
			div.appendChild(data[i]);
		}
	}
	
	function clear() {
		var div = document.getElementById('data');
		div.innerHTML = '';
	}
});

