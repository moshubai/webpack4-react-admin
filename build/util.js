const path = require("path")
const {
	basePath, srcDir
} = require('../project.config')
exports.resolve = dir => path.join(__dirname, '..', dir)
const inProject = path.resolve.bind(path, basePath)
exports.inProjectSrc = (file) => inProject(srcDir, file)
exports.babelLoader = {
	loader: 'babel-loader',
	options: {
		presets: [
			['@babel/preset-react'],
			['@babel/preset-env', {
				modules: false,
				loose: true,
				// useBuiltIns: "usage",
				targets: {
					ie: 9,
					browsers: [
						'last 5 versions',
						'safari >= 7',
						'not ie < 9'
					]
				}
			}
			],
		],
		plugins: [
			'@babel/plugin-syntax-dynamic-import',
			'@babel/plugin-proposal-export-default-from',
			[
				"@babel/plugin-transform-runtime",
				{
					"corejs": 2, // polyfill 需要使用@babel/runtime-corejs2
					"useBuildIns": "usage" //按需引入,即使用什么新特性打包什么新特性, 可以减小打包的体积
				}
			],
			['@babel/plugin-proposal-decorators', { legacy: true }],
			['@babel/plugin-proposal-class-properties', { loose: true }],
			// ['import', {
			//   libraryName: 'antd',
			//   libraryDirectory: 'es',
			//   style: 'css'
			// }]
		],

	}
}