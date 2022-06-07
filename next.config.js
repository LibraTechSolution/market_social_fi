const withSvgr = require("next-svgr");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([withSvgr], {
  reactStrictMode: true,
  images: {
    deviceSizes: [],
    domains: [],
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
});
