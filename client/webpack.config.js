const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        chunks: ['main']
      }),
      new WebpackPwaManifest({
        name: 'Text editor',
        short_name: 'Text editor',
        description: 'An application that allows text editor',
        background_color: '#01579b',
        theme_color: 'pink',
        'theme-color': 'blue',
        start_url: '/',
        display: 'standalone',
        fingerprints: false,
        inject: false,
        icons: [
          {
            src: path.resolve('src/images/icons/icon-192x192.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons')
          }
        ]
      }),
      new InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'sw.js'
      })
    ]
  };
};
