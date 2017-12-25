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
		assert.equal(Lucas.trim(' leftTrim'), 'leftTrim', 'left trim test.');
		assert.equal(Lucas.trim('rightTrim '), 'rightTrim', 'right trim test.');
		assert.equal(Lucas.trim(' leftRightTrim '), 'leftRightTrim', 'left and right trim test.');
		assert.equal(Lucas.trim('none Trim'), 'none Trim', 'none trim test.');
	});

	QUnit.test('Lucas events system test', function(assert) {
		// assert.expect(2);
		assert.equal((typeof Lucas.on), 'function', 'Lucas.on is a function.');

		var handler = function() {};
		Lucas.on(document, 'click', handler);

		var handlers = document.events['click'];
		assert.deepEqual(handlers[handler.$$guid], handler);

		Lucas.on(document, 'click', function() { console.log('click log 1'); });
		Lucas.on(document, 'click', function() { console.log('click log 2'); });
		Lucas.on(document, 'click', function() { console.log('click log 3'); });

		assert.equal(typeof Lucas.off, 'function', 'Lucas.off is a function.');

		Lucas.off(document, 'click', handler);
		assert.deepEqual(handlers[handler.$$guid], undefined);

		Lucas.off(document, 'click');
		handlers = document.events['click'];
		assert.deepEqual(handlers, undefined);

		Lucas.off(document);
		assert.deepEqual(document.events, undefined);

		assert.equal(typeof Lucas.trigger, 'function', 'Lucas.trigger is a function.');
		Lucas.on(document, 'custom', function() { console.log('custom log 1'); });
		Lucas.trigger(document, 'custom');

	});


	QUnit.test('Lucas on method test', function(assert) {
		var elem = document.getElementById('qunit-fixture-data'),
			handlers;

		assert.equal((typeof Lucas.on), 'function', 'Lucas.on is a function.');

		var oneHandler = function(e) {
			// one handler
		};

		// bind one handler twice
		Lucas.on(elem, 'custom', oneHandler);
		Lucas.on(elem, 'custom', oneHandler);

		handlers = elem.events['custom'];
		// TODO: optimize unit test
		assert.deepEqual(handlers[oneHandler.$$guid], oneHandler, 'bind elem custom type handlers only once.');
	});


	QUnit.test('Lucas matches method test', function(assert) {
		assert.equal(typeof Lucas.matches, 'function', 'Lucas matches is a function.');
		assert.equal(Lucas.matches(document.documentElement, 'html'), true, 'document.documentElement match html tag.');
		assert.equal(Lucas.matches(document, 'html'), false, 'document is not a Element, so return false.');
	});

	QUnit.test('Lucas add or remove class method test', function(assert) {
		var elem = Lucas.queryAll('#qunit-fixture-data')[0];
		assert.equal(typeof Lucas.addClass, 'function', 'Lucas addClass is a function.');

		Lucas.addClass(elem, 'otherClass');
		assert.equal(elem.className, 'otherClass', 'html.className equal "otherClass".');

		elem.className = 'noClass';
		Lucas.addClass(elem, 'otherClass');
		assert.equal(elem.className, 'noClass otherClass', 'html.calssName equal "noClass otherClass".');

		elem.className = 'preClass';
		Lucas.addClass(elem, 'pre');
		assert.equal(elem.className, 'preClass pre', 'html.className equal "preClass pre".');

		elem.className = 'midClass';
		Lucas.addClass(elem, 'idClas');
		assert.equal(elem.className, 'midClass idClas', 'html.className equal "miClass idClas".');

		elem.className = 'sufClass';
		Lucas.addClass(elem, 'ass');
		assert.equal(elem.className, 'sufClass ass', 'html.className equal "sufClass ass".');

		assert.equal(typeof Lucas.removeClass, 'function', 'Lucas removeClass is a function.');

		elem.className = 'myClass';
		Lucas.removeClass(elem, 'noClass');
		assert.equal(elem.className, 'myClass', 'html.className equal "myClass".');
		Lucas.removeClass(elem, 'myClass');
		assert.equal(elem.className, '', 'html.calssName equal "".');

		elem.className = 'noClass myClass';
		Lucas.removeClass(elem, 'noClass');
		assert.equal(elem.className, 'myClass', 'html.className equal "myClass".');

		elem.className = 'noClass myClass';
		Lucas.removeClass(elem, 'myClass');
		assert.equal(elem.className, 'noClass', 'html.className equal "noClass".');

		elem.className = 'preClass';
		Lucas.removeClass(elem, 'pre');
		assert.equal(elem.className, 'preClass', 'html.className equal "preClass".');

		elem.className = 'midClass';
		Lucas.removeClass(elem, 'idClas');
		assert.equal(elem.className, 'midClass', 'html.className equal "midClass".');

		elem.className = 'sufClass';
		Lucas.removeClass(elem, 'ass');
		assert.equal(elem.className, 'sufClass', 'html.className equal "sufClass".');
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
