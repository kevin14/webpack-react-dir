var path = require("path");
var nodeModulesPath = path.resolve(__dirname, "node_modules");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    entry: {
        activity: "./src/pages/activity/entry",
        home: "./src/pages/home/entry"
    },
    output: {
        path: path.join(__dirname, "./src/pages/"),
        filename: "[name]/bundle.js"
    },
    resolve: {
        alias: {
            common: path.join(__dirname,"./src/common"),
            commonStyles: path.join(__dirname,"./src/common/styles"),
            commonModules: path.join(__dirname,"./src/common/modules"),
            commonMixins: path.join(__dirname,"./src/common/mixins"),
        }
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.less$/,
            loader: "style!css!less"
        }, {
            test: /\.jsx?$/,
            exclude: [nodeModulesPath],
            loader: 'babel',
            query: {
                presets: ['es2015', 'react'],
            }
        }]
    },
    plugins: [

    ]
};
