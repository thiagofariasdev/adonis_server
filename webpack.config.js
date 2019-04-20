const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const extractSass = new ExtractTextPlugin({
    filename: '../public/[name]'
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
            exclude: [/node_modules/, /\.scss/g, /sass/g],
            loader: 'babel-loader',
            options: { presets: ['react', 'es2015'] }
        }
    ]
}

let paths = (type) => type == 'sass' ? './resources/assets/sass/' : './resources/assets/js/';

module.exports = {
    entry: {
        'js/app.js': paths('js') + 'app.js',
        'js/bootstrap.js': paths('js') + 'script/bootstrap.js',
        'js/fontawesome.js': paths('js') + 'script/fa.js',
        'js/jquery.js': paths('js') + 'script/jquery.js',
        'css/default.css': paths('sass') + 'default.scss',
        'css/bootstrap.css': paths('sass') + 'bootstrap.scss',
        'css/auth.css': paths('sass') + 'auth.scss',
        'css/app.css': paths('sass') + 'app.scss'
    },
    output: {
        filename: '../public/[name]'
    },
    module: {
        rules: scriptRules().concat(sassRules())
    },
    plugins: [
        extractSass
    ]
}