const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

// условный девсервер, прод или дев
const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          hot: true,
          port: 8080,
          static: path.join(__dirname, 'public'),
          // такой штуки на трансляции не было, не работал hot reload при изменении в стилях и html
          watchFiles: ['src/**/*.scss', 'src/**/*.html'],
        },
      };

// условный ESLint, при разработке он отключен, чтобы не мешал
const esLintPlugin = (isDev) =>
  isDev ? [] : [new ESLintPlugin({ extensions: ['js'] })];

module.exports = ({ develop }) => ({
  mode: develop ? 'development' : 'production',
  devtool: develop ? 'inline-source-map' : false, // мапы для дебага чтоли
  entry: {
    app: './src/js/index.js', // app выглядит как префикс, для js, assets и css
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', // захешированный js
    // для медиа
    // assetModuleFilename: 'assets/[name][ext]',
    // hash - это нужно чтобы отслеживать изменения в файлах, чтобы новые файлы попадали в кэш, а не брались старые
    // без хэша, все будет кэшировано и изменения никто не увидит, так как возьмется все из кэша
    // хэш не изменится, если изменений в файле не было
    assetModuleFilename: 'assets/[hash][ext]',
  },
  module: {
    rules: [
      {
        // медиа, без лоадера, в 5 вебпаке встроено
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i, // шрифты, inline = внутри html'ки
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    // чтобы не указывать расширения в импортах
    extensions: ['.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: "Webpack" //создает базовый index.html в dist
      template: './src/index.html', // берем уже наш
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    // просто копирует файлы, видимо не дает вебпаку их минимизровать, или делать что-то с ними еще
    new CopyPlugin({
      // ругается если папка паблик пустая, коментим его, тогда
      patterns: [{ from: './public' }],
    }),
    // очищает папку dist, хз зачем, без очистки ассетов
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    ...esLintPlugin(develop),
    new FaviconsWebpackPlugin({
      logo: './src/assets/favicons/favicon.jpg',
      prefix: 'assets/favicons/',
      inject: true,
      favicons: {
        appName: 'nonograms',
        appDescription: 'nonograms',
        developerName: 'VK',
        icons: {
          appleStartup: false,
        },
      },
    }),
  ],
  ...devServer(develop),
});
