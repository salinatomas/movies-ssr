require("ignore-styles");

require("@babel/polyfill"); // async await

require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

require("asset-require-hook")({
  extensions: ["jpg", "png", "gif"],
  name: "/assets/[hash].[ext]",
});

require("./src/server/server");
