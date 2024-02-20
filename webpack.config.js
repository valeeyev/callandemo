// webpack.config.js
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => {
  const isProduction = env.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    watch: true,
    plugins: [
      new Dotenv(), // Load environment variables from .env
    ],
  };
};
