const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const extractSass = new ExtractTextPlugin({
    filename: '../public/css/[name].css'
});


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
            exclude: [/node_modules/, /\.(sass|scss)/g],
            loader: 'babel-loader',
            options: { presets: ['react', 'es2015'] }
        }
    ]
}

module.exports = {
    entry: {
        app: './resources/assets/sass/app.scss',
        app: './resources/assets/js/app.js',
        loader: './resources/assets/js/loader.js',
        auth: './resources/assets/sass/auth.scss',
        bootstrap: './resources/assets/sass/bootstrap.scss',
        default: './resources/assets/sass/default.scss',
        popper: './node_modules/popper.js/dist/popper.js',
        jquery: './node_modules/jquery/dist/jquery.js'
    },
    output: {
        filename: '../public/js/[name].js'
    },
    module: {
        rules: scriptRules().concat(sassRules())
    },
    plugins: [
        extractSass
    ]
}