const { getStoriesPaths } = require("slice-machine-ui/helpers/storybook");

module.exports = {
  stories: [
    `../.slicemachine/assets/slices/*/*.stories.js`,
    `../customtypes/**/*.stories.js`,
    "../components/**/*.stories.[tj]s",
  ],
  addons: ["@storybook/preset-scss"],
};
