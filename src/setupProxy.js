const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("???");

  app.use(
    "/api", // 프록시할 API 경로
    createProxyMiddleware({
      target: "http://api.example.com/", // 프록시 대상 서버의 주소
      changeOrigin: true,
    })
  );
};
