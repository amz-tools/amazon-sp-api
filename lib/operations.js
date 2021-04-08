// As the original design of the module (<= v0.3.7) didn't keep in mind the possibility of having more versions of the same endpoints
// and as a result different versions of the same operation, we had to replace original operation-only based calls to the API 
// with a new concept that includes endpoints and version-specific operation calls

// In order to prevent breaking changes we need this operation to endpoint mapping
module.exports = (endpoints) => {
	// Map the correct endpoint to the operation and return as key/value
	return {
		...Object.keys(endpoints).reduce((eps, ep) => {
			return Object.assign(eps, {
				...require('./resources/' + ep)[ep].__operations.reduce((ops, op) => {ops[op] = ep; return ops;}, {})
			});
		}, {})
	};
};