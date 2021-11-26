const { WebpackPluginServe: Serve } = require("webpack-plugin-serve");
const {
    MiniHtmlWebpackPlugin,
} = require("mini-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

exports.extractCSS = ({ options = {}, loaders = [] } = {}) => {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader, options },
                        "css-loader",
                    ].concat(loaders),
                    siedEffects: true,
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "css/[name].css",
            })
        ],
    };
};

exports.extractSASS = ({ options = {}, loaders = [] } = {}) => {
    return {
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        { loader: MiniCssExtractPlugin.loader, options },
                        "css-loader",
                        "sass-loader",
                    ].concat(loaders),
                    sideEffects: true,
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "css/[name].css",
            })
        ],
    };
};

exports.devServer = () => ({
    watch: true,
    plugins: [
        new Serve({
            host: "127.0.0.1",
            port: process.env.PORT || 8080,
            static: "./dist", // Expose if output.path changes
            open: true,
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
                        options: { 
                            importLoaders: 1 //change the value accordingly, if there will be more then 1 loader before css-loader
                        }, 
                    }, 
                    "sass-loader",
                ],
            },
        ],
    },
});