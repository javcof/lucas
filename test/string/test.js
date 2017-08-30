$.ready(function() {

	testTrim();

	function testTrim() {
		var expected = Lucas.trim(' ios');
		if (expected === 'ios') {
			console.log('Test Passed.');
		} else {
			console.log('Test Failed.');
		}
		
		expected = Lucas.trim('ios ');
		if (expected === 'ios') {
			console.log('Test Passed.');
		} else {
			console.log('Test Failed.');
		}
		
		expected = Lucas.trim(' ios ');
		if (expected === 'ios') {
			console.log('Test Passed.');
		} else {
			console.log('Test Failed.');
		}
	}
});

