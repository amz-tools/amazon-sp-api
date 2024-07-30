module.exports = {
  productPricing: {
    __versions: ["v0", "2022-05-01"],
    __operations: [
      "getPricing",
      "getCompetitivePricing",
      "getListingOffers",
      "getItemOffers",
      "getItemOffersBatch",
      "getListingOffersBatch",
      "getFeaturedOfferExpectedPriceBatch",
      "getCompetitiveSummary"
    ],
    ...require("./versions/product_pricing/productPricing_v0"),
    ...require("./versions/product_pricing/productPricing_2022-05-01")
  }
};
