const path = require('path')
const webpack = require('webpack')
const {
    env, basePath, externals, main,
    publicPath, globals, outDir, srcDir,
    sourcemaps
} = require('../project.config')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const HappyPack = require('happypack')
const os = require('os')







