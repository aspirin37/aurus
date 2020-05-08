const HtmlWebpackPlugin = require('html-webpack-plugin');
const { parse } = require('dotenv');
const fs = require('fs');

module.exports = {
  // eslint-disable-next-line consistent-return
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return ({
        plugins: [
          new HtmlWebpackPlugin({
            template: 'public/index.html',
            envConfig: '{ "JS_BUNDLE_RUNTIME_CONFIG": false }',
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true,
              collapseBooleanAttributes: true,
              removeScriptTypeAttributes: true,
            },
          }),
        ],
      });
    }
    if (process.env.NODE_ENV === 'development') {
      return ({
        plugins: [
          new HtmlWebpackPlugin({
            template: 'public/index.html',
            filename: 'index.html',
            inject: true,
            envConfig: JSON.stringify(parse(fs.readFileSync('.env'))),
          }),
        ],
      });
    }
  },
};
