const { parse } = require('dotenv');
const fs = require('fs');

const isProd = (process.env.NODE_ENV === 'production');
const isDev = (process.env.NODE_ENV === 'development');

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      ...(isProd && {
        envConfig: '{ "JS_BUNDLE_RUNTIME_CONFIG": false }',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          collapseBooleanAttributes: true,
          removeScriptTypeAttributes: true,
        },
      }),
      ...(isDev && {
        filename: 'index.html',
        inject: true,
        envConfig: JSON.stringify(parse(fs.readFileSync('.env'))),
      }),
    },
  },
};
