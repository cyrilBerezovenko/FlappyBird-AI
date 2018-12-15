module.exports = {
    context: "G:\\WebStormProjects\\bird",
    devtool: "source-map",
    mode: "development",
    entry: ".\\src\\js\\generation_runner.js",
    output: {
        path: "G:\\WebStormProjects\\bird\\dist",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude:/node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};