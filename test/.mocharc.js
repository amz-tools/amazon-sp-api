module.exports = {
	timeout:20000,
	require:'./test/hooks.js',
	spec:['./test/specs/configErrors.spec.js', './test/specs/operations/*.spec.js']
};