const path = require("path")
const {
    basePath
} = require('../project.config')
exports.resolve = dir => path.join(__dirname, '..', dir)
const inProject = path.resolve.bind(path, basePath)
exports.inProjectSrc = (file) => inProject(srcDir, file)

const plugList = [];
[
    ['woff', 'application/font-woff'],
    ['woff2', 'application/font-woff2'],
    ['otf', 'font/opentype'],
    ['ttf', 'application/octet-stream'],
    ['eot', 'application/vnd.ms-fontobject'],
    ['svg', 'image/svg+xml'],
].forEach((font) => {
    const extension = font[0]
    const mimetype = font[1]
    plugList.push({
        test: new RegExp(`\\.${extension}$`),
        loader: 'url-loader',
        options: {
            name: 'fonts/[name]-[hash].[ext]',
            limit: 10000,
            mimetype,
        },
    })
})

exports.plugList