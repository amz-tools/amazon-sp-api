// For a list of required and optional body, query or path parameters for resources please see official references:
// --> https://github.com/amzn/selling-partner-api-docs/tree/main/references

const {readdirSync} = require('fs');
const path = require('path');

module.exports = {
	...readdirSync(__dirname + '/resources').reduce((eps, ep) => {
		if (path.extname(ep) === '.js'){
			return Object.assign(eps, {
				...require('./resources/' + ep)
			});
		}
		return eps;
	}, {})
};