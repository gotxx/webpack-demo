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

exports.loadCSS = () => ({
    module: {
        rules: [
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
        ],
    },
});

exports.loadSASS = () => ({
    module: {
        rules: [
            { 
                test: /\.s[ac]ss$/i, 
                use: [
                    "style-loader", 
                    {
                        loader: "css-loader",
                        options: { importLoaders: 1 },
                    }, 
                    "sass-loader" 
                ],
            },
        ],
    },
});