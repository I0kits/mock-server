const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'resource/resources.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get('/echo', (req, res) => {
  res.jsonp(req.query)
});

server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
});

server.use(router);

server.listen(3000, () => { console.log('JSON Server is running');});