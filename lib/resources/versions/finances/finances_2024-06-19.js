module.exports = {
  '2024-06-19': {
    listTransactions: (req_params) => {
      return Object.assign(req_params, {
        method: 'GET',
        api_path: '/finances/2024-06-19/transactions',
        restore_rate: 2
      });
    }
  }
};
