const proxy = require('http-proxy-middleware')
module.exports = function (app) {
  // app.use(proxy('/swagger-resources', {
  //   target: 'http://localhost:20002',
  //   secure: false,
  //   changeOrigin: true,
  //   pathRewrite: {
  //     // "^/swagger-resources": "/swagger-resources"
  //   }
  // }))

  // app.use(proxy('**/v2/api-docs', {
  //   target: 'http://localhost:20002',
  //   secure: false,
  //   changeOrigin: true
  // }))

  app.use(proxy('/swagger-resources', {
    target: 'http://localhost:39102',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      // "^/swagger-resources": "/api/swagger-resources",
      "^/": "/api/"
    }
  }))

  app.use(proxy('**/v2/api-docs', {
    target: 'http://localhost:39102',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/api/"
    }
  }))
}