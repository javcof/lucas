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
		
		var html = '';
		html += '<div id="one"></div>';
		html += '<div id="two"></div>';
		html += '<div id="three"></div>';
		html += '<div id="four"></div>';
		html += '<div id="five"></div>';
		prepare(html);
		
		var elem, eles;
		elem = document.getElementById('three');
		
		eles = Lucas.siblings(elem);
		
		var expected = [];
		expected.push(document.getElementById('one'));
		expected.push(document.getElementById('two'));
		expected.push(document.getElementById('four'));
		expected.push(document.getElementById('five'));
		assert.deepEqual(eles, expected, '');
		
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
	
	function prepare(html) {
		var div = document.getElementById('data');
		div.innerHTML = html;
	}
	
	function clear() {
		var div = document.getElementById('data');
		div.innerHTML = '';
	}
});

