require('dotenv').config({path:__dirname + '/.env.test'});

module.exports = {
	region:process.env.REGION,
	refresh_token:process.env.REFRESH_TOKEN,
	app_client:{
		id:process.env.SELLING_PARTNER_APP_CLIENT_ID,
		secret:process.env.SELLING_PARTNER_APP_CLIENT_SECRET
	},
	aws_user:{
		id:process.env.AWS_ACCESS_KEY_ID,
    secret:process.env.AWS_SECRET_ACCESS_KEY,
    role:process.env.AWS_SELLING_PARTNER_ROLE
	},
  marketplace_id:process.env.MARKETPLACE_ID,
  asin:process.env.ASIN,
  asin2:process.env.ASIN2,
  sku:process.env.SKU,
  sku2:process.env.SKU2,
  country_code:process.env.COUNTRY_CODE,
  currency_code:process.env.CURRENCY_CODE,
  order_id:process.env.ORDER_ID,
  seller_id:process.env.SELLER_ID
};