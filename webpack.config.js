const path = require('path');
const globule = require('globule');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {HtmlWebpackSkipAssetsPlugin} = require('html-webpack-skip-assets-plugin');

const assignPlugins = (env) => {
  const globuleFiles = ['**/*.tsx', '!**/_*.tsx', '!**/components/**/*.tsx'];

  /** grep'ed tsx file */
  const templateFiles = globule.find([...globuleFiles], {cwd: `${__dirname}/src/pages`});

  /** Create object containing entry files */
  const entriesList = templateFiles.reduce((temp, current) => {
    temp[`${current.replace(new RegExp(`.tsx`, 'i'), `.html`)}`] = `${__dirname}/src/pages/${current}`;
    return temp;
  }, {});

  const assignObject = { plugins: [] };
  for (const [htmlFileName, tempFileName] of Object.entries(entriesList)) {
    assignObject.plugins.push(new HtmlWebpackPlugin({
      filename: htmlFileName,
      template: tempFileName
    }));
    env.WEBPACK_BUILD && assignObject.plugins.push(new HtmlWebpackSkipAssetsPlugin({ excludeAssets: [/entry.js/] }));
  }

  return assignObject;
};

module.exports = (env) => (
  Object.assign({
    entry: './src/entry',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'entry.js'
    },
    devtool: false,
    watchOptions: {
      ignored: /node_modules/
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx$/,
          use: [
            {
              loader: 'esbuild-loader',
              options: {
                loader: 'tsx',
              }
            }
          ]
        },
      ],
    },
    devServer: {
      port: 8080,
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      watchFiles: [
        'src/**/*.tsx'
      ],
    },
  }, assignPlugins(env))
);