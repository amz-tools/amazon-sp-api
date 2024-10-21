module.exports = {
  applicationManagement: {
    __versions: ["2023-11-30"],
    __operations: ["rotateApplicationClientSecret"],
    ...require("./versions/application_management/applicationManagement_2023-11-30")
  }
};
