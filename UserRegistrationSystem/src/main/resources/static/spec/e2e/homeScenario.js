describe('Given view home which has info bar', function() {
	describe('When user navigate to home page', function() {
	var infoCon = element(by.css('#welcomeCon'))
	var regBox = element(by.css('#regBox'));
	var listBox = element(by.css('#listBox'));
	beforeEach(function() {
		browser.get('#!/home');
		expect(infoCon.isPresent()).toBeTruthy();
	});
	it('Then registration box message is present', function() {
		expect(regBox.isPresent()).toBeTruthy();
	});
	it('Then list  ', function() {
		expect(listBox.isPresent()).toBeTruthy();
	});
	});
});