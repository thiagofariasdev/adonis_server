const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin({
    filename: 'public/css/app.css'
})

function sassRules() {
    return [
        {
            test: /\.(sass|scss)$/,
            use: ExtractTextPlugin.extract(
                {
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
        }
    ]
}

function scriptRules() {
    return [
        {
            test: /\.js$/,
            exclude: [/node_modules/],
            loader: 'babel-loader',
            options: { presets: ['react', 'es2015'] }
        }
    ]
}

module.exports = {
    entry: [
        './resources/assets/js/app.js'
    ],
    output: {
        filename: '../public/js/app.js'
    },
    module: {
        rules: scriptRules()
    }
}