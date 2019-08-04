module.exports = {
	compact: false,
	presets: [
		[
			'@babel/preset-env',
			{
				loose: true,
				targets: {
					browsers: ['ie >= 11', 'safari > 10']
				}
			}
		],
		'@babel/preset-react',
		'@babel/typescript'
		// [
		// 	'@babel/typescript',
		// 	{
		// 		isTSX: true,
		// 		allExtensions: true
		// 	}
		// ]
	],
	plugins: [
		[
			'babel-plugin-inferno',
			{
				imports: true
			}
		],
		['@babel/plugin-proposal-class-properties', { loose: true }],
		['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
		['@babel/plugin-proposal-optional-chaining', { loose: true }],
		['@babel/plugin-proposal-private-methods', { loose: true }],
		['@babel/plugin-transform-flow-strip-types', { loose: true }]
	]
};
