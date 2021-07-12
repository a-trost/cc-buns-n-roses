const { withPlugins } = require("next-compose-plugins");

const nextConfig = {
  target: "serverless",
  test: /\.(glb|gltf)$/,
  use: {
    loader: "file-loader",
  },
};

const withTM = require("next-transpile-modules")(["next-slicezone"]);

module.exports = withPlugins([withTM()], nextConfig);

// module.exports = withCSS(
//   withSass({
//     webpack(config, options) {
//       config.module.rules.push({
//         test: /\.(glb|gltf)$/,
//         use: {
//           loader: "file-loader",
//         },
//       });
//       return config;
//     },
//   })
// );
