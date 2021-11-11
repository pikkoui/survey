const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: path.join(__dirname, "src", "index.js"),
    devServer: {
        hot: true
      },
  output: {
    path:path.resolve(__dirname, "dist"),
      filename: "bundled.js"
  },
  module: {
    rules: [
    {
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: "babel-loader",
				options: {
                    presets: ["@babel/env","@babel/preset-react"],
					plugins: [
						[
							"@babel/plugin-proposal-class-properties",]

					],
                    cacheDirectory: true,
				}
			},
        			{
				test: /\.(svg|png|jpg)$/,
				loader: 'file-loader'
			},
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],

      },
      //   {
      //   test: /\.[jt]sx?$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: require.resolve('babel-loader'),
      //       options: {
      //         plugins: [true && require.resolve('react-refresh/babel')].filter(Boolean),
      //       },
      //     },
      //   ],
      // },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }), new ReactRefreshWebpackPlugin({
  overlay: false,
})],
}
