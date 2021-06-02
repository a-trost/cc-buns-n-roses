module.exports = {
  stories: [
    "../slices/**/*.stories.[tj]s",
    "../.slicemachine/assets/slices/**/*.stories.[tj]s",
    "../components/**/*.stories.[tj]s",
  ],
  addons: ["@storybook/preset-scss"],
};
