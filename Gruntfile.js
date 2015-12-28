module.exports = function(grunt) {

    //package version of project: exp:1.0
    var packageVersion = '1.0'

    var glob = require("glob");
    var path = require("path");
    var webpack = require('webpack');
    var webpackDir = path.join(__dirname,'./src');
    var webpackProductionDir = path.join(__dirname,"./dist/"+packageVersion);

    var webpackConfig = (function() {
        var entryArray = glob.sync(webpackDir+"/pages/*/entry.js");
        var nodeModulesPath = path.resolve(__dirname, "node_modules");
        var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
        var ExtractTextPlugin = require("extract-text-webpack-plugin");
        var entries = {};
        entryArray.forEach(function(entry) {
            var name = entry.split('pages/')[1].split('/entry.js')[0];
            entries[name] = entry
        })
        var productionEntries = Object.create(entries);
        productionEntries.commons = ['jquery','react','react-dom','commonModules/header/header.js'];
        return {
            dev:{
                entry: entries,
                watch: true,
                keepalive: true,
                stats: {
                    timings: true
                },
                failOnError: false,
                output: {
                    path: path.join(webpackDir, "pages/"),
                    filename: "[name]/bundle.js"
                },
                resolve: {
                    alias: {
                        common: path.join(webpackDir, "common"),
                        commonStyles: path.join(webpackDir, "common/styles"),
                        commonModules: path.join(webpackDir, "common/modules"),
                        commonMixins: path.join(webpackDir, "common/mixins")
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
                    }, {
                        test: /\.(png|jpg|gif)$/,
                        loader: 'url'
                    }]
                },
                plugins: [
                    new webpack.ProvidePlugin({
                        $: "jquery",
                        jQuery: "jquery",
                        "window.jQuery": "jquery"
                    })
                ]
            },
            production:{
                entry: productionEntries,
                output: {
                    path: path.join(webpackProductionDir, "pages/"),
                    filename: "[name]/bundle.js"
                },
                resolve: {
                    alias: {
                        common: path.join(webpackProductionDir, "common"),
                        commonStyles: path.join(webpackProductionDir, "common/styles"),
                        commonModules: path.join(webpackProductionDir, "common/modules"),
                        commonMixins: path.join(webpackProductionDir, "common/mixins")
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
                    }, {
                        test: /\.(png|jpg|gif)$/,
                        loader: 'url'
                    }]
                },
                plugins: [
                    new webpack.ProvidePlugin({
                        $: "jquery",
                        jQuery: "jquery",
                        "window.jQuery": "jquery"
                    }),
                    new webpack.optimize.UglifyJsPlugin({minimize: true}),
                    new CommonsChunkPlugin({
                        name:"commons",
                        filename:"commons.js",
                        minChuncks:Infinity
                    })
                ]
            }
        };
    })();

    grunt.initConfig({
        clean: {
            webpack: [webpackProductionDir]
        },
        copy: {
            webpackHtmlFiles: {
                expand: true,
                cwd: "./src",
                src: "**/*",
                dest: webpackProductionDir
            }
        },
        processhtml:{
            dist : {
                files: [{
                    expand: true,
                    cwd: webpackProductionDir,
                    src: ["**/*.html"],
                    dest: webpackProductionDir,
                    ext: '.html'
                }]
            }
        },
        webpack:{
            dev: webpackConfig.dev,
            production:webpackConfig.production
        }
    });


    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-webpack");
   
    grunt.registerTask("webpackDev", ["webpack:dev"])

    grunt.registerTask("wpack",["clean:webpack","copy:webpackHtmlFiles","processhtml:dist","webpack:production"])

};
