const { withPlugins } = require("next-compose-plugins");

const nextConfig = { target: "serverless" };

const withTM = require("next-transpile-modules")(["next-slicezone"]);

module.exports = withPlugins([withTM()], nextConfig);
