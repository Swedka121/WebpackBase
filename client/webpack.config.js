const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require("webpack")

module.exports = (env) => {
    return {
        mode: env.mode ?? "development",
        entry: path.resolve(__dirname, "src", "index.js") ,
        output: {
            filename: "[name].[contenthash].js",
            path: path.resolve(__dirname, "dist"),
            clean:true,
        },
        plugins: [
            new HtmlWebpackPlugin({template: path.resolve(__dirname, "public", "index.html")}),
            new MiniCssExtractPlugin({filename: "[name].[contenthash].css"}),
            new webpack.ProgressPlugin()
        ], 
        module: {
            rules: [
                {
                    test: /\.(?:js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ]
                        }
                    },
                    resolve: {
                        extensions: ['.js', '.json', '.wasm'],
                      },
                },
                {
                    test: /\.(?:scss|sass)$/,
                    exclude: /node_modules/,
                    use: [MiniCssExtractPlugin.loader, "css-loader",  "sass-loader"],
                    resolve: {
                        extensions: ["scss"],
                    }
                }
            ]   
        },
        devServer: {
            port: env.port ?? 3000,
            open: true,
            hot:true,
            historyApiFallback: true,
        }

    }
}