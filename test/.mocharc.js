module.exports = {
  timeout: 20000,
  require: ["./test/hooks.js"],
  spec: [
    "./test/specs/configErrors.spec.mjs",
    "./test/specs/operations/*.spec.mjs"
  ]
};
