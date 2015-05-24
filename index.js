var auth = require('basic-auth')
var http = require('http')
var nodeStatic = require('node-static')

module.exports = function(config) {
  var file = new nodeStatic.Server(config.root, config.options)
  var port = process.env.PORT || config.port
  var username = config.username
  var password = config.password
  var node_env = config.node_env

  http.createServer(function(req, res){
    if (node_env == 'production' && username && password) {
      var credentials = auth(req)
      if (!credentials || credentials.name !== username || credentials.pass !== password) {
        res.writeHead(401, {
          'WWW-Authenticate': 'Basic realm="' + config.realm + '"'
        })
        res.end()
      }
    }
    req.addListener('end', function () {
      file.serve(req, res)
    }).resume()
  }).listen(port)
}
