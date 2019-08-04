const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
	console.log(env);
	console.log(argv);
	return {
		mode: argv.mode || 'development',
		devtool: "source-map",
		entry: {
			inferno: "./src/index.inferno.tsx",
			// react: "./src/index.react.tsx"
		},
		output: {
			path: __dirname + "/dist"
		},
		resolve: {
			alias: {
				inferno:
					argv.mode == "production"
						? "inferno/dist/inferno.min.js"
						: "inferno/dist/index.dev.esm.js",
				vue:
					argv.mode == "production" ? "vue/dist/vue.min.js" : "vue/dist/vue.js"
			},
			extensions: [".js", ".jsx", ".ts", ".tsx"]
		},
		performance: {
			hints: false
		},
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: [
						"style-loader", // creates style nodes from JS strings
						"css-loader", // translates CSS into CommonJS
						"sass-loader" // compiles Sass to CSS, using Node Sass by default
					]
				},
				{
					test: /\.css$/,
					use: [
						"style-loader", // creates style nodes from JS strings
						"css-loader" // translates CSS into CommonJS
					]
				},
				{
					test: /.*?\.(js|jsx|tsx|ts)$/, // All ts and tsx files will be process by
					loaders: "babel-loader", // first babel-loader, then ts-loader
					exclude: /node_modules\/(?!@inverso|inverso|similo)/, // ignore node_modules
					options: {
						cacheDirectory: true
					}
				}
			]
		},
		devServer: {
			contentBase: "src/",
			historyApiFallback: true
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: "./src/index.html",
				inject: "body"
			}),
			new CleanWebpackPlugin({
				verbose: true
			})
		]
	};
};
