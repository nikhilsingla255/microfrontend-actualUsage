const { merge } = require('webpack-merge');
//merge is a function that is used to merge two different webpack config objects
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes :{
                './MarketingApp' : './src/bootstrap'
            },
            // shared: ['react' , 'react-dom'],
            shared: packageJson.dependencies,
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};
module.exports = merge(commonConfig, devConfig);