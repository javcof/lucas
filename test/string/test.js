$.ready(function() {

	QUnit.test('Lucas.trim()', function(assert) {
		assert.equal('android', Lucas.trim(' android'), 'Lucas.trim(" android") equals android');
		assert.equal('android', Lucas.trim('android '), 'Lucas.trim("android ") equals android');
		assert.equal('android', Lucas.trim(' android '), 'Lucas.trim(" android ") equals android');
	});
});

