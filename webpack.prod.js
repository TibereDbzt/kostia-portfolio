const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
    root: path.join(__dirname, '/'),
    src: path.join(__dirname, '/src'),
    dist: path.join(__dirname, '/dist'),
};

new webpack.EnvironmentPlugin(['NODE_ENV']);

let config = {

    mode: 'production',

    entry: './src/scripts/main.js',

    output: {
      path: PATHS.dist,
      filename: 'scripts/main.js',
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
              },
            {
                test: /\.sass$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            ctx: {
                                env: 'production'
                            }
                        }
                    }
                }, 'sass-loader']
            },
            // {
      //   test: /\.(jpe?g|png|gif|svg)$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10 * 1024
      //   }
      // },
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-url-loader',
      //   options: {
      //     limit: 10 * 1024,
      //     noquotes: true,
      //   }
      // },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:6].[ext]',
              emitFile: true,
              esModule: false,
              enforce: 'pre'
            }
          },
          // {
          //   loader: 'webp-loader',
          //   options: {
          //     quality: 100
          //   }
          // }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              esModule: false,
            },
          }
        ]
      },
        ]
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: `style.css`
      })
    ]
};

module.exports = config;