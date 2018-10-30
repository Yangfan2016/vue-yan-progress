const path = require('path');
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    mode: "production",
    entry: {
        "YanProgress": path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].min.js',
        publicPath: "./dist/",
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // 模板编译过程中，编译器可以将某些特性转换为 require 调用
                    transformAssetUrls: {
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href' // SVG
                    }
                },
                // 只命中src目录里的js文件，加快 Webpack 搜索速度
                include: path.resolve(__dirname, "./src"),
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                ],
                // 只命中src目录里的js文件，加快 Webpack 搜索速度
                include: path.resolve(__dirname, "./src/"),
            },
            {

                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    plugins: [
        // vue-loader **这个插件是必须的！**它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。
        new VueLoaderPlugin
    ],
    resolve: {
        extensions: ['.js', '.vue'],
    },
};
