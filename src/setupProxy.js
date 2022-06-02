const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/char", {
      target: "https://lostark.game.onstove.com/Profile/Character",
      changeOrigin: true,
      pathRewrite: {
        "^/char": "",
      },
    })
  );
};
