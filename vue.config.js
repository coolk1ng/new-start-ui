module.exports = {
    devServer: {
        host: 'localhost',
        port: '8081',
        https: false,
        proxy: {
            '/': {
                target: 'http://localhost:3000',
                //发送请求头host会被设置target
                changeOrigin: true,
                ws: false,
                secure: false,
                pathRewrite: {
                    '^/': '/'
                }
            }
        }
    }
}
