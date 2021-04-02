require("dotenv").config();
const webpack = require("webpack");
const withPwa = require('next-pwa');
const withOffline = require("next-offline");

module.exports = withOffline(withPwa({
  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    return config;
  },
  env: {
    URL: process.env.URL,
  },
  pwa: {
    dest: "public",
    register: true,
    scope: "/",
  },
  future: {
    webpack5: true,
  },
  workboxOpts: {
    swDest: process.env.NEXT_EXPORT
      ? "service-worker.js"
      : "public/sw.js",
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "offlineCache",
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/service-worker.js",
        destination: "/_next/service-worker.js",
      },
    ];
  },
}));

