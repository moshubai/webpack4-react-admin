const { basePath,srcDir } = require('../project.config')
const path = require("path")
exports.resolve = dir => path.join(__dirname, '..', dir)

const inProject = path.resolve.bind(path, basePath)
exports.inProjectSrc = (file) => inProject(srcDir, file)