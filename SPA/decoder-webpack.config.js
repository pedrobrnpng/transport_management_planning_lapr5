const merge = require("webpack-merge");
const path = require("path");

const decoderConfig = {
    target: "webworker",
    entry: {
        decoder: "./src/app/components/map/decoder.ts" //this file is responsible for kickstarting the workers
    },

    context: __dirname,
    devtool: "source-map",

    resolve: {
        extensions: [".webpack.js", ".web.ts", ".ts", ".tsx", ".web.js", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    configFile: path.join(process.cwd(), "tsconfig.json"),
                    onlyCompileBundledFiles: true,
                    transpileOnly: true,
                    compilerOptions: {
                        sourceMap: false,
                        declaration: false
                    }
                }
            }
        ]
    },
    output: {
        path: path.join(process.cwd(), "./"),
        filename: "[name].bundle.js"
    },
    performance: {
        hints: false
    },
    stats: {
        all: false,
        timings: true,
        exclude: "resources/",
        errors: true,
        entrypoints: true,
        warnings: true
    },
    mode: process.env.NODE_ENV || "development"
};

module.exports = decoderConfig;