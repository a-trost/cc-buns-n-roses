const { getStoriesPaths } = require("slice-machine-ui/helpers/storybook");

module.exports = {
  stories: [...getStoriesPaths(), "../components/**/*.stories.[tj]s"],
  addons: ["@storybook/preset-scss"],
};
