module.exports = {
  dataKiosk: {
    __versions: ["2023-11-15"],
    __operations: [
      "getQueries",
      "createQuery",
      "getQuery",
      "cancelQuery",
      "getDocument"
    ],
    ...require("./versions/data_kiosk/dataKiosk_2023-11-15")
  }
};
