$.ready(function() {

	QUnit.test('Lucas', function(assert) {

		var actual, expected,
			data = document.getElementById('data');

		var red = document.createElement('div'),
			blue = document.createElement('div');

		red.className = 'red';
		blue.className = 'blue';

		data.appendChild(red);
		data.appendChild(blue);

		Lucas.show([red, blue]);
		assert.equal(red.style.display, 'block', 'E display block');
		assert.equal(blue.style.display, 'block', 'E display block');

		Lucas.hide([red, blue]);
		assert.equal(red.style.display, 'none', 'E display none');
		assert.equal(blue.style.display, 'none', 'E display none');

		data.removeChild(red);
		data.removeChild(blue);
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

	QUnit.test('Lucas.trim()', function(assert) {
		assert.equal('android', Lucas.trim(' android'), 'Lucas.trim(" android") equals android');
		assert.equal('android', Lucas.trim('android '), 'Lucas.trim("android ") equals android');
		assert.equal('android', Lucas.trim(' android '), 'Lucas.trim(" android ") equals android');
	});

	/*
	QUnit.test('Lucas.event', function(assert) {

	});
	*/

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
