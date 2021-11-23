const { WebpackPluginServe: Serve } = require("webpack-plugin-serve");

const {
    MiniHtmlWebpackPlugin,
} = require("mini-html-webpack-plugin");

exports.devServer = () => ({
    watch: true,
    plugins: [
        new Serve({
            host: "127.0.0.1",
            port: process.env.PORT || 8080,
            static: "./dist", // Expose if output.path changes
            // open: true,
            liveReload: true,
            waitForBuild: true,
            historyFallback: true,
        }),
    ],
});

exports.debugStats = () => ({
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true,
    },
});

exports.page = ({ title }) => ({
    plugins: [new MiniHtmlWebpackPlugin({ context: { title } })]
});