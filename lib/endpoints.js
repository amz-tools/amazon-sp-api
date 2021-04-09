// For a list of required and optional body, query or path parameters for resources please see official references:
// --> https://github.com/amzn/selling-partner-api-docs/tree/main/references

module.exports = {
	...require('./resources/aplusContent'),
	...require('./resources/authorization'),
	...require('./resources/catalogItems'),
	...require('./resources/fbaInboundEligibility'),
	...require('./resources/fbaInventory'),
	...require('./resources/fbaSmallAndLight'),
	...require('./resources/feeds'),
	...require('./resources/finances'),
	...require('./resources/fulfillmentInbound'),
	...require('./resources/fulfillmentOutbound'),
	...require('./resources/merchantFulfillment'),
	...require('./resources/messaging'),
	...require('./resources/notifications'),
	...require('./resources/orders'),
	...require('./resources/productFees'),
	...require('./resources/productPricing'),
	...require('./resources/reports'),
	...require('./resources/sales'),
	...require('./resources/sellers'),
	...require('./resources/services'),
	...require('./resources/shipping'),
	...require('./resources/solicitations'),
	...require('./resources/tokens'),
	...require('./resources/uploads')
};