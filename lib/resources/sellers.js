module.exports = {
  sellers: {
    __versions: ['v1'],
    __operations: ['getMarketplaceParticipations', 'getAccount'],
    ...require('./versions/sellers/sellers_v1.js')
  }
};
