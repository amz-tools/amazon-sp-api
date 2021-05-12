module.exports = {
  'v1':{
    submitInvoice:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/vendor/directFulfillment/payments/v1/invoices',
        restore_rate:0.1
      });
    }
  }
};