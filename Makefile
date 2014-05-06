
lesson2:
	mocha verify -R spec -g 'Add jade preprocessor to the mini-harp app'
	mocha verify -R spec -g 'Add less preprocessor to the mini-harp app'
	mocha verify -R spec -g 'Implement less template rendering'
	mocha verify -R spec -g 'Implement jade template rendering'
	mocha verify -R spec -g 'Should not respond to .jade or .less'
	mocha verify -R spec -g 'Set content type for .jade or .less'
	mocha verify -R spec -g 'No chunked transfer for .jade or .less'
	mocha verify -R spec -g 'The root path should render index.html'
