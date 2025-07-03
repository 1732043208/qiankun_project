const packageName = require('./package.json').name;

module.exports = {
  webpack: {
    configure: (config) => {
      config.output.library = `${packageName}-[name]`;
      config.output.libraryTarget = 'umd';
      config.output.chunkLoadingGlobal = `webpackJsonp_${packageName}`;
      config.output.globalObject = 'window';
      return config;
    },
  },
};