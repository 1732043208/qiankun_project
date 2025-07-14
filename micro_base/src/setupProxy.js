const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/sub-vue',
        createProxyMiddleware({
            target: 'http://localhost:3002',
            changeOrigin: true,
        })
    );

    app.use(
        '/sub-arco',
        createProxyMiddleware({
            target: 'http://localhost:5173',
            changeOrigin: true,
        })
    );
};