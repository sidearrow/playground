const http = require('http');

const server = http.createServer((req, res) => {
  res.end(req.connection.localAddress);
});

server.listen(3000);
