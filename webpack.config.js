const { mode } = require("webpack-nano/argv");
const {
    MiniHtmlWebpackPlugin,
} = require("mini-html-webpack-plugin");
const { WebpackPluginServe: Serve } = require("webpack-plugin-serve");

module.exports = {
    watch: mode == "development",
    entry: ["./src", "webpack-plugin-serve/client"],
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    },
    mode,
    
    plugins: [
        new MiniHtmlWebpackPlugin({ context: { title: "Demo"} }),
        new Serve({
            host: "127.0.0.1",
            port: process.env.PORT || 8080,
            static: "./dist",
            // open: true,
            liveReload: true,
            waitForBuild: true,
            historyFallback: true,
        }),
    ],
};