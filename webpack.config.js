// let path = require('path');

module.exports = {
    entry: './src/main.tsx',
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    resolve: {
        // Look for modules in .ts(x) files first, then .js(x)
        extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
        modulesDirectories: ['src', 'node_modules']
    },
    module: {
        loaders: [
            // .ts(x) files should first pass through the Typescript loader, and then through babel
            { test: /\.tsx?$/, loaders: ['babel', 'awesome-typescript-loader'] }
        ]
    }
}
