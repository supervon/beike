const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
};

http.createServer((req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(reqUrl.pathname);
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }
  const filePath = path.join(publicDir, pathname);
  if (!filePath.startsWith(publicDir)) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bad Request');
    return;
  }
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
    } else {
      const ext = path.extname(filePath);
      const type = mime[ext] || 'text/plain';
      res.writeHead(200, { 'Content-Type': type });
      res.end(content);
    }
  });
}).listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
