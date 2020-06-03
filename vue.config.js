const { parse } = require('dotenv');
const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProd = (process.env.NODE_ENV === 'production');
const isDev = (process.env.NODE_ENV === 'development');

const outputDir = 'dist';
const outputApp = `${outputDir}/app`;

module.exports = {
  lintOnSave: true,
  outputDir: outputApp,
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
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '.env.example'),
            to: './',
            toType: 'dir',
          },
          {
            from: path.resolve(__dirname, 'build/dotenv.sh'),
            to: './',
            toType: 'dir',
          },
        ],
      }),
    ],
  },
  chainWebpack: (config) => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end()
      .use('yaml')
      .loader('yaml-loader')
      .end();
  },
  transpileDependencies: [
    'vuetify',
  ],
};
