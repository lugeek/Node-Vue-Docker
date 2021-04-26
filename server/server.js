const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain', 
    'Access-Control-Allow-Origin': '*', // CORS
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
  });
  res.end('hello world from server!');
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})